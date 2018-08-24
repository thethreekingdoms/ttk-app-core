import config from './config'
import * as data from './data'

export default {
	name: "ttk-edf-app-voucher-setting",
	version: "1.0.0",
	description: "ttk-edf-app-voucher-setting",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-voucher-setting")
	}
}