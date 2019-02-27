import React from 'react'
import { fromJS, is } from 'immutable'
import { action as MetaAction } from 'edf-meta-engine'
import config from './config'
import { number, math } from 'edf-utils'

import { Popover, Select, Input, Icon, FormDecorator} from 'edf-component'

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
        // if (addEventListener) {
        //     addEventListener('onClick', ::this.onClick)
        // }
        injections.reduce('init', component.props)
        this.load(this.component.props.initData)
    }

	load = (initData) => {
        let { isDeclare, sbbhead, isCanModify, zzsxgmkcxmqd, checkData } = initData
        let kcxmqdmx = zzsxgmkcxmqd  ? zzsxgmkcxmqd.kcxmqdmx : []
        let zgswjgdm = zzsxgmkcxmqd  ? zzsxgmkcxmqd.zgswjgdm : ''
        let zgswjgmc = zzsxgmkcxmqd  ? zzsxgmkcxmqd.zgswjgmc : ''
        if(kcxmqdmx.length == 1) {
            kcxmqdmx.splice( 0, 0, {
                kjrq: '',
                yxkcxmje: '0',
                fwxmmc: '',
                fphm: '',
                fpdm: '',
                kpfdwmc: '',
                kpfnsrsbh: '',
                pzzl: ''
            })
        }
        
        this.injections.reduce('load' , isDeclare, zgswjgdm, zgswjgmc, isCanModify, kcxmqdmx, sbbhead)

        this.initMessage(zzsxgmkcxmqd, checkData)        
    }

    initMessage = (zzsxgmkcxmqd, checkData) => {
        let message = Array(zzsxgmkcxmqd.length) //免税
        //除了主表返回的错误校验信息
        if(checkData && checkData.length != 0) {
            checkData.map(item => {
                let file = item.target.split('_')
                message[file[2]] = {...message[file[2]]}
                message[file[2]][file[3]] = item.message
            })
        }
        //表内校验
        message = this.organizeMessage(zzsxgmkcxmqd.kcxmqdmx, message)
        let failCount = this.errorMessage(zzsxgmkcxmqd.kcxmqdmx, message)
        // let i = 0
        // //添加或重置行序号
        // zzsxgmkcxmqd.map((item, index) => {
        //     delete item.ewbhxh
        //     let data = Object.values(item)
        //     if(data.filter(item => item != '' && item != 0).length != 0) {
        //         item.ewbhxh = i
        //         i++
        //     }
        // })
        // let detail = false
        // let changeItems = []
        // let changeTable = {
        //     ygzsffxcsmxbGrid: {zzsxgmkcxmqd}
        // }
        // this.component.props.setVOData({changeTable, changeItems, failCount, detail})
    }

    //表内除合计行校验信息
    organizeMessage = (list, message) => {
        // let select = this.metaAction.gf('data.select').toJS()
        let item
        for(let i=0; i<list.length-1; i++){
            item = list[i]
            //判断当前条是否填写数据且减税性质未选
            if(item.yxkcxmje-0 < 0){
                message[i] = {
                    ...message[i],
                    yxkcxmje: [],
                }
                message[i].yxkcxmje.push('允许扣除项目金额不能为负')
            }

            if(item.kpfnsrsbh != '' && 
            ([15, 18, 20].indexOf(item.kpfnsrsbh.length) < 0 || 
            !/^[A-Za-z0-9]+$/.test(item.kpfnsrsbh) )) {
                message[i] = {
                    ...message[i],
                    kpfnsrsbh: []
                }
                message[i].kpfnsrsbh = ['请输入正确的纳税人识别号']
            }
        }

        return message
    }

    //整理校验信息
    errorMessage = (list, message) => {
        let {error, zzsxgmkcxmqd, select} = this.metaAction.gf('data').toJS()
        error = message ? message : error
        zzsxgmkcxmqd = list ? list : zzsxgmkcxmqd
        let selectItem = {}
        this.metaAction.sf('data.error', fromJS(error))
        let count = 0
        // error.forEach((item, index) => {
        //     if(index > 0) {
        //         count = count + Object.keys(item).length
        //     }
        // })
        error.forEach((item, index) => {
            if(index < error.length-1 && item) {
                count = count++
            }
        })
        return count
    }

    selfErrorMessageCount = (list) => {
        let count = 0,item
        for(let i=0; i<list.length-1; i++){
            item = list[i]
            //判断当前条是否填写数据且减税性质未选
            if(item.yxkcxmje-0 < 0){
                count++
            }
            if(item.kpfnsrsbh != '' && 
            ([15, 18, 20].indexOf(item.kpfnsrsbh.length) < 0 || 
            !/^[A-Za-z0-9]+$/.test(item.kpfnsrsbh) )) {
                count++
            }
        }
        return count
    }

    componentWillReceiveProps = ( nextProps ) => {
        let { isDeclare, sbbhead, isCanModify, zzsxgmkcxmqd, checkData } = nextProps.initData
        let kcxmqdmx = zzsxgmkcxmqd  ? zzsxgmkcxmqd.kcxmqdmx : []
        let zgswjgdm = zzsxgmkcxmqd  ? zzsxgmkcxmqd.zgswjgdm : ''
        let zgswjgmc = zzsxgmkcxmqd  ? zzsxgmkcxmqd.zgswjgmc : ''

        if(!is( fromJS(this.component.props.initData) , fromJS( nextProps.initData )) ) {
            if(kcxmqdmx.length == 1) {
                kcxmqdmx.splice( 0, 0, {
                    kjrq: '',
                    yxkcxmje: '0',
                    fwxmmc: '',
                    fphm: '',
                    fpdm: '',
                    kpfdwmc: '',
                    kpfnsrsbh: '',
                    pzzl: ''
                })
            }

            this.metaAction.sfs({
                'data.isDeclare': isDeclare,
                'data.zgswjgdm': zgswjgdm,
                'data.zgswjgmc': zgswjgmc,
                'data.isCanModify': isCanModify,
                'data.zzsxgmkcxmqd': fromJS(kcxmqdmx),
                'data.other.zzsxgmkcxmqd': fromJS(kcxmqdmx),
                'data.sbbhead': fromJS(sbbhead)
            })
            this.initMessage(zzsxgmkcxmqd, checkData)            
        }
    }

    componentWillUnmount = () => {
        let zzsxgmkcxmqd = document.querySelector('.zzsxgmkcxmqd')
        if (window.removeEventListener) {
            zzsxgmkcxmqd.removeEventListener('keydown', this.keydown, false)
        } else if (window.detachEvent) {
            zzsxgmkcxmqd.detachEvent('onkeydown', this.keydown)
        }
    }

    componentDidMount = () => {   
        setTimeout(() => {
            let zzsxgmkcxmqd = document.querySelector('.zzsxgmkcxmqd')
            if (window.addEventListener) {
                zzsxgmkcxmqd.addEventListener('keydown', this.keydown, false)
            } else if (window.attachEvent) {
                zzsxgmkcxmqd.attachEvent('onkeydown', this.keydown)
            }
        }, 10)    
    }

    componentDidUpdate = () => {
        let isSetFocus = this.metaAction.gf('data.other.isSetFocus')
        //只在初次调用componentDidUpdate时设置默认焦点
        if(isSetFocus){
            let dom = document.getElementsByClassName('zzsxgmkcxmqd')
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
            let body = document.getElementsByClassName('zzsxgmkcxmqd')[0]
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

    //新增行
    add = () => {
        let disabled = this.metaAction.gf('data.isDeclare') && !this.metaAction.gf('data.isCanModify')
        if(disabled) return
        let list = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let error = this.metaAction.gf(`data.error`).toJS()
        error.splice(list.length-1, 0, undefined)
        list.splice( list.length-1, 0, {
            kjrq: '',
            yxkcxmje: '0',
            fwxmmc: '',
            fphm: '',
            fpdm: '',
            kpfdwmc: '',
            kpfnsrsbh: '',
            pzzl: ''
        })
        this.injections.reduce('changeTable', list, error)
    }

    //删除行
    del = (index) => {
        let disabled = this.metaAction.gf('data.isDeclare') && !this.metaAction.gf('data.isCanModify')
        if(disabled) return
        let list = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let error = this.metaAction.gf(`data.error`).toJS()
        error.splice(index, 1)
        let del = list.splice(index, 1)
        let oldSum = list[list.length-1].yxkcxmje
        list[list.length-1].yxkcxmje = parseFloat(list[list.length-1].yxkcxmje) - parseFloat(del[0].yxkcxmje)
        let newSum = list[list.length-1].yxkcxmje        
        this.injections.reduce('changeTable', list, error)
        this.formatData( newSum , oldSum )
    }
    
    formatData = ( newSum , oldSum ) => {
        let kcxmqdmx = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        newSum = newSum !== undefined ? newSum : kcxmqdmx[kcxmqdmx.length-1].yxkcxmje
        oldSum = oldSum !== undefined ? oldSum : this.metaAction.gf(`data.other.zzsxgmkcxmqd`).toJS().pop().yxkcxmje
        let zgswjgdm = this.metaAction.gf(`data.zgswjgdm`)
        let zgswjgmc = this.metaAction.gf(`data.zgswjgmc`)
        let changeItems = [],
            notCalc = true
        if(newSum != oldSum){
            changeItems.push({
                path: `zzsxgmkcxmqd_kcxmqdmx_${kcxmqdmx.length-1}_yxkcxmje`,
                oldValue: oldSum || 0,
                newValue: newSum
            })
            notCalc = false
        }
        let changeTable = {
                kcxmqdmx,
                zgswjgdm,
                zgswjgmc
        }
        let failCount = this.selfErrorMessageCount(kcxmqdmx)
        
        let change =  this.component.props.setVOData({changeTable, changeItems,sumRowIndex: kcxmqdmx.length-1, failCount }, notCalc)
        console.log(change)
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
    renderButton = (index) => {
        let list = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        const obj = {
            children: <div>
                <Icon type="xinzengkemu" fontFamily='edficon' title="增加" className="add" onClick={this.add.bind(this)}/>
                <Icon type="shanchu" fontFamily='edficon' title="删除" className='del' onClick={this.del.bind(this, index)}/>
            </div>,
            props: {},
          };
        if (index === list.length-1) {
            obj.children = '--';
        }
        if (index === 0) {
            obj.children = <div>
                <Icon type="xinzengkemu" fontFamily='edficon' title="增加" className="add" onClick={this.add.bind(this)}/>
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

    renderSelect = ( index, value) => {
        // let disabled = this.metaAction.gf('data.isDeclare')
        let disabled = this.getDisabled()
        let message = this.metaAction.gf(`data.error`).toJS()[index]
        let tableList = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let tableItem = tableList[index]
        if(index != tableList.length-1) {
            let list = this.metaAction.gf('data.pzzl').toJS()
            const options = list.map(d => <Option key={d.value}>{d.lable}</Option>);
            value = tableItem.pzzl || ''
            if(message && message.hmc){
                let content = message.hmc.map( ( p, index ) => <p className='message-p'>{index+1}、{p}</p>)
                return (<Popover 
                content={<div style={{maxWidth: '300px'}}>{content}</div>} 
                getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                    <div className='select autoFocus_item'>
                        <Select
                        className={'message zzsxgmkcxmqd-select'}
                        allowClear={value ? true : false}
                        dropdownClassName='tax'
                        showSearch={true}
                        value={value}
                        disabled = {disabled}
                        onChange={this.selectChange.bind(this, index)}
                        // filterOption={this.filterOption.bind(this)}
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
                className={'zzsxgmkcxmqd-select'}
                allowClear={value ? true : false}
                dropdownClassName='tax'
                disabled = {disabled}
                showSearch={true}
                onChange={this.selectChange.bind(this, index)}
                // filterOption={this.filterOption.bind(this)}
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

    renderDate = ( index, value) => {
        let disabled = this.getDisabled()        
        let tableList = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let message = this.metaAction.gf(`data.error`).toJS()[index]
        if(index != tableList.length-1) {
            if(message && message['kjrq']){
                let content = message['kjrq'].map( ( p , index ) => <p className='message-p'>{index+1}、{p}</p>)
                return <Popover 
                content={<div style={{maxWidth: '300px'}}>{content}</div>} 
                getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                    <div className='autoFocus_item'>
                        <Input 
                        className={'bg-check zzsxgmkcxmqd-input'}
                        disabled={disabled}
                        onBlur={(e) => this.handleBlur(e.target.value, 'kjrq', index)} 
                        value={value}
                        />
                    </div>
                </Popover>
            }
            return <div className='autoFocus_item'>
                <Input 
                disabled={disabled}
                className={'zzsxgmkcxmqd-input'}
                onBlur={(e) => this.handleBlur(e.target.value, 'kjrq', index)} 
                value={value}
                />
            </div>
        }
        return this.renderNone()
    }

    renderNone = () => {
        return <span style={{textAlign: 'center', display: 'inline-block', width: '100%'}}>- -</span>
    }

    renderText = ( name, index, value) => {
        let text = number.format(value[name], 2)
        let message = this.metaAction.gf(`data.error`).toJS()[index]
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

    renderInput = ( name, index, value) => {
        let disabled = this.getDisabled()        
        let tableList = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let message = this.metaAction.gf(`data.error`).toJS()[index]
        if(index != tableList.length-1) {
            if(message && message[name]){
                let content = message[name].map( ( p , index ) => <p className='message-p'>{index+1}、{p}</p>)
                return <Popover 
                content={<div style={{maxWidth: '300px'}}>{content}</div>} 
                getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                    <div className='autoFocus_item'>
                        <Input 
                        className={'bg-check zzsxgmkcxmqd-input'}
                        disabled={disabled}
                        onBlur={(e) => this.handleBlur(e.target.value, name, index)} 
                        value={value}
                        />
                    </div>
                </Popover>
            }
            return <div className='autoFocus_item'>
                <Input
                disabled={disabled}
                className={'zzsxgmkcxmqd-input'}
                onBlur={(e) => this.handleBlur(e.target.value, name, index)} 
                value={value}
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
        return this.renderNone()
    }

    renderNumber = ( name, index, value) => {
        value = number.format(value, 2)
        let disabled = this.getDisabled()        
        let tableList = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let message = this.metaAction.gf(`data.error`).toJS()[index]
        if(index != tableList.length-1) {
            if(message && message[name]){
                let content = message[name].map( ( p , index ) => <p className='message-p'>{index+1}、{p}</p>)
                return <Popover 
                content={<div style={{maxWidth: '300px'}}>{content}</div>} 
                getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                    <div className='autoFocus_item'>
                        <Input.Number 
                        className={'bg-check zzsxgmkcxmqd-input'}
                        disabled={disabled}
                        onBlur={(value) => this.handleBlur(value, name, index)} 
                        value={value}
                        regex='^(-?[0-9]+)(?:\.[0-9]{1,2})?$'
                        />
                    </div>
                </Popover>
            }
            return <div className='autoFocus_item'>
                <Input.Number 
                disabled={disabled}
                className={'zzsxgmkcxmqd-input'}
                onBlur={(value) => this.handleBlur(value, name, index)} 
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

    handleBlur = (value, columnName, index) => {//焦点离开输入框触发
        console.log(1111)
        let list = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let oldList = this.metaAction.gf(`data.other.zzsxgmkcxmqd`).toJS()
        if (columnName == 'yxkcxmje' && value && value > 99999999999999.99) {
            value = 99999999999999.99
            this.metaAction.toast('warning', `不能大于99,999,999,999,999.99`)
        }
        if (columnName == 'yxkcxmje' && value && value < -99999999999999.99) {
            value = -99999999999999.99
            this.metaAction.toast('warning', `不能小于-99,999,999,999,999.99`)
        }
        
        if(columnName == 'yxkcxmje') {
            value = number.clearThousPos( value )
            list[list.length-1].yxkcxmje = math( ( parseFloat(list[list.length-1].yxkcxmje) - parseFloat(oldList[index].yxkcxmje || 0) + parseFloat(value) ) , 2 )
        }
        if( columnName == 'fpdm' ) {//本表第4列“发票代码”：发票代码必须为12位。如发票代码小于12位请在前面补“0”；如发票代码大于12位请截取后12位代码填写；
            let fpdmLen = 12
            if( value && value.length < fpdmLen ) {
                value = value.padStart(fpdmLen, '0')
            } else if( value && value.length > fpdmLen ) {
                value = value.substr(-fpdmLen)
            }
        }
        if( columnName == 'fphm' ) {//本表第5列“发票号码”：发票号码必须为8位。如发票号码小于8位请在前面补“0”；如发票号码大于8位请截取后8位号码填写；
            let fphmLen = 8
            if( value && value.length < fphmLen ) {
                value = value.padStart(fphmLen, '0')
            } else if( value && value.length > fphmLen ) {
                value = value.substr(-fphmLen)
            }
        }
        list[index][columnName] = value
        // this.metaAction.sf(`data.zzsxgmkcxmqd`, fromJS(list))
        this.metaAction.sfs({
            'data.zzsxgmkcxmqd': fromJS(list),
        })
        this.formatData()
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
    selectChange = ( index, value) => {
        let list = this.metaAction.gf(`data.zzsxgmkcxmqd`).toJS()
        let error = this.metaAction.gf(`data.error`).toJS()
        if(!value){
            list[index].pzzl = ''
        }else {
            list[index].pzzl = value
            // //判断当前下拉选框是否为错误状态，取消错误校验信息
            // if(error[index] && Object.keys(error[index]).length != 0 && error[index].hasOwnProperty('hmc')){
            //     delete error[index].hmc
            // }
        }
        
        this.injections.reduce('changeSelect', list, error)
        this.formatData()
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
