//
//
export default {
	name: "ttk-tax-app-select",
	version: "1.0.0",
	moduleName: '报表转换',
	description: "选择表单",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-tax-app-select")
	}
}