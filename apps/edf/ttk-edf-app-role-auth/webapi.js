/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'edf-utils'

export default {
    roleMenuOperation: {
        query: (option) => fetch.post('/v1/edf/roleMenuOperation/query', option),
        save: (option)  => fetch.post('/v1/edf/roleMenuOperation/save', option),
    },
    role: {
        init: (option) => fetch.post('/v1/edf/role/init', option),
        query: (option) => fetch.post('/v1/edf/role/query', option),
        delete: (option) => fetch.post('/v1/edf/role/delete', option)
    }
}