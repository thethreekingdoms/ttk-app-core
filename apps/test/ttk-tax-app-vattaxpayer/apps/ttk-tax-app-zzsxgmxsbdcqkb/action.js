import React from 'react'
import { Map, fromJS, is } from 'immutable'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import extend from './extend'
import config from './config'
import { fetch, number, history } from 'edf-utils'
import { Form, Popover, LoadingMask, Input, FormDecorator, DatePicker } from 'edf-component'
import moment from 'moment'

const FormItem = Form.Item;
let focusBtnIndex = undefined
const EdiFormCell = ({ value, onBlur, onEnter, type, disabled, message}) => {
    if(type == 'Input') {
        if(message) {
            return (<Popover  
            content={<div style={{maxWidth: '300px'}}>{renderMessage( message )}</div>}  
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'} >
                <Input.Number
                value={value}
                onBlur={(value) => onBlur(value)}
                onPressEnter={(e) => onEnter(e)} 
                style={{'textAlign':'right'}}
                className={message?'bg-check':''}
                disabled= {disabled}
                regex='^(-?[0-9]+)(?:\.[0-9]{1,2})?$'/>
            </Popover>)
        } else {
            return (<Input.Number
                value={value}
                onBlur={(value) => onBlur(value)}
                onPressEnter={(e) => onEnter(e)} 
                style={{'textAlign':'right'}}
                disabled= {disabled}
                regex='^(-?[0-9]+)(?:\.[0-9]{1,2})?$'/>)
        }
    } else if( type == 'DatePicker') {
        if(message) {

            return (<Popover  
            content={<div style={{maxWidth: '300px'}}>{renderMessage( message )}</div>}  
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'} >
                <DatePicker
					value={ value?moment( value ):undefined}
                    onChange={(value) => onBlur(value.format('YYYY-MM-DD'))}
                    disabled= {disabled}
				>
				</DatePicker>
            </Popover>)
        } else {
            return (<DatePicker
					value={ value?moment( value ):undefined}
                    onChange={(value) => onBlur(value.format('YYYY-MM-DD'))}
                    disabled= {disabled}
				>
				</DatePicker>)
        }
    } else if(type == 'InputStr') {
        if(message) {
            return (<Popover  
            content={<div style={{maxWidth: '300px'}}>{renderMessage( message )}</div>}  
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'} >
                <Input
                value={value}
                onBlur={(value) => onBlur(value.target.value)}
                onPressEnter={(e) => onEnter(e)} 
                style={{'textAlign':'right'}}
                className={message?'bg-check':''}
                disabled= {disabled}
                />
            </Popover>)
        } else {
            return (<Input
                value={value}
                onBlur={(value) => onBlur(value.target.value)}
                onPressEnter={(e) => onEnter(e)} 
                style={{'textAlign':'right'}}
                disabled= {disabled}
                />)
        }
    } else {
        if(message) {
            return ( <Popover  
            content={<div style={{maxWidth: '300px'}}>{renderMessage( message )}</div>}  
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'} >
                <div className='error' style={{'textAlign':'right'}}>{value}</div>
            </Popover> )
        } else {
            return (<div style={{'textAlign':'right'}}>{value}</div>)
        }
    }
}

