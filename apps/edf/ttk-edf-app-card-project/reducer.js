import {Map, List, fromJS} from 'immutable'
import {reducer as MetaReducer} from 'edf-meta-engine'
import config from './config'
import moment from 'moment'
import {getInitState} from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state) => {
        return this.metaReducer.init(state, getInitState())
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

    setproject = (state, project) => {
        state = this.metaReducer.sf(state, 'data.form', fromJS(project))
        return state
    }


}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}