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
	    return {"result":true,"value":{"user":{"mobile":"13333333333","nickname":"13333333333","personid":4246937157170176,"personname":"13333333333","sex":0,"skin":"#00B38A","lastLoginTime":"2018-03-14 11:34:49"},"org":{"id":4246937076102144,"name":"问问","industry":2000030001,"accountingStandards":2000020002,"enabledYear":"2018","enabledMonth":"03","vatTaxpayer":2000010001},"menu":[{"id":1,"name":"我的桌面","code":"01","appName":"ttk-edf-app-home","iconFont":"zhuomianpeizhi","parentId":0,"showOrder":100,"isVisible":1},{"id":15,"name":"财务","code":"15","iconFont":"caiwu","parentId":0,"showOrder":301,"isVisible":1},{"id":1510,"name":"凭证","code":"1510","appName":"","parentId":15,"showOrder":302,"isVisible":1},{"id":15100001,"name":"填制凭证","code":"1510001","appName":"app-proof-of-charge","parentId":1510,"showOrder":303,"isVisible":1},{"id":15100002,"name":"凭证管理","code":"1510002","appName":"app-proof-of-list","parentId":1510,"showOrder":304,"isVisible":1},{"id":15100003,"name":"凭证汇总表","code":"1510003","appName":"app-proof-of-collect-rpt","parentId":1510,"showOrder":305,"isVisible":1},{"id":1520,"name":"账簿","code":"1520","parentId":15,"showOrder":306,"isVisible":1},{"id":1520001,"name":"总账","code":"1520001","appName":"app-sumaccount-rpt","parentId":1520,"showOrder":307,"isVisible":1},{"id":1520002,"name":"明细账","code":"1520002","appName":"app-detailaccount-rpt","parentId":1520,"showOrder":308,"isVisible":1},{"id":1520003,"name":"余额表","code":"1520003","appName":"app-balancesum-rpt","parentId":1520,"showOrder":309,"isVisible":1},{"id":1520004,"name":"辅助总账","code":"1520004","appName":"app-auxsumaccount-rpt","parentId":1520,"showOrder":310,"isVisible":1},{"id":1520005,"name":"辅助明细账","code":"1520005","appName":"app-auxdetailaccount-rpt","parentId":1520,"showOrder":311,"isVisible":1},{"id":1520006,"name":"辅助余额表","code":"1520006","appName":"app-auxbalancesum-rpt","parentId":1520,"showOrder":312,"isVisible":1},{"id":17,"name":"资产","code":"17","iconFont":"zichan","parentId":0,"showOrder":400,"isVisible":1},{"id":1710,"name":"资产","code":"1710","appName":"","parentId":17,"showOrder":401,"isVisible":1},{"id":17100001,"name":"资产卡片","code":"1710001","appName":"app-asset-list","parentId":1710,"showOrder":402,"isVisible":1},{"id":17100002,"name":"资产统计表","code":"1710002","appName":"app-asset-statrpt","parentId":1710,"showOrder":403,"isVisible":1},{"id":17100003,"name":"资产明细表","code":"1710003","appName":"app-asset-detailrpt","parentId":1710,"showOrder":404,"isVisible":1},{"id":20,"name":"结账","code":"20","iconFont":"jiezhang","parentId":0,"showOrder":500,"isVisible":1},{"id":2020,"name":"月末结账","code":"2020","appName":"app-account-monthaccount","parentId":20,"showOrder":501,"isVisible":1},{"id":35,"name":"报表","code":"35","iconFont":"baobiao","parentId":0,"showOrder":600,"isVisible":1},{"id":3510,"name":"财务报表","code":"3510","parentId":35,"showOrder":601,"isVisible":1},{"id":3510001,"name":"资产负债表","code":"3510001","appName":"app-balancesheet-rpt","parentId":3510,"showOrder":602,"isVisible":1},{"id":3510002,"name":"利润表","code":"3510002","appName":"app-profitstatement-rpt","parentId":3510,"showOrder":603,"isVisible":1},{"id":3510003,"name":"现金流量表","code":"3510003","appName":"app-cashflowstatement-rpt","parentId":3510,"showOrder":604,"isVisible":1},{"id":40,"name":"设置","code":"40","iconFont":"shezhi","parentId":0,"showOrder":700,"isVisible":1},{"id":4010,"name":"基础设置","code":"4010","appName":"","parentId":40,"showOrder":701,"isVisible":1},{"id":4010001,"name":"部门人员","code":"4010001","appName":"app-list-department-personnel","parentId":4010,"showOrder":702,"isVisible":1},{"id":4010002,"name":"客户","code":"4010002","appName":"app-list-customer","parentId":4010,"showOrder":703,"isVisible":1},{"id":4010003,"name":"供应商","code":"4010003","appName":"app-list-supplier","parentId":4010,"showOrder":704,"isVisible":1},{"id":4010004,"name":"项目","code":"4010004","appName":"app-list-project","parentId":4010,"showOrder":705,"isVisible":1},{"id":4010005,"name":"存货及服务","code":"4010005","appName":"app-list-inventory","parentId":4010,"showOrder":706,"isVisible":1},{"id":4010006,"name":"账户","code":"4010006","appName":"app-list-account","parentId":4010,"showOrder":707,"isVisible":1},{"id":4010007,"name":"币种","code":"4010007","appName":"app-list-currency","parentId":4010,"showOrder":708,"isVisible":1},{"id":4010008,"name":"自定义档案","code":"4010008","appName":"app-list-userdefinecard","parentId":4010,"showOrder":709,"isVisible":1},{"id":4020,"name":"科目期初","code":"4020","appName":"app-account-subjects","parentId":40,"showOrder":710,"isVisible":1},{"id":4020001,"name":"科目","code":"4020001","appName":"app-account-subjects","parentId":4020,"showOrder":712,"isVisible":1},{"id":4020002,"name":"期初余额","code":"4020002","appName":"app-account-beginbalance","parentId":4020,"showOrder":713,"isVisible":1},{"id":4030,"name":"企业信息","code":"4030","appName":"edfx-app-org","parentId":40,"showOrder":714,"isVisible":1}]}}
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
