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

fetch.mock('/v1/ba/inventory/create', (option) => {
	const id = option.code
	const v = {...option, id}
	mockData.inventory.list.push(v)
	return {result: true, value: v}
})

fetch.mock('/v1/ba/inventory/query', (option) => {
	let inventory = mockData.inventory.list, v
	inventory.forEach((data) => {
		if (option.id == data.id) {
			v = data
		}
	})
	return {result: true, value: v}
})

fetch.mock('/v1/ba/inventory/update', (option) => {
	let inventory = mockData.inventory.list, v
	inventory.forEach((data, index) => {
		if (option.id == data.id) {
			v = index
		}
	})
	inventory[v] = option
	return {result: true, value: option}
})

fetch.mock('/v1/ba/inventory/findEnumList', (option) => {
	return {
		"result": true,
		"value": {
			"detailList": [{
				"id": 36,
				"propertyId": 5,
				"orgId": null,
				"name": "机器设备",
				"rate": 0,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 37,
				"propertyId": 5,
				"orgId": null,
				"name": "办公家具",
				"rate": 0,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 38,
				"propertyId": 5,
				"orgId": null,
				"name": "运输工具",
				"rate": 0,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 39,
				"propertyId": 5,
				"orgId": null,
				"name": "电子设备",
				"rate": 0,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 1,
				"propertyId": 7,
				"orgId": null,
				"name": "交通运输服务",
				"rate": 11,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 51,
				"propertyId": 7,
				"orgId": null,
				"name": "邮政服务",
				"rate": 11,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 52,
				"propertyId": 7,
				"orgId": null,
				"name": "基础电信服务",
				"rate": 11,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 53,
				"propertyId": 7,
				"orgId": null,
				"name": "增值电信服务",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 29,
				"propertyId": 7,
				"orgId": null,
				"name": "信息技术服务",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 3,
				"propertyId": 7,
				"orgId": null,
				"name": "建筑服务",
				"rate": 11,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 4,
				"propertyId": 7,
				"orgId": null,
				"name": "金融服务",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 6,
				"propertyId": 7,
				"orgId": null,
				"name": "生活服务",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 7,
				"propertyId": 7,
				"orgId": null,
				"name": "有形动产租赁服务",
				"rate": 17,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 8,
				"propertyId": 7,
				"orgId": null,
				"name": "不动产租赁服务",
				"rate": 11,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 9,
				"propertyId": 7,
				"orgId": null,
				"name": "其他服务",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 19,
				"propertyId": 8,
				"orgId": null,
				"name": "土地使用权",
				"rate": 11,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 20,
				"propertyId": 8,
				"orgId": null,
				"name": "专利权",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 21,
				"propertyId": 8,
				"orgId": null,
				"name": "商标权",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 22,
				"propertyId": 8,
				"orgId": null,
				"name": "著作权",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 23,
				"propertyId": 8,
				"orgId": null,
				"name": "非专利技术",
				"rate": 6,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 59,
				"propertyId": 8,
				"orgId": null,
				"name": "特许权使用费",
				"rate": 3,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 60,
				"propertyId": 8,
				"orgId": null,
				"name": "其他",
				"rate": 3,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}, {
				"id": 35,
				"propertyId": 9,
				"orgId": null,
				"name": "房屋建筑物",
				"rate": 0,
				"templateId": null,
				"sorting": null,
				"assetTypeId": null,
				"usedLifeYear": null,
				"salvageRate": null,
				"beginDepreciationMonth": null,
				"property": null,
				"level2Code": null,
				"ts": null
			}],
			"unitList": [{
				"id": 1,
				"code": "001",
				"name": "个",
				"helpCode": "G",
				"ts": "2018-04-09 15:51:00.0"
			}, {"id": 2, "code": "002", "name": "台", "helpCode": "T", "ts": "2018-04-09 15:51:00.0"}, {
				"id": 3,
				"code": "003",
				"name": "件",
				"helpCode": "J",
				"ts": "2018-04-09 15:51:00.0"
			}, {"id": 4, "code": "004", "name": "只", "helpCode": "Z", "ts": "2018-04-09 15:51:00.0"}, {
				"id": 5,
				"code": "005",
				"name": "根",
				"helpCode": "G",
				"ts": "2018-04-09 15:51:00.0"
			}, {"id": 6, "code": "M", "name": "米", "helpCode": "M", "ts": "2018-04-09 15:51:00.0"}, {
				"id": 7,
				"code": "G",
				"name": "克",
				"helpCode": "K",
				"ts": "2018-04-09 15:51:00.0"
			}, {"id": 8, "code": "Kg", "name": "千克", "helpCode": "QK", "ts": "2018-04-09 15:51:00.0"}, {
				"id": 9,
				"code": "T",
				"name": "吨",
				"helpCode": "D",
				"ts": "2018-04-09 15:51:00.0"
			}],
			"rateList": [{
				"taxRate": 0.03,
				"privilegeTaxRate": 0.01,
				"type": 3000070002,
				"id": 2,
				"name": "3%减按2%",
				"ts": "2018-04-09 15:51:00.0"
			}, {
				"taxRate": 0.03,
				"privilegeTaxRate": 0,
				"type": 3000070002,
				"id": 3,
				"name": "3%",
				"ts": "2018-04-09 15:51:00.0"
			}, {
				"taxRate": 0.05,
				"privilegeTaxRate": 0,
				"type": 3000070002,
				"id": 5,
				"name": "5%",
				"ts": "2018-04-09 15:51:00.0"
			}, {
				"taxRate": 0.06,
				"privilegeTaxRate": 0,
				"type": 3000070001,
				"id": 6,
				"name": "6%",
				"ts": "2018-04-09 15:51:00.0"
			}, {
				"taxRate": 0.11,
				"privilegeTaxRate": 0,
				"type": 3000070001,
				"id": 11,
				"name": "11%",
				"ts": "2018-04-09 15:51:00.0"
			}, {
				"taxRate": 0.17,
				"privilegeTaxRate": 0,
				"type": 3000070001,
				"id": 17,
				"name": "17%",
				"ts": "2018-04-09 15:51:00.0"
			}, {
				"taxRate": 0,
				"privilegeTaxRate": 0,
				"type": 3000070003,
				"id": 1000,
				"name": "免税",
				"ts": "2018-04-09 15:51:00.0"
			}],
			"dataList": [{"id": 2, "name": "原材料", "rate": 17, "vatTaxpayer": 2000010001, "sequence": 0}, {
				"id": 1,
				"name": "商品",
				"rate": 17,
				"vatTaxpayer": 2000010001,
				"sequence": 0
			}, {"id": 4, "name": "周转材料", "rate": 17, "vatTaxpayer": 2000010001, "sequence": 0}, {
				"id": 3,
				"name": "半成品",
				"rate": 17,
				"vatTaxpayer": 2000010001,
				"sequence": 0
			}, {"id": 6, "name": "劳务", "rate": 17, "vatTaxpayer": 2000010001, "sequence": 0}, {
				"id": 5,
				"name": "固定资产-动产",
				"rate": 17,
				"vatTaxpayer": 2000010001,
				"sequence": 0
			}, {"id": 9, "name": "固定资产-不动产", "rate": 11, "vatTaxpayer": 2000010001, "sequence": 0}, {
				"id": 8,
				"name": "无形资产",
				"rate": 6,
				"vatTaxpayer": 2000010001,
				"sequence": 0
			}, {"id": 7, "name": "服务", "rate": 11, "vatTaxpayer": 2000010001, "sequence": 0}]
		}
	}
})

