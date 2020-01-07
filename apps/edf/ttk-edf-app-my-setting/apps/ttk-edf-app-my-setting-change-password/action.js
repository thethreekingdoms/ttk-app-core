import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import md5 from 'md5'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        if (this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        }
        this.injections = injections
        injections.reduce('init')
    }
    onOk = async () => {
        const form = this.metaAction.gf('data.form').toJS();
        const info = await this.check([{
            path: 'data.form.oldPassword', value: form.oldPassword
        }, {
            path: 'data.form.password', value: form.password
        }, {
            path: 'data.form.rePassword', value: form.rePassword
        }])
        
        if (!info) return false

        const currentUser = this.metaAction.context.get('currentUser')
        var id = currentUser && currentUser.id
        let password = form.password
        form.oldPassword =  md5(form.oldPassword+'*the3Kingdom*')
        form.password =  md5(form.password+'*the3Kingdom*')

        const response = await this.webapi.user.modifyPassword({
            id,
            oldPassword:form.oldPassword,
            password: form.password,
            passwordStrength: this.pwdLevel(password)
        })
        if(response) {
            this.metaAction.toast('success', `修改密码成功`)
            sessionStorage['password'] = form.password
            let level = this.pwdLevel(password)
            return {passwordStrength: level}
        }else {
            return false
        }
    }
    pwdLevel = (pwd) => {
        let level = 0;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if((/[0-9]/).test(pwd)) {
            level++
        }
        if((/[a-zA-Z]/).test(pwd)) {
            level++
        }
        if(/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(pwd) || regCn.test(pwd)) {
            level++
        }
        return level
    }
    fieldChange = async (fieldPath, value) => {
        await this.check([{ path: fieldPath, value }])
    }
    check = async (fieldPathAndValues) => {
        if (!fieldPathAndValues)
            return

        let checkResults = []

        for (let o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.oldPassword') {
                Object.assign(r, await this.oldPassword(o.value))
            } else if (o.path == 'data.form.password') {
                Object.assign(r, await this.password(o.value))
            } else if (o.path == 'data.form.rePassword') {
                Object.assign(r, await this.rePassword(o.value))
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
    oldPassword = async (password) => {
        var message

        if (!password)
            message = '请输入旧密码'
        
        return { errorPath: 'data.error.oldPassword', message }
    }
    password = async (password) => {
        var message

        if (!password)
            message = '请输入新密码'
        else if(!/(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})/.test(password)) 
            message = '6-20位至少包含一个字母和一个数字'

        return { errorPath: 'data.error.password', message }
    }
    rePassword = async (password) => {
        var message
        const form = this.metaAction.gf('data.form').toJS();
        if (!password)
            message = '请重新输入新密码'
        else if(!/(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})/.test(password)) 
            message = '6-20位至少包含一个字母和一个数字'
        else if(password != form.password) {
            message = '两次密码输入不一致'
            console.log(password, form.password)
        }
            
        return { errorPath: 'data.error.rePassword', message }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}