/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import {fetch} from 'edf-utils'

export default {
    department: {
        query: (id) => fetch.post('/v1/ba/department/query', {id}),
        create: (option) => fetch.post('/v1/ba/department/create', option),
        update: (option) => fetch.post('/v1/ba/department/update', option),
        deptAttr: () => fetch.post('/v1/edf/enumDetail/findByEnumId', {enumId: 300001}),
        queryList: (option) => fetch.post('/v1/ba/department/queryList', { option })
    }
}