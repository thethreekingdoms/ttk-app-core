export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-home',
		children: [{
			name: 'conf',
			component: '::div',
			className: 'ttk-edf-app-home-confBtn',
			_visible: false,
			onClick: '{{$panelControl}}',
			children: [{
				name: 'icon',
				component: 'Icon',
				fontFamily: 'edficon',
				type: 'zhuomianpeizhi'
			}, {
				name: 'conf',
				component: '::span',
				children: '桌面配置'

			}]
		}, {
			name: 'panel',
			className: '{{data.animation == "in" ? "ttk-edf-app-home-panel animated slideInRight" : "ttk-edf-app-home-panel animated slideOutRight"}}',
			component: '::div',
			style: {display: "{{data.showPanel}}"},
			onAnimationEnd: "{{$animationEnd}}",
			children: [{
				name: 'shade',
				className: 'ttk-edf-app-home-panel-shade',
				component: '::div',
				onClick: '{{$hidePanel}}'
			},{
				name: 'container',
				component: '::div',
				className: 'ttk-edf-app-home-panel-container',
				children: [{
					name: 'title',
					component: '::div',
					className: 'ttk-edf-app-home-panel-title',
					children: [{
						name: 'icon',
						component: 'Icon',
						type: 'desktop'
					}, {
						name: 'text',
						component: '::span',
						children: '配置首页展示面板'
					}]
				}, {
					name: 'main',
					className: 'ttk-edf-app-home-panel-main',
					component: '::div',
					children: [{
						name: 'item1',
						component: '::div',
						children: [{
							name: 'title',
							className: 'ttk-edf-app-home-panel-main-title',
							component: '::div',
							children: '工作提示'
						}, {
							name: 'options',
							className: 'ttk-edf-app-home-panel-main-options',
							component: '::div',
							children: [{
								name: 'option1',
								component: 'Checkbox',
								children: '待处理订单'
							}, {
								name: 'option2',
								component: 'Checkbox',
								children: '待处理退单'
							}]
						}]
					}, {
						name: 'item1',
						component: '::div',
						children: [{
							name: 'title',
							className: 'ttk-edf-app-home-panel-main-title',
							component: '::div',
							children: '工作提示'
						}, {
							name: 'options',
							className: 'ttk-edf-app-home-panel-main-options',
							component: '::div',
							children: [{
								name: 'option1',
								component: 'Checkbox',
								children: '待处理订单'
							}, {
								name: 'option2',
								component: 'Checkbox',
								children: '待处理退单'
							}]
						}]
					}, {
						name: 'item1',
						component: '::div',
						children: [{
							name: 'title',
							className: 'ttk-edf-app-home-panel-main-title',
							component: '::div',
							children: '工作提示'
						}, {
							name: 'options',
							className: 'ttk-edf-app-home-panel-main-options',
							component: '::div',
							children: [{
								name: 'option1',
								component: 'Checkbox',
								children: '待处理订单'
							}, {
								name: 'option2',
								component: 'Checkbox',
								children: '待处理退单'
							}]
						}]
					}]
				}, {
					name: 'btns',
					className: 'ttk-edf-app-home-panel-btns',
					component: '::div',
					style: {position: 'relative', height: '80px'},
					children: {
						name: 'container',
						component: '::div',
						style: {position: 'absolute', left:'50%',transform: 'translateX(-50%)'},
						children: [{
							name: 'btn1',
							component: 'Button',
							style: {width: '70px',height: '30px'},
							type: 'primary',
							children: '确定',
							onClick: '{{$hidePanel}}'
						}, {
							name: 'btn2',
							component: 'Button',
							style: {width: '70px',height: '30px'},
							children: '取消',
							onClick: '{{$hidePanel}}'
						}]
					}
				}]
			}]
		}, {
			name: 'content',
			component: '::div',

			className: 'ttk-edf-app-home-content',
			//
			onComponentDidMount: '{{$eventBind}}',
			children: [{
				name: 'item10',
				component: '::div',
				_visible: '{{!data.zoom}}',
				style: "{{data.ratio == 3 ? $calculateWidth(2) : $calculateWidth(2)}}",
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'ttk-edf-app-home-voucher',
						data: "{{data.glCertificate}}",
						periodList: "{{data.periodList}}"
					}]
				}
			},{
				name: 'item11',
				component: '::div',
				_visible: '{{!data.zoom}}',
				style: "{{data.ratio == 3 ? $calculateWidth(2) : $calculateWidth(2)}}",
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'ttk-edf-app-home-capital-account',
						data: "{{data.capitalAccount}}",
						periodList: "{{data.periodList}}"
					}]
				}
			},{
				name: 'item8',
				component: '::div',
				_visible: '{{data.zoomValue == "business"&&data|| data.zoomValue == undefined&&data? true : false}}',
				style: "{{data.ratio == 3 ? $calculateWidth(2) : $calculateWidth(2)}}",
				className:'{{data.zoom?"zoom ttk-edf-app-home-business":"ttk-edf-app-home-business"}}',
				children: [{
					name: 'card',
					component: 'Card',
					// title: '经营状况',
					children: [{
						name: 'app',
						component: 'AppLoader',
						callback:'{{$zoom}}',
						appName: 'ttk-edf-app-home-business-state',
						data: '{{data.operatingSituationMap}}'
					}]
				}]
			},
			{
				name: 'item9',
				component: '::div',
				_visible: '{{data.zoomValue == "receive"&&data || data.zoomValue == undefined &&data? true: false}}',
				className:'{{data.zoom?"zoom ttk-edf-app-home-receive":"ttk-edf-app-home-receive"}}',
				style: "{{data.ratio == 3 ? $calculateWidth(2) : $calculateWidth(2)}}",
				children: [{
					name: 'card',
					component: 'Card',
					// title: '经营状况',
					children: [{
						name: 'app',
						component: 'AppLoader',
						callback:'{{$zoom}}',
						appName: 'ttk-edf-app-home-receive-pay',
						periodList: '{{data.periodList}}',
						data: '{{data.aRAP}}'
					}]
				}]
			}
		]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			zoom: false,
			periodList:[],
			zoomValue: undefined,
			// businessZoom: true,
			// reveiveZoom: true,
			animation: 'in',
			showPanel: 'none',
			ratio: window.innerWidth < 1280 ? 3 : 4,
			hotSearch:'',
			sale:'',
			visit:'',
			periodList: []
		}
	}
}

