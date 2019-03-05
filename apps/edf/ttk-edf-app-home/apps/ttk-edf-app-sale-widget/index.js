


export default {
	name: "ttk-edf-app-sale-widget",
	version: "1.0.0",
	description: "ttk-edf-app-sale-widget",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edfs-app-sale-widget")
	}
}