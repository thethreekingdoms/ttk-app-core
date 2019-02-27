import React from 'react'
import { Map, fromJS, toJS, is } from 'immutable'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import isEquall from 'lodash.isequal'
import { fetch, number, history } from 'edf-utils'

import { Popover, Select, Button, Input, Number, Icon, FormDecorator} from 'edf-component'

const Option = Select.Option;

class action {
	constructor(option) {
		this.metaAction = option.metaAction
		this.extendAction = option.extendAction
		this.config = config.current
		this.webapi = this.config.webapi
        this.voucherAction = option.voucherAction
	}

    onInit = ({ component, injections }) => {
		this.component = component
        this.injections = injections
        if (addEventListener) {
            addEventListener('onClick', ::this.onClick)
        }
		injections.reduce('init', component.props)
        this.load(this.component.props.initData)
    }

    //初始化接口调用
	load = async (initData) => {
        let {sbbhead, zzsjmssbmxb, checkData, isDeclare} = initData
        let zzsjmssbmxbjsxm = zzsjmssbmxb.zzsjmssbmxbjsxmGrid ? zzsjmssbmxb.zzsjmssbmxbjsxmGrid.zzsjmssbmxbjsxmGridlbVO : []
        if(zzsjmssbmxbjsxm.length == 1) {
            zzsjmssbmxbjsxm.push({
                hmc: '',
                qcye: '0',
                bqfse: '0',
                bqydjse: '0',
                bqsjdjse: '0',
                qmye: '0'
            })
        }
        let zzsjmssbmxbmsxm = zzsjmssbmxb.zzsjmssbmxbmsxmGrid ? zzsjmssbmxb.zzsjmssbmxbmsxmGrid.zzsjmssbmxbmsxmGridlbVO : []
        if(zzsjmssbmxbmsxm.length == 3) {
            zzsjmssbmxbmsxm.push({
                hmc: '',
                mzzzsxmxse: '0',
                bqsjkcje: '0',
                kchmsxse: '0',
                msxsedyjxse: '0',
                mse: '0'
            })
        }
        
        this.injections.reduce('load' , sbbhead, zzsjmssbmxbjsxm, zzsjmssbmxbmsxm, isDeclare)
        let select = await this.webapi.selectInit()
        if( this.component.props.initData.SS == '32' && this.component.props.initData.jmsMap ) {
            select = this.component.props.initData.jmsMap
        }
        if(select) {
            let {freeTax, reduceTax} = select
            freeTax.map(item => item.codeSwsxDm = `${item.code}|${item.swsxDm}`)
            reduceTax.map(item => item.codeSwsxDm = `${item.code}|${item.swsxDm}`)
            this.metaAction.sfs({
                'data.freeTax': fromJS(freeTax), 
                'data.reduceTax': fromJS(reduceTax)
            })
        }
        this.initMessage(zzsjmssbmxbjsxm, zzsjmssbmxbmsxm, checkData)
    }

    onClick = (event) => {
        if( event.target.className == 'message-p') {
            let popoverOpen = document.querySelector('.ant-popover-open')
            let popoverDivs = document.querySelectorAll('.ant-popover')
            if(popoverOpen) {
                popoverOpen.className = popoverOpen.className.replace('ant-popover-open','')
            }
            for(let i=0;i<popoverDivs.length;i++) {
                if( popoverDivs[i].className.indexOf('ant-popover-hidden') <0 ) {
                    popoverDivs[i].className += ' ant-popover-hidden' 
                }
            }
        }
    }

