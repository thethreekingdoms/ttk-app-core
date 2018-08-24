import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }


    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
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

    layOutChange = (type, status) => {

        if (type == "L") {
            this.component.props.onRedirect({ appName: 'ttk-edf-app-portal' })
        }
        else if (type == "T") {
            this.component.props.onRedirect({ appName: 'ttk-edf-app-portal-hor' })
        }
    }

    toggleColor = async (color, action) => {
        let hash = (__webpack_hash__).slice(0, 8)
        let origin = location.href
        if (origin && origin.indexOf('#') > -1) {
            origin = location.href.split('#')[0].substr(0, location.href.split('#')[0].length - 1)
        }
        let link = this.createLink()
        switch (color) {
            case '#FF913A':
                link.href = origin + '/yellowTheme.' + hash + '.css'
                break;
            case '#00B38A':
                link.href = origin + '/greenTheme.' + hash + '.css'
                break;
            case '#416AAA':
                link.href = origin + '/blueTheme.' + hash + '.css'
                break;
            case '#1EB5AD':
                link.href = origin + '/businessBlueTheme.' + hash + '.css'
                break;
            case '#B4A074':
                link.href = origin + '/orangeTheme.' + hash + '.css'
                break;
            case '#414141':
                link.href = origin + '/blackTheme.' + hash + '.css'
                break;
            default:
                link.href = origin + '/greenTheme.' + hash + '.css'
                break;
        }
        document.head.appendChild(link)
        if (action && action == 'change') {
            //this.webapi.user.updateSkin(color)
            localStorage['skin'] = color
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

