//import config from './config'
//import * as data from './data'

export default {
	name: "ttk-tax-app-zzsjmssbmxb-beijing",
	version: "1.0.0",
	moduleName: '税务',
	description: "增值税减免税申报明细表",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-tax-app-zzsjmssbmxb-beijing")
	}
}