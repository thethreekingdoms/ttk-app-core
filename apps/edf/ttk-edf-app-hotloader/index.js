

import CodeMirror from 'edf-component'

export default {
	name: 'ttk-edf-app-hotloader',
	version: "1.0.1",
	description: "ttk-edf-app-hotloader",
	meta: null,
	components: [{
		name: 'CodeMirror',
		component: CodeMirror
	}],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-hotloader")
	}
}