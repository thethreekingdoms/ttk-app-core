import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {//初始化
        let initState = getInitState()
        initState.data.periodData = option.periodData
        initState.data.isCanModify = option.initData.isCanModify
        return this.metaReducer.init(state, initState)
    }

    load = (state, isDeclare, zgswjgdm, zgswjgmc, isCanModify, kcxmqdmx, sbbhead) => {
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
        state = this.metaReducer.sf(state, 'data.zzsxgmkcxmqd', fromJS(kcxmqdmx))
        state = this.metaReducer.sf(state, 'data.sbbhead', fromJS(sbbhead))
        state = this.metaReducer.sf(state, 'data.zgswjgdm', fromJS(zgswjgdm))
        state = this.metaReducer.sf(state, 'data.zgswjgmc', fromJS(zgswjgmc))
        state = this.metaReducer.sf(state, 'data.isCanModify', fromJS(isCanModify))
        state = this.metaReducer.sf(state, 'data.other.zzsxgmkcxmqd', fromJS(kcxmqdmx))
        state = this.metaReducer.sf(state, 'data.isDeclare', isDeclare)
        return state
        
    }

    update = (state, change, message, zzsxgmkcxmqd) => {
        if(change && change.checkData){
            change.checkData.map(item => {
                let file = item.target.split('_')
                if(file[1] == `${tableName}Grid`){
                    message[0] = {...message[0]}
                    message[0][file[4]] = item.message
                }
            })
        }
        state = this.metaReducer.sf(state, `data.error`, fromJS(message))
        state = this.metaReducer.sf(state, 'data.other.zzsxgmkcxmqd', fromJS(zzsxgmkcxmqd))
        return state
    }

    changeTable = (state, data, error) => {
        state = this.metaReducer.sf(state, `data.zzsxgmkcxmqd`, fromJS(data))
        state = this.metaReducer.sf(state, 'data.other.zzsxgmkcxmqd', fromJS(data))
        if( error ) {
            state = this.metaReducer.sf(state, `data.error`, fromJS(error))        
        }
        return state
    }

    changeSelect = (state, list, error ) => {
        state = this.metaReducer.sf(state, `data.zzsxgmkcxmqd`, fromJS(list))
        state = this.metaReducer.sf(state, `data.error`, fromJS(error))
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })
    return { ...metaReducer, ...o }
}