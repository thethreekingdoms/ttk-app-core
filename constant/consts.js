﻿/**
 * 此文件由后台服务生成，请勿手工维护
 */
export const consts = {
    app : {
        APPKEY_FORESEE_ECS_SINGLE: '10001006', //财税助手(独立版)
        APPKEY_CHANJET_TPLUS: '10006001'  //TPlus
    },

    enum : {
        FILETYPE: '100001', //文件类型100001
        VOUCHERSTATUS: '100002', //单据状态100002
        VOUCHERTYPE: '100003', //单据类型100003
        FIELDTYPE: '100004', //字段类型100004
        ALIGNTYPE: '100005', //对齐方式100005
        ORDERMODE: '100006', //排序方式100006
        ORGSTATUS: '100007', //企业状态100007
        VATTAXPAYER: '200001', //纳税人身份200001
        ACCOUNTINGSTANDARDS: '200002', //会计准则200002
        INDUSTRY: '200003', //行业200003
        REGISTERTYPE: '200004', //注册类型200004
        BUSINESSINCOMETAXMODE: '200005', //征收方式200005
        TAXINCENTIVES: '200006', //税收优惠200006
        DEPARTMENTPROPERTY: '300001', //部门属性300001
        GENDER: '300002', //性别300002
        PERSONACTIVESTATUS: '300003', //激活状态300003
        BANKACCOUNTTYPE: '300005', //账号类别300005
        INVESTORTYPE: '300006', //投资人类别300006
        TAXRATETYPE: '300007', //计税方式300007
        PERSONPROPERTY: '300008', //人员属性300008
        CREDENTIALSTYPE: '300009', //证件类型300009
        MARITALSTATUS: '300010', //婚姻状况300010
        EMPLOYEE: '300011', //雇员300011
        INVOICETYPE: '400001', //票据类型400001
        PURCHASETYPE: '400002', //采购类型400002
        SETTLESTATUS: '400003', //结算状态400003
        BUSINESSPROPERTY: '400004', //业务属性400004
        SALETYPE: '400005', //销售类型400005
        PROFITANDLOSS: '400006', //损益类型400006
        DATASOURCETYPE: '400007', //数据来源类型400007
        CANCELSTATUS: '400008', //核销状态400008
        VOUCHERSOURCE: '400009', //单据来源400009
        ACCOUNTTYPE: '500001', //会计科目类别500001
        CASHTYPE: '500002', //现金类型500002
        VOUCHERTYPE: '500003', //单据类型500003
        DOCBUSINESSTYPE: '500004', //凭证业务类型500004
        CASHFLOWTYPE: '500005', //现金流量类型500005
        VOUCHERSTATUS: '500006', //单据状态500006
        GLFUNCTION: '500007', //财务报表公式500007
        ASSETPROPERTY: '510001', //资产属性510001
        DEPRMETHOD: '510002', //折旧方法510002
        DEDUCTIONTYPE: '510003', //抵扣方式510003
        ASSETADDTYPE: '510004', //资产增加方式510004
        ASSETDISPOSETYPE: '510005', //处置方式510005
        ASSETCHANGETYPE: '510006', //变动类型510006
        ASSETUSESCOPE: '510007', //使用范围510007
        ASSETUSES: '510008', //资产用途510008
        PROCESSSTATUS: '510009', //处理状态510009
    },

    FILETYPE_pic: '1000010001', //文件类型: 1000010001 图片
    FILETYPE_word: '1000010002', //文件类型: 1000010002 word
    FILETYPE_excel: '1000010003', //文件类型: 1000010003 excel
    FILETYPE_ppt: '1000010004', //文件类型: 1000010004 ppt
    FILETYPE_pdf: '1000010005', //文件类型: 1000010005 pdf
    FILETYPE_zip: '1000010006', //文件类型: 1000010006 压缩包
    FILETYPE_other: '1000019999', //文件类型: 1000019999 其他
    VOUCHERSTATUS_NotApprove: '1000020001', //单据状态: 1000020001 未审核
    VOUCHERSTATUS_Approved: '1000020002', //单据状态: 1000020002 已审核
    VOUCHERSTATUS_Rejected: '1000020003', //单据状态: 1000020003 已驳回
    VOUCHERTYPE_Doc: '1000030001', //单据类型: 1000030001 凭证
    VOUCHERTYPE_Asset: '1000030002', //单据类型: 1000030002 资产卡片
    VOUCHERTYPE_AssetSaleIncome: '1000030003', //单据类型: 1000030003 资产处置-销售收入
    VOUCHERTYPE_AssetExpense: '1000030004', //单据类型: 1000030004 资产处置-清理费用
    VOUCHERTYPE_AssetDepreciation: '1000030005', //单据类型: 1000030005 资产计提折旧
    VOUCHERTYPE_AssetGoIntoLiquidation: '1000030006', //单据类型: 1000030006 资产处置-清理
    VOUCHERTYPE_AssetlossProfit: '1000030007', //单据类型: 1000030007 资产处置-损益
    VOUCHERTYPE_Arrival: '1000030008', //单据类型: 1000030008 采购单
    VOUCHERTYPE_Delivery: '1000030009', //单据类型: 1000030009 销售单
    VOUCHERTYPE_Receive: '1000030010', //单据类型: 1000030010 收款单
    VOUCHERTYPE_Pay: '1000030011', //单据类型: 1000030011 付款单
    FIELDTYPE_string: '1000040001', //字段类型: 1000040001 字符
    FIELDTYPE_decimal: '1000040002', //字段类型: 1000040002 数值
    FIELDTYPE_datatime: '1000040003', //字段类型: 1000040003 日期
    FIELDTYPE_boolean: '1000040004', //字段类型: 1000040004 布尔
    FIELDTYPE_enum: '1000040005', //字段类型: 1000040005 枚举
    ALIGNTYPE_01: '1000050001', //对齐方式: 1000050001 左对齐
    ALIGNTYPE_02: '1000050002', //对齐方式: 1000050002 居中对齐
    ALIGNTYPE_03: '1000050003', //对齐方式: 1000050003 右对齐
    ORDERMODE_01: '1000060001', //排序方式: 1000060001 升序
    ORDERMODE_02: '1000060002', //排序方式: 1000060002 降序
    ORGSTATUS_001: '1000070001', //企业状态: 1000070001 正常
    ORGSTATUS_002: '1000070002', //企业状态: 1000070002 过期
    ORGSTATUS_003: '1000070003', //企业状态: 1000070003 试用期
    ORGSTATUS_004: '1000070004', //企业状态: 1000070004 未购买
    ORGSTATUS_005: '1000070005', //企业状态: 1000070005 未续费
    ORGSTATUS_006: '1000070006', //企业状态: 1000070006 已购买
    VATTAXPAYER_generalTaxPayer: '2000010001', //纳税人身份: 2000010001 一般纳税人
    VATTAXPAYER_smallScaleTaxPayer: '2000010002', //纳税人身份: 2000010002 小规模纳税人
    ACCOUNTINGSTANDARDS_2007: '2000020001', //会计准则: 2000020001 企业会计准则
    ACCOUNTINGSTANDARDS_2013: '2000020002', //会计准则: 2000020002 小企业会计准则
    ACCOUNTINGSTANDARDS_bank: '2000020003',//会计准则: 企业会计准则（商业银行）
    ACCOUNTINGSTANDARDS_securities: '2000020004',//会计准则: 企业会计准则（证券公司）
    ACCOUNTINGSTANDARDS_Insurance: '2000020005', //会计准则: 企业会计准则（保险公司）
    ACCOUNTINGSTANDARDS_guarantee: '2000020006',//会计准则: 企业会计准则（担保企业会计核算办法）
    ACCOUNTINGSTANDARDS_enterprise: '2000020007',//会计准则: 事业单位会计制度
    ACCOUNTINGSTANDARDS_nonProfitOrganization: '2000020008',//会计准则: 民间非营利组织会计制度
    ACCOUNTINGSTANDARDS_financerptreportandinfocollect: '2000020009',//会计准则: 企业会计制度财务报表报送与信息采集
    INDUSTRY_001: '2000030001', //行业: 2000030001 农、林、牧、渔业
    INDUSTRY_002: '2000030002', //行业: 2000030002 采矿业
    INDUSTRY_003: '2000030003', //行业: 2000030003 制造业
    INDUSTRY_004: '2000030004', //行业: 2000030004 电力、热力、燃气及水生产和供应业
    INDUSTRY_005: '2000030005', //行业: 2000030005 建筑业
    INDUSTRY_006: '2000030006', //行业: 2000030006 批发和零售业
    INDUSTRY_007: '2000030007', //行业: 2000030007 交通运输、仓储和邮政业
    INDUSTRY_008: '2000030008', //行业: 2000030008 住宿和餐饮业
    INDUSTRY_009: '2000030009', //行业: 2000030009 信息传输、软件和信息技术服务业
    INDUSTRY_010: '2000030010', //行业: 2000030010 金融业
    INDUSTRY_011: '2000030011', //行业: 2000030011 房地产业
    INDUSTRY_012: '2000030012', //行业: 2000030012 租赁和商务服务业
    INDUSTRY_013: '2000030013', //行业: 2000030013 科学研究和技术服务业
    INDUSTRY_014: '2000030014', //行业: 2000030014 水利、环境和公共设施管理业
    INDUSTRY_015: '2000030015', //行业: 2000030015 居民服务、修理和其他服务业
    INDUSTRY_016: '2000030016', //行业: 2000030016 教育
    INDUSTRY_017: '2000030017', //行业: 2000030017 卫生和社会工作
    INDUSTRY_018: '2000030018', //行业: 2000030018 文化、体育和娱乐业
    INDUSTRY_019: '2000030019', //行业: 2000030019 公共管理、社会保障和社会组织
    INDUSTRY_020: '2000030020', //行业: 2000030020 国际组织
    REGISTERTYPE_0001: '2000040001', //注册类型: 2000040001 私营企业
    REGISTERTYPE_0002: '2000040002', //注册类型: 2000040002 国有企业
    REGISTERTYPE_0003: '2000040003', //注册类型: 2000040003 集体企业
    REGISTERTYPE_0004: '2000040004', //注册类型: 2000040004 股份合作企业
    REGISTERTYPE_0005: '2000040005', //注册类型: 2000040005 联营企业
    REGISTERTYPE_0006: '2000040006', //注册类型: 2000040006 有限责任公司
    REGISTERTYPE_0007: '2000040007', //注册类型: 2000040007 股份有限公司
    REGISTERTYPE_0008: '2000040008', //注册类型: 2000040008 个人独资
    REGISTERTYPE_0009: '2000040009', //注册类型: 2000040009 合伙企业
    REGISTERTYPE_0010: '2000040010', //注册类型: 2000040010 其他企业
    BUSINESSINCOMETAXMODE_0001: '2000050001', //征收方式: 2000050001 查账征收
    TAXINCENTIVES_0001: '2000060001', //税收优惠: 2000060001 税负超过3%的部分
    TAXINCENTIVES_0002: '2000060002', //税收优惠: 2000060002 30%即征即退
    TAXINCENTIVES_0003: '2000060003', //税收优惠: 2000060003 50%即征即退
    TAXINCENTIVES_0004: '2000060004', //税收优惠: 2000060004 60%即征即退
    TAXINCENTIVES_0005: '2000060005', //税收优惠: 2000060005 70%即征即退
    TAXINCENTIVES_0006: '2000060006', //税收优惠: 2000060006 100%即征即退
    DEPARTMENTPROPERTY_otherAndManage: '3000010001', //部门属性: 3000010001 其它（含管理）
    DEPARTMENTPROPERTY_productionRelated: '3000010002', //部门属性: 3000010002 生产相关
    DEPARTMENTPROPERTY_saleRelated: '3000010003', //部门属性: 3000010003 销售相关
    DEPARTMENTPROPERTY_purchaseRelated: '3000010004', //部门属性: 3000010004 采购相关
    DEPARTMENTPROPERTY_developRelated: '3000010005', //部门属性: 3000010005 研发相关
    DEPARTMENTPROPERTY_repairRelated: '3000010006', //部门属性: 3000010006 加工修理相关
    DEPARTMENTPROPERTY_techConsultationRelated: '3000010007', //部门属性: 3000010007 技术咨询服务相关
    GENDER_male: '3000020001', //性别: 3000020001 男
    GENDER_female: '3000020002', //性别: 3000020002 女
    GENDER_secrecy: '3000020003', //性别: 3000020003 保密
    PERSONACTIVESTATUS_uninvited: '3000030001', //激活状态: 3000030001 未邀请
    PERSONACTIVESTATUS_notActive: '3000030002', //激活状态: 3000030002 未激活
    PERSONACTIVESTATUS_actived: '3000030003', //激活状态: 3000030003 已激活
    BANKACCOUNTTYPE_cash: '3000050001', //账号类别: 3000050001 现金
    BANKACCOUNTTYPE_bank: '3000050002', //账号类别: 3000050002 银行
    BANKACCOUNTTYPE_wechat: '3000050003', //账号类别: 3000050003 微信
    BANKACCOUNTTYPE_alipay: '3000050004', //账号类别: 3000050004 支付宝
    BANKACCOUNTTYPE_receivable: '3000050005', //账号类别: 3000050005 应收账款
    BANKACCOUNTTYPE_payable: '3000050006', //账号类别: 3000050006 应付账款
    BANKACCOUNTTYPE_otherReceivable: '3000050007', //账号类别: 3000050007 其他应收款
    BANKACCOUNTTYPE_otherPayable: '3000050008', //账号类别: 3000050008 其他应付款
    INVESTORTYPE_investor: '3000060001', //投资人类别: 3000060001 投资人
    INVESTORTYPE_byInvestor: '3000060002', //投资人类别: 3000060002 被投资人
    TAXRATETYPE_general: '3000070001', //计税方式: 3000070001 一般
    TAXRATETYPE_simple: '3000070002', //计税方式: 3000070002 简易
    TAXRATETYPE_other: '3000070003', //计税方式: 3000070003 其它
    PERSONPROPERTY_management: '3000080001', //人员属性: 3000080001 管理人员
    PERSONPROPERTY_producer: '3000080002', //人员属性: 3000080002 生产人员
    CREDENTIALSTYPE_001: '3000090001', //证件类型: 3000090001 身份证
    CREDENTIALSTYPE_002: '3000090002', //证件类型: 3000090002 护照
    CREDENTIALSTYPE_003: '3000090003', //证件类型: 3000090003 户口本
    CREDENTIALSTYPE_004: '3000090004', //证件类型: 3000090004 港澳居民来往内地通行证
    CREDENTIALSTYPE_005: '3000090005', //证件类型: 3000090005 台湾居民来往内地通行证
    MARITALSTATUS_001: '3000100001', //婚姻状况: 3000100001 未婚
    MARITALSTATUS_002: '3000100002', //婚姻状况: 3000100002 已婚
    MARITALSTATUS_003: '3000100003', //婚姻状况: 3000100003 保密
    EMPLOYEE_001: '3000110001', //雇员: 3000110001 雇员
    EMPLOYEE_002: '3000110002', //雇员: 3000110002 非雇员
    INVOICETYPE_generalVATInvoice: '4000010010', //票据类型: 4000010010 增值税普通发票
    INVOICETYPE_specialVATInvoice: '4000010020', //票据类型: 4000010020 增值税专用发票
    INVOICETYPE_ncpfp: '4000010030', //票据类型: 4000010030 农产品发票
    INVOICETYPE_hgjkzzszyjks: '4000010040', //票据类型: 4000010040 海关进口增值税专用缴款书
    INVOICETYPE_uninvoicedIncome: '4000010700', //票据类型: 4000010700 无票收入
    INVOICETYPE_uninvoicedExpenditure: '4000010800', //票据类型: 4000010800 无票支出
    INVOICETYPE_otherInvoice: '4000010900', //票据类型: 4000010900 其他票据
    INVOICETYPE_uninvoiced: '4000010700', //票据类型: 4000010700 未开具发票
    PURCHASETYPE_normal: '4000020001', //采购类型: 4000020001 普通采购
    PURCHASETYPE_return: '4000020002', //采购类型: 4000020002 采购退货
    SETTLESTATUS_notSettle: '4000030001', //结算状态: 4000030001 未结清
    SETTLESTATUS_settled: '4000030002', //结算状态: 4000030002 已结清
    BUSINESSPROPERTY_income: '4000040001', //业务属性: 4000040001 收入
    BUSINESSPROPERTY_expenditure: '4000040002', //业务属性: 4000040002 支出
    SALETYPE_normal: '4000050001', //销售类型: 4000050001 普通采购
    SALETYPE_return: '4000050002', //销售类型: 4000050002 采购退货
    PROFITANDLOSS_loss: '4000060001', //损益类型: 4000060001 清理损失
    PROFITANDLOSS_profit: '4000060002', //损益类型: 4000060002 清理收益
    DATASOURCETYPE_enum: '4000070001', //数据来源类型: 4000070001 枚举
    DATASOURCETYPE_boolean: '4000070002', //数据来源类型: 4000070002 布尔
    CANCELSTATUS_canceled: '4000080001', //核销状态: 4000080001 已核销
    CANCELSTATUS_notCancel: '4000080002', //核销状态: 4000080002 未核销
    VOUCHERSOURCE_manual: '4000090001', //单据来源: 4000090001 手工录入
    VOUCHERSOURCE_invoiceCollect: '4000090002', //单据来源: 4000090002 发票采集
    VOUCHERSOURCE_import: '4000090003', //单据来源: 4000090003 导入
    ACCOUNTTYPE_assets: 5000010001, //会计科目类别: 5000010001 资产
    ACCOUNTTYPE_liabilities: 5000010002, //会计科目类别: 5000010002 负债
    ACCOUNTTYPE_common: 5000010003, //会计科目类别: 5000010003 共同
    ACCOUNTTYPE_rightsAndInterests: 5000010004, //会计科目类别: 5000010004 权益
    ACCOUNTTYPE_cost: 5000010005, //会计科目类别: 5000010005 成本
    ACCOUNTTYPE_profitAndLoss: 5000010006, //会计科目类别: 5000010006 损益
    ACCOUNTTYPE_netAssets: 5000010007, //会计科目类别: 5000010007 净资产
    ACCOUNTTYPE_income: 5000010008, //会计科目类别: 5000010008 收入
    ACCOUNTTYPE_expenses: 5000010009, //会计科目类别: 5000010009 费用
    CASHTYPE_001: '5000020001', //现金类型: 5000020001 现金
    CASHTYPE_002: '5000020002', //现金类型: 5000020002 其他货币资金
    CASHTYPE_003: '5000020003', //现金类型: 5000020003 银行存款
    CASHTYPE_004: '5000020004', //现金类型: 5000020004
    CASHTYPE_005: '5000020005', //现金类型: 5000020005 本年利润
    CASHTYPE_006: '5000020006', //现金类型: 5000020006 库存商品
    CASHTYPE_007: '5000020007', //现金类型: 5000020007 货物销售
    CASHTYPE_008: '5000020008', //现金类型: 5000020008 货物销售成本
    CASHTYPE_009: '5000020009', //现金类型: 5000020009 附科目
    CASHTYPE_010: '5000020010', //现金类型: 5000020010 利息收入
    CASHTYPE_011: '5000020011', //现金类型: 5000020011 费用化支出
    CASHTYPE_012: '5000020012', //现金类型: 5000020012 研究费
    CASHTYPE_013: '5000020013', //现金类型: 5000020013 税金附加
    CASHTYPE_014: '5000020014', //现金类型: 5000020014 其他应收员工
    CASHTYPE_015: '5000020015', //现金类型: 5000020015 其他应收客户
    CASHTYPE_016: '5000020016', //现金类型: 5000020016 其他应付供应商
    CASHTYPE_017: '5000020017', //现金类型: 5000020017 其他应付员工
    CASHTYPE_018: '5000020018', //现金类型: 5000020018 待抵扣进项
    CASHTYPE_019: '5000020019', //现金类型: 5000020019 减免税款
    CASHTYPE_020: '5000020020', //现金类型: 5000020020 转出未交增值税
    CASHTYPE_021: '5000020021', //现金类型: 5000020021 转出多交增值税
    CASHTYPE_022: '5000020022', //现金类型: 5000020022 未交增值税
    CASHTYPE_023: '5000020023', //现金类型: 5000020023 简易计税
    CASHTYPE_024: '5000020024', //现金类型: 5000020024 实收资本
    CASHTYPE_025: '5000020025', //现金类型: 5000020025 应交增值税
    CASHTYPE_026: '5000020026', //现金类型: 5000020026 政府补助
    CASHTYPE_027: '5000020027', //现金类型: 5000020027 城市维护建设税
    CASHTYPE_028: '5000020028', //现金类型: 5000020028 教育费附加
    CASHTYPE_029: '5000020029', //现金类型: 5000020029 地方教育费附加
    CASHTYPE_030: '5000020030', //现金类型: 5000020030 其他收益
    CASHTYPE_031: '5000020031', //现金类型: 5000020031 预交增值税
    CASHTYPE_032: '5000020032', //现金类型: 5000020032 应收税费返还
    CASHTYPE_033: '5000020033', //现金类型: 5000020033 长期股权投资
    CASHTYPE_034: '5000020034', //现金类型: 5000020034 长期股权投资成本
    CASHTYPE_035: '5000020035', //现金类型: 5000020035 长期股权投资损益调整
    CASHTYPE_036: '5000020036', //现金类型: 5000020036 长期股权投资其他权益变动
    CASHTYPE_037: '5000020037', //现金类型: 5000020037 长期股权投资其他综合收益
    CASHTYPE_038: '5000020038', //现金类型: 5000020038 进项税额
    CASHTYPE_039: '5000020039', //现金类型: 5000020039 水利建设基金
    CASHTYPE_040: '5000020040', //现金类型: 5000020040 进项转出
    CASHTYPE_041: '5000020041', //现金类型: 5000020041 所得税费用
    CASHTYPE_042: '5000020042', //现金类型: 5000020042 应交所得税
    DOCBUSINESSTYPE_GeneralDoc: '5000040001', //凭证业务类型: 5000040001 普通手工凭证
    DOCBUSINESSTYPE_ExternalDoc: '5000040002', //凭证业务类型: 5000040002 外部单据凭证
    DOCBUSINESSTYPE_BusinessDoc: '5000040003', //凭证业务类型: 5000040003 业务凭证
    DOCBUSINESSTYPE_ProfitAndLossDoc: '5000040004', //凭证业务类型: 5000040004 结转损益凭证
    DOCBUSINESSTYPE_SaleCostDoc: '5000040005', //凭证业务类型: 5000040005 销售成本结转
    DOCBUSINESSTYPE_ExchangeGainOrLossDoc: '5000040006', //凭证业务类型: 5000040006 汇兑损益凭证
    DOCBUSINESSTYPE_ExpenseDoc: '5000040007', //凭证业务类型: 5000040007 费用化支出
    DOCBUSINESSTYPE_VATDoc1: '5000040008', //凭证业务类型: 5000040008 增值税结转凭证1
    DOCBUSINESSTYPE_VATDoc2: '5000040009', //凭证业务类型: 5000040009 增值税结转凭证2
    DOCBUSINESSTYPE_VATDoc3: '5000040010', //凭证业务类型: 5000040010 增值税结转凭证3
    DOCBUSINESSTYPE_VATDoc4: '5000040011', //凭证业务类型: 5000040011 增值税结转凭证4
    DOCBUSINESSTYPE_VATDoc5: '5000040012', //凭证业务类型: 5000040012 增值税结转凭证5
    DOCBUSINESSTYPE_VATDoc6: '5000040013', //凭证业务类型: 5000040013 增值税结转凭证6
    DOCBUSINESSTYPE_IncomTaxDoc: '5000040014', //凭证业务类型: 5000040014 计提所得税凭证
    DOCBUSINESSTYPE_AssetDepreciationDoc: '5000040015', //凭证业务类型: 5000040015 资产计提折旧凭证
    DOCBUSINESSTYPE_AmortizeIntangibleAssetDoc: '5000040016', //凭证业务类型: 5000040016 摊销无形资产凭证
    DOCBUSINESSTYPE_AmortizeLongCostDoc: '5000040017', //凭证业务类型: 5000040017 摊销长期待摊费用凭证
    CASHFLOWTYPE_001: '5000050001', //现金流量类型: 5000050001 经营活动
    CASHFLOWTYPE_002: '5000050002', //现金流量类型: 5000050002 投资活动
    CASHFLOWTYPE_003: '5000050003', //现金流量类型: 5000050003 筹资活动
    CASHFLOWTYPE_004: '5000050004', //现金流量类型: 5000050004 汇率变动
    CASHFLOWTYPE_005: '5000050005', //现金流量类型: 5000050005 现金及现金等价物
    CASHFLOWTYPE_006: '5000050006', //现金流量类型: 5000050006 不影响现金流量的项目
    GLFUNCTION_balanceSheetFunction: '5000070001', //财务报表公式: 5000070001 资产负债表公式
    GLFUNCTION_profitStatementFunction: '5000070002', //财务报表公式: 5000070002 利润表公式
    GLFUNCTION_cashFlowStatementFunction: '5000070003', //财务报表公式: 5000070003 现金流量表公式
    ASSETPROPERTY_0001: '5100010001', //资产属性: 5100010001 固定资产
    ASSETPROPERTY_0002: '5100010002', //资产属性: 5100010002 无形资产
    ASSETPROPERTY_0003: '5100010003', //资产属性: 5100010003 长期待摊费用
    ASSETPROPERTY_0004: '5100010004',//资产属性: 5100010004 待摊费用
    DEPRMETHOD_0001: '5100020001', //折旧方法: 5100020001 直线法(平均年限法)
    DEPRMETHOD_0002: '5100020002', //折旧方法: 5100020002 双倍余额递减法
    DEPRMETHOD_0003: '5100020003', //折旧方法: 5100020003 年数总和法
    DEPRMETHOD_0004: '5100020004', //折旧方法: 5100020004 一次性加速计提
    DEPRMETHOD_0005: '5100020005', //折旧方法: 5100020005 不提折旧
    DEDUCTIONTYPE_0001: '5100030001', //抵扣方式: 5100030001 不抵扣
    DEDUCTIONTYPE_0002: '5100030002', //抵扣方式: 5100030002 按进项税抵扣
    DEDUCTIONTYPE_0003: '5100030003', //抵扣方式: 5100030003 全额抵扣
    ASSETADDTYPE_0001: '5100040001', //资产增加方式: 5100040001 直接购入
    ASSETADDTYPE_0002: '5100040002', //资产增加方式: 5100040002 自行开发
    ASSETADDTYPE_0003: '5100040003', //资产增加方式: 5100040003 投资者投入
    ASSETADDTYPE_0004: '5100040004', //资产增加方式: 5100040004 捐赠
    ASSETADDTYPE_0005: '5100040005', //资产增加方式: 5100040005 盘盈
    ASSETADDTYPE_0006: '5100040006', //资产增加方式: 5100040006 在建工程转入
    ASSETADDTYPE_0007: '5100040007', //资产增加方式: 5100040007 融资租入
    ASSETADDTYPE_0008: '5100040008', //资产增加方式: 5100040008 拆分新增
    ASSETADDTYPE_0009: '5100040009', //资产增加方式: 5100040009 其他来源
    ASSETDISPOSETYPE_0001: '5100050001', //处置方式: 5100050001 出售转让
    ASSETDISPOSETYPE_0002: '5100050002', //处置方式: 5100050002 报废或毁损
    ASSETCHANGETYPE_0001: '5100060001', //变动类型: 5100060001 资产新增
    ASSETCHANGETYPE_0002: '5100060002', //变动类型: 5100060002 资产修改
    ASSETCHANGETYPE_0003: '5100060003', //变动类型: 5100060003 计提折旧
    ASSETCHANGETYPE_0004: '5100060004', //变动类型: 5100060004 资产处置
    ASSETUSESCOPE_0001: '5100070001', //使用范围: 5100070001 与研发无关
    ASSETUSESCOPE_0002: '5100070002', //使用范围: 5100070002 研发专用
    ASSETUSESCOPE_0003: '5100070003', //使用范围: 5100070003 研发和生产经营共用
    ASSETUSES_0001: '5100080001', //资产用途: 5100080001 生产经营使用
    ASSETUSES_0002: '5100080002', //资产用途: 5100080002 行政管理使用
    ASSETUSES_0003: '5100080003', //资产用途: 5100080003 销售运营使用
    ASSETUSES_0004: '5100080004', //资产用途: 5100080004 研发技术使用
    ASSETUSES_0005: '5100080005', //资产用途: 5100080005 出租经营使用
    PROCESSSTATUS_0001: '5100090001', //处理状态: 5100090001 未提交
    PROCESSSTATUS_0002: '5100090002', //处理状态: 5100090002 未处理
    PROCESSSTATUS_0003: '5100090003', //处理状态: 5100090003 处理中
    PROCESSSTATUS_0004: '5100090004', //处理状态: 5100090004 已处理
    GDSLX_GS: '1', //国地税类型：1 国税
    GDSLX_DS: '2', //国地税类型：2 地税
    PROVINCE_BEIJING: 11,   //省份：11 北京
    PROVINCE_JIANGSU: 32,   //省份：32 江苏
    PROVINCE_FUJIAN: 35,    //省份：35 福建
    PROVINCE_GUANGDONG: 44, //省份：44 广东
    PROVINCE_GUIZHOU: 52,   //省份：52 贵州
    PROVINCE_SHANXI: 61,    //省份：61 陕西
    PROVINCE_SHANDONG: 37,   //省份：37 山东
    PROVINCE_QINGDAO: 3702,  //市区：3702 青岛
    PROVINCE_QINGHAI: 63,    //省份：63 青海
    PROVINCE_DALIAN: 2102,   //市区：2102 大连
    PROVINCE_SICHUAN: 51,    //省份：2102 四川
    PROVINCE_GANSU: 62,    //省份：62 甘肃省

    DOMAIN_LOCALHOST: 'localhost',   //本地
    DOMAIN_LOCALHOST_IP: '127.0.0.1',  //本地
    DOMAIN_DEV_INNER: 'dev.aierp.cn:8089',  //dev内网
    DOMAIN_DEV_OUTER: 'dev.aierp.cn',  //dev外网
    DOMAIN_DEBUG_INNER: 'debug.aierp.cn:8089',  //debug内网
    DOMAIN_DEBUG_OUTER: 'debug.aierp.cn',  //debug外网
    DOMAIN_DEMO: 'erpdemo.jchl.com',  //demo地址
    DOMAIN_ONLINE: 'erp.jchl.com',  //线上地址
    DOMAIN_GJ_DEV: 'http://gj.aierp.cn:8089',  //着陆页dev地址
    DOMAIN_GJ_DEMO: 'https://gjdemo.jchl.com',  //着陆页demo地址
    DOMAIN_GJ_ONLINE: 'https://gj.jchl.com',  //着陆页线上地址

    API_DOMAIN_DEV: 'http://api.dev.aierp.cn:8089/v1',  //api dev地址
    API_DOMAIN_TEST: 'http://api.test.aierp.cn:8089/v1',  //api test地址
    API_DOMAIN_DEBUG: 'http://api.aierp.cn:8089/v1',  //api debug地址
    API_DOMAIN_DEMO: 'http://apierpdemo.jchl.com/v1',  //api demo地址
    API_DOMAIN_ONLINE: 'http://apierp.jchl.com/v1',  //api online地址

    //jcyy
    JCYY_DEV_DOMAIN: 'http://dev-jcyy.aierp.cn:8089',
    JCYY_TEST_DOMAIN: 'http://test-jcyy.aierp.cn:8089',
    JCYY_DEMO_DOMAIN_HTTP: 'http://es-demo.jchl.com',
    JCYY_DEMO_DOMAIN_HTTPS: 'https://es-demo.jchl.com',
    JCYY_ONLINE_DOMAIN: 'https://es.jchl.com',

    //xdz
    XDZ_DEV: 'http://dev-xdz.aierp.cn:8089',
    XDZ_TEST: 'http://xdz.aierp.cn:8089',
    XDZ_DEMO: 'https://xdzdemo.jchl.com',
    XDZ_ONLINE: 'https://xdz.jchl.com',
    XDZ_ONLINE_NEW: 'jcdz.jchl.com',
}
