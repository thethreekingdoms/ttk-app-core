import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        let initState = getInitState();
        Object.assign(initState.data.form, option)
        return this.metaReducer.init(state, initState)
    }
    load = (state, imgs) => {
        state = this.metaReducer.sf(state, 'data.other.imgs', fromJS(imgs))    

        return state  
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}