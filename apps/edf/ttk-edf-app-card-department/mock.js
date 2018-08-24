/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData


fetch.mock('/v1/edf/enumDetail/findByEnumId', (option) => {
    return {"result":true,"value":[{"id":3000010001,"name":"其它（含管理）","code":"otherAndManage","enumId":300001},{"id":3000010002,"name":"生产相关","code":"productionRelated","enumId":300001},{"id":3000010003,"name":"销售相关","code":"saleRelated","enumId":300001},{"id":3000010004,"name":"采购相关","code":"purchaseRelated","enumId":300001},{"id":3000010005,"name":"研发相关","code":"developRelated","enumId":300001},{"id":3000010006,"name":"加工修理相关","code":"repairRelated","enumId":300001},{"id":3000010007,"name":"技术咨询服务相关","code":"techConsultationRelated","enumId":300001}]}
})

fetch.mock('/v1/ba/department/create', (option) => {
	let id = mockData.department.id, isEndNode = true
	const v = {...option, id, isEndNode}
	mockData.department.list.push(v)
	mockData.department.list.forEach((data, index) => {
		mockData.department.list.forEach((rData, rIndex) => {
			if(data.id == rData.pid){
				mockData.department.list[index].isEndNode = false
			}
		})
	})
	mockData.department.id++
	return {result: true, value: v}
})

fetch.mock('/v1/ba/department/query', (option) => {
	let department = mockData.department.list, v
	department.forEach((data) => {
		if (option.id == data.id) {
			v = data
		}
	})
	return {result: true, value: v}
})

fetch.mock('/v1/ba/department/update', (option) => {
	let department = mockData.department.list, v
	department.forEach((data, index) => {
		if (option.id == data.id) {
			v = index
		}
	})
	department[v] = option
	return {result: true, value: option}
})
