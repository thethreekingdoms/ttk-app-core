/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'edf-utils'

export default {
    project: {
	    getCode: () => fetch.post('/v1/ba/basearchive/getAutoCode', { archiveName: 'ba_project' }),
        query: (id) => fetch.post('/v1/ba/project/query', { id }),
        //findById: (id) => fetch.post('/v1/project/findById', { id }),
        create: (option) => fetch.post('/v1/ba/project/create', option),
        update: (option) => fetch.post('/v1/ba/project/update', option),
        queryList: (option) => fetch.post('/v1/ba/project/queryList', option),
        //prev: (id) => fetch.post('/v1/project/prev', { id }),
        //next: (id) => fetch.post('/v1/project/next', { id })
    }
}