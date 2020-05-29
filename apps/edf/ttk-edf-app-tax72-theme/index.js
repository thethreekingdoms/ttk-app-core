//import config from './config'
//import * as data from './data'

export default {
	name: "ttk-edf-app-tax72-theme",
	version: "1.0.4",
	moduleName: "电局72号文主题",
    description: "电局72号文主题",
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-tax72-theme")
	}
}