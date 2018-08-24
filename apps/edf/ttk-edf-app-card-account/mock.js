/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import {fetch} from 'edf-utils'

const mockData = fetch.mockData


fetch.mock('/v1/ba/basearchive/getAutoCode', (option) => {
	if (option.archiveName == 'ba_customer') {
		let customer = mockData.customer.id + ''
		if (customer.length == 1) {
			customer = '00' + customer
		} else if (customer.length == 2) {
			customer = '0' + customer
		} else if (customer.length == 3) {
			customer = customer
		}
		mockData.customer.id++
		return {
			result: true,
			value: customer
		}
	} else if (option.archiveName == "ba_currency") {
		let currency = mockData.currency.id + ''
		if (currency.length == 1) {
			currency = 'HKD00' + currency
		} else if (currency.length == 2) {
			currency = 'HKD0' + currency
		} else if (currency.length == 3) {
			currency = 'HKD' + currency
		}
		mockData.currency.id++
		return {
			result: true,
			value: currency
		}
	} else if (option.archiveName == 'ba_supplier') {
		let supplier = mockData.supplier.id + ''
		if (supplier.length == 1) {
			supplier = '00' + supplier
		} else if (supplier.length == 2) {
			supplier = '0' + supplier
		} else if (supplier.length == 3) {
			supplier = supplier
		}
		mockData.supplier.id++
		return {
			result: true,
			value: supplier
		}
	} else if (option.archiveName == 'ba_project') {
		let project = mockData.project.id + ''
		if (project.length == 1) {
			project = '00' + project
		} else if (project.length == 2) {
			project = '0' + project
		} else if (project.length == 3) {
			project = project
		}
		mockData.project.id++
		return {
			result: true,
			value: project
		}
	} else if (option.archiveName == 'ba_bank_account') {
		let account = mockData.account.id + ''
		if (account.length == 1) {
			account = '00' + account
		} else if (account.length == 2) {
			account = '0' + account
		} else if (account.length == 3) {
			account = account
		}
		mockData.account.id++
		return {
			result: true,
			value: account
		}
	} else if (option.archiveName == 'ba_inventory') {
		let inventory = mockData.inventory.id + ''
		if (inventory.length == 1) {
			inventory = '000' + inventory
		} else if (inventory.length == 2) {
			inventory = '00' + inventory
		} else if (inventory.length == 3) {
			inventory = '0' + inventory
		} else if (inventory.length == 4) {
			inventory = inventory
		}
		mockData.inventory.id++
		return {
			result: true,
			value: inventory
		}
	}else if (option.archiveName == 'ba_unit') {
		let unit = mockData.unit.id + ''
		if (unit.length == 1) {
			unit = '00' + unit
		} else if (unit.length == 2) {
			unit = '0' + unit
		} else if (unit.length == 3) {
			unit = unit
		}
		mockData.unit.id++
		return {
			result: true,
			value: unit
		}
	}
})

fetch.mock('/v1/ba/bankAccount/create', (option) => {
	const id = option.code
	const arr = [{"id": 3000050002, "name": "银行", "code": "bank", "enumId": 300005}, {"id": 3000050003, "name": "微信", "code": "wechat", "enumId": 300005}, {"id": 3000050004, "name": "支付宝", "code": "alipay", "enumId": 300005}]
	arr.forEach((data) => {
		if(data.id == option.bankAccountTypeId){
			option.bankAccountTypeName = data.name
		}
	})
	const v = {...option, id}
	mockData.account.list.push(v)
	return {result: true, value: v}
})

fetch.mock('/v1/ba/bankAccount/query', (option) => {
	let account = mockData.account.list, v
	account.forEach((data) => {
		if (option.id == data.id) {
			v = data
		}
	})
	return {result: true, value: v}
})

fetch.mock('/v1/ba/bankAccount/update', (option) => {
	let account = mockData.account.list, v
	account.forEach((data, index) => {
		if (option.id == data.id) {
			v = index
		}
	})
	const arr = [{"id": 3000050002, "name": "银行", "code": "bank", "enumId": 300005}, {"id": 3000050003, "name": "微信", "code": "wechat", "enumId": 300005}, {"id": 3000050004, "name": "支付宝", "code": "alipay", "enumId": 300005}]
	arr.forEach((data) => {
		if(data.id == option.bankAccountTypeId){
			option.bankAccountTypeName = data.name
		}
	})
	account[v] = option
	return {result: true, value: option}
})

fetch.mock('/v1/ba/bankAccount/queryBankAccountType', (option) => {
	return {
		"result": true,
		"value": [
			{
				"id": 3000050002,
				"name": "银行",
				"code": "bank",
				"enumId": 300005
			}, {
				"id": 3000050003,
				"name": "微信",
				"code": "wechat",
				"enumId": 300005
			},
			{
				"id": 3000050004,
				"name": "支付宝",
				"code": "alipay",
				"enumId": 300005
			}]
	}
})

fetch.mock('/v1/gl/mec/haveMonthlyClosing', (option) => {
	return {"result":true,"value":false}
})
