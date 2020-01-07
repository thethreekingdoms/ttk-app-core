import { Map } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'
import { beautify } from 'edf-utils'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        initState.data.apps = option.apps
        if (option.apps.length > 0) {
            initState.data.selectApp = option.apps[0]
            initState.data.selectType = 'meta'
            initState.data.currentJson = beautify.beautifyJS(JSON.stringify(option.apps[0].meta))
        }

        return this.metaReducer.init(state, initState)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}