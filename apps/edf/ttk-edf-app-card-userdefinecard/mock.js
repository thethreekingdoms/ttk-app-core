/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'

const mockData = fetch.mockData

fetch.mock('/v1/ba/userdefinearchive/getAutoCode', (option) => {
	if (option.archiveName == "ba_userdefinearchive_data") {
		let i, arr = !!mockData.userdefinecard && mockData.userdefinecard.listData.forEach((data,index) => {if(data.archiveId == option.userDefineArchiveId){ i =index}})
		let userdefinecard = mockData.userdefinecard.listData[i].id + ''
		if (userdefinecard.length == 1) {
			userdefinecard = '00' + userdefinecard
		} else if (userdefinecard.length == 2) {
			userdefinecard = '0' + userdefinecard
		} else if (userdefinecard.length == 3) {
			userdefinecard = userdefinecard
		}
		mockData.userdefinecard.listData[i].id++
		return {
			result: true,
			value: userdefinecard
		}
	}
})

fetch.mock('/v1/ba/userdefinearchive/create', (option) => {
	const id = mockData.userdefinecard.id
	const v = {...option, id}
	mockData.userdefinecard.list.push(v)
	mockData.userdefinecard.listData.push({archiveId:v.id,id:1,list:[]})
	mockData.userdefinecard.id++
	return {result: true, value: v}
})

fetch.mock('/v1/ba/userdefinearchive/createData', (option) => {
	const id = option.code
	const v = {...option, id}
	mockData.userdefinecard.listData.forEach((data) => {
		if(data.archiveId == option.archiveId){
			data.list.push(v)
		}
	})
	return {result: true, value: v}
})

fetch.mock('/v1/ba/userdefinearchive/queryData', (option) => {
	let userdefinecard = mockData.userdefinecard.listData, value,retValue
	userdefinecard.forEach((data) => {
		if (option.parentId == data.archiveId) {
			value = data.list
		}
	})
	if(value){
		value.forEach((data) => {
			if (option.id == data.id) {
				retValue = data
			}
		})
	}
	return {result: true, value: retValue}
})

fetch.mock('/v1/ba/userdefinearchive/updateData', (option) => {
	let userdefinecard = mockData.userdefinecard.listData, value,retValue,idx
	userdefinecard.forEach((data) => {
		if (option.archiveId == data.archiveId) {
			value = data.list
		}
	})
	if(value){
		value.forEach((data, index) => {
			if (option.id == data.id) {
				idx = index
			}
		})
	}
	value[idx] = option
	return {result: true, value: option}
})