    componentWillReceiveProps = ( nextProps ) => {
        let { isDeclare, sbbhead, isCanModify, checkData } = nextProps.initData
        let initData = this.component.props.initData
        let zzsjmssbmxbjsxm = nextProps.initData.zzsjmssbmxb ? nextProps.initData.zzsjmssbmxb.zzsjmssbmxbjsxmGrid.zzsjmssbmxbjsxmGridlbVO : []
        let zzsjmssbmxbmsxm = nextProps.initData.zzsjmssbmxb ? nextProps.initData.zzsjmssbmxb.zzsjmssbmxbmsxmGrid.zzsjmssbmxbmsxmGridlbVO : []
        
        let isTable = isEquall(initData.zzsjmssbmxb, nextProps.initData.zzsjmssbmxb)
        let isSbbhead = isEquall(initData.sbbhead, sbbhead)
        let declare = initData.isDeclare == isDeclare
        let canModify = initData.isCanModify == isCanModify
        let isCheckData = isEquall(initData.checkData,  checkData)
        if(isTable && isSbbhead && declare && canModify && isCheckData) return

        if(zzsjmssbmxbjsxm.length == 1) {
            zzsjmssbmxbjsxm.push({
                hmc: '',
                qcye: '0',
                bqfse: '0',
                bqydjse: '0',
                bqsjdjse: '0',
                qmye: '0'
            })
        }
        if(zzsjmssbmxbmsxm.length == 3) {
            zzsjmssbmxbmsxm.push({
                hmc: '',
                mzzzsxmxse: '0',
                bqsjkcje: '0',
                kchmsxse: '0',
                msxsedyjxse: '0',
                sysl: '',
                mse: '0'
            })
        }
        this.metaAction.sfs({
            'data.isDeclare': isDeclare,
            'data.isCanModify': isCanModify,
            'data.zzsjmssbmxbjsxm': fromJS(zzsjmssbmxbjsxm),
            'data.zzsjmssbmxbmsxm': fromJS(zzsjmssbmxbmsxm),
            'data.sbbhead': fromJS(sbbhead)
        })
        this.initMessage(zzsjmssbmxbjsxm, zzsjmssbmxbmsxm, nextProps.initData.checkData)
    }

    componentWillUnmount = () => {
        let zzsjmssbmxbjsxm = document.querySelector('.zzsjmssbmxb')
        if (window.removeEventListener) {
            zzsjmssbmxbjsxm.removeEventListener('keydown', this.keydown, false)
        } else if (window.detachEvent) {
            zzsjmssbmxbjsxm.detachEvent('onkeydown', this.keydown)
        }
    }

    componentDidMount = () => {   
        setTimeout(() => {
            let zzsjmssbmxb = document.querySelector('.zzsjmssbmxb')
            if (window.addEventListener) {
                zzsjmssbmxb.addEventListener('keydown', this.keydown, false)
            } else if (window.attachEvent) {
                zzsjmssbmxb.attachEvent('onkeydown', this.keydown)
            }
        }, 10)    
    }

    componentDidUpdate = () => {
        let isSetFocus = this.metaAction.gf('data.other.isSetFocus')
        //只在初次调用componentDidUpdate时设置默认焦点
        if(isSetFocus){
            let dom = document.getElementsByClassName('zzsjmssbmxbjsxm')
            if(dom){
                setTimeout(()=>{
                    let c = $(dom).find('.ant-select-selection')[0]
                    if(c){
                        c.tabIndex = 0
                        c.focus()
                    }
                }, 0)
            }
  
            this.metaAction.sf('data.other.isSetFocus', false)
        }
    }

     //回车跳到下个单元格keydown
     keydown = (e) => {
        if (e.key === 'Enter' || e.keyCode == 13 || e.keyCode == 108) {
            let body = document.getElementsByClassName('zzsjmssbmxb')[0]
            if (body) {
                setTimeout(() => {
                    if(e.target.className.includes('ant-select-selection')) return
                    const selects = document.getElementsByClassName('autoFocus_item')
                    const dom = $(e.target).parents('td').find('.autoFocus_item')
                    let index = $(selects).index(dom)
                    if(index < 0) {
                        index = this.metaAction.gf('data.autoFocus')
                    }
                    if(index == selects.length - 1) return
                    let c = selects[index+1].children[0]
                    if(c){
                        if( c.className && c.className.includes('ant-select') ) {
                            c = $(c).find('.ant-select-selection')[0]
                        }
                        c.tabIndex = 0
                        c.focus()
                        c.click()
                        this.metaAction.sf('data.autoFocus', index+1)
                    }
                }, 0)
            }
        }
    }

