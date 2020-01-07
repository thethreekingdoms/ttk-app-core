import {Map, fromJS} from 'immutable'
import {reducer as MetaReducer} from 'edf-meta-engine'
import config from './config'
import {getInitState} from './data'
import {consts} from 'edf-consts'

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
            if (option.response.propertyId) {
                option.queryData.dataList.filter((data) => {
                    if(data.id == option.response.propertyId){
                        option.response.property = data
                    }
                })
                if (option.queryData && option.queryData.detailList) {
                    let a = option.queryData.detailList.filter((data) => {
                        return option.response.propertyId == data.propertyId
                    })
                    state = this.metaReducer.sf(state, 'data.other.propertyDetailFilter', fromJS(a))
                }
            }
            if (option.response.propertyDetail) {
                // option.response.propertyDetail = {
                //     id: option.response.propertyDetail,
                //     name: option.response.propertyDetailName
                // }
                option.queryData.detailList.filter((data) => {
                    if(data.id == option.response.propertyDetail){
                        option.response.propertyDetail = data
                    }
                })
                state = this.metaReducer.sf(state, 'data.isProperty', fromJS(true))
            }
            if (option.response.unitId) {
                option.response.unit = {
                    id: option.response.unitId,
                    name: option.response.unitName
                }
                // option.queryData.unitList.filter((data) => {
                //     if(data.id == option.response.unitId){
                //         option.response.unit = data
                //     }
                // })

            }
            if (option.response.rate) {
                option.response.rate = {
                    id: option.response.rate,
                    name: option.response.rateName
                }
                // option.queryData.rateList.filter((data) => {
                //     if(data.id == option.response.rate){
                //         option.response.rate = data
                //     }
                // })
            }
            if (Object.keys(option.response).length == 0) {
                option.response.isEnable = true
                state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
            } else {
                state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
            }
            // state = this.metaReducer.sf(state, 'data.form', fromJS(option.response))
        }
        if (option.code) {
            state = this.metaReducer.sf(state, 'data.form.code', fromJS(option.code))
        }
        if (option.queryData) {
            if (option.queryData.dataList) {
                state = this.metaReducer.sf(state, 'data.other.property', fromJS(option.queryData.dataList))
            }
            if (option.queryData.detailList) {
                state = this.metaReducer.sf(state, 'data.other.propertyDetail', fromJS(option.queryData.detailList))
            }
            if (option.queryData.rateList) {
                state = this.metaReducer.sf(state, 'data.other.rate', fromJS(option.queryData.rateList))
            }
            if (option.queryData.unitList) {
                state = this.metaReducer.sf(state, 'data.other.unit', fromJS(option.queryData.unitList))
            }
        }
        if(option.taxCode){
            state = this.metaReducer.sf(state, 'data.taxCode', fromJS(option.taxCode))
        }
        return state
    }

    unit = (state, list, select) => {
        state = this.metaReducer.sf(state, 'data.other.unit', fromJS(list))
        state = this.metaReducer.sf(state, 'data.form.unit', fromJS(select))
        return state
    }

    propertyChange = (state, v, a) => {
        let generalTaxPayer = consts.VATTAXPAYER_generalTaxPayer,
            smallScaleTaxPayer = consts.VATTAXPAYER_smallScaleTaxPayer,
            rateList = this.metaReducer.gf(state, 'data.other.rate'),
            rate = {}, name
        if (v.vatTaxpayer) {
            if (v.name == '服务' || v.name == '无形资产') {
                let dataArr = a
                state = this.metaReducer.sf(state, 'data.other.propertyDetailFilter', fromJS(a))
                state = this.metaReducer.sf(state, 'data.isProperty', fromJS(true))
            } else {
                state = this.metaReducer.sf(state, 'data.isProperty', fromJS(false))
            }
        }
        if (this.metaReducer.context.get("currentOrg").vatTaxpayer == generalTaxPayer) {
            //一般模纳税人
            if (v.name == "服务" || v.name == "固定资产-不动产" || v.name == '交通运输服务' || v.name == '邮政服务' || v.name == '基础电信服务' || v.name == '建筑服务' || v.name == '不动产租赁服务' || v.name == '土地使用权') {
                name = "11%"
            } else if (v.name == "无形资产" || v.name == '增值电信服务' || v.name == '信息技术服务' || v.name == '金融服务' || v.name == '生活服务' || v.name == '其他服务' || v.name == '专利权' || v.name == '商标权' || v.name == '著作权' || v.name == '非专利技术' || v.name == '特许权使用费' || v.name == '其他') {
                name = "6%"
            } else {
                name = "17%"
            }
        } else if (this.metaReducer.context.get("currentOrg").vatTaxpayer == smallScaleTaxPayer) {
            //小规模纳税人
            if (v.name == "固定资产-不动产" || v.name == "土地使用权" || v.name == "不动产租赁服务") {
                name = "5%"
            } else {
                name = "3%"
            }
        }
        if (rateList) {
            rateList.toJS().map(item => {
                if (item.name == name) {
                    state = this.metaReducer.sf(state, 'data.form.rate', fromJS(item))
                }
            })
        }
        if (v.vatTaxpayer) {
            state = this.metaReducer.sf(state, 'data.form.property', fromJS(v))
            state = this.metaReducer.sf(state, 'data.form.propertyDetail', '')
        } else {
            state = this.metaReducer.sf(state, 'data.form.propertyDetail', fromJS(v))
        }
        return state
    }
    taxCodeLoad = (state, taxCode) => {
        if(taxCode.data){state = this.metaReducer.sf(state, 'data.taxCode.data', fromJS(taxCode.data))}
        state = this.metaReducer.sf(state, 'data.taxCode.fetching', fromJS(taxCode.fetching))
        return state
    }
    taxCodeChange = (state, code) => {
        // console.log('手机',code)
        if(code){
            let str = code.split(",");
            state = this.metaReducer.sf(state, 'data.form.taxClassificationId', fromJS(str[1]))
            state = this.metaReducer.sf(state, 'data.form.taxClassificationName', fromJS(str[0]))
        }else {
            state = this.metaReducer.sf(state, 'data.form.taxClassificationId', fromJS(''))
            state = this.metaReducer.sf(state, 'data.form.taxClassificationName', fromJS(''))
        }
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({...option, metaReducer})

    return {...metaReducer, ...o}
}