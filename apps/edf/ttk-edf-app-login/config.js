import webapi from './webapi'

var _options = {
	webapi,
	goAfterLogin: {
		appName: 'ttk-edf-app-portal-hor',
		appParams: {}
	},
	goRegister:{
		appName: 'ttk-edf-app-register',
		appParams: {}
	},
	goForgot:{
		appName: 'ttk-edf-app-forgot-password',
		appParams: {}
	},
	logo: 'https://avatars1.githubusercontent.com/u/37540303?s=70&v=4'
}


function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config