    initMessage = (zzsjmssbmxbjsxm, zzsjmssbmxbmsxm, checkData) => {
        let jsMessage = Array(zzsjmssbmxbjsxm.length) //减税
        let msMessage = Array(zzsjmssbmxbmsxm.length) //免税
        let jsItem, msItem
        //除了主表返回的错误校验信息
        if(checkData) {
            checkData.map(item => {
                let file = item.target.split('_')
                if(file[1] == "zzsjmssbmxbjsxmGrid"){
                    jsMessage[0] = {...jsMessage[0]}
                    jsMessage[0][file[4]] = item.message
                }else {
                    msMessage[0] = {...msMessage[0]}
                    msMessage[0][file[4]] = item.message
                }
            })
        }
        
        //减税表内校验
        jsMessage = this.organizeMessageJs(zzsjmssbmxbjsxm, jsMessage)
        //免税表内校验
        msMessage = this.organizeMessageMs(zzsjmssbmxbmsxm, msMessage)
        //表内错误校验数量
        let jsFailCount = this.failCount(jsMessage), msFailCount = this.failCount(msMessage)
        this.metaAction.sfs({
            'data.error.zzsjmssbmxbjsxm': fromJS(jsMessage), 
            'data.error.zzsjmssbmxbmsxm': fromJS(msMessage),
            'data.failCount.zzsjmssbmxbjsxm': jsFailCount,
            'data.failCount.zzsjmssbmxbmsxm': msFailCount
        })
        let { zzsjmssbmxbjsxmGridlbVO, zzsjmssbmxbmsxmGridlbVO } = this.changeEwbhxh(zzsjmssbmxbjsxm, zzsjmssbmxbmsxm)
        let changeTable = {
            zzsjmssbmxbjsxmGrid: {zzsjmssbmxbjsxmGridlbVO},
            zzsjmssbmxbmsxmGrid: {zzsjmssbmxbmsxmGridlbVO}
        }
        let changeItems = []
        let failCount = jsFailCount + msFailCount
        this.component.props.setVOData({changeTable, changeItems, failCount})
    }

    //计算表内除合计行校验不通过数量
    failCount = (data) => {
        let count = 0
        data.forEach((item, index) => {
            if(index > 0) {
                count = count + Object.keys(item).length
            }
        })
        return count
    }

    formatData = (tableName, type) => {
        let zzsjmssbmxbjsxm = [...this.metaAction.gf(`data.zzsjmssbmxbjsxm`).toJS()]
        let zzsjmssbmxbmsxm = [...this.metaAction.gf(`data.zzsjmssbmxbmsxm`).toJS()]
        const last = arr => arr[arr.length - 1];

        let { zzsjmssbmxbjsxmGridlbVO, zzsjmssbmxbmsxmGridlbVO } = this.changeEwbhxh(zzsjmssbmxbjsxm, zzsjmssbmxbmsxm)
        let changeItems = []
        let newSum = this.metaAction.gf(`data.${tableName}`).toJS()[0]
        let oldSum = this.metaAction.gf(`data.other.${tableName}`).toJS()[0]
        Object.keys(newSum).map(o => {
            if(newSum[o] != oldSum[o]){
                changeItems.push({
                    path: `${tableName}_${tableName}Grid_${tableName}GridlbVO_0_${o}`,
                    oldValue: oldSum[o] || 0,
                    newValue: newSum[o]
                })
            }
        })
        let changeTable = {
            zzsjmssbmxbjsxmGrid: {zzsjmssbmxbjsxmGridlbVO},
            zzsjmssbmxbmsxmGrid: {zzsjmssbmxbmsxmGridlbVO}
        }
        let change
        let{failCount, message} = this.errorMessage(tableName)
        //可优化
        // if(type){
        //     change = this.component.props.setVOData({changeTable, changeItems, failCount}, type)
        // }else {
            //failCount 表内校验不通过数量
            change =  this.component.props.setVOData({changeTable, changeItems, failCount})
        // }
        this.injections.reduce('update' , change, tableName, message, zzsjmssbmxbjsxmGridlbVO, zzsjmssbmxbmsxmGridlbVO)
    }

