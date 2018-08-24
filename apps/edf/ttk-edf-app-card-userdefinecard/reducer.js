import {Map, fromJS} from 'immutable'
import {reducer as MetaReducer} from 'edf-meta-engine'
import config from './config'
import {getInitState} from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        if(option != undefined){
            initState.data.archivesName = option
        }
        return this.metaReducer.init(state, initState)
    }

    load = (state, option) => {
        if (option.code) {
            state = this.metaReducer.sf(state, 'data.form.code', fromJS(option.code))
        }
        if (option.name) {
            state = this.metaReducer.sf(state, 'data.form.name', fromJS(option.name))
        }
        if (option.remark) {
            state = this.metaReducer.sf(state, 'data.form.remark', fromJS(option.remark))
        }
        state = this.metaReducer.sf(state, 'data.form.isEnable', fromJS(option.isEnable))
        if (option.archivesName) {
            state = this.metaReducer.sf(state, 'data.archivesName', fromJS(true))
        }
        if (option.archiveId) {
            state = this.metaReducer.sf(state, 'data.archiveId', fromJS(option.archiveId))
        }
        if (option.ts) {
            state = this.metaReducer.sf(state, 'data.ts', fromJS(option.ts))
        }
        if (Object.keys(option).length == 1) {
            state = this.metaReducer.sf(state, 'data.form.isEnable', fromJS(true))
        }
        return state
    }

    modifyContent = (state) => {
        const content = this.metaReducer.gf(state, 'data.content')
        return this.metaReducer.sf(state, 'data.content', content + '!')
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}
