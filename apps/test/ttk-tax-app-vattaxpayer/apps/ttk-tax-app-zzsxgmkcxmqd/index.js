//
//

export default {
	name: "ttk-tax-app-zzsxgmkcxmqd",
	version: "1.0.0",
	moduleName: '税务',
	description: "增值税应税服务扣除清单",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-tax-app-zzsxgmkcxmqd")
	}
}