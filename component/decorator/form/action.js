import utils from 'edf-utils'
import ReactDOM from 'react-dom'
import config from './config'
import Immutable, { fromJS, Map, List } from 'immutable'

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
            this.metaAction.sfs({
                [field]: fromJS(ret)
            })

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

    getCustomer = async (params) => {
        let list = {
            "isContentEmpty": false,
            "status": true,
            "notNeedPage": true,
            "page": {
                "currentPage": 1,
                "pageSize": 50
            }
        }
        if (!params) {
            list = Object.assign(list, params)

        }
        const response = await this.webapi.basicFiles.consumerQuery.query(list)
        if (response) {
            this.metaAction.sf('data.other.customer', fromJS(response.dataList))
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
        const response = await this.webapi.bankaccount.bankaccount.queryList(params)

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

    calc = (fieldName, rowIndex, rowData, params) => {
        let v = params.value
        if (fieldName === 'price') {
            this.priceChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'amount') {
            this.amountChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'quantity') {
            this.quantityChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'taxRate') {
            this.taxRateChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'tax') {
            this.taxChange(rowIndex, rowData, v)
        }
        else if (fieldName === 'taxInclusiveAmount') {
            this.taxInclusiveAmountChange(rowIndex, rowData, v)
        }

    }

    priceChange = (rowIndex, rowData, v) => {
        const price = utils.number.round(v, 2),
            quantity = utils.number.round(rowData.quantity, 2),
            amount = utils.number.round(price * quantity, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            taxInclusiveAmount = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.price`]: price,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
        })
    }

    amountChange = (rowIndex, rowData, v) => {
        const quantity = utils.number.round(rowData.quantity, 2),
            amount = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            tax = utils.number.round(rowData.tax, 2),
            taxRate = utils.number.round(rowData.taxRate.taxRate || 0, 2),
            taxInclusiveAmount = utils.number.round(rowData.taxInclusiveAmount, 2)

        if (tax != undefined && taxRate >= 0) {
            let _tax = amount * taxRate
            let _taxInclusiveAmount = amount + _tax,
                _price = price
            if (quantity != 0) {
                _price = utils.number.round(amount / quantity, 2)
            }

            this.metaAction.sfs({
                [`data.form.details.${rowIndex}.amount`]: v,
                [`data.form.details.${rowIndex}.tax`]: _tax,
                [`data.form.details.${rowIndex}.taxInclusiveAmount`]: _taxInclusiveAmount,
                [`data.form.details.${rowIndex}.price`]: _price
            })
        }
    }

    quantityChange = (rowIndex, rowData, v) => {
        const quantity = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            amount = utils.number.round(price * quantity, 2),
            tax = utils.number.round(amount * (rowData.tax ? rowData.tax.id : 0) / 100, 2),
            taxInclusiveAmount = utils.number.round(amount + tax, 2)

        this.metaAction.sfs({
            [`data.form.details.${rowIndex}.quantity`]: quantity,
            [`data.form.details.${rowIndex}.amount`]: amount,
            [`data.form.details.${rowIndex}.tax`]: tax,
            [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
        })
    }

    taxRateChange = (rowIndex, rowData, v) => {
        let taxRates = this.metaAction.gf('data.other.taxRate').toJS()
        if (taxRates) {
            const hit = taxRates.find(o => o.id == v)

            if (!hit)
                return

            const amount = rowData.amount,
                tax = utils.number.round(amount * hit.id / 100, 2),
                taxInclusiveAmount = utils.number.round(amount + tax, 2)

            this.metaAction.sfs({
                [`data.form.details.${rowIndex}.taxRateId`]: hit["id"],
                [`data.form.details.${rowIndex}.taxRateName`]: hit["name"],
                [`data.form.details.${rowIndex}.tax`]: fromJS(tax),
                [`data.form.details.${rowIndex}.taxInclusiveAmount`]: taxInclusiveAmount,
            })
        }
    }

    taxChange = (rowIndex, rowData, v) => {
        const tax = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            quantity = utils.number.round(rowData.quantity, 2),
            amount = utils.number.round(price * quantity, 2),
            taxInclusiveAmount = utils.number.round(amount + tax, 2),
            taxRate = utils.number.round(rowData.taxRate.taxRate || 0, 2)


        if (tax >= 0 && taxRate >= 0) {
            let _amountOfMoney = utils.number.round(tax / taxRate)
            let _taxInclusiveAmount = utils.number.round(_amountOfMoney + tax)
            let _price = 0
            if (quantity != 0) {
                _price = utils.number.round(_amountOfMoney / quantity)
            }

            this.metaAction.sfs({
                [`data.form.details.${rowIndex}.tax`]: v,
                [`data.form.details.${rowIndex}.amount`]: _amountOfMoney,
                [`data.form.details.${rowIndex}.taxInclusiveAmount`]: _taxInclusiveAmount,
                [`data.form.details.${rowIndex}.price`]: _price
            })
        }
    }

    taxInclusiveAmountChange = (rowIndex, rowData, v) => {
        const tax = utils.number.round(v, 2),
            price = utils.number.round(rowData.price, 2),
            quantity = utils.number.round(rowData.quantity, 2),
            amount = utils.number.round(price * quantity, 2),
            taxInclusiveAmount = utils.number.round(v, 2),
            taxRate = utils.number.round(rowData.taxRate.taxRate || 0, 2)

        if (taxInclusiveAmount && taxRate >= 0) {
            let _amountOfMoney = utils.number.round(taxInclusiveAmount / (1 + taxRate), 2)
            let _taxamount = utils.number.round(taxInclusiveAmount - _amountOfMoney, 2)
            let _price = price
            if (quantity != 0) {
                _price = utils.number.round(taxInclusiveAmount / (1 + taxRate) / quantity, 2)
            }
            this.metaAction.sfs({
                [`data.form.details.${rowIndex}.taxInclusiveAmount`]: v,
                [`data.form.details.${rowIndex}.amount`]: _amountOfMoney,
                [`data.form.details.${rowIndex}.tax`]: _taxamount,
                [`data.form.details.${rowIndex}.price`]: _price
            })
        }
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
            msg.push('明细不能为空！')
        }

        form.details.forEach((detail, index) => {
            if (!detail.inventory)
                msg.push(`明细第${index + 1}行，存货不能为空！`)
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

}