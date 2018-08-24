import config from './config'
import * as data from './data'
import CodeMirror from 'edf-component'

export default {
	name: 'ttk-edf-app-hotloader',
	version: "1.0.1",
	description: "ttk-edf-app-hotloader",
	meta: data.getMeta(),
	components: [{
		name: 'CodeMirror',
		component: CodeMirror
	}],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "ttk-edf-app-hotloader")
	}
}