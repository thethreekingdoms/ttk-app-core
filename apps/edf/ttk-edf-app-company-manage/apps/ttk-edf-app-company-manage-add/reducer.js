import {Map, fromJS} from 'immutable'
import {reducer as MetaReducer} from 'edf-meta-engine'
import config from './config'
import {getInitState} from './data'
import { moment as momentUtil } from 'edf-utils'
import { consts } from 'edf-consts'
import moment from 'moment'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    load = (state, res) => {
        if (res.list && res.list.length) {
            let propertyList = res.payload.list.map(o => ({label: o.name, value: o.enumId}))
            state = this.metaReducer.sf(state, 'data.form.vatTaxpayer', fromJS(propertyList[0] && Number(propertyList[0].value)))
            state = this.metaReducer.sf(state, 'data.other.vatTaxpayer', fromJS(propertyList))
        }

        return state
    }
    loadSelect = (state, vatTaxpayer, accountingStandards,date) => {    
        state = this.metaReducer.sf(state, 'data.vatTaxpayer', fromJS(vatTaxpayer))
        state = this.metaReducer.sf(state, 'data.accountingStandards', fromJS(accountingStandards))
        let accountingStandardsName = '';
        //判断accountingStandardsName
        accountingStandards.forEach(o => {
            if(o.id == consts.ACCOUNTINGSTANDARDS_2013) {
                accountingStandardsName = o.name;
                return;
            }
        })

        state = this.metaReducer.sf(state, 'data.form.accountingStandards', Number(consts.ACCOUNTINGSTANDARDS_2013) )
        state = this.metaReducer.sf(state, 'data.form.accountingStandardsName', accountingStandardsName )
        let enabledDate = momentUtil.stringToMoment(date).format('YYYY-MM')
        state = this.metaReducer.sf(state, 'data.form.vatTaxpayer', vatTaxpayer[0].id)
        state = this.metaReducer.sf(state, 'data.form.enabledDate', enabledDate) 
        
        return state       
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}