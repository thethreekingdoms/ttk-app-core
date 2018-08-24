export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-notice',
		children: [{
			name: 'demo',
			component: 'Popover',
			className: 'popover',
			popupClassName: 'popover',
			placement: 'bottomRight',
			content: {
				name: 'spin',
				component: 'Spin',
				spinning: '{{data.loading}}',
				delay: 0,
				children: {
					name: 'tabs',
					component: 'Tabs',
					onChange: '{{$onTabChange}}',
					className:'tabs',
					children: [
						{
							name: 'tab1',
							component: 'Tabs.TabPane',
							tab: '{{data.noticedata&&data.noticedata.length>0?"通知("+data.noticedata.length+")":"通知"}}',
							key: '1',
							children: [{
								name: 'tab1content',
								component: '::div',
								_visible:'{{data.noticedata&&data.noticedata.length>0}}',
								children: [
									{
										name: 'split',
										component: '::div',
										className: 'list-split',
										children:
											{
												name: 'list-item',
												component: '::div',
												className: 'list-item',
												onClick: '{{$onItemClick()}}',
												key: "{{data.noticedata && data.noticedata[_rowIndex].id }}",
												children: {
													name: 'list-item-meta',
													component: '::div',
													className: 'list-item-meta',
													children: [
														{
															name: 'avatar',
															component: '::div',
															className: 'list-item-meta-avatar',
															children: {
																name: 'image',
																component: '::span',
																className: 'avatar-image',
																children: {
																	component: '::img',
																	src: '{{data.noticedata[_rowIndex].avatar}}'
																}
															}
														},
														{
															name: 'meta-content',
															component: '::div',
															className: 'list-item-meta-content',
															children: [{
																name: 'title',
																component: '::h4',
																className: 'list-item-meta-title',
																children: '{{data.noticedata[_rowIndex].title}}'
															},
															{
																name: 'description',
																component: '::div',
																className: 'list-item-meta-description',
																children: '{{data.noticedata[_rowIndex].datetime}}'
															}
															]
														}
													]
												},
												_power: 'for in data.noticedata',
											}
									},
									{
										name: 'qc',
										component: '::div',
										className: 'clear',
										onClick: '{{function(){$onClear("noticedata")}}}',
										children: '清除通知',
									}
								]

							},,{
								component:'::div',
								className:'notfound',
								_visible:'{{!data.noticedata||data.noticedata.length==0}}',
								children:[
									{
										component:'::img',
										src:'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
									},
									{
										component:'::div',
										children:'你已查看所有通知'
									}
								]
							}]
						},
						{
							name: "tab2",
							component: 'Tabs.TabPane',
							tab: '{{data.xxData&&data.xxData.length>0?"消息("+data.xxData.length+")":"消息"}}',
							key: '2',
							children:[ {
								name: 'tab2content',
								component: '::div',
								_visible:'{{data.xxData&&data.xxData.length>0}}',
								children: [
									{
										name: 'split',
										component: '::div',
										className: 'list-split',
										children:
											{
												name: 'list-item',
												component: '::div',
												className: 'list-item',
												onClick: '{{$onItemClick()}}',
												key: "{{data.xxData && data.xxData[_rowIndex].id }}",
												children: {
													name: 'list-item-meta',
													component: '::div',
													className: 'list-item-meta',
													children: [
														{
															name: 'avatar',
															component: '::div',
															className: 'list-item-meta-avatar',
															children: {
																name: 'image',
																component: '::span',
																className: 'avatar-image',
																children: {
																	component: '::img',
																	src: '{{data.xxData[_rowIndex].avatar}}'
																}
															}
														},
														{
															name: 'meta-content',
															component: '::div',
															className: 'list-item-meta-content',
															children: [{
																name: 'title',
																component: '::h4',
																className: 'list-item-meta-title',
																children: '{{data.xxData[_rowIndex].title}}'
															},
															{
																name: 'description',
																component: '::div',
																className: 'list-item-meta-description',
																children: {
																	component: '::div',
																	children: [
																		{
																			component: '::div',
																			_visible: '{{data.xxData[_rowIndex].description}}',
																			children: '{{data.xxData[_rowIndex].description}}'
																		},
																		{
																			component: '::div',
																			children: '{{data.xxData[_rowIndex].datetime}}'
																		}
																	]
																}


															}
															]
														}
													]
												},
												_power: 'for in data.xxData',
											}
									},
									{
										name: 'qc',
										component: '::div',
										className: 'clear',
										onClick: '{{function(){$onClear("xxData")}}}',
										children: '清除消息',
									}
								]
							},
							,{
								component:'::div',
								className:'notfound',
								_visible:'{{!data.xxData||data.xxData.length==0}}',
								children:[
									{
										component:'::img',
										src:'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
									},
									{
										component:'::div',
										children:'您已读完所有消息'
									}
								]
							}]
						},
						{
							name: 'tab3',
							component: "Tabs.TabPane",
							tab: '{{data.dbData&&data.dbData.length>0?"待办("+data.dbData.length+")":"待办"}}',
							key: '3',
							children: [{
								name: 'tab3content',
								component: '::div',
								_visible:'{{data.dbData&&data.dbData.length>0}}',
								children: [
									{
										name: 'split',
										component: '::div',
										className: 'list-split',
										children:
											{
												name: 'list-item',
												component: '::div',
												className: 'list-item',
												onClick: '{{$onItemClick()}}',
												key: "{{data.dbData && data.dbData[_rowIndex].id}}",
												children: {
													name: 'list-item-meta',
													component: '::div',
													className: 'list-item-meta',
													children: [
													//	{
														//	name: 'avatar',
														//	component: '::div',
														//	className: 'list-item-meta-avatar',
														//	_visible: '{{data.dbData[_rowIndex].avatar}}',
														//	children:''
															// children: {
															// 	name: 'image',
															// 	component: '::span',
															// 	className: 'avatar-image',
															// 	children: {
															// 		component: '::img',
															// 		_visible: '{{data.dbData[_rowIndex].avatar}}',
															// 		src: '{{data.dbData[_rowIndex].avatar}}'
															// 	}
															// }
													//	},
														{
															name: 'meta-content',
															component: '::div',
															className: 'list-item-meta-content',
															children: [{
																name: 'title',
																component: '::h4',
																className: 'list-item-meta-title',
																_visible: '{{data.dbData[_rowIndex].title}}',
																children: {
																	component:'::div',
																	children:[
																		{
																			component:'::span',
																			children:'{{data.dbData[_rowIndex].title}}'},
																		{
																		component:'::div',
																		className:'extra',
																		children:{
																			component:'::div',
																			className:'tag',
																			children:'{{data.dbData[_rowIndex].extra}}'
																		}}
																	]
																		
																	
																}
															},
															{
																name: 'description',
																component: '::div',
																className: 'list-item-meta-description',
																children: {
																	component: '::div',
																	children: [
																		{
																			component: '::div',
																			_visible: '{{data.dbData[_rowIndex].description}}',
																			children: '{{data.dbData[_rowIndex].description}}'
																		},
																		{
																			component: '::div',
																			children: '{{data.dbData[_rowIndex].datetime}}'
																		}
																	]
																}


															}
															]
														}
													]
												},
												_power: 'for in data.dbData',
											}
									},
									{
										name: 'qc',
										component: '::div',
										className: 'clear',
										onClick: '{{function(){$onClear("dbData")}}}',
										children: '清除待办',
									}
								]
							},{
								component:'::div',
								className:'notfound',
								_visible:'{{!data.dbData||data.dbData.length==0}}',
								children:[
									{
										component:'::img',
										src:'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg'
									},
									{
										component:'::div',
										children:'你已完成所有待办'
									}
								]
							}]
						}
					]
				}
			},
			popupClassName: '',
			trigger: "click",
			arrowPointAtCenter: true,
			popupAlign: true,
			onVisibleChange: '',
			children: {
				name: 'span',
				component: '::span',
				className:'noticeButton',
				children: {
					name: 'badge',
					component: 'Badge',
					offset:[0,0],
					count:'{{data.noticedata&&data.xxData&&data.dbData&&(data.noticedata.length+data.xxData.length+data.dbData.length)}}',
					children: {
						name: 'icon',
						component: 'Icon',
						type: 'bell',
						className: 'icon'
					}
				}
			}
		}]
	}
}

export function getInitState() {
	return {
		data: {
			
		}
	}
}