    //添加或重置行序号
    changeEwbhxh = (zzsjmssbmxbjsxmGridlbVO, zzsjmssbmxbmsxmGridlbVO) => {
        let i = 1, j = 1
        zzsjmssbmxbjsxmGridlbVO.map((item, index) => {
            delete item.ewbhxh
            let data = Object.values(item)
            if(data.filter(item => item != '' && item != 0).length != 0) {
                item.ewbhxh = i
                i++
            }
            if(item.codeSwsxDm){
                delete item.codeSwsxDm
            }
        })
        zzsjmssbmxbmsxmGridlbVO.map((item, index) => {
            delete item.ewbhxh
            let data = Object.values(item)
            if(data.filter(item => item != '' && item != 0).length != 0) {
                item.ewbhxh = j
                j++
            }
            if(item.codeSwsxDm){
                delete item.codeSwsxDm
            }
        })

        return {zzsjmssbmxbjsxmGridlbVO, zzsjmssbmxbmsxmGridlbVO}
    }

    //整理校验信息
    errorMessage = (tableName) => {
        let data = this.metaAction.gf(`data.${tableName}`).toJS()
        let message = Array(data.length)
        let item
        let failCount
        let error = this.metaAction.gf(`data.error.${tableName}`).toJS()
        //减税表内校验
        if(tableName == 'zzsjmssbmxbjsxm') {
            message = this.organizeMessageJs(data, message)
            failCount = this.failCount(message) + this.metaAction.gf('data.failCount.zzsjmssbmxbmsxm')
        }else {
            message = this.organizeMessageMs(data, message)
            failCount = this.failCount(message) + this.metaAction.gf('data.failCount.zzsjmssbmxbjsxm')
        }
        this.metaAction.sf(`data.failCount.${tableName}`, this.failCount(message))
        return {
            failCount,
            message
        }
        
    }

    //整理减税错误信息
    organizeMessageJs = (data, message) => {
        let item
        for(let i=1; i<data.length; i++){
            item = data[i]
            //判断当前条是否填写数据且减税性质未选
            if(item.hmc == ''){
                message[i] = {
                    hmc: []
                }
                if(item.qcye != 0){
                    message[i].hmc.push('期初余额大于0时减税性质代码及名称不能为空')
                }
                if(item.bqfse != 0){
                    message[i].hmc.push('本期发生额大于0时减税性质代码及名称不能为空')
                }
                if(item.bqsjdjse != 0){
                    message[i].hmc.push('本期实际抵减税额大于0时减税性质代码及名称不能为空')
                }
                if(message[i].hmc.length == 0) {
                    delete message[i].hmc
                }
            }
            //判断当前条期末余额是否小于零判断第四列校验是否通过
            if(item.qmye < 0){
                message[i] = {
                    ...message[i],
                    bqsjdjse: [],
                    bqydjse: []
                }
                message[i].bqsjdjse.push('本期实际抵减税额不能大于本期应抵减税额')
                message[i].bqydjse.push('本期实际抵减税额不能大于本期应抵减税额')
            }
            if(item.qcye < 0) {
                message[i].qcye = ['期初余额不能为负']
            }
            if(item.bqfse < 0) {
                message[i].bqfse = ['本期发生额不能为负']
            }
            if(item.bqsjdjse < 0) {
                message[i].bqsjdjse = ['本期实际抵减税额不能为负']
            }
        }

        //判断减税项目代码及名称值是否重复
        let select = this.getIndexs(data)
        select.map((item, index) => {
            if(item.length > 1){
                let p = item.toString()
                item.map(o => {
                    message[o] = {...message[o]}
                    message[o].hmc = [`${p}行减税代码及名称重复`]
                })
            }
        })
        return message
    }

