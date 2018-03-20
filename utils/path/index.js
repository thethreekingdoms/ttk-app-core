import React from 'react'

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

    if(/^15\./.test(React.version)){
        const loop = (inst) => {
            if(!inst) return ''
            const p = inst._currentElement
                && inst._currentElement._owner
                && inst._currentElement._owner._currentElement
                && inst._currentElement._owner._currentElement.props.path

            if (!p && inst)
                return loop(inst._hostParent)

            return p
        }
        return loop(e._targetInst)
    }

    if(/^16\./.test(React.version)){
          const loop = (inst) => {
            if(!inst) return ''
            const p = inst.return
                && inst.return.memoizedProps
                && inst.return.memoizedProps.path

            if (!p && inst)
                return loop(inst.return)

            return p
        }
        return loop(e._targetInst)
    }
}



export default {
    parsePath,
    existsParamsInPath,
    findPathByEvent
}