/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

// import { fetch } from 'edf-utils'

import './server/service'

// const mockData = fetch.mockData

// function initMockData() {
//     if (!mockData.users) {
//         mockData.users = [{
//             id: 1,
//             mobile: 13334445556,
//             password: '1'
//         }]
//     }
// }

// fetch.mock('/v1/edf/user/create', (option) => {
//     initMockData()

//     if (option.captcha != '123456') {
//         return { result: false, error: { message: '验证码错误，请重新获取验证码录入' } }
//     }

//     const id = mockData.users.length + 1
//     const v = { ...option, id }
//     mockData.users.push(v)

//     return { result: true, value: v }
// })

// fetch.mock('/v1/edf/user/existsMobile', (mobile) => {
//     initMockData()
//     return { result: true, value: mockData.users.findIndex(o => o.mobile == mobile) != -1 }

// })

// fetch.mock('/v1/edf/captcha/fetch', (option) => {
//     return { result: true, value: '123456' }
// })

