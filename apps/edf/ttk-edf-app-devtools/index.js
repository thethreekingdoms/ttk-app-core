


export default {
	name: 'ttk-edf-app-devtools',
	version: "1.0.1",
	description: "ttk-edf-app-devtools",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-devtools")
	}
}