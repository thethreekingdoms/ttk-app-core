


export default {
	name: "ttk-edf-app-column-type",
	version: "1.0.0",
	description: "ttk-edf-app-column-type",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-column-type")
	}
}