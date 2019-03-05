import config from './config'

export default {
	name: "ttk-edf-app-root",
	version: "1.0.6",
	description: "ttk-edf-app-root",
	meta: null,
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'))
		}, "ttk-edf-app-root")
	}
}