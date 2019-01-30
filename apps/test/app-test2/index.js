//import config from './config'
//import * as data from './data'

export default {
	name: "app-test2",
	version: "1.0.0",
	moduleName: '测试',
	description: '测试页',
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "app-test2")
	}
}