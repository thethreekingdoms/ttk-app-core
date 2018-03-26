/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData


function initMockData() {
    if (!mockData.users) {
        mockData.users = [{
            id: 1,
            mobile: 13333333333,
            password: '1',
        }]
    }
}



fetch.mock('/v1/edf/portal/init', (option, headers) => {
    initMockData()
    if (headers && headers.token) {
        // const segments = headers.token.split(',')
        // const [id, mobile, password, nickname, sex, birthday] = segments
        // var user = mockData.users.find(o => o.id == id)
        // //mock简单处理，因为刷新网站，mock数据会丢失，将token中的用户数据加回去
        // if (!user) {
        //     user = { id, mobile, password, nickname: nickname ? nickname : mobile, sex, birthday }
        //     mockData.user.push(user)
        // }
        // else{
        //     user.nickname = user.nickname || user.mobile
        // }
        // return { result: true, value: { user } }
	    return {"result":true,"value":{"user":{"mobile":"13333333333","nickname":"13333333333","personid":4246937157170176,"personname":"13333333333","sex":0,"skin":"#00B38A","lastLoginTime":"2018-03-14 11:34:49"},"org":{"id":4246937076102144,"name":"问问","industry":2000030001,"accountingStandards":2000020002,"enabledYear":"2018","enabledMonth":"03","vatTaxpayer":2000010001},"menu": [{"id":1,"name":"我的桌面","code":"01","appName":"ttk-edf-app-home","iconFont":"zhuomianpeizhi","parentId":0,"showOrder":100,"isVisible":1},{"id":50,"name":"开发","code":"50","appName":"","appProps":"","iconFont":"bianji","parentId":0,"showOrder":900,"isVisible":1},{"id":5010,"name":"预置数据","code":"5010","appName":"","appProps":"","parentId":50,"showOrder":901,"isVisible":1},{"id":5010001,"name":"菜单预置","code":"5010001","appName":"ttk-edf-app-portal-menu","appProps":"","parentId":5010,"showOrder":902,"isVisible":1},{"id":5010002,"name":"操作权限","code":"5010002","appName":"ttk-edf-app-operation","appProps":"","parentId":5010,"showOrder":903,"isVisible":1},{"id":5010003,"name":"角色授权","code":"5010003","appName":"edfx-app-role-auth","appProps":"","parentId":5010,"showOrder":904,"isVisible":1},{"id":5010004,"name":"枚举预置","code":"5010004","appName":"edfx-app-enum","appProps":"","parentId":5010,"showOrder":905,"isVisible":1},{"id":5010005,"name":"栏目预置","code":"5010005","appName":"edfx-app-column","appProps":"","parentId":5010,"showOrder":906,"isVisible":1},{"id":5020,"name":"开发工具","code":"5020","appName":"edfx-app-devtools","appProps":"","parentId":50,"showOrder":907,"isVisible":1}]}}
    }
    else {
        return { result: true, value: {} }
    }
})

fetch.mock('/v1/edf/sysOrg/queryListForOrgManage', ()=>{
	// initMockData()
	// fetch.clearAccessToken()
	return {"result":true,"value":[{"id":4225397757991936,"name":"10","version":1,"ts":"2018-03-16 16:31:00.0","creator":4021346229794816,"industry":2000030001,"accountingStandards":2000020002,"enabledYear":"2018","enabledMonth":"03","vatTaxpayer":2000010001,"isOtherUser":false,"status":1000070003,"createTime":"2018-03-16","lastLoginTime":"2018-03-16","expireTime":"2018-04-15"},{"id":4225426019912704,"name":"1","version":1,"ts":"2018-03-16 16:38:12.0","creator":4021346229794816,"industry":2000030001,"accountingStandards":2000020002,"enabledYear":"2018","enabledMonth":"03","vatTaxpayer":2000010001,"isOtherUser":false,"status":1000070003,"createTime":"2018-03-16","lastLoginTime":"2018-03-20","expireTime":"2018-04-15"},{"id":4246937076102144,"name":"问问","version":1,"ts":"2018-03-20 11:48:47.0","creator":4021346229794816,"industry":2000030001,"accountingStandards":2000020002,"enabledYear":"2018","enabledMonth":"03","vatTaxpayer":2000010001,"isOtherUser":false,"status":1000070003,"createTime":"2018-03-20","lastLoginTime":"2018-03-21","expireTime":"2018-04-19"}]}
})


fetch.mock('/v1/edf/user/logout', ()=>{
    initMockData()
    fetch.clearAccessToken()
    return {result: true, value: true}
})
