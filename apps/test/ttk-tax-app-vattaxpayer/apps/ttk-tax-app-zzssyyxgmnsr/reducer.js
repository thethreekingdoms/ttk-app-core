import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'
import { Map, fromJS } from 'immutable'
import { number } from 'edf-utils'
import personalise from './personalise'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
            
        this.config = config.current
    }

    init = (state, option, setVOData ) => {
        
        let mapRelation = option.mapRelation, //映射关系
            sbbhead = option.sbbhead,//表头数据
            zzsxgmGrid = option.zzssyyxgmnsr.zzsxgmGrid || {},//主表表格数据
            zzsxgmGridlb = zzsxgmGrid.zzsxgmGridlb,
            slxxForm = option.zzssyyxgmnsr.slxxForm,//form数据
            checkData = option.checkData,
            originalMeta,
            tTable
        
        let initState = getInitState(),
            oldState = fromJS( initState )
        originalMeta = initState.data.originalMeta
        let tMeta = this.changeRenderMerge( checkData , originalMeta , mapRelation )
        tMeta = personalise( option.SS , tMeta, option.qtxx )                        
        initState.data.originalMeta = oldState.toJS().data.originalMeta
        initState.data.tMeta = tMeta
        initState.data.tTable = this.getTableData( initState.data.tTable , zzsxgmGridlb, mapRelation )
        initState.data.zzssyyxgmnsr = option.zzssyyxgmnsr ? option.zzssyyxgmnsr : {
            sbbhead:{},
            slxxForm:{}
        }
        initState.data.mapRelation = mapRelation
        initState.data.setVOData = setVOData
        initState.data.isDeclare = option.isDeclare
        initState.data.isCanModify = option.isCanModify
        return this.metaReducer.init(state, initState)
    }

    load = (state, initData, setVOData ) => {
        let data = this.metaReducer.gf(state, 'data').toJS(),
            mapRelation = initData.mapRelation, //映射关系
            sbbhead = initData.sbbhead,//表头数据
            zzsxgmGrid = initData.zzssyyxgmnsr.zzsxgmGrid || {},//主表表格数据
            zzsxgmGridlb = zzsxgmGrid.zzsxgmGridlb,
            slxxForm = initData.zzssyyxgmnsr.slxxForm,//form数据
            checkData = initData.checkData,
            originalMeta,
            originalMeta2 = fromJS( this.setOriginalMeta( data.originalMeta , initData.isSelfemployed, initData.qtxx, initData.zzsxgmflzl, initData.isCanModify ) ),
            tTable
        
        originalMeta = originalMeta2.toJS()
        let tMeta = this.changeRenderMerge( checkData , originalMeta , mapRelation )
        tMeta = personalise( initData.SS , tMeta, initData.qtxx )
        data.tMeta = tMeta
        data.originalMeta = originalMeta2.toJS()
        data.tTable = this.getTableData( data.tTable , zzsxgmGridlb, mapRelation )
        data.zzssyyxgmnsr = initData.zzssyyxgmnsr ? initData.zzssyyxgmnsr : {
            sbbhead:{},
            slxxForm:{}
        }
        data.mapRelation = mapRelation
        if(setVOData) {
            data.setVOData = setVOData
        }
        data.isDeclare = initData.isDeclare
        data.isCanModify = initData.isCanModify
        data.SS = initData.SS
        data.qtxx = initData.qtxx
        state = this.metaReducer.sf(state, 'data', fromJS(data))
        return state
    }     
    
    setOriginalMeta = ( originalMeta , isSelfemployed, qtxx, zzsxgmflzl, isCanModify ) => {
        //判断附表一的第5列非0时主表第一栏第二列不可填，附表第13列非0时主表第四栏第二列不可填
        if(zzsxgmflzl.flzlForm && zzsxgmflzl.flzlForm.ysfwxsqbhssr && zzsxgmflzl.flzlForm.ysfwxsqbhssr != 0) {
            originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                if( rItem.index == 0 ) {
                    rItem.disabled = true
                }
                return rItem
            })
        }else {
            originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                if( rItem.index == 0 ) {
                    rItem.disabled = false
                }
                return rItem
            })
        }
        
        if(zzsxgmflzl.flzlForm && zzsxgmflzl.flzlForm.ysfwxsqbhssr5 && zzsxgmflzl.flzlForm.ysfwxsqbhssr5 != 0) {
            originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                if( rItem.index == 3 ) {
                    rItem.disabled = true
                }
                return rItem
            })
        }else {
            originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                if( rItem.index == 3 ) {
                    rItem.disabled = false
                }
                return rItem
            })
        }

        //其他信息未返回，除自动计算的都可填
        if(isCanModify) {
            return this.returnComponent('Input', originalMeta)
        }else {
            originalMeta = this.returnComponent('Text', originalMeta)
            //应税货物劳务标志（yshwlwBz）为“N”时，该栏锁定
            if( qtxx && qtxx.yshwlwBz == 'N' ) {
                let arr = [0, 1, 2, 6, 7, 9, 10, 11, 12, 13, 15, 20]
                originalMeta['C01'].renderMerge = originalMeta['C01'].renderMerge.map( rItem => {
                    if( arr.indexOf(rItem.index) >-1 ) {
                        rItem.component = 'Text'
                    }
                    return rItem
                })
            }else if( ( qtxx && qtxx.yshwlwBz == 'Y' ) || !qtxx){
                let arr = [0, 1, 2, 6, 7, 9, 10, 11, 12, 13, 15, 20]
                originalMeta['C01'].renderMerge = originalMeta['C01'].renderMerge.map( rItem => {
                    if( arr.indexOf(rItem.index) >-1 ) {
                        rItem.component = 'Input'
                    }
                    return rItem
                })
            }
            //当应税服务标志（ysfwBz）为“N”时，该栏锁定
            if(  qtxx && qtxx.ysfwBz == 'N' ) {
                let arr = [0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20]
                originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                    if( arr.indexOf(rItem.index) >-1 ) {
                        rItem.component = 'Text'
                    }
                    return rItem
                })
            }else if( ( qtxx && qtxx.ysfwBz == 'Y' ) || !qtxx){
                let arr = [0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20]
                originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                    if( arr.indexOf(rItem.index) >-1 ) {
                        rItem.component = 'Input'
                    }
                    return rItem
                })
            }
            //11行isSelfemployed 为true可填，10行相反
            if( ( qtxx && qtxx.yshwlwBz == 'N' ) || isSelfemployed){
                originalMeta['C01'].renderMerge = originalMeta['C01'].renderMerge.map( rItem => {
                    if( rItem.index == 9 ) {
                        rItem.component = 'Text'
                    }
                    return rItem
                })
            }
            if( ( qtxx && qtxx.yshwlwBz == 'N' ) || ( qtxx && qtxx.yqwrdzzsybnsrBz == 'Y' ) || !isSelfemployed) {
                originalMeta['C01'].renderMerge = originalMeta['C01'].renderMerge.map( rItem => {
                    if( rItem.index == 10 ) {
                        rItem.component = 'Text'
                    }
                    return rItem
                })
            }
            if( ( qtxx && qtxx.ysfwBz == 'N' ) || isSelfemployed){
                originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                    if( rItem.index == 9 ) {
                        rItem.component = 'Text'
                    }
                    return rItem
                })
            }
            if( ( qtxx && qtxx.ysfwBz == 'N' ) || ( qtxx && qtxx.yqwrdzzsybnsrBz == 'Y' ) || !isSelfemployed) {
                originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
                    if( rItem.index == 10 ) {
                        rItem.component = 'Text'
                    }
                    return rItem
                })
            }

            return originalMeta
        }
    }

    returnComponent = (type, originalMeta) => {
        let arr = [0, 1, 2, 6, 7, 9, 10, 11, 12, 13, 15, 16,17,18,20]
        originalMeta['C01'].renderMerge = originalMeta['C01'].renderMerge.map( rItem => {
            if( arr.indexOf(rItem.index) >-1 ) {
                rItem.component = type
            }
            return rItem
        })
        let arr2 = [0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20]
        originalMeta['C02'].renderMerge = originalMeta['C02'].renderMerge.map( rItem => {
            if( arr2.indexOf(rItem.index) >-1 ) {
                rItem.component = type
            }
            return rItem
        })

        originalMeta['C03'].component = type
        originalMeta['C04'].component = type
        return originalMeta
    }
    updateData = ( state, initData ) => {
        let data = this.metaReducer.gf(state, 'data').toJS(),
            mapRelation = initData.mapRelation, //映射关系
            sbbhead = initData.sbbhead,//表头数据
            zzsxgmGrid = initData.zzssyyxgmnsr.zzsxgmGrid || {},//主表表格数据
            zzsxgmGridlb = zzsxgmGrid.zzsxgmGridlb,
            slxxForm = initData.zzssyyxgmnsr.slxxForm,//form数据
            checkData = initData.checkData,
            originalMeta,
            tTable
        
        originalMeta = data.originalMeta
        let tMeta = this.changeRenderMerge( checkData , originalMeta , mapRelation )
        tMeta = personalise( data.SS , tMeta, data.qtxx )        
        data.tMeta = tMeta
        data.tTable = this.getTableData( data.tTable , zzsxgmGridlb, mapRelation )
        data.zzssyyxgmnsr = initData.zzssyyxgmnsr ? initData.zzssyyxgmnsr : {
            sbbhead:{},
            slxxForm:{}
        }
        data.mapRelation = mapRelation
        state = this.metaReducer.sf(state, 'data', fromJS(data))
        return state
    }

    setData = (state, resData ) => {
        let data = this.metaReducer.gf(state, 'data').toJS(),
            mapRelation = data.mapRelation, //映射关系
            originalMeta = data.originalMeta,
            checkData = resData.checkData,
            changeData = resData.changeData,
            sbbhead = changeData.sbbhead,//表头数据
            zzsxgmGrid = changeData.zzsxgmGrid || {},//主表表格数据
            zzsxgmGridlb = zzsxgmGrid.zzsxgmGridlb,
            slxxForm = changeData.slxxForm,//form数据
            tTable = data.tTable

        tTable = this.getTableData( tTable , zzsxgmGridlb, mapRelation )
        let tMeta = this.changeRenderMerge( checkData , originalMeta , mapRelation )
        tMeta = personalise( data.SS , tMeta, data.qtxx )                
        state = this.metaReducer.sf(state, 'data.tTable', fromJS(tTable) )
        state = this.metaReducer.sf(state, 'data.tMeta', fromJS(tMeta) )
        state = this.metaReducer.sf(state, 'data.zzssyyxgmnsr', fromJS(changeData) )
        return state
    }

    changeRenderMerge( checkData , originalMeta , mapRelation ) {
        if( !checkData || !checkData.length ) return originalMeta
        let pathArr
        checkData.map( item => {
            let path = item.target,
                message = item.message,
                zzssyyxgmnsrMap = mapRelation.zzssyyxgmnsr,
                pathArr = path.split('_'),
                colName = 'C0'+( parseInt( pathArr[ pathArr.length-2 ] )+ 1),
                rowNum = zzssyyxgmnsrMap[ pathArr[ pathArr.length-1 ] ] - 1,
                haveRItem = false,
                component = originalMeta[ colName ].component                
            
            if( !originalMeta[ colName ].renderMerge ) {
                originalMeta[ colName ].renderMerge = []
            }
            originalMeta[ colName ].renderMerge = originalMeta[ colName ].renderMerge.map( rItem => {
                if( rItem.index == rowNum ) {
                    rItem.message = item.message
                    haveRItem = true
                }
                return rItem
            })
            if( !haveRItem ) {
                originalMeta[ colName ].renderMerge.push( {
                    index: rowNum,
                    message: item.message,
                    component
                } )
            }
        })
        return originalMeta
    }
  
    updateReduce = (state, name, value) => {
        return this.metaReducer.sf(state, name, value)
    }

    getTableData = ( tTable, zzsxgmGridlb, mapRelation ) => {
        let colMap = mapRelation.zzssyyxgmnsr
        zzsxgmGridlb = zzsxgmGridlb?zzsxgmGridlb:[]
        
        zzsxgmGridlb.map( (item, index) => {
            let indexStr = this.getIndexStr( index )
            for(let key in item ) {
                if( key !='ewblxh' && key != 'lmc') {
                    if ( colMap[key] === undefined ) continue
                    if( tTable[ colMap[key]-1 ]['C'+indexStr ] == '- -') continue
                    tTable[ colMap[key]-1 ]['C'+indexStr ] = number.format( item[key]-0 , 2 )
                }
            }
        })
        return tTable
    }

    getIndexStr( index ) {
        return (index+1<10 ? ('0'+(index+1)): (''+(index+1)) )
    }
}


export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}