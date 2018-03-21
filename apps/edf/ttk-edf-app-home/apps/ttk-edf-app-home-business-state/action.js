import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import { List, fromJS, is } from 'immutable'
import { Echarts, Table } from 'edf-component'
import { addThousandsPosition } from './data'
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
    componentWillReceiveProps = (nextProps) => {
        if(!is(nextProps.data, this.component.props.data) && nextProps.data){
            this.initData(nextProps.data)
        }
    }
    
    load = async () => {
        // setTimeout(() => {
            let data = this.component.props.data
            if(data){
                this.initData(data)
            }
        // },1000)
        
    }
    initData = (data) => {
        let periodList = [],
        incomeSumAmout = [],
        expenditureSumAmount = [],
        profitAmount = [],
        tableSource = [],
        period,
        arr = [],
        newData = {},
        dataList = []
        for(let key in data){
            arr.push(parseInt(key.replace('-','')))
            arr.sort(function (x,y) {
                return x-y;
            });
            dataList.push({
                [key]: data[key]
            })
            data[key]['period'] = `${parseInt(key.split('-')[1])}月`
            data[key]['time'] = parseInt(key.replace('-',''))
            // periodList.push(`${parseInt(key.split('-')[1])}月`)
            // incomeSumAmout.push(data[key].incomeSumAmout)
            // expenditureSumAmount.push(data[key].expenditureSumAmount)
            // profitAmount.push(data[key].profitAmount)
            tableSource.push(data[key])
        }
        arr.map( o => {
            periodList.push(`${parseInt(`${o}`.slice(4))}月`)
        })
        tableSource.map(o => {
            o.incomeSumAmout = addThousandsPosition(o.incomeSumAmout.toFixed(2), true)
            o.expenditureSumAmount = addThousandsPosition(o.expenditureSumAmount.toFixed(2), true)
            o.profitAmount = addThousandsPosition(o.profitAmount.toFixed(2), true)
            return o
        })
        let list = tableSource.sort(this.compare('time'))
        list.map(o => {
            incomeSumAmout.push(o.incomeSumAmout)
            expenditureSumAmount.push(o.expenditureSumAmount)
            profitAmount.push(o.profitAmount)
            return o
        })
        newData.periodList = periodList
        newData.incomeSumAmout = incomeSumAmout
        newData.expenditureSumAmount = expenditureSumAmount
        newData.profitAmount = profitAmount
        newData.tableSource = tableSource
        this.injections.reduce('load', newData)
        this.metaAction.sf('data.type','chart')
    }
    compare = (property) => {
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }
    fieldChange = (path, value) => {
        if(value == '0'){
            this.metaAction.sf('data.type','chart')
        }else {
            this.metaAction.sf('data.type','table')
        }
    }
    refresh = async () => {
        let data  = await this.webapi.business.query()
        let res = this.initData(data)
    }
    getContent = () => {
        let periodList = this.metaAction.gf('data.periodList') && this.metaAction.gf('data.periodList').toJS()
        let incomeSumAmout = this.metaAction.gf('data.incomeSumAmout') && this.metaAction.gf('data.incomeSumAmout').toJS()
        let expenditureSumAmount = this.metaAction.gf('data.expenditureSumAmount') && this.metaAction.gf('data.expenditureSumAmount').toJS() 
        let profitAmount = this.metaAction.gf('data.profitAmount') && this.metaAction.gf('data.profitAmount').toJS()
        let tableSource = this.metaAction.gf('data.tableSource') && this.metaAction.gf('data.tableSource').toJS()
        let  columns = [
            {
                title: '月份',
                dataIndex: 'period',
                width: '10%',
                key: 'period'
            }, {
                title: '收入',
                dataIndex: 'incomeSumAmout',
                // width: '30%',
                key: 'incomeSumAmout',
            }, {
                title: '支出',
                dataIndex: 'expenditureSumAmount',
                // width: '30%',
                key: 'expenditureSumAmount',
            },
            {
                title: '利润',
                dataIndex: 'profitAmount',
                // width: '30%',
                key: 'profitAmount',
            }
        ]
        let option = {
            
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            color: ['#E48E58', '#2BB696', '#4cabce'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['收入', '支出', '利润']
            },
            
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: periodList
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {show: false},
                }
            ],
            series: [
                {
                    name: '收入',
                    type: 'bar',
                    barGap: 0,
                    // label: labelOption,
                    data: incomeSumAmout
                },
                {
                    name: '支出',
                    type: 'bar',
                    // label: labelOption,
                    data: expenditureSumAmount
                },
                {
                    name: '利润',
                    type: 'bar',
                    // label: labelOption,
                    data: profitAmount
                }
            ]
        
        }
        let type = this.metaAction.gf('data.type')

        if(type == 'chart'||!type){
            return <Echarts option={option} className="rcchart"/>
            
        }else if(type == 'table'){
            return <Table columns={columns} bordered={true} dataSource = { tableSource } pagination ={false} className="rctable"/>
        }
    }
    fold = async (option) => {
        if(this.metaAction.gf('data.fold') == true){
            this.metaAction.sf('data.fold',false)
        }else{
            this.metaAction.sf('data.fold',true)
        }
     
        this.component.props.callback && await this.component.props.callback(option)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}