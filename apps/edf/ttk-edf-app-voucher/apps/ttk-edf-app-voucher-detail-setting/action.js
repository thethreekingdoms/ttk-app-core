import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)
        
        this.metaAction.sf('data.other.type', this.component.props.actionType)
        this.metaAction.sf('data.other.target', this.component.props.target)
        this.metaAction.sf('data.form.voucherId', this.component.props.voucherId)
        this.component.props.voucherTableId && this.metaAction.sf('data.form.voucherTableId', this.component.props.voucherTableId)
        if(this.component.props.actionType == 'modify') {
            
        }
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        let type = this.metaAction.gf('data.other.type')
        let target = this.metaAction.gf('data.other.target')
        let voucherId = this.metaAction.gf('data.form.voucherId')
        let voucherTableId = this.metaAction.gf('data.other.voucherTableId')
        const form = this.metaAction.gf('data.form').toJS()
        
        let params = {}
        params.voucherId = form.voucherId
        params.caption = form.caption
        params.colIndex = form.colIndex
        params.isVisible = form.isVisible == true ? 1 : 0
        if (type == 'add') {
            let response = null
            if(target == 'thead') {
                params.fieldName = form.fieldName
                params.isMustSelect = form.isMustSelect == true ? 1 : 0
                params.isSystem == form.isSystem == true ? 1 : 0
                response = await this.webapi.voucher.addThead(params)
            }else if(target == 'tbodys') {
                params.name = form.name
                response = await this.webapi.voucher.addTbodys(params)
            }else if(target == 'tbody') {
                params.voucherTableId = form.voucherTableId
                params.fieldName = form.fieldName
                params.isMustSelect = form.isMustSelect == true ? 1 : 0
                params.isSystem == form.isSystem == true ? 1 : 0
                response = await this.webapi.voucher.addTbody(params)
            }
            this.metaAction.toast('success', '新增成功')
            return response
        }else if(type == 'modify'){
            const response = await this.webapi.voucher.create(form)
            
        }
    }


    fieldChange = async (fieldPath, value) => {
        await this.check([{ path: fieldPath, value }])
    }

    check = async (fieldPathAndValues) => {
        if (!fieldPathAndValues)
            return

        var checkResults = []

        for (var o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.name') {
                Object.assign(r, await this.checkName(o.value))
            }
            else if (o.path == 'data.form.code') {
                Object.assign(r, await this.checkCode(o.value))
            }
            checkResults.push(r)
        }

        var json = {}
        var hasError = true
        checkResults.forEach(o => {
            json[o.path] = o.value
            json[o.errorPath] = o.message
            if (o.message)
                hasError = false
        })

        this.metaAction.sfs(json)
        return hasError
    }

    checkCode = async (code) => {
        var message

        if (!code)
            message = '请录入栏目编码'

        return { errorPath: 'data.other.error.code', message }
    }

    checkName = async (name) => {
        var message

        if (!name)
            message = '请录入栏目名称'

        return { errorPath: 'data.other.error.name', message }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}