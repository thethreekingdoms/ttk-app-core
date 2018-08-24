import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-portal-hor',
	version: "1.0.35",
	moduleName: "系统管理",
    description: "门户",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-portal-hor")
	}
}