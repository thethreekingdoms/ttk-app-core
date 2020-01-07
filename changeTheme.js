import { environment } from 'edf-utils'
let loadSplitCss = false
const borwserVersion = environment.getBrowserVersion()
if (borwserVersion.ie && borwserVersion.version < 10) {
    loadSplitCss = true
}

import moduleGlobal from './modules/loadGlobalModules'

const moduleName = moduleGlobal.moduleName

function getTheme(color) {
    let theme = null
    //判断主题颜色
    switch (color) {
        case '#FF913A':
            theme = 'YellowTheme'
            break;
        case '#00B38A':
            theme = 'GreenTheme'
            break;
        case '#0066B3':
            theme = 'BlueTheme'
            break;
        case '#1EB5AD':
            theme = 'BusinessBlueTheme'
            break;
        case '#B4A074':
            theme = 'OrangeTheme'
            break;
        case '#414141':
            theme = 'BlackTheme'
            break;
        default:
            theme = 'BlueTheme'
            break;
    }
    return theme
}


const createLink = () => {
    let link = document.createElement('link')
    link.className = 'el-element'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.id = 'skin'
    return link
}

async function changeTheme(origin, color = {}, source) {
    if (loadSplitCss || process.env.MODE_SPLIT) {
        return changeThemeforIE(color)
    }
    if (!window.moduleManifest) {
        await moduleGlobal.get('theme')
    }
    const preLink = document.querySelector('#modules_theme_collection')
    let theme = getTheme(color)

    //插入link标签
    let link = document.createElement('link')
    link.className = 'moduleManifest'
    link.rel = 'stylesheet'
    link.type = 'text/css'

    if(source != 'global' || (window.location.href.indexOf('theme=blue') > -1)) {
        link.href = `./mergeModule/merge${theme}.${window.moduleManifest.nowtime}.css`
    }

    document.head.appendChild(link)
    if (preLink) {
        document.head.removeChild(preLink)
        link.id = 'modules_theme_collection'
    }

    if (window.singleApp) {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = `./singleStyle.css`
        document.head.appendChild(link)
    }
}

async function changeThemeforIE(color, i) {
    if (!window.moduleManifest) {
        await moduleGlobal.get('theme')
    }
    let theme = getTheme(color)
    moduleName.forEach((item, index) => {
        let link = null
        let preLink = document.querySelector(`#skin${index}`)
        link = createLink()
        if (window[`moduleManifest`][item] && window[`moduleManifest`][item][`${item}${theme}.css`]) {
            link.href = window[`moduleManifest`][item][`${item}${theme}.css`]
        }
        document.head.appendChild(link)
        link.onload = () => {
            if (preLink) {
                document.head.removeChild(preLink)
            }
            link.id = `skin${index}`
        }
    })

}

window.changeTheme = {
    changeThemeforIE,
    changeTheme,
    getTheme
}

export default {
    changeThemeforIE,
    changeTheme
}