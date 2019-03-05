


export default {
	name: 'ttk-edf-app-voucher',
	version: "1.0.6",
	moduleName: '单据预置',
	description: '单据预置',
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "ttk-edf-app-root")
	}
}