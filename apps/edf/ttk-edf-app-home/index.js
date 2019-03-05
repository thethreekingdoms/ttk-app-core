


export default {
	name: 'ttk-edf-app-home',
	version: "1.0.2",
	description: "ttk-edf-app-home",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-home")
	}
}