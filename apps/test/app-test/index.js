import config from './config'
import * as data from './data'

export default {
	name: "app-test",
	version: "1.0.0",	
	moduleName: '测试',
	description: '测试页',
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "app-test")
	}
}