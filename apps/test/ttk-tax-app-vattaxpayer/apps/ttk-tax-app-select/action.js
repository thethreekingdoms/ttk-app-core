import React from 'react'
import { Map, fromJS } from 'immutable'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { TableOperate, Select, LoadingMask, Button, Tooltip, Modal, Input, Checkbox, Icon, Upload, Radio, Popover } from 'edf-component'
import extend from './extend'
import config from './config'
import moment from 'moment'
import * as data from './data'
import { fetch, number, history } from 'edf-utils'
import isEquall from 'lodash.isequal'

// 1 必填  //增值税纳税申报表（适用于增值税一般纳税人）
// 2 必填  //增值税纳税申报表附列资料(表一)(本期销售情况明细)
// 3 必填  //增值税纳税申报表附列资料（表二）
// 4 默认不选，ygzNsrzg_dm==11 锁定不可选，否则可选  //增值税纳税申报表附列资料（表三）
// 5.默认勾选，可修改  //增值税纳税申报表附列资料（表四）
// 6.默认不选，可修改  //增值税纳税申报表附列资料（五）
// 7.fqmsqBz=='Y'纳税人自行勾选；为N，默认勾选 ，可修改。  //增值税减免税申报明细表
// 8.ygzsfqybbBz=='Y' ，默认勾选此表，不可修改；  //营改增税负分析测算明细表
//   ygzsfqybbBz=='N'，ygzsfqyBz='Y'，选中该表，可修改  //
//   ygzNsrzg_dm==11，此表锁定不可选（优先判断）  //
//   其他情况不选中该表，可修改  //
//-----------------目前没有这张表不需要考虑 9.与附表四联动，附表四勾选，此表默认勾选，附表四取消此表取消（只是联动，联动后可取消吗）  //完税凭证抵扣（减）清单（广东地区表单）
//-----------------目前没有这张表不需要考虑 10.与附表三联动，附表三勾选，此表勾选，附表三取消，此表默认取消  //服务、不动产和无形资产扣除项目清单（广东地区表单）
//-----------------目前没有这张表不需要考虑 11.仅山东，山东除青岛外，必报  //增值税补充申报表（仅山东）
//类1、初始化根据qtxx判断是否可选 即选框是否置灰
//类2、初始化根据qtxx判断选中还是不选中 
//类3、选择时判断表间联动
//类4、重置时根据qtxx重置 1,2
let selectMap = {
    generalvattaxpayer: {
        zzssyyybnsrzb: {
            isSelected: true
        },//
        zzssyyybnsr01bqxsqkmxb: {
            isSelected: true
        },//
        zzssyyybnsr02bqjxsemxb: {
            isSelected: true
        },//
        zzssyyybnsr03ysfwkcxmmx: {
            isSelected: false
        },//
        zzssyyybnsr04bqjxsemxb: {
            isSelected: true
        },//
        zzssyyybnsr05bdcfqdkjsb: {
            isSelected: false
        },//
        zzsjmssbmxb: {
        },//
        zzssyyybnsrygzsffxcsmxb: {
        }//
    }
}

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        let addEventListener = this.component.props.addEventListener
        let initData = this.component.props.initData
        if (addEventListener) {
            addEventListener('onTabFocus', ::this.onTabFocus)
        }
        if (this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        }
        if (this.component.props.setCancelLister) {
            this.component.props.setCancelLister(this.onCancel)
        }

        this.load(initData)
    }

    load = async (initData) => {
        let res
        if( this.getIsNewType( initData.selecTableType ) ) {
            res = await this.webapi.tax.init( { ss:initData.ss, yzpzzldm: initData.yzpzzldm, skssqq: initData.skssqq, skssqz: initData.skssqz } )
            res.fromName = initData.fromName
            res.qtxx = initData.qtxx
            res = this.setSelectProps( res , true )
        } else {
            res = await this.webapi.tax.queryReport( {appraisalId:initData.appraisalId} )
        }
        if( res ) {
            this.injections.reduce('load', res, initData )
        }
    }
    
    optCol = (record, text , rowIndex) => {
        let disable
        if( this.getIsNewType() ) {
            // disable = (record.required == 1)
            disable = this.component.props.initData.disabled || (record.required == 1) || record.disabled
        } else {
            disable = true
        }
        return <Checkbox checked={record.isSelected} onClick={() => this.updateDeclareItem(record, rowIndex)} disabled={ disable } ></Checkbox>       
    }

    NameCol= (text, record, rowIndex) => {
        if( record.bstj ) {
            return (<Popover content={<p className="c2-title">{record.bstj}</p>} placement="bottom" overlayClassName={'ttk-tax-app-generalvattaxpayer-popover'}>
                <p className="c2-text">{ text }</p>
            </Popover>)
        } else {
            return <p className="c2-text">{ text }</p>
        }
    }

    resetClick = async () => {
        if( this.component.props.initData.disabled ) {
            return
        }
        if( this.getIsNewType() ) {
            let data = this.setSelectProps(),
                params = { 
                    id: data.id,
                    ss: data.ss,
                    skssqq: data.skssqq,
                    skssqz: data.skssqz,
                    info: data.info,
                    yzpzzldm: data.yzpzzldm
                }
            params.info = params.info.map( item => {
                delete item.disabled
                return item
            })
            let saveRes = await this.webapi.tax.save( params )
            if( saveRes ) {
                this.metaAction.toast('success', '选择表单重置成功')
                data = this.setSelectProps()
                this.injections.reduce('setData', data )
            
            }
        } else {
        }
    }

    initTableData = ( newlist, oldlist ) => {
        let reload = false        
        newlist.map( ( item , index ) => {
            if(item.isSelected != oldlist[ index ].isSelected ) {
                reload = true
            }
        })

        if( reload ) {
            this.component.props.initData.initialization( this.component.props.initData.params, true )
        }
    }

    updateDeclareItem = async (record, rowIndex) => {
        this.metaAction.sf( 'data.info.'+rowIndex+'.isSelected' , !record.isSelected )
    }

    onOk = async (name) => {
        if( this.component.props.initData.disabled ) {
            return true
        }
        if( this.getIsNewType() ) {
            const data = this.metaAction.gf('data').toJS(),
                params = { 
                    id: data.id,
                    ss: data.ss,
                    skssqq: data.skssqq,
                    skssqz: data.skssqz,
                    info: data.info,
                    yzpzzldm: data.yzpzzldm
                }
                params.info = params.info.map( item => {
                    delete item.disabled
                    return item
                })
            let saveRes = await this.webapi.tax.save( params )

            
            if( saveRes ) {
                this.initTableData( data.info, data.oldInfo )
                this.metaAction.toast('success', '选择表单保存成功')
                
                return true
            }
        } else {
            return false
        }
        
    }

    onCancel = () => {
        console.log('cancel')
        const data = this.metaAction.gf('data').toJS()        
        this.initTableData( data.info, data.oldInfo )        
        return true
    }
    
    //判断用新的（调完接口的方式）进行各种选表操作，还是用旧的（这显示表格，不能修改的方式）选表
    getIsNewType = ( selecTableType ) => {
        selecTableType = selecTableType || this.metaAction.gf( 'data.selecTableType' )
        return ( selecTableType == 'newtype' )
    }

    setSelectProps = ( repData, OnlySetDisabled ) => {
        let data = repData || this.metaAction.gf('data').toJS(),
            qtxx = data.qtxx,
            info = data.info,
            fromName = data.fromName

        if( qtxx ) {
            data.info = info.map( item => {
                if( fromName == 'generalvattaxpayer' ) {
                    item = this.setSelectPropsOfGeneralvattaxpayer( qtxx, item, fromName, OnlySetDisabled )
                }
                return item
            })
        }
        
        return data
    }

    setSelectPropsOfGeneralvattaxpayer( qtxx, item , fromName, OnlySetDisabled ) {//一般增值税根据需求重置各表是否选中 isSelect
        if( item.required == 1 ) {
            item.disabled = true
        } else {
            item.disabled = false            
        }
        // 4 默认不选，ygzNsrzg_dm==11 锁定不可选，否则可选  //增值税纳税申报表附列资料（表三）
        if ( item.code == 'zzssyyybnsr03ysfwkcxmmx' ) {//
            if( qtxx.ygzNsrzg=='11' ) {
                item.disabled = true
            } else {
                item.disabled = false            
            }
        } else if ( item.code == 'zzssyyybnsrygzsffxcsmxb' ) {//
            // 8.ygzsfqybbBz=='Y' ，默认勾选此表，不可修改；  //营改增税负分析测算明细表
            //   ygzsfqybbBz=='N'，ygzsfqyBz='Y'，选中该表，可修改  //
            //   其他情况不选中该表，可修改  //
            if( qtxx.ygzNsrzg == '11' ) {
                item.disabled = true                
            } else if ( qtxx.ygzsfqybbBz == 'Y' ) {
                item.disabled = true                
            } else if ( qtxx.ygzsfqybbBz=='N' && qtxx.ygzsfqyBz=='Y' ) {
                item.disabled = false                
            } else {
                item.disabled = false                                
            }
        }
        // 5.默认勾选，可修改  //增值税纳税申报表附列资料（表四）
        // 6.默认不选，可修改  //增值税纳税申报表附列资料（五）
        // 7.fqmsqBz=='Y'纳税人自行勾选；为N，默认勾选 ，可修改。  //增值税减免税申报明细表
        // 8.ygzsfqybbBz=='Y' ，默认勾选此表，不可修改；  //营改增税负分析测算明细表
        //   ygzsfqybbBz=='N'，ygzsfqyBz='Y'，选中该表，可修改  //
        //   ygzNsrzg_dm==11，此表锁定不可选（优先判断）  //
        //   其他情况不选中该表，可修改  //

        if( !OnlySetDisabled ) {//重置时设置
            // 7.fqmsqBz=='Y'纳税人自行勾选；为N，默认勾选 ，可修改。  //增值税减免税申报明细表
            if ( item.code == 'zzsjmssbmxb' ) {//
                if( qtxx.fqmsqBz=='Y' ) {
                    item.isSelected = false
                } else {
                    item.isSelected = true
                }
            } else if ( item.code == 'zzssyyybnsrygzsffxcsmxb' ) {//
                // 8.ygzsfqybbBz=='Y' ，默认勾选此表，不可修改；  //营改增税负分析测算明细表
                //   ygzsfqybbBz=='N'，ygzsfqyBz='Y'，选中该表，可修改  //
                //   其他情况不选中该表，可修改  //
                if( qtxx.ygzNsrzg == '11' ) {
                    
                } else if( qtxx.ygzsfqybbBz == 'Y' || ( qtxx.ygzsfqybbBz=='N' && qtxx.ygzsfqyBz=='Y' ) ) {
                    item.isSelected = true                
                } else {
                    item.isSelected = false                
                }
            } else {
                item.isSelected = selectMap[ fromName ][item.code].isSelected
            }
        }
        return item
    }

    

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction }),
        ret = { ...metaAction, ...extendAction.gridAction, ...o }
    metaAction.config({ metaHandlers: ret })
    return ret
}