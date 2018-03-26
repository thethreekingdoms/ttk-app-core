import webapi from './webapi'
import mock from './mock'

var _options = {
	webapi
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config