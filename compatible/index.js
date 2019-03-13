import 'babel-polyfill'
import 'url-polyfill'
import 'es5-shim'
import 'es5-shim/es5-sham'
import 'console-polyfill'
import 'fetch-ie8'
import 'babel-polyfill'
//import FastClick from 'fastclick'
import { config, start, componentFactory } from 'edf-meta-engine'
import * as edfComponents from 'edf-component'
// import raf from 'raf'
import myConfig from './config'
// raf.polyfill()

if (typeof (_hmt) == 'undefined') window._hmt = []
//note-start
//note-start和note-end之间的内容用脚手架匹配，请不要再该区域书写内容，在执行ttk reset过程中会被删除

import ttk_edf_app_root from './apps/edf/ttk-edf-app-root'
//import ttk_edf_app_login from './apps/edf/ttk-edf-app-login/index.js'
// import app_test from './apps/test/app-test'
import app_test2 from './apps/test/app-test2'



import ttk_tax_app_vattaxpayer from "./apps/test/ttk-tax-app-vattaxpayer"
import ttk_tax_app_select from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-select"
import ttk_tax_app_zzsjmssbmxb from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsjmssbmxb"
import ttk_tax_app_zzsjmssbmxb_beijing from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsjmssbmxb-beijing"
import ttk_tax_app_zzssyyxgmnsr from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzssyyxgmnsr"
import ttk_tax_app_zzsxgmfjssb from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmfjssb"
import ttk_tax_app_zzsxgmflzl from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmflzl"
import ttk_tax_app_zzsxgmkcxmqd from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmkcxmqd"
import ttk_tax_app_zzsxgmxsbdcqkb from "./apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmxsbdcqkb"
import ttk_tax_app_invoicesummary from './apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-invoicesummary'
import ttk_tax_app_invoicedetail from './apps/test/ttk-tax-app-vattaxpayer/apps/ttk-tax-app-invoicesummary/apps/ttk-tax-app-invoicedetail'
//此文件由ttk rewrite命令工具生成
// import ttk_edf_app_card_account from './apps/edf/ttk-edf-app-card-account'
// import ttk_edf_app_card_currency from './apps/edf/ttk-edf-app-card-currency'
// import ttk_edf_app_card_customer from './apps/edf/ttk-edf-app-card-customer'
// import ttk_edf_app_card_department from './apps/edf/ttk-edf-app-card-department'
// import ttk_edf_app_card_inventory from './apps/edf/ttk-edf-app-card-inventory'
// import ttk_edf_app_card_project from './apps/edf/ttk-edf-app-card-project'
// import ttk_edf_app_card_supplier from './apps/edf/ttk-edf-app-card-supplier'
// import ttk_edf_app_card_userdefinecard from './apps/edf/ttk-edf-app-card-userdefinecard'
// import ttk_edf_app_column from './apps/edf/ttk-edf-app-column'
// import edfx_app_column_detail from './apps/edf/ttk-edf-app-column/apps/edfx-app-column-detail'
// import edfx_app_column_setting from './apps/edf/ttk-edf-app-column/apps/edfx-app-column-setting'
// import edfx_app_column_type from './apps/edf/ttk-edf-app-column/apps/edfx-app-column-type'
// import ttk_edf_app_company_manage from './apps/edf/ttk-edf-app-company-manage'
// import ttk_edf_app_company_manage_add from './apps/edf/ttk-edf-app-company-manage/apps/ttk-edf-app-company-manage-add'
// import ttk_edf_app_devtools from './apps/edf/ttk-edf-app-devtools'
// import ttk_edf_app_enum from './apps/edf/ttk-edf-app-enum'
// import edfx_app_tree_table_detail from './apps/edf/ttk-edf-app-enum/apps/edfx-app-tree-table-detail'
// import edfx_app_tree_table_type from './apps/edf/ttk-edf-app-enum/apps/edfx-app-tree-table-type'
// import ttk_edf_app_forgot_password from './apps/edf/ttk-edf-app-forgot-password'
// import ttk_edf_app_home from './apps/edf/ttk-edf-app-home'
// import ttk_edf_app_hot_search_widget from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-hot-search-widget'
// import ttk_edf_app_market_widget from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-market-widget'
// import ttk_edf_app_sale_proportion_widget from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-sale-proportion-widget'
// import ttk_edf_app_sale_trend_widget from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-sale-trend-widget'
// import ttk_edf_app_sale_widget from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-sale-widget'
// import ttk_edf_app_trade_widget from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-trade-widget'
// import ttk_edf_app_visit_widget from './apps/edf/ttk-edf-app-home/apps/ttk-edf-app-visit-widget'
// import ttk_edf_app_hotloader from './apps/edf/ttk-edf-app-hotloader'
// import ttk_edf_app_iframe from './apps/edf/ttk-edf-app-iframe'
// import ttk_edf_app_im from './apps/edf/ttk-edf-app-im'
// import ttk_edf_app_login from './apps/edf/ttk-edf-app-login'
// import ttk_edf_app_my_setting from './apps/edf/ttk-edf-app-my-setting'
// import ttk_edf_app_my_setting_change_mobile from './apps/edf/ttk-edf-app-my-setting/apps/ttk-edf-app-my-setting-change-mobile'
// import ttk_edf_app_my_setting_change_password from './apps/edf/ttk-edf-app-my-setting/apps/ttk-edf-app-my-setting-change-password'
// import ttk_edf_app_notice from './apps/edf/ttk-edf-app-notice'
// import ttk_edf_app_operation from './apps/edf/ttk-edf-app-operation'
// import ttk_edf_app_pagestyle from './apps/edf/ttk-edf-app-pagestyle'
// import ttk_edf_app_portal from './apps/edf/ttk-edf-app-portal'
// import ttk_edf_app_portal_menu from './apps/edf/ttk-edf-app-portal-menu'
// import ttk_edf_app_portal_menu_detail from './apps/edf/ttk-edf-app-portal-menu-detail'
// import ttk_edf_app_register from './apps/edf/ttk-edf-app-register'
// import ttk_edf_app_agreement from './apps/edf/ttk-edf-app-register/apps/ttk-edf-app-agreement'
// import ttk_edf_app_role from './apps/edf/ttk-edf-app-role'
// import ttk_edf_app_role_auth from './apps/edf/ttk-edf-app-role-auth'
// // import ttk_edf_app_root from  './apps/edf/ttk-edf-app-root'
// import ttk_edf_app_voucher from './apps/edf/ttk-edf-app-voucher'
// import ttk_edf_app_voucher_detail_setting from './apps/edf/ttk-edf-app-voucher/apps/ttk-edf-app-voucher-detail-setting'
// import ttk_edf_app_voucher_setting from './apps/edf/ttk-edf-app-voucher/apps/ttk-edf-app-voucher-setting'


