import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState, getLastMonth, REPORT_TYPE_TAX, REPORT_TYPE_FINANCE } from './data'
import moment from 'moment'
import { fetch, number, history } from 'edf-utils'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }
    init = (state, option) => {
        const initState = getInitState()
        state = this.metaReducer.init(state, initState)       
        return state
    }
    load = (state, data, initData ) => {
        if( initData.selecTableType == 'newtype' ) {
            data.oldInfo = data.info
            state = this.metaReducer.sf( state , 'data' , fromJS(data) )
            if( initData.qtxx ) {
                state = this.metaReducer.sf( state , 'data.qtxx' , fromJS( initData.qtxx )  )         
            }
            state = this.metaReducer.sf( state , 'data.fromName' , initData.fromName  )      
        } else {
            data.reportList = data.reportList.map( item => {
                if( item.projectReportCode == 'BDA0610606' ||
                    item.projectReportCode == 'BDA0610339' ||
                    item.projectReportCode == 'BDA0610337' ||
                    item.projectReportCode == 'BDA0610338' ||
                    item.projectReportCode == 'BDA0610566' ||
                    item.projectReportCode == 'BDAbdcfqdkjsb' ||
                    item.projectReportCode == 'BDA0610758' ||
                    item.projectReportCode == 'BDAygzsffxcsmxb' ) {
                        item.isSelected = true
                }
                item.name = item.projectReportName
                item.id = item.rowNo
                return item
            })
            state = this.metaReducer.sf( state , 'data.info' , fromJS(data.reportList) )
            state = this.metaReducer.sf( state , 'data.oldInfo' , fromJS(data.reportList) )
            state = this.metaReducer.sf( state , 'data.appraisalId' , initData.appraisalId )
        }
        state = this.metaReducer.sf( state , 'data.selecTableType' , initData.selecTableType )  
		return state
    }
    
    setData = ( state , data ) => {
        state = this.metaReducer.sf( state , 'data' , fromJS(data) )  
        return state
    }
}
export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })
    return { ...metaReducer, ...o }
}