    //整理免税错误信息
    organizeMessageMs = (data, message) => {
        let item
        for(let i=3; i<data.length; i++){
            item = data[i]
            //判断当前条是否填写数据且减税性质未选
            if(item.hmc == ''){
                message[i] = {
                    hmc: []
                }
                if(item.mzzzsxmxse != 0){
                    message[i].hmc.push('免征增值税项目销售额大于0时免税性质代码及名称不能为空')
                }
                if(item.bqsjkcje != 0){
                    message[i].hmc.push('本期实际扣除金额大于0时免税性质代码及名称不能为空')
                }
                if(item.msxsedyjxse != 0){
                    message[i].hmc.push('免税销售额对应的进项税额大于0时免税性质代码及名称不能为空')
                }
                if(message[i].hmc.length == 0){
                    delete message[i].hmc
                }
            }
            //判断当前条期末余额是否小于零判断第四列校验是否通过
            if(item.kchmsxse < 0){
                message[i] = {
                    ...message[i],
                    kchmsxse: []
                }
                message[i].kchmsxse.push('扣除后免税销售额不能为负')
            }
            if(item.mzzzsxmxse < 0) {
                message[i].mzzzsxmxse = ['免征增值税项目销售额不能为负']
            }
            if(item.bqsjkcje < 0) {
                message[i].bqsjkcje = ['免税销售额扣除项目本期实际扣除金额不能为负']
            }
            if(item.msxsedyjxse < 0) {
                message[i].msxsedyjxse = ['免税销售额对应的进项税额不能为负']
            }
        }

        // //判断免税项目代码及名称值是否重复
        let select = this.getIndexs(data)
        select.map((item, index) => {
            if(item.length > 1){
                let p = item.toString()
                item.map(o => {
                    message[o] = {...message[o]}
                    message[o].hmc = [`${p}行免税代码及名称重复`]
                })
            }
        })

        return message
    }

    //整合减免税项目代码及名称重复数据
    getIndexs = (arr) => {
        let indexArr = {}
        arr.map( (item , index) => {
            if( indexArr[ 'a'+ item.hmc ] ) {
                if(item.hmc != ''){
                    indexArr[ 'a'+ item.hmc ].push( index )
                }
            } else {
                indexArr[ 'a'+ item.hmc ] = [ index ]
            }
        })	
        return Object.values( indexArr )
    }

    //新增行
    add = (tableName) => {
        let disabled = this.metaAction.gf('data.isDeclare') && !this.metaAction.gf('data.isCanModify')
        if(disabled) return
        let list = this.metaAction.gf(`data.${tableName}`).toJS()
        if(tableName == 'zzsjmssbmxbjsxm') {
            list.push({
                hmc: '',
                qcye: '0',
                bqfse: '0',
                bqydjse: '0',
                bqsjdjse: '0',
                qmye: '0'
            })
        }else {
            list.push({
                hmc: '',
                mzzzsxmxse: '0',
                bqsjkcje: '0',
                kchmsxse: '0',
                msxsedyjxse: '0',
                mse: '0'
            })
            
        }
        
        this.injections.reduce('changeTable', tableName, list)
        // this.metaAction.sf(`data.${tableName}`, fromJS(list))
    }

    //删除行
    del = (tableName, index) => {
        let disabled = this.metaAction.gf('data.isDeclare') && !this.metaAction.gf('data.isCanModify')
        if(disabled) return
        let list = this.metaAction.gf(`data.${tableName}`).toJS()
        let del = list.splice(index, 1)
        let keys = []
        if(tableName == 'zzsjmssbmxbjsxm'){
            keys = ['qcye', 'bqfse', 'bqydjse', 'bqsjdjse', 'qmye']
        }else {
            keys = ['mzzzsxmxse', 'bqsjkcje', 'kchmsxse', 'msxsedyjxse', 'mse']
        }
        keys.map(key => {
            if(del[0][key] != '') {
                list[0][key] = parseFloat(list[0][key]) - parseFloat(del[0][key])
            }
        })
        this.injections.reduce('changeTable', tableName, list)
        // this.metaAction.sf(`data.${tableName}`, fromJS(list))
        this.formatData(tableName)
        
    }

