import app_test from "./app-test";
import app_test2 from "./app-test2";

import ttk_tax_app_vattaxpayer from "./ttk-tax-app-vattaxpayer"
import ttk_tax_app_select from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-select"
import ttk_tax_app_zzsjmssbmxb from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsjmssbmxb"
import ttk_tax_app_zzsjmssbmxb_beijing from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsjmssbmxb-beijing"
import ttk_tax_app_zzssyyxgmnsr from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzssyyxgmnsr"
import ttk_tax_app_zzsxgmfjssb from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmfjssb"
import ttk_tax_app_zzsxgmflzl from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmflzl"
import ttk_tax_app_zzsxgmkcxmqd from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmkcxmqd"
import ttk_tax_app_zzsxgmxsbdcqkb from "./ttk-tax-app-vattaxpayer/apps/ttk-tax-app-zzsxgmxsbdcqkb"


const obj = {

  [app_test.name]: app_test,
  [app_test2.name]: app_test2,
  [ttk_tax_app_vattaxpayer.name]: ttk_tax_app_vattaxpayer,
  [ttk_tax_app_select.name]: ttk_tax_app_select,
  [ttk_tax_app_zzsjmssbmxb.name]: ttk_tax_app_zzsjmssbmxb,
  [ttk_tax_app_zzsjmssbmxb_beijing.name]: ttk_tax_app_zzsjmssbmxb_beijing,
  [ttk_tax_app_zzssyyxgmnsr.name]: ttk_tax_app_zzssyyxgmnsr,
  [ttk_tax_app_zzsxgmfjssb.name]: ttk_tax_app_zzsxgmfjssb,
  [ttk_tax_app_zzsxgmflzl.name]: ttk_tax_app_zzsxgmflzl,
  [ttk_tax_app_zzsxgmkcxmqd.name]: ttk_tax_app_zzsxgmkcxmqd,
  [ttk_tax_app_zzsxgmxsbdcqkb.name]: ttk_tax_app_zzsxgmxsbdcqkb



};
window.publicModule && window.publicModule.callback(obj, "test");

export default obj;
