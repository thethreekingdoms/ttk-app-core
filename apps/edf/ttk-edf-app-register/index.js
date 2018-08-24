import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-register',
	version: "1.0.4",
	moduleName: "系统管理",
    description: "注册",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-register")
	}
}