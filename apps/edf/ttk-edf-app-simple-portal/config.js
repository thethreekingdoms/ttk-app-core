import webapi from './webapi'

var _options = {
	webapi,
	goAfterLogout: {
		appName: 'simplelogin',
		appParams: {}
	}
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config
