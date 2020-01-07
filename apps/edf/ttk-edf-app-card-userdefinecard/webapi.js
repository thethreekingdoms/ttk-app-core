/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import {fetch} from 'edf-utils'

export default {
    basearchive: {
        getCode: (option) => fetch.post('/v1/ba/userdefinearchive/getAutoCode', option),
        queryName: (option) => fetch.post('/v1/ba/userdefinearchive/create', option),
        create: (option) => fetch.post('/v1/ba/userdefinearchive/createData', option),
        update: (option) => fetch.post('/v1/ba/userdefinearchive/updateData', option),
        queryData: (option) => fetch.post('/v1/ba/userdefinearchive/queryData', option),
        // deleteData: (option) => fetch.post('/v1/ba/userdefinearchive/deleteData', option),
        queryList: (option) => fetch.post('v1/ba/userdefinearchive/queryList', option),
    }
}
