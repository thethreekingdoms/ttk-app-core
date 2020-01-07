import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import moment from 'moment'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        const initState = getInitState()
        if(option && option.columnCode)
            initState.data.form.columnCode = option.columnCode

        return this.metaReducer.init(state, initState)
    }

    load = (state, response) => {
        return this.metaReducer.sf(state, 'data.list', fromJS(response))
    }

    loadColumns = (state, { list }) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(Array.from(list))) 
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}