import { Map } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option, appKey, appId) => {
        const initState = getInitState()
        if (!option) option = {
            SS: "52",
            declareTime: "2019-01-15",
            extraParams: "",
            gdslx: "1",
            hasReadSJInfo: true,
            period: 1,
            reportId: 5839712302402560,
            rptGetDataVisible: undefined,
            sbywbm: "XGMZZS",
            selfSystemDeclare: undefined,
            skssqq: "2018-10-01",
            skssqz: "2018-12-31",
            state: 0,
            sumInvoiceVisible: undefined,
            systemDate: "2019-02-25",
            taxProjectCode: "10101",
            taxProjectName: "增值税(适用于小规模纳税人)",
            year: 2019
        }
        option.beginMonth = option.period
        option.endMonth = option.period
        initState.data.params = option
        initState.data.hasReadSJInfo = option.hasReadSJInfo
        initState.data.appKey = appKey
        initState.data.appId = appId

        return this.metaReducer.init(state, initState)
    }

    updateReduce = (state, name, value) => {
        return this.metaReducer.sf(state, name, value)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}