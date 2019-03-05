import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'
import md5 from 'md5'
import { userInfo } from 'os';

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
        this.load()
    }

    onOk = async () => {
        return await this.save()
    }

    load = async () => {
        //行业
        const industry = await this.webapi.enumDetail.findByEnumId({ enumId: 200003 })
        //纳税人身份
        const vatTaxpayer = await this.webapi.enumDetail.findByEnumId({ enumId: 200001 })

        //企业会计准则
        const accountingStandards = await this.webapi.enumDetail.findByEnumId({ enumId: 200002 })
        //系统时间
        const date = await this.webapi.enableDate.getServerDate()
        this.injections.reduce('load', industry, vatTaxpayer, accountingStandards, date)
    }

    userregister = async () => {
        const other = this.metaAction.gf('data.other').toJS();
        const form = this.metaAction.gf('data.form').toJS();

        if (other.step === 1) {

            const basicInfo = await this.check([{
                path: 'data.form.mobile', value: form.mobile
            }, {
                path: 'data.form.password', value: form.password
            }, {
                path: 'data.form.captcha', value: form.captcha
            }], 'next')
            if (!basicInfo) return
            this.clearTimer(false, '获取验证码')
            this.metaAction.sf('data.other.step', 2)
            //埋点
            _hmt && _hmt.push(['_trackEvent', '系统管理', '企业注册', '下一步'])

        } else if (other.step === 2) {

            const companyInfo = await this.check([{
                path: 'data.form.org', value: form.org
            }, {
                path: 'data.form.industry', value: form.industry
            }, {
                path: 'data.form.vatTaxpayer', value: form.vatTaxpayer
            }])
            if (!companyInfo) return

            this.metaAction.sf('data.other.step', 3)
        } else if (other.step === 3) {
            const baseInfo = await this.check([{
                path: 'data.form.enableDate', value: form.enableDate
            }, {
                path: 'data.form.accountingStandard', value: form.accountingStandard
            }])
            if (!baseInfo) return
            let user = { mobile: form.mobile, password: md5(form.password + '*the3Kingdom*') };
            let sysOrg = { name: form.org, industry: form.industry, vatTaxpayer: form.vatTaxpayer }
            sysOrg.enabledYear = form.enableDate.split('-')[0]
            sysOrg.enabledMonth = form.enableDate.split('-')[1]
            sysOrg.accountingStandards = form.accountingStandard
            user.sysOrg = sysOrg
            let opt = {}
            opt.user = user
            opt.captcha = form.captcha
            opt.sign = form.sign
            opt.user.passwordStrength = this.pwdLevel(form.password)
            const response = await this.webapi.user.create(opt)

            //跳转到门户
            if (form.password) {
                form.password = md5(form.password + '*the3Kingdom*')
            }
            sessionStorage['mobile'] = form.mobile
            sessionStorage['username'] = response.value.nickname
            sessionStorage['_accessToken'] = response.token
            sessionStorage['password'] = form.password
            sessionStorage['currentOrgStatus'] = null
            if (this.component.props.onRedirect && this.config.goAfterLogin) {
                this.component.props.onRedirect(this.config.goAfterLogin)
                //埋点
                _hmt && _hmt.push(['_trackEvent', '系统管理', '企业注册', '立即体验'])
            }
        }

        //TODO
        // const user = await this.webapi.user.create(form)
        // await this.webapi.sysOrgUser.create({ sysOrgDto: {userId: user.id ,orgId:10001}})

        // this.goOrgRegister(form);
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

    getBar = () => this.config.bar

    countDown = 60   //倒计时
    timer = null
    getCaptchaing = false
    getCaptcha = async () => {
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
        params.smsType = 1
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

    fieldChange = async (fieldPath, value, operation) => {
        await this.check([{ path: fieldPath, value }], operation)
    }
    //返回上一步
    backLastStep = () => {
        let step = this.metaAction.gf('data.other.step')
        this.metaAction.sf('data.other.step', step - 1)
    }
    showAgreement = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '用户协议条款',
            width: 700,
            bodyStyle: { height: 400, overflow: 'auto' },
            okText: '同意',
            cancelText: '不同意',
            className: 'userProtocol',
            children: this.metaAction.loadApp('ttk-edf-app-agreement', {
                store: this.component.props.store,
            })
        })

        this.metaAction.sf('data.form.agree', !!ret)
    }

    goOrgRegister = (user) => {
        if (this.component.props.onRedirect && this.config.goOrgRegister) {
            this.config.goOrgRegister.appName = 'edfx-app-orgregister?user=' + JSON.stringify(user)
            this.component.props.onRedirect(this.config.goOrgRegister)
        }
    }

    goLogin = (mobile) => {
        this.clearTimer(false, '获取验证码')
        if (this.component.props.onRedirect && this.config.goLogin) {
            if (typeof mobile == 'string') {
                this.config.goLogin.appParams.mobile = mobile;
                this.config.goLogin.appName = 'ttk-edf-app-login?mobile=' + mobile
            }

            this.component.props.onRedirect(this.config.goLogin)
        }
    }

    check = async (fieldPathAndValues, operation) => {
        if (!fieldPathAndValues)
            return

        let checkResults = []

        for (let o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.mobile') {
                Object.assign(r, await this.checkMobile(o.value, operation))
            } else if (o.path == 'data.form.password') {
                Object.assign(r, await this.checkPassword(o.value, operation))
            } else if (o.path == 'data.form.captcha') {
                Object.assign(r, await this.checkCaptcha(o.value, operation))
            } else if (o.path == 'data.form.org') {
                Object.assign(r, await this.checkOrg(o.value))
            } else if (o.path == 'data.form.vatTaxpayer') {
                Object.assign(r, await this.checkVatTaxpayer(o.value))
            } else if (o.path == 'data.form.enableDate') {
                Object.assign(r, await this.checkEnableDate(o.value))
            } else if (o.path == 'data.form.accountingStandard') {
                Object.assign(r, await this.checkAccountingStandards(o.value))
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


    checkMobile = async (mobile, operation) => {
        var message
        if (operation && operation == 'next') {
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
            else if (mobile.length == 1 && !(mobile == '1'))
                message = '请输入正确的手机号'
            else if (mobile.length > 1 && mobile.length < 11 && !/^1[3|4|5|8|7]/.test(mobile))
                message = '请输入正确的手机号'
            else if (mobile.length > 11) {
                message = '请输入正确的手机号'
            } else if (mobile.length == 11) {
                let flag = await this.webapi.user.existsMobile(mobile)
                flag && (message = '该手机号已经注册')
            }
        }
        return { errorPath: 'data.other.error.mobile', message }
    }

    checkPassword = async (password, operation) => {
        var message
        if (operation && operation == 'next') {
            if (!password)
                message = '请输入密码'
            else if (!/(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})/.test(password))
                message = '6-20位至少包含一个字母和一个数字'
        }
        return { errorPath: 'data.other.error.password', message }
    }

    checkCaptcha = async (captcha, operation) => {
        var message
        let sign = this.metaAction.gf('data.form.sign')
        let mobile = this.metaAction.gf('data.form.mobile')
        let params = {
            sign: sign,
            mobile: mobile,
            captcha: captcha
        }
        if (operation && operation == 'next') {
            if (!captcha)
                message = '请输入验证码'
            else if (!(await this.webapi.captcha.validate(params)))
                message = '验证码输入错误'
        }


        return { errorPath: 'data.other.error.captcha', message }
    }

    checkOrg = async (org) => {
        var message

        if (!org) {
            message = '请输入企业名称'
        } else if (org.length > 200) {
            message = '企业名称不要超过200个字符'
        }
        return { errorPath: 'data.other.error.org', message }
    }
    checkVatTaxpayer = async (vatTaxpayer) => {
        console.log(vatTaxpayer)
        var message
        if (!vatTaxpayer) {
            message = '纳税人身份不能为空'
        }
        return { errorPath: 'data.other.error.vatTaxpayer', message }
    }
    checkEnableDate = async (enableDate) => {
        var message
        if (!enableDate) {
            message = '启用日期不能为空'
        }
        return { errorPath: 'data.other.error.enableDate', message }
    }
    checkAccountingStandards = async (accountingStandards) => {
        var message
        if (!accountingStandards) {
            message = '企业会计准则不能为空'
        }
        return { errorPath: 'data.other.error.accountingStandards', message }
    }
    //切换编辑状态
    changeDateState = () => {
        let state = this.metaAction.gf('data.other').toJS().editDate
        this.metaAction.sf('data.other.editDate', !state)
    }
    changeStandardState = () => {
        let state = this.metaAction.gf('data.other').toJS().editStandard
        this.metaAction.sf('data.other.editStandard', !state)
    }
    //检查是否要置灰下一步按钮
    checkNext = () => {
        let data = this.metaAction.gf('data').toJS()
        let step = this.metaAction.gf('data.other').toJS().step
        if (step == 1) {
            return !((data.form.mobile && !data.other.error.mobile) && (data.form.password && !data.other.error.password) && (data.form.captcha && !data.other.error.captcha) && data.form.agree)
        } else if (step == 2) {
            return !((data.form.org && !data.other.error.org) && (data.form.vatTaxpayer && !data.other.error.vatTaxpayer))
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