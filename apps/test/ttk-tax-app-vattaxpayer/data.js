const NOSAVE = -1  //未保存
const NODECLARE = 0//已保存 未申报
const DECLARE = 1//已申报
const PAID = 2//已缴款
const OVERDUE = true //OVERDUE 为true过期
export function getMeta() {
	return {
		name: 'root',
		component: 'div',
		className: 'ttk-tax-app-vatTaxpayer',
		children: [{
			name: 'help',
			component: 'Button',
			className: 'ttk-tax-app-vatTaxpayer-help',
			onClick: '{{$showHelp}}',
			_visible: '{{!data.showHelp}}',
			style: {
				position: 'absolute',
				top: '14px',
			},
			children: [{
				name: 'help',
				component: 'Icon',
				type: 'bangzhutishi',
				className: 'help',
				fontFamily: 'edficon',
			}, {
				name: 'name',
				component: 'span',
				children: '填表说明'
			}]
		}
		,{
			name: 'refresh1',
			component: 'Button',
			title: '刷新',
			className: 'refresh-btn',
			_visible: '{{!data.showHelp}}',
			onClick: '{{$refresh}}',
			style: {
				marginLeft: '96px',
				position: 'absolute',
				top: '14px',
				left: '30px',
				zIndex: 999
			},
			children: [
				{
					name: 'refresh-icon',
					component: 'Icon',
					fontFamily: 'edficon',
					className: 'refresh homeIcon',
					type: 'shuaxin',
					title: '刷新',
				}
			]
		},{
			name: 'back',
			component: 'div',
			style: {
				fontSize: '12px',
				position: 'absolute',
				top: '56px',
				right: '20px',
				zIndex: 999
			},
			children: [{
				name: 'text',
				component: 'a',
				onClick: '{{$updateDeclareItem}}',
				children: [{
					name: 'icon',
					component: 'Icon',
					className: 'download-icon',
					fontFamily: 'edficon',
					type: 'xuanzebiaodan',
				}, {
					name: 'text',
					component: 'span',
					children: '选择表单'
				}]
			}]
		}, {
			name: 'wraper',
			className: 'ttk-tax-app-vatTaxpayer-wraper',
			component: 'SplitPanel',
			split: 'vertical',			
			minSize: '{{data.showHelp ? "120" : "0"}}',
            maxSize: 500,
			// defaultSize: 150,
            primary: "first",
            allowResize: true,
			resizerStyle: {
				width: 0,
				cursor: 'e-resize'
			},
			pane1Style: {
				// width: 0
				float: 'left'
			},
			pane2Style: {
				overflowY: 'scroll',
				height: '100%',
			},
			children: [
				{
					name: 'treeLeft',
					component: 'div',
					className: 'ttk-tax-app-vatTaxpayer-wraper-treeLeft',
					children: [{
						name: 'tbsm',
						component: 'div',
						className: 'ttk-tax-app-vatTaxpayer-wraper-treeLeft-top',
						children: [{
							name: 'help',
							component: 'Icon',
							type: 'bangzhutishi',
							className: 'help',
							fontFamily: 'edficon',
						}, {
							name: 'name',
							component: 'span',
							children: '填表说明',
							style: {
								display: 'table-cell',
								verticalAlign: 'middle'
							}
						}, {
							name: 'close',
							component: 'Icon',
							className: 'close',
							type: 'guanbi',
							fontFamily: 'edficon',
							onClick: '{{$closeHelp}}'
						}]
					},{
						name: 'FillStatementCollapse',
						component: 'Collapse',
						children: '{{$renderStatement()}}'
					}]
				}, {
				name: 'rightDiv',
				component: 'div',
				className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv',
				children: [{
					name: 'rightTable',
					component: 'div',
					className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable',
					children:[{
						name: 'formHeadDiv',
						component: 'div',
						className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-formHeadDiv',
						children:[
							/*{
								component: 'div',
								style: {
									float: 'left'
								},
								children: [
									{
										name: 'refresh',
										component: 'Button',
										title: '刷新',
										className: 'refresh-btn',
										children: [
											{
												name: 'refresh-icon',
												component: 'Icon',
												fontFamily: 'edficon',
												className: 'refresh homeIcon',
												type: 'shuaxin',
												title: '刷新',
											}
										],
										onClick: '{{$refresh}}'
									}
								]
							},*/
							{
								component: 'div',
								className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-formHeadDiv-title',
								children: '增值税纳税申报表'
							},{
								component: 'div',
								style: {
									float: 'right'
								},
								children: [
									{
										name: 'back',
										component: 'a',
										_visible: '{{data.params.source!="entrance"&&(data.appId+"")=="105"}}',										
										onClick: '{{$handleBack}}',
										style: {
											fontSize: '12px',
											position: 'relative',
											top: '-5px',
										},
										children: '返回清册'
									},
									{
										name: 'declare',
										component: 'Button',
										type:'primary',
										className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-declareBut',
										children: '申报',
										// _visible: '{{!(!data.hasReadSJInfo || data.isDeclare || data.overdue)}}',
										_visible: '{{!(!data.hasReadSJInfo || data.isDeclare)}}',		
										disabled: '{{$getIsDisabled()}}',//2019月报置灰																					
										onClick: '{{$submit}}'
									},{
										name: 'save',
										component: 'Button',
										className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-saveBut',
										children: '保存',
										_visible: '{{!(!data.isCanModify && data.isDeclare)}}',
										disabled: '{{$getIsDisabled()}}',//2019月报置灰																															
										onClick: '{{$save}}'
									}
									// ,{
									// 	name: 'selectTable',
									// 	className: 'selectTable',
									// 	component: 'Button',
									// 	onClick: '{{$updateDeclareItem}}',
									// 	children: '选择表单',
									// }
									,{
										name: 'excel',
										component: 'Button',
										className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-excel',
										onClick: '{{$autoGetData}}',	
										_visible: '{{$rptGetDataVisible(!(!data.isCanModify && data.isDeclare))}}',										
										children: '取数',
										disabled: '{{$getIsDisabled()}}',//2019月报置灰																															
									},
									{
										name: 'init',
										component: 'Button',
										className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-InitBut',
										children: '初始化',
										// _visible: '{{!(!data.hasReadSJInfo || data.isDeclare || data.overdue)}}',
										_visible: '{{!(!data.hasReadSJInfo || data.isDeclare)}}',
										disabled: '{{$getIsDisabled()}}',//2019月报置灰																															
										onClick: '{{function(){$initialization(undefined)}}}'
									},{
										name: 'invoice',
										component: 'Button',
										className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-invoice',
										onClick: '{{$openInvoiceSummary}}',	
										// _visible: '{{$sumInvoiceVisible(data.appKey=="10005005" || data.appKey=="10005004" || data.appKey=="10005008")}}',
										_visible: '{{$sumInvoiceVisible(true)}}',	
										disabled: '{{$getIsDisabled()}}',//2019月报置灰																															
										children: '发票汇总',
									},
									{
										name: 'daochu',
										className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-daochuDropDown',		
										component: 'Dropdown',
										disabled: '{{$getIsDisabled()}}',//2019月报置灰																															
										overlay: {
											name: 'menu',
											component: 'Menu',
											className: '',
											onClick: '{{$download}}',
											children: [{
												name: 'PDF',
												component: 'Menu.Item',
												key: 'PDF',
												disabled: '{{$getIsDisabled()}}',//2019月报置灰																																	
												children: '预览PDF'
												
											}, {
												name: 'XML',
												component: 'Menu.Item',
												key: 'XML',
												disabled: '{{$getIsDisabled()}}',//2019月报置灰																																	
												children: '下载报盘'
											}, {
												name: 'PDFDOWNLOAD',
												component: 'Menu.Item',
												key: 'PDFDOWNLOAD',
												disabled: '{{$getIsDisabled()}}',//2019月报置灰																																	
												children: '下载PDF'
											}]
										},
										children: {
											name: 'daochubtn',
											component: 'Button',
											disabled: '{{$getIsDisabled()}}',//2019月报置灰																																
											className: 'daochubtn',
											children: [{
												component: 'Icon',
												fontFamily: 'edficon',
												className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-daochu',
												type: 'daochu',
												disabled: '{{$getIsDisabled()}}',//2019月报置灰																																
												title: '导出',
											}, {
												name: 'down',
												component: 'Icon',
												className: 'ttk-tax-app-vatTaxpayer-daochubtn-down',
												disabled: '{{$getIsDisabled()}}',//2019月报置灰																																
												type: 'down'
											}]
										}
									}
								]
							}
								
						]
					},{
						name: 'tabs',
						component: 'Tabs',
						activeKey: '{{data.other.activeTabKey}}',
						defaultActiveKey: 'zzssyyxgmnsr',
						onChange: '{{$tabChange}}',
						children: '{{$renderTabs()}}'
					},{
						name: 'apps',
                        component: 'div',
                        className: 'ttk-tax-app-vatTaxpayer-wraper-rightDiv-rightTable-formContentDiv',
						children: [  
                            '{{$renderTable()}}',
                        ]
					}]
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			state: -1,
			showHelp: false,  //是否现在填表说明
			isDeclare: false,
			tableNameMap: {
				
			},
			curTab: 'zzssyyxgmnsr',
			isCanModify: true, 	//单元格是否可填
			isInit: true,	//是否需要初始化
			hasReadSJInfo: true,	//读取企业信息是否成功
			overdue: false, 	//是否逾期未申报
			button: {	//防重复提交
				init: true,
				save: true,
				declare: true,
				getData: true
			},
            openTabs: {
                zzssyyxgmnsr: 'ttk-tax-app-zzssyyxgmnsr'
            },
            openTabName: 'zzssyyxgmnsr',
            failList: [],
            other: {
				activeTabKey: 'zzssyyxgmnsr',
				activeMenuKey: 'zzssyyxgmnsr',
				treeList:[{
					key: 'zzssyyxgmnsr',
					name: '增值税纳税申报表',
					projectReportCode: 'BDA0610611',				
					statement: [
						{key: '1001',name: '填表说明', contnet: [
							'<b>第1栏“应征增值税不含税销售额（3%征收率）”：</b>填写本期销售货物及劳务、发生应税行为适用3%征收率的不含税销售额，不包括应税行为适用5%征收率的不含税销售额、销售使用过的固定资产和销售旧货的不含税销售额、免税销售额、出口免税销售额、查补销售额。纳税人发生适用3%征收率的应税行为且有扣除项目的，本栏填写扣除后的不含税销售额，与当期《增值税纳税申报表（小规模纳税人适用）附列资料》第8栏数据一致。',
							'<b>第2栏“税务机关代开的增值税专用发票不含税销售额”：</b>填写税务机关代开的增值税专用发票销售额合计。',
							'<b>第3栏“税控器具开具的普通发票不含税销售额”：</b>填写税控器具开具的货物及劳务、应税行为的普通发票金额换算的不含税销售额。',
							'<b>第4栏“应征增值税不含税销售额（5%征收率）”：</b>填写本期发生应税行为适用5%征收率的不含税销售额。纳税人发生适用5%征收率应税行为且有扣除项目的，本栏填写扣除后的不含税销售额，与当期《增值税纳税申报表（小规模纳税人适用）附列资料》第16栏数据一致。',
							'<b>第5栏“税务机关代开的增值税专用发票不含税销售额”：</b>填写税务机关代开的增值税专用发票销售额合计。',
							'<b>第6栏“税控器具开具的普通发票不含税销售额”：</b>填写税控器具开具的发生应税行为的普通发票金额换算的不含税销售额。',
							'<b>第7栏“销售使用过的固定资产不含税销售额”：</b>填写销售自己使用过的固定资产（不含不动产，下同）和销售旧货的不含税销售额，销售额=含税销售额/（1+3%）。',
							'<b>第8栏“税控器具开具的普通发票不含税销售额”：</b>填写税控器具开具的销售自己使用过的固定资产和销售旧货的普通发票金额换算的不含税销售额。',
							'<b>第9栏“免税销售额”：</b>填写销售免征增值税的货物及劳务、应税行为的销售额，不包括出口免税销售额。应税行为有扣除项目的纳税人，填写扣除之前的销售额。',
							'<b>第10栏“小微企业免税销售额”：</b>填写符合小微企业免征增值税政策的免税销售额，不包括符合其他增值税免税政策的销售额。个体工商户和其他个人不填写本栏次。',
							'<b>第11栏“未达起征点销售额”：</b>填写个体工商户和其他个人未达起征点（含支持小微企业免征增值税政策）的免税销售额，不包括符合其他增值税免税政策的销售额。本栏次由个体工商户和其他个人填写。',
							'<b>第12栏“其他免税销售额”：</b>填写销售免征增值税的货物及劳务、应税行为的销售额，不包括符合小微企业免征增值税和未达起征点政策的免税销售额。',
							'<b>第13栏“出口免税销售额”：</b>填写出口免征增值税货物及劳务、出口免征增值税应税行为的销售额。应税行为有扣除项目的纳税人，填写扣除之前的销售额。',
							'<b>第14栏“税控器具开具的普通发票销售额”：</b>填写税控器具开具的出口免征增值税货物及劳务、出口免征增值税应税行为的普通发票销售额。',
							'<b>第15栏“本期应纳税额”：</b>填写本期按征收率计算缴纳的应纳税额。',
							'<b>第16栏“本期应纳税额减征额”：</b>填写纳税人本期按照税法规定减征的增值税应纳税额。包含可在增值税应纳税额中全额抵减的增值税税控系统专用设备费用以及技术维护费，可在增值税应纳税额中抵免的购置税控收款机的增值税税额。当本期减征额小于或等于第15栏“本期应纳税额”时，按本期减征额实际填写；当本期减征额大于第15栏“本期应纳税额”时，按本期第15栏填写，本期减征额不足抵减部分结转下期继续抵减。',
							'<b>第17栏“本期免税额”：</b>填写纳税人本期增值税免税额，免税额根据第9栏“免税销售额”和征收率计算。',
							'<b>第18栏“小微企业免税额”：</b>填写符合小微企业免征增值税政策的增值税免税额，免税额根据第10栏“小微企业免税销售额”和征收率计算',
							'<b>第19栏“未达起征点免税额”：</b>填写个体工商户和其他个人未达起征点（含支持小微企业免征增值税政策）的增值税免税额，免税额根据第11栏“未达起征点销售额”和征收率计算。',
							'<b>第21栏“本期预缴税额”：</b>填写纳税人本期预缴的增值税额，但不包括查补缴纳的增值税额',
							'<b>第22栏“本期应补（退）税额”：</b>根据公式自动计算应缴纳的税额。'
						]},
						{key: '1002',name: '政策法规', contnet:[
						]},
						{key: '1003',name: '税会差异', contnet:[
						]},
					],
                    errorNum: 5
				},{
					key: 'zzsxgmflzl',
					name: '增值税纳税申报表附列资料',
					projectReportCode: 'BDA0610343',				
					statement: [
						{key: '1001',name: '填表说明', contnet: [
							'<b>第1栏“期初余额”：</b>填写适用3%征收率的应税行为扣除项目上期期末结存的金额，试点实施之日的税款所属期填写“0',
							'<b>第2栏“本期发生额”：</b>填写本期取得的按税法规定准予扣除的适用3%征收率的应税行为扣除项目金额。',
							'<b>第3栏“本期扣除额”：</b>填写适用3%征收率的应税行为扣除项目本期实际扣除的金额。第3栏“本期扣除额”≤第1栏“期初余额”+第2栏“本期发生额”之和，且第3栏“本期扣除额”≤第5栏“全部含税收入（适用3%征收率）”。',
							'<b>第4栏“期末余额”：</b>填写适用3%征收率的应税行为扣除项目本期期末结存的金额。',
							'<b>第5栏“全部含税收入（适用3%征收率）”：</b>填写纳税人适用3%征收率的应税行为取得的全部价款和价外费用数额。',
							'<b>第6栏“本期扣除额”：</b>填写本附列资料第3栏“本期扣除额”的数据。第6栏“本期扣除额”=第3栏“本期扣除额”。',
							'<b>第7栏“含税销售额”：</b>填写适用3%征收率的应税行为的含税销售额。第7栏“含税销售额”=第5栏“全部含税收入（适用3%征收率）”-第6栏“本期扣除额”。',
							'<b>第8栏“不含税销售额”：</b>填写适用3%征收率的应税行为的不含税销售额。第8栏“不含税销售额”=第7栏“含税销售额”÷1.03，与《增值税纳税申报表（小规模纳税人适用）》第1栏“应征增值税不含税销售额（3%征收率）”“本期数”“服务、不动产和无形资产”栏数据一致。',
							'<b>第9栏“期初余额”：</b>填写适用5%征收率的应税行为扣除项目上期期末结存的金额，试点实施之日的税款所属期填写“0”。',
							'<b>第10栏“本期发生额”：</b>填写本期取得的按税法规定准予扣除的适用5%征收率的应税行为扣除项目金额。',
							'<b>第11栏“本期扣除额”：</b>填写适用5%征收率的应税行为扣除项目本期实际扣除的金额。第11栏“本期扣除额”≤第9栏“期初余额”+第10栏“本期发生额”之和，且第11栏“本期扣除额”≤第13栏“全部含税收入（适用5%征收率）”。',
							'<b>第12栏“期末余额”：</b>填写适用5%征收率的应税行为扣除项目本期期末结存的金额。',
							'<b>第13栏“全部含税收入（适用5%征收率）”：</b>填写纳税人适用5%征收率的应税行为取得的全部价款和价外费用数额。',
							'<b>第14栏“本期扣除额”：</b>填写本附列资料第11栏“本期扣除额”的数据。第14栏“本期扣除额”=第11栏“本期扣除额”。',
							'<b>第15栏“含税销售额”：</b>填写适用5%征收率的应税行为的含税销售额。第15栏“含税销售额”=第13栏“全部含税收入（适用5%征收率）”-第14栏“本期扣除额”。',
							'<b>第16栏“不含税销售额”：</b>填写适用5%征收率的应税行为的不含税销售额。第16栏“不含税销售额”=第15栏“含税销售额”÷1.05，与《增值税纳税申报表（小规模纳税人适用）》第4栏“应征增值税不含税销售额（5%征收率）”“本期数”“服务、不动产和无形资产”栏数据一致。'
						]},
						{key: '1002',name: '政策法规', contnet:[
						]},
						{key: '1003',name: '税会差异', contnet:[
						]},
					],
                    errorNum: 0
				},{
					key: 'zzsjmssbmxb',
					name: '增值税减免税申报明细表',
					projectReportCode: 'BDA0610758xgm',				
					statement: [
						{key: '1001',name: '填表说明', contnet: [
							'<b>一、减税项目</b>  由本期按照税收法律、法规及国家有关税收规定享受减征（包含税额式减征、税率式减征）增值税优惠的纳税人填写',
							'<b>（一）“减税性质代码及名称”：</b>根据国家税务总局最新发布的《减免性质及分类表》所列减免性质代码、项目名称填写。同时有多个减征项目的，应分别填写。',
							'<b>（二）第1列“期初余额”：</b>填写应纳税额减征项目上期“期末余额”，为对应项目上期应抵减而不足抵减的余额。',
							'<b>（三）第2列“本期发生额”：</b>填写本期发生的按照规定准予抵减增值税应纳税额的金额。',
							'<b>（四）第3列“本期应抵减税额”：</b>填写本期应抵减增值税应纳税额的金额。本列按表中所列公式填写。',
							'<b>（五）第4列“本期实际抵减税额”：</b>填写本期实际抵减增值税应纳税额的金额。本列各行≤第3列对应各行。小规模纳税人填写时，第1行“合计”本列数=主表第16行“本期应纳税额减征额”“本期数”。',
							'<b>（六）第5列“期末余额”：</b>按表中所列公式填写。',
							'<b>二、免税项目</b>  由本期按照税收法律、法规及国家有关税收规定免征增值税的纳税人填写。仅享受小微企业免征增值税政策或未达起征点的小规模纳税人不需填写，即小规模纳税人申报表主表第9栏“其他免税销售额”“本期数”无数据时，不需填写本栏。',
							'<b>（一）“免税性质代码及名称”：</b>根据国家税务总局最新发布的《减免性质及分类表》所列减免性质代码、项目名称填写。同时有多个免税项目的，应分别填写。',
							'<b>（二）“出口免税”</b>填写纳税人本期按照税法规定出口免征增值税的销售额，但不包括适用免、抵、退税办法出口的销售额。小规模纳税人不填写本栏。',
							'<b>（三）第1列“免征增值税项目销售额”：</b>填写纳税人免税项目的销售额。免税销售额按照有关规定允许从取得的全部价款和价外费用中扣除价款的，应填写扣除之前的销售额。小规模纳税人填写时，本列“合计”等于主表第9行“其他免税销售额”“本期数”。本列“合计”等于主表第12行“其他免税销售额”“本期数”。',
							'<b>（四）第2列“免税销售额扣除项目本期实际扣除金额”：</b>免税销售额按照有关规定允许从取得的全部价款和价外费用中扣除价款的，据实填写扣除金额；无扣除项目的，本列填写“0”。',
							'<b>（五）第3列“扣除后免税销售额”: </b>按表中所列公式填写。',
							'<b>（六）第4列“免税销售额对应的进项税额”：</b>本期用于增值税免税项目的进项税额。小规模纳税人不填写本列。',
						]},
						{key: '1002',name: '政策法规', contnet:[
						]},
						{key: '1003',name: '税会差异', contnet:[
						]},
					],
                    errorNum: 0
				},{
					key: 'zzsxgmxsbdcqkb',
					name: '销售不动产情况表',
					projectReportCode: 'BDA0610758xgm',				
					statement: [
						{key: '1001',name: '填表说明', contnet: [
						]},
						{key: '1002',name: '政策法规', contnet:[
						]},
						{key: '1003',name: '税会差异', contnet:[
						]},
					],
                    errorNum: 0
				},{
					key: 'zzsxgmkcxmqd',
					name: '应税服务扣除项目清单',
					projectReportCode: 'BDA0610758xgm',				
					statement: [
						{key: '1001',name: '填表说明', contnet: [
						]},
						{key: '1002',name: '政策法规', contnet:[
						]},
						{key: '1003',name: '税会差异', contnet:[
						]},
					],
                    errorNum: 0
				},{
					key: 'zzsxgmfjssb',
					name: '附加税（费）申报信息',
					projectReportCode: 'BDA0610758xgm',				
					statement: [
						{key: '1001',name: '填表说明', contnet: [
						]},
						{key: '1002',name: '政策法规', contnet:[
						]},
						{key: '1003',name: '税会差异', contnet:[
						]},
					],
                    errorNum: 0
				}],
                FillStatement: [
					{key: '1001',name: '填表说明', contnet: [
						'1.本表及填写说明所称“货物”，是指增值税的应税货物；本表及填写说明所称“劳务”，是指增值税的应税加工、修理、修配劳务；本表及填写说明所称“服务、不动产和无形资产”，是指销售服务、不动产和无形资产（以下简称应税行为）；本表及填写说明所称“扣除项目”，是指纳税人发生应税行为，在确定销售额时，按照有关规定允许其从取得的全部价款和价外费用中扣除价款的项目',
						'2.本表“货物及劳务”与“服务、不动产和无形资产”各项目应分别填写，“税款所属期”是指纳税人申报的增值税应纳税额的所属时间，应填写具体的起止年、月、日，“纳税人识别号”栏，填写纳税人的税务登记证件号码。“纳税人名称”栏，填写纳税人名称全称',
						'3.第1栏“应征增值税不含税销售额（3%征收率）”：填写本期销售货物及劳务、发生应税行为适用3%征收率的不含税销售额，不包括应税行为适用5%征收率的不含税销售额、销售使用过的固定资产和销售旧货的不含税销售额、免税销售额、出口免税销售额、查补销售额。',
						'4.纳税人发生适用3%征收率的应税行为且有扣除项目的，本栏填写扣除后的不含税销售额，与当期《增值税纳税申报表（小规模纳税人适用）附列资料》第8栏数据一致。',
						'5.第2栏“税务机关代开的增值税专用发票不含税销售额”：填写税务机关代开的增值税专用发票销售额合计。',
						'6.第3栏“税控器具开具的普通发票不含税销售额”：填写税控器具开具的货物及劳务、应税行为的普通发票金额换算的不含税销售额。',
						'7.第4栏“应征增值税不含税销售额（5%征收率）”：填写本期发生应税行为适用5%征收率的不含税销售额。纳税人发生适用5%征收率应税行为且有扣除项目的，本栏填写扣除后的不含税销售额，与当期《增值税纳税申报表（小规模纳税人适用）附列资料》第16栏数据一致。',
						'8.第5栏“税务机关代开的增值税专用发票不含税销售额”：填写税务机关代开的增值税专用发票销售额合计。',
						'9.第6栏“税控器具开具的普通发票不含税销售额”：填写税控器具开具的发生应税行为的普通发票金额换算的不含税销售额。',
						'10.第7栏“销售使用过的固定资产不含税销售额”：填写销售自己使用过的固定资产（不含不动产，下同）和销售旧货的不含税销售额，销售额=含税销售额/（1+3%）。',
						'11.第8栏“税控器具开具的普通发票不含税销售额”：填写税控器具开具的销售自己使用过的固定资产和销售旧货的普通发票金额换算的不含税销售额。',
						'12.第9栏“免税销售额”：填写销售免征增值税的货物及劳务、应税行为的销售额，不包括出口免税销售额。应税行为有扣除项目的纳税人，填写扣除之前的销售额。',
						'13.第10栏“小微企业免税销售额”：填写符合小微企业免征增值税政策的免税销售额，不包括符合其他增值税免税政策的销售额。个体工商户和其他个人不填写本栏次。',
						'14.第11栏“未达起征点销售额”：填写个体工商户和其他个人未达起征点（含支持小微企业免征增值税政策）的免税销售额，不包括符合其他增值税免税政策的销售额。本栏次由个体工商户和其他个人填写。',
						'15.第12栏“其他免税销售额”：填写销售免征增值税的货物及劳务、应税行为的销售额，不包括符合小微企业免征增值税和未达起征点政策的免税销售额。',
						'16.第13栏“出口免税销售额”：填写出口免征增值税货物及劳务、出口免征增值税应税行为的销售额。应税行为有扣除项目的纳税人，填写扣除之前的销售额。',
						'17.第14栏“税控器具开具的普通发票销售额”：填写税控器具开具的出口免征增值税货物及劳务、出口免征增值税应税行为的普通发票销售额。',
						'18.第15栏“本期应纳税额”：填写本期按征收率计算缴纳的应纳税额。',
						'19.第16栏“本期应纳税额减征额”：填写纳税人本期按照税法规定减征的增值税应纳税额。包含可在增值税应纳税额中全额抵减的增值税税控系统专用设备费用以及技术维护费，可在增值税应纳税额中抵免的购置税控收款机的增值税税额。当本期减征额小于或等于第15栏“本期应纳税额”时，按本期减征额实际填写；当本期减征额大于第15栏“本期应纳税额”时，按本期第15栏填写，本期减征额不足抵减部分结转下期继续抵减。',
						'20.第18栏“小微企业免税额”：填写符合小微企业免征增值税政策的增值税免税额，免税额根据第10栏“小微企业免税销售额”和征收率计算',
						'21.第21栏“本期预缴税额”：填写纳税人本期预缴的增值税额，但不包括查补缴纳的增值税额',
						'22.第22栏“本期应补（退）税额”：根据公式自动计算应缴纳的税额。',
					]},
					{key: '1002',name: '政策法规', contnet:[
					]},
					{key: '1003',name: '税会差异', contnet:[
					]},
				],
			},
            tName: 'zzssyyxgmnsr',//当前表名  
            tFormulaList: [//计算公式
            ],
		}
	}
}