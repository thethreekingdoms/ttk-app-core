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

    load = (state, sbbhead, zzsjmssbmxbjsxm, zzsjmssbmxbmsxm, isDeclare) => {
        zzsjmssbmxbjsxm.map(item => {
            if(item.swsxDm && item.swsxDm != ''){
                item.codeSwsxDm = `${item.hmc}|${item.swsxDm}`
            }
        })
        zzsjmssbmxbmsxm.map(item => {
            if(item.swsxDm && item.swsxDm != ''){
                item.codeSwsxDm = `${item.hmc}|${item.swsxDm}`
            }
        })
        if(zzsjmssbmxbjsxm.length == 0){
            zzsjmssbmxbjsxm = [{
                ewbhxh: '1',
                hmc: '合计',
                qcye: '',
                bqfse: '',
                bqydjse: '',
                bqsjdjse: '',
                qmye: ''
            }, {
                ewbhxh: '2',
                hmc: '',
                qcye: '',
                bqfse: '',
                bqydjse: '',
                bqsjdjse: '',
                qmye: ''
            }]
        }
        if(zzsjmssbmxbmsxm.length == 0){
            zzsjmssbmxbmsxm = [{
                ewbhxh: '1',
                hmc: '合计',
                mzzzsxmxse: '',
                bqsjkcje: '',
                kchmsxse: '',
                msxsedyjxse: '',
                mse: ''
            }, {
                ewbhxh: '2',
                hmc: '出口免税',
                mzzzsxmxse: '',
                bqsjkcje: '',
                kchmsxse: '',
                msxsedyjxse: '',
                mse: ''
            }, {
                ewbhxh: '3',
                hmc: '其中：跨境服务',
                mzzzsxmxse: '',
                bqsjkcje: '',
                kchmsxse: '',
                msxsedyjxse: '',
                mse: ''
            }, {
                ewbhxh: '4',
                hmc: '',
                mzzzsxmxse: '',
                bqsjkcje: '',
                kchmsxse: '',
                msxsedyjxse: '',
                mse: ''
            }]
        }
        state = this.metaReducer.sf(state, 'data.zzsjmssbmxbjsxm', fromJS(zzsjmssbmxbjsxm))
        state = this.metaReducer.sf(state, 'data.zzsjmssbmxbmsxm', fromJS(zzsjmssbmxbmsxm))
        state = this.metaReducer.sf(state, 'data.sbbhead', fromJS(sbbhead))
        state = this.metaReducer.sf(state, 'data.other.zzsjmssbmxbjsxm', fromJS(zzsjmssbmxbjsxm))
        state = this.metaReducer.sf(state, 'data.other.zzsjmssbmxbmsxm', fromJS(zzsjmssbmxbmsxm))
        state = this.metaReducer.sf(state, 'data.isDeclare', isDeclare)
        return state
        
    }

    update = (state, change, tableName, message, zzsjmssbmxbjsxmGridlbVO, zzsjmssbmxbmsxmGridlbVO) => {
        if(change && change.checkData){
            change.checkData.map(item => {
                let file = item.target.split('_')
                if(file[1] == `${tableName}Grid`){
                    message[0] = {...message[0]}
                    message[0][file[4]] = item.message
                }
            })
        }
        state = this.metaReducer.sf(state, `data.error.${tableName}`, fromJS(message))
        state = this.metaReducer.sf(state, 'data.other.zzsjmssbmxbjsxm', fromJS(zzsjmssbmxbjsxmGridlbVO))
        state = this.metaReducer.sf(state, 'data.other.zzsjmssbmxbmsxm', fromJS(zzsjmssbmxbmsxmGridlbVO))
        return state
    }

    changeTable = (state, tableName, data) => {
        state = this.metaReducer.sf(state, `data.${tableName}`, fromJS(data))
        return state
    }

    changeSelect = (state, tableName, list, error ) => {
        state = this.metaReducer.sf(state, `data.${tableName}`, fromJS(list))
        state = this.metaReducer.sf(state, `data.error.${tableName}`, fromJS(error))
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })
    return { ...metaReducer, ...o }
}