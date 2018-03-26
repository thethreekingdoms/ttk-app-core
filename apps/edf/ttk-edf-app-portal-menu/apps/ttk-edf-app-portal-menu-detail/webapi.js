/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'edf-utils'

export default {
    menu: {
        create: (option) => fetch.post('/v1/edf/menu/create', option),
        update: (option) => fetch.post('/v1/edf/menu/update', option),
        query: (option) => fetch.post('/v1/edf/menu/query', option),
        findFullById: (id) => fetch.post('/v1/edf/menu/findFullById', id),
    },
    operation:{
        query:(option) => fetch.post('/v1/edf/operation/query', option)
    }
}