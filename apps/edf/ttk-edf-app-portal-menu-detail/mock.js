// /**
//  * mock.js 提供应用截获ajax请求，为脱离后台测试使用
//  * 模拟查询更改内存中mockData,并返回数据
//  */

import { fetch } from 'edf-utils'

// import './server/service'

const mockData = fetch.mockData

fetch.mock('/v1/edf/menu/create', (option) => {
    const id = mockData.menu.length*parseInt(Math.random()*10)
    const v = { ...option, id }
    mockData.menu.push(v)
    return { result: true, value: v }
})

fetch.mock('/v1/edf/menu/query', () => {
    const menu = mockData.menu
    return { result: true, value: menu }
})

fetch.mock('/v1/edf/menu/update', (option) => {
    const v = mockData.menu.find(o => o.id == option.id)
    v.code = option.code
    v.name = option.name
    v.appName = option.appName
    v.parentId = option.parentId
    v.appProps = option.appProps
    return { result: true, value: v }
})

fetch.mock('/v1/edf/menu/findFullById', (id) => {
    const v = mockData.menu.find(o => o.id == id)
    v.operations = [{"menuId":1,"operationId":100,"roleId":0},{"menuId":1,"operationId":200,"roleId":0},{"menuId":1,"operationId":300,"roleId":0},{"menuId":10,"operationId":100,"roleId":0},{"menuId":10,"operationId":200,"roleId":0},{"menuId":10,"operationId":300,"roleId":0},{"menuId":15,"operationId":100,"roleId":0},{"menuId":15,"operationId":200,"roleId":0},{"menuId":15,"operationId":300,"roleId":0},{"menuId":17,"operationId":100,"roleId":0},{"menuId":17,"operationId":200,"roleId":0},{"menuId":17,"operationId":300,"roleId":0},{"menuId":20,"operationId":100,"roleId":0},{"menuId":20,"operationId":200,"roleId":0},{"menuId":20,"operationId":300,"roleId":0},{"menuId":35,"operationId":100,"roleId":0},{"menuId":35,"operationId":200,"roleId":0},{"menuId":35,"operationId":300,"roleId":0},{"menuId":40,"operationId":100,"roleId":0},{"menuId":40,"operationId":200,"roleId":0},{"menuId":40,"operationId":300,"roleId":0},{"menuId":45,"operationId":100,"roleId":0},{"menuId":45,"operationId":200,"roleId":0},{"menuId":45,"operationId":300,"roleId":0},{"menuId":50,"operationId":100,"roleId":0},{"menuId":50,"operationId":200,"roleId":0},{"menuId":50,"operationId":300,"roleId":0},{"menuId":55,"operationId":100,"roleId":0},{"menuId":55,"operationId":200,"roleId":0},{"menuId":55,"operationId":300,"roleId":0},{"menuId":1010,"operationId":100,"roleId":0},{"menuId":1010,"operationId":200,"roleId":0},{"menuId":1010,"operationId":300,"roleId":0},{"menuId":1020,"operationId":100,"roleId":0},{"menuId":1020,"operationId":200,"roleId":0},{"menuId":1020,"operationId":300,"roleId":0},{"menuId":1030,"operationId":100,"roleId":0},{"menuId":1030,"operationId":200,"roleId":0},{"menuId":1030,"operationId":300,"roleId":0},{"menuId":1510,"operationId":100,"roleId":0},{"menuId":1510,"operationId":200,"roleId":0},{"menuId":1510,"operationId":300,"roleId":0},{"menuId":1520,"operationId":100,"roleId":0},{"menuId":1520,"operationId":200,"roleId":0},{"menuId":1520,"operationId":300,"roleId":0},{"menuId":1710,"operationId":100,"roleId":0},{"menuId":1710,"operationId":200,"roleId":0},{"menuId":1710,"operationId":300,"roleId":0},{"menuId":2020,"operationId":100,"roleId":0},{"menuId":2020,"operationId":200,"roleId":0},{"menuId":2020,"operationId":300,"roleId":0},{"menuId":3510,"operationId":100,"roleId":0},{"menuId":3510,"operationId":200,"roleId":0},{"menuId":3510,"operationId":300,"roleId":0},{"menuId":4010,"operationId":100,"roleId":0},{"menuId":4010,"operationId":200,"roleId":0},{"menuId":4010,"operationId":300,"roleId":0},{"menuId":4020,"operationId":100,"roleId":0},{"menuId":4020,"operationId":200,"roleId":0},{"menuId":4020,"operationId":300,"roleId":0},{"menuId":4510,"operationId":100,"roleId":0},{"menuId":4510,"operationId":200,"roleId":0},{"menuId":4510,"operationId":300,"roleId":0},{"menuId":5010,"operationId":100,"roleId":0},{"menuId":5010,"operationId":200,"roleId":0},{"menuId":5010,"operationId":300,"roleId":0},{"menuId":5020,"operationId":100,"roleId":0},{"menuId":5020,"operationId":200,"roleId":0},{"menuId":5020,"operationId":300,"roleId":0},{"menuId":1010001,"operationId":100,"roleId":0},{"menuId":1010001,"operationId":200,"roleId":0},{"menuId":1010001,"operationId":300,"roleId":0},{"menuId":1020001,"operationId":100,"roleId":0},{"menuId":1020001,"operationId":200,"roleId":0},{"menuId":1020001,"operationId":300,"roleId":0},{"menuId":1030001,"operationId":100,"roleId":0},{"menuId":1030001,"operationId":200,"roleId":0},{"menuId":1030001,"operationId":300,"roleId":0},{"menuId":1520001,"operationId":100,"roleId":0},{"menuId":1520001,"operationId":200,"roleId":0},{"menuId":1520001,"operationId":300,"roleId":0},{"menuId":1520002,"operationId":100,"roleId":0},{"menuId":1520002,"operationId":200,"roleId":0},{"menuId":1520002,"operationId":300,"roleId":0},{"menuId":1520003,"operationId":100,"roleId":0},{"menuId":1520003,"operationId":200,"roleId":0},{"menuId":1520003,"operationId":300,"roleId":0},{"menuId":1520004,"operationId":100,"roleId":0},{"menuId":1520004,"operationId":200,"roleId":0},{"menuId":1520004,"operationId":300,"roleId":0},{"menuId":1520005,"operationId":100,"roleId":0},{"menuId":1520005,"operationId":200,"roleId":0},{"menuId":1520005,"operationId":300,"roleId":0},{"menuId":1520006,"operationId":100,"roleId":0},{"menuId":1520006,"operationId":200,"roleId":0},{"menuId":1520006,"operationId":300,"roleId":0},{"menuId":3510001,"operationId":100,"roleId":0},{"menuId":3510001,"operationId":200,"roleId":0},{"menuId":3510001,"operationId":300,"roleId":0},{"menuId":3510002,"operationId":100,"roleId":0},{"menuId":3510002,"operationId":200,"roleId":0},{"menuId":3510002,"operationId":300,"roleId":0},{"menuId":3510003,"operationId":100,"roleId":0},{"menuId":3510003,"operationId":200,"roleId":0},{"menuId":3510003,"operationId":300,"roleId":0},{"menuId":4010001,"operationId":100,"roleId":0},{"menuId":4010001,"operationId":200,"roleId":0},{"menuId":4010001,"operationId":300,"roleId":0},{"menuId":4010002,"operationId":100,"roleId":0},{"menuId":4010002,"operationId":200,"roleId":0},{"menuId":4010002,"operationId":300,"roleId":0},{"menuId":4010003,"operationId":100,"roleId":0},{"menuId":4010003,"operationId":200,"roleId":0},{"menuId":4010003,"operationId":300,"roleId":0},{"menuId":4010004,"operationId":100,"roleId":0},{"menuId":4010004,"operationId":200,"roleId":0},{"menuId":4010004,"operationId":300,"roleId":0},{"menuId":4010005,"operationId":100,"roleId":0},{"menuId":4010005,"operationId":200,"roleId":0},{"menuId":4010005,"operationId":300,"roleId":0},{"menuId":4010006,"operationId":100,"roleId":0},{"menuId":4010006,"operationId":200,"roleId":0},{"menuId":4010006,"operationId":300,"roleId":0},{"menuId":4010007,"operationId":100,"roleId":0},{"menuId":4010007,"operationId":200,"roleId":0},{"menuId":4010007,"operationId":300,"roleId":0},{"menuId":4010008,"operationId":100,"roleId":0},{"menuId":4010008,"operationId":200,"roleId":0},{"menuId":4010008,"operationId":300,"roleId":0},{"menuId":4020001,"operationId":100,"roleId":0},{"menuId":4020001,"operationId":200,"roleId":0},{"menuId":4020001,"operationId":300,"roleId":0},{"menuId":4020002,"operationId":100,"roleId":0},{"menuId":4020002,"operationId":200,"roleId":0},{"menuId":4020002,"operationId":300,"roleId":0},{"menuId":5010001,"operationId":100,"roleId":0},{"menuId":5010001,"operationId":200,"roleId":0},{"menuId":5010001,"operationId":300,"roleId":0},{"menuId":5010002,"operationId":100,"roleId":0},{"menuId":5010002,"operationId":200,"roleId":0},{"menuId":5010002,"operationId":300,"roleId":0},{"menuId":5010003,"operationId":100,"roleId":0},{"menuId":5010003,"operationId":200,"roleId":0},{"menuId":5010003,"operationId":300,"roleId":0},{"menuId":5010004,"operationId":100,"roleId":0},{"menuId":5010004,"operationId":200,"roleId":0},{"menuId":5010004,"operationId":300,"roleId":0},{"menuId":5010005,"operationId":100,"roleId":0},{"menuId":5010005,"operationId":200,"roleId":0},{"menuId":5010005,"operationId":300,"roleId":0},{"menuId":15100001,"operationId":100,"roleId":0},{"menuId":15100001,"operationId":200,"roleId":0},{"menuId":15100001,"operationId":300,"roleId":0},{"menuId":15100002,"operationId":100,"roleId":0},{"menuId":15100002,"operationId":200,"roleId":0},{"menuId":15100002,"operationId":300,"roleId":0},{"menuId":15100003,"operationId":100,"roleId":0},{"menuId":15100003,"operationId":200,"roleId":0},{"menuId":15100003,"operationId":300,"roleId":0},{"menuId":17100001,"operationId":100,"roleId":0},{"menuId":17100001,"operationId":200,"roleId":0},{"menuId":17100001,"operationId":300,"roleId":0},{"menuId":17100002,"operationId":100,"roleId":0},{"menuId":17100002,"operationId":200,"roleId":0},{"menuId":17100002,"operationId":300,"roleId":0},{"menuId":17100003,"operationId":100,"roleId":0},{"menuId":17100003,"operationId":200,"roleId":0},{"menuId":17100003,"operationId":300,"roleId":0}]
    return { result: true, value: v }
})

function initOperation() {
    if (mockData.operation && mockData.operation.length > 0)
        return
    mockData.operation = [
        {
            "id":1,
            "name":"无权限",
            "isEndNode":true,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":2,
            "name":"查看",
            "isEndNode":true,
            "ts":"2018-02-09 21:40:15.0"
        },
        {
            "id":3,
            "name":"操作",
            "isEndNode":true,
            "ts":"2018-02-09 21:40:15.0"
        }
    ]
}

fetch.mock('/v1/edf/operation/query', () => {
    initOperation()
    return { result: true, value: mockData.operation }
})