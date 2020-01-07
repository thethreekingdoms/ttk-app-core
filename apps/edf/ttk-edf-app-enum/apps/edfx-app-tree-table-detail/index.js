


export default {
	name: "edfx-app-enum-detail",
	version: "1.0.0",
	moduleName: '系统管理',
	description: "枚举列表",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "edfx-app-enum-detail")
	}
}