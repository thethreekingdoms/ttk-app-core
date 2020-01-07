import { Map ,fromJS} from 'immutable'
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
    //加载数据
    load = (state, res) => {
     // state = this.metaReducer.sf(state, 'data', fromJS({ loading: false }));//加载完成
      //console.log(res);

      return this.metaReducer.sf(state, 'data', fromJS(res))//数据
    }

    //清除
    onClear=(state,tabName)=>{
      return this.metaReducer.sf(state, 'data.'+tabName, fromJS([]))
    }

}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}