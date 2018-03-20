import { Map, fromJS, List } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import utils from 'edf-utils'
export default class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    setMultiField = (state, value) => {
        if (value) {
            Object.keys(value).forEach(p => {
                state = this.metaReducer.sf(state, `${p}`, fromJS(value[p]))
            })
        }
        return state

    }
}
