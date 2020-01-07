import { Map, fromJS } from 'immutable'
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

    loadInit = (state, response) => {
        state = this.metaReducer.sf(state, 'data.roles', fromJS(response.roles))
        state = this.metaReducer.sf(state, 'data.menus', fromJS(response.menus))
        state = this.metaReducer.sf(state, 'data.operations', fromJS(response.operations))
        state = this.metaReducer.sf(state, 'data.menuOperations', fromJS(response.menuOperations))
        state = this.metaReducer.sf(state, 'data.other.filter', fromJS(response.filter))
        return state
    }

    loadRole = (state, response) => {
        state = this.metaReducer.sf(state, 'data.roles', fromJS(response))
        return state
    }

    loadRoleMenuOperation = (state, { menuOperations, filter }) => {
        state = this.metaReducer.sf(state, 'data.menuOperations', fromJS(Array.from(menuOperations))) 
        if (filter) {
            state = this.metaReducer.sf(state, 'data.other.filter', fromJS(filter))
        }
        return state
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}