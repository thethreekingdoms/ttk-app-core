


export default {
	name: 'ttk-edf-app-notice',
	version: "1.0.0",
	moduleName: '消息',
	description: '消息页',
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-notice")
	}
}