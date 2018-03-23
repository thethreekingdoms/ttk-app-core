/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'
import create from './mockLogic/create'
import update from './mockLogic/update'
import { findById } from '../../resData/db'

const mockData = fetch.mockData

let apiValue = value => ({ result: true, value })
let mock = {
    role: {
        create: (role) => {
            role.id = Math.random()
            mockData.role.push(role)
            return apiValue(role)
        },
        update: (role) => {
            let theRole = mockData.role.find(r => r.id == role.id)
            if (theRole) {
                Object.assign(theRole, role)
            }
            return apiValue(theRole)
        },
        findById: (option)=>{
            const reslut = findById(option)
            if( reslut ){
                return {
                    result: true,
                    value: reslut
                }
            }else{
                return {
                    result: true,
                    value: {}
                }
            }
        },
    }
}


fetch.mock('/v1/edf/role/create', create)
fetch.mock('/v1/edf/role/update', update)
fetch.mock('/v1/edf/role/findById', mock.role.findById)