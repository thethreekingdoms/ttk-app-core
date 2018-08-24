/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'edf-utils'

export default {
    user: {
        create: (option) => fetch.post('/v1/edf/user/create', option),
        existsMobile: (mobile) => fetch.post('/v1/edf/user/existsMobile', {mobile})
    },
    captcha: {
        fetch: (mobile) => fetch.post('/v1/edf/captcha/fetch', mobile),
        validate: (captcha) => fetch.post('/v1/edf/captcha/validate', captcha)
    },
    sysOrg: {
        update: (option) => fetch.post('/v1/edf/org/update', option),
        findById: (option) => fetch.post('/v1/edf/org/findById', option)
    },
    enumDetail: {
        findByEnumId: (enumId) => fetch.post('/v1/edf/enumDetail/findByEnumId', enumId)
    },
    enableDate: {
        getServerDate: () => fetch.post('/v1/edf/org/getSystemDate'),
    }
}