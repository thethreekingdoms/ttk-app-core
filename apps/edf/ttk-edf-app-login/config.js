import webapi from './webapi'
import logo from '../../../assets/img/logo.png'

var _options = {
	webapi,
	goAfterLogin: {
		appName: 'edfx-app-portal',
		appParams: {}
	},
	goRegister:{
		appName: 'edfx-app-register',
		appParams: {}
	},
	goForgot:{
		appName: 'edfx-app-forgot-password',
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