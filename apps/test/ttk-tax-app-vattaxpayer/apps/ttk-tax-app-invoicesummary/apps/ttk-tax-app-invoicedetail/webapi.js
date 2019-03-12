/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'edf-utils'

export default {
    fpCard: {
        xxfpmx: (option) => fetch.post('/v1/biz/core/invoiceTax/xxfpmx', option),
        jxfpmx: (option) => fetch.post('/v1/biz/core/invoiceTax/jxfpmx', option),
        xxfpmxUpdate: (option) => fetch.post('/v1/biz/core/invoiceTax/xxfpmxUpdate', option),
        jxfpmxUpdate: (option) => fetch.post('/v1/biz/core/invoiceTax/jxfpmxUpdate', option),
    }
}