/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'
import { debug } from 'util';
import Mock from 'mockjs'

const mockData = fetch.mockData


const mockproxy = '/v1/original-style'
fetch.mock(`${mockproxy}/table/queryDate`, (option) => {
    return mockData.queryDate = {
        value: {
            EnableDate: "2019-01-01",
            SystemDate: "2020-06"
        },
        result: true
    }
})

fetch.mock(`${mockproxy}/table/thead`, (option) => {
    return thead
})

fetch.mock(`${mockproxy}/table/tableBody`, (option) => {
    const totalCount = 506
    const { currentPage, pageSize } = option.page
    const totalPage = Math.ceil(totalCount / pageSize)
    const list = table_data.list.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return {
        value: {
            list,
            page: {
                currentPage,
                pageSize,
                totalCount,
                totalPage
            }
        },
        result: true
    }
})

const table_data = Mock.mock({
    page: {
        currentPage: 1,
        pageSize: 50,
        totalCount: 128,
        totalPage: 3
    },
    'list|506': [{
        attachments: [],
        balance: '@integer(-100000, 100000)',
        details: [],
        isGenDoc: 0,
        memo: "",
        positionFlag: "first",
        remark: "期初",
        seq: "@increment",
        voucherCode: "",
        voucherStatus: 0,
        voucherTypeName: "",

        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
    }]
})



const thead = {
    result: true,
    value: {
        "column": {
            "orgId": 6682307972382720,
            "id": 400008,
            "code": "incomeDisbursementListNew",
            "name": "收支明细列表新版",
            "isDefault": true,
            "userId": 5911348639870976,
            "ts": "2019-07-25 17:58:50.0",
            "createTime": "2019-07-11 00:20:31",
            "columnDetails": [{
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800001,
                "columnId": 400008,
                "fieldName": "seq",
                "caption": "序号",
                "idFieldType": 1000040001,
                "width": 43,
                "idAlignType": 1000050002,
                "colIndex": 10,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": true,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "6CH",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800002,
                "columnId": 400008,
                "fieldName": "businessDate",
                "caption": "单据日期",
                "idFieldType": 1000040003,
                "width": 112,
                "idAlignType": 1000050002,
                "colIndex": 20,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "10CH",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800004,
                "columnId": 400008,
                "fieldName": "remark",
                "caption": "摘要",
                "idFieldType": 1000040001,
                "width": 198,
                "idAlignType": 1000050001,
                "colIndex": 30,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "6CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800005,
                "columnId": 400008,
                "fieldName": "reciprocalAccountName",
                "caption": "对方户名",
                "idFieldType": 1000040001,
                "width": 156,
                "idAlignType": 1000050001,
                "colIndex": 35,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "6CC",
                "customDecideVisible": true,
                "ts": "2019-07-30 15:10:48.0",
                "createTime": "2019-07-30 15:09:12"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800011,
                "columnId": 400008,
                "fieldName": "businessTypeName",
                "caption": "收支类型",
                "idFieldType": 1000040001,
                "width": 222,
                "idAlignType": 1000050001,
                "colIndex": 40,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": true,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "7CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800010,
                "columnId": 400008,
                "fieldName": "supplierOrCustomerOrPerson",
                "caption": "往来单位及个人",
                "idFieldType": 1000040001,
                "width": 222,
                "idAlignType": 1000050001,
                "colIndex": 50,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": true,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "17CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800007,
                "columnId": 400008,
                "fieldName": "inMount",
                "caption": "收入",
                "idFieldType": 1000040002,
                "width": 108,
                "defPrecision": 2,
                "idAlignType": 1000050003,
                "colIndex": 60,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": true,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "7CH",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800008,
                "columnId": 400008,
                "fieldName": "outMount",
                "caption": "支出",
                "idFieldType": 1000040002,
                "width": 108,
                "defPrecision": 2,
                "idAlignType": 1000050003,
                "colIndex": 70,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": true,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "7CH",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800009,
                "columnId": 400008,
                "fieldName": "balance",
                "caption": "余额",
                "idFieldType": 1000040002,
                "width": 108,
                "defPrecision": 2,
                "idAlignType": 1000050003,
                "colIndex": 80,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": true,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "7CH",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800006,
                "columnId": 400008,
                "fieldName": "docCode",
                "caption": "凭证字号",
                "idFieldType": 1000040001,
                "width": 78,
                "idAlignType": 1000050002,
                "colIndex": 110,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "5CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800012,
                "columnId": 400008,
                "fieldName": "departmentName",
                "caption": "部门",
                "idFieldType": 1000040001,
                "width": 138,
                "idAlignType": 1000050001,
                "colIndex": 120,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": false,
                "isTotalColumn": true,
                "isOrderMode": false,
                "occupyConfig": "10CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800013,
                "columnId": 400008,
                "fieldName": "projectName",
                "caption": "项目",
                "idFieldType": 1000040001,
                "width": 138,
                "idAlignType": 1000050001,
                "colIndex": 130,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": false,
                "isTotalColumn": true,
                "isOrderMode": false,
                "occupyConfig": "10CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800003,
                "columnId": 400008,
                "fieldName": "sourceVoucherType",
                "caption": "来源单据",
                "idFieldType": 1000040001,
                "width": 102,
                "idAlignType": 1000050001,
                "colIndex": 140,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "7CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }, {
                "orgId": 6682307972382720,
                "userId": 5911348639870976,
                "id": 40000800014,
                "columnId": 400008,
                "fieldName": "memo",
                "caption": "备注",
                "idFieldType": 1000040001,
                "width": 258,
                "idAlignType": 1000050001,
                "colIndex": 150,
                "idOrderMode": 1000060001,
                "isFixed": false,
                "isVisible": true,
                "isMustSelect": false,
                "isSystem": true,
                "isHeader": true,
                "isTotalColumn": false,
                "isOrderMode": false,
                "occupyConfig": "20CC",
                "customDecideVisible": true,
                "ts": "2019-07-02 19:20:04.0",
                "createTime": "2019-07-25 17:58:51",
                "updateTime": "2019-07-25 17:58:51"
            }]
        }
    }
}
