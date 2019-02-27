/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'edf-utils'

export default {
	balancesheet: {
		// getCashFlowDistributionInfo: (option) => fetch.post('/v1/gl/report/cashFlowStatement/getCashFlowDistributionInfo', option),
		getCashFlowDistributionInfo: (option) => {
			return {
				"caseFlowItems": [
				  {
					"id": 2,
					"name": "销售商品、提供劳务收到的现金",
					"itemType": 5000050001,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 2
				  },
				  {
					"id": 3,
					"name": "收到的税费返还",
					"itemType": 5000050001,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 3
				  },
				  {
					"id": 4,
					"name": "收到其他与经营活动有关的现金",
					"itemType": 5000050001,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 4
				  },
				  {
					"id": 6,
					"name": "购买商品、接受劳务支付的现金",
					"itemType": 5000050001,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 6
				  },
				  {
					"id": 7,
					"name": "支付给职工以及为职工支付的现金",
					"itemType": 5000050001,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 7
				  },
				  {
					"id": 8,
					"name": "支付的各项税费",
					"itemType": 5000050001,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 8
				  },
				  {
					"id": 9,
					"name": "支付其它与经营活动有关的现金",
					"itemType": 5000050001,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 9
				  },
				  {
					"id": 13,
					"name": "收回投资收到的现金",
					"itemType": 5000050002,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 13
				  },
				  {
					"id": 14,
					"name": "取得投资收益收到的现金",
					"itemType": 5000050002,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 14
				  },
				  {
					"id": 15,
					"name": "处置固定资产、无形资产和其他长期资产收回的现金净额",
					"itemType": 5000050002,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 15
				  },
				  {
					"id": 16,
					"name": "处置子公司及其他营业单位收到的现金净额",
					"itemType": 5000050002,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 16
				  },
				  {
					"id": 17,
					"name": "收到其他与投资活动有关的现金",
					"itemType": 5000050002,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 17
				  },
				  {
					"id": 19,
					"name": "购建固定资产、无形资产和其他长期资产所支付的现金",
					"itemType": 5000050002,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 19
				  },
				  {
					"id": 20,
					"name": "投资支付的现金",
					"itemType": 5000050002,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 20
				  },
				  {
					"id": 21,
					"name": "取得子公司及其他营业单位支付的现金净额",
					"itemType": 5000050002,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 21
				  },
				  {
					"id": 22,
					"name": "支付的其他与投资活动有关的现金",
					"itemType": 5000050002,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 22
				  },
				  {
					"id": 26,
					"name": "吸收投资收到的现金",
					"itemType": 5000050003,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 26
				  },
				  {
					"id": 27,
					"name": "取得借款收到的现金",
					"itemType": 5000050003,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 27
				  },
				  {
					"id": 28,
					"name": "收到其他与筹资活动有关的现金",
					"itemType": 5000050003,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 28
				  },
				  {
					"id": 30,
					"name": "偿还债务支付的现金",
					"itemType": 5000050003,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 30
				  },
				  {
					"id": 31,
					"name": "分配股利、利润或偿付利息支付的现金",
					"itemType": 5000050003,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 31
				  },
				  {
					"id": 32,
					"name": "支付其他与筹资活动有关的现金",
					"itemType": 5000050003,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 32
				  },
				  {
					"id": 40,
					"name": "不影响现金流量的项目（流入）",
					"itemType": 5000050006,
					"cashFlowDirection": 0,
					"accountingStandardsId": 2000020001,
					"lineNum": 40
				  },
				  {
					"id": 41,
					"name": "不影响现金流量的项目（流出）",
					"itemType": 5000050006,
					"cashFlowDirection": 1,
					"accountingStandardsId": 2000020001,
					"lineNum": 41
				  }
				],
				"cashFlowDetails": [
				  {
					"orgId": 4360531293126656,
					"docId": 4564612332160000,
					"docCode": "0001",
					"voucherDate": "2018-04-30 00:00:00.0",
					"details": [
					  {
						"orgId": 4360531293126656,
						"id": 4564612332291072,
						"docId": 4564612332160000,
						"docCode": "0001",
						"voucherDate": "2018-04-30 00:00:00.0",
						"summary": "存款",
						"accountId": 49162,
						"accountCodeAndName": "100201 银行存款-基本户",
						"cashTypeId": 5000020003,
						"directionName": "借",
						"cashFlowDirectionName": "流出",
						"docAmount": 666,
						"canEdit": false
					  },
					  {
						"orgId": 4360531293126656,
						"id": 4564612335502336,
						"docId": 4564612332160000,
						"docCode": "0001",
						"voucherDate": "2018-04-30 00:00:00.0",
						"summary": "存款",
						"accountId": 49030,
						"accountCodeAndName": "1405 库存商品",
						"cashTypeId": 5000020006,
						"directionName": "贷",
						"cashFlowDirectionName": "流入",
						"cashFlowDirection": 1,
						"docAmount": 666,
						"allotAmount": 666,
						"canEdit": true,
						"itemId": 6,
						"itemName": "购买商品、接受劳务支付的现金"
					  }
					]
				  },
				  {
					"orgId": 4360531293126656,
					"docId": 4564780823905280,
					"docCode": "0002",
					"voucherDate": "2018-04-30 00:00:00.0",
					"details": [
					  {
						"orgId": 4360531293126656,
						"id": 4564780823970816,
						"docId": 4564780823905280,
						"docCode": "0002",
						"voucherDate": "2018-04-30 00:00:00.0",
						"summary": "存款",
						"accountId": 49162,
						"accountCodeAndName": "100201 银行存款-基本户",
						"cashTypeId": 5000020003,
						"directionName": "贷",
						"cashFlowDirectionName": "流入",
						"docAmount": 666,
						"canEdit": false
					  },
					  {
						"orgId": 4360531293126656,
						"id": 4564780824888320,
						"docId": 4564780823905280,
						"docCode": "0002",
						"voucherDate": "2018-04-30 00:00:00.0",
						"summary": "存款",
						"accountId": 49044,
						"accountCodeAndName": "1511 长期股权投资",
						"cashTypeId": 5000020004,
						"directionName": "借",
						"cashFlowDirectionName": "流出",
						"cashFlowDirection": 1,
						"docAmount": 666,
						"allotAmount": 666,
						"canEdit": true,
						"itemId": 20,
						"itemName": "投资支付的现金"
					  }
					]
				  }
				]
			}
		},




		// init: (option) => fetch.post('/v1/gl/report/balanceSheet/init', option),
		// query: (option) => fetch.post('/v1/gl/report/balanceSheet/getData', option),
		// print: (option) => fetch.formPost('/v1/gl/report/balanceSheet/print', option),
		// export: (option) => fetch.formPost('/v1/gl/report/balanceSheet/export', option),
		// share: (option) => fetch.post('/v1/gl/report/balanceSheet/share', option),
		// resetArApAccount: () => fetch.post('v1/gl/report/balanceSheet/getParam'),
		// portal: () => fetch.post('/v1/gl/portal/init'),
		// getReportEditFormulaPageInfoForDoc: (option) => fetch.post('/v1/gl/reportTemplate/getReportEditFormulaPageInfoForDoc',option),
		// getSubject: (option) => fetch.post('/v1/gl/account/query', option),
		// getReportEditFormulaPageInfoForAdd: (option) => fetch.post('/v1/gl/reportTemplate/getReportEditFormulaPageInfoForAdd', option),//确定按钮接口
		// getCalMoneyForAddFormula: (option) => fetch.post('/v1/gl/reportTemplate/getCalMoneyForAddFormula', option),//添加按钮接口
	}
}