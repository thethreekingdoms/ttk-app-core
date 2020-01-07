


export default {
	name: 'ttk-edf-app-portal-menu-detail',
	version: "1.0.0",
	description: "ttk-edf-app-portal-menu-detail",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-portal-menu-detail")
	}
}