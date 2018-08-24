import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import moment from 'moment'
import { moment as momentUtil } from 'edf-utils'
import { getInitState } from './data'
import { consts } from 'edf-consts'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        return this.metaReducer.init(state, getInitState(option))
    }
    load = (state, industry, vatTaxpayer, accountingStandards, date) => { 
        state = this.metaReducer.sf(state, 'data.industry', fromJS(industry))    
        state = this.metaReducer.sf(state, 'data.vatTaxpayer', fromJS(vatTaxpayer))
        state = this.metaReducer.sf(state, 'data.accountingStandards', fromJS(accountingStandards))
        state = this.metaReducer.sf(state, 'data.form.industry', industry[0].id)
        // state = this.metaReducer.sf(state, 'data.form.vatTaxpayer', vatTaxpayer[0].id)
        let accountingStandardsName = '';
        //判断accountingStandardsName
        accountingStandards.forEach(o => {
            if(o.id == consts.ACCOUNTINGSTANDARDS_2013) {
                accountingStandardsName = o.name;
                return;
            }
        })
        state = this.metaReducer.sf(state, 'data.form.accountingStandard', Number(consts.ACCOUNTINGSTANDARDS_2013) )
        state = this.metaReducer.sf(state, 'data.form.accountingStandardsName', accountingStandardsName )
        let enableDate = momentUtil.stringToMoment(date).format('YYYY-MM')
        state = this.metaReducer.sf(state, 'data.form.enableDate', enableDate) 
        return state       
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}