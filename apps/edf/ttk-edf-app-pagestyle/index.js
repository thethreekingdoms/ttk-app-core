import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-pagestyle',
	version: "1.0.0",	
	moduleName: '系统管理',
	description: '皮肤设置',
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "app-test")
	}
}