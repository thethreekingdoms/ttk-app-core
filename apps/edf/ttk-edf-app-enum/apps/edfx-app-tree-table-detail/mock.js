/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData

fetch.mock('/v1/edf/enumDetail/update', (option) => {
    const v = mockData.enumDetail.find(o => o.id == option.id)
    
    v.code = option.code
    v.name = option.name
    return { result: true, value: v }
})

fetch.mock('/v1/edf/enumDetail/findById', (id) => {
    const v = mockData.enumDetail.find(o => o.id == id)
    return { result: true, value: v }
})