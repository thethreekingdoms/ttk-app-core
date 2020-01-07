import React from 'react'
import { isDevMode } from '../environment/index'

/**
 * [是否存在参数]
 * @param  {[type]} path [路径]
 * @return {[type]}      [是否存在参数]
 */
function existsParamsInPath(path) {
    return /,/.test(path)
}

/**
 * [解析路径]
 * @param  {[type]} path [路径]
 * @return {[type]}      [路径+参数数组]
 */
function parsePath(path) {
    if (!path) return
    if (path.indexOf(',') == -1) {
        return {
            path : path.replace(/\s/g, '')
        }
    } else {
        let segments = path.split(","),
            vars = segments.slice(1)
        return {
            path: segments[0].replace(/\s/g, ''),
            vars: vars.map(o=>o.replace(/\s/g, ''))
        }
    }
}

function findPathByEvent(e) {

    const loop = (inst) => {
        if (!inst) return ''
        const p = inst.return
            && inst.return.memoizedProps
            && inst.return.memoizedProps.path

        if (!p && inst)
            return loop(inst.return)

        return p
    }
    return loop(e._targetInst)

    // if(/^15\./.test(React.version)){
    //     const loop = (inst) => {
    //         if(!inst) return ''
    //         const p = inst._currentElement
    //             && inst._currentElement._owner
    //             && inst._currentElement._owner._currentElement
    //             && inst._currentElement._owner._currentElement.props.path

    //         if (!p && inst)
    //             return loop(inst._hostParent)

    //         return p
    //     }
    //     return loop(e._targetInst)
    // }

    // if(/^16\./.test(React.version)){

    // }
}

function getVersion() {
    var rawFile = {}
    if (window.XMLHttpRequest) {
        rawFile = new XMLHttpRequest();
    } else {
        rawFile = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var allText = ''
    rawFile.open("GET", "./version.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText
}

function getResponse(response, declareState, reportId, orgId){
    let skin = localStorage.getItem('skin').replace('#', '')

    if (skin != '') {
        response = response + '&skin=' + skin
    }
    //增加申报状态参数
    response = response + '&declareState=' + declareState + '&reportId=' + reportId + '&orgId=' + orgId
    response = response.replace('sdlxindex', 'base')
    console.log('个税URL地址:' + response)

    return response
}

export default {
    parsePath,
    existsParamsInPath,
    findPathByEvent,
    getVersion,
    getResponse
}
