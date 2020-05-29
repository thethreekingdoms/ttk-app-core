


export default {
	name: 'original-style-tree-dialog',
	version: "3.0",
	moduleName: '模块名称',
	description: '模块名称',
	meta: null,
	components: [],
	config: null,
	type: 'origin',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./app'), require('./action'), require('./reducer'), null, null)
		}, "original-style-tree-dialog")
	}
}