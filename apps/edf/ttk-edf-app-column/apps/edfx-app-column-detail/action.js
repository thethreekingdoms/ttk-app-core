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
        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        if (this.component.props.id) {
            injections.reduce('init')
            this.load()
        } else {
            injections.reduce('init', { typeId: this.component.props.typeId })
        }
    }

    load = async () => {
        const response = await this.webapi.columnDetail.findById(this.component.props.id)
        this.injections.reduce('load', response)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.caption', value: form.caption
        }, 
        {
            path: 'data.form.fieldName', value: form.fieldName
        }])

        if (!ok) return false

        form.isFixed = form.isFixed == true ? 1 : 0
        form.isVisible = form.isVisible == true ? 1 : 0
        form.isMustSelect = form.isMustSelect == true ? 1 : 0
        form.isSystem = form.isSystem == true ? 1 : 0
        if(form.id){
            const response = await this.webapi.columnDetail.update(form)
            this.metaAction.toast('success', '修改成功')
            return response
        }
        else{
            const response = await this.webapi.columnDetail.create({form: form, typeId: this.component.props.typeId})
            this.metaAction.toast('success', '新增成功')
            return response
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
            if (o.path == 'data.form.caption') {
                Object.assign(r, await this.checkName(o.value))
            }
            else if (o.path == 'data.form.fieldName') {
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
            message = '请录入编码'

        return { errorPath: 'data.other.error.fieldName', message }
    }

    checkName = async (name) => {
        var message

        if (!name)
            message = '请录入名称'

        return { errorPath: 'data.other.error.caption', message }
    }

    fieldTypeFocus = async () => {
        const response = await this.webapi.enum.query({enumId: '3336424919598080'})
        this.metaAction.sf('data.other.fieldTypes', fromJS(response))
    }

    alignTypeFocus = async () => {
        const response = await this.webapi.enum.query({enumId: '3336429580387328'})
        this.metaAction.sf('data.other.alignTypes', fromJS(response))
    }

    orderModeFocus = async () => {
        const response = await this.webapi.enum.query({enumId: '3336433541776384'})
        this.metaAction.sf('data.other.orderModes', fromJS(response))
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}