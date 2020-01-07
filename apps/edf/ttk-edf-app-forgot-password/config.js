import webapi from './webapi'
import logo from '../../../assets/img/logo.png'

var _options = {
	webapi,
	goLogin:{
		appName: 'ttk-edf-app-login',
		appParams: {}
	},
	logo: logo
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config