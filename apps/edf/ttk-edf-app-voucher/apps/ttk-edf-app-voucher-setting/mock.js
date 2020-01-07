/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'
import moment from 'moment'

const mockData = fetch.mockData
//add
fetch.mock('/v1/edf/column/createPreset', (option) => {
    let res = {}
    Object.assign(res, option)
    res.id = Math.random() * 100000
    res.createTime = moment().format('YYYY-MM-DD hh-mm-ss')
    res.createTime = moment().format('YYYY-MM-DD hh-mm-ss')
    mockData.columnPreset.tree.push(res)
    mockData.columnPreset.list[res.id] = {
        list: [],
        page: { currentPage: 1, totalPage: 0, totalData: 0, pageSize: 20 }
    }
    return {
        result: true,
        value: res
    }
})
//modity
fetch.mock('/v1/edf/column/updatePreset', (option) => {
    let tree = mockData.columnPreset.tree
    let node = tree.find((op) => {
        return op.id == option.id
    })
    Object.assign(node, option)
    console.log(mockData.columnPreset.tree)
    return {
        result: true,
        value: node
    }
})
