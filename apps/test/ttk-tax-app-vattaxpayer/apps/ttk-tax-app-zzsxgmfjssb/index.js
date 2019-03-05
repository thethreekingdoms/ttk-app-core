//
//

export default {
	name: "ttk-tax-app-zzsxgmfjssb",
	version: "1.0.0",	
	moduleName: '税务',
	description: '附加税（费）申报信息',
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-tax-app-zzsxgmfjssb")
	}
}