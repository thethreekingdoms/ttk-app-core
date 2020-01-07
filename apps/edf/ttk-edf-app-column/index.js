


export default {
	name: 'ttk-edf-app-column',
	version: "1.0.1",
	moduleName: '基础档案',
	description: "栏目列表",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-column")
	}
}