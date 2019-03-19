import webapi from './webapi'

var _options = {
	webapi,
	goAfterLogin: {
		appName: 'ttk-edf-app-simple-portal',
		appParams: {}
	},
	goAfterLoginA99: {
		appName: 'ttk-access-app-tranreport',
		appParams: {}
	},
	goRegister: {
		appName: 'edfx-app-register',
		appParams: {}
	},
	goForgot: {
		appName: 'edfx-app-forgot-password',
		appParams: {}
	},
}


function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config