    //江苏纳税人识别号跳企业信息
    renderTitle = (title) => {
        title = title ? title : ( this.component.props.initData.SS == '32' ? <a onClick={this.changeProtal.bind(this)}>完善企业信息</a> : '')
        return title
    }

    changeProtal = () => {
        this.component.props.setPortalContent &&
        this.component.props.setPortalContent('企业信息', 'edfx-app-org', { initData: { activeKey: '2' } })
    }

    //操作列
    renderButton = (tableName, index, value) => {
        const obj = {
            children: <div>
                <Icon type="xinzengkemu" fontFamily='edficon' title="增加" className="add" onClick={this.add.bind(this, tableName)}/>
                <Icon type="shanchu" fontFamily='edficon' title="删除" className='del' onClick={this.del.bind(this, tableName, index)}/>
            </div>,
            props: {},
          };
        if(tableName == 'zzsjmssbmxbjsxm') {
            if (index === 0) {
                obj.children = null;
              }
              if (index === 1) {
                obj.children = <div>
                    <Icon type="xinzengkemu" fontFamily='edficon' title="增加" className="add" onClick={this.add.bind(this, tableName)}/>
                    <Icon type="shanchu" fontFamily='edficon' title="删除" className='del' disabled/>
                    </div>
              }
              return obj;  
        }
        if (index === 0 || index === 1 || index === 2) {
            obj.children = null;
          }
          if (index === 3) {
            obj.children = <div>
                <Icon type="xinzengkemu" fontFamily='edficon' title="增加" className="add"  onClick={this.add.bind(this, tableName)}/>
                <Icon type="shanchu" fontFamily='edficon' title="删除" className='del' disabled/>
                </div>
          }
          return obj;    
    }

    getDisabled = () => {
        let isCanModify = this.metaAction.gf(`data.isCanModify`),
            disabled,    
            isDeclare = !!this.metaAction.gf(`data.isDeclare`)
        if( isDeclare && !isCanModify ) {
            disabled = true
        } else {
            disabled = false            
        }
        return disabled
    }

    renderSelect = (tableName, index, max, value) => {
        // let disabled = this.metaAction.gf('data.isDeclare')
        let disabled = this.getDisabled()
        let message = this.metaAction.gf(`data.error.${tableName}`).toJS()[index]
        let tableItem = this.metaAction.gf(`data.${tableName}`).toJS()[index]
        if(index > max) {
            let list = []
            if(tableName == 'zzsjmssbmxbjsxm') {
                list = this.metaAction.gf('data.reduceTax').toJS()
            }else {
                list = this.metaAction.gf('data.freeTax').toJS()
            }
            const options = list.map(d => <Option key={d.codeSwsxDm}>{d.showData}</Option>);
            value = tableItem.hmc ? `${tableItem.hmc}|${tableItem.swsxDm}` : undefined
            if(message && message.hmc){
                let content = message.hmc.map( ( p, index ) => <p className='message-p'>{index+1}、{p}</p>)
                return (<Popover 
                content={<div style={{maxWidth: '300px'}}>{content}</div>} 
                getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                    <div className='select autoFocus_item'>
                        <Select
                        className={'message ' + tableName + '-select'}
                        allowClear={value ? true : false}
                        dropdownClassName='tax'
                        showSearch={true}
                        value={value}
                        disabled = {disabled}
                        onChange={this.selectChange.bind(this, tableName, index)}
                        filterOption={this.filterOption.bind(this, tableName)}
                        dropdownStyle={{'width': '245px'}}
                        dropdownMatchSelectWidth={false}
                        >
                        {options}
                        </Select>
                    </div>
                </Popover>)
            }
            return <div className='select autoFocus_item'>
                <Select
                value={value}
                className={tableName + '-select'}
                allowClear={value ? true : false}
                dropdownClassName='tax'
                disabled = {disabled}
                showSearch={true}
                onChange={this.selectChange.bind(this, tableName, index)}
                filterOption={this.filterOption.bind(this, tableName)}
                dropdownStyle={{'width': '245px'}}
                dropdownMatchSelectWidth={false}
                >
                {options}
                </Select>
            </div>
        }
        return <span>{value}</span>
        // hmc
    }

