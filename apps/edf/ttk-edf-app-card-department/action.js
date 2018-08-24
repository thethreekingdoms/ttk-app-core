import React from 'react'
import {action as MetaAction, AppLoader} from 'edf-meta-engine'
import {List, fromJS} from 'immutable'
import moment from 'moment'
import config from './config'

import {FormDecorator} from 'edf-component'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.voucherAction = option.voucherAction
        this.config = config.current
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
        let data = {}, response, deptAttr
        if (this.component.props.id || this.component.props.id === 0) {
            response = await this.webapi.department.query(this.component.props.id)
            if (response) data.response = response
        }
        deptAttr = await this.webapi.department.deptAttr()
        if (deptAttr) data.deptAttr = deptAttr

        this.injections.reduce('load', data, this.component.props)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.voucherAction.check([{
            path: 'data.form.attribute', value: form.attribute
        }, {
            path: 'data.form.name', value: form.name
        }], this.check)

        let response, option = {}
	    if(!ok){
		    this.metaAction.toast('warning','请按页面提示信息修改信息后才可提交')
		    return false
	    }

        let VatTaxpayer = this.metaAction.context.get("currentOrg") || {}
        VatTaxpayer.id = 'genid'
        option.name = form.name.trim()
        option.property = form.attribute && form.attribute.id
        option.pid = form.pid
        option.ts = form.ts
        option.isReturnValue = true
        if (this.component.props.id) {
            option.id = this.component.props.id
            response = await this.webapi.department.update(option)
        } else if (this.component.props.parentId) {
            if (VatTaxpayer.id != this.component.props.parentId) {
                option.pid = this.component.props.parentId
            }
            option.grade = this.component.props.grade + 1 || 1
            option.isEnable = true
            response = await this.webapi.department.create(option)
        } else {
            option.grade = this.component.props.grade + 1 || 1
            option.isEnable = true
            response = await this.webapi.department.create(option)
        }
        if (response && response.error) {
            this.metaAction.toast('error', response.error.message)
            return false
        }else{
            this.metaAction.toast('success', '保存成功')
            return response
        }
    }

	changeCheck = () => {
		const form = this.metaAction.gf('data.form').toJS()
		this.voucherAction.check([{
			path: 'data.form.name', value: form.name
		}], this.check)
	}

    check = async (option) => {
        if (!option || !option.path)
            return

        if (option.path == 'data.form.attribute') {
            return {errorPath: 'data.other.error.attribute', message: option.value ? '' : '请选择部门属性'}
        }
        else if (option.path == 'data.form.name') {
            return {errorPath: 'data.other.error.name', message: option.value && option.value.trim() ? '' : '请录入名称'}
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