/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'edf-utils'

export default {
    user: {
	    login: (option) => fetch.post('/v1/edf/mini/login', option),
        existsMobile: (mobile) => fetch.post('/v1/edf/user/existsMobile', {mobile})
    },
    connector: {
        accessLogin: (option) => fetch.post('/v1/edf/connector/accessLogin', option),
        accessLoginA99: (option) => fetch.post('/v1/reportconverter/accessLogin.do', option),        
    }
}
