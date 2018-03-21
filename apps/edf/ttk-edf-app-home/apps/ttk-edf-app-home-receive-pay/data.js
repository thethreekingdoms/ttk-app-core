export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-home-receive-pay',
		children: [{
			name: 'top',
			component: 'Layout',
			// className: 'edfx-app-hot-search-widget-top',
			children: [{
				name: 'header',
				component: 'Layout',
				className: 'ttk-edf-app-home-receive-pay-header',
				children: [{
					name: 'left',
					component: '::div',
					className: 'ttk-edf-app-home-receive-pay-header-left',
					children: [
						{
							name: 'name',
							component: '::span',
							children: '应收应付'
						},{
							name: 'selectTime',
							component: '::div',
							className: 'ttk-edf-app-home-receive-pay-header-left-select',
							
							children: {
								name: 'timeSelect',
								component: 'Select',
								showSearch: false,
								trigger:'click',
								style:{width:'84px'},
								dropdownClassName:'timeSelect',
								// placement:'bottomCenter',
								// children:'2018.03',
								// overlay: {
								// 	name: 'menu',
								// 	component: 'Menu',
								// 	onClick: '{{$handlePeriod}}',
								// 	onChange:`{{function(v){$fieldChange('data.form.period',v.target.value)}}}`,
								// 	children: [
								// 		{
								// 			name: 'item',
								// 			component: 'Menu.Item',
								// 			children:'{{data.periodList && data.periodList[_rowIndex]}}',
								// 			key: '{{data.periodList && data.periodList[_rowIndex]}}',
								// 			_power: 'for in data.periodList'
								// 		}
								// 	]
								// },
								// placeholder: "2018.01",
								// defaultValue: '2233',
								value: '{{data.period?data.period:data.periodList[0]}}',
								onSelect:'{{function(v){$setField("data.period",v)}}}',
								children: 
									{
										name:'option',
										component: 'Select.Option',
										children: '{{data.periodList && data.periodList[_rowIndex]}}',
										key: '{{data.periodList && data.periodList[_rowIndex]}}',
										_power: 'for in data.periodList'
									}
							}
						}
					]
				}, 
				{
					name: 'right',
					component: '::div',
					className:'ttk-edf-app-home-receive-pay-header-right',
					children: {
						name:'btn',
						component:'Radio.Group',
						onChange:`{{function(v){$fieldChange('data.form.value',v.target.value)}}}`,
						// defaultValue:'0',
						children: [
							{
								name:'button1',
								component: 'Radio.Button',
								className: '{{data.type == "chart"?"focusIcon":"unfocusIcon"}}',
								value:'0',
								children:{
									name: 'baobiao',
									component: 'Icon',
									fontFamily: 'edficon',
									className: 'chart',
									type: 'baobiao',
									title: '图表',
									key:'chart',
									// onClick:'{{$getChartOption()}}'
								},
							},{
								name:'button2',
								component: 'Radio.Button',
								className: '{{data.type == "table"?"focusIcon":"unfocusIcon"}}',
								value:'1',
								children:{
									name: 'table',
									component: 'Icon',
									fontFamily: 'edficon',
									className: 'table',
									type: 'biaoge',
									title: '列表',
									key:'table',
									// onClick:'{{$getChartOption()}}'
								},
							},
							{
								name: 'refresh',
								component: 'Icon',
								fontFamily: 'edficon',
								className: 'refresh homeIcon',
								type: 'shuaxin',
								title: '刷新',
								onClick: '{{$refresh}}'
							},
							{
								name: '展开',
								component: 'Icon',
								fontFamily: 'edficon',
								className: 'unfold homeIcon',
								type: '{{data.fold ? "shouhui" : "zhankai"}}',
								title: '{{data.fold ? "收回" : "展开"}}',
								onClick: '{{function(){$fold("receive")}}}'
							},
						]
					}
				}
			]
			},{
				name:'content',
				component: '::div',
				className: 'ttk-edf-app-home-receive-pay-content',
				children: '{{$getContent()}}'
				// children: {
				// 	name: 'item',
				// 	component: '::div',
				// 	className: '{{data.type == "table"?"rctable":"rcchart"}}',
				// 	children: '{{$getContent()}}'
				// }
			}
			
		]
		},]
	}
}

export function getInitState() {
	return {
		data: {
			periodList:[],
			list: [],
			type:'chart',
			period: '',
			form: {
				value: '',
				// period: '22'
			}
			
		}
	}
}