import { reducer as MetaReducer } from 'edf-meta-engine'
import { getInitState } from './data'
import config from './config'
import { Map, fromJS } from 'immutable'
import { tree } from 'edf-utils'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, tree) => {
        state = this.metaReducer.sf(state, 'data.other.tree', fromJS(tree))
        return state
    }

    fields = (state, fields) => {
        state = this.metaReducer.sf(state, 'data.fields', fromJS(fields))
        return state
    }

    list = (state, list) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(list))
        return state
    }

    selectAll = (state, checked) => {
        var lst = this.metaReducer.gf(state, 'data.list')

        if (!lst || lst.size == 0)
            return state

        for (let i = 0; i < lst.size; i++) {
            state = this.metaReducer.sf(state, `data.list.${i}.selected`, checked)
        }

        return state
    }

    selectRow = (state, rowIndex, checked) => {
        state = this.metaReducer.sf(state, `data.list.${rowIndex}.selected`, checked)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}