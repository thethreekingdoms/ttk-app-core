import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-enum',
	version: "1.0.1",
	moduleName: '系统管理',
	description: "枚举管理",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-enum")
	}
}