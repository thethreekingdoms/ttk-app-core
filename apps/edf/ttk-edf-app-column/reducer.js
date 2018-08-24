import { Map, fromJS } from 'immutable'
import { tree } from 'edf-utils'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, response) => { 
        state = this.metaReducer.sf(state, 'data.columns', fromJS(response.columnsettings))    
        state = this.metaReducer.sf(state, 'data.list', fromJS(response.list))
        state = this.metaReducer.sf(state, 'data.pagination', fromJS(response.pagination))
        state = this.metaReducer.sf(state, 'data.other.filter', fromJS(response.filter))

        if (response.tree) {
            state = this.metaReducer.sf(state, 'data.tree', fromJS(response.tree)) 
        }

        return state       
    }

    selectType = (state, response) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(response.list))
        state = this.metaReducer.sf(state, 'data.pagination', fromJS(response.page))
        state = this.metaReducer.sf(state, 'data.other.filter', fromJS(response.filter))  
              
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