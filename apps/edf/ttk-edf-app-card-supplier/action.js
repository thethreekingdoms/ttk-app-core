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
        let data = {}, response = {}, code

        if (this.component.props.personId || this.component.props.personId === 0) {
            response = await this.webapi.vendor.query(this.component.props.personId)
        } else {
            code = await this.webapi.vendor.getCode()
        }

        if (code) data.code = code
        if (response) data.response = response

        this.injections.reduce('load', data)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.voucherAction.check([{
            path: 'data.form.code', value: form.code
        }, {
            path: 'data.form.name', value: form.name
        }, {
            path: 'data.form.taxNumber', value: form.taxNumber
        }], this.check)

	    if(!ok){
		    this.metaAction.toast('warning','请按页面提示信息修改信息后才可提交')
		    return false
	    }

        let response
	    form.code = form.code ? form.code.trim() : ''
	    form.name = form.name ? form.name.trim() : ''
	    form.taxNumber = form.taxNumber ? form.taxNumber.trim() : ''
	    form.linkman = form.linkman ? form.linkman.trim() : ''
	    form.contactNumber = form.contactNumber ? form.contactNumber.trim() : ''
	    form.openingBank = form.openingBank ? form.openingBank.trim() : ''
	    form.bankAccout = form.bankAccout ? form.bankAccout.trim() : ''
	    form.addressAndTel = form.addressAndTel ? form.addressAndTel.trim() : ''
	    form.remark = form.remark ? form.remark.trim() : ''
        form.isReturnValue = true
        if (this.component.props.personId || this.component.props.personId === 0) {
            form.id = this.component.props.personId
            response = await this.webapi.vendor.update(form)
        } else {
            response = await this.webapi.vendor.create(form)
        }

        if (response && response.error) {
            this.metaAction.toast('error', response.error.message)
            return false
        }else{
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
        if (!option || !option.path)
            return

        if (option.path == 'data.form.code') {
            return {errorPath: 'data.other.error.code', message: option.value && option.value.trim() ? '' : '请录入编码'}
        }
        else if (option.path == 'data.form.name') {
            return {errorPath: 'data.other.error.name', message: option.value && option.value.trim() ? '' : '请录入名称'}
        }
        else if (option.path == 'data.form.taxNumber') {
            if(option.value){
                return {
                    errorPath: 'data.other.error.taxNumber',
                    message: option.value && (option.value.length == 20 || option.value.length == 15 || option.value.length == 18) ? '' : '税号应为15，18或20位'
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
