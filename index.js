//import 'babel-polyfill'
import 'url-polyfill'
import FastClick from 'fastclick'
import { config, start, componentFactory } from 'edf-meta-engine'
import * as edfComponents from 'edf-component'
import myConfig from './config'
import promise from 'es6-promise'

//#region app导入

import edf_app_login from './apps/edf/ttk-edf-app-login/index.js'
import edf_app_root from './apps/edf/ttk-edf-app-root/index.js'

//#endregion
const apps = {
    [edf_app_login.name]: edf_app_login,
    [edf_app_root.name]: edf_app_root
}

apps.config = (options) => {
    Object.keys(options).forEach(key => {
        const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
        Object.keys(apps).forEach(appName => {
            if (appName != 'config') {
                if (reg.test(appName)) {
                    apps[appName].config(options[key])
                }
            }
        })
    })
}


promise.polyfill()

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(edfComponents).forEach(key => {
    componentFactory.registerComponent(key, edfComponents[key])
})



start()
FastClick.attach(document.body)