import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-login',
	version: "1.0.4",
	moduleName: "系统管理",
    description: "登录",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-login")
	}
}