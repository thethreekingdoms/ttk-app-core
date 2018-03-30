import config from './config'
import * as data from './data'

export default {
	name: "ttk-edf-app-root",
	version: "1.0.6",
	description: "ttk-edf-app-root",
	className: 'ttk-edf-app-root',
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-root")
	}
}