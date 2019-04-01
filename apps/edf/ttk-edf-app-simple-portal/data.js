export function getMeta() {

	return {
		name: 'root',
		component: '::div',
		className: 'ttk-edf-app-simple-portal',
		children: [{
			name: 'header',
			component: 'Layout',
			_visible: '{{data.app.isOnlyContent}}',
			className: 'ttk-edf-app-simple-portal-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'ttk-edf-app-simple-portal-header-left',
				children: [{
					// 	name: 'logo',
					// 	component: '::img',
					// 	className: 'edfx-app-portal-header-left-logo',
					// 	src: '{{$getLogo()}}'
					// },
					// {
					name: 'siteName',
					component: '::h1',
					children: '{{data.app.name}}'
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'ttk-edf-app-simple-portal-header-right',
				children: [{
					name: 'rightDiv',
					component: '::div',
					className: 'ttk-edf-app-simple-portal-search-rightDiv',
					children: [{
						name: 'live',
						component: '::span',
						// _visible: '{{data.headCtrl}}',
						className: 'liveCast',
						style: {
							padding: '0px 16px 0 10px',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center'
						},
						onClick: '{{function(){$topMenuClick({key:"logout"})}}}',
						children: [{
							name: 'liveCast',
							component: 'Icon',
							fontFamily: 'edficon',
							style: { fontSize: '22px', verticalAlign: 'middle' },
							className: 'ttk-edf-app-simple-portal-header-right-help-icon-popover',
							type: 'tuichu'
						}, {
							name: 'liveName',
							component: '::span',
							className: 'headBarBtn',
							children: '退出'
						}]
					}]
				}]
			}
			]
		},
		{
			name: 'content',
			component: 'Layout',
			className: 'ttk-edf-app-simple-portal-content',
			// componentDidMount: '{{$resize()}}',
			trigger: 'click',
			children: [{
				name: 'left',
				component: 'Layout',
				style: '{{data.width ? {width: \'160px\'}	: {width: \'100px\'}}}',
				className: 'ttk-edf-app-simple-portal-content-left',
				_visible: '{{data.app.isOnlyContent}}',
				trigger: 'click',
				children: [{
					name: 'leftMenu',
					component: 'Layout',
					children: [{
						name: 'menu',
						component: 'Menu',
						mode: 'vertical',
						theme: 'light',
						trigger: 'click',
						selectedKeys: '{{$getMenuSelectKeys()}}',
						defaultOpenKeys: '{{data.menuDefaultOpenKeys}}',
						getPopupContainer: '{{function(){return document.querySelector("#box")}}}',
						//onClick: '{{$menuClick}}',
						children: '{{$getMenuChildren()}}'
					}]
				}]
			},
			{
				name: 'more',
				component: 'Layout',
				children: [{
					name: 'mainTop',
					component: '::div',
					className: 'mainTop',
					_visible: '{{data.app.isOnlyContent}}',
					children: [{
						name: 'tabcontainer',
						component: '::div',
						className: 'tabcontainer',
						children: {
							name: 'tabs',
							component: 'Tabs',
							className: '{{data.openTabs.length >= 2 ? \'ttk-edf-app-simple-portal-content-tabs showLast\': \'hideLast ttk-edf-app-simple-portal-content-tabs\'}}',
							type: 'editable-card',
							hideAdd: true,
							activeKey: '{{data.content && data.content.name}}',
							onChange: '{{$tabChange}}',
							onEdit: '{{$tabEdit}}',
							key: '{{data.mathRandom}}',
							_visible: '{{ data.openTabs && data.openTabs.length > 0}}',
							children: [{
								name: 'tab1',
								component: 'Tabs.TabPane',
								// closable: '{{data.openTabs[_rowIndex].name !== "我的桌面"}}',
								key: '{{data.openTabs[_rowIndex].name}}',
								tab: '{{data.openTabs[_rowIndex].name}}',
								_power: 'for in data.openTabs'
							}, {
								name: 'more',
								component: 'Tabs.TabPane',
								closable: false,
								key: 'more',
								tab: {
									name: 'arrowdown',
									component: 'Dropdown',
									trigger: 'click',
									overlay: {
										name: 'menu',
										component: 'Menu',
										onClick: '{{$closeTabs}}',
										children: [{
											name: 'tempt',
											component: 'Menu.Item',
											key: 'current',
											children: '关闭当前'
										}, {
											name: 'import',
											component: 'Menu.Item',
											key: 'all',
											children: '关闭所有'
										}]
									},
									children: {
										name: 'icon',
										component: 'Icon',
										fontFamily: 'edficon',
										style: { fontSize: '20px' },
										type: 'xia'
									}
								}
							}]
						}
					}
					]
				}, {
					name: 'main',
					component: 'Layout',
					className: 'edfx-app-portal-content-main',
					// _visible: '{{!!(data.content && data.content.appName)}}',
					children: {
						name: 'app',
						component: 'AppLoader',
						appName: '{{ data.openTabs && data.openTabs.length > 0 && data.openTabs[_rowIndex].appName }}',
						onPortalReload: '{{$load}}',
						setPortalContent: '{{$setContent}}',
						// editing: "{{$editing}}",
						updateOrgList: '{{$getOrgs}}',
						// hideHead: '{{function(){$setField(\'data.headCtrl\', false)}}}',
						reInitContent: '{{$reInitContent}}',
						'...': '{{data.openTabs && data.openTabs.length > 0 && data.openTabs[_rowIndex].appProps}}',
						isTabStyle: '{{data.isTabsStyle}}',
						// _notRender: '{{!(data.content && data.content.name == data.openTabs[_rowIndex].name) }}',
						_notRender: '{{$renderCondition(data.content,  data.openTabs[_rowIndex])}}',
						_power: 'for in data.openTabs',
						appVersion: "{{data.appVersion}}",
						taxReportList: "{{data.taxReportList}}",
						thirdPartyOrgIds: "{{data.app.appProps}}",
						isCallBack: "{{data.isCallBack}}",
						caExpireDate: '{{data.caExpireDate}}',
						initData: '{{data.initData}}',
						financeParam: '{{data.financeParam}}',
					}
				}
				]
			}]
		}]
	};
}

export function getInitState() {
	let width = window.innerWidth > 1024 ? true : false;
	return {
		data: {
			// manageList: [],
			app: {
				isOnlyContent: true,
				name: '企业开发平台'
			},
			menu: [],
			colors: [{ color: '#FF913A', tip: '活力橙' }, { color: '#1EB5AD', tip: '薄荷蓝' }, { color: '#0066B3', tip: '商务蓝' }, { color: '#B4A074', tip: '淡雅棕' }],
			tips: ['1', '2', '3', '4', '5', '6'],
			menuSelectedKeys: [10],
			menuDefaultOpenKeys: [10],
			content: {},
			openTabs: [],

			// isTabsStyle: false,
			// isShowMenu: false,
			other: {},
			width: width,
			widthPersonStatus: false,
			isShowSearch: false,
			animation: 'out',
			showPanel: 'none',
			visible: false,
			userMenuVisible: false,
			selectedKeys: [],
			// headCtrl: true,             //控制头部的显示
			mathRandom: 0,               //控制tab更新
			showControlPanel: 'none',
			panelAnimation: 'out',
			service: {
				qrcodeVisible: false,
				onlineCustomerState: true,
				mathRandom: Math.random()
			}
		}
	};
}
