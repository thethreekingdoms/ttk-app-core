import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    resize = (state, option) => {
        state = this.metaReducer.sf(state, 'data.ratio', option)
        return state
    }

    load = (state, response) => {
        let {aRAP, capitalAccount, enableYearAndPeriod, glCertificate, operatingSituationMap, periodList} = response
        state = this.metaReducer.sf(state, 'data.aRAP', fromJS(aRAP))
        state = this.metaReducer.sf(state, 'data.capitalAccount', fromJS(capitalAccount))
        state = this.metaReducer.sf(state, 'data.enableYearAndPeriod', fromJS(enableYearAndPeriod))
        state = this.metaReducer.sf(state, 'data.glCertificate', fromJS(glCertificate))
        state = this.metaReducer.sf(state, 'data.operatingSituationMap', fromJS(operatingSituationMap))
        state = this.metaReducer.sf(state, 'data.periodList', fromJS(periodList))
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}