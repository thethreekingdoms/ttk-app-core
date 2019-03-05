import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
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
        this.injections = injections

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        injections.reduce('init')
    }


    onOk = async () => {
        return await this.save()
    }

    next = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.mobile', value: form.mobile
        }, {
            path: 'data.form.captcha', value: form.captcha
        }], 'next')

        if (!ok) return

        this.clearTimer(false, '获取验证码')

        this.metaAction.sf('data.other.step', 2)
    }

    prev = async () => {
        this.metaAction.sf('data.other.step', 1)
    }

    modify = async () => {
        const form = this.metaAction.gf('data.form').toJS()
        const ok = await this.check([{
            path: 'data.form.password', value: form.password
        }, {
            path: 'data.form.confirmPassword', value: form.confirmPassword
        }], 'modify')

        if (!ok) return
        let password = form.password
        let passwordStrength = this.pwdLevel(password)
        form.password = md5(form.password + '*the3Kingdom*')

        await this.webapi.user.resetPassword({
            mobile: form.mobile,
            password: form.password,
            passwordStrength: passwordStrength
        })
        this.metaAction.toast('success', `重置密码成功`)
        this.metaAction.sf('data.other.step', 3)
        this.countFive()
    }
    reLoginTime = null
    countFive = () => {
        let t = 5
        this.reLoginTimer = setInterval(() => {
            t--
            this.metaAction.sf('data.reLoginTime', t)
            if (t == 0) {
                clearInterval(this.reLoginTimer)
                this.goLogin()
            }
        }, 1000)
    }
    pwdLevel = (pwd) => {
        let level = 0;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if ((/[0-9]/).test(pwd)) {
            level++
        }
        if ((/[a-zA-Z]/).test(pwd)) {
            level++
        }
        if (/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/.test(pwd) || regCn.test(pwd)) {
            level++
        }
        return level
    }
    getLogo = () => this.config.logo

    countDown = 60   //倒计时
    timer = null
    getCaptchaing = false
    getCaptcha = async () => {
        const mobile = this.metaAction.gf('data.form.mobile')
        if (mobile && !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile))) {
            this.metaAction.sfs({ 'data.form.mobile': mobile, 'data.other.error.mobile': "请输入正确的手机号" })
            return false
        }
        if (this.getCaptchaing) return
        this.getCaptchaing = true
        this.metaAction.sf('data.timeStaus', false)
        let that = this
        this.timer = setInterval(function () {
            if (that.countDown == 0) {
                that.clearTimer(true, '重新获取')
                return
            }
            that.metaAction.sf('data.time', (--that.countDown) + 's')
        }, 1000)
        let params = {}
        params.mobile = this.metaAction.gf('data.form.mobile')
        //1: 注册 2:找回密码 3:修改手机号
        params.smsType = 2
        const captcha = await this.webapi.captcha.fetch(params)
        this.metaAction.sf('data.form.sign', captcha)
        this.metaAction.toast('success', `验证码已经发送到您的手机`)
    }
    //清除定时器
    clearTimer = function (staus, remind) {
        this.metaAction.sf('data.timeStaus', true)
        this.metaAction.sf('data.time', remind)
        this.countDown = 60
        this.getCaptchaing = false
        clearInterval(this.timer)
    }

    fieldChange = async (fieldPath, value) => {
        this.metaAction.sf(fieldPath, value)
        await this.check([{ path: fieldPath, value }])
    }

    goLogin = () => {
        clearInterval(this.reLoginTime)
        this.clearTimer(false, '获取验证码')
        if (this.component.props.onRedirect && this.config.goLogin) {
            this.component.props.onRedirect(this.config.goLogin)
        }
    }

    check = async (fieldPathAndValues, action) => {
        if (!fieldPathAndValues)
            return

        var checkResults = []

        for (var o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.mobile') {
                Object.assign(r, await this.checkMobile(o.value, action))
            }
            else if (o.path == 'data.form.captcha') {
                Object.assign(r, await this.checkCaptcha(o.value))
            }
            else if (o.path == 'data.form.password') {
                Object.assign(r, await this.checkPassword(o.value))
                const confirmPassword = this.metaAction.gf('data.form.confirmPassword')
                if (confirmPassword)
                    checkResults.push(await this.checkConfirmPassword(confirmPassword, o.value))
            }
            else if (o.path == 'data.form.confirmPassword') {
                Object.assign(r, await this.checkConfirmPassword(o.value, this.metaAction.gf('data.form.password'), action))
            }

            checkResults.push(r)

        }

        var json = {}
        var hasError = true
        checkResults.forEach(o => {
            // json[o.path] = o.value
            json[o.errorPath] = o.message
            if (o.message)
                hasError = false
        })
        this.metaAction.sfs(json)
        return hasError
    }


    checkMobile = async (mobile, action) => {
        var message
        if (action && action == 'next') {
            if (!mobile)
                message = '请输入手机号'
            else if (mobile.length != 11)
                message = '请输入正确的手机号'
            else {
                let flag = await this.webapi.user.existsMobile(mobile)
                !flag && (message = '该手机号未注册，请重新输入')
            }
        } else {
            if (!mobile)
                message
            else if (mobile.length == 1 && !(mobile == '1'))
                message = '请输入正确的手机号'
            else if (mobile.length > 1 && mobile.length < 11 && !/^1[3|4|5|8|7]/.test(mobile))
                message = '请输入正确的手机号'
            else if (mobile.length > 11) {
                message = '请输入正确的手机号'
            } else if (mobile.length == 11) {
                let flag = await this.webapi.user.existsMobile(mobile)
                !flag && (message = '该手机号未注册，请重新输入')
            }
        }

        return { errorPath: 'data.other.error.mobile', message }
    }

    checkCaptcha = async (captcha) => {
        var message
        let sign = this.metaAction.gf('data.form.sign')
        let mobile = this.metaAction.gf('data.form.mobile')
        let params = {
            sign: sign,
            mobile: mobile,
            captcha: captcha
        }

        if (!captcha)
            message = '请输入验证码'
        else if (!(await this.webapi.captcha.validate(params)))
            message = '验证码输入错误'

        return { errorPath: 'data.other.error.captcha', message }
    }

    checkPassword = async (password) => {
        var message
        if (!password)
            message = '请录入密码'
        else if (!/(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})/.test(password))
            message = '6-20位至少包含一个字母和一个数字，区分大小写'
        return { errorPath: 'data.other.error.password', message }
    }

    checkConfirmPassword = async (confirmPassword, password, action) => {
        var message
        if (action == 'modify') {
            if (!confirmPassword)
                message = '请再次输入新密码'
            else if (password != confirmPassword)
                message = '两次密码输入不一致，请确认'
            else if (!/(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})/.test(confirmPassword))
                message = '请输入符合规范的新密码'
        } else {
            if (password.length < confirmPassword.length) message = '两次密码输入不一致，请确认'
            if ((password.length == confirmPassword.length) && (password != confirmPassword)) message = '两次密码输入不一致，请确认'
        }
        return { errorPath: 'data.other.error.confirmPassword', message }
    }

    checkNext = () => {
        let data = this.metaAction.gf('data').toJS()
        let step = this.metaAction.gf('data.other').toJS().step
        if (step == 1) {
            return !((data.form.mobile && !data.other.error.mobile) && (data.form.captcha && !data.other.error.captcha))
        } else if (step == 2) {
            return !((data.form.password && !data.other.error.password) && (data.form.confirmPassword && !data.other.error.confirmPassword))
        }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}