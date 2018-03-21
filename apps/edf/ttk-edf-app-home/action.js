import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import Sortable from './Sortable'
import utils from 'edf-utils'


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
        let browserType = utils.environment.getBrowserVersion()
        if (browserType && !browserType.ie) {
            this.onload()
        }
        this.resize()
        // this.mock()
        this.load()
    }
    load = async () => {
        let data = await this.webapi.analysis.init()
        this.injections.reduce('load',data)
    }
    //缩放
    zoom = async (option) => {
        if(this.metaAction.gf('data.zoomValue')){
            this.metaAction.sf('data.zoomValue',undefined)
        }else{
            this.metaAction.sf('data.zoomValue',option)
        }
        //控制缩放zoom
        if(this.metaAction.gf('data.zoom')==true){
            this.metaAction.sf('data.zoom',false)
        }else{
            this.metaAction.sf('data.zoom',true)
        }

    }
    //桌面设置面板的显示隐藏
    panelControl = () => {
        this.metaAction.sf('data.showPanel', 'block')
        this.metaAction.sf('data.animation', 'in')
    }
    hidePanel = () => {
        this.metaAction.sf('data.animation', 'out')
    }
    animationEnd = () => {
        this.metaAction.gf('data.animation') == 'out' &&
            this.metaAction.sf('data.showPanel', 'none')
    }
    //mock数据
    mock = async () => {
        const response = await this.webapi.analysis.query()
        this.injections.reduce('load', response)
    }
    //绑定move事件
    onload = () => {
        let sortable = null
        let obj = document.querySelector('.ttk-edf-app-root')
        obj.addEventListener('DOMNodeInserted', DOMchange, true)
        function DOMchange() {
            let grid = document.querySelector('.ttk-edf-app-home-content')
            if (!grid) return
            sortable = new Sortable(grid, {
                // handle: '.handle'
            })
            // obj.removeEventListener('DOMNodeInserted', DOMchange, true)
        }
    }
    eventBind = () => {
        console.log(1);
    }
    //resize判断分辨率
    resize = () => {
        let that = this
        let width = window.innerWidth
        window.onresize = function () {
            let newWidth = window.innerWidth
            if (width >= 1280 && newWidth < 1280) {
                width = newWidth
                that.injections.reduce('resize', 3)
            } else if (width < 1280 && newWidth >= 1280) {
                width = newWidth
                that.injections.reduce('resize', 4)
            }
        }
    }
    //计算宽度
    calculateWidth = (num) => {
        let base = window.innerWidth < 1280 ? 3 : 4
        let ratio = ''
        if (base == 4) {
            switch (num) {
                case 1:
                    ratio = '25%'
                    break;
                case 2:
                    ratio = '50%'
                    break;
                case 3:
                    ratio = '75%'
                    break;
                case 4:
                    ratio = '100%'
                    break;
            }
        } else if (base == 3) {
            switch (num) {
                case 1:
                    ratio = '33.3333333%'
                    break;
                case 2:
                    ratio = '50%'
                    break;
                case 3:
                    ratio = '100%'
                    break;
                case 4:
                    ratio = '100%'
                    break
            }
        }
        return { width: ratio }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}