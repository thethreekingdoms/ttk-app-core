/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData

function findNode(id, types) {
    for (let t of types) {
        if (t.id == id)
            return t
        else if (t.children) {
            let n = findNode(id, t.children)
            if (n) return n
        }
    }
}

// fetch.mock('/v1/edf/column/create', (option) => {
//     const parent = findNode(option.parentId, mockData.columnTypes)
//     var newId = -1
//     if (!parent.children) {
//         parent.children = []
//         newId = option.parentId * 100 + 1
//     }
//     else {
//         newId = parent.children[parent.children.length - 1].id + 1
//     }
//     const v = { code: option.code, name: option.name, id: newId }
//     parent.children.push(v)

//     return { result: true, value: v }
// })

// fetch.mock('/v1/edf/column/update', (option) => {
//     const node = findNode(option.id, mockData.columnTypes)
//     node.code = option.code
//     node.name = option.name
//     return { result: true, value: node }
// })

// fetch.mock('/v1/edf/column/delete', (option) => {
//     const node = findNode(option.id, mockData.columnTypes)
//     node.code = option.code
//     node.name = option.name
//     return { result: true, value: node }
// })

// fetch.mock('/v1/edf/column/findById', (id) => {
//     const node = findNode(id, mockData.columnTypes)
//     return { result: true, value: node }
// })