// /**
//  * mock.js 提供应用截获ajax请求，为脱离后台测试使用
//  * 模拟查询更改内存中mockData,并返回数据
//  */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData

// import './server/service'

function initMenu() {
    if (mockData.menu && mockData.menu.length > 0)
        return

    mockData.menu = [
        {
            "id":1,
            "name":"我的桌面",
            "code":"01",
            "appName":"edfx-app-home",
            "iconFont":"zhuomianpeizhi",
            "parentId":0,
            "showOrder":100,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":10,
            "name":"业务",
            "code":"10",
            "appName":"",
            "appProps":"",
            "iconFont":"yewu",
            "parentId":0,
            "showOrder":201,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":15,
            "name":"财务",
            "code":"15",
            "iconFont":"caiwu",
            "parentId":0,
            "showOrder":301,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":17,
            "name":"资产",
            "code":"17",
            "iconFont":"zichan",
            "parentId":0,
            "showOrder":400,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":20,
            "name":"结账",
            "code":"20",
            "iconFont":"jiezhang",
            "parentId":0,
            "showOrder":500,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":35,
            "name":"报表",
            "code":"35",
            "iconFont":"baobiao",
            "parentId":0,
            "showOrder":600,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":40,
            "name":"设置",
            "code":"40",
            "iconFont":"shezhi",
            "parentId":0,
            "showOrder":700,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":45,
            "name":"系统",
            "code":"45",
            "appName":"",
            "appProps":"",
            "iconFont":"zhuomianpeizhi",
            "parentId":0,
            "showOrder":800,
            "isVisible":0,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":50,
            "name":"开发",
            "code":"50",
            "appName":"",
            "appProps":"",
            "iconFont":"bianji",
            "parentId":0,
            "showOrder":900,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":55,
            "name":"业务分析",
            "code":"55",
            "appName":"edfx-app-dashboard-analysis",
            "iconFont":"baobiao",
            "parentId":0,
            "showOrder":1000,
            "isVisible":0,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":1010,
            "name":"采购管理",
            "code":"1010",
            "appName":"app-pu-voucher-card",
            "appProps":"",
            "parentId":10,
            "showOrder":202,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":1020,
            "name":"销售管理",
            "code":"1020",
            "appName":"app-scm-voucher-card",
            "parentId":10,
            "showOrder":203,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":1030,
            "name":"库存管理",
            "code":"1030",
            "appName":"app-scm-voucher-card",
            "parentId":10,
            "showOrder":204,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":1510,
            "name":"凭证",
            "code":"1510",
            "appName":"",
            "parentId":15,
            "showOrder":302,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":1520,
            "name":"账簿",
            "code":"1520",
            "parentId":15,
            "showOrder":306,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":1710,
            "name":"资产",
            "code":"1710",
            "appName":"",
            "parentId":17,
            "showOrder":401,
            "isVisible":1,
            "ts":"2018-03-13 19:08:33.0"
        },
        {
            "id":2020,
            "name":"月末结账",
            "code":"2020",
            "appName":"app-account-monthaccount",
            "parentId":20,
            "showOrder":501,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":3510,
            "name":"财务报表",
            "code":"3510",
            "parentId":35,
            "showOrder":601,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":4010,
            "name":"基础设置",
            "code":"4010",
            "appName":"",
            "parentId":40,
            "showOrder":701,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":4020,
            "name":"科目期初",
            "code":"4020",
            "appName":"app-account-subjects",
            "parentId":40,
            "showOrder":710,
            "isVisible":1,
            "ts":"2018-02-09 21:40:15.0"
        }
    ]
}
initMenu()


fetch.mock('/v1/edf/menu/queryPageList', (option) => {
    var ret = query(option)
    return ret
})

fetch.mock('/v1/edf/menu/query', (option) => {
    return query(option)
})

function query(option) {
    initMenu()

    const { page, entity } = option
    let data = mockData.menu

    if (entity) {
        if (entity.parentId) {
            data = data.filter(o => o.parentId == entity.parentId)
        }

    }

    let currentPage = page.currentPage
    let pageSize = page.pageSize
    let totalCount = data.length
    let totalPage = Math.round(totalCount / pageSize) + (totalCount % pageSize ? 1 : 0)
    let start = (currentPage - 1) * pageSize
    let end = currentPage * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    currentPage = start > data.length - 1 ? 1 : currentPage

    let ret = {
        result: true,
        value: {
            page: { currentPage, pageSize, totalPage ,totalCount},
            list: []
        }
    }
    for (let j = start; j < end; j++) {
        if (data[j])
            ret.value.list.push(data[j])
    }
    return ret
}

