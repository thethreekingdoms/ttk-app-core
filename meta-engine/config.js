import { config as appLoaderConfig, AppLoader } from 'edf-app-loader'
import cf from './componentFactory'


var toast, notification, modal, errorBox, apps, popconfirm, alert

function config(option) {
	const components = option.components

	toast = option.toast
	notification = option.notification
	modal = option.modal
	errorBox = option.errorBox 
	apps = option.apps
	popconfirm = option.popconfirm
	alert = option.alert

	appLoaderConfig(option)

	cf.registerComponent('AppLoader', AppLoader)

	if (components && components.length > 0) {
		components.forEach(c => {
			if (c.appName)
				cf.registerAppComponent(c.appName, c.name, c.component)

			else
				cf.registerComponent(c.name, c.component)
		})
	}

	if (apps) {
		Object.keys(apps).forEach(k => {
			let a = apps[k]
			if (a.components && a.components.length > 0) {
				a.components.forEach(c => {
						if (c.appName) {
								cf.registerAppComponent(a.name, c.name, c.component)
						} else {
								cf.registerComponent(c.name, c.component, true)
						}
				})
			}
		})
	}
}

config.getToast = () => toast
config.getNotification = () => notification
config.getModal = () => modal
config.getApps = () => apps
config.getPopconfirm = () => popconfirm
config.getAlert = () => alert

// 用于optimal-meta-engine, 配置children不包裹connect层的组件
const CHILDREN_NO_CONNECT_COMPONENTS = [
    'Select',
    'Menu',
    'Tabs',
    'DataGrid',
	'Radio.Group',
];

// 用于optimal-meta-engine, 根据组件名称判断是否children不包裹connect层的组件
config.isChildrenNoWrapperComponent = (component) => {
    return CHILDREN_NO_CONNECT_COMPONENTS.includes(component);
}

export default config
