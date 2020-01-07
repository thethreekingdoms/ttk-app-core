/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'edf-utils'

export default {
    captcha: {
        fetch: (mobile) => fetch.post('/v1/edf/captcha/fetch', mobile),
        validate: (captcha) => fetch.post('/v1/edf/captcha/validate', captcha)
    },
    user: {
        existsMobile: (mobile) => fetch.post('/v1/ba/person/existsMobileInPlatForm', {mobile}),
        update: (option) => fetch.post('/v1/edf/user/updateMobile', option)
    },
}