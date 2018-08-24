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

    gf = (field) => {
        let value = this.metaAction.gf(field)
        value = value && value.toJS() || null
        return value
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        this.loadOperations()

        if (this.component.props.id) {
            injections.reduce('init')
            this.load()
        } else {
            injections.reduce('init', { parentId: this.component.props.parentId })
        }
        this.parentMenuFocus()

    }

    load = async () => {
        const response = await this.webapi.menu.findFullById(this.component.props.id)
        let operationIds = response.operations && response.operations.map(o => o.operationId)
        this.selectOperations(operationIds)
        this.injections.reduce('load', response)
    }

    loadOperations = async () => {
        const operations = await this.webapi.operation.query({})
        let options = operations.map(o => ({ label: o.name, value: o.id }))
        this.injections.reduce('loadOperations', { operations, options })
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.name', value: form.name
        }, {
            path: 'data.form.code', value: form.code
        }])

        if (!ok) return false
        let operationIds = this.gf('data.other.selectedOperations') || []
        let operations = operationIds.map(oid => {
            let mo = { menuId: form.id, operationId: oid }
            if (form.operations) {
                let operation = form.operations.find(m => m.operationId == oid)
                if (operation) {
                    mo.id = operation.id
                }
            }
            return mo
        })
        form.operations = operations
        form.parentId = form.parentId == undefined ? 0 : form.parentId
        if (form.id) {
            const response = await this.webapi.menu.update(form)
            this.metaAction.toast('success', '修改成功')
            return response
        }
        else {
            const response = await this.webapi.menu.create(form)
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
            if (o.path == 'data.form.nickname') {
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
            message = '请录入编码'

        return { errorPath: 'data.other.error.code', message }
    }

    checkName = async (name) => {
        var message

        if (!name)
            message = '请录入名称'

        return { errorPath: 'data.other.error.name', message }
    }

    selectOperations = (curIds) => {
        let operations = this.gf('data.operations') || []
        let preIds = this.gf('data.other.selectedOperations') || []
        if (preIds.length > curIds.length) {
            let clearIds = preIds.filter(preId => !curIds.find(id => id == preId))
            curIds = this.clearSubOperation(curIds, clearIds, operations)
        } else {
            curIds = this.addDependentOperation(curIds, operations)
        }

        this.injections.reduce('selectOperations', curIds)
    }
    addDependentOperation(ids, operations) {
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i]
            let op = operations.find(o => o.id == id && o.dependentId)
            if (op && !ids.find(theid => theid == op.dependentId)) {
                ids.push(op.dependentId)
            }
        }
        return ids
    }
    clearSubOperation(curIds, clearIds, operations) {
        for (let i = 0; i < clearIds.length; i++) {
            let id = clearIds[i]
            operations.filter(op => op.dependentId == id).forEach(op => {
                let index = curIds.findIndex(theid => theid == op.id)
                if (index != -1) {
                    delete curIds[index]
                }
                if (!clearIds.find(cid => cid == op.id)) {
                    clearIds.push(op.id)
                }
            })
        }
        return curIds.filter(id => id)
    }
    parentMenuFocus = async () => {
        const response = await this.webapi.menu.query({})
        this.metaAction.sf('data.other.parents', fromJS(response))
    }

    parentMenuChange = (v) => {
        const menuDataSource = this.metaAction.gf('data.other.parents')
        const menu = menuDataSource.find(o => o.get('id') == v)
        this.metaAction.sf(`data.form.parent`, menu)
        this.metaAction.sf(`data.form.parentId`, menu.get('id'))
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}