const apps = {
    [app_test2.name]: app_test2,
    [ttk_edf_app_root.name]: ttk_edf_app_root,
    [ttk_tax_app_vattaxpayer.name]: ttk_tax_app_vattaxpayer,
    [ttk_tax_app_select.name]: ttk_tax_app_select,
    [ttk_tax_app_zzsjmssbmxb.name]: ttk_tax_app_zzsjmssbmxb,
    [ttk_tax_app_zzsjmssbmxb_beijing.name]: ttk_tax_app_zzsjmssbmxb_beijing,
    [ttk_tax_app_zzssyyxgmnsr.name]: ttk_tax_app_zzssyyxgmnsr,
    [ttk_tax_app_zzsxgmfjssb.name]: ttk_tax_app_zzsxgmfjssb,
    [ttk_tax_app_zzsxgmflzl.name]: ttk_tax_app_zzsxgmflzl,
    [ttk_tax_app_zzsxgmkcxmqd.name]: ttk_tax_app_zzsxgmkcxmqd,
    [ttk_tax_app_zzsxgmxsbdcqkb.name]: ttk_tax_app_zzsxgmxsbdcqkb,
    [ttk_tax_app_invoicesummary.name]: ttk_tax_app_invoicesummary,
    [ttk_tax_app_invoicedetail.name]: ttk_tax_app_invoicedetail,
    // [ttk_edf_app_card_account.name]: ttk_edf_app_card_account,
    // [ttk_edf_app_card_currency.name]: ttk_edf_app_card_currency,
    // [ttk_edf_app_card_customer.name]: ttk_edf_app_card_customer,
    // [ttk_edf_app_card_department.name]: ttk_edf_app_card_department,
    // [ttk_edf_app_card_inventory.name]: ttk_edf_app_card_inventory,
    // [ttk_edf_app_card_project.name]: ttk_edf_app_card_project,
    // [ttk_edf_app_card_supplier.name]: ttk_edf_app_card_supplier,
    // [ttk_edf_app_card_userdefinecard.name]: ttk_edf_app_card_userdefinecard,
    // [ttk_edf_app_column.name]: ttk_edf_app_column,
    // [edfx_app_column_detail.name]: edfx_app_column_detail,
    // [edfx_app_column_setting.name]: edfx_app_column_setting,
    // [edfx_app_column_type.name]: edfx_app_column_type,
    // [ttk_edf_app_company_manage.name]: ttk_edf_app_company_manage,
    // [ttk_edf_app_company_manage_add.name]: ttk_edf_app_company_manage_add,
    // [ttk_edf_app_devtools.name]: ttk_edf_app_devtools,
    // [ttk_edf_app_enum.name]: ttk_edf_app_enum,
    // [edfx_app_tree_table_detail.name]: edfx_app_tree_table_detail,
    // [edfx_app_tree_table_type.name]: edfx_app_tree_table_type,
    // [ttk_edf_app_forgot_password.name]: ttk_edf_app_forgot_password,
    // [ttk_edf_app_home.name]: ttk_edf_app_home,
    // [ttk_edf_app_hot_search_widget.name]: ttk_edf_app_hot_search_widget,
    // [ttk_edf_app_market_widget.name]: ttk_edf_app_market_widget,
    // [ttk_edf_app_sale_proportion_widget.name]: ttk_edf_app_sale_proportion_widget,
    // [ttk_edf_app_sale_trend_widget.name]: ttk_edf_app_sale_trend_widget,
    // [ttk_edf_app_sale_widget.name]: ttk_edf_app_sale_widget,
    // [ttk_edf_app_trade_widget.name]: ttk_edf_app_trade_widget,
    // [ttk_edf_app_visit_widget.name]: ttk_edf_app_visit_widget,
    // [ttk_edf_app_hotloader.name]: ttk_edf_app_hotloader,
    // [ttk_edf_app_iframe.name]: ttk_edf_app_iframe,
    // [ttk_edf_app_im.name]: ttk_edf_app_im,
    // [ttk_edf_app_login.name]: ttk_edf_app_login,
    // [ttk_edf_app_my_setting.name]: ttk_edf_app_my_setting,
    // [ttk_edf_app_my_setting_change_mobile.name]: ttk_edf_app_my_setting_change_mobile,
    // [ttk_edf_app_my_setting_change_password.name]: ttk_edf_app_my_setting_change_password,
    // [ttk_edf_app_notice.name]: ttk_edf_app_notice,
    // [ttk_edf_app_operation.name]: ttk_edf_app_operation,
    // [ttk_edf_app_pagestyle.name]: ttk_edf_app_pagestyle,
    // [ttk_edf_app_portal.name]: ttk_edf_app_portal,
    // [ttk_edf_app_portal_menu.name]: ttk_edf_app_portal_menu,
    // [ttk_edf_app_portal_menu_detail.name]: ttk_edf_app_portal_menu_detail,
    // [ttk_edf_app_register.name]: ttk_edf_app_register,
    // [ttk_edf_app_agreement.name]: ttk_edf_app_agreement,
    // [ttk_edf_app_role.name]: ttk_edf_app_role,
    // [ttk_edf_app_role_auth.name]: ttk_edf_app_role_auth,
    // [ttk_edf_app_voucher.name]: ttk_edf_app_voucher,
    // [ttk_edf_app_voucher_detail_setting.name]: ttk_edf_app_voucher_detail_setting,
    // [ttk_edf_app_voucher_setting.name]: ttk_edf_app_voucher_setting,
}
//note-end

//EDF模块
//财务&资产模块
//税务模块



//业务模块

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


apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(edfComponents).forEach(key => {
    componentFactory.registerComponent(key, edfComponents[key])
})



start()
//FastClick.attach(document.body)
