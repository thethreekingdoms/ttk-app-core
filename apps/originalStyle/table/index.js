


export default {
	name: 'original-style-table',
	version: "3.0",
	moduleName: '原生表格',
	description: "原生表格",
	meta: null,
	components: [],
	config: null,
	type: 'origin',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./app'), require('./action'), require('./reducer'), null, null)
		}, "original-style-table")
	}
}