    renderNone = () => {
        return <span style={{textAlign: 'center', display: 'inline-block', width: '100%'}}>- -</span>
    }

    renderText = (tableName, name, index, value) => {
        let text = number.format(value[name], 2)
        // if(index == 0 || value[name] != '') {
            text = number.format(value[name], 2)
        // }
        let message = this.metaAction.gf(`data.error.${tableName}`).toJS()[index]
        if(message && message[name]){
            let content = message[name].map( ( p , index ) => <p className='message-p'>{index+1}、{p}</p>)
            return <Popover 
            content={<div style={{maxWidth: '300px'}}>{content}</div>} 
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                <span className="error">{text}</span>
            </Popover>
        }
        return <span>{text}</span>
    }

    renderInput = (tableName, name, index, max, value) => {
        value = number.format(value, 2)
        let disabled = this.getDisabled()        
        // let disabled = this.metaAction.gf('data.isDeclare')
        let message = this.metaAction.gf(`data.error.${tableName}`).toJS()[index]
        if(index > max) {
            if(message && message[name]){
                let content = message[name].map( ( p , index ) => <p className='message-p'>{index+1}、{p}</p>)
                return <Popover 
                content={<div style={{maxWidth: '300px'}}>{content}</div>} 
                getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                    <div className='autoFocus_item'>
                        <Input.Number 
                        className={'bg-check ' + tableName + '-input'}
                        disabled={disabled}
                        onBlur={(value) => this.handleBlur(value, name, index, tableName)} 
                        value={value}
                        regex='^(-?[0-9]+)(?:\.[0-9]{1,2})?$'
                        />
                    </div>
                </Popover>
            }
            return <div className='autoFocus_item'>
                <Input.Number 
                disabled={disabled}
                className={tableName + '-input'}
                onBlur={(value) => this.handleBlur(value, name, index, tableName)} 
                value={value}
                regex='^(-?[0-9]+)(?:\.[0-9]{1,2})?$'
                />
            </div>
        }
        if(message && message[name]) {
            let content = message[name].map( ( p , index ) => <p className='message-p'>{index+1}、{p}</p>)
            return <Popover 
            content={<div style={{maxWidth: '300px'}}>{content}</div>} 
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                <span className="error">{value}</span>
            </Popover>
        }
        return <span>{value}</span>
    }

