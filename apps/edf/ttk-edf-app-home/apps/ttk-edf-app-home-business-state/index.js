import config from './config'
import * as data from './data'

export default {
	name: "ttk-edf-app-home-business-state",
	version: "1.0.0",
	moduleName:'财务',
	description: "经营状况",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-home-business-state")
	}
}