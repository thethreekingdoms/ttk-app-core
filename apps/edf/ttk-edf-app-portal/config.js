import webapi from './webapi'

var _options = {
	webapi,
	goAfterLogout: {
		appName: 'ttk-edf-app-login',
		appParams: {}
	},
	menu_del: [{
		key: '1',
		name: 'about',
		appName: 'ttk-edf-app-portal-about',
		isDefault: true
	}, {
		key: '2',
		name: 'apps',
		isExpand:true,
		children: [{
			key: '201',
			name: 'app1',
			appName: 'ttk-edf-app-portal-app1'
		}, {
			key: '202',
			name: 'app2',
			appName: 'ttk-edf-app-portal-app2'
		}]
	}],
	logo:'https://avatars1.githubusercontent.com/u/37540303?s=70&v=4'
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config