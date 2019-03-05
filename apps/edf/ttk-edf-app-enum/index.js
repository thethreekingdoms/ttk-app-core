


export default {
	name: 'ttk-edf-app-enum',
	version: "1.0.1",
	moduleName: '系统管理',
	description: "枚举管理",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-enum")
	}
}