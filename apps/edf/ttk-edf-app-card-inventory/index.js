import config from './config'
import * as data from './data'

export default {
    name: 'ttk-edf-app-card-inventory',
    version: "1.0.0",
    moduleName: "基础档案",
    description: "存货卡片",
    meta: data.getMeta(),
    components: [],
    config: config,
    load: (cb) => {
        require.ensure([], require => {
            cb(require('./component'), require('./action'), require('./reducer'))
        }, "ttk-edf-app-card-inventory")
    }
}
