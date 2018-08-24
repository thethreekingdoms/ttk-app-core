import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-notice',
	version: "1.0.0",	
	moduleName: '消息',
	description: '消息页',
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-notice")
	}
}