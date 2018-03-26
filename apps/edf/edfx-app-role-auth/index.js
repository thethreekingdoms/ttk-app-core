import config from './config'
import * as data from './data'

export default {
	name: "edfx-app-role-auth",
	version: "1.0.1",
	description: "edfx-app-role-auth",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "edfx-app-role-auth")
	}
}