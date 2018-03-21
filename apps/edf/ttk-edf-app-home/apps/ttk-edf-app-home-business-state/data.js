export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-home-business-state',
		children: [{
			name: 'top',
			component: 'Layout',
			// className: 'edfx-app-hot-search-widget-top',
			children: [{
				name: 'header',
				component: 'Layout',
				className: 'ttk-edf-app-home-business-state-header',
				children: [{
					name: 'left',
					component: '::span',
					children: '经营状况'
				}, 
				{
					name: 'right',
					component: '::div',
					className:'ttk-edf-app-home-business-state-header-right',
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
								onClick: '{{function(){$fold("business")}}}'
							},
							// {
							// 	name: '收回',
							// 	component: 'Icon',
							// 	fontFamily: 'edficon',
							// 	className: 'fold homeIcon',
							// 	type: 'shouhui',
							// 	title: '收回',
							// 	style: {display: '{{data.fold == true?"none":"inline-block"}}'},
							// 	onClick: '{{function(){$fold("business")}}}'
							// }
						]
					}
				}
			]
			},{
				name:'content',
				component: '::div',
				className: 'ttk-edf-app-home-business-state-content',
				children: '{{$getContent()}}'
			}
			// {
			// 	name: 'chart',
			// 	component: 'Echarts',
			// 	option: '{{$getChartOption()}}',
			// 	style: { height: '100%', width: '100%' }
			// }
		]
		},]
	}
}

export function getInitState() {
	return {
		data: {
			fold: "",
			type:'chart',
			form:{
				value: '0'
			},
			keys: []
		}
	}
}

export function addThousandsPosition(input, isFixed) {
	// if (isNaN(input)) return null
    if (isNaN(input)) return ''
	let num

	if (isFixed) {
		num = parseFloat(input).toFixed(2)
	} else {
		num = input.toString()
	}
	let regex = /(\d{1,3})(?=(\d{3})+(?:\.))/g

	return num.replace(regex, "$1,")
}