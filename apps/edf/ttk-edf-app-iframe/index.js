


export default {
	name: 'ttk-edf-app-iframe',
	version: "1.0.0",
	description: "ttk-edf-app-iframe",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-iframe")
	}
}