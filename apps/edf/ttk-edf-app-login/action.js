import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import md5 from 'md5'
//import utils from 'edf-utils'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        /*
        if (location.href.indexOf('aierp.cn') > -1 || location.href.indexOf('aitaxer.com') > -1) {
            if (location.href.indexOf('?pro') == -1) {
                return
            }
        }*/
        this.component = component
        let info = {mobile: '', password: '', remember: false}
        let currentTimestamp = (new Date()).getTime()
        //从cookie中读取mobile
        function getCookie(c_name) {
            if (document.cookie.length>0) {
                let c_start=document.cookie.indexOf(c_name + "=")
                if (c_start!=-1) {
                    c_start=c_start + c_name.length+1
                    let c_end=document.cookie.indexOf(";",c_start)
                    if (c_end==-1) c_end=document.cookie.length
                    return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return ""
        }
        info.mobile = getCookie('THE_LAST_LOGIN')
        if(currentTimestamp < localStorage.remember) {
            info.remember = true
            if(info.mobile == localStorage['mobile']) {
                info.password = localStorage['password']
            }
        }else {
            localStorage.clear()
        }
        this.injections = injections
        injections.reduce('init', info)

        this.getCarouselBg()
        //绑定回车事件
        this.bindEnter()
    }

    getLogo = () => this.config.logo

    getCarouselBg = async () => {
        let imgs = [{}, {}, {}]
        imgs[0].url = await require('../../../assets/img/green/login-bg-1.jpg')
        imgs[1].url = await require('../../../assets/img/green/login-bg-2.jpg')
        imgs[2].url = await require('../../../assets/img/green/login-bg-3.jpg')

        this.injections.reduce('load', imgs)
    }

    bindEnter = () => {
        let that = this
        document.onkeydown = function(e) {
            let keyCode = e.keyCode
            if(keyCode !== 13) return
            let form = that.metaAction.gf('data.form').toJS()
            that.fieldChange('data.form.mobile', form.mobile)
            that.fieldChange('data.form.password', form.password)

            that.login()
        }
    }

    login = async () => {
        let form = this.metaAction.gf('data.form').toJS()
        let other = this.metaAction.gf('data.other').toJS()
        //登录前校验
        const basicInfo = await this.check([{
            path: 'data.form.mobile', value: form.mobile
        }, {
            path: 'data.form.password', value: form.password
        }], 'login')
        if (!basicInfo) return
        if(other.userInput) {
            if (form.password) {
            	//暂时不加密，密码 md5签名取消
            }
        }

        const response = await this.webapi.user.login(form)
        if(!response.result) {
            if(response.error.code == 50111) {
                this.metaAction.sf('data.other.error.password', '密码不正确，请重新输入')
            }
            return
        }
        //cookie中存储上次登录的用户名
        function setCookie(c_name,value,expiredays){
            var exdate=new Date()
            exdate.setDate(exdate.getDate()+expiredays)
            document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
        }
        setCookie('THE_LAST_LOGIN', form.mobile, 7)

        this.metaAction.context.set('user', response.value)
        //判断是否保存登录信息
        if(form.remember) {
            let time = (new Date()).getTime() + 7 * 24 * 60 * 60 * 1000
            localStorage.remember = time
            localStorage['mobile'] = form.mobile
            localStorage['password'] = form.password
        }else {
            localStorage.clear()
        }
        sessionStorage['mobile'] = form.mobile
        sessionStorage['username'] = response.value.nickname
        sessionStorage['_accessToken'] = response.token
        sessionStorage['password'] = form.password
        sessionStorage['currentOrgStatus'] = response.value.currentOrgStatus
        document.onkeydown = null
        //登录时切换皮肤
        let skin = (response.value.skin && response.value.skin.toUpperCase()) || '#00B38A'
        localStorage['skin'] = skin

        if (this.component.props.onRedirect && this.config.goAfterLogin) {
            this.component.props.onRedirect(this.config.goAfterLogin)
        }
    }

    goRegisterA = () => {
        this.goRegister()
        //埋点
        _hmt.push(['_trackEvent', '系统管理', '企业登录', '右上角立即注册'])
    }

    goRegisterB = () => {
        this.goRegister()
        //埋点
        _hmt.push(['_trackEvent', '系统管理', '企业登录', '右下角立即注册'])
    }

    goRegister = () => {
        document.onkeydown = null
        if (!this.config.apps['edfx-app-register']) {
            throw '请将这个应用加入到带ttk-edf-app-root和edfx-app-register的网站中，跳转功能才能正常使用'
        }
        if (this.component.props.onRedirect && this.config.goRegister) {
            this.component.props.onRedirect(this.config.goRegister)
        }
    }

    goForgot = () => {
        if (!this.config.apps['edfx-app-forgot-password']) {
            throw '请将这个应用加入到带ttk-edf-app-root和edfx-app-forgot-password的网站中，跳转功能才能正常使用'
        }
        if (this.component.props.onRedirect && this.config.goForgot) {
            this.component.props.onRedirect(this.config.goForgot)
            //埋点
            _hmt.push(['_trackEvent', '系统管理', '企业登录', '忘记密码'])
        }
    }

    fieldChange = async (fieldPath, value) => {
        this.metaAction.sf(fieldPath, value)
        await this.check([{ path: fieldPath, value }])
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
            else if (o.path == 'data.form.password') {
                Object.assign(r, await this.checkPassword(o.value, action))
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
        if(action && action == 'login') {
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
            else if(mobile.length == 1 && !(mobile == '1'))
                message = '请输入正确的手机号'
            else if(mobile.length >1 && mobile.length < 11 && !/^1[3|4|5|8|7]/.test(mobile))
                message = '请输入正确的手机号'
            else if(mobile.length > 11) {
                message = '请输入正确的手机号'
            }else if(mobile.length == 11){
                let flag = await this.webapi.user.existsMobile(mobile)
                !flag && (message = '该手机号未注册，请重新输入')
            }
        }
        return { errorPath: 'data.other.error.mobile', message }
    }

    imgChange = async () => {

    }
    checkPassword = async (password) => {
        var message

        if (!password)
            message = '请输入密码'

        return { errorPath: 'data.other.error.password', message }
    }
    //检查是否要置灰登录
    checkLogin = () => {
        let data = this.metaAction.gf('data').toJS()
        return !((data.form.mobile && !data.other.error.mobile) && (data.form.password && !data.other.error.password))

    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}