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

    load = (state, option) => {
        if (option.response) {
            if (Object.keys(option.response).length == 0) {
                option.response.isEnable = true
                state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
            } else {
                state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
            }
        }
        if (option.code) {
            state = this.metaReducer.sf(state, 'data.form.code', fromJS(option.code))
        }
        return state
    }

    setCurrency = (state, currency) => {
        return this.metaReducer.sf(state, 'data.currency', currency)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}