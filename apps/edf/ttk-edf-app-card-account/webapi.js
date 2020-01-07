/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import {fetch} from 'edf-utils'

export default {
    bankaccount: {
        getCode: () => fetch.post('/v1/ba/basearchive/getAutoCode', {archiveName: 'ba_bank_account'}),
        query: (id) => fetch.post('/v1/ba/bankAccount/query', {id}),
        //findById: (id) => fetch.post('/v1/bankaccount/findById', { id }),
        create: (option) => fetch.post('/v1/ba/bankAccount/create', option),
        update: (option) => fetch.post('/v1/ba/bankAccount/update', option),
        accountAttr: (option) => fetch.post('/v1/ba/bankAccount/queryBankAccountType', option),
        //queryDict: () => fetch.get('/v1/bankType')
        haveMonthlyClosing: (option) => fetch.post('/v1/gl/mec/haveMonthlyClosing', option),
        queryList: (option) => fetch.post('v1/ba/bankAccount/queryList', option)
    }
}