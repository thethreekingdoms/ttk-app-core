/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'
import { debug } from 'util';

const mockData = fetch.mockData


let data = [{
    "id": 100001,
    "name": "文件类型",
    "code": "fileType",
    "data": [{
        "id": 1000020001,
        "name": "未审核",
        "code": "NotApprove",
        "enumId": 100002
    }, {
        "id": 1000020002,
        "name": "已审核",
        "code": "Approved",
        "enumId": 100002
    }, {
        "id": 1000020003,
        "name": "已驳回",
        "code": "Rejected",
        "enumId": 100002
    }]
}, {
    "id": 100002,
    "name": "单据状态",
    "code": "voucherStatus",
    "data": []
}, {
    "id": 100003,
    "name": "单据类型",
    "code": "voucherType",
    "data":[]
}]

window.data = data

fetch.mock('/v1/edf/enumDetail/init', (option) => {
    let result = data.find(item => item.id == option.filter.enumId)
    if( option.filter.enumId == '3336424919598080' ) {
        result = data[0] ? data[0] : {  }
    }else if( !result ){
        result = {
            data: []
        }
    }
    const res = {
        result: true, 
        value: {
            tree: data,
            list: result.data,
            pagination: {
                pageSize: 20,
                currentPage: 1,
                totalPage: 1,
                totalCount: result.length
            }
        }
    }
    return res
 })

fetch.mock('/v1/edf/columnDetail/findByColumnCode', (option) => {
    return {
        "result": true,
        "value": [{
            "id": 10000200001,
            "columnId": 100002,
            "fieldName": "code",
            "caption": "编码",
            "idFieldType": 1000040001,
            "width": 200,
            "defPrecision": 0,
            "idAlignType": 1000050002,
            "colIndex": 1,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": true,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040001,
                "name": "字符",
                "code": "string",
                "enumId": 100004
            },
            "alignTypeDTO": {
                "id": 1000050002,
                "name": "居中对齐",
                "code": "02",
                "enumId": 100005
            },
            "orderModeDTO": {
                "id": 1000060001,
                "name": "升序",
                "code": "01",
                "enumId": 100006
            }
        }, {
            "id": 10000200002,
            "columnId": 100002,
            "fieldName": "name",
            "caption": "名称",
            "idFieldType": 1000040001,
            "width": 200,
            "defPrecision": 0,
            "idAlignType": 1000050002,
            "colIndex": 2,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": true,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040001,
                "name": "字符",
                "code": "string",
                "enumId": 100004
            },
            "alignTypeDTO": {
                "id": 1000050002,
                "name": "居中对齐",
                "code": "02",
                "enumId": 100005
            },
            "orderModeDTO": {
                "id": 1000060001,
                "name": "升序",
                "code": "01",
                "enumId": 100006
            }
        }]
    }
})

fetch.mock('/v1/edf/columnDetail/query', (option) => {
    initEnum()
    return mockData.enumTypes
})

fetch.mock('/v1/edf/columnDetail/query', (option) => {
    return query(option)
})

function query(option) {
    initEnum()

    const { pagination, filter } = option

    var data = mockData.enum

    if (filter) {
        if (filter.type) {
            data = data.other.filter(o => {
                return o.type.toString().substr(0, filter.type.toString().length) == filter.type
            })
        }

    }

    var current = pagination.current
    var pageSize = pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current

    var ret = {
        result: true,
        value: {
            pagination: { current, pageSize, total: data.length },
            list: []
        }
    }
    for (let j = start; j < end; j++) {
        if (data[j])
            ret.value.list.push(data[j])
    }

    return ret
}


fetch.mock('/v1/edf/columnDetail/del', (option) => {
    const del = (types) => {
        types.forEach((t, index) => {
            if (t.id == option.id) {
                types.splice(index, 1)
                return true
            } else if (t.children) {
                del(t.children)
            }
        })
    }
    del(mockData.enumTypes)

    return { result: true, value: true }
})


fetch.mock('/v1/edf/enum/del', (option) => {
    option.ids.forEach(id => {
        let index = mockData.enum.findIndex(o => o.id == id)
        
        if (index || index === 0)
            mockData.enum.splice(index, 1)
    })

    return { result: true, value: true }
})

fetch.mock('/v1/edf/enum/create', option => {
    const result = {
        id: 1 + parseInt(data[data.length-1].id),
        name: option.name,
        code: option.code,
        data: []
    }
    data.push(result)
    return {
        result: true, 
        value: {
            tree: data,
            list: result.data,
            pagination: {
                pageSize: 20,
                currentPage: 1,
                totalPage: 1,
                totalCount: result.length
            }
        }
    }
})

fetch.mock('/v1/edf/enum/findById', (id) => {
    const node = data.find(item => item.id == id)
    return { result: true, value: JSON.parse(JSON.stringify(node)) }
})

fetch.mock('/v1/edf/enum/update', (option) => {
    const node = data.findIndex(item => item.id == option.id)
    data[node].code = option.code
    data[node].name = option.name
    return { result: true, value: JSON.parse(JSON.stringify(data[node])) }
})


fetch.mock('/v1/edf/enum/delete', (option) => {
    const res = data.find(item => item.id == option.id)
    data = data.filter(item => item.id != option.id)
    return { result: true, value: {id: option.id} }
})


// fetch.mock('/v1/edf/enumDetail/create', (option) => {
//     const id = mockData.enumDetail.length
//     const v = { ...option, id }
//     mockData.enumDetail.push(v)
//     return { result: true, value: v }
// })

fetch.mock('/v1/edf/enumDetail/create', (option) => {
    if( option.enumId == '3336424919598080' ){
        option.enumId = 100001
    }
    const item = data.find(o => o.id == option.enumId)
    const res = {
        "id": parseInt(`${item.id}000${1}`)+item.data.length,
        "name": option.name,
        "code": option.code,
        "enumId": option.enumId
    }
    item.data.push(res)
    return { result: true, value: res }
})

fetch.mock('/v1/edf/enumDetail/batchDelete', (option)=> {
    if( option.enumId == '3336424919598080' ){
        option.enumId = 100001
    }
    const index = data.findIndex(item => item.id == option.enumId)
    data[index].data = data[index].data.filter(item => {
        return !option.ids.includes(item.id)
    })
    return {
        result: true
    }
})