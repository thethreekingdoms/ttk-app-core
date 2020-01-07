/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import {fetch} from 'edf-utils'

const mockData = fetch.mockData

/*
fetch.mock('/v1/person/query', (option) => {
    return {result:true, value:{}}
})
*/

fetch.mock('v1/edf/sysOrg/queryListForOrgManage', (option) => {
    console.log(option)

    return {
        "result": true,
        "value": [{
			"id": 4225397757991936,
			"name": "10",
			"version": 1,
			"ts": "2018-03-16 16:31:00.0",
			"creator": 4021346229794816,
			"industry": 2000030001,
			"accountingStandards": 2000020002,
			"enabledYear": "2018",
			"enabledMonth": "03",
			"vatTaxpayer": 2000010001,
			"isOtherUser": false,
			"status": 1000070003,
			"createTime": "2018-03-16",
			"lastLoginTime": "2018-03-16",
			"expireTime": "2018-04-15"
		}, {
			"id": 4225426019912704,
			"name": "1",
			"version": 1,
			"ts": "2018-03-16 16:38:12.0",
			"creator": 4021346229794816,
			"industry": 2000030001,
			"accountingStandards": 2000020002,
			"enabledYear": "2018",
			"enabledMonth": "03",
			"vatTaxpayer": 2000010001,
			"isOtherUser": false,
			"status": 1000070003,
			"createTime": "2018-03-16",
			"lastLoginTime": "2018-03-20",
			"expireTime": "2018-04-15"
		}, {
			"id": 4246937076102144,
			"name": "问问",
			"version": 1,
			"ts": "2018-03-20 11:48:47.0",
			"creator": 4021346229794816,
			"industry": 2000030001,
			"accountingStandards": 2000020002,
			"enabledYear": "2018",
			"enabledMonth": "03",
			"vatTaxpayer": 2000010001,
			"isOtherUser": false,
			"status": 1000070003,
			"createTime": "2018-03-20",
			"lastLoginTime": "2018-03-21",
			"expireTime": "2018-04-19"
		}]
    }
})