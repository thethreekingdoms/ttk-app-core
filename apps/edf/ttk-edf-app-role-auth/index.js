import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-role-auth',
	version: "1.0.1",
	description: "ttk-edf-app-role-auth",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-role-auth")
	}
}