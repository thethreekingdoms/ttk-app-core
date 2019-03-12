import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, initData) => {
        let initState = getInitState();
        
        //小规模
        if(initData && initData.type == 'vattaxpayer'){
            initState.data.other.tabArr = [{
                "id":"01","name":"销项发票统计"
            }]
            initState.data.other.isVattaxpayer = true
        }
        initState.data.other.option = initData.option
        return this.metaReducer.init(state, initState)
    }

    load = (state, response) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(response))
        return state
    }

    tabChange = (state, path, value, response) => {
        state = this.metaReducer.sf(state, 'data.list', fromJS(response))
        state = this.metaReducer.sf(state, path, value + '')
        return state
    }

    update = (state, { path, value }) => {
        return this.metaReducer.sf(state, path, fromJS(value))
    }

    updateOption = (state, { path, value }) => {
        return this.metaReducer.sf(state, path, fromJS(value))
    }
    
    setTableOption = (state, value) => {
        return this.metaReducer.sf(state, 'data.tableOption', fromJS(value))
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}