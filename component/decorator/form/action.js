import utils from 'edf-utils'
import ReactDOM from 'react-dom'
import config from './config'
import Immutable, { fromJS, Map, List } from 'immutable'
import { LoadingMask } from 'edf-component';
import { consts } from 'edf-constant'

let requiredFieldList = []
export default class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.voucherAction = option.voucherAction
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        this.config = config.current
        this.webapi = this.config.webapi
    }

    fieldChange = async (fieldPath, value, checkFn) => {
        await this.check([{ path: fieldPath, value }], checkFn, true)
    }
    /*
    check = async (option, checkFn, needSaveFieldValue) => {
        if (!option || !option instanceof Array)
            return

        var checkResults = []

        for (let child of option) {
            let checkResult

            if (checkFn) {
                checkResult = await checkFn({ path: child.path, value: child.value })
            }

            if (checkResult) {
                checkResults.push(checkResult)
            }
        }

        var hasError = false, json = {}
        if (needSaveFieldValue) {
            option.forEach(o => {
                json[o.path] = o.value
            })
        }

        if (checkResults.length > 0) {
            checkResults.forEach(o => {
                json[o.errorPath] = o.message
                if (o.message)
                    hasError = true
            })
        }

        if (json) {
            this.metaAction.sfs(json)
        }
        return !hasError
    }*/

    setting = async (dtoProp, isVoucher) => {
        if (!dtoProp) return
        const ret = await this.metaAction.modal('show', {
            title: '设置',
            width: 700,
            children: this.metaAction.loadApp('app-setting', {
                store: this.component.props.store,
                dtoProp,
                isVoucher
            })
        })
        if (ret) {
            return ret
            //
        }
    }

    getSupplier = async (option, field) => {
        const response = await this.webapi.supplier.queryList(option)
        if (response) {
            this.metaAction.sf(field || 'data.other.supplier', fromJS(response.list))
        }
    }

    addSupplier = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增供应商',
            width: 700,
            children: this.metaAction.loadApp(
                'app-card-vendor', {
                    store: this.component.props.store
                }
            )
        })

        if (ret && ret.isEnable) {
            if (typeof field === 'string') {
                this.metaAction.sfs({ [field]: fromJS(ret) })
            } else {
                Object.keys(field).forEach(key => {
                    this.metaAction.sf(field[key], ret[key])
                })
            }
        }
    }

    getCustomer = async (option, field) => {
        const response = await this.webapi.customer.queryList(option)
        if (response) {
            this.metaAction.sf(field || 'data.other.customer', fromJS(response.list))
        }
    }

    addCustomer = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增客户',
            width: 700,
            children: this.metaAction.loadApp(
                'app-card-customer', {
                    store: this.component.props.store
                }
            )
        })
        if (ret && ret.isEnable) {
            if (typeof field === 'string') {
                this.metaAction.sfs({ [field]: fromJS(ret) })
            } else {
                Object.keys(field).forEach(key => {
                    this.metaAction.sf(field[key], ret[key])
                })
            }
        }
    }

    getDepartment = async (params, field) => {
        const response = await this.webapi.department.queryList(params)
        if (response) {
            this.metaAction.sf(field || 'data.other.department', fromJS(response.list))
        }
    }

    addDepartment = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增部门',
            width: 400,
            children: this.metaAction.loadApp(
                'app-card-department', {
                    store: this.component.props.store
                }
            )
        })

        if (ret && field) {
            if (typeof field === 'string') {
                this.metaAction.sfs({ [field]: fromJS(ret) })
            } else {
                Object.keys(field).forEach(key => {
                    this.metaAction.sf(field[key], ret[key])
                })
            }
        }
    }

    getPerson = async (params, field) => {
        if (!params) params = {}
        if (params.deptId) params.departmentId = params.deptId
        const response = await this.webapi.person.queryList(params)
        if (response) {
            this.metaAction.sf(field || 'data.other.person', fromJS(response.list))
        }
    }

    addPerson = async (field) => {
        const ret = await this.metaAction.modal('show', {
            // title: '新增业务员',
            title: '新增人员',
            width: 720,
            children: this.metaAction.loadApp(
                'app-card-person', {
                    store: this.component.props.store
                }
            )
        })

        if (ret) {
            if (typeof field === 'string') {
                this.metaAction.sfs({ [field]: fromJS(ret) })
            } else {
                Object.keys(field).forEach(key => {
                    this.metaAction.sf(field[key], ret[key])
                })
            }
        }
    }

    getProject = async (params, field) => {
        if (!params) {
            params = { notNeedPage: true, status: 1 }
        }
        const response = await this.webapi.project.queryList(params)
        if (response) {
            this.metaAction.sf(field || 'data.other.project', fromJS(response.list))
        }
    }

    addProject = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增项目',
            width: 400,
            children: this.metaAction.loadApp(
                'app-card-project', {
                    store: this.component.props.store
                }
            )
        })

        if (ret && ret.isEnable) {
            if (typeof field === 'string') {
                this.metaAction.sfs({ [field]: fromJS(ret) })
            } else {
                Object.keys(field).forEach(key => {
                    this.metaAction.sf(field[key], ret[key])
                })
            }
        }
    }

    getInventory = async (params, field) => {
        let invParam = { status: true, notNeedPage: true }
        if (params && params.voucherTypeId) {
            invParam.voucherTypeId = params.voucherTypeId
        }
        const response = await this.webapi.inventory.queryList(invParam)
        if (response) {
            this.metaAction.sf(field || 'data.other.inventory', fromJS(response.list))
        }
    }

    getTaxRate = async (params) => {
        //税率
        // console.log(params, 'params')
    }

    getRevenueType = async (params, field) => { //收入类型
        const response = await this.webapi.inventory.revenueType(params)
        if (response) {
            this.metaAction.sf(field || 'data.other.revenueType', fromJS(response))
        }
    }

    getBankAccount = async (params, field) => {
        if (!params) {
            params = {
                bankAccountTypeIds: [98, 99, 101, 100, 152],
                status: true
            }
        }
        else {
            params = {
                status: true,
                bankAccountTypeIds: params.bankAccountTypeIds
            }
        }
        const response = await this.webapi.bankaccount.queryList(params)

        if (response) {
            this.metaAction.sf(field || 'data.other.bankAccount', fromJS(response.list))
        }
    }



    addAssets = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增资产',
            children: this.metaAction.loadApp(
                'app-card-assets', {
                    store: this.component.props.store
                }
            )
        })

        if (ret) {

        }
    }

    addInventory = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增存货',
            width: 750,
            children: this.metaAction.loadApp(
                'app-card-inventory', {
                    store: this.component.props.store
                }
            )
        })

        if (ret && ret.isEnable) {
            this.metaAction.sfs({
                [field]: fromJS(ret)
            })
        }
    }

    addCurrency = async (field) => {
        const ret = await this.metaAction.modal('show', {
            title: '新增币种',
            children: this.metaAction.loadApp(
                'app-card-currency', {
                    store: this.component.props.store
                }
            )
        })

        if (ret && ret.isEnable) {
            this.metaAction.sfs({
                [field]: fromJS(ret)
            })
        }
    }

	beforeUpload = (file) => {
		let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "MacIntel" && navigator.userAgent.toLowerCase().indexOf('chrome')<0)
		if(!isWin) return
		let type = file.type ? file.type : ''
		if(!(type == 'application/vnd.ms-excel'
				|| type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
			LoadingMask.hide()
			this.metaAction.toast('error', '仅支持上传Excel格式的文件')
			return false
		}
    }

    calc = (fieldName, rowIndex, rowData, params) => {
        let v = params.value
        if (fieldName === 'price') {//单价
            this.priceChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'amount') {//金额
            this.amountChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'quantity') {//数量
            this.quantityChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'taxRateName') {//税率
            this.taxRateChange(rowIndex, rowData, v, params.hasChangeTaxAmount)
        }
        else if (fieldName === 'tax') {//税额
            this.taxChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'taxInclusiveAmount') {
            this.taxInclusiveAmountChange(rowIndex, rowData, v)
        }

    }

    priceChange = (rowIndex, rowData, v) => {
        // 金额＝单价×数量
        // 税额＝金额×税率
        // 价税合计＝金额＋税额
        
        let taxRate = utils.number.round(rowData.taxRateId/100, 2)
        const price = utils.number.round(v, 2),
            quantity = utils.number.round(rowData.quantity, 2),
            amount = utils.number.round(price * quantity, 2),
            tax = utils.number.round(amount * (taxRate ? taxRate : 0), 2),
            taxInclusiveAmount = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.price`]: price,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
        })
    }

    amountChange = (rowIndex, rowData, v) => {
        // 税额＝金额×税率
        // 价税合计＝金额+税额
        // 如果数量为0 ，单价为0
        // 如果数量不为0，单价＝金额÷数量 
     
        let taxRate = utils.number.round(rowData.taxRateId/100, 2)
        const amount = utils.number.round(v, 2),
            quantity = utils.number.round(rowData.quantity, 2),
            price = utils.number.round(rowData.price, 2),
            tax = utils.number.round(amount * (taxRate ? taxRate: 0), 2),
            taxInclusiveAmount = utils.number.round(amount + tax, 2)
          let _price = 0

        if (quantity != 0) {
            _price = utils.number.round(amount / quantity, 2)
        } 

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
            [`data.form.details.${rowIndex}.price`]: _price
        })
    }

    quantityChange = (rowIndex, rowData, v) => {
        // 金额＝单价×数量
        // 税额＝金额×税率
        // 价税合计＝金额＋税额
       
        let taxRate = utils.number.round(rowData.taxRateId/100, 2)
        const quantity = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            amount = utils.number.round(price * quantity, 2),
            tax = utils.number.round(amount * (taxRate ? taxRate: 0), 2),
            taxInclusiveAmount = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.quantity`]: quantity,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
        })
    }

    taxRateChange = (rowIndex, rowData, v, hasChangeTaxAmount) => {
        // 金额＝价税合计÷（1＋税率）
        // 税额＝价税合计－金额
        // 如果数量为0，单价为0
        // 如果数量不为0:
        // 单价=价税合计÷（1＋税率）÷数量
        
        let taxRates = this.metaAction.gf('data.other.taxRate').toJS()
            let hit = taxRates.find(o => o.id == v)
            if (!hit) return
            let taxRate = utils.number.round(hit.taxRate, 2)
            if (hasChangeTaxAmount) {
                const taxInclusiveAmount = utils.number.round(rowData.taxInclusiveAmount, 2),
                    amount = utils.number.round(taxInclusiveAmount / (1 + taxRate), 2),
                    tax = utils.number.round(taxInclusiveAmount - amount, 2),
                    quantity = utils.number.round(rowData.quantity, 2)
                    
                let _price = 0
                if (quantity != 0) {
                    _price = utils.number.round(taxInclusiveAmount / (1 + taxRate) / quantity, 2)
                }

                this.metaAction.sfs({
                    [`data.form.details.${rowIndex}.taxRateId`]: hit["id"],
                    [`data.form.details.${rowIndex}.taxRateName`]: hit["name"],
                    [`data.form.details.${rowIndex}.tax`]: tax,
                    [`data.form.details.${rowIndex}.amount`]: amount,
                    [`data.form.details.${rowIndex}.price`]: _price,
                })
            } else {
                const amount = utils.number.round(rowData.amount, 2),
                    tax = utils.number.round(amount * taxRate, 2),
                    taxInclusiveAmount = utils.number.round(amount + tax, 2)

                this.metaAction.sfs({
                    [`data.form.details.${rowIndex}.taxRateId`]: hit["id"],
                    [`data.form.details.${rowIndex}.taxRateName`]: hit["name"],
                    [`data.form.details.${rowIndex}.tax`]: tax,
                    [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
                })
            }
    }

    taxChange = (rowIndex, rowData, v) => {
        // 金额=价税合计－税额
        // 如果数量为0，则单价为0
        // 如果数量不为0，单价=金额÷数量
        
        const tax = utils.number.round(v, 2),
              taxInclusiveAmount = utils.number.round(rowData.taxInclusiveAmount, 2),
              quantity = utils.number.round(rowData.quantity, 2),
              amount = utils.number.round(taxInclusiveAmount - tax, 2)
        let _price = 0
        if (quantity != 0) {
            _price = utils.number.round(amount/quantity, 2)
        }

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.price`]: _price
        })

        // amount = utils.number.round(rowData.amount, 2),
        // taxInclusiveAmount = utils.number.round(tax+amount, 2),
        // this.metaAction.sfs({
        //     [`data.form.details.${rowIndex}.tax`]: tax,
        //     [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
        // })
        
    }

    taxInclusiveAmountChange = (rowIndex, rowData, v) => {
        // 金额＝价税合计÷（1＋税率）
        // 税额＝价税合计－金额
        // 如果数量为0，单价为0
        // 如果数量不为0:
        // 单价=价税合计÷（1＋税率）÷数量
        
        let taxRate = utils.number.round(rowData.taxRateId/100, 2)

        const taxInclusiveAmount = utils.number.round(v, 2),
              amount = utils.number.round(taxInclusiveAmount/(1+taxRate), 2),
              tax = utils.number.round(taxInclusiveAmount-amount, 2),
              quantity = utils.number.round(rowData.quantity, 2)
        let _price = 0
        if (quantity != 0) {
            _price = utils.number.round(taxInclusiveAmount/(1 + taxRate)/quantity, 2)
        }
        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.price`]: _price,
        })
    }

    sumColumn = (col) => {
        let currentSumCol = col,
            details = this.metaAction.gf('data.form.details')
        return this.numberFormat(this.sum(details, (a, b) => a + b.get(`${currentSumCol}`)), 2)
    }

    sum = (details, fn) => {
        if (!details || details.length == 0)
            return this.numberFormat(0, 2)

        return details.reduce((a, b) => {
            let r = fn(a, b)
            return isNaN(r) ? a : r
        }, 0)
    }

    cancel = (params) => {
        if (params) {
            // let isChanged = this.metaAction.gf(params.statusPath)
            // if (isChanged == consts.VOUCHER_STATUS_EDIT || isChanged == consts.VOUCHER_STATUS_ADD) {
            //     if (ma.confirm('放弃', '单据尚未保存，还要离开吗？')) {
            //         //
            //     }
            // }
        }

    }


    setVoucherStatus = (status) => {

    }


    getControlVisible = (params) => {
        return true
    }


    getVoucherRequiredField = (ele) => {
        let rootMeta = this.metaAction.gm('root')
        if (rootMeta && rootMeta.children) {
            rootMeta.children.map((ele, index) => {
                this.getVoucherRequiredField(ele)
            })
        }
    }

    checkSaveInvoice = (form, page) => {
        let msg = [], allItemEmpty = true
        if (page == 'pu') {
            if (!form.supplierId) {
                msg.push('供应商不能为空')
            }
        } else if (page == 'sa') {
            if (!form.customerId) {
                msg.push('客户不能为空')
            }
        }

        if (!form.businessDate)
        msg.push('记账日期不能为空')

        if (!form.invoiceTypeId)
        msg.push('票据类型不能为空') 
        
        if (!form.invoiceDate && page == 'pu')
        msg.push('开票日期不能为空')

        if (form.invoiceNumber && (form.invoiceNumber.length != 8)) {
            msg.push('发票号码长度必须为8位')
        }

        if (form.invoiceCode && form.invoiceCode.length != 10 && form.invoiceCode.length != 12) {
            msg.push('发票代码长度必须为10位或者12位')
        }

        if (!form.details || form.details.length == 0) {
            msg.push('明细不能为空')
        }

        // form.details.forEach((detail, index) => {
        //     let isSelect = false
        //     if (!detail.inventoryId && !detail.quantity && !detail.price && !detail.amount && !detail.taxInclusiveAmount) {
        //         isSelect = true
        //     }

        //     if (!isSelect) {
        //         let errorStr = ''
        //         if (!detail.inventoryId) errorStr = errorStr + '存货不能为空,'
        //         if (!detail.quantity) errorStr = errorStr + '数量不能为空或0,'
        //         // if (detail.price!=0 && !detail.price) errorStr = errorStr + '单价不能为空,'
        //         // if (detail.amount!=0 && !detail.amount) errorStr = errorStr + '金额不能为空'
        //         if (!detail.price) errorStr = errorStr + '单价不能为空或0,'
        //         if (!detail.amount) errorStr = errorStr + '金额不能为空或0'
        //         errorStr && msg.push(`明细第${index + 1}行，${errorStr}`)
        //     }
        // })

        for (let i = 0; i < form.details.length; i++) {
            if (!form.details[i] || (
                !form.details[i].inventoryId 
                && !form.details[i].quantity 
                && !form.details[i].price 
                && !form.details[i].amount 
                && !form.details[i].taxRateId 
                && !form.details[i].tax
                && !form.details[i].unitId
                && !form.details[i].taxInclusiveAmount
                && (page == 'sa' ? !form.details[i].revenueType : true)
                )) {
                    continue
            }

            allItemEmpty = false

            let errorStr = ''
            if (!form.details[i].inventoryId) errorStr = errorStr + '存货不能为空,'
            if (!form.details[i].revenueType && page == 'sa') errorStr = errorStr + '收入类型不能为空,'
            if (!form.details[i].quantity) errorStr = errorStr + '数量不能为空或0,'
            if (!form.details[i].price) errorStr = errorStr + '单价不能为空或0,'
            if (!form.details[i].amount) errorStr = errorStr + '金额不能为空或0'
            errorStr && msg.push(`明细第${i + 1}行，${errorStr}`)
        }

        if (allItemEmpty) {
            msg.push('明细不能为空')
        }
        return msg
    }

    checkSaveOtherInvoice = (form) => {
        let otherMsg = []

        let details = form.details

        // if (form.invoiceNumber && (form.invoiceNumber.length != 8)) {
        //     otherMsg.push('发票号码长度必须为8位！')
        //     return otherMsg
        // }

        // if (form.invoiceCode && (form.invoiceCode.length != 10 && form.invoiceCode.length != 12)) {
        //     otherMsg.push('发票代码长度必须为10位或者12位！')
        //     return otherMsg
        // }
        
        if (details) {
            details = details.filter(detail => {
                return (detail.inventoryId || detail.quantity || detail.price || detail.amount)
            })
            for (let i = 0; i < details.length; i++) {
                for (let j = i + 1; j < details.length - i; j++) {

                    const judgeObj = details[i].amount * details[j].amount < 0 || details[i].quantity * details[j].quantity < 0 ||
                     details[i].tax * details[j].tax < 0 || details[i].price * details[j].price < 0 || details[i].taxInclusiveAmount * details[j].taxInclusiveAmount < 0
                     
                    const max = (details[i].amount > 0 && details[i].quantity > 0 && details[i].tax > 0 && details[i].taxInclusiveAmount > 0)
                    const min = (details[i].amount < 0 && details[i].quantity < 0 && details[i].tax < 0 && details[i].taxInclusiveAmount < 0)
                    const judgeAttribute = !(max || min)
                    if (details[i].price < 0 || details[j].price < 0) {
                        otherMsg.push('单价不能为负数')
                        return otherMsg
                    }
                  
                    if (judgeObj || judgeAttribute) {
                        otherMsg.push('采购单不能即录入正数，又录入负数')
                        return otherMsg
                    } 
                }
                if (details[i].price < 0) {
                    otherMsg.push('单价不能为负数')
                    return otherMsg
                }
            }
        }
        
        if (form.settles && form.settles.length!=0) {
            form.settles = form.settles.filter((item) => {
                return item.bankAccountId || item.amount
            })
            for (let i = 0; i < form.settles.length; i++) {
                if (form.settles[i].bankAccountId == '') {
                    otherMsg.push('现结账户不能为空')
                    return otherMsg
                } else if (form.settles[i].amount == '') {
                    otherMsg.push('现结金额不能为空')
                    return otherMsg
                }
            }
        }

        return otherMsg
    }

    checkSave = (form) => {
        var msg = []
        if (!form.customer || !form.customer.id) {
            msg.push('客户不能为空!')
        }

        if (!form.businessDate)
            msg.push('单据日期不能为空!')


        if (!form.invoiceType || !form.invoiceType.enumItemId)
            msg.push('票据类型不能为空!')

        if (!form.details || form.details.length == 0) {
            msg.push('明细不能为空')
        }

        form.details.forEach((detail, index) => {
            if (!detail.inventory)
                msg.push(`明细第${index + 1}行，存货不能为空`)
        })

        return msg
    }

    showMsg = (msg) => {
        this.metaAction.toast('error',
            <ul style={{ textAlign: 'left' }}>
                {msg.map(o => <li>{o}</li>)}
            </ul>
        )
    }

    check = async (option, checkFn, needSaveFieldValue) => {
        if (!option || !option instanceof Array)
            return

        var checkResults = []

        for (let child of option) {
            let checkResult

            if (checkFn) {
                checkResult = await checkFn({ path: child.path, value: child.value })
            }

            if (checkResult) {
                checkResults.push(checkResult)
            }
        }

        var hasError = false, json = {}
        if (needSaveFieldValue) {
            option.forEach(o => {
                json[o.path] = o.value
            })
        }

        if (checkResults.length > 0) {
            checkResults.forEach(o => {
                json[o.errorPath] = o.message
                if (o.message)
                    hasError = true
            })
        }

        if (json) {
            this.metaAction.sfs(json)
        }
        return !hasError
    }

    numberFormat = (number, decimals, isFocus) => {
        if (isFocus === true) return number
        return utils.number.format(number, decimals)
    }

    //附件的下载操作
    download = (ps) => {
        let alink = document.createElement('a')
        alink.download = ps.accessUrl
        alink.target = '_blank'
        alink.href = ps.accessUrl
        alink.click()
    }

    delFile = async (index, typeName, updateEnclosure) => {
        this.injections.reduce('attachmentVisible', true)
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })
        if (ret) {
            let form = this.metaAction.gf('data.form').toJS()
            let res, data
            switch (typeName) {
                case 'vouchers': {
                    let attachments = []
                    attachments.push({
                        id: index.id,
                        ts: index.ts,
                    })
                    res = {
                        id: form.id,
                        ts: form.ts,
                        attachments: attachments
                    }
                    break
                }
                default:
                    res = {
                        "docId": form.id,
                        "enclosures": [{
                            "id": index.id,
                            "operateStatus": 3,
                            "ts": index.ts,
                            "file": {
                                "id": index.fileId,
                                "type": index.type
                            }
                        }]
                    }
            }
            // delete index
            form.attachmentFiles.map((o, i) => {
                if (o.fileId == index.fileId) {
                    form.attachmentFiles.splice(i, 1)
                }
                return form.attachmentFiles
            })

            if (form.id) {
                // let data = await this.webapi.arrival.updateEnclosure(res)
                let data = updateEnclosure(res)
                if (data) {
                    this.injections.reduce('upload', form.attachmentFiles, data.ts, data.attachedNum)
                    this.metaAction.toast('success', '删除成功')
                }
            }else{
                this.injections.reduce('upload', form.attachmentFiles, index.ts, form.attachmentFiles.length)
                this.metaAction.toast('success', '删除成功')
            }

        }
    }

    attachmentChange = async (info, typeName) => {
        this.injections.reduce('attachmentLoading', true)
        if (info.file.status === 'done') {
            if (info.file.response.error && info.file.response.error.message) {
                return
            } else if (info.file.response.result && info.file.response.value) {
                this.upload(info.file.response.value, info.file.response.value.ts, typeName)
            }
        }
    }

    /**
	 * 附件上传成功事件处理
	 * @param  {[type]} imgName [description]
	 * @return {[type]}         [description]
	 */
    upload = async (file, ts, typeName, updateEnclosure) => {
        let form = this.metaAction.gf('data.form').toJS()
        let fileList = this.metaAction.gf('data.form.attachmentFiles')&&this.metaAction.gf('data.form.attachmentFiles').toJS()||[]
        let fileData = [], data
        if(file.type != consts.consts.FILETYPE_pic && file.type != consts.consts.FILETYPE_word && file.type != consts.consts.FILETYPE_excel && file.type !=consts.consts.FILETYPE_ppt && file.type != consts.consts.constsFILETYPE_pdf && file.type != consts.consts.FILETYPE_zip){
            this.metaAction.toast('warning', '此文件类型不支持上传')
            this.injections.reduce('attachmentLoading', false)
            return
        }
        fileList.push({
            "accessUrl": file.accessUrl,
            "ts": file.ts || '',
            "type": file.type,
            "name": file.originalName,
            "fileId": file.id
        })
        if(fileList.length > 20){
            this.metaAction.toast('warning', '最多上传20个附件')
            this.injections.reduce('attachmentLoading', false)
            return
        }

        if(form.id){
            let fileData
            switch(typeName) {
                case 'vouchers': {
                    let attachments = []
                    attachments.push({
                        "fileId": file.id,
                        "file": {
                            "type": file.type
                        }
                    })
                    fileData = { id: form.id, ts: form.ts, attachments: attachments }
                    break
                }
                default:
                    let enclosures = []
                    enclosures.push({
                        "fileId": file.id,
                        "operateStatus": 1,
                        "file": {
                            "id": file.id,
                            "type": file.type
                        }
                    })
                    fileData = { "docId": form.id, enclosures: enclosures }
                    
            }
            // let data = await this.webapi.arrival.updateEnclosure(fileData)
            let data = updateEnclosure(fileData)
            fileList = []
            if(data){
                let newenclosures = data.attachments
                newenclosures.map((o) => {
                    fileList.push({
                        "id": o.id,
                        "accessUrl": o.file.accessUrl,
                        "ts":o.ts || '',
                        "type": o.file.type,
                        "name": o.file.originalName,
                        "fileId": o.file.id
                    })
                })
                this.injections.reduce('upload', newenclosures, data.ts, fileList.length)
            }
        }else{
            this.injections.reduce('upload', fileList, ts, fileList.length)
        }

        this.injections.reduce('attachmentLoading', false)
    }

}
