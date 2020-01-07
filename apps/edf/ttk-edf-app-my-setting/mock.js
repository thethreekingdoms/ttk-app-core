// /**
//  * mock.js 提供应用截获ajax请求，为脱离后台测试使用
//  * 模拟查询更改内存中mockData,并返回数据
//  */

import { fetch, password } from 'edf-utils'
import './server/service'
// const mockData = fetch.mockData

// function initMockData() {
//     if (!mockData.users) {
//         mockData.users = [{
//             id: 1,
//             mobile: 13334445556,
//             password: '1',
//         }]
//     }
// }

// fetch.mock('/v1/edf/mySetting/init', (userId) => {
//     initMockData()
//     const user = mockData.users.find(o => o.id == userId)
//     const securityLevel = password.analyzeSecurityLevel(user.password)
//     return { result: true, value: {user, securityLevel} }
// })

fetch.mock('/v1/edf/mySetting/init', (option) => {
    // initMockData()
    // var user = mockData.users.find(o => o.id == option.id)
    // user.nickname = option.nickname
    // user.sex = option.sex
    // user.birthday = option.birthday
    return {"result":true,"value":{"user":{"id":4281915936466944,"mobile":"13333333333","nickname":"13333333333","password":"2099bd2cbb04bc3997dc33b2104536282d42066dacae1c74e411fc9ddc41c05e","sex":0,"skin":"#00B38A","passwordStrength":1,"lastLoginTime":"2018-03-26 16:05:11"}}}
})
