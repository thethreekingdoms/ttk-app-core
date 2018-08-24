/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import {fetch} from 'edf-utils'
import moment from 'moment'

const mockData = fetch.mockData

/*
fetch.mock('/v1/person/query', (option) => {
    return {result:true, value:{}}
})
*/

fetch.mock('v1/edf/org/create', (option) => {
    console.log(option)
    return {
        "result": true,
        "value": {
            "id": 4457533710013440,
            "name": option.name,
            "version": 1,
            "creator": 4372210486703104,
            "industry": option.industry,
            "accountingStandards": option.accountingStandards,
            "enabledYear": option.enabledYear,
            "enabledMonth": option.enabledMonth,
            "vatTaxpayer": option.vatTaxpayer,
            "createTime": moment(new Date()).format('YYYY-MM-DD'),
            "lastLoginTime": moment(new Date()).format('YYYY-MM-DD'),
            "expireTime": "2018-05-26"
        }
    }
})

fetch.mock('/v1/edf/sysOrg/existsSysOrg', (option) => {
    console.log(option)
    return {"result":true,"value":false}
})


fetch.mock('/v1/edf/portal/getPortalDto', (option) => {
    console.log(option)
    return {
        "result": true,
        "value": {
            "user": {
                "mobile": "13333333333",
                "nickname": "13333333333",
                "personid": 4246937157170176,
                "personname": "13333333333",
                "sex": 0,
                "skin": "#00B38A",
                "lastLoginTime": "2018-03-14 11:34:49"
            },
            "org": {
                "id": 4246937076102144,
                "name": "问问",
                "industry": 2000030001,
                "accountingStandards": 2000020002,
                "enabledYear": "2018",
                "enabledMonth": "03",
                "vatTaxpayer": 2000010001
            },
            "menu": [{
                "id": 1,
                "name": "首页",
                "code": "01",
                "appName": "ttk-edf-app-home",
                "iconFont": "zhuomianpeizhi",
                "parentId": 0,
                "showOrder": 100,
                "isVisible": 1
            }, {
                "id": 50,
                "name": "开发",
                "code": "50",
                "appName": "",
                "appProps": "",
                "iconFont": "bianji",
                "parentId": 0,
                "showOrder": 900,
                "isVisible": 1
            }, {
                "id": 5010,
                "name": "预置数据",
                "code": "5010",
                "appName": "",
                "appProps": "",
                "parentId": 50,
                "showOrder": 901,
                "isVisible": 1
            }, {
                "id": 5010001,
                "name": "菜单预置",
                "code": "5010001",
                "appName": "ttk-edf-app-portal-menu",
                "appProps": "",
                "parentId": 5010,
                "showOrder": 902,
                "isVisible": 1
            }, {
                "id": 5010002,
                "name": "操作权限",
                "code": "5010002",
                "appName": "ttk-edf-app-operation",
                "appProps": "",
                "parentId": 5010,
                "showOrder": 903,
                "isVisible": 1
            }, {
                "id": 5010003,
                "name": "角色授权",
                "code": "5010003",
                "appName": "ttk-edf-app-role-auth",
                "appProps": "",
                "parentId": 5010,
                "showOrder": 904,
                "isVisible": 1
            }, {
                "id": 5010004,
                "name": "枚举预置",
                "code": "5010004",
                "appName": "ttk-edf-app-enum",
                "appProps": "",
                "parentId": 5010,
                "showOrder": 905,
                "isVisible": 1
            }, {
                "id": 5010005,
                "name": "栏目预置",
                "code": "5010005",
                "appName": "ttk-edf-app-column",
                "appProps": "",
                "parentId": 5010,
                "showOrder": 906,
                "isVisible": 1
            }, {
                "id": 5020,
                "name": "开发工具",
                "code": "5020",
                "appName": "ttk-edf-app-devtools",
                "appProps": "",
                "parentId": 50,
                "showOrder": 907,
                "isVisible": 1
            }, {
                "id": 5030,
                "name": "基础组件API",
                "code": "5030",
                "appName": "ttk-edf-app-iframe?src=https://thethreekingdoms.github.io/ttk-app-component/",
                "appProps": "",
                "parentId": 50,
                "showOrder": 908,
                "isVisible": 1
            }]
        }
    }
})

fetch.mock('/v1/edf/org/getSystemDate', (option) => {
    console.log(option)
    return {
        "result": true,
        "value": "2018-04-26"
    }
})

fetch.mock('/v1/edf/enumDetail/batchQuery', (option) => {
    console.log(option)
    return {
        "result": true,
        "value": {
            "200001": [{
                "id": 2000010001,
                "name": "一般纳税人",
                "code": "generalTaxPayer"
            }, {
                "id": 2000010002,
                "name": "小规模纳税人",
                "code": "smallScaleTaxPayer"
            }],
            "200002": [{
                "id": 2000020001,
                "name": "企业会计准则",
                "code": "2007"
            }, {
                "id": 2000020002,
                "name": "小企业会计准则",
                "code": "2013"
            }]
        }
    }
})

fetch.mock('v1/edf/org/queryList', (option) => {
    console.log(option)
    return {
        "result": true,
        "value": [{
            "id": 4372210492535808,
            "name": "xiaowu",
            "version": 1,
            "ts": "2018-04-11 14:47:24.0",
            "creator": 4372210486703104,
            "industry": 2000030001,
            "accountingStandards": 2000020002,
            "enabledYear": "2018",
            "enabledMonth": "04",
            "vatTaxpayer": 2000010001,
            "isOtherUser": false,
            "status": 1000070003,
            "createTime": "2018-04-11",
            "lastLoginTime": "2018-04-26",
            "expireTime": "2018-05-11"
        }]
    }
})