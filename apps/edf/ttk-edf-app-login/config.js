import webapi from './webapi'

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
	logo: 'http://via.placeholder.com/392x392'
}


function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config