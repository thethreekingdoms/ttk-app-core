import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import moment from 'moment'
import { LoadingMask, Icon } from 'edf-component'
import { Map } from 'immutable'

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};
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
        let response;
        this.injections.reduce('load', response)
    }
    onShowSuccessMsg = (msg) => {
        this.metaAction.toast('success', msg);
    }
    onShowWarningMsg = (msg) => {
        this.metaAction.toast('warning', msg);
    }
    showLoadingMask = () => {
        LoadingMask.show({ content: ' ' })
        let timer = this.metaAction.setTimeout(() => {
            LoadingMask.hide();
            clearTimeout(timer);
        }, 5000);
    }
    /**
     * 显示弹窗——无按钮
     */
    showModal = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '我是标题',
            width: '80%',
            footer: null,
            children: this.metaAction.loadApp('ttk-edf-app-home', {
                store: this.component.props.store,
            })
        })
    }
    /**
     * 显示弹窗——'确定''取消'按钮
     */
    showModalWithBtn = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '我是标题',
            width: '80%',
            children: this.metaAction.loadApp('ttk-edf-app-home', {
                store: this.component.props.store,
            })
        })
    }
    /**
     * 显示弹窗——其他按钮
     */
    showModalWithOtherBtn = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '身份验证',
            width: '80%',
            okText: '验证',
            cancelText: '关闭',
            children: this.metaAction.loadApp('ttk-edf-app-home', {
                store: this.component.props.store,
            })
        })
    }
    /**
     * 复制font图标代码
     */
    copyFontCode = (obj) => {
        const text = `{ name: 'icon${obj.type}', component: 'Icon', fontFamily: 'fsicon', type: '${obj.type}' }`;
        if (this.copyToClipboard(text)) {
            this.metaAction.toast('success', `${text} copied!!!!!`);
        };
    }
    /**
     * 复制png图标代码
     */
    copyPngCode = (obj) => {
        const text = `{ name: 'png${obj.type}', component: 'Tax72.Png', type: '${obj.type}' }`;
        if (this.copyToClipboard(text)) {
            this.metaAction.toast('success', `${text} copied!!!!!`);
        };
    }
    /**
     * 复制内容到粘贴板
     */
    copyToClipboard = (txt) => {
        let result = false;
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', txt);
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            result = true;
        }
        document.body.removeChild(input);
        return result;
    }
    getFormItemLayout = () => formItemLayout;
    handleSubmit = async e => {
        let form = this.metaAction.gf('data.form').toJS()
        const checkInfo = await this.check(
            [{
                path: 'data.form.name', value: form.name
            }, {
                path: 'data.form.verify', value: form.verify
            }])
        if (checkInfo) {
            // await this.metaAction.modal('show', {
            //     content: 'aaaaa',
            // })
            document.querySelector
            const errorItems = document.getElementsByClassName('ant-form-item-control has-error');
            if (errorItems && errorItems.length) {
                errorItems[0].getElementsByTagName('input')[0].focus();
                // console.log(errorItems[0].getElementsByTagName('input'),'222')
            }
            return
        }
        this.metaAction.toast('success', `提交成功!!!!!`);
    };
    reset = e => {
        this.metaAction.sf('data.form', new Map());
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
            else if (o.path == 'data.form.verify') {
                Object.assign(r, await this.checkVerify(o.value))
            }
            checkResults.push(r)
        }

        var json = {}
        var hasError = false
        checkResults.forEach(o => {
            json[o.errorPath] = o.message
            if (o.message)
                hasError = true
        })

        this.metaAction.sfs(json)

        return hasError
    }

    checkName = async (value) => {
        let message;
        if (!value || value.length < 5) {
            message = '标题至少得5个字符啊'
        }
        return { errorPath: 'data.other.error.name', message }
    }
    checkVerify = async (value) => {
        let message;
        if (!value) {
            message = '必填项不能为空'
        }
        return { errorPath: 'data.other.error.verify', message }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}