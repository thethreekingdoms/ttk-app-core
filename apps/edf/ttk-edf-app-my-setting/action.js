import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import female from './img/female.png'
import male from './img/male.png'
import imgOther from './img/other.png'
import {fetch} from 'edf-utils'

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

        this.load()
    }

    load = async () => {
        const currentUser = this.metaAction.context.get('currentUser')
        const response = await this.webapi.mySetting.init(currentUser && currentUser.id)
        this.injections.reduce('load', response)
    }

    saveBaseInfo = async () => {
        const form = this.metaAction.gf('data.form').toJS()

        const ok = await this.check([{
            path: 'data.form.nickname', value: form.nickname
        }])

        if (!ok) return

        await this.webapi.user.update({
            mobile: form.mobile,
            sex: form.sex,
            nickname: form.nickname,
            birthday: form.birthday
        })

        this.component.props.onPortalReload && this.component.props.onPortalReload()

        this.metaAction.toast('success', '保存个人资料成功')
    }

    upload = () => {
        // this.metaAction.toast('error', '纯静态网站，上传目前不可用')
    }

    getPhoto = (sex) => {
        if (sex == 1) {
            return male
        } else if (sex == 2) {
            return female
        } else {
            return imgOther
        }
    }

    getPasswordStrength = () => {
        const level = this.metaAction.gf('data.form.passwordStrength')
        if (level == 1)
            return '弱'
        else if (level == 2)
            return '中'
        else if (level == 3)
            return '高'
    }

    getColor = () => {
        const level = this.metaAction.gf('data.form.passwordStrength')
        if (level == 1)
            return 'orangeBg'
        else if (level == 2)
            return 'yellowBg'
        else if (level == 3)
            return 'greenBg'
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
                Object.assign(r, await this.checkNickname(o.value))
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

    checkNickname = async (nickname) => {
        var message

        if (!nickname)
            message = '请录入昵称'
        else if(nickname.length > 50)
            message = '昵称不能超过50个字'
        return { errorPath: 'data.other.error.nickname', message }
    }

    getAccessTokenJson = () => {
        return {token: fetch.getAccessToken()}
    }
    //修改密码
    changePassword = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '修改登录密码',
            width:500,
            height:251,
            children: this.metaAction.loadApp('ttk-edf-app-my-setting-change-password', {
                store: this.component.props.store,
            })
        })
        ret.passwordStrength && this.metaAction.sf('data.form.passwordStrength', ret.passwordStrength)
    }
    //修改绑定手机
    changeMobile = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '修改手机号',
            width:500,
            height:251,
            children: this.metaAction.loadApp('ttk-edf-app-my-setting-change-mobile', {
                store: this.component.props.store,
                mobile: this.metaAction.gf('data.form.mobile')
            })
        })
        // this.injections.reduce('load', response)
        ret.newMobile && this.metaAction.sf('data.form.mobile', ret.newMobile)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}