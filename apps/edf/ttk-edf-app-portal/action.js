import React from 'react'
import { Menu, Dropdown } from 'edf-component'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { fromJS } from 'immutable'
import { history } from 'edf-utils'
import config from './config'
import { fetch, environment } from 'edf-utils'
import { log } from 'util';
import female from './img/female_t.png'
import male from './img/male_t.png'
import other from './img/other_t.png'

import { requestFullscreen, exitFullscreen } from "./fullscreen"


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
        //没有token跳转到登录
        if (!sessionStorage.getItem('_accessToken')) {
            this.component.props.onRedirect(this.config.goAfterLogout)
            return
        }
        //更新皮肤
        let skin = localStorage.getItem('skin') || '#1EB5AD'
        if (skin != '#1EB5AD') {
            this.toggleColor(skin)
        }
        //根据账号下企业list的情况做跳转
        let availableOrg = sessionStorage.getItem('currentOrgStatus')
        if (availableOrg == 1 || availableOrg == 2) {
            this.metaAction.sf('data.headCtrl', false)
            return
        }
        this.load()
        //history增加
        history.listen('ttk-edf-app-portal', this.listen)
    }

    //history增加
    listen = (childApp, location, action) => {
        const currentAppName = this.metaAction.gf('data.content.appName')
        const targetAppName = childApp
        if (!targetAppName) {
            this.injections.reduce('closeAll')
            return
        }

        if (targetAppName == currentAppName) {
            return
        }

        //this.setContent('', targetAppName, {})
    }

    componentWillUnmount = () => {
        history.unlisten('ttk-edf-app-portal', this.listen)
    }

    windowClick = (e) => {
        if (!document.getElementById('ttk-edf-app-portal-search-id')) return
        const dom = document.getElementById('ttk-edf-app-portal-search-id').parentNode
        if (!dom.contains(e.target)) {
            this.metaAction.sf('data.animation1', 'out')
            this.metaAction.sf('data.showPanel', 'none')
        }
    }
    componentDidMount = () => {
        //IE中无CustomEvent
        (function () {

            if (typeof window.CustomEvent === "function") return false;

            function CustomEvent(event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }

            CustomEvent.prototype = window.Event.prototype;

            window.CustomEvent = CustomEvent;
        })();
        (function () {
            var throttle = function (type, name, obj) {
                obj = obj || window;
                var running = false;
                var func = function () {
                    if (running) { return; }
                    running = true;
                    requestAnimationFrame(function () {
                        obj.dispatchEvent(new CustomEvent(name));
                        running = false;
                    });
                };
                obj.addEventListener(type, func);
            };
            throttle("resize", "optimizedResize");
        })();
        //注册 resize 事件
        window.addEventListener("optimizedResize", this.resize);
    }

    load = async (option) => {
        let response = await this.webapi.portal.init()
        let manageList = await this.webapi.org.queryList()
        response.manageList = manageList
        if (option) {
            response.org = Object.assign(response.org, option)
        }

        if (response.user) {
            this.metaAction.context.set('currentUser', response.user)
            //this.metaAction.sf('data.other.currentUser', fromJS(response.user))
        }
        else {
            this.metaAction.context.set('currentUser', undefined)
            if (this.component.props.onRedirect && this.config.goAfterLogout) {
                this.component.props.onRedirect(this.config.goAfterLogout)
            }
        }
        if (response.org) {

            this.metaAction.context.set('currentOrg', response.org)
        }
        else {

            this.metaAction.context.set('currentOrg', undefined)
            if (this.component.props.onRedirect && this.config.goAfterLogout) {
                this.component.props.onRedirect(this.config.goAfterLogout)
            }
        }
        if (response.menu) {
            this.injections.reduce('load', { menu: response.menu, manageList: response.manageList })
        }
        this.metaAction.sf('data.headCtrl', true)
        this.metaAction.sf('data.isShowSearch', false)
    }
    getOrgs = async () => {

        let manageList = await this.webapi.org.queryList()
        this.injections.reduce('load', { manageList: manageList })
    }
    toggleManage = async (e) => {//切换企业
        let data = this.metaAction.gf('data').toJS()
        let setManage = data.manageList.splice(e.key, 1)
        let response = await this.webapi.org.updateCurrentOrg({ "orgId": setManage[0].id })
        // sessionStorage['_accessToken'] = response.token
        this.metaAction.context.set('currentOrg', setManage[0])
        this.injections.reduce('closeContentReally', 'all')
        this.load(setManage[0])
        this.setContent('门户首页', 'ttk-edf-app-portal', { isShowMenu: false, isTabsStyle: false })
        this.metaAction.sf('data.visible', false)
        // setTimeout(() => {
        //     this.setContent('门户首页', 'ttk-edf-app-portal')
        // },500)

    }
    handleVisibleChange = (visible) => {
        this.metaAction.sf('data.visible', visible)
    }
    menuControl = async (e) => {//帮助中心控制面板
        if (this.metaAction.gf('data.showPanel') == 'block') {
            this.metaAction.sf('data.showPanel', 'none')
        } else {
            this.metaAction.sf('data.showPanel', 'block')
        }
        this.metaAction.sf('data.animation', 'in')
    }


    onFull = () => {
        requestFullscreen()
    }

    onExitFull = () => {
        exitFullscreen()
    }

    fullScreenControl = () => {
        if (this.metaAction.gf('data.fold') == true) {
            this.metaAction.sf('data.fold', false)
            this.onExitFull()
            return false
        } else {
            this.metaAction.sf('data.fold', true)
            this.onFull()
            return true
        }
    }
    pagestyleControl = () => {
        if (this.metaAction.gf('data.isTabsStyle') == true) {
            this.metaAction.sf('data.isTabsStyle', false)
        }
        else {
            this.metaAction.sf('data.isTabsStyle', true)
        }

    }
    hidePanel = () => {
        this.metaAction.sf('data.animation', 'out')
        this.metaAction.sf('data.showPanel', 'none')
    }
    animationEnd = () => {
        this.metaAction.gf('data.animation') == 'out' &&
            this.metaAction.sf('data.showPanel', 'none')
    }
    getLogo = () => this.config.logo

    getPhoto = () => {
        const user = this.getCurrentUser()
        if (user) {
            if (user.sex == 1) {
                return male
            } else if (user.sex == 2) {
                return female;
            } else {
                return other
            }
        }
        return other
    }

    getCurrentUser = () => this.metaAction.context.get('currentUser') || {}

    getCurrentOrg = () => this.metaAction.context.get('currentOrg') || {}

    getUserNickName = () => {
        const user = this.getCurrentUser()
        if (user && user.nickname) {
            return user.nickname;
        } else {
            return sessionStorage.getItem('username')
        }
        return ""
    }

    getOrgName = () => {
        const org = this.getCurrentOrg()
        if (org) {
            return org.name;
        }
        return ""
    }

    resize = () => {
        let data = this.metaAction.gf('data').toJS();
        window.onresize = () => {
            if (data.widthPersonStatus == false) {
                let width = window.innerWidth > 1024 ? true : false;
                this.metaAction.sf('data.width', width);
            }
        }
    }
    switchMenu = () => {
        let flag = this.metaAction.gf('data').toJS();
        this.metaAction.sf('data.width', !flag.width);
        this.metaAction.sf('data.widthPersonStatus', true);
    }
    getMenuChildren = () => {
        const menu = this.metaAction.gf('data.menu').toJS()

        const loop = (children, num) => {
            const ret = [];
            if (num == 1) {
                children.forEach(child => {
                    if (child.id != "1") {
                        ret.push({
                            name: child.key,
                            key: child.key,
                            className: "{{data.width ? 'level-first show-content' : 'level-first hide-content'}}",
                            title: child.children.length !== 0 && [{
                                name: 'title',
                                component: 'span',
                                className: 'leftNavMenu',
                                children: [{
                                    name: 'icon',
                                    component: 'Icon',
                                    fontFamily: 'edficon',
                                    className: 'menu-icon',
                                    type: child.iconFont //'laptop'
                                }, {
                                    name: 'title',
                                    component: 'span',
                                    className: 'menu-content',
                                    children: child.name
                                }]
                            }],
                            component: child.children.length == 0 ? 'Menu.Item' : 'Menu.SubMenu',
                            children: child.children.length == 0 ? [{
                                name: 'icon',
                                component: 'Icon',
                                fontFamily: 'edficon',
                                className: 'menu-icon',
                                type: child.iconFont //'link'
                            }, {
                                name: 'title',
                                component: 'span',
                                className: 'menu-content',
                                children: child.name
                            }] : loop(child.children, 2)
                        })
                    }
                })
            } else {
                children.forEach(child => {
                    if (!child.children || child.children.length == 0) {
                        ret.push({
                            name: child.key,
                            key: child.key,
                            className: 'left-menu-submenu-menuitem',
                            component: 'Menu.Item',
                            children: child.name
                        })
                    } else {
                        ret.push({
                            name: child.key,
                            key: child.key,
                            className: 'left-menu-itemgroup',
                            title: {
                                name: 'title',
                                component: 'span',
                                children: child.name
                            },
                            component: 'Menu.ItemGroup',
                            children: loop(child.children, 2)
                        })
                    }
                })
            }
            return ret
        }

        return {
            _isMeta: true,
            value: loop(menu, 1)
        }
    }
    createLink = () => {
        let element = document.head.querySelector('.el-element')
        // if(element){

        //     element.parentNode.removeChild(element)
        // }

        let origin = location.origin
        let link = document.createElement('link')
        link.className = 'el-element'
        link.rel = 'stylesheet'
        link.type = 'text/css'
        return link
    }
    toggleColor = async (color, action) => {
        //let hash = (__webpack_hash__).slice(0, 8)
        let origin = location.href
        if (origin && origin.indexOf('#') > -1) {
            origin = location.href.split('#')[0].substr(0, location.href.split('#')[0].length - 1)
        }
        let link = this.createLink()
        switch (color) {
            case '#416AAA':
                link.href = origin + '/blueTheme' + '.css'
                break;
            case '#1EB5AD':
                link.href = origin + '/businessBlueTheme' + '.css'
                break;
            default:
                link.href = origin + '/businessBlueTheme' + '.css'
                break;
        }
        document.head.appendChild(link)
        if (action && action == 'change') {
            this.webapi.user.updateSkin(color)
            localStorage['skin'] = color
        }
    }


    //获取extraMenuWidth
    getExtraMenuWidth = () => {
        let style = {}
        let content = this.metaAction.gf('data.content').toJS()
        if (content.appName == "ttk-edf-app-home") {
            style.width = environment.isDevMode() ? "185px" : "95px"
        } else {
            style.width = environment.isDevMode() ? "95px" : "0px"
        }
        return style
    }
    //panel控制
    showControlPanel = async () => {
        this.metaAction.sf('data.showControlPanel', 'block')
        this.metaAction.sf('data.panelAnimation', 'in')
    }
    //切换选中状态
    panelCheckChange = (e, index) => {
        let appList = this.metaAction.gf('data.desktopAppList').toJS()
        appList[index].checked = !appList[index].checked
        this.injections.reduce('appList', appList)
    }
    hidePanelEnd = () => {
        let animation = this.metaAction.gf('data.panelAnimation')
        if (animation == 'in') return
        this.metaAction.sf('data.showControlPanel', 'none')
    }
    hideCtrlPanel = async (str) => {
        this.metaAction.sf('data.panelAnimation', 'out')
        if (str == 'save') {
            let appList = this.metaAction.gf('data.desktopAppList').toJS()
            let response = await this.webapi.desktop.saveAppList(appList)
            this.injections.reduce('appList', appList, 'reload')
            this.metaAction.sf('data.ctrlPanel', appList)
        } else if (str == 'cancel') {
            let appList = this.metaAction.gf('data.ctrlPanel')
            this.injections.reduce('appList', appList)
        }
    }

    topMenuClick = async (e) => {
        switch (e.key) {
            case 'mySetting':
                //点击个人设置时先判断当前是否在企业管理和创建企业界面
                let currentOpenAppName = this.metaAction.gf('data.content').toJS().appName
                if (currentOpenAppName == 'ttk-edf-app-company-manage' || currentOpenAppName == 'ttk-edf-app-company-manage') {
                    this.tabEdit(currentOpenAppName, 'remove')
                }
                this.metaAction.sf('data.isTabsStyle', true)
                this.metaAction.sf('data.isShowMenu', true)
                this.setContent('个人设置', 'ttk-edf-app-my-setting')
                break;
            case 'changestyle':
                this.metaAction.sf('data.setPopoverVisible', true)
                this.showControlPanel()
                break;

            case 'logout':
                if (this.component.props.onRedirect && this.config.goAfterLogout) {
                    let res = await this.webapi.user.logout()
                    if (res) {
                        this.metaAction.context.set('currentUser', undefined)
                        this.metaAction.context.set('currentOrg', undefined)
                        sessionStorage.removeItem('mobile')
                        sessionStorage.removeItem('username')
                        sessionStorage.removeItem('_accessToken')
                        sessionStorage.removeItem('password')
                        this.component.props.onRedirect(this.config.goAfterLogout)
                    }
                }
                break;
            default:
                return
        }
        let selectedKeys = this.metaAction.gf('data.selectedKeys')

        if (selectedKeys) {
            selectedKeys = selectedKeys.toJS()
            selectedKeys[0] = e.key
            this.metaAction.sf('data.selectedKeys', fromJS(selectedKeys))
        }

    }

    goRegister = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        }
        if (e.stopPropagation) {
            e.stopPropagation()
        }

        this.setContent('新建企业', 'ttk-edf-app-company-manage')
        this.metaAction.sf('data.isTabsStyle', false)
        this.metaAction.sf('data.isShowMenu', false)
        this.metaAction.sf('data.visible', false)
        // this.setContent('新建企业', 'ttk-edf-app-company-manage', { mark: 'home' })

    }
    goCompanyManage = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        }
        if (e.stopPropagation) {
            e.stopPropagation()
        }
        this.setContent('企业管理', 'ttk-edf-app-company-manage')
        this.metaAction.sf('data.isTabsStyle', false)
        this.metaAction.sf('data.isShowMenu', false)
        this.metaAction.sf('data.visible', false)
    }

    searchVisibleToogle = () => {
        this.metaAction.sf('data.isShowSearch', !this.metaAction.gf('data.isShowSearch'));
        this.metaAction.sf('data.showSearch', 'block')
        this.metaAction.sf('data.animation1', 'in')
    }
    hideSearch = () => {
        // this.metaAction.sf('data.isShowSearch', !this.metaAction.gf('data.isShowSearch'));
        this.metaAction.sf('data.animation1', 'out')
    }
    animationEnd2 = () => {
        // this.metaAction.gf('data.animation') == 'out' &&
        // this.metaAction.sf('data.showSearch', 'none')
        if (this.metaAction.gf('data.animation1') == 'out') {
            this.metaAction.sf('data.showSearch', 'none')
            this.metaAction.sf('data.isShowSearch', !this.metaAction.gf('data.isShowSearch'));
        }
    }

    getSearchVisible = () => {
        return this.metaAction.gf('data.isShowSearch')
    }

    menuClick = (e) => {
        const menu = this.metaAction.gf('data.menu').toJS()
        const find = (children) => {
            for (let child of children) {
                if (child.key == e.key) {
                    return child
                }
                if (child.children) {
                    let o = find(child.children)
                    if (o) return o
                }
            }
        }

        const hit = find(menu)
        if (hit) {
            this.setContent(hit.name, hit.appName, hit.appParams)
            //埋点
            //_hmt.push(['_trackEvent', '系统管理', '菜单',hit.name])
        }
    }

    getMenuSelectKeys = () => {
        return ['50']
        /*
        const content = this.metaAction.gf('data.content')
        if (!content) return
        const menuKeyNameMap = this.metaAction.gf('data.menuKeyNameMap')
        return [menuKeyNameMap.get(content.get('name'))]
    */
    }
    tabChange = (key) => {
        if (key == 'more') return
        const openTabs = this.metaAction.gf('data.openTabs')
        const curr = openTabs.find(o => o.get('name') == key)
        this.setContent(curr.get('name'), curr.get('appName'), curr.get('appProps'))
    }

    tabEdit = async (key, action) => {
        if (key == 'more') return
        let that = this
        let status = false
        let openTabs = this.metaAction.gf('data.openTabs').toJS()
        openTabs.forEach(o => {
            if (o.name == key) {
                status = o.editing
            }
        })
        if (action == 'remove') {
            if (status) {
                const ret = this.metaAction.modal('confirm', {
                    title: '是否离开',
                    content: `${key}尚未保存，还要离开吗？`,
                    onOk() {
                        return that.injections.reduce('closeContent', key)
                    },
                    onCancel() {
                        return
                    }
                })
            } else {
                this.injections.reduce('closeContent', key)
            }
        }
    }

    closeTabs = (e) => {
        let key = e.key
        let openTabs = this.metaAction.gf('data.openTabs').toJS();
        if (e.key == 'all') {
            this.injections.reduce('closeContent', 'all')
        } else {
            this.injections.reduce('closeContent', openTabs[openTabs.length - 1].name)
        }
    }
    /**
     * reinit时调用
     * 记录当前打开的所有页签
     * 关闭所有后重新打开
     */
    reInitContent = async () => {
        let content = this.metaAction.gf('data.content')
        let openTabs = this.metaAction.gf('data.openTabs')
        this.injections.reduce('closeAll')
        setTimeout(() => {
            this.injections.reduce('reInit', content, openTabs)
        }, 0)
    }
    //从企业管理和创建企业返回时调用
    setContent = (name, appName, appProps = {}) => {
        this.injections.reduce('setContent', name, appName, appProps)
    }
    //判断页面是否处于编辑状态
    editing = (name, status) => {
        this.injections.reduce('editing', name, status)
    }
    //关闭popover时取消选中menu
    cancelCheckStatus = (visible) => {
        this.metaAction.sf('data.setPopoverVisible', false)
        if (!visible) {
            this.metaAction.sf('data.selectedKeys', fromJS([]))
        }
    }
    popoverVisible = (e) => {
        debugger
        this.metaAction.sf('data.selectedKeys', fromJS([]))
    }
    foldMenu = () => {
        this.metaAction.sf('data.isShowMenu', !this.metaAction.gf('data.isShowMenu'))
        setTimeout(function () {
            var event = document.createEvent('HTMLEvents')
            event.initEvent("resize", true, true)
            window.dispatchEvent(event)
        }, 0)
    }
    /**
     * dev模式下才显示开发帮助
     */
    isDevMode = () => {
        return environment.isDevMode()
    }
    //develop开发管理链接
    batchMenuClick = (e) => {
        let links = {
            'axure': 'http://prototype.aierp.cn:8089',
            'jira': 'http://jira.aierp.cn:8089/',
            'Jenkins': 'http://jenkins.aierp.cn:8089/',
            'ued': 'http://ued.aierp.cn:8089/',
            'k8s': 'http://k8s.aierp.cn:8089/',
            'sonar': 'http://sonar.aierp.cn:8089/',
        }
        if (e.key == 'webapi') {
            this.openWebApi()
        } else if (e.key == 'deleteAccount') {
            let name = prompt("Please enter your mobile", "")
            if (name != null && name != "") {
                this.webapi.user.deleteUser({ mobile: name })
            }
        } else {
            window.open(links[e.key])
        }
    }
    openWebApi = () => {
        this.setContent('api', 'app-common-iframe')
        //window.open('http://172.16.10.26/webapi/')
    }

    addEventListener = (eventName, handler) => {
        this.injections.reduce('addEventListener', eventName, handler)
    }

    removeEventListener = (eventName) => {
        this.injections.reduce('removeEventListener', eventName)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })
    return ret
}