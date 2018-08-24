/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData


let db =  [{
    "orgId": 4372210492535808,
    "id": 4399213289610240,
    "code": "发顺丰",
    "name": "sdf",
    "isDefault": false,
    "userId": 4372210486703104,
    "ts": "2018-04-16 09:14:32.0",
    "createTime": "2018-04-16 09:14:33",
    "updateTime": "2018-04-16 09:14:33"
}, {
    "orgId": 4372210492535808,
    "id": 4399214198660096,
    "code": "防守打法",
    "name": "防守打法",
    "isDefault": false,
    "userId": 4372210486703104,
    "ts": "2018-04-16 09:14:46.0",
    "createTime": "2018-04-16 09:14:47",
    "updateTime": "2018-04-16 09:14:47"
}, {
    "orgId": 4372210492535808,
    "id": 4404845132653568,
    "code": "发送到发",
    "name": "发达",
    "isDefault": true,
    "userId": 4372210486703104,
    "ts": "2018-04-17 09:06:48.0",
    "createTime": "2018-04-17 09:06:48",
    "updateTime": "2018-04-17 09:06:48"
}]

 fetch.mock('/v1/edf/columnDetail/init', (option) => {
     console.log(option)
     const id = option.filter.columnId
     const data = db.find(item => item.id == id)
     let list = data && data.data ? data.data : []
     return {
        result: true,
        value: {
            list: list,
            tree: db,
            pagination: {
                currentPage: 1,
                pageSize: 20,
                totalCount: 0,
                totalPage: 1
            }
        }
     }
 })

fetch.mock('/v1/edf/column/query', (option) => {
    return {
        "result": true,
        "value": [{
            "orgId": 4372210492535808,
            "id": 4404845132653568,
            "code": "发送到发",
            "name": "发达",
            "isDefault": true,
            "userId": 4372210486703104,
            "ts": "2018-04-17 09:06:48.0",
            "createTime": "2018-04-17 09:06:48",
            "updateTime": "2018-04-17 09:06:48"
        }]
    }
})

function query(option) {
    initColumn()

    const { pagination, filter } = option

    var data = mockData.column

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


fetch.mock('/v1/edf/column/create', (option) => {
    console.log(option)
    const res = {
        "orgId": 4372210492535808,
        "id": parseInt(Math.random()*10000000000000000),
        "code": option.code,
        "name": option.name,
        "isDefault": option.isDefault == 0 ? false : true,
        "userId": 4372210486703104,
        "ts": "2018-04-17 09:06:48.0",
        "createTime": "2018-04-17 09:06:48",
        "updateTime": "2018-04-17 09:06:48"
    }
    db.push(res)
    return { result: true, value: res }
})

fetch.mock('/v1/edf/column/findById', (id) => {
    const node = db.find(item => item.id == id)
    return { result: true, value: node }
})

fetch.mock('/v1/edf/column/delete', (option) => {
    db = db.filter(item => item.id != option.id)
    return {
        result: true, value: {}
    }
})


fetch.mock('/v1/edf/column/update', (option) => {
    console.log(option)
    const index = db.findIndex(item => item.id == option.id)
    db[index] = {
        ...db[index],
        name: option.name,
        code: option.code,
        isDefault: option.isDefault == 1 ? true : false
    }
    return { result: true, value: {} }
})

fetch.mock('/v1/edf/columnType/del', (option) => {
    console.log(option)
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
    del(mockData.columnTypes)

    return { result: true, value: true }
})


fetch.mock('/v1/edf/column/del', (option) => {
    option.ids.forEach(id => {
        let index = mockData.column.findIndex(o => o.id == id)
        
        if (index || index === 0)
            mockData.column.splice(index, 1)
    })

    return { result: true, value: true }
})

fetch.mock('/v1/edf/columnDetail/create', ({form, typeId}) => {
    const index = db.findIndex(item => item.id == typeId)
    if( !db[index].data ){
        db[index].data = []
    }
    db[index].data.push({...form, id: Math.floor(Math.random()*100000000000000)})
    return { result: true, value: {} }
})

fetch.mock('/v1/edf/columnDetail/batchDelete', ({ids, type}) => {
    const index = db.findIndex(item => item.id == type)
    console.log(index)
    if( !db[index].data ) db[index].data =[]
    const data = db[index].data.filter(item => !ids.includes(item.id))
    console.log(data)
    db[index].data = data
    return {
        result: true,
        value: {}
    }
})

fetch.mock('/v1/edf/columnDetail/batchUpdate', (option) => {
    console.log(option)
    return {
        result: true,
        value: {}
    }
})

fetch.mock('/v1/edf/enumDetail/query', (option)=>{
    return {
        result: true,
        value: [{
            id: 1,
            name: '111'
        }, {
            id: 2,
            name: '222'
        }, {
            id: 3,
            name: '333'
        }, {
            id: 4,
            name: '444'
        }]
    }
})

fetch.mock('/v1/edf/columnDetail/findByColumnCode2', (option) => {
    return {
        "result": true,
        "value": [{
            "id": 10000400001,
            "columnId": 100004,
            "fieldName": "fieldName",
            "caption": "字段名称",
            "idFieldType": 1000040001,
            "width": 100,
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
            "id": 10000400002,
            "columnId": 100004,
            "fieldName": "caption",
            "caption": "字段标题",
            "idFieldType": 1000040001,
            "width": 90,
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
        }, {
            "id": 10000400003,
            "columnId": 100004,
            "fieldName": "idFieldType",
            "caption": "字段类型",
            "idFieldType": 1000040005,
            "width": 70,
            "idAlignType": 1000050002,
            "colIndex": 3,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040005,
                "name": "枚举",
                "code": "enum",
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
            "id": 10000400004,
            "columnId": 100004,
            "fieldName": "width",
            "caption": "宽度",
            "idFieldType": 1000040002,
            "width": 50,
            "defPrecision": 0,
            "idAlignType": 1000050002,
            "colIndex": 4,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040002,
                "name": "数值",
                "code": "decimal",
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
            "id": 10000400005,
            "columnId": 100004,
            "fieldName": "defPrecision",
            "caption": "默认精度",
            "idFieldType": 1000040002,
            "width": 50,
            "defPrecision": 0,
            "idAlignType": 1000050002,
            "colIndex": 5,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040002,
                "name": "数值",
                "code": "decimal",
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
            "id": 10000400006,
            "columnId": 100004,
            "fieldName": "idAlignType",
            "caption": "对齐方式",
            "idFieldType": 1000040005,
            "width": 70,
            "idAlignType": 1000050002,
            "colIndex": 6,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040005,
                "name": "枚举",
                "code": "enum",
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
            "id": 10000400007,
            "columnId": 100004,
            "fieldName": "colIndex",
            "caption": "显示顺序",
            "idFieldType": 1000040002,
            "width": 50,
            "defPrecision": 0,
            "idAlignType": 1000050002,
            "colIndex": 7,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040002,
                "name": "数值",
                "code": "decimal",
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
            "id": 10000400008,
            "columnId": 100004,
            "fieldName": "idOrderMode",
            "caption": "排序方式",
            "idFieldType": 1000040005,
            "width": 70,
            "idAlignType": 1000050002,
            "colIndex": 8,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040005,
                "name": "枚举",
                "code": "enum",
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
            "id": 10000400009,
            "columnId": 100004,
            "fieldName": "isFixed",
            "caption": "是否固定列",
            "idFieldType": 1000040004,
            "width": 50,
            "idAlignType": 1000050002,
            "colIndex": 9,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040004,
                "name": "布尔",
                "code": "boolean",
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
            "id": 10000400010,
            "columnId": 100004,
            "fieldName": "isVisible",
            "caption": "是否显示",
            "idFieldType": 1000040004,
            "width": 50,
            "idAlignType": 1000050002,
            "colIndex": 10,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040004,
                "name": "布尔",
                "code": "boolean",
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
            "id": 10000400011,
            "columnId": 100004,
            "fieldName": "isMustSelect",
            "caption": "是否必选",
            "idFieldType": 1000040004,
            "width": 50,
            "idAlignType": 1000050002,
            "colIndex": 11,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040004,
                "name": "布尔",
                "code": "boolean",
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
            "id": 10000400012,
            "columnId": 100004,
            "fieldName": "isSystem",
            "caption": "是否系统字段",
            "idFieldType": 1000040004,
            "width": 70,
            "idAlignType": 1000050002,
            "colIndex": 12,
            "idOrderMode": 1000060001,
            "isFixed": false,
            "isVisible": true,
            "isMustSelect": false,
            "isSystem": false,
            "isHeader": false,
            "isTotalColumn": false,
            "fieldTypeDTO": {
                "id": 1000040004,
                "name": "布尔",
                "code": "boolean",
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