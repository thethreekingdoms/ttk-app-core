/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */
// import config from './server/service'
import { fetch } from 'edf-utils'
// import initData from './resData/init'
// import query from './resData/query'
// import save from './resData/save'
// import deleteFunc from './resData/delete'

const mockData = fetch.mockData

const data = {
    parent: [
        {
            "id": 1,
            "code": "001",
            "name": "系统管理员",
            "memo": "拥有全部功能权限"
        }, {
            "id": 2,
            "code": "002",
            "name": "资产会计",
            "memo": "拥有资产操作【资产卡片】，查看【资产分类统计表】，【资产折旧明细表】权限"
        }, {
            "id": 3,
            "code": "003",
            "name": "总账会计",
            "memo": "拥有操作凭证，查看财务报表，资金状况，经营状况的权限"
        }, {
            "id": 4,
            "code": "004",
            "name": "老板",
            "memo": "拥有查看资金状况，经营状况权限"
        }
    ],
    menus: [{
        "id": 1,
        "name": "我的桌面",
        "code": "01",
        "appName": "edfx-app-home",
        "iconFont": "zhuomianpeizhi",
        "parentId": 0,
        "showOrder": 100,
        "isVisible": 1,
        "operations": [{
            "menuId": 1,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 10,
        "name": "业务",
        "code": "10",
        "appName": "",
        "appProps": "",
        "iconFont": "yewu",
        "parentId": 0,
        "showOrder": 201,
        "isVisible": 1,
        "operations": [{
            "menuId": 10,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 10,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 10,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1010,
        "name": "采购管理",
        "code": "1010",
        "appName": "app-pu-voucher-card",
        "appProps": "",
        "parentId": 10,
        "showOrder": 202,
        "isVisible": 1,
        "operations": [{
            "menuId": 1010,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1010,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1010,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1010001,
        "name": "采购",
        "code": "1010001",
        "appName": "app-pu-voucher-list",
        "appProps": "",
        "parentId": 1010,
        "showOrder": 206,
        "isVisible": 1,
        "operations": [{
            "menuId": 1010001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1010001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1010001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1020,
        "name": "销售管理",
        "code": "1020",
        "appName": "app-scm-voucher-card",
        "parentId": 10,
        "showOrder": 203,
        "isVisible": 1,
        "operations": [{
            "menuId": 1020,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1020,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1020,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1020001,
        "name": "销售",
        "code": "1020001",
        "appName": "app-scm-voucher-list",
        "parentId": 1020,
        "showOrder": 205,
        "isVisible": 1,
        "operations": [{
            "menuId": 1020001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1020001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1020001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1030,
        "name": "库存管理",
        "code": "1030",
        "appName": "app-scm-voucher-card",
        "parentId": 10,
        "showOrder": 204,
        "isVisible": 1,
        "operations": [{
            "menuId": 1030,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1030,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1030,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1030001,
        "name": "采购入库单",
        "code": "1030001",
        "appName": "app-pu-voucher-list",
        "parentId": 1030,
        "showOrder": 207,
        "isVisible": 1,
        "operations": [{
            "menuId": 1030001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1030001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1030001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 15,
        "name": "财务",
        "code": "15",
        "iconFont": "caiwu",
        "parentId": 0,
        "showOrder": 301,
        "isVisible": 1,
        "operations": [{
            "menuId": 15,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 15,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 15,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1510,
        "name": "凭证",
        "code": "1510",
        "appName": "",
        "parentId": 15,
        "showOrder": 302,
        "isVisible": 1,
        "operations": [{
            "menuId": 1510,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1510,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1510,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 15100001,
        "name": "填制凭证",
        "code": "1510001",
        "appName": "app-proof-of-charge",
        "parentId": 1510,
        "showOrder": 303,
        "isVisible": 1,
        "operations": [{
            "menuId": 15100001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 15100001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 15100001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 15100002,
        "name": "凭证管理",
        "code": "1510002",
        "appName": "app-proof-of-list",
        "parentId": 1510,
        "showOrder": 304,
        "isVisible": 1,
        "operations": [{
            "menuId": 15100002,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 15100002,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 15100002,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 15100003,
        "name": "凭证汇总表",
        "code": "1510003",
        "appName": "app-proof-of-collect-rpt",
        "parentId": 1510,
        "showOrder": 305,
        "isVisible": 1,
        "operations": [{
            "menuId": 15100003,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 15100003,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 15100003,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1520,
        "name": "账簿",
        "code": "1520",
        "parentId": 15,
        "showOrder": 306,
        "isVisible": 1,
        "operations": [{
            "menuId": 1520,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1520,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1520,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1520001,
        "name": "总账",
        "code": "1520001",
        "appName": "app-sumaccount-rpt",
        "parentId": 1520,
        "showOrder": 307,
        "isVisible": 1,
        "operations": [{
            "menuId": 1520001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1520001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1520001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1520002,
        "name": "明细账",
        "code": "1520002",
        "appName": "app-detailaccount-rpt",
        "parentId": 1520,
        "showOrder": 308,
        "isVisible": 1,
        "operations": [{
            "menuId": 1520002,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1520002,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1520002,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1520003,
        "name": "余额表",
        "code": "1520003",
        "appName": "app-balancesum-rpt",
        "parentId": 1520,
        "showOrder": 309,
        "isVisible": 1,
        "operations": [{
            "menuId": 1520003,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1520003,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1520003,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1520004,
        "name": "辅助总账",
        "code": "1520004",
        "appName": "app-auxsumaccount-rpt",
        "parentId": 1520,
        "showOrder": 310,
        "isVisible": 1,
        "operations": [{
            "menuId": 1520004,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1520004,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1520004,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1520005,
        "name": "辅助明细账",
        "code": "1520005",
        "appName": "app-auxdetailaccount-rpt",
        "parentId": 1520,
        "showOrder": 311,
        "isVisible": 1,
        "operations": [{
            "menuId": 1520005,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1520005,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1520005,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1520006,
        "name": "辅助余额表",
        "code": "1520006",
        "appName": "app-auxbalancesum-rpt",
        "parentId": 1520,
        "showOrder": 312,
        "isVisible": 1,
        "operations": [{
            "menuId": 1520006,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1520006,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1520006,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 17,
        "name": "资产",
        "code": "17",
        "iconFont": "zichan",
        "parentId": 0,
        "showOrder": 400,
        "isVisible": 1,
        "operations": [{
            "menuId": 17,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 17,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 17,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 1710,
        "name": "资产",
        "code": "1710",
        "appName": "",
        "parentId": 17,
        "showOrder": 401,
        "isVisible": 1,
        "operations": [{
            "menuId": 1710,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 1710,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 1710,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 17100001,
        "name": "资产卡片",
        "code": "1710001",
        "appName": "app-asset-list",
        "parentId": 1710,
        "showOrder": 402,
        "isVisible": 1,
        "operations": [{
            "menuId": 17100001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 17100001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 17100001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 17100002,
        "name": "资产统计表",
        "code": "1710002",
        "appName": "app-asset-statrpt",
        "parentId": 1710,
        "showOrder": 403,
        "isVisible": 1,
        "operations": [{
            "menuId": 17100002,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 17100002,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 17100002,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 17100003,
        "name": "资产明细表",
        "code": "1710003",
        "appName": "app-asset-detailrpt",
        "parentId": 1710,
        "showOrder": 404,
        "isVisible": 1,
        "operations": [{
            "menuId": 17100003,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 17100003,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 17100003,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 20,
        "name": "结账",
        "code": "20",
        "iconFont": "jiezhang",
        "parentId": 0,
        "showOrder": 500,
        "isVisible": 1,
        "operations": [{
            "menuId": 20,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 20,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 20,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 2020,
        "name": "月末结账",
        "code": "2020",
        "appName": "app-account-monthaccount",
        "parentId": 20,
        "showOrder": 501,
        "isVisible": 1,
        "operations": [{
            "menuId": 2020,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 2020,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 2020,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 35,
        "name": "报表",
        "code": "35",
        "iconFont": "baobiao",
        "parentId": 0,
        "showOrder": 600,
        "isVisible": 1,
        "operations": [{
            "menuId": 35,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 35,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 35,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 3510,
        "name": "财务报表",
        "code": "3510",
        "parentId": 35,
        "showOrder": 601,
        "isVisible": 1,
        "operations": [{
            "menuId": 3510,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 3510,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 3510,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 3510001,
        "name": "资产负债表",
        "code": "3510001",
        "appName": "app-balancesheet-rpt",
        "parentId": 3510,
        "showOrder": 602,
        "isVisible": 1,
        "operations": [{
            "menuId": 3510001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 3510001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 3510001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 3510002,
        "name": "利润表",
        "code": "3510002",
        "appName": "app-profitstatement-rpt",
        "parentId": 3510,
        "showOrder": 603,
        "isVisible": 1,
        "operations": [{
            "menuId": 3510002,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 3510002,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 3510002,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 3510003,
        "name": "现金流量表",
        "code": "3510003",
        "appName": "app-cashflowstatement-rpt",
        "parentId": 3510,
        "showOrder": 604,
        "isVisible": 1,
        "operations": [{
            "menuId": 3510003,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 3510003,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 3510003,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 40,
        "name": "设置",
        "code": "40",
        "iconFont": "shezhi",
        "parentId": 0,
        "showOrder": 700,
        "isVisible": 1,
        "operations": [{
            "menuId": 40,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 40,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 40,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010,
        "name": "基础设置",
        "code": "4010",
        "appName": "",
        "parentId": 40,
        "showOrder": 701,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010001,
        "name": "部门人员",
        "code": "4010001",
        "appName": "app-list-department-personnel",
        "parentId": 4010,
        "showOrder": 702,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010002,
        "name": "客户",
        "code": "4010002",
        "appName": "app-list-customer",
        "parentId": 4010,
        "showOrder": 703,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010002,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010002,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010002,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010003,
        "name": "供应商",
        "code": "4010003",
        "appName": "app-list-supplier",
        "parentId": 4010,
        "showOrder": 704,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010003,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010003,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010003,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010004,
        "name": "项目",
        "code": "4010004",
        "appName": "app-list-project",
        "parentId": 4010,
        "showOrder": 705,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010004,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010004,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010004,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010005,
        "name": "存货及服务",
        "code": "4010005",
        "appName": "app-list-inventory",
        "parentId": 4010,
        "showOrder": 706,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010005,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010005,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010005,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010006,
        "name": "账户",
        "code": "4010006",
        "appName": "app-list-account",
        "parentId": 4010,
        "showOrder": 707,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010006,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010006,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010006,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010007,
        "name": "币种",
        "code": "4010007",
        "appName": "app-list-currency",
        "parentId": 4010,
        "showOrder": 708,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010007,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010007,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010007,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4010008,
        "name": "自定义档案",
        "code": "4010008",
        "appName": "app-list-userdefinecard",
        "parentId": 4010,
        "showOrder": 709,
        "isVisible": 1,
        "operations": [{
            "menuId": 4010008,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4010008,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4010008,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4020,
        "name": "科目期初",
        "code": "4020",
        "appName": "app-account-subjects",
        "parentId": 40,
        "showOrder": 710,
        "isVisible": 1,
        "operations": [{
            "menuId": 4020,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4020,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4020,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4020001,
        "name": "科目",
        "code": "4020001",
        "appName": "app-account-subjects",
        "parentId": 4020,
        "showOrder": 712,
        "isVisible": 1,
        "operations": [{
            "menuId": 4020001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4020001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4020001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4020002,
        "name": "期初余额",
        "code": "4020002",
        "appName": "app-account-beginbalance",
        "parentId": 4020,
        "showOrder": 713,
        "isVisible": 1,
        "operations": [{
            "menuId": 4020002,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4020002,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4020002,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4030,
        "name": "企业信息",
        "code": "4030",
        "appName": "edfx-app-org",
        "parentId": 40,
        "showOrder": 714,
        "isVisible": 1,
        "operations": [{
            "menuId": 4030,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4030,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4030,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 4510,
        "name": "用户管理",
        "code": "4510",
        "appName": "edfx-app-user-list",
        "appProps": "",
        "parentId": 45,
        "showOrder": 801,
        "isVisible": 1,
        "operations": [{
            "menuId": 4510,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 4510,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 4510,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 50,
        "name": "开发",
        "code": "50",
        "appName": "",
        "appProps": "",
        "iconFont": "bianji",
        "parentId": 0,
        "showOrder": 900,
        "isVisible": 1,
        "operations": [{
            "menuId": 50,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 50,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 50,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 5010,
        "name": "预置数据",
        "code": "5010",
        "appName": "",
        "appProps": "",
        "parentId": 50,
        "showOrder": 901,
        "isVisible": 1,
        "operations": [{
            "menuId": 5010,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 5010,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 5010,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 5010001,
        "name": "菜单预置",
        "code": "5010001",
        "appName": "edfx-app-portal-menu",
        "appProps": "",
        "parentId": 5010,
        "showOrder": 902,
        "isVisible": 1,
        "operations": [{
            "menuId": 5010001,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 5010001,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 5010001,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 5010002,
        "name": "操作权限",
        "code": "5010002",
        "appName": "edfx-app-operation",
        "appProps": "",
        "parentId": 5010,
        "showOrder": 903,
        "isVisible": 1,
        "operations": [{
            "menuId": 5010002,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 5010002,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 5010002,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 5010003,
        "name": "角色授权",
        "code": "5010003",
        "appName": "ttk-edf-app-role-auth",
        "appProps": "",
        "parentId": 5010,
        "showOrder": 904,
        "isVisible": 1,
        "operations": [{
            "menuId": 5010003,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 5010003,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 5010003,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 5010004,
        "name": "枚举预置",
        "code": "5010004",
        "appName": "edfx-app-enum",
        "appProps": "",
        "parentId": 5010,
        "showOrder": 905,
        "isVisible": 1,
        "operations": [{
            "menuId": 5010004,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 5010004,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 5010004,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 5010005,
        "name": "栏目预置",
        "code": "5010005",
        "appName": "edfx-app-column",
        "appProps": "",
        "parentId": 5010,
        "showOrder": 906,
        "isVisible": 1,
        "operations": [{
            "menuId": 5010005,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 5010005,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 5010005,
            "operationId": 300,
            "roleId": 0
        }]
    }, {
        "id": 5020,
        "name": "开发工具",
        "code": "5020",
        "appName": "edfx-app-devtools",
        "appProps": "",
        "parentId": 50,
        "showOrder": 907,
        "isVisible": 1,
        "operations": [{
            "menuId": 5020,
            "operationId": 100,
            "roleId": 0
        }, {
            "menuId": 5020,
            "operationId": 200,
            "roleId": 0
        }, {
            "menuId": 5020,
            "operationId": 300,
            "roleId": 0
        }]
    }
    ],
    "operations": [{
        "id": 100,
        "name": "无权限",
        "isEndNode": true,
        "ts": "2018-02-09 21:40:15.0"
    }, {
        "id": 200,
        "name": "查看",
        "isEndNode": true,
        "ts": "2018-02-09 21:40:15.0"
    }, {
        "id": 300,
        "name": "操作",
        "isEndNode": true,
        "ts": "2018-02-09 21:40:15.0"
    }
    ],
    checked: {
        '1': [{"orgId": 3951829303304192, "menuId": 1, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 1,
            "operationId": 300,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 2020, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 2020,
            "operationId": 300,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4030, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4030,
            "operationId": 300,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 1520001, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 1520002,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 1520003, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 1520004,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 1520005, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 1520006,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 3510001, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 3510002,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 3510003, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010001,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010001, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010002,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010002, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010003,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010003, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010004,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010004, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010005,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010005, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010006,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010006, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010007,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010007, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4010008,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4010008, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4020001,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4020001, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 4020002,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 4020002, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 15100001,
            "operationId": 100,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 15100001, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 15100001,
            "operationId": 300,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 15100002, "operationId": 100, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 15100002,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 15100002, "operationId": 300, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 15100003,
            "operationId": 200,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 17100001, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 17100001,
            "operationId": 300,
            "roleId": 1
        }, {"orgId": 3951829303304192, "menuId": 17100002, "operationId": 200, "roleId": 1}, {
            "orgId": 3951829303304192,
            "menuId": 17100003,
            "operationId": 200,
            "roleId": 1
        }],
        '2': [{"menuId": 1, "operationId": 200, "roleId": 2}, {
            "menuId": 2020,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 4030, "operationId": 100, "roleId": 2}, {
            "menuId": 1520001,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 1520002, "operationId": 100, "roleId": 2}, {
            "menuId": 1520003,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 1520004, "operationId": 100, "roleId": 2}, {
            "menuId": 1520005,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 1520006, "operationId": 100, "roleId": 2}, {
            "menuId": 3510001,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 3510002, "operationId": 100, "roleId": 2}, {
            "menuId": 3510003,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 4010001, "operationId": 100, "roleId": 2}, {
            "menuId": 4010002,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 4010003, "operationId": 100, "roleId": 2}, {
            "menuId": 4010004,
            "operationId": 200,
            "roleId": 2
        }, {"menuId": 4010004, "operationId": 300, "roleId": 2}, {
            "menuId": 4010005,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 4010006, "operationId": 100, "roleId": 2}, {
            "menuId": 4010007,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 4010008, "operationId": 200, "roleId": 2}, {
            "menuId": 4010008,
            "operationId": 300,
            "roleId": 2
        }, {"menuId": 4020001, "operationId": 200, "roleId": 2}, {
            "menuId": 4020001,
            "operationId": 300,
            "roleId": 2
        }, {"menuId": 4020002, "operationId": 200, "roleId": 2}, {
            "menuId": 4020002,
            "operationId": 300,
            "roleId": 2
        }, {"menuId": 15100001, "operationId": 100, "roleId": 2}, {
            "menuId": 15100002,
            "operationId": 100,
            "roleId": 2
        }, {"menuId": 15100003, "operationId": 100, "roleId": 2}, {
            "menuId": 17100001,
            "operationId": 200,
            "roleId": 2
        }, {"menuId": 17100001, "operationId": 300, "roleId": 2}, {
            "menuId": 17100002,
            "operationId": 200,
            "roleId": 2
        }, {"menuId": 17100003, "operationId": 200, "roleId": 2}],
        '3': [{"menuId": 1, "operationId": 200, "roleId": 3}, {
            "menuId": 1,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 2020, "operationId": 200, "roleId": 3}, {
            "menuId": 2020,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4030, "operationId": 200, "roleId": 3}, {
            "menuId": 4030,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 1520001, "operationId": 200, "roleId": 3}, {
            "menuId": 1520002,
            "operationId": 200,
            "roleId": 3
        }, {"menuId": 1520003, "operationId": 200, "roleId": 3}, {
            "menuId": 1520004,
            "operationId": 200,
            "roleId": 3
        }, {"menuId": 1520005, "operationId": 200, "roleId": 3}, {
            "menuId": 1520006,
            "operationId": 200,
            "roleId": 3
        }, {"menuId": 3510001, "operationId": 200, "roleId": 3}, {
            "menuId": 3510002,
            "operationId": 200,
            "roleId": 3
        }, {"menuId": 3510003, "operationId": 200, "roleId": 3}, {
            "menuId": 4010001,
            "operationId": 100,
            "roleId": 3
        }, {"menuId": 4010002, "operationId": 200, "roleId": 3}, {
            "menuId": 4010002,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4010003, "operationId": 200, "roleId": 3}, {
            "menuId": 4010003,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4010004, "operationId": 200, "roleId": 3}, {
            "menuId": 4010004,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4010005, "operationId": 200, "roleId": 3}, {
            "menuId": 4010005,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4010006, "operationId": 200, "roleId": 3}, {
            "menuId": 4010006,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4010007, "operationId": 200, "roleId": 3}, {
            "menuId": 4010007,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4010008, "operationId": 200, "roleId": 3}, {
            "menuId": 4010008,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4020001, "operationId": 200, "roleId": 3}, {
            "menuId": 4020001,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 4020002, "operationId": 200, "roleId": 3}, {
            "menuId": 4020002,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 15100001, "operationId": 200, "roleId": 3}, {
            "menuId": 15100001,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 15100002, "operationId": 200, "roleId": 3}, {
            "menuId": 15100002,
            "operationId": 300,
            "roleId": 3
        }, {"menuId": 15100003, "operationId": 200, "roleId": 3}, {
            "menuId": 17100001,
            "operationId": 100,
            "roleId": 3
        }, {"menuId": 17100002, "operationId": 100, "roleId": 3}, {
            "menuId": 17100003,
            "operationId": 100,
            "roleId": 3
        }],
        '4': [{"orgId": 3951829303304192, "menuId": 1, "operationId": 200, "roleId": 4}, {
            "orgId": 3951829303304192,
            "menuId": 4030,
            "operationId": 200,
            "roleId": 4
        }, {"orgId": 3951829303304192, "menuId": 4030, "operationId": 300, "roleId": 4}, {
            "orgId": 3951829303304192,
            "menuId": 3510001,
            "operationId": 200,
            "roleId": 4
        }, {"orgId": 3951829303304192, "menuId": 3510002, "operationId": 200, "roleId": 4}, {
            "orgId": 3951829303304192,
            "menuId": 3510003,
            "operationId": 200,
            "roleId": 4
        }, {"orgId": 3951829303304192, "menuId": 4010001, "operationId": 200, "roleId": 4}, {
            "orgId": 3951829303304192,
            "menuId": 4010001,
            "operationId": 300,
            "roleId": 4
        }, {"orgId": 3951829303304192, "menuId": 4010002, "operationId": 200, "roleId": 4}, {
            "orgId": 3951829303304192,
            "menuId": 4010002,
            "operationId": 300,
            "roleId": 4
        }, {"orgId": 3951829303304192, "menuId": 4010003, "operationId": 200, "roleId": 4}, {
            "orgId": 3951829303304192,
            "menuId": 4010003,
            "operationId": 300,
            "roleId": 4
        }, {"orgId": 3951829303304192, "menuId": 4010004, "operationId": 200, "roleId": 4}, {
            "orgId": 3951829303304192,
            "menuId": 4010004,
            "operationId": 300,
            "roleId": 4
        }],
    }

}

function deleteRoleid(id) {
    data.parent = data.parent.filter(item => item.id != id)
    const newChecked = delete data.checked[id.toString()]
    // data.checked = newChecked
}

function getData() {
    return data
}

function create(option) {
    try {
        const {parent, checked} = data
        const {name} = option
        const id = parent.length + 1
        parent.push({
            "id": id,
            "code": `${id}`,
            "name": name,
            "memo": "拥有查看资金状况，经营状况权限"
        })
        checked[`${id}`] = []
        data.parent = parent
        data.checked = checked
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

function update(option) {
    try {
        const {parent} = data
        const {name, id} = option
        const arr = parent.map(item => {
            if (item.id == id) {
                item.name = name
            }
            return item
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

function findById(id) {
    try {
        const {parent} = data
        const result = parent.find(item => item.id == id)
        return result
    } catch (err) {
        console.log(err)
        return false
    }

}

function deleteFunc(option){
    const { id } = option
    const newData = deleteRoleid(id)
    return {
        result: true,
        value: newData
    }
}

function init(){
    const { parent, menus, operations,  checked } = getData()
    return {
        "result": true,
        "value": {
            "roles": parent,
            "menus": menus,
            "operations": operations,
            "menuOperations": checked[parent[0].id.toString()]
        }
    }
}

function getData2(type){
    const { checked } = getData()
    let result = checked[type]
    if( !result ){
        return {
            result: false,
            message: '没有这个东东'
        }
    }
    return result
}


function query(option){
    if( option&&option.roleId ){
        return {
            value: getData2(option.roleId),
            result: true
        }
    }else{
        return {
            result: false,
            message: '你是不是少传参数了'
        }
    }

}

function save (option){
    try{
        const {checked} = getData()
        const { roleId, menuOperations } = option
        checked[roleId.toString()] = menuOperations
        return {
            result: true,
            value: menuOperations
        }
    }catch(err){
        console.log(err)
        return {
            result: false,
            message: '参数错误'
        }
    }
}



fetch.mock('/v1/edf/role/init',(option)=>{
    return init()
})

fetch.mock('/v1/edf/roleMenuOperation/query',(option)=>{
    return query(option)
})

fetch.mock('/v1/edf/roleMenuOperation/save', (option)=>{
    return save(option)
})

fetch.mock('/v1/edf/role/delete', (option)=>{
    return deleteFunc(option)
})

export default { findById, create, update }


