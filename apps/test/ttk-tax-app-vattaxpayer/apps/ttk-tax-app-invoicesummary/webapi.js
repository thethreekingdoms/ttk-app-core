/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch, fetchCors } from 'edf-utils'

export default {
    invoicesummary: {
        xxfptj: (option) => fetch.post('/v1/biz/core/invoiceTax/xxfptj', option), //一般纳税人销项发票
        jxfptj: (option) => fetch.post('/v1/biz/core/invoiceTax/jxfptj', option), //一般纳税人进项发票
        dlxxhasReadSJInfo: (option) => fetch.post('/v1/edf/dlxx/hasReadSJInfo', option),
        collecteData1: (option) => fetch.post('/v1/biz/scm/invoice/collecteDataAsync', option),//采集发票第一步
        asyncRequestResult: (option,date) => fetch.post2('/v1/biz/scm/invoice/asyncRequestResult', option,date),//采集发票第二步
        //xxfptj: (option) => fetch.post('/v1/biz/core/invoiceTax/xxfptj', option), //小规模纳税人销项发票
        puclearBySbsq: (option) => fetch.post('/v1/biz/scm/pu/arrival/clearBySbsq', option),//进项发票清空发票
        saclearBySbsq: (option) => fetch.post('/v1/biz/scm/sa/delivery/clearBySbsq', option),//销项发票清空发票
    }
}