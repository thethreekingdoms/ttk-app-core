import {Map, List, fromJS} from 'immutable'
import {reducer as MetaReducer} from 'edf-meta-engine'
import config from './config'
import {getInitState} from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state) => {
        return this.metaReducer.init(state, getInitState())
    }

    load = (state, option, props) => {
        if (option.response) {
            if (option.response.property) {

                let propertyName;
                option.deptAttr.forEach(dep => { if (dep.id == option.response.property) { propertyName = dep.name; return }})

                option.response.attribute = {
                    id: option.response.property,
                    name: propertyName
                }
            }
            state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
        }else {
            let obj = {}
            if(props.propertyName){
                obj.attribute = {
                    id: props.property,
                    name: props.propertyName
                }
            }else {
                obj.attribute = {
                    id: 3000010001,
                    name: '其它（含管理）'
                }
            }
            state = this.metaReducer.sf(state, 'data.form', fromJS(obj))
        }

        if (option.deptAttr) {
            state = this.metaReducer.sf(state, 'data.other.attributes', fromJS(option.deptAttr))
        }
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}