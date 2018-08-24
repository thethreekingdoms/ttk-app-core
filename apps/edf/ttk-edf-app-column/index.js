import config from './config'
import * as data from './data'

export default {
	name: 'ttk-edf-app-column',
	version: "1.0.1",
	moduleName:'基础档案',
	description: "栏目列表",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-column")
	}
}