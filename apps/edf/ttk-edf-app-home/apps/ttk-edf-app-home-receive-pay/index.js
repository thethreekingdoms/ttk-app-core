import config from './config'
import * as data from './data'

export default {
	name: "ttk-edf-app-home-receive-pay",
	version: "1.0.0",
	moduleName:'财务',
	description: "应收应付",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-home-receive-pay")
	}
}