// /**
//  * mock.js 提供应用截获ajax请求，为脱离后台测试使用
//  * 模拟查询更改内存中mockData,并返回数据
//  */

import { fetch } from 'edf-utils'
// import './server/service'
const mockData = fetch.mockData

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

// fetch.mock('/v1/edf/operation/query', (option) => {

//     init()

//     return {
//         result: true, value: mockData.editableTable
//     }
// })

fetch.mock('/v1/edf/operation/save', (option) => {
    mockData.operation = option

    return {
        result: true, value: true
    }
})

