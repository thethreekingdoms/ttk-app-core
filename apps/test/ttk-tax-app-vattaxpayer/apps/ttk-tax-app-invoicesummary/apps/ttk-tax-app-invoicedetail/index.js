//import config from './config'
//import * as data from './data'

export default {
	name: "ttk-tax-app-invoicedetail",
	version: "1.0.4",
	moduleName:'税务',
	description: "发票明细",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-tax-app-invoicedetail")
	}
}