import { Map , fromJS} from 'immutable'
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
        if (option) {
            initState.data = option
        }
        return this.metaReducer.init(state, initState)
    }
    load = (state, option) => {
        state = this.metaReducer.sf(state, 'data.businessState', fromJS(option)) 
        state = this.metaReducer.sf(state, 'data.periodList', fromJS(option.periodList))
        state = this.metaReducer.sf(state, 'data.incomeSumAmout', fromJS(option.incomeSumAmout))
        state = this.metaReducer.sf(state, 'data.expenditureSumAmount', fromJS(option.expenditureSumAmount))
        state = this.metaReducer.sf(state, 'data.profitAmount', fromJS(option.profitAmount))
        state = this.metaReducer.sf(state, 'data.tableSource', fromJS(option.tableSource)) 
        return state
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}