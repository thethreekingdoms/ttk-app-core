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