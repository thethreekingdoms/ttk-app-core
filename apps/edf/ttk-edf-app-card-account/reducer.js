import {Map, fromJS} from 'immutable'
import {reducer as MetaReducer} from 'edf-meta-engine'
import config from './config'
import {getInitState} from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    load = (state, option) => {
        if (option.response) {
            if (option.response) {
                if (Object.keys(option.response).length == 0) {
                    option.response.isEnable = true
                    state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
	                state = this.metaReducer.sf(state, 'data.form.bankAccountType.id', '')
                } else {
                    state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
                }
            }
            // state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
            if (option.response.bankAccountTypeId) {
                state = this.metaReducer.sf(state, 'data.form.bankAccountType', fromJS({
                    id: option.response.bankAccountTypeId,
                    name: option.response.bankAccountTypeName
                }))
            }
            // else {
            //     let defaultType = option.accountAttr.filter((value) => {
            //         return value.name == '银行'
            //     })[0] || undefined;
            //     state = this.metaReducer.sf(state, 'data.form.bankAccountType', {
            //         id: defaultType.id,
            //         name: defaultType.name
            //     })
            // }

        }
        state = this.metaReducer.sf(state, 'data.other.haveMonthlyClosing', fromJS(option.haveMonthlyClosing))
        if (option.code) {
            state = this.metaReducer.sf(state, 'data.form.code', fromJS(option.code))
        }
        if (option.accountAttr) {
            state = this.metaReducer.sf(state, 'data.other.bankAccountType', fromJS(option.accountAttr))
            /*if(option.accountAttr.length){
                state = this.metaReducer.sf(state, 'data.form.bankAccountType', fromJS(option.accountAttr[0]))
            }*/
        }
        if (option.enabledTime) {
            state = this.metaReducer.sf(state, 'data.form.earlyMonths', fromJS(option.enabledTime))
        }
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}