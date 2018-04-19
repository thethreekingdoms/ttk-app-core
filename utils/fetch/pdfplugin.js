import React from 'react'
import * as antd from 'antd'

const Message = antd.message

//判断IE下PDF插件是否安装
export function isAcrobatInstalledInIE() {
    let pdfPlugin = getPDFPlugin()

    if (!pdfPlugin) {
        let message = { type: '', mode: 'message', content: '您可能没有安装pdf阅读器，为了方便您阅读pdf文档，请下载安装', duration: 20 }
        Message.info(message.content, message.duration)
        window.open("http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.3/chs/AdbeRdr930_zh_CN.exe")

        return false
    }

    return true
}

//获取Adobe Reader插件信息
function getPDFPlugin() {
    if (getBrowserName() == 'ie') {
        // load the activeX control
        // AcroPDF.PDF is used by version 7 and later
        // PDF.PdfCtrl is used by version 6 and earlier
        return getActiveXObject('AcroPDF.PDF') ||
            getActiveXObject('PDF.PdfCtrl') ||
            getActiveXObject('Adobe Acrobat') ||
            getActiveXObject('Adobe PDF Plug-in')
    }
    else {
        // return getNavigatorPlugin('Adobe Acrobat') ||
        //        getNavigatorPlugin('Chrome PDF Viewer') ||
        //        getNavigatorPlugin('WebKit built-in PDF')
        // 非IE不用检测
        return 'havePdfPlugin'
    }
}

//检测浏览器类型：IE、火狐、谷歌、Safari
function getBrowserName() {
    let userAgent = navigator ? navigator.userAgent.toLowerCase() : "other"
    if (userAgent.indexOf("chrome") > -1) return "chrome"
    else if (userAgent.indexOf("safari") > -1) return "safari"
    else if (userAgent.indexOf("msie") > -1 || userAgent.indexOf("trident") > -1) return "ie"
    else if (userAgent.indexOf("firefox") > -1) return "firefox"
    return userAgent
}

//针对IE返回ActiveXObject
function getActiveXObject(name) {
    try {
        return new ActiveXObject(name)
    } catch (e) {
    }
}

//针对除了IE之外浏览器
function getNavigatorPlugin(name) {
    for (let key in navigator.plugins) {
        let plugin = navigator.plugins[key]
        if (plugin.name == name) return plugin
    }
}

function getAcrobatVersion() {
    try {
        let plugin = getPDFPlugin()
        if (getBrowserName() == 'ie') {
            let versions = plugin.GetVersions().split(',')
            let latest = versions[0].split('=')
            return parseFloat(latest[1])
        }
        if (plugin.version) return parseInt(plugin.version)
        return plugin.name
    } catch (e) {
        return null
    }
}
