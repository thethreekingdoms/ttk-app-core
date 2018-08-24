import webapi from './webapi'
import logo from '../../../assets/img/logo.png'
import bar from './img/bar.png'

var _options = {
	webapi,
	goLogin:{
		appName: 'ttk-edf-app-login',
		appParams: {
			
		}
	},
	goAfterLogin: {
		appName: 'ttk-edf-app-portal',
		appParams: {}
	},
	goOrgRegister:{
			appName: 'ttk-edf-app-orgregister',
			appParams: {}
		},
	logo: logo,
	bar: bar
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config