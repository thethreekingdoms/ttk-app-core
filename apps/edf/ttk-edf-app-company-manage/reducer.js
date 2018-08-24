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
        return this.metaReducer.init(state, initState)
    }

    load = (state, columns, value) => {
        // debugger
        state = this.metaReducer.sf(state, 'data.columns', fromJS(columns))
        if (value) {
            state = this.metaReducer.sf(state, 'data.list', fromJS(value))
            // state = this.metaReducer.sf(state, 'data.manageList', fromJS(value.manageList))
        }
        return state
    }
    initQueryList = (state, value) => {
        state = this.metaReducer.sf(state, 'data.queryList', fromJS(value))
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}