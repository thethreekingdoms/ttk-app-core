export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'ttk-edf-app-dashboard-analysis',
		_visible: '{{!!data.visit}}',
		children: [{
			name: 'gridLayout',
			// component: 'GridLayout.WidthProviderGridLayout',
			component: '::div',
			className: 'ttk-edf-app-dashboard-analysis-grid',
			autoSize: true,
			// cols: 12,
			rowHeight: 50,
			isResizable: false,
			isDraggable: false,
			useCSSTransforms: false,
			containerPadding: [10, 10],
			children: [{
				name: 'sale',
				component: '::div',
				key: 'sale',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'ttk-edf-app-sale-widget',
						data: "{{data.sale}}"
					}]
				}
			}, {
				name: 'visit',
				component: '::div',
				key: 'visit',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'ttk-edf-app-visit-widget',
						data: "{{data.visit}}"
					}]
				}
			}, {
				name: 'trade',
				component: '::div',
				key: 'trade',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'ttk-edf-app-trade-widget',
						data: "{{data.trade}}"
					}]
				}
			}, {
				name: 'market',
				component: '::div',
				key: 'market',
				children: {
					name: 'card',
					component: 'Card',
					children: [{
						name: 'app',
						component: 'AppLoader',
						appName: 'ttk-edf-app-market-widget',
						data: "{{data.market}}"
					}]
				}
			}]},{
				name: 'trend',
				component: '::div',
				className: 'ttk-edf-app-dashboard-analysis-trendDiv',
				key: 'trend',
				children: [{
					name: 'card',
					component: 'Card',
					children: [{
						name: 'trend',
						component: 'Layout',
						className: 'ttk-edf-app-dashboard-analysis-trend',
						children: [{
							name: 'tabs',
							component: 'Tabs',
							children: [{
								name: 'saleTrend',
								component: 'Tabs.TabPane',
								tab: '销售额',
								key: 'saleTrend',
							}, {
								name: 'visitTrend',
								component: 'Tabs.TabPane',
								tab: '访问量',
								key: 'visitTrend',
							}]
						}, {
							name: 'saleTrend',
							component: 'AppLoader',
							appName: 'ttk-edf-app-sale-trend-widget',
							data: '{{({saleTrend:data.saleTrend,topForStore:data.topForStore})}}'
						}]
					}]
				}]
			},{
				name: 'buttomDiv',
				component: '::div',
				className: 'ttk-edf-app-dashboard-analysis-buttomDiv',
				children:[
					{
						name: 'hotSearch',
						component: '::div',
						key: 'hotSearch',
						children: [{
							name: 'card',
							component: 'Card',
							title: '线上热门搜索',
							children: [{
								name: 'app',
								component: 'AppLoader',
								appName: 'ttk-edf-app-hot-search-widget',
								data: '{{data.hotSearch}}'
							}]
						}]
					}, {
						name: 'saleProportion',
						component: '::div',
						key: 'saleProportion',
						children: [{
							name: 'card',
							component: 'Card',
							title: '销售额类别占比',
							children: [{
								name: 'app',
								component: 'AppLoader',
								appName: 'ttk-edf-app-sale-proportion-widget',
								data: '{{data.saleProportion}}'
							}]
						}]
					}]
				},{
				name: 'bottom',
				component: '::div',
				key: 'bottom'
			}]
		}
	}

export function getInitState() {
	return {
		data: {
		}
	}
}