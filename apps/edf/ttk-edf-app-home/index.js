import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-home',
	version: "1.0.2",
	description: "ttk-edf-app-home",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-home")
	}
}