    handleBlur = (value, columnName, index, tableName) => {//焦点离开输入框触发
        value = number.clearThousPos( value )
        let list = this.metaAction.gf(`data.${tableName}`).toJS()
        let oldList = this.metaAction.gf(`data.other.${tableName}`).toJS()
        let keys = []
        let changePath = [] //本次改变所影响到的列集合
        if (value && value > 99999999999999.99) {
            value = 99999999999999.99
            this.metaAction.toast('warning', `不能大于99,999,999,999,999.99`)
        }
        if (value && value < -99999999999999.99) {
            value = -99999999999999.99
            this.metaAction.toast('warning', `不能小于-99,999,999,999,999.99`)
        }
        list[index][columnName] = value
        //提前公共方法，处理数据
        if(tableName == 'zzsjmssbmxbjsxm'){
            list[index].bqydjse = (parseFloat(list[index].qcye) || 0) + (parseFloat(list[index].bqfse) || 0)
            list[index].qmye = (parseFloat(list[index].bqydjse) || 0) - (parseFloat(list[index].bqsjdjse) || 0)
            keys = ['qcye', 'bqfse', 'bqydjse', 'bqsjdjse', 'qmye']
        }else {
            list[index].kchmsxse = (parseFloat(list[index].mzzzsxmxse) || 0) - (parseFloat(list[index].bqsjkcje) || 0)
            list[index].mse = (parseFloat(list[index].kchmsxse) || 0) * 0.03
            keys = ['mzzzsxmxse', 'bqsjkcje', 'kchmsxse', 'msxsedyjxse', 'mse']
        }
        keys.map(key => {
            //去掉初始值
            // let total = parseFloat(oldList[0][key]) || 0
            // let i = tableName == 'zzsjmssbmxbjsxm' ? 1 : 3
            // if(total > 0) {
            //     for(i; i < oldList.length; i++){
            //         if(!isNaN(oldList[i][key])) {
            //             if(oldList[i][key] != '') {
            //                 total = total - parseFloat(oldList[i][key])
            //             }
            //         }
            //     }
            // }
            let total = 0
            let j = tableName == 'zzsjmssbmxbjsxm' ? 1 : 3
            for(j; j < list.length; j++){
                if(!isNaN(list[j][key])) {
                    if(list[j][key] != '') {
                        total = total + parseFloat(list[j][key])
                    }
                    
                }
            }
            list[0][key] = total
        })
        this.metaAction.sf(`data.${tableName}`, fromJS(list))
        this.formatData(tableName)
        if(this.metaAction.gf('data.autoFocus')){
            setTimeout(() => {
                let selects = document.getElementsByClassName('autoFocus_item')
                let index = this.metaAction.gf('data.autoFocus')
                if(index == selects.length - 1) return
                let c = selects[index].children[0]
                if(c){
                    if( c.className && c.className.includes('ant-select') ) {
                        c = $(c).find('.ant-select-selection')[0]
                    }
                    c.tabIndex = 0
                    c.focus()
                    // c.click()
                }
            }, 500)
        }
    }
    
    //修改下拉选框值
    selectChange = (tableName, index, value) => {
        let list = this.metaAction.gf(`data.${tableName}`).toJS()
        let error = this.metaAction.gf(`data.error.${tableName}`).toJS()
        if(!value){
            list[index].hmc = ''
            delete list[index].swsxDm
            delete list[index].codeSwsxDm
        }else {
            let code = value.split("|")
            list[index].hmc = code[0]
            list[index].swsxDm = code[1]
            list[index].codeSwsxDm = value
            //判断当前下拉选框是否为错误状态，取消错误校验信息
            if(error[index] && Object.keys(error[index]).length != 0 && error[index].hasOwnProperty('hmc')){
                delete error[index].hmc
            }
        }
        
        this.injections.reduce('changeSelect', tableName, list, error)
        this.formatData(tableName, true)
    }

    //下拉选框搜索
    filterOption = (tableName, inputValue, option) => {
        if (option && option.props && option.props.children) {
            let allSelect = []
            if(tableName == 'zzsjmssbmxbjsxm') {
                allSelect = this.metaAction.gf('data.reduceTax').toJS()
            }else{
                allSelect = this.metaAction.gf('data.freeTax').toJS()
            }
            let itemData = allSelect.filter(o => o.showData == option.props.children)[0]
            if (itemData.showData && itemData.showData.indexOf(inputValue) != -1) {
                //将滚动条置顶
                let select = document.getElementsByClassName('ant-select-dropdown-menu')
                if (select.length > 0 && select[0].scrollTop > 0) {
                    select[0].scrollTop = 0
                }
                return true
            }
            else {
                return false
            }
        }
        return true
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        voucherAction = FormDecorator.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, voucherAction }),
        ret = { ...metaAction, ...voucherAction, ...o }

    metaAction.config({ metaHandlers: ret })
    return ret
}
