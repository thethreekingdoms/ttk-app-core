


export default {
    name: 'ttk-edf-app-card-project',
    version: "1.0.0",
    moduleName: "基础档案",
    description: "项目卡片",
    meta: null,
    components: [],
    config: null,
    load: (cb) => {
        require.ensure([], require => {
            cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
        }, "ttk-edf-app-card-project")
    }
}
