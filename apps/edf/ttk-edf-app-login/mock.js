/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'
import md5 from 'md5'
// import './server/service'

const mockData = fetch.mockData

function initMockData() {
    if (!mockData.users) {
        mockData.users = [{
            id: 1,
            mobile: 13333333333,
            password: md5('1*thethreekingdoms*'),
        }]
    }
}

fetch.mock('/v1/edf/user/login', (option) => {
    initMockData()
    debugger
    const user = mockData.users.find(o => o.mobile == option.mobile && o.password == option.password)

    if (user) {
        return { "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJbNDAyMTM0NjIyOTc5NDgxNiw0MjQ2OTM3MDc2MTAyMTQ0LDEsbnVsbCxudWxsXSIsImV4cCI6MTUyMjA0ODk2NiwiaWF0IjoxNTIxNjE2OTY2fQ.pcLEVmGalxkOJt-dDTq1lPVzsStQAfjmOYPKTJGknP168yTh57BbkN6tQaLYArxk9Lk9zSZPTmREs18UTgKOWg", "result": true, "value": { "mobile": "13333333333", "nickname": "13333333333", "password": "b6b11c18e6b4b9f2b328b1b0f788c847", "skin": "#1EB5AD", "token": { "userId": 4021346229794816, "orgId": 4246937076102144, "versionId": 1 } } }
    }
    else {
        return { result: false, error: { message: '请输入正确的用户名密码（系统内置用户user:13333333333,pwd:1）' } }
    }
})

fetch.mock('/v1/edf/user/existsMobile', (option) => {
    initMockData()
    const user = mockData.users.find(o => o.mobile == option.mobile)
    if (user) {
        return {
            result: true,
            value: true
        }
    }
    else {
        return { result: true, value: false }
    }
})
