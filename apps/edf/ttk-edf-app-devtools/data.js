export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-devtools',
		children: [{
			name: 'tabs',
			component: 'Tabs',
			className: 'ttk-edf-app-devtools-tabs',
			activeKey: '{{data.tabKey}}',
			onChange: '{{$tabChange}}',
			children: [{
				name: 'apps',
				component: 'Tabs.TabPane',
				key: 'apps',
				tab: '当前网站所有app'
			}, {
				name: 'modifyApp',
				component: 'Tabs.TabPane',
				key: 'modifyApp',
				tab: '元数据、状态修改'
			}, {
				name: 'traceAction',
				component: 'Tabs.TabPane',
				key: 'traceAction',
				tab: 'action监控'
			}, {
				name: 'state',
				component: 'Tabs.TabPane',
				_visible: false,
				key: 'state',
				tab: '当前状态(state)'
			}, {
				name: 'apis',
				component: 'Tabs.TabPane',
				key: 'apis',
				tab: '所有API'
			}, {
				name: 'mockData',
				component: 'Tabs.TabPane',
				key: 'mockData',
				tab: 'mock数据'
			}, {
				name: 'metaDesign',
				component: 'Tabs.TabPane',
				key: 'metaDesign',
				tab: '元数据设计'
			}]
		}, {
			name: 'content',
			component: '::div',
			className: 'ttk-edf-app-devtools-content',
			children: [{
				name: 'state',
				component: 'JSONTree',
				_visible: "{{data.tabKey=='state'}}",
				data: '{{$getState()}}'
			}, {
				name: 'apps',
				component: 'JSONTree',
				_visible: "{{data.tabKey=='apps'}}",
				data: '{{$getApps()}}'
			}, {
				name: 'mockData',
				component: 'JSONTree',
				_visible: "{{data.tabKey=='mockData'}}",
				data: '{{$getMockData()}}'
			}, {
				name: 'apis',
				component: `{{$isExistsApp('ttk-edf-app-apidoc')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='apis'}}",
				_visible: "{{data.tabKey=='apis'}}",
				appName: 'ttk-edf-app-apidoc',
				children: '运行网站需要ttk-edf-app-apidoc应用，可以使用[ttk clone ttk-edf-app-apidoc apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('ttk-edf-app-apidoc')?['_visible','children']:['notRender','appName']}}"
			}, {
				name: 'modifyApp',
				_visible: "{{data.tabKey=='modifyApp'}}",
				component: `{{$isExistsApp('ttk-edf-app-hotloader')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='modifyApp'}}",
				appName: 'ttk-edf-app-hotloader',
				children: '运行网站需要ttk-edf-app-hotloader应用，可以使用[ttk clone ttk-edf-app-hotloader apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('ttk-edf-app-hotloader')?['_visible','children']:['notRender','appName']}}"

			}, {
				name: 'traceAction',
				component: `{{$isExistsApp('ttk-edf-app-traceapp')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='traceAction'}}",
				_visible: "{{data.tabKey=='traceAction'}}",
				appName: 'ttk-edf-app-traceapp',
				children: '运行网站需要ttk-edf-app-traceapp应用，可以使用[ttk clone ttk-edf-app-traceapp apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('ttk-edf-app-traceapp')?['_visible','children']:['notRender','appName']}}"
			}, {
				name: 'metaDesign',
				component: `{{$isExistsApp('ttk-edf-app-metadesign')?'AppLoader':'::div'}}`,
				notRender: "{{data.tabKey!='metaDesign'}}",
				_visible: "{{data.tabKey=='metaDesign'}}",
				appName: 'ttk-edf-app-metadesign',
				children: '运行网站需要ttk-edf-app-metadesign应用，可以使用[ttk clone ttk-edf-app-metadesign apps/]克隆应用',
				_excludeProps: "{{$isExistsApp('ttk-edf-app-metadesign')?['_visible','children']:['notRender','appName']}}"
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			tabKey: 'apps'
		}
	}
}