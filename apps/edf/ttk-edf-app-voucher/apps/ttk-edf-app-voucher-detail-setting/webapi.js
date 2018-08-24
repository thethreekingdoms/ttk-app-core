/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'edf-utils'

export default {
    voucher: {
        addThead: (option) => fetch.post('/v1/edf/voucherCardPreset/create', option),
        addTbodys: (option) => fetch.post('/v1/edf/voucherTablePreset/create', option),
        addTbody: (option) => fetch.post('/v1/edf/voucherDetailPreset/create', option),
    }
}