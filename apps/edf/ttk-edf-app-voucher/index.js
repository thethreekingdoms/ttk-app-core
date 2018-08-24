import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-voucher',
	version: "1.0.6",
	moduleName: '单据预置',
	description: '单据预置',
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-root")
	}
}