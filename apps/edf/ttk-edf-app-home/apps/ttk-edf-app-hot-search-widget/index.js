


export default {
	name: "ttk-edf-app-hot-search-widget",
	version: "1.0.0",
	description: "ttk-edf-app-hot-search-widget",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-hot-search-widget")
	}
}