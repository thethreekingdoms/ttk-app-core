//import 'babel-polyfill'
import 'url-polyfill'
import FastClick from 'fastclick'
import { config, start, componentFactory } from 'edf-meta-engine'
import * as edfComponents from 'edf-component'
import myConfig from './config'
import promise from 'es6-promise'

//#region app导入

// import ttk_edf_app_login from './apps/edf/ttk-edf-app-login/index.js'
import ttk_edf_app_root from './apps/edf/ttk-edf-app-root/index.js'
// import ttk_edf_app_portal from './apps/edf/ttk-edf-app-portal/index.js'
// import ttk_edf_app_home from './apps/edf/ttk-edf-app-home/index.js'
// import edfx_app_role_auth from './apps/edf/ttk-edf-app-role-auth/index.js'
// import edfx_app_role from './apps/edf/ttk-edf-app-role-auth/apps/edfx-app-role/index.js'
// import ttk_edf_app_home_business_state from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-home-business-state'
// import ttk_edf_app_home_receive_pay from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-home-receive-pay'
// import ttk_edf_app_home_voucher from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-home-voucher'
// import ttk_edf_app_home_capital_account from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-home-capital-account'
// import ttk_edf_app_portal_menu from './apps/edf/ttk-edf-app-portal-menu/index.js'
// import ttk_edf_app_portal_menu_detail from './apps/edf/ttk-edf-app-portal-menu/apps/ttk-edf-app-portal-menu-detail'
// import ttk_edf_app_operation from './apps/edf/ttk-edf-app-operation/index.js'
// import ttk_edf_app_my_setting from './apps/edf/ttk-edf-app-my-setting/index.js'
// import ttk_edf_app_my_setting_change_mobile from './apps/edf/ttk-edf-app-my-setting/apps/ttk-edf-app-my-setting-change-mobile/index.js'
// import ttk_edf_app_my_setting_change_password from './apps/edf/ttk-edf-app-my-setting/apps/ttk-edf-app-my-setting-change-password/index.js'


//#endregion
const apps = {
    // [ttk_edf_app_login.name]: ttk_edf_app_login,
    [ttk_edf_app_root.name]: ttk_edf_app_root,
	// [ttk_edf_app_portal.name]: ttk_edf_app_portal,
	// [ttk_edf_app_home.name]: ttk_edf_app_home,
	// [ttk_edf_app_home_business_state.name]: ttk_edf_app_home_business_state,
	// [ttk_edf_app_home_receive_pay.name]: ttk_edf_app_home_receive_pay,
	// [ttk_edf_app_home_voucher.name]: ttk_edf_app_home_voucher,
	// [ttk_edf_app_home_capital_account.name]: ttk_edf_app_home_capital_account,
	// [ttk_edf_app_portal_menu.name]: ttk_edf_app_portal_menu,
	// [ttk_edf_app_portal_menu_detail.name]: ttk_edf_app_portal_menu_detail,
	// [ttk_edf_app_operation.name]: ttk_edf_app_operation,
	// [edfx_app_role_auth.name]: edfx_app_role_auth,
	// [edfx_app_role.name]: edfx_app_role,
	// [ttk_edf_app_my_setting.name]: ttk_edf_app_my_setting,
	// [ttk_edf_app_my_setting_change_mobile.name]: ttk_edf_app_my_setting_change_mobile,
	// [ttk_edf_app_my_setting_change_password.name]: ttk_edf_app_my_setting_change_password,
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