const renderMessage = ( message ) => {
    if( !message ) return false
    let messageItems  = []
    message.map( ( item, index ) => {
        messageItems.push( <p style={{marginBottom: 0}} className='message-p'>{index+1}、{item}</p> )
    })
    return messageItems
}

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
    }

    //初始化接口调用
	load = async (data) => {
        let params = this.metaAction.gf('data.periodData')
        let response = await this.webapi.balancesheet.getCashFlowDistributionInfo(params)
        if(response) {
		    this.injections.reduce( 'load', response )        
        }
    }

    componentWillReceiveProps = ( nextProps ) => {
        let preprops = fromJS( this.component.props )
        if( !is( preprops , fromJS( nextProps ) ) ) {
            this.injections.reduce('update' , nextProps.initData )
            // if( focusBtnIndex === undefined ) {
            //     setTimeout(() => {
            //         const inputs = document.getElementsByClassName('ant-input mk-input-number')
            //         inputs[0].focus()
            //     }, 100)
            // }
        }
    }

    componentDidMount = () => {   
        setTimeout(() => {
            const inputs = document.getElementsByClassName('ant-input mk-input-number')
            inputs[0].focus()
        }, 10)    
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

    //江苏纳税人识别号跳企业信息
    renderTitle = (title) => {
        title = title ? title : ( this.component.props.initData.SS == '32' ? <a onClick={this.changeProtal.bind(this)}>完善企业信息</a> : '')
        return title
    }
    
    changeProtal = () => {
        this.component.props.setPortalContent &&
        this.component.props.setPortalContent('企业信息', 'edfx-app-org', { initData: { activeKey: '2' } })
    }

    renderFormCell = (columnName, value, type ) => {
        let message = false,
            checkData = this.metaAction.gf(`data.checkData`) ? this.metaAction.gf(`data.checkData`).toJS():undefined,
            isDeclare = !!this.metaAction.gf(`data.isDeclare`),
            isCanModify = this.metaAction.gf(`data.isCanModify`),
            disabled,
            cellComponentsMap = this.metaAction.gf(`data.cellComponentsMap`).toJS(),
            component
        if( checkData ) {
            checkData.map( item => {
                if( item.target == 'zzsxgmxsbdcqkb_'+columnName ) {
                    message = item.message
                }
            })
        }
        
        if( isDeclare && !isCanModify ) {
            disabled = true
        }
        if( columnName == 'xsbdcbhsxse' || columnName == 'swjgdkdzzszyfpbhsxse' ) {

            value = value===null ? 0: value        
            value = number.format( value, 2 )        
        } else {
            value = value ? value: undefined                    
        }
        return <EdiFormCell 
        type={ cellComponentsMap[columnName] }
        disabled={disabled}
        value={ value}
        onBlur={(value) => this.handleBlur(value, columnName)}
        onEnter={(e) => this.handleEnter(e, columnName)}
        message={ message }     
        >
        </EdiFormCell>
    }

    handleEnter = (e, columnName) => {
        if (e.keyCode == 13 || e.key == 'Enter' || e.keyCode == 108) {
            const inputs = document.getElementsByClassName('ant-input mk-input-number')
            const index = $(inputs).index(e.target)
            if(index + 1 == inputs.length){
                return
            }
            focusBtnIndex = index + 1               
            inputs[index + 1].focus()           
        }  
    }

    handleBlur = (value, columnName) => {
        if( columnName == 'xsbdcbhsxse' || columnName == 'swjgdkdzzszyfpbhsxse' ) {
            value = number.clearThousPos( value )
        }            
        let changeTable = this.metaAction.gf('data.zzsxgmxsbdcqkb').toJS()
        let changeItems= [{
            path: `zzsxgmxsbdcqkb_${columnName}`,
            oldValue: changeTable[columnName] || 0,
            newValue: value
        }]
                
        let type 
        if( columnName == 'xsbdcbhsxse' || columnName == 'swjgdkdzzszyfpbhsxse' ) {
            if (value && value > 99999999999999.99) {
                value = 99999999999999.99
                this.metaAction.toast('warning', `不能大于99,999,999,999,999.99`)
            }
            if (value && value < -99999999999999.99) {
                value = -99999999999999.99
                this.metaAction.toast('warning', `不能小于-99,999,999,999,999.99`)
            }
            type = false       
        } else {
            type = true                    
        }
        changeTable[columnName] = value
        let res = this.component.props.setVOData({changeTable, changeItems},type)
        let newData = {}
        if( res ) {
            newData[ `data.zzsxgmxsbdcqkb` ] = fromJS( res.changeData )
            newData[ `data.checkData` ] = fromJS( res.checkDat )
        } else {
            newData[ `data.zzsxgmxsbdcqkb` ] = fromJS( changeTable )
        }
        this.metaAction.sfs(newData)
        if( focusBtnIndex !== undefined ) {
            setTimeout(() => {
                const inputs = document.getElementsByClassName('ant-input mk-input-number')
                inputs[ focusBtnIndex ].focus()
                focusBtnIndex = undefined
            },0)    
        }
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