function initColumn(code){
    if (mockData.column && mockData.column.length > 0)
        return
    mockData.column = [
        {
            "id":10000100001,
            "columnId":100001,
            "fieldName":"code",
            "caption":"编号",
            "idFieldType":1000040001,
            "width":200,
            "defPrecision":0,
            "idAlignType":1000060001,
            "colIndex":1,
            "idOrderMode":1000050002,
            "isFixed":false,
            "isVisible":true,
            "isMustSelect":true,
            "isSystem":false,
            "isHeader":false,
            "isTotalColumn":false,
            "fieldTypeDTO":{
                "id":1000040001,
                "name":"字符",
                "code":"string",
                "enumId":100004
            },
            "alignTypeDTO":{
                "id":1000060001,
                "name":"升序",
                "code":"01",
                "enumId":100006
            },
            "orderModeDTO":{
                "id":1000050002,
                "name":"居中对齐",
                "code":"02",
                "enumId":100005
            }
        },
        {
            "id":10000100002,
            "columnId":100001,
            "fieldName":"name",
            "caption":"名称",
            "idFieldType":1000040001,
            "width":200,
            "defPrecision":0,
            "idAlignType":1000060001,
            "colIndex":2,
            "idOrderMode":1000050002,
            "isFixed":false,
            "isVisible":true,
            "isMustSelect":true,
            "isSystem":false,
            "isHeader":false,
            "isTotalColumn":false,
            "fieldTypeDTO":{
                "id":1000040001,
                "name":"字符",
                "code":"string",
                "enumId":100004
            },
            "alignTypeDTO":{
                "id":1000060001,
                "name":"升序",
                "code":"01",
                "enumId":100006
            },
            "orderModeDTO":{
                "id":1000050002,
                "name":"居中对齐",
                "code":"02",
                "enumId":100005
            }
        },
        {
            "id":10000100003,
            "columnId":100001,
            "fieldName":"appName",
            "caption":"应用名称",
            "idFieldType":1000040001,
            "width":300,
            "defPrecision":0,
            "idAlignType":1000060001,
            "colIndex":3,
            "idOrderMode":1000050002,
            "isFixed":false,
            "isVisible":true,
            "isMustSelect":true,
            "isSystem":false,
            "isHeader":false,
            "isTotalColumn":false,
            "fieldTypeDTO":{
                "id":1000040001,
                "name":"字符",
                "code":"string",
                "enumId":100004
            },
            "alignTypeDTO":{
                "id":1000060001,
                "name":"升序",
                "code":"01",
                "enumId":100006
            },
            "orderModeDTO":{
                "id":1000050002,
                "name":"居中对齐",
                "code":"02",
                "enumId":100005
            }
        },
        {
            "id":10000100004,
            "columnId":100001,
            "fieldName":"appProps",
            "caption":"参数",
            "idFieldType":1000040001,
            "width":100,
            "defPrecision":0,
            "idAlignType":1000060001,
            "colIndex":4,
            "idOrderMode":1000050002,
            "isFixed":false,
            "isVisible":false,
            "isMustSelect":false,
            "isSystem":false,
            "isHeader":false,
            "isTotalColumn":false,
            "fieldTypeDTO":{
                "id":1000040001,
                "name":"字符",
                "code":"string",
                "enumId":100004
            },
            "alignTypeDTO":{
                "id":1000060001,
                "name":"升序",
                "code":"01",
                "enumId":100006
            },
            "orderModeDTO":{
                "id":1000050002,
                "name":"居中对齐",
                "code":"02",
                "enumId":100005
            }
        }
    ]
}

fetch.mock('/v1/edf/columnDetail/findByColumnCode', (option) => {
    initColumn()
    let ret = mockData.column
    return { result: true, value: ret }
})

fetch.mock('/v1/edf/menu/deleteBatch', (option) => {
    option.forEach(id => {
        mockData.menu = mockData.menu.filter(
            (m) =>{
                return id.id != m.id
            }
        )
    })
    return { result: true, value: true }
})