fetch.mock('/v1/ba/inventoryTaxClassification/queryByKey', (option) => {
	return {
		"result": true,
		"value": [{"label": "农、林、牧、渔业类产品", "value": "农、林、牧、渔业类产品", "key": "1010000000000000000"}, {
			"label": "农业产品",
			"value": "农业产品",
			"key": "1010100000000000000"
		}, {"label": "谷物", "value": "谷物", "key": "1010101000000000000"}, {
			"label": "稻谷",
			"value": "稻谷",
			"key": "1010101010000000000"
		}, {"label": "小麦", "value": "小麦", "key": "1010101020000000000"}, {
			"label": "玉米",
			"value": "玉米",
			"key": "1010101030000000000"
		}, {"label": "谷子", "value": "谷子", "key": "1010101040000000000"}, {
			"label": "高粱",
			"value": "高粱",
			"key": "1010101050000000000"
		}, {"label": "大麦", "value": "大麦", "key": "1010101060000000000"}, {
			"label": "燕麦",
			"value": "燕麦",
			"key": "1010101070000000000"
		}, {"label": "黑麦", "value": "黑麦", "key": "1010101080000000000"}, {
			"label": "荞麦",
			"value": "荞麦",
			"key": "1010101090000000000"
		}, {"label": "其他谷物", "value": "其他谷物", "key": "1010101990000000000"}, {
			"label": "薯类",
			"value": "薯类",
			"key": "1010102000000000000"
		}, {"label": "马铃薯", "value": "马铃薯", "key": "1010102010000000000"}, {
			"label": "木薯",
			"value": "木薯",
			"key": "1010102020000000000"
		}, {"label": "甘薯", "value": "甘薯", "key": "1010102030000000000"}, {
			"label": "其他薯类",
			"value": "其他薯类",
			"key": "1010102990000000000"
		}, {"label": "油料作物", "value": "油料作物", "key": "1010103000000000000"}, {
			"label": "花生",
			"value": "花生",
			"key": "1010103010000000000"
		}, {"label": "油菜籽", "value": "油菜籽", "key": "1010103020000000000"}, {
			"label": "芝麻",
			"value": "芝麻",
			"key": "1010103030000000000"
		}, {"label": "其他油料", "value": "其他油料", "key": "1010103990000000000"}, {
			"label": "干豆类",
			"value": "干豆类",
			"key": "1010104000000000000"
		}, {"label": "大豆", "value": "大豆", "key": "1010104010000000000"}, {
			"label": "绿豆",
			"value": "绿豆",
			"key": "1010104020000000000"
		}, {"label": "其他杂豆", "value": "其他杂豆", "key": "1010104990000000000"}, {
			"label": "棉花",
			"value": "棉花",
			"key": "1010105000000000000"
		}, {"label": "生麻", "value": "生麻", "key": "1010106000000000000"}, {
			"label": "糖料",
			"value": "糖料",
			"key": "1010107000000000000"
		}, {"label": "甘蔗", "value": "甘蔗", "key": "1010107010000000000"}, {
			"label": "甜菜",
			"value": "甜菜",
			"key": "1010107020000000000"
		}, {"label": "其他糖料", "value": "其他糖料", "key": "1010107990000000000"}, {
			"label": "未加工烟草",
			"value": "未加工烟草",
			"key": "1010108000000000000"
		}, {"label": "未去梗烤烟叶", "value": "未去梗烤烟叶", "key": "1010108010000000000"}, {
			"label": "其他未加工烟草",
			"value": "其他未加工烟草",
			"key": "1010108990000000000"
		}, {"label": "饲料作物", "value": "饲料作物", "key": "1010109000000000000"}, {
			"label": "饲料牧草",
			"value": "饲料牧草",
			"key": "1010109010000000000"
		}, {"label": "其他饲料作物", "value": "其他饲料作物", "key": "1010109990000000000"}, {
			"label": "水生植物类",
			"value": "水生植物类",
			"key": "1010110000000000000"
		}, {"label": "农作物副产品", "value": "农作物副产品", "key": "1010111000000000000"}, {
			"label": "作物茎、秆、根",
			"value": "作物茎、秆、根",
			"key": "1010111010000000000"
		}, {"label": "其他农作物副产品", "value": "其他农作物副产品", "key": "1010111990000000000"}, {
			"label": "蔬菜及食用菌",
			"value": "蔬菜及食用菌",
			"key": "1010112000000000000"
		}, {"label": "萝卜等根菜类蔬菜", "value": "萝卜等根菜类蔬菜", "key": "1010112010000000000"}, {
			"label": "山药等薯芋类蔬菜",
			"value": "山药等薯芋类蔬菜",
			"key": "1010112020000000000"
		}, {"label": "葱蒜类蔬菜", "value": "葱蒜类蔬菜", "key": "1010112030000000000"}, {
			"label": "白菜类蔬菜",
			"value": "白菜类蔬菜",
			"key": "1010112040000000000"
		}, {"label": "芥菜类蔬菜", "value": "芥菜类蔬菜", "key": "1010112050000000000"}, {
			"label": "甘蓝类蔬菜",
			"value": "甘蓝类蔬菜",
			"key": "1010112060000000000"
		}, {"label": "芹菜等叶菜类蔬菜", "value": "芹菜等叶菜类蔬菜", "key": "1010112070000000000"}, {
			"label": "瓜类蔬菜",
			"value": "瓜类蔬菜",
			"key": "1010112080000000000"
		}, {"label": "番茄等茄果类蔬菜", "value": "番茄等茄果类蔬菜", "key": "1010112090000000000"}, {
			"label": "菜豆等豆类蔬菜",
			"value": "菜豆等豆类蔬菜",
			"key": "1010112100000000000"
		}, {"label": "莲藕等水生蔬菜", "value": "莲藕等水生蔬菜", "key": "1010112110000000000"}, {
			"label": "竹笋等多年生及杂类蔬菜",
			"value": "竹笋等多年生及杂类蔬菜",
			"key": "1010112120000000000"
		}, {"label": "香菇等食用菌", "value": "香菇等食用菌", "key": "1010112130000000000"}, {
			"label": "绿豆芽等芽苗菜",
			"value": "绿豆芽等芽苗菜",
			"key": "1010112140000000000"
		}, {"label": "其他蔬菜", "value": "其他蔬菜", "key": "1010112150000000000"}, {
			"label": "花卉",
			"value": "花卉",
			"key": "1010113000000000000"
		}, {"label": "盆栽花", "value": "盆栽花", "key": "1010113010000000000"}, {
			"label": "鲜切花及花蕾",
			"value": "鲜切花及花蕾",
			"key": "1010113020000000000"
		}, {"label": "切叶", "value": "切叶", "key": "1010113030000000000"}, {
			"label": "切枝",
			"value": "切枝",
			"key": "1010113040000000000"
		}, {"label": "干燥花", "value": "干燥花", "key": "1010113050000000000"}, {
			"label": "盆景及园艺产品",
			"value": "盆景及园艺产品",
			"key": "1010114000000000000"
		}, {"label": "园艺产品", "value": "园艺产品", "key": "1010114010000000000"}, {
			"label": "盆栽观叶植物",
			"value": "盆栽观叶植物",
			"key": "1010114010100000000"
		}, {"label": "草皮", "value": "草皮", "key": "1010114010200000000"}, {
			"label": "草坪",
			"value": "草坪",
			"key": "1010114010300000000"
		}, {"label": "其他盆景及园艺产品", "value": "其他盆景及园艺产品", "key": "1010114990000000000"}, {
			"label": "水果及坚果",
			"value": "水果及坚果",
			"key": "1010115000000000000"
		}, {"label": "水果（园林水果）", "value": "水果（园林水果）", "key": "1010115010000000000"}, {
			"label": "苹果",
			"value": "苹果",
			"key": "1010115010100000000"
		}, {"label": "梨", "value": "梨", "key": "1010115010200000000"}, {
			"label": "柑橘类水果",
			"value": "柑橘类水果",
			"key": "1010115010300000000"
		}, {"label": "葡萄", "value": "葡萄", "key": "1010115010400000000"}, {
			"label": "香蕉",
			"value": "香蕉",
			"key": "1010115010500000000"
		}, {"label": "菠萝", "value": "菠萝", "key": "1010115010600000000"}, {
			"label": "龙眼",
			"value": "龙眼",
			"key": "1010115010700000000"
		}, {"label": "荔枝", "value": "荔枝", "key": "1010115010800000000"}, {
			"label": "枇杷",
			"value": "枇杷",
			"key": "1010115010900000000"
		}, {"label": "红毛丹", "value": "红毛丹", "key": "1010115011000000000"}, {
			"label": "芒果",
			"value": "芒果",
			"key": "1010115011100000000"
		}, {"label": "橄榄", "value": "橄榄", "key": "1010115011200000000"}, {
			"label": "无花果",
			"value": "无花果",
			"key": "1010115011300000000"
		}, {"label": "鳄梨", "value": "鳄梨", "key": "1010115011400000000"}, {
			"label": "番石榴",
			"value": "番石榴",
			"key": "1010115011500000000"
		}, {"label": "山竹果", "value": "山竹果", "key": "1010115011600000000"}, {
			"label": "杨桃",
			"value": "杨桃",
			"key": "1010115011700000000"
		}, {"label": "莲雾", "value": "莲雾", "key": "1010115011800000000"}, {
			"label": "火龙果",
			"value": "火龙果",
			"key": "1010115011900000000"
		}, {"label": "西瓜", "value": "西瓜", "key": "1010115012000000000"}, {
			"label": "哈密瓜",
			"value": "哈密瓜",
			"key": "1010115012100000000"
		}, {"label": "华莱士瓜", "value": "华莱士瓜", "key": "1010115012200000000"}, {
			"label": "香瓜",
			"value": "香瓜",
			"key": "1010115012300000000"
		}, {"label": "伊利沙白瓜", "value": "伊利沙白瓜", "key": "1010115012400000000"}, {
			"label": "木瓜",
			"value": "木瓜",
			"key": "1010115012500000000"
		}, {"label": "樱桃", "value": "樱桃", "key": "1010115012600000000"}, {
			"label": "枣",
			"value": "枣",
			"key": "1010115012700000000"
		}, {"label": "红果", "value": "红果", "key": "1010115012800000000"}, {
			"label": "柿子",
			"value": "柿子",
			"key": "1010115012900000000"
		}, {"label": "桃", "value": "桃", "key": "1010115013000000000"}, {
			"label": "李子",
			"value": "李子",
			"key": "1010115013100000000"
		}, {"label": "石榴", "value": "石榴", "key": "1010115013200000000"}, {
			"label": "杏",
			"value": "杏",
			"key": "1010115013300000000"
		}, {"label": "杨梅", "value": "杨梅", "key": "1010115013400000000"}, {
			"label": "草莓",
			"value": "草莓",
			"key": "1010115013500000000"
		}, {"label": "黑莓", "value": "黑莓", "key": "1010115013600000000"}, {
			"label": "桑椹",
			"value": "桑椹",
			"key": "1010115013700000000"
		}, {"label": "猕猴桃", "value": "猕猴桃", "key": "1010115013800000000"}, {
			"label": "沙棘",
			"value": "沙棘",
			"key": "1010115013900000000"
		}, {"label": "其他未列明水果", "value": "其他未列明水果", "key": "1010115019900000000"}, {
			"label": "干制水果",
			"value": "干制水果",
			"key": "1010115020000000000"
		}, {"label": "食用坚果", "value": "食用坚果", "key": "1010115030000000000"}, {
			"label": "椰子",
			"value": "椰子",
			"key": "1010115030100000000"
		}, {"label": "腰果", "value": "腰果", "key": "1010115030200000000"}, {
			"label": "核桃",
			"value": "核桃",
			"key": "1010115030300000000"
		}, {"label": "山核桃", "value": "山核桃", "key": "1010115030400000000"}, {
			"label": "栗子",
			"value": "栗子",
			"key": "1010115030500000000"
		}, {"label": "松子", "value": "松子", "key": "1010115030600000000"}, {
			"label": "榛子",
			"value": "榛子",
			"key": "1010115030700000000"
		}, {"label": "阿月浑子果（开心果）", "value": "阿月浑子果（开心果）", "key": "1010115030800000000"}, {
			"label": "槟榔",
			"value": "槟榔",
			"key": "1010115030900000000"
		}, {"label": "白果", "value": "白果", "key": "1010115031000000000"}, {
			"label": "香榧",
			"value": "香榧",
			"key": "1010115031100000000"
		}, {"label": "巴旦杏", "value": "巴旦杏", "key": "1010115031200000000"}, {
			"label": "夏威夷果",
			"value": "夏威夷果",
			"key": "1010115031300000000"
		}, {"label": "其他食用坚果", "value": "其他食用坚果", "key": "1010115039900000000"}, {
			"label": "茶及饮料原料",
			"value": "茶及饮料原料",
			"key": "1010116000000000000"
		}, {"label": "茶叶", "value": "茶叶", "key": "1010116010000000000"}, {
			"label": "饮料原料",
			"value": "饮料原料",
			"key": "1010116020000000000"
		}, {"label": "其他未列明饮料原料", "value": "其他未列明饮料原料", "key": "1010116990000000000"}, {
			"label": "香料原料",
			"value": "香料原料",
			"key": "1010117000000000000"
		}, {"label": "中草药材", "value": "中草药材", "key": "1010118000000000000"}, {
			"label": "种子、种苗",
			"value": "种子、种苗",
			"key": "1010119000000000000"
		}, {"label": "种用谷物", "value": "种用谷物", "key": "1010119010000000000"}, {
			"label": "种用薯类",
			"value": "种用薯类",
			"key": "1010119020000000000"
		}, {"label": "种用油料", "value": "种用油料", "key": "1010119030000000000"}, {
			"label": "种用豆类",
			"value": "种用豆类",
			"key": "1010119040000000000"
		}, {"label": "种用饲料作物", "value": "种用饲料作物", "key": "1010119050000000000"}, {
			"label": "蔬菜籽",
			"value": "蔬菜籽",
			"key": "1010119060000000000"
		}, {"label": "花草种", "value": "花草种", "key": "1010119070000000000"}, {
			"label": "水果籽",
			"value": "水果籽",
			"key": "1010119080000000000"
		}, {"label": "其他种子、种苗", "value": "其他种子、种苗", "key": "1010119990000000000"}, {
			"label": "林业产品",
			"value": "林业产品",
			"key": "1010200000000000000"
		}, {"label": "育种和育苗", "value": "育种和育苗", "key": "1010201000000000000"}, {
			"label": "木材采伐产品",
			"value": "木材采伐产品",
			"key": "1010202000000000000"
		}, {"label": "原木", "value": "原木", "key": "1010202010000000000"}, {
			"label": "小规格木材",
			"value": "小规格木材",
			"key": "1010202020000000000"
		}, {"label": "薪材", "value": "薪材", "key": "1010202030000000000"}, {
			"label": "短条及细枝等",
			"value": "短条及细枝等",
			"key": "1010202040000000000"
		}, {"label": "其他木材采伐产品", "value": "其他木材采伐产品", "key": "1010202990000000000"}, {
			"label": "竹材采伐产品",
			"value": "竹材采伐产品",
			"key": "1010203000000000000"
		}, {"label": "原竹", "value": "原竹", "key": "1010203010000000000"}, {
			"label": "其他竹材采伐产品",
			"value": "其他竹材采伐产品",
			"key": "1010203990000000000"
		}, {"label": "林产品", "value": "林产品", "key": "1010204000000000000"}, {
			"label": "天然橡胶",
			"value": "天然橡胶",
			"key": "1010204010000000000"
		}, {"label": "天然树脂、树胶", "value": "天然树脂、树胶", "key": "1010204020000000000"}, {
			"label": "栲胶原料",
			"value": "栲胶原料",
			"key": "1010204030000000000"
		}, {"label": "非直接食用果类", "value": "非直接食用果类", "key": "1010204040000000000"}, {
			"label": "编结用原料",
			"value": "编结用原料",
			"key": "1010204050000000000"
		}, {"label": "染色、鞣革用植物原料", "value": "染色、鞣革用植物原料", "key": "1010204060000000000"}, {
			"label": "野生植物活体",
			"value": "野生植物活体",
			"key": "1010204070000000000"
		}, {"label": "野生植物采集产品", "value": "野生植物采集产品", "key": "1010204080000000000"}, {
			"label": "其他林产品",
			"value": "其他林产品",
			"key": "1010204990000000000"
		}, {"label": "饲养动物、野生动物及其产品", "value": "饲养动物、野生动物及其产品", "key": "1010300000000000000"}, {
			"label": "活牲畜",
			"value": "活牲畜",
			"key": "1010301000000000000"
		}, {"label": "猪", "value": "猪", "key": "1010301010000000000"}, {
			"label": "牛",
			"value": "牛",
			"key": "1010301020000000000"
		}, {"label": "马", "value": "马", "key": "1010301030000000000"}, {
			"label": "驴",
			"value": "驴",
			"key": "1010301040000000000"
		}, {"label": "骡", "value": "骡", "key": "1010301050000000000"}, {
			"label": "羊",
			"value": "羊",
			"key": "1010301060000000000"
		}, {"label": "骆驼", "value": "骆驼", "key": "1010301070000000000"}, {
			"label": "其他活牲畜",
			"value": "其他活牲畜",
			"key": "1010301990000000000"
		}, {"label": "活家禽", "value": "活家禽", "key": "1010302000000000000"}, {
			"label": "活鸡",
			"value": "活鸡",
			"key": "1010302010000000000"
		}, {"label": "活鸭", "value": "活鸭", "key": "1010302020000000000"}, {
			"label": "活鹅",
			"value": "活鹅",
			"key": "1010302030000000000"
		}, {"label": "其他活家禽", "value": "其他活家禽", "key": "1010302990000000000"}, {
			"label": "畜禽产品",
			"value": "畜禽产品",
			"key": "1010303000000000000"
		}, {"label": "生奶", "value": "生奶", "key": "1010303010000000000"}, {
			"label": "禽蛋",
			"value": "禽蛋",
			"key": "1010303020000000000"
		}, {"label": "鸡蛋", "value": "鸡蛋", "key": "1010303020100000000"}, {
			"label": "鸭蛋",
			"value": "鸭蛋",
			"key": "1010303020200000000"
		}, {"label": "鹅蛋", "value": "鹅蛋", "key": "1010303020300000000"}, {
			"label": "鹌鹑蛋",
			"value": "鹌鹑蛋",
			"key": "1010303020400000000"
		}, {"label": "其他禽蛋", "value": "其他禽蛋", "key": "1010303029900000000"}, {
			"label": "天然蜂蜜及副产品",
			"value": "天然蜂蜜及副产品",
			"key": "1010303030000000000"
		}, {"label": "天然蜂蜜", "value": "天然蜂蜜", "key": "1010303030100000000"}, {
			"label": "蜂蜡",
			"value": "蜂蜡",
			"key": "1010303030200000000"
		}, {"label": "鲜蜂王浆", "value": "鲜蜂王浆", "key": "1010303030300000000"}, {
			"label": "其他天然蜂蜜及副产品",
			"value": "其他天然蜂蜜及副产品",
			"key": "1010303039900000000"
		}, {"label": "蚕茧", "value": "蚕茧", "key": "1010303040000000000"}, {
			"label": "动物毛类",
			"value": "动物毛类",
			"key": "1010303050000000000"
		}, {"label": "生皮", "value": "生皮", "key": "1010303060000000000"}, {
			"label": "生毛皮",
			"value": "生毛皮",
			"key": "1010303070000000000"
		}, {"label": "制刷用兽毛", "value": "制刷用兽毛", "key": "1010303080000000000"}, {
			"label": "麝香",
			"value": "麝香",
			"key": "1010303090000000000"
		}, {"label": "鹿茸", "value": "鹿茸", "key": "1010303100000000000"}, {
			"label": "燕窝",
			"value": "燕窝",
			"key": "1010303110000000000"
		}, {"label": "其他畜禽产品", "value": "其他畜禽产品", "key": "1010303990000000000"}, {
			"label": "野生动物禽类",
			"value": "野生动物禽类",
			"key": "1010304000000000000"
		}, {"label": "野生动物", "value": "野生动物", "key": "1010304010000000000"}, {
			"label": "野生鸟类",
			"value": "野生鸟类",
			"key": "1010304020000000000"
		}, {"label": "其他野生动物", "value": "其他野生动物", "key": "1010304990000000000"}, {
			"label": "其他饲养动物",
			"value": "其他饲养动物",
			"key": "1010399000000000000"
		}, {"label": "海水养殖、捕捞产品", "value": "海水养殖、捕捞产品", "key": "1010400000000000000"}, {
			"label": "海水鱼",
			"value": "海水鱼",
			"key": "1010401000000000000"
		}, {"label": "海水虾", "value": "海水虾", "key": "1010402000000000000"}, {
			"label": "海水蟹",
			"value": "海水蟹",
			"key": "1010403000000000000"
		}, {"label": "海水贝类", "value": "海水贝类", "key": "1010404000000000000"}, {
			"label": "海水藻类",
			"value": "海水藻类",
			"key": "1010405000000000000"
		}, {"label": "海水软体水生动物", "value": "海水软体水生动物", "key": "1010406000000000000"}, {
			"label": "海水产品种苗",
			"value": "海水产品种苗",
			"key": "1010407000000000000"
		}, {"label": "其他海水产品", "value": "其他海水产品", "key": "1010499000000000000"}, {
			"label": "淡水养殖产品、捕捞产品",
			"value": "淡水养殖产品、捕捞产品",
			"key": "1010500000000000000"
		}, {"label": "淡水鱼", "value": "淡水鱼", "key": "1010501000000000000"}, {
			"label": "淡水虾",
			"value": "淡水虾",
			"key": "1010502000000000000"
		}, {"label": "淡水蟹", "value": "淡水蟹", "key": "1010503000000000000"}, {
			"label": "淡水贝类",
			"value": "淡水贝类",
			"key": "1010504000000000000"
		}, {"label": "淡水藻类", "value": "淡水藻类", "key": "1010505000000000000"}, {
			"label": "淡水鲜软体动物",
			"value": "淡水鲜软体动物",
			"key": "1010506000000000000"
		}, {"label": "淡水产品种苗", "value": "淡水产品种苗", "key": "1010507000000000000"}, {
			"label": "其他淡水产品",
			"value": "其他淡水产品",
			"key": "1010599000000000000"
		}, {"label": "原煤", "value": "原煤", "key": "1020101000000000000"}, {
			"label": "天然原油",
			"value": "天然原油",
			"key": "1020201010000000000"
		}, {"label": "铜矿石", "value": "铜矿石", "key": "1020401010000000000"}, {
			"label": "石灰石",
			"value": "石灰石",
			"key": "1020501010000000000"
		}, {"label": "天然宝石类矿石", "value": "天然宝石类矿石", "key": "1020511010000000000"}, {
			"label": "谷物细粉",
			"value": "谷物细粉",
			"key": "1030101000000000000"
		}, {"label": "小麦粉", "value": "小麦粉", "key": "1030101010000000000"}, {
			"label": "大米粉",
			"value": "大米粉",
			"key": "1030101020000000000"
		}, {"label": "大米", "value": "大米", "key": "1030102010100000000"}, {
			"label": "大豆油",
			"value": "大豆油",
			"key": "1030105010100000000"
		}, {
			"label": "猪、牛、羊、鸡、鸭、鹅鲜、冷、冻肉",
			"value": "猪、牛、羊、鸡、鸭、鹅鲜、冷、冻肉",
			"key": "1030107010100000000"
		}, {"label": "冷冻水果及坚果", "value": "冷冻水果及坚果", "key": "1030111010000000000"}, {
			"label": "小麦淀粉",
			"value": "小麦淀粉",
			"key": "1030112010100000000"
		}, {"label": "糕点", "value": "糕点", "key": "1030201010000000000"}, {
			"label": "木糖",
			"value": "木糖",
			"key": "1030211010000000000"
		}, {"label": "木质水解酒精", "value": "木质水解酒精", "key": "1030301010000000000"}, {
			"label": "片烟",
			"value": "片烟",
			"key": "1030401010000000000"
		}, {"label": "棉、化纤纺织及印染产品", "value": "棉、化纤纺织及印染产品", "key": "1040101000000000000"}, {
			"label": "已梳皮棉",
			"value": "已梳皮棉",
			"key": "1040101010000000000"
		}, {"label": "纱", "value": "纱", "key": "1040101020000000000"}, {
			"label": "线",
			"value": "线",
			"key": "1040101030000000000"
		}, {"label": "缝纫线", "value": "缝纫线", "key": "1040101040000000000"}, {
			"label": "布",
			"value": "布",
			"key": "1040101050000000000"
		}, {"label": "印染布", "value": "印染布", "key": "1040101060000000000"}, {
			"label": "无纺布（无纺织物）",
			"value": "无纺布（无纺织物）",
			"key": "1040111010000000000"
		}, {"label": "女内衣", "value": "女内衣", "key": "1040201010000000000"}, {
			"label": "锯材",
			"value": "锯材",
			"key": "1050101000000000000"
		}, {"label": "普通锯材", "value": "普通锯材", "key": "1050101010000000000"}, {
			"label": "特种锯材",
			"value": "特种锯材",
			"key": "1050101020000000000"
		}, {"label": "枕木", "value": "枕木", "key": "1050101030000000000"}, {
			"label": "木质家具",
			"value": "木质家具",
			"key": "1050201010000000000"
		}, {"label": "纸浆", "value": "纸浆", "key": "1060101000000000000"}, {
			"label": "木浆",
			"value": "木浆",
			"key": "1060101010000000000"
		}, {"label": "非木材纤维纸浆", "value": "非木材纤维纸浆", "key": "1060101020000000000"}, {
			"label": "废纸纸浆",
			"value": "废纸纸浆",
			"key": "1060101030000000000"
		}, {"label": "化学溶解浆", "value": "化学溶解浆", "key": "1060101040000000000"}, {
			"label": "秸秆浆",
			"value": "秸秆浆",
			"key": "1060101050000000000"
		}, {"label": "再生纸浆", "value": "再生纸浆", "key": "1060101060000000000"}, {
			"label": "有刊号图书、报纸、期刊类印刷品",
			"value": "有刊号图书、报纸、期刊类印刷品",
			"key": "1060201010000000000"
		}, {"label": "党报", "value": "党报", "key": "1060201010100000000"}, {
			"label": "党刊",
			"value": "党刊",
			"key": "1060201010200000000"
		}, {"label": "机关报刊、机关期刊", "value": "机关报刊、机关期刊", "key": "1060201010300000000"}, {
			"label": "盲文图书和盲文期刊",
			"value": "盲文图书和盲文期刊",
			"key": "1060201010400000000"
		}, {"label": "少数民族文字出版物", "value": "少数民族文字出版物", "key": "1060201010500000000"}, {
			"label": "特定地区出版物",
			"value": "特定地区出版物",
			"key": "1060201010600000000"
		}, {"label": "特定图书、报纸和期刊", "value": "特定图书、报纸和期刊", "key": "1060201010700000000"}, {
			"label": "少年儿童报刊及课本",
			"value": "少年儿童报刊及课本",
			"key": "1060201010800000000"
		}, {"label": "老年报刊", "value": "老年报刊", "key": "1060201010900000000"}, {
			"label": "基础软件产品",
			"value": "基础软件产品",
			"key": "1060301010000000000"
		}, {"label": "系统软件产品", "value": "系统软件产品", "key": "1060301010100000000"}, {
			"label": "数据库软件产品",
			"value": "数据库软件产品",
			"key": "1060301010200000000"
		}, {"label": "中间件软件产品", "value": "中间件软件产品", "key": "1060301010300000000"}, {
			"label": "文具盒（袋）",
			"value": "文具盒（袋）",
			"key": "1060401010000000000"
		}, {"label": "自来水笔", "value": "自来水笔", "key": "1060402010100000000"}, {
			"label": "专供游戏用家具式桌子",
			"value": "专供游戏用家具式桌子",
			"key": "1060410100000000000"
		}, {"label": "雕刻工艺品", "value": "雕刻工艺品", "key": "1060501010000000000"}, {
			"label": "桑拿浴箱",
			"value": "桑拿浴箱",
			"key": "1060511010000000000"
		}, {"label": "石油制品", "value": "石油制品", "key": "1070101000000000000"}, {
			"label": "汽油",
			"value": "汽油",
			"key": "1070101010000000000"
		}, {"label": "航空汽油", "value": "航空汽油", "key": "1070101010100000000"}, {
			"label": "车用汽油",
			"value": "车用汽油",
			"key": "1070101010200000000"
		}, {"label": "其他汽油", "value": "其他汽油", "key": "1070101019900000000"}, {
			"label": "煤油",
			"value": "煤油",
			"key": "1070101020000000000"
		}, {"label": "航空煤油", "value": "航空煤油", "key": "1070101020100000000"}, {
			"label": "其他煤油",
			"value": "其他煤油",
			"key": "1070101020200000000"
		}, {"label": "柴油", "value": "柴油", "key": "1070101030000000000"}, {
			"label": "燃料油",
			"value": "燃料油",
			"key": "1070101040000000000"
		}, {"label": "石脑油", "value": "石脑油", "key": "1070101050000000000"}, {
			"label": "溶剂油",
			"value": "溶剂油",
			"key": "1070101060000000000"
		}, {"label": "润滑油", "value": "润滑油", "key": "1070101070000000000"}, {
			"label": "润滑脂",
			"value": "润滑脂",
			"key": "1070101080000000000"
		}, {"label": "润滑油基础油", "value": "润滑油基础油", "key": "1070101090000000000"}, {
			"label": "液化石油气",
			"value": "液化石油气",
			"key": "1070101110100000000"
		}, {"label": "无机酸类", "value": "无机酸类", "key": "1070201010000000000"}, {
			"label": "硫酸类",
			"value": "硫酸类",
			"key": "1070201010100000000"
		}, {"label": "其他无机酸", "value": "其他无机酸", "key": "1070201010200000000"}, {
			"label": "甲烷",
			"value": "甲烷",
			"key": "1070202010100000000"
		}, {"label": "纯苯", "value": "纯苯", "key": "1070202020101000000"}, {
			"label": "活性炭",
			"value": "活性炭",
			"key": "1070203010100000000"
		}, {"label": "氧化镧", "value": "氧化镧", "key": "1070203040101000000"}, {
			"label": "染料",
			"value": "染料",
			"key": "1070211010000000000"
		}, {
			"label": "聚对苯二甲酸乙二醇酯、PET、树脂",
			"value": "聚对苯二甲酸乙二醇酯、PET、树脂",
			"key": "1070213010100000000"
		}, {"label": "金属材料制焊料", "value": "金属材料制焊料", "key": "1070221010000000000"}, {
			"label": "抗菌素（抗感染药）",
			"value": "抗菌素（抗感染药）",
			"key": "1070301010000000000"
		}, {"label": "化纤棉绒浆粕", "value": "化纤棉绒浆粕", "key": "1070401010000000000"}, {
			"label": "橡胶轮胎外胎",
			"value": "橡胶轮胎外胎",
			"key": "1070501010000000000"
		}, {"label": "塑料薄膜", "value": "塑料薄膜", "key": "1070601010000000000"}, {
			"label": "农用薄膜",
			"value": "农用薄膜",
			"key": "1070601010100000000"
		}, {"label": "其他塑料薄膜", "value": "其他塑料薄膜", "key": "1070601010200000000"}, {
			"label": "水泥熟料及水泥",
			"value": "水泥熟料及水泥",
			"key": "1080101000000000000"
		}, {"label": "硅酸盐水泥熟料", "value": "硅酸盐水泥熟料", "key": "1080101010000000000"}, {
			"label": "水泥",
			"value": "水泥",
			"key": "1080101020000000000"
		}, {"label": "纸面石膏板", "value": "纸面石膏板", "key": "1080104010100000000"}, {
			"label": "烧结普通砖",
			"value": "烧结普通砖",
			"key": "1080105010100000000"
		}, {"label": "光学元件毛坯", "value": "光学元件毛坯", "key": "1080111010000000000"}, {
			"label": "日用陶瓷餐具",
			"value": "日用陶瓷餐具",
			"key": "1080121010000000000"
		}, {"label": "石墨电极", "value": "石墨电极", "key": "1080127010100000000"}, {
			"label": "黄金",
			"value": "黄金",
			"key": "1080311010000000000"
		}, {"label": "黄金矿砂（含伴生金）", "value": "黄金矿砂（含伴生金）", "key": "1080311010100000000"}, {
			"label": "其他黄金",
			"value": "其他黄金",
			"key": "1080311010200000000"
		}, {"label": "钨", "value": "钨", "key": "1080312010100000000"}, {
			"label": "钠",
			"value": "钠",
			"key": "1080313010100000000"
		}, {"label": "铜合金", "value": "铜合金", "key": "1080314010100000000"}, {
			"label": "镁材",
			"value": "镁材",
			"key": "1080321010000000000"
		}, {"label": "钢结构及其产品", "value": "钢结构及其产品", "key": "1080401010000000000"}, {
			"label": "铁丝",
			"value": "铁丝",
			"key": "1080411010000000000"
		}, {"label": "锅炉及辅助设备", "value": "锅炉及辅助设备", "key": "1090101000000000000"}, {
			"label": "锅炉、辅助设备、零件",
			"value": "锅炉、辅助设备、零件",
			"key": "1090101010000000000"
		}, {"label": "核反应堆及其零件", "value": "核反应堆及其零件", "key": "1090101020000000000"}, {
			"label": "起重滑车",
			"value": "起重滑车",
			"key": "1090111010000000000"
		}, {"label": "气动元件", "value": "气动元件", "key": "1090121010000000000"}, {
			"label": "工商用制冷设备",
			"value": "工商用制冷设备",
			"key": "1090131010000000000"
		}, {"label": "建井设备", "value": "建井设备", "key": "1090201010000000000"}, {
			"label": "金属铸造用型箱、型模底板",
			"value": "金属铸造用型箱、型模底板",
			"key": "1090211010000000000"
		}, {"label": "制浆设备", "value": "制浆设备", "key": "1090221010000000000"}, {
			"label": "电机、变压器专用生产机械",
			"value": "电机、变压器专用生产机械",
			"key": "1090231010000000000"
		}, {"label": "线圈绕线机", "value": "线圈绕线机", "key": "1090231010100000000"}, {
			"label": "嵌线设备",
			"value": "嵌线设备",
			"key": "1090231010200000000"
		}, {"label": "绝缘处理设备", "value": "绝缘处理设备", "key": "1090231010300000000"}, {
			"label": "邮资机",
			"value": "邮资机",
			"key": "1090251010000000000"
		}, {"label": "铁路机车", "value": "铁路机车", "key": "1090301010000000000"}, {
			"label": "乘用车（排气量在1.0升以下（含））",
			"value": "乘用车（排气量在1.0升以下（含））",
			"key": "1090305010100000000"
		}, {"label": "机动车制动系统", "value": "机动车制动系统", "key": "1090310010100000000"}, {
			"label": "船用甲板机械",
			"value": "船用甲板机械",
			"key": "1090321010000000000"
		}, {"label": "民用飞机", "value": "民用飞机", "key": "1090324010100000000"}, {
			"label": "航天飞机",
			"value": "航天飞机",
			"key": "1090325010100000000"
		}, {"label": "交流发电机", "value": "交流发电机", "key": "1090401010000000000"}, {
			"label": "电气绝缘子",
			"value": "电气绝缘子",
			"key": "1090411010000000000"
		}, {"label": "无汞锌原电池", "value": "无汞锌原电池", "key": "1090413010100000000"}, {
			"label": "家用空调设备零件",
			"value": "家用空调设备零件",
			"key": "1090421010000000000"
		}, {"label": "光通信设备", "value": "光通信设备", "key": "1090501010000000000"}, {
			"label": "终端显示设备",
			"value": "终端显示设备",
			"key": "1090511010000000000"
		}, {"label": "工业自动调节仪表", "value": "工业自动调节仪表", "key": "1090601010000000000"}, {
			"label": "测量型GNSS接收机",
			"value": "测量型GNSS接收机",
			"key": "1090610100000000000"
		}, {"label": "气象观测仪器", "value": "气象观测仪器", "key": "1090611010000000000"}, {
			"label": "电影摄影机",
			"value": "电影摄影机",
			"key": "1090621010000000000"
		}, {"label": "税控加油机", "value": "税控加油机", "key": "1090626010100000000"}, {
			"label": "发电及供电",
			"value": "发电及供电",
			"key": "1100101000000000000"
		}, {"label": "发电", "value": "发电", "key": "1100101010000000000"}, {
			"label": "火力发电",
			"value": "火力发电",
			"key": "1100101010100000000"
		}, {
			"label": "5万千瓦以下（含5万千瓦）水力发电",
			"value": "5万千瓦以下（含5万千瓦）水力发电",
			"key": "1100101010200000000"
		}, {
			"label": "5万千瓦以上（不含5万千瓦）100万千瓦（含）以下水力发电",
			"value": "5万千瓦以上（不含5万千瓦）100万千瓦（含）以下水力发电",
			"key": "1100101010300000000"
		}, {
			"label": "100万千瓦以上（不含100万千瓦）水力发电",
			"value": "100万千瓦以上（不含100万千瓦）水力发电",
			"key": "1100101010400000000"
		}, {"label": "核能发电", "value": "核能发电", "key": "1100101010500000000"}, {
			"label": "太阳能发电",
			"value": "太阳能发电",
			"key": "1100101010600000000"
		}, {"label": "风力发电", "value": "风力发电", "key": "1100101010700000000"}, {
			"label": "潮汐能发电",
			"value": "潮汐能发电",
			"key": "1100101010800000000"
		}, {"label": "沼气发电", "value": "沼气发电", "key": "1100101010900000000"}, {
			"label": "地热能发电",
			"value": "地热能发电",
			"key": "1100101011000000000"
		}, {"label": "垃圾发电", "value": "垃圾发电", "key": "1100101011100000000"}, {
			"label": "竹木生物质燃料发电",
			"value": "竹木生物质燃料发电",
			"key": "1100101011200000000"
		}, {"label": "其他发电", "value": "其他发电", "key": "1100101019900000000"}, {
			"label": "供电",
			"value": "供电",
			"key": "1100101020000000000"
		}, {"label": "电力产品", "value": "电力产品", "key": "1100101020100000000"}, {
			"label": "售电",
			"value": "售电",
			"key": "1100101020200000000"
		}, {"label": "农村电网维护费", "value": "农村电网维护费", "key": "1100101020300000000"}, {
			"label": "三北热力",
			"value": "三北热力",
			"key": "1100102010100000000"
		}, {"label": "焦炉煤气", "value": "焦炉煤气", "key": "1100201010000000000"}, {
			"label": "自来水",
			"value": "自来水",
			"key": "1100301010000000000"
		}, {"label": "稀土冶炼分离产品加工劳务", "value": "稀土冶炼分离产品加工劳务", "key": "2010100000000000000"}, {
			"label": "陆路运输服务",
			"value": "陆路运输服务",
			"key": "3010100000000000000"
		}, {"label": "陆路旅客运输服务", "value": "陆路旅客运输服务", "key": "3010101000000000000"}, {
			"label": "铁路旅客运输服务",
			"value": "铁路旅客运输服务",
			"key": "3010101010000000000"
		}, {"label": "国内铁路旅客运输服务", "value": "国内铁路旅客运输服务", "key": "3010101010100000000"}, {
			"label": "国际铁路旅客运输服务",
			"value": "国际铁路旅客运输服务",
			"key": "3010101010200000000"
		}, {"label": "港澳台铁路旅客运输服务", "value": "港澳台铁路旅客运输服务", "key": "3010101010300000000"}, {
			"label": "道路旅客运输服务",
			"value": "道路旅客运输服务",
			"key": "3010101020000000000"
		}, {"label": "公路旅客运输服务", "value": "公路旅客运输服务", "key": "3010101020100000000"}, {
			"label": "长途汽车旅客运输服务",
			"value": "长途汽车旅客运输服务",
			"key": "3010101020101000000"
		}, {"label": "国内长途汽车旅客运输服务", "value": "国内长途汽车旅客运输服务", "key": "3010101020101010000"}, {
			"label": "国际长途汽车旅客运输服务",
			"value": "国际长途汽车旅客运输服务",
			"key": "3010101020101020000"
		}, {"label": "港澳台长途汽车旅客运输服务", "value": "港澳台长途汽车旅客运输服务", "key": "3010101020101030000"}, {
			"label": "其他公路旅客运输服务",
			"value": "其他公路旅客运输服务",
			"key": "3010101020102000000"
		}, {"label": "城市旅客公共交通运输服务", "value": "城市旅客公共交通运输服务", "key": "3010101020200000000"}, {
			"label": "公共电汽车客运服务",
			"value": "公共电汽车客运服务",
			"key": "3010101020201000000"
		}, {"label": "城市轨道交通服务", "value": "城市轨道交通服务", "key": "3010101020202000000"}, {
			"label": "出租汽车客运服务",
			"value": "出租汽车客运服务",
			"key": "3010101020203000000"
		}, {"label": "索道客运服务", "value": "索道客运服务", "key": "3010101020204000000"}, {
			"label": "其他城市旅客公共交通服务",
			"value": "其他城市旅客公共交通服务",
			"key": "3010101020299000000"
		}, {"label": "陆路货物运输服务", "value": "陆路货物运输服务", "key": "3010102000000000000"}, {
			"label": "铁路货物运输服务",
			"value": "铁路货物运输服务",
			"key": "3010102010000000000"
		}, {"label": "国内铁路货物运输服务", "value": "国内铁路货物运输服务", "key": "3010102010100000000"}, {
			"label": "国际铁路货物运输服务",
			"value": "国际铁路货物运输服务",
			"key": "3010102010200000000"
		}, {"label": "港澳台铁路货物运输服务", "value": "港澳台铁路货物运输服务", "key": "3010102010300000000"}, {
			"label": "道路货物运输服务",
			"value": "道路货物运输服务",
			"key": "3010102020000000000"
		}, {"label": "国内道路货物运输服务", "value": "国内道路货物运输服务", "key": "3010102020100000000"}, {
			"label": "国际道路货物运输服务",
			"value": "国际道路货物运输服务",
			"key": "3010102020200000000"
		}, {"label": "港澳台道路货物运输服务", "value": "港澳台道路货物运输服务", "key": "3010102020300000000"}, {
			"label": "其他陆路货物运输服务",
			"value": "其他陆路货物运输服务",
			"key": "3010102990000000000"
		}, {"label": "国内其他陆路货物运输服务", "value": "国内其他陆路货物运输服务", "key": "3010102990100000000"}, {
			"label": "国际其他陆路货物运输服务",
			"value": "国际其他陆路货物运输服务",
			"key": "3010102990200000000"
		}, {"label": "港澳台其他陆路货物运输服务", "value": "港澳台其他陆路货物运输服务", "key": "3010102990300000000"}, {
			"label": "国内水路旅客运输服务",
			"value": "国内水路旅客运输服务",
			"key": "3010201010000000000"
		}, {"label": "航空旅客运输服务", "value": "航空旅客运输服务", "key": "3010301010000000000"}, {
			"label": "国内航空旅客运输服务",
			"value": "国内航空旅客运输服务",
			"key": "3010301010100000000"
		}, {"label": "国际航空旅客运输服务", "value": "国际航空旅客运输服务", "key": "3010301010200000000"}, {
			"label": "港澳台航空旅客运输服务",
			"value": "港澳台航空旅客运输服务",
			"key": "3010301010300000000"
		}, {"label": "国内液体管道运输服务", "value": "国内液体管道运输服务", "key": "3010401010000000000"}, {
			"label": "邮件寄递服务",
			"value": "邮件寄递服务",
			"key": "3020101000000000000"
		}, {"label": "函件寄递服务", "value": "函件寄递服务", "key": "3020101010000000000"}, {
			"label": "包裹寄递服务",
			"value": "包裹寄递服务",
			"key": "3020101020000000000"
		}, {"label": "语音通话服务", "value": "语音通话服务", "key": "3030101000000000000"}, {
			"label": "研发服务",
			"value": "研发服务",
			"key": "3040101000000000000"
		}, {"label": "软件开发服务", "value": "软件开发服务", "key": "3040201010000000000"}, {
			"label": "工程设计服务",
			"value": "工程设计服务",
			"key": "3040301010000000000"
		}, {"label": "影视、广播广告发布服务", "value": "影视、广播广告发布服务", "key": "3040303010100000000"}, {
			"label": "航空地面服务",
			"value": "航空地面服务",
			"key": "3040401010000000000"
		}, {"label": "机场服务", "value": "机场服务", "key": "3040401010100000000"}, {
			"label": "空中交通管理服务",
			"value": "空中交通管理服务",
			"key": "3040401010200000000"
		}, {"label": "有形动产融资租赁服务", "value": "有形动产融资租赁服务", "key": "3040501010000000000"}, {
			"label": "光租业务",
			"value": "光租业务",
			"key": "3040502010100000000"
		}, {"label": "公共住房租赁", "value": "公共住房租赁", "key": "3040502020101000000"}, {
			"label": "广播节目制作服务",
			"value": "广播节目制作服务",
			"key": "3040701010000000000"
		}, {"label": "物业管理服务", "value": "物业管理服务", "key": "3040801010000000000"}, {
			"label": "国内货物运输代理服务",
			"value": "国内货物运输代理服务",
			"key": "3040802010100000000"
		}, {"label": "金融同业往来业务", "value": "金融同业往来业务", "key": "3060101000000000000"}, {
			"label": "一年期以上的返还性人身保险和健康保险服务",
			"value": "一年期以上的返还性人身保险和健康保险服务",
			"key": "3060301010000000000"
		}, {"label": "文化服务", "value": "文化服务", "key": "3070101000000000000"}, {
			"label": "学历教育服务",
			"value": "学历教育服务",
			"key": "3070201010000000000"
		}, {"label": "专利技术", "value": "专利技术", "key": "4010100000000000000"}, {
			"label": "出让土地使用权",
			"value": "出让土地使用权",
			"key": "4050101000000000000"
		}, {"label": "住宅", "value": "住宅", "key": "5010100000000000000"}, {
			"label": "房地产开发住宅",
			"value": "房地产开发住宅",
			"key": "5010101000000000000"
		}, {"label": "取得的住宅", "value": "取得的住宅", "key": "5010102000000000000"}, {
			"label": "房改房",
			"value": "房改房",
			"key": "5010103000000000000"
		}]
	}
})
