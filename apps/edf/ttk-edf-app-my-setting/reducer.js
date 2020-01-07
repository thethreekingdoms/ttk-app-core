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

    load = (state, { user, securityLevel }) => {
        user.sex = user.sex === undefined ? 0 : user.sex
        user.sex = user.sex + ""
        user.nickname = user.nickname || user.mobile
        return this.metaReducer.sf(state, 'data.form', fromJS({ ...user, securityLevel }))
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}