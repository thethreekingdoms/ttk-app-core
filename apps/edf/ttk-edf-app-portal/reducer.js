import { Map, List, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'edf-meta-engine'
import config from './config'
import { getInitState } from './data'
import { history } from 'edf-utils'
import { log } from 'util';

var listeners = Map()
class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
        this.webapi = this.config.webapi
    }

    init = (state, option) => {
        let initState = getInitState()


        initState.data.other.username = sessionStorage['username']
        state = this.metaReducer.init(state, getInitState())

        if (this.config.menu && !this.config.webapi.getMenu) {
            return this.load(state, { menu: this.config.menu })
        }
        var defaultMenuItem, firstMenuItem, defaultOpens = [], menuKeyNameMap = [], menuAppNameMap = []
        state = this.metaReducer.sf(state, 'data.menuKeyNameMap', fromJS(menuKeyNameMap))
        state = this.metaReducer.sf(state, 'data.menuAppNameMap', fromJS(menuAppNameMap))
        let availableOrg = sessionStorage.getItem('currentOrgStatus')
        if(availableOrg == 1) {
            state = this.metaReducer.sf(state, 'data.isTabsStyle', false)
            state = this.metaReducer.sf(state, 'data.isShowMenu', false)
            state = this.metaReducer.sf(state, 'data.visible', false)
            return this.setContent(state, '企业管理', 'ttk-edf-app-company-manage')
        } else if(availableOrg == 2) {
            state = this.metaReducer.sf(state, 'data.isTabsStyle', false)
            state = this.metaReducer.sf(state, 'data.isShowMenu', false)
            state = this.metaReducer.sf(state, 'data.visible', false)
            return this.setContent(state, '新建企业', 'ttk-edf-app-company-manage-add')
        }
        return state
    }


    load = (state, { menu, manageList }) => {

        if (!manageList) {
            manageList = []
            manageList.push({ name: '无' })
        }
        if (manageList) {
            state = this.metaReducer.sf(state, 'data.manageList', fromJS(manageList))
        }
        if (!menu || menu.length == 0)
            return state

        var defaultMenuItem, firstMenuItem, defaultOpens = [], menuKeyNameMap = {}, menuAppNameMap = {}

        const loop = (children) => {
            const ret = []
            children.forEach(child => {
                menuKeyNameMap[child.name] = child.key

                //history增加
                if (child.appName) {
                    menuAppNameMap[child.appName] = {
                        name: child.name,
                        props: child.appParams || {}
                    }
                }

                if (!child.children) {
                    if (!firstMenuItem) {
                        firstMenuItem = child
                    }


                    if (child.isDefault) {
                        defaultMenuItem = child
                    }
                }
                else {
                    if (child.isExpand) {
                        defaultOpens.push(child)
                    }

                    loop(child.children)
                }
            })
            return ret
        }

        loop(menu)

        defaultMenuItem = defaultMenuItem || firstMenuItem
        //note 默认展现的APP
        if (!defaultMenuItem) {
            defaultMenuItem = menu ? menu[0] : {}
        }

        const menuSelectedKeys = fromJS(defaultMenuItem ? [defaultMenuItem.key] : [])
        const menuDefaultOpenKeys = fromJS(defaultOpens.map(o => o.key))
        const defaultContent = defaultMenuItem ? defaultMenuItem : {}

        state = this.metaReducer.sf(state, 'data.menu', fromJS(menu))
        state = this.metaReducer.sf(state, 'data.menuKeyNameMap', fromJS(menuKeyNameMap))
        state = this.metaReducer.sf(state, 'data.menuAppNameMap', fromJS(menuAppNameMap))
        state = this.metaReducer.sf(state, 'data.menuSelectedKeys', menuSelectedKeys)
        state = this.metaReducer.sf(state, 'data.menuDefaultOpenKeys', menuDefaultOpenKeys)
        const childApp = history.getChildApp('ttk-edf-app-portal')

        if (childApp)
            return this.setContent(state, '', childApp, {})
        else {
            state = this.metaReducer.sf(state, 'data.isTabsStyle', true)
            state = this.metaReducer.sf(state, 'data.isShowMenu', true)
            state = this.metaReducer.sf(state, 'data.visible', false)
            return this.setContent(state, defaultContent.name, defaultContent.appName, defaultContent.appProps)
        }
    }

    setContent = (state, name, appName, appProps) => {
        //判断当前显示页签appName和要新打开的是否一致
        const currContent = this.metaReducer.gf(state, 'data.content')
        if (currContent && appName == currContent.get('appName'))
            return state

        //history增加
        let menuAppNameMap = this.metaReducer.gf(state, 'data.menuAppNameMap')
        if (name && appName && menuAppNameMap.getIn([appName, 'name']) != name) {
            menuAppNameMap = menuAppNameMap.set(appName, fromJS({ name, props: appProps }))
            state = this.metaReducer.sf(state, 'data.menuAppNameMap', menuAppNameMap)
        }

        name = menuAppNameMap.getIn([appName, 'name'])

        /**
         * 参数问题，zhaoyun@ttk.com
         */
        let _appProps = menuAppNameMap.getIn([appName, 'props'])
        if (_appProps && _appProps.size > 0) {
            appProps = _appProps
        }
        let content = fromJS({ name, appName, appProps, editing: false })
        state = this.metaReducer.sf(state, 'data.content', content)

        var openTabs = this.metaReducer.gf(state, 'data.openTabs') || List()
        var hit = openTabs.findIndex(o => o.get('name') == name || o.get('appName') == appName) != -1

        let orgSign = false
        if (appProps !== undefined && appProps.size > 0 && appProps !== '{}') {

            if (appProps.get('isTabsStyle') == false && appProps.get('isShowMenu') == false) {
                state = this.metaReducer.sf(state, 'data.isTabsStyle', true)
                state = this.metaReducer.sf(state, 'data.isShowMenu', true)
                hit = false
                orgSign = false
                content = fromJS({ name: '我的桌面', appName: 'ttk-edf-app-home', appProps: undefined })
                openTabs = List()
                state = this.metaReducer.sf(state, 'data.content', content)
            }

        }
        const isTabsStyle = this.metaReducer.gf(state, 'data.isTabsStyle')

        if (!hit) {

            if (isTabsStyle && openTabs.size > 0) {
                openTabs = openTabs.push(content)
            }

            else {
                openTabs = List().push(content)
            }
            state = this.metaReducer.sf(state, 'data.openTabs', openTabs)
        }
        else {
            if (!isTabsStyle) {
                openTabs = List().push(content)
                state = this.metaReducer.sf(state, 'data.openTabs', openTabs)

            }
            else {
                let listener = listeners.get(`onTabFocus_${appName}`)
                if (listener) {
                    setTimeout(() => listener(appProps), 16)
                }
            }
        }


        if (orgSign) {
            setTimeout(() => {
                history.pushChildApp('ttk-edf-app-portal')
            }, 0)
        }
        else {
            setTimeout(() => {
                history.pushChildApp('ttk-edf-app-portal', content.get('appName'))
            }, 0)
        }

        return state
    }

    closeContent = (state, name, fun) => {
        const curContent = this.metaReducer.gf(state, 'data.content')
        const appName = curContent.get('appName')
        let res = false
        if (appName) {
            let listener = listeners.get(`onTabClose_${appName}`)
            if (listener) {
                res = listener() //调用领域自己页面注册得关闭事件，返回bool类型，判断当前单据是否有变动
            }
        }
        return this.closeContentReally(state, name, fun, res, appName)
    }

    closeContentReally = (state, name, fun, res, appName) => {
        var openTabs = this.metaReducer.gf(state, 'data.openTabs') || List()

        let desktop = openTabs.toJS().slice(0, 1)
        var hitIndex = openTabs.findIndex(o => o.get('name') == name)
        if (name == 'all') {
            state = this.metaReducer.sf(state, 'data.openTabs', fromJS(desktop))
            return this.metaReducer.sf(state, 'data.content', openTabs.get(0))
        }
        if (typeof (fun) == 'function' && res) {
            fun()
            return state
        }
        state = this.removeEventListener(state, name)
        openTabs = openTabs.remove(hitIndex)
        state = this.metaReducer.sf(state, 'data.openTabs', openTabs)

        state = this.metaReducer.sf(state, 'data.content', openTabs.get(openTabs.size - 1))
        history.pullChildApp(appName, openTabs)
        return state
    }

    closeAll = (state) => {
        state = this.metaReducer.sf(state, 'data.openTabs', new List())
        return this.metaReducer.sf(state, 'data.content', new Map())
    }
    reInit = (state, content, openTabs) => {
        state = this.metaReducer.sf(state, 'data.openTabs', openTabs)
        return this.metaReducer.sf(state, 'data.content', content)
    }
    addEventListener = (state, eventName, handler) => {
        const currContent = this.metaReducer.gf(state, 'data.content')
        const appName = currContent.get('appName')

        eventName = eventName + '_' + appName
        if (!listeners.get(eventName)) {
            listeners = listeners.set(eventName, handler)
        }

        return state
    }

    removeEventListener = (state, name) => {
        if (name == 'all') { // 删除所有页签的listener
            listeners = Map()
            return state
        }

        const curContent = this.metaReducer.gf(state, 'data.content')
        const appName = curContent.get('appName')

        // 删除当前页签的listener
        let listenersKey = Object.keys(listeners.toJS())
        for (let i = 0; i < listenersKey.length; i++) {
            if (listenersKey[i].indexOf('_' + appName) > -1 &&
                listeners.get(listenersKey[i])) {

                listeners = listeners.remove(listenersKey[i])
            }
        }

        return state
    }
    //判断页面是否处于编辑状态
    editing = (state, appName, status) => {
        let openTabs = this.metaReducer.gf(state, 'data.openTabs').toJS()
        openTabs.forEach(o => {
            if (o.appName == appName) {
                o.editing = status
            }
        })
        state = this.metaReducer.sf(state, 'data.openTabs', fromJS(openTabs))
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}
