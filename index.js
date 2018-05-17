//import 'babel-polyfill'
import 'url-polyfill'
import FastClick from 'fastclick'
import { config, start, componentFactory } from 'edf-meta-engine'
import * as edfComponents from 'edf-component'
import myConfig from './config'
import promise from 'es6-promise'

if (typeof (_hmt) == 'undefined') window._hmt = []

//#region app导入
//note-start
//note-start和note-end之间的内容用脚手架匹配，请不要再该区域书写内容，在执行ttk reset过程中会被删除
import ttk_edf_app_root from  './apps/edf/ttk-edf-app-root'
import app_test from  './apps/test/app-test'

const apps = {
    [ttk_edf_app_root.name]: ttk_edf_app_root,
    [app_test.name]: app_test,
}
//note-end
apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName) && apps[appName].config) {
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