import * as history from 'history'

const hashHistory = history.createHashHistory(),
    listerners = {},
    _options = {} //{isAlias:()=>{}, toAlias:()=>{}, toRealName:()=>{}}

function config(options) {
    Object.assign(_options, options)
}

function getAlias(pathName) {
    if (!_options.isAlias || !_options.toAlias || _options.isAlias(pathName))
        return pathName
    return _options.toAlias(pathName)
}

function getRealName(pathName) {
    if (!_options.isAlias || !_options.toRealName || !_options.isAlias(pathName))
        return pathName
    return _options.toRealName(pathName)
}

function listen(selfApp, handler) {
    if (!listerners[selfApp]) {
        listerners[selfApp] = []
    }

    let h = listerners[selfApp].find(o => o.listen == handler)
    if (!h) {

        h = handler
        let unlisten = hashHistory.listen((location, action) => {
            const childApp = getChildApp(selfApp) || 'edfx-app-home'
            handler(childApp, location, action)
        })

        listerners[selfApp].push({
            listen: h,
            unlisten
        })
    }
}

function unlisten(selfApp, handler) {
    if (!listerners[selfApp])
        return

    const index = listerners[selfApp].findIndex(o => o.listen == handler)

    if (index == -1)
        return

    listerners[selfApp][index].unlisten()
    listerners[selfApp].splice(index, 1)
}


function getChildApp(selfApp) {
    let pathName = hashHistory.location.pathname + hashHistory.location.search
    pathName = getRealName(pathName)
    if (!pathName || pathName == '/' || pathName.indexOf(selfApp) == -1)
        return

    const segs = pathName.split('/')

    const selfIndex = segs.findIndex(s => s.indexOf(selfApp) != -1)

    if (segs.length - 1 == selfIndex) {
        return
    }

    const ret = segs[selfIndex + 1]

    return ret == '/' ? undefined : ret
}

function pullChildApp(closeAppName, currentTab) {
    //关闭页签，刷新router
    let currentTabIndex = currentTab.size == 0 ? 0 : currentTab.size - 1
    let historyArray = currentTab.get(currentTabIndex)
    if (historyArray) {
        let childApp = getRealName(historyArray.get('appName'))
        if (childApp) {
            let selfApp = 'edfx-app-portal'
            this.pushChildApp(selfApp, childApp)
            /*
            try {
                
                let newHistoryApp = selfApp + childApp
                if (!childApp || childApp == '/' || childApp.indexOf(childApp) == -1) {
                    hashHistory.push(getAlias(`/${selfApp}/${childApp}`))
                    return
                }
                //hashHistory.push(newHistoryApp)
            }
            catch (exp) {

            }*/
        }
    }
}

function pushChildApp(selfApp, childApp) {
    let pathName = hashHistory.location.pathname
    pathName = getRealName(pathName)
    if (!pathName || pathName == '/' || pathName.indexOf(selfApp) == -1) {
        hashHistory.push(getAlias(`/${selfApp}/${childApp}`))
        return
    }

    const segs = pathName.split('/')

    const selfIndex = segs.findIndex(s => s.indexOf(selfApp) != -1)

    if (segs.length - 1 == selfIndex) {
        segs.push(childApp)
    }
    else {
        segs.splice(selfIndex + 1, segs.length - selfIndex, childApp)
        //segs[selfIndex + 1] = childApp
    }

    if (pathName == segs.join('/')) {

        hashHistory.push(getAlias(segs.join('/')))
        return
    }


    hashHistory.push(getAlias(segs.join('/')))
}


export default {
    config,
    listen,
    unlisten,
    getChildApp,
    pushChildApp,
    pullChildApp,
    location: hashHistory.location
}