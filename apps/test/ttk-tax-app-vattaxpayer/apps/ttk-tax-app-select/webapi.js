/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'edf-utils'
export default {
    tax: {
        init: (option) => fetch.post('/v1/tax/chooseTable/init', option),		        
        save: (option) => fetch.post('/v1/tax/chooseTable/save', option),		        
        saveSelectReport: (option) => fetch.post('/v1/tax/sb/appraisal/selectReport', option),		        
        queryReport: (option) => fetch.post('/v1/tax/sb/appraisal/queryReport', option)		        
    }
}
