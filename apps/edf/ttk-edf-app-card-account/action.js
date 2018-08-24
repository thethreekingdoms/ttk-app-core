import React from 'react'
import {action as MetaAction, AppLoader} from 'edf-meta-engine'
import config from './config'
import {FormDecorator} from 'edf-component'

class action {
	constructor(option) {
		this.metaAction = option.metaAction
		this.config = config.current
		this.voucherAction = option.voucherAction
		this.webapi = this.config.webapi
	}

	onInit = ({component, injections}) => {
		this.voucherAction.onInit({component, injections})
		this.component = component
		this.injections = injections


		if (this.component.props.setOkListener) {
			this.component.props.setOkListener(this.onOk)
		}

		injections.reduce('init', {
			isPop: this.component.props.isPop
		})
		this.load()
	}

	load = async () => {
		let data = {}, response = {}, code, currentOrg = this.metaAction.context.get("currentOrg")
		let accountAttr = await this.webapi.bankaccount.accountAttr()
		if (accountAttr) data.accountAttr = accountAttr
		if (this.component.props.personId || this.component.props.personId === 0) {
			response = await this.webapi.bankaccount.query(this.component.props.personId)
		} else {
			code = await this.webapi.bankaccount.getCode()
		}
		let haveMonthlyClosing = await this.webapi.bankaccount.haveMonthlyClosing({})
		data.haveMonthlyClosing = haveMonthlyClosing
		if (code) data.code = code
		if (response) data.response = response
		data.enabledTime = currentOrg.enabledYear + '-' + currentOrg.enabledMonth
		this.injections.reduce('load', data)
	}

	onOk = async () => {
		return await this.save()
	}
	updateDisabled = () => {
		let status = false
		if (this.component.props.personId || this.component.props.personId === 0) {
			status = true
		}
		return status
	}

	save = async () => {
		const form = this.metaAction.gf('data.form').toJS(),
			{id} = this.component.props,
			ok = await this.voucherAction.check([{
				path: 'data.form.bankAccountType', value: form.bankAccountType
			}, {
				path: 'data.form.code', value: form.code
			}, {
				path: 'data.form.name', value: form.name
			}, {
				path: 'data.form.beginningBalance', value: form.beginningBalance
			}], this.check)

		if(!ok){
			this.metaAction.toast('warning','请按页面提示信息修改信息后才可提交')
			return false
		}

		let response, option = {
			bankAccountTypeId: form.bankAccountType.id,
			isDefault: form.isDefault,
			isEnable: form.isEnable
		}

      option.code = form.code ? form.code.trim() : ''
      option.name = form.name ? form.name.trim() : ''
      option.bankName = form.bankName ? form.bankName : ''
      option.ts = form.ts ? form.ts : ''
      option.beginningBalance = (form.beginningBalance || form.beginningBalance == 0 || form.beginningBalance == '') ? form.beginningBalance : ''
		// if (form.beginningBalance == 0 || form.beginningBalance == '' || form.beginningBalance) option.beginningBalance = form.beginningBalance
		if (form.bankAccountType) delete form.bankAccountType
		option.isReturnValue = true
		if (this.component.props.personId || this.component.props.personId === 0) {
			option.id = this.component.props.personId
			response = await this.webapi.bankaccount.update(option)
		}
		else {
			response = await this.webapi.bankaccount.create(option)
		}
		if (response && response.error) {
			this.metaAction.toast('error', response.error.message)
			return false
		} else {
			this.metaAction.toast('success', '保存成功')
			return response
		}

	}

	changeCheck = (num) => {
		const form = this.metaAction.gf('data.form').toJS()
		if(num == 1){
			this.voucherAction.check([{
				path: 'data.form.code', value: form.code
			}], this.check)
		}else {
			this.voucherAction.check([{
				path: 'data.form.name', value: form.name
			}], this.check)
		}
	}

	check = (option) => {
		if (!option || !option.path) return
		if (option.path == 'data.form.bankAccountType') {
			return {
				errorPath: 'data.other.error.bankAccountType',
				message: option.value && option.value.id ? '' : '请录入账户类型'
			}
		} else if (option.path == 'data.form.code') {
			return {errorPath: 'data.other.error.code', message: option.value && option.value.trim() ? '' : '请录入编码'}
		} else if (option.path == 'data.form.name') {
			return {errorPath: 'data.other.error.name', message: option.value && option.value.trim() ? '' : '请录入开户银行名称'}
		} else if (option.path == 'data.form.beginningBalance') {
			if (option.value) {
				return {
					errorPath: 'data.other.error.beginningBalance',
					message: option.value > 999999999999.999999 || option.value < -999999999999.999999 ? '最大整数位为12位' : ''
				}
			}
		}
	}

	fieldChange = (path, value) => {
		this.voucherAction.fieldChange(path, value, this.check)
	}
}

export default function creator(option) {
	const metaAction = new MetaAction(option),
		voucherAction = FormDecorator.actionCreator({...option, metaAction}),
		o = new action({...option, metaAction, voucherAction}),
		ret = {...metaAction, ...voucherAction, ...o}
	metaAction.config({metaHandlers: ret})
	return ret
}
