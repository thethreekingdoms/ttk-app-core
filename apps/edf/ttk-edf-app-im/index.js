


export default {
	name: 'ttk-edf-app-im',
	version: "1.0.0",
	moduleName: '测试',
	description: '测试页',
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-im")
	}
}