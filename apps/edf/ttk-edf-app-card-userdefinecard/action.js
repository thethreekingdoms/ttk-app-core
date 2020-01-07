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
        this.activeKey = ''
        if (this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        }
        let archivesName
        if(this.component.props.archivesName){
            archivesName = this.component.props.archivesName
        }
        injections.reduce('init',archivesName)

        this.load()
    }

    load = async () => {
        let data = {}, code,response,listResponse = await this.webapi.basearchive.queryList()
        if(this.component.props.activeKey){
            listResponse.list && listResponse.list.forEach((data) => {
                if(data.name == this.component.props.activeKey){
                    this.activeKey = data.id
                }
            })
            code = await this.webapi.basearchive.getCode({userDefineArchiveId:this.activeKey,archiveName: 'ba_userdefinearchive_data'})
        }
        if (this.component.props.archivesName) {
            data.archivesName = true
        }else if(this.component.props.parentId !== undefined) {
        	let obj = {id: this.component.props.parentId,parentId: this.component.props.id}
            response = await this.webapi.basearchive.queryData(obj)
        }else if(this.component.props.id !== undefined) {
            code = await this.webapi.basearchive.getCode({userDefineArchiveId:this.component.props.id,archiveName: 'ba_userdefinearchive_data'})
        }
        if (code) data.code = code
        if (response) data = response

        this.injections.reduce('load', data)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS(), option = {}, ts = this.metaAction.gf('data.ts'),
        archiveId = this.metaAction.gf('data.archiveId')

        let archivesName = this.component.props.archivesName,
            checkedArr = [{
                path: 'data.form.name', value: form.name
            }]

        if (!archivesName) {
            checkedArr.push({
                path: 'data.form.code', value: form.code
            })
        }

        const ok = await this.voucherAction.check(checkedArr, this.check)

	    if(!ok){
		    this.metaAction.toast('warning','请按页面提示信息修改信息后才可提交')
		    return false
	    }

        let response
	    form.code = form.code ? form.code.trim() : ''
	    form.name = form.name ? form.name.trim() : ''
	    form.remark = form.remark ? form.remark.trim() : ''
        form.isReturnValue = true
        if (archivesName) {
            option.name = form.name.trim()
            option.isEnable = true
            option.isReturnValue = true
            response = await this.webapi.basearchive.queryName(option)
        } else if (this.component.props.parentId) {
            form.id = this.component.props.parentId
            form.archiveId = archiveId
            form.ts = ts
            response = await this.webapi.basearchive.update(form)
        } else if(this.component.props.id){
            form.archiveId = this.component.props.id
            response = await this.webapi.basearchive.create(form)
        } else if(this.activeKey != ''){
            form.archiveId = this.activeKey
            response = await this.webapi.basearchive.create(form)
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
