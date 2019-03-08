import React from 'react'
import { Map, fromJS, List, is } from 'immutable'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import { Radio, Menu, Collapse, TableOperate, Table, Select, Button, Modal, Input, Number, Checkbox, DatePicker, Icon, Popconfirm, FormDecorator, LoadingMask, Popover} from 'edf-component'
import { number } from 'edf-utils'

const Panel = Collapse.Panel
const MenuItem = Menu.Item
const Option = Select.Option;
let formulaList = [];
const CHECK = 1; //校验类型
const CALC = 0;  //计算类型 
const PATHRGX = /[a-zA-Z0-9_]+/g
let focusBtnIndex = undefined
const RadioGroup = Radio.Group

let getColumns = ( columns, renderCell ) => {
    columns = columns.map( item => {
        if( item.children ) {
            item.children = getColumns( item.children, renderCell )
        } else {
            item.render = function(text, record, index) {
                return renderCell( item.key , index, text)
            }
        }
        return item
    })
    return columns 
}

const EdiFormCell = ({ value, onBlur, onEnter, type, disabled, message}) => {
    if(type == 'Input') {
        if(message) {
            return (<Popover  
            content={<div style={{maxWidth: '300px'}}>{renderMessage( message )}</div>}  
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'} >
                <div><Input
                value={value}
                onBlur={(value) => onBlur(value.target.value.substr(0,100))}
                onPressEnter={(e) => onEnter(e)} 
                style={{'textAlign':'right'}}
                className={message?'bg-check':''}
                disabled= {disabled}/></div>
            </Popover>)
        } else {
            return (<Input
                value={value}
                onBlur={(value) => onBlur(value.target.value.substr(0,100))}
                onPressEnter={(e) => onEnter(e)} 
                style={{'textAlign':'right'}}
                disabled= {disabled}/>)
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

const SelectCell = ({ value, onChange, onEnter, type, disabled, message}) => {
    
    if(type == 'Select') {
        let list = [
            {
                id:"227", 
                name:"中国护照"
            },
            {
                id:"228", 
                name:"城镇退役士兵自谋职业证"
            },
            {
                id:"101", 
                name:"组织机构代码证"
            },
            {
                id:"199", 
                name:"其他单位证件"
            },
            {
                id:"201", 
                name:"居民身份证"
            },
            {
                id:"202", 
                name:"军官证"
            },
            {
                id:"203", 
                name:"武警警官证"
            },
            {
                id:"204", 
                name:"士兵证"
            },
            {
                id:"205", 
                name:"军队离退休干部证"
            },
            {
                id:"206", 
                name:"残疾人证"
            },
            {
                id:"207", 
                name:"残疾军人证（1-8级）"
            },
            {
                id:"208", 
                name:"外国护照"
            },
            {
                id:"210", 
                name:"港澳居民来往内地通行证"
            },
            {
                id:"212", 
                name:"中华人民共和国往来港澳通行证"
            },
            {
                id:"213", 
                name:"台湾居民来往大陆通行证"
            },
            {
                id:"214", 
                name:"大陆居民往来台湾通行证"
            },
            {
                id:"215", 
                name:"外国人居留证"
            },
            {
                id:"216", 
                name:"外交官证"
            },
            {
                id:"217", 
                name:"使（领事）馆证"
            },
            {
                id:"218", 
                name:"海员证"
            },
            {
                id:"219", 
                name:"香港身份证"
            },
            {
                id:"220", 
                name:"台湾身份证"
            },
            {
                id:"221", 
                name:"澳门身份证"
            },
            {
                id:"222", 
                name:"外国人身份证件"
            },
            {
                id:"224", 
                name:"就业失业登记证"
            },
            {
                id:"225", 
                name:"退休证"
            },
            {
                id:"226", 
                name:"离休证"
            },
            {
                id:"299", 
                name:"其他个人证件"
            },
            {
                id:"102",
                name:"营业执照"
            },
            {
                id:"234",
                name:"就业创业证"
            },
            {
                id:"291",
                name:"医学出生证明"
            },
            {
                id:"233", 
                name:"外国人永久居留证"
            }
        ]
        const options = list.map(d => <Option key={d.id}>{d.name}</Option>);
        if(message) {
            return ( <Popover  
            content={<div style={{maxWidth: '300px'}}>{renderMessage( message )}</div>}  
            getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
            overlayClassName={'ttk-tax-app-vattaxpayer-popover'} >
                <div className='message-select'>
                    <Select
                        allowClear={true}
                        value={value}
                        disabled={disabled}
                        onChange={(value) => onChange(value)}                   
                    >
                        {options}
                    </Select>
                </div>
            </Popover> )
        } else {

            return <Select
                allowClear={true}
                value={value}
                disabled={disabled}
                onChange={(value) => onChange(value)}
            >
            {options}
            </Select>
        }
    } else if(type == 'Radio') {
        return (<div className='sfzxsb-box'>
            <span className='sfzxsb' title='是否自行申报'>是否自行申报</span>
            <RadioGroup value={value == undefined ? true : value}
             onChange={(value) => onChange(value.target.value)}
             disabled={disabled}
             style={{marginLeft: '8px'}}>
             <Radio value={"Y"}>是</Radio>
             <Radio value={"N"}>否</Radio>
         </RadioGroup>
        </div>)
    } else {
        return <input/>
    }
}

const EditableCell = ({ value, onBlur, onEnter, disabled, message }) => {
    if( message ) {
        return (
            <div>
                <Popover 
                content={<div style={{maxWidth: '300px'}}>{renderMessage( message )}</div>} 
                getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                    <Input.Number
                        value={value}
                        onBlur={(value) => onBlur(value)}
                        onPressEnter={(e) => onEnter(e)} 
                        style={{'textAlign':'right'}}
                        disabled={disabled}
                        className={message?'bg-check':''}
                        regex='^(-?[0-9]+)(?:\.[0-9]{1,2})?$'/>
                </Popover>
            </div>
        )
    } else {
        return (
            <div>
            <Input.Number
                value={value}
                onBlur={(value) => onBlur(value)}
                onPressEnter={(e) => onEnter(e)} 
                style={{'textAlign':'right'}}
                disabled={disabled}
                className={message?'bg-check':''}
                regex='^(-?[0-9]+)(?:\.[0-9]{1,2})?$'/>
            </div>
        )

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
        this.config = config.current
        this.webapi = this.config.webapi
    }
    
    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        let addEventListener = this.component.props.addEventListener
        if (addEventListener) {
            addEventListener('onClick', ::this.onClick)
        }
        injections.reduce('init' , component.props.initData, component.props.setVOData )
    }

    load = async (initData, setVOData) => {
        this.injections.reduce('load' , initData, setVOData )
    }

    componentWillReceiveProps = ( nextProps ) => {
        let preprops = fromJS( this.component.props )
        if( !is( preprops , fromJS( nextProps ) ) ) {
            this.injections.reduce('load' , nextProps.initData )
        }
    }

    componentDidMount = () => {   
        // setTimeout(() => {
        //     let formData  = document.querySelector('.ttk-tax-app-zzsxgmfjssb')
        //     if (window.addEventListener) {
        //         formData.addEventListener('keydown', this.keydown, false)
        //     } else if (window.attachEvent) {
        //         formData.attachEvent('onkeydown', this.keydown)
        //     }
        //     let inputs = document.getElementsByClassName('ant-input mk-input-number')
        //         inputs[0].focus()
        // }, 500)  
    }

    componentWillUnmount = () => {
        // let formData  = document.querySelector('.formData')        
        // if (window.removeEventListener) {
        //     formData.removeEventListener('keydown', this.keydown, false)
        // } else if (window.detachEvent) {
        //     formData.detachEvent('onkeydown', this.keydown)
        // }
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

    //江苏纳税人识别号跳企业信息
    renderTitle = (title) => {
        title = title ? title : ( this.component.props.initData.SS == '32' ? <a onClick={this.changeProtal.bind(this)}>完善企业信息</a> : '')
        return title
    }
    
    changeProtal = () => {
        this.component.props.setPortalContent &&
        this.component.props.setPortalContent('企业信息', 'edfx-app-org', { initData: { activeKey: '2' } })
    }

    renderFormCell = (columnName, value, type, shouldMessage ) => {
        let message = false,
            disabled = this.getDisabled()
            // isCanModify = this.metaAction.gf(`data.isCanModify`),
            // isDeclare = !!this.metaAction.gf(`data.isDeclare`)
        if(shouldMessage) {
            message = ['不能为空']
        }
        // if( isDeclare && !isCanModify ) {
        //     disabled = true
        // } else {
        //     disabled = false            
        // }
        
        value = value===null ? 0: value        
        return <EdiFormCell 
        type={ type }
        disabled={disabled}
        value={ value }
        onBlur={(value) => this.handleBlur(value, columnName, undefined, true )}
        onEnter={(e) => this.handleEnter(e, columnName)}
        message={ message }     
        >
        </EdiFormCell>
    }

    renderSelectCell = (columnName, value, type,shouldMessage ) => {
        let message = false,
            disabled = this.getDisabled()    
            // isDeclare = !!this.metaAction.gf(`data.isDeclare`)
        if(shouldMessage) {
            message = ['不能为空']
        }
        return <SelectCell 
        type={ type }
        disabled={disabled}
        value={ value }
        onChange={(value) => this.handleBlur(value, columnName, undefined, true )}
        message={ message }     
        />
    }

    // // new start
    // //判断该列单元格是否是select框
    renderCell = (columnName, index, value) => {
        let editable = true//tableMeta
        let tMeta = this.metaAction.gf('data.tMeta')?this.metaAction.gf('data.tMeta').toJS():{},
            tTable = this.metaAction.gf('data.tTable')?this.metaAction.gf('data.tTable').toJS():[],
            component = tMeta[columnName].component,
            curItem = { component: component,disabled: tMeta[columnName].disabled },
            isDeclare = !!this.metaAction.gf('data.isDeclare'),
            disabled = this.getDisabled()
            
        if( tMeta[columnName].renderMerge ) {
            tMeta[columnName].renderMerge.map( ( item, row ) => {
                if( index == item.index ) {
                    curItem = item
                }
            })
        }
        if( curItem.disabled ) {
            disabled = !!curItem.disabled
        }
        if( curItem.props ) {
            return {
                children: this.setComponent( columnName, index, value ,curItem, disabled ),
                props: curItem.props
            }
        } else {
            return this.setComponent( columnName, index, value ,curItem , disabled )
        }
    }

    setComponent = ( columnName, index, value ,item ,disabled ) => {
        let align = item.align ? item.align : 'center',
            editable = true

        if( item.component == 'Input' ) {
            return (<EditableCell
                value={value}
                onBlur={(value) => this.handleBlur(value, columnName, index)}
                onEnter={(e) => this.handleEnter(e, index, columnName)}
                disabled= { disabled }
                message={ item.message }                
            />)
        }
        else if( item.component == 'Text' ) {
            if( item.message ) {
                return (
                    <div>
                        <Popover 
                        content={<div style={{maxWidth: '300px'}}>{renderMessage( item.message )}</div>} 
                        getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                        overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                            <div title={value} className="text-cell error" style={{'textAlign': align}}>
                                {value}
                            </div>
                        </Popover>
                    </div>
                )
            } else {
                return (<div title={value} className="text-cell" style={{'textAlign': align}}>
                    {value}
                </div>)
            }
        } else {
            if(  item.message  ) {
                return (
                    <div>
                        <Popover 
                        content={<div style={{maxWidth: '300px'}}>{renderMessage( item.message )}</div>} 
                        getPopupContainer={() => document.querySelector('.ttk-tax-app-vatTaxpayer')}
                        overlayClassName={'ttk-tax-app-vattaxpayer-popover'}>
                            <div title={value} className="text-cell error" style={{'textAlign': align}}>
                                {value}
                            </div>
                        </Popover>
                    </div>
                )
            } else {
                return (<div title={value} className="text-cell" style={{'textAlign': align}}>
                    {value}
                </div>)
            }
        }
    }

    renderTextCell = (columnName, index, value) => {
        let list = this.metaAction.gf('data.list')
        return (<div title={value} className="text-cell">
            {value}
        </div>)
    }

    //回车跳到下个单元格keydown
    keydown = (e) => {
        if (e.key === 'Enter' || e.keyCode == 13 || e.keyCode == 108) {
            if( e.target.className.includes('ant-select-search__field') ) {
                setTimeout(() => {
                    let formInput = document.querySelector('.formData .ant-input')
                    focusBtnIndex++   
                    formInput.focus()
                }, 0)
            }
        }
    }

    handleEnter = (e, rowIndex, columnName) => {
        if (e.keyCode == 13 || e.key == 'Enter' || e.keyCode == 108) {
            let inputs = document.getElementsByClassName('ant-input mk-input-number'),
                formInputs = document.querySelectorAll('.formData .ant-input'),
                formSelect = document.querySelector('.formData .ant-select-selection'),
                inputList = [],
                tableInputLength = 0
            for(let i=0;i<inputs.length;i++) {
                if(inputs[i].className.indexOf('ant-input-disabled')<0) {
                    inputList.push(inputs[i])
                    tableInputLength++
                }
            }
            for(let i=0;i<formInputs.length;i++) {
                if(formInputs[i].className.indexOf('ant-input-disabled')<0) {
                    inputList.push(formInputs[i])
                }
            }
            const index = $(inputList).index(e.target)
            if(index + 1 == tableInputLength){
                formSelect.focus()
                formSelect.click()
                return 
            }   
            if(index + 1 == inputList.length) {
                return                
            }
            focusBtnIndex = index + 1   
            inputList[index + 1].focus()
            
        }
    }

    handleBlur = (value, columnName, index, noCalc) => {//焦点离开输入框触发
            //每次改都改 tData 里 对应 tName的值
            //然后把 对应的TName 的所有数据放到 tData 与 tTable 合并
        let originalTable = this.metaAction.gf( 'data.originalTable' ).toJS(),
            tTable = this.metaAction.gf( 'data.tTable' ).toJS(),
            mapRelation = this.metaAction.gf('data.mapRelation').toJS(),
            zzsxgmfjssb = this.metaAction.gf('data.zzsxgmfjssb').toJS(),
            oldValue = noCalc ? undefined : number.clearThousPos( tTable[ index ][ columnName ] ),
            tablePath = 'xgmfjsxxGrid_xgmfjsxxGridlb',
            xgmfjsxxGridlb,
            failCount = 0,
            path
        
        if( !noCalc ) {

            value = number.clearThousPos( value )
            if (value && value > 99999999999999.99) {
                value = 99999999999999.99
                this.metaAction.toast('warning', `不能大于99,999,999,999,999.99`)
            }
            if (value && value < -99999999999999.99) {
                value = -99999999999999.99
                this.metaAction.toast('warning', `不能小于-99,999,999,999,999.99`)//货物及劳务   服务、不动产和无形资产 不能为负数
            }
            //value 保留两位小数
            value = value.toFixed(2) - 0
            path = this.getPath(tablePath, columnName, index, mapRelation)
            if(path.indexOf( 'undefined' )>=0 ) return  
            zzsxgmfjssb = this.setValue( path, value, zzsxgmfjssb )
            xgmfjsxxGridlb = zzsxgmfjssb.xgmfjsxxGrid.xgmfjsxxGridlb
            tTable = this.getTableData( tTable, xgmfjsxxGridlb, mapRelation )

            path = 'zzsxgmfjssb_' + path.replace('[','_').replace(']','')
            this.metaAction.sf( 'data.tTable', fromJS( tTable ) )        
        }

        let setVOData = this.metaAction.gf( 'data.setVOData' ) 
        let res = setVOData( {
            changeTable: zzsxgmfjssb,
            changeItems : [
                {
                    path: path,
                    oldValue: oldValue?oldValue:0,
                    newValue: value
                }
            ],
            failCount
        }, noCalc )
        if(!res) return 
        this.injections.reduce('setData' , res )
        if( focusBtnIndex !== undefined ) {
            setTimeout(() => {
                let inputs = document.getElementsByClassName('ant-input mk-input-number'),
                formInputs = document.querySelectorAll('.formData .ant-input'),
                formSelect = document.querySelector('.formData .ant-select-selection'),
                inputList = [],
                tableInputLength = 0
                for(let i=0;i<inputs.length;i++) {
                    if(inputs[i].className.indexOf('ant-input-disabled')<0) {
                        inputList.push(inputs[i])
                        tableInputLength++
                    }
                }
                for(let i=0;i<formInputs.length;i++) {
                    if(formInputs[i].className.indexOf('ant-input-disabled')<0) {
                        inputList.push(formInputs[i])
                    }
                }
                if(focusBtnIndex == tableInputLength){
                    formSelect.focus()
                    formSelect.click()
                    return 
                }   
                if(focusBtnIndex == inputList.length) {
                    return                
                }
                inputList[focusBtnIndex].focus()
            },0)    
        }
    }

    getPath = (path, columnName, index, mapRelation) => {
        let colNum = '['+index+']',
            zzsxgmfjssb = mapRelation.zzsxgmfjssb,
            rowName
        for(let key in zzsxgmfjssb ) {
            if( zzsxgmfjssb[key] == parseInt( columnName.substr(1) ) ) {
                rowName = key
            }
        }
        path = path  + colNum  +'_'+ rowName
        return path
    }

    setValue = ( path , value , zzsxgmfjssb ) => {
        let pathArr = path.split('_').join('.'),
            str = 'zzsxgmfjssb.'+pathArr+'='+value
        eval(str)
        return zzsxgmfjssb
    }

    //得到表格可展示的数据
    getTableData = ( tTable, xgmfjsxxGridlb, mapRelation ) => {
        let colMap = mapRelation.zzsxgmfjssb
        xgmfjsxxGridlb = xgmfjsxxGridlb?xgmfjsxxGridlb:[]
        
        xgmfjsxxGridlb.map( (item, index) => {
            for(let key in item ) {
                let colStr = this.getIndexStr( colMap[key] )
                if( key !='ewblxh' && key != 'lmc') {
                    if( index > tTable.length - 1 ) {
                        tTable.push({})
                    }
                    if ( colMap[key] === undefined ) continue
                    if( tTable[ index ]['C'+colStr ] == '- -') continue
                    if( colStr == 1 || colStr == 2 || colStr == 3 ) {
                        tTable[ index ]['C'+colStr ] = item[key]
                    } else if( colStr == 7 ) {
                        tTable[ index ]['C'+colStr ] = item[ 'ssjmxzDm' ] ? item[ 'ssjmxzDm' ] + '|' + item[ 'ssjmxzDmMc' ] : ''                        
                    } else if( colStr == 5 ) {
                        tTable[ index ]['C'+colStr ] = ( item[key]*100 ).toFixed(0) + '%'
                    } else {
                        tTable[ index ]['C'+colStr ] = number.format( item[key]-0 , 2 )
                    } 
                }
            }
        })
        return tTable
    }

    getIndexStr( index ) {
        // return (index+1<10 ? ('0'+(index+1)): (''+(index+1)) )
        return (index<10 ? ('0'+(index)): (''+index) )
    }
    // new end

    onTabFocus = (data) => {
        let periodData = this.metaAction.gf('data.selectData').toJS()
        this.load(data.initSearchValue)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}

