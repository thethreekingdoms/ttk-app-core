import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import md5 from 'md5'
import { log } from 'util';

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
        if (this.component.props.setCancelLister) {
            this.component.props.setCancelLister(this.onCancel)
        }

        this.injections = injections
        injections.reduce('init', this.component.props.mobile)
    }

    countDown = 60   //倒计时
    timer = null
    getCaptchaing = false
    getCaptcha = async () => {
        if(this.getCaptchaing) return
        this.getCaptchaing = true
        this.metaAction.sf('data.timeStaus',false)
        let that = this
        this.timer = setInterval(function() {
            if(that.countDown == 0) {
                that.clearTimer(true, '重新获取')
                return
            }
            that.metaAction.sf('data.time', (--that.countDown)+'s')
        }, 1000)
        let params = {}
        params.mobile = this.metaAction.gf('data.form.newMobile')
        //1: 注册 2:找回密码 3:修改手机号
        params.smsType = 3
        const captcha = await this.webapi.captcha.fetch(params)
        this.metaAction.sf('data.form.sign', captcha)
        this.metaAction.toast('success', `验证码已经发送到您的手机`)
    }
    //清除定时器
    clearTimer = function(staus, remind) {
        this.metaAction.sf('data.timeStaus',true)
        this.metaAction.sf('data.time', remind)
        this.countDown = 60
        this.getCaptchaing = false
        clearInterval(this.timer)
    }
    onOk = async () => {
        const currentUser = this.metaAction.context.get('currentUser')
        var id = currentUser && currentUser.id

        const form = this.metaAction.gf('data.form').toJS();
        const info = await this.check([{
            path: 'data.form.oldMobile', value: form.oldMobile
        }, {
            path: 'data.form.password', value: form.password
        }, {
            path: 'data.form.newMobile', value: form.newMobile
        }, {
            path: 'data.form.captcha', value: form.captcha
        }], 'change')
        if (!info) return false
        if(md5(form.password+'*the3Kingdom*') == sessionStorage.getItem('password')) {
            this.clearTimer(false, '获取验证码')
            await this.webapi.user.update({
                id,
                mobile: form.newMobile,
                captcha: form.captcha
            })
            this.metaAction.toast('success', `手机修改成功`)
            return {newMobile: form.newMobile}
        }else {
            this.metaAction.sf('data.error.password', '密码输入错误')
            return false
        }
    }
    onCancel = () => {
        this.clearTimer(false, '获取验证码')
    }
    fieldChange = async (fieldPath, value, operation) => {
        await this.check([{ path: fieldPath, value }], operation)
    }
    check = async (fieldPathAndValues, operation) => {
        if (!fieldPathAndValues)
            return

        let checkResults = []

        for (let o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.oldMobile') {
                Object.assign(r, await this.oldMobile(o.value))
            } else if (o.path == 'data.form.password') {
                Object.assign(r, await this.password(o.value))
            } else if (o.path == 'data.form.newMobile') {
                Object.assign(r, await this.newMobile(o.value, operation))
            } else if (o.path == 'data.form.captcha') {
                Object.assign(r, await this.captcha(o.value))
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
    oldMobile = async (mobile) => {
        var message

        if (!mobile)
            message = '请输入手机号'

        return { errorPath: 'data.error.oldMobile', message }
    }
    password = async (password) => {
        var message

        if (!password)
            message = '请输入密码'

        return { errorPath: 'data.error.password', message }
    }
    newMobile = async (mobile, operation) => {
        var message
        if(operation && operation == 'change') {
            if (!mobile)
                message = '请输入手机号'
            else if (mobile.length != 11)
                message = '请输入正确的手机号'
            else {
                let flag = await this.webapi.user.existsMobile(mobile)
                flag && (message = '该手机号已经注册')
            }
        } else {
            if (!mobile)
                message
            else if(mobile.length == 1 && !(mobile == '1'))
                message = '请输入正确的手机号'
            else if(mobile.length >1 && mobile.length < 11 && !/^1[3|4|5|8|7]/.test(mobile))
                message = '请输入正确的手机号'
            else if(mobile.length > 11) {
                message = '请输入正确的手机号'
            }else if(mobile.length == 11){
                let flag = await this.webapi.user.existsMobile(mobile)
                flag && (message = '该手机号已经注册')
            }
        }
        return { errorPath: 'data.error.newMobile', message }
    }
    captcha = async (captcha) => {
        var message
        let sign = this.metaAction.gf('data.form.sign')
        let mobile = this.metaAction.gf('data.form.newMobile')
        let params = {
            sign: sign,
            mobile: mobile,
            captcha: captcha
        }
        if (!captcha)
            message = '请输入验证码'
        else if( !(await this.webapi.captcha.validate(params)))
            message = '验证码输入错误'

        return { errorPath: 'data.error.captcha', message }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}