import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import { List, fromJS, is } from 'immutable'
import { Echarts, Table } from 'edf-component'
class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        
        this.component = component

        this.injections = injections
        injections.reduce('init')
        this.load()
    }
    componentDidMount = () => {
    }
    componentWillReceiveProps = (nextProps) => {
        if((!is(nextProps.periodList, this.component.props.periodList) || !is(nextProps.data, this.component.props.data)) && nextProps.data){
                this.initData(nextProps.periodList, nextProps.data)
        }
    }
    load = () => {
        this.metaAction.sf('data.type','chart')
        if(this.component.props.data){
            this.initData(this.component.props.periodList, this.component.props.data)
        }
    }
    initData = (periodList, aRAP) => {
        // let periodList = this.component.props.periodList,
        // data = this.component.props.data,
        let rarpList = []
        let list = periodList.map( o => {
            return o.replace('年', '.').replace('月', '')
        })
        let res = this.convertData(aRAP)
        this.metaAction.sf('data.period', list[0])
        this.injections.reduce('load', {periodList: list})
    }

    setField = async (path, value) => {
        this.metaAction.sf('data.period', value)
        let params = {year: value.split('.')[0], period: value.split('.')[1]}
        let data = await this.webapi.receive.query(params)
        this.convertData(data)
    }
    refresh = async () => {
        let data  = await this.webapi.receive.query(this.metaAction.gf('data.period'))
        this.convertData(data)
    }
    convertData = (data) => {
        for(let key in data){
            for(let i in data[key]){
                data[key]['code'] = i
                data[key]['value'] = data[key][i]
            }
        }
        
        let tableSource = [],item = {}
        item.accountToAccountsReceivableMap = data['accountToAccountsReceivableMap']&&data['accountToAccountsReceivableMap']['value']
        item.accountToOtherAccountsReceivableMap = data['accountToOtherAccountsReceivableMap']&&data['accountToOtherAccountsReceivableMap']['value']
        item.accountToAccountsPayableMap = data['accountToAccountsPayableMap']&&data['accountToAccountsPayableMap']['value']
        item.accountToOtherAccountsPayableMap = data['accountToOtherAccountsPayableMap']&&data['accountToOtherAccountsPayableMap']['value']
        tableSource.push(item)
        this.injections.reduce('setData', {data: data, tableSource: tableSource})
        // return { data: data, tableSource: tableSource}
    }
    fieldChange = (path, value) => {

        
        if(value == '0'){
            this.metaAction.sf('data.type','chart')
        }else {
            this.metaAction.sf('data.type','table')
        }
    }
    handlePeriod = (e) => {
        console.log(e)
    }
    fold = async (option) => {
        if(this.metaAction.gf('data.fold') == true){
            this.metaAction.sf('data.fold',false)
        }else{
            this.metaAction.sf('data.fold',true)
        }
    
        this.component.props.callback && await this.component.props.callback(option)
    }

    chartClick = (e) => {
        let list = this.metaAction.gf('data.list') && this.metaAction.gf('data.list').toJS()
        let value = this.metaAction.gf('data.period')
        switch (e.dataIndex) {
            case 3 :
            
            this.component.props.setPortalContent &&
            this.component.props.setPortalContent('余额表', 'app-balancesum-rpt',{
                initSearchValue: {
                    date_end: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    date_start: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    beginAccountCode: list.accountToAccountsReceivableMap.code,
                    endAccountCode: list.accountToAccountsReceivableMap.code
                }               
            })
            break;
            case 2 :
            
            this.component.props.setPortalContent &&
            this.component.props.setPortalContent('余额表', 'app-balancesum-rpt',{
                initSearchValue: {
                    date_end: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    date_start: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    beginAccountCode: list.accountToOtherAccountsReceivableMap.code,
                    endAccountCode: list.accountToOtherAccountsReceivableMap.code
                }               
            })
            break;
            case 1 :
            
            this.component.props.setPortalContent &&
            this.component.props.setPortalContent('余额表', 'app-balancesum-rpt',{
                initSearchValue: {
                    date_end: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    date_start: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    beginAccountCode: list.accountToAccountsPayableMap.code,
                    endAccountCode: list.accountToAccountsPayableMap.code
                }               
            })
            break;
            case 0 :
            
            this.component.props.setPortalContent &&
            this.component.props.setPortalContent('余额表', 'app-balancesum-rpt',{
                initSearchValue: {
                    date_end: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    date_start: this.metaAction.stringToMoment((value.replace('.', "-")),'YYYY-MM'),
                    beginAccountCode: list.accountToOtherAccountsPayableMap.code,
                    endAccountCode: list.accountToOtherAccountsPayableMap.code
                }               
            })
            break;
        }
    }
   
    getContent = () => {
        
        let list = this.metaAction.gf('data.list') && this.metaAction.gf('data.list').toJS()
        let tableSource = this.metaAction.gf('data.tableSource') && this.metaAction.gf('data.tableSource').toJS()
        let  columns = [
            {
                title: '应收',
                dataIndex: 'accountToAccountsReceivableMap',
                // width: '10%',
                key: 'accountToAccountsReceivableMap'
            }, {
                title: '其他应收',
                dataIndex: 'accountToOtherAccountsReceivableMap',
                // width: '30%',
                key: 'accountToOtherAccountsReceivableMap',
            }, {
                title: '应付',
                dataIndex: 'accountToAccountsPayableMap',
                // width: '30%',
                key: 'accountToAccountsPayableMap',
            },
            {
                title: '其他应付',
                dataIndex: 'accountToOtherAccountsPayableMap',
                // width: '30%',
                key: 'accountToOtherAccountsPayableMap',
            }
        ]
        let option = {
            
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisTick: {show: false},
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                triggerEvent:true,
                axisTick: {show: false},
                // type: 'category',
                data: ['其他应付','应付','其他应收','应收'],
                // minInterval: 1,
                maxInterval: 3,
                interval: 0,
                splitLine:{
                    show:false
                },
            },
            
            series: [{
                data: [{
                    value: list.accountToOtherAccountsPayableMap&&list.accountToOtherAccountsPayableMap.value,
                    itemStyle:{
                      normal:{color:'#2BB696'}
                  }
                }, {
                    value:list.accountToAccountsPayableMap&&list.accountToAccountsPayableMap.value,
                    itemStyle:{
                      normal:{color:'#339ED5'}
                  }
                }, {
                    value:list.accountToOtherAccountsReceivableMap&&list.accountToOtherAccountsReceivableMap.value,
                    itemStyle:{
                      normal:{color:'#CD5D93'}
                  }
                }, {
                    value:list.accountToAccountsReceivableMap&&list.accountToAccountsReceivableMap.value,
                    itemStyle:{
                      normal:{color:'#E48E58'}
                  } 
                }],
                // color:['#E48E58','#CD5D93','#339ED5','#2BB696'],
                type: 'bar',
                barWidth: '15'
            }]
        
        }
        let type = this.metaAction.gf('data.type')
        let onEvents = {
            'click': this.chartClick,
            'timelinechanged': this.chartClick
          }
          
        if(type == 'chart'||!type){
            
            return <Echarts option={option} 
                            className="rcchart" 
                            onEvents={onEvents}
                    />
        }else if(type == 'table'){
            return <Table columns={columns} bordered={true} dataSource = { tableSource } pagination ={false} className="rctable"/>
        }
        
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}