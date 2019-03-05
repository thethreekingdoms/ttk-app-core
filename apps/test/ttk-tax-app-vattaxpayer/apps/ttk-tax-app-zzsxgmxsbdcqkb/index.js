//
//

export default {
	name: "ttk-tax-app-zzsxgmxsbdcqkb",
	version: "1.0.0",
	moduleName: '税务',
	description: "税务报表demo",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-tax-app-zzsxgmxsbdcqkb")
	}
}