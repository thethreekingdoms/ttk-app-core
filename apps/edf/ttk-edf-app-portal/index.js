


export default {
	name: 'ttk-edf-app-portal',
	version: "1.0.35",
	moduleName: "系统管理",
	description: "门户",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-portal")
	}
}