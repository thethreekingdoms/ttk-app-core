import { Map } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import { List, fromJS, is } from 'immutable'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        if(option){
            initState.data = option
        }
        return this.metaReducer.init(state, initState)
    }

    load = (state, response) => {
        state = this.metaReducer.sf(state, 'data.periodList', fromJS(response.periodList))
        state = this.metaReducer.sf(state, 'data.capitalAccount', fromJS(response.capitalAccount))
        state = this.metaReducer.sf(state, 'data.accountSumAmount', response.accountSumAmount)
        return state
    }

    refresh = (state, capitalAccount, accountSumAmount) => {
        state = this.metaReducer.sf(state, 'data.capitalAccount', fromJS(capitalAccount))
        state = this.metaReducer.sf(state, 'data.accountSumAmount', accountSumAmount)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}