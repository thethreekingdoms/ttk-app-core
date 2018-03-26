/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */
// import config from './server/service'
import { fetch } from 'edf-utils'
import initData from './resData/init'
import query from './resData/query'
import save from './resData/save'
import deleteFunc from './resData/delete'

const mockData = fetch.mockData


fetch.mock('/v1/edf/role/init',(option)=>{
    return initData()
})

fetch.mock('/v1/edf/roleMenuOperation/query',(option)=>{
    return query(option)
})

fetch.mock('/v1/edf/roleMenuOperation/save', (option)=>{
    return save(option)
})

fetch.mock('/v1/edf/role/delete', (option)=>{
    return deleteFunc(option)
})


