


export default {
	name: 'ttk-edf-app-login',
	version: "1.0.4",
	moduleName: "系统管理",
	description: "登录",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-login")
	}
}