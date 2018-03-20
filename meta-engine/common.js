import Immutable, { Map, List, fromJS } from 'immutable'
import utils, { path } from 'edf-utils'

const { existsParamsInPath, parsePath } = path


const cache = { meta: Map() }

window['__getCache'] = () => cache

export function setMeta(appInfo) {
    if (!appInfo || !appInfo.meta) return
    const appName = appInfo.name
    if (cache.meta.has(appName))
        return
    setMetaForce(appName, appInfo.meta)
}

export function setMetaForce(appName, meta) {
    if (!appName || !meta)
        return

    meta = fromJS(meta)

    cache.meta = cache.meta
        .setIn([appName, 'meta'], meta)
        .setIn([appName, 'metaMap'], parseMeta(meta))
}

export function getMeta(appInfo, fullpath, propertys) {
    //path空取整个meta
    if (appInfo && !appInfo.name && this.appInfo.name) {
        appInfo.name = this.appInfo.name
    }
    if (!fullpath)
        return cache.meta.getIn([appInfo.name, 'meta']).toJS()
    const parsedPath = parsePath(fullpath),
        vars = parsedPath.vars,
        metaMap = cache.meta.getIn([appInfo.name, 'metaMap']),
        meta = cache.meta.getIn([appInfo.name, 'meta'])

    const path = metaMap.get(parsedPath.path)

    const currentMeta = path ? meta.getIn(path.split('.')) : meta

    //属性空，获取该路径下所有属性
    if (!propertys)
        return currentMeta.toJS()

    const ret = {}

    //属性为数组，遍历获取
    if (propertys instanceof Array) {
        propertys.forEach(p => {
            let val = currentMeta.getIn(p.split('.'))
            //immutable值，直接toJS()
            ret[p] = (val && val.toJS) ? val.toJS() : val
        })

        return ret
    }

    //属性为字符串，直接获取
    if (typeof propertys == 'string') {
        let val = currentMeta.getIn(propertys.split('.'))
        return (val && val.toJS) ? val.toJS() : val
    }
}

export function getField(state, fieldPath) {
    if (!fieldPath) {
        return state.get('data')
    }

    if (fieldPath instanceof Array) {
        return state.getIn(fieldPath)
    } else {
        return state.getIn(fieldPath.split('.'))
    }
}

export function getFields(state, fieldPaths) {
    var ret = {}
    fieldPaths.forEach(o => ret[o] = getField(state, o))
    return ret
}

export function setField(state, fieldPath, value) {
    if (fieldPath instanceof Array) {
        return state.setIn(fieldPath, value)
    } else {
        return state.setIn(fieldPath.split('.'), value)
    }
}

export function setFields(state, values) {
    Object.keys(values).forEach(k => {
        state = setField(state, k, values[k])
    })

    return state
}

export function updateField(state, fieldPath, fn) {
    if (fieldPath instanceof Array) {
        return state.updateIn(fieldPath, fn)
    } else {
        return state.updateIn(fieldPath.split('.'), fn)
    }
}

function isComponent(meta) {
    return typeof meta == 'object' && !!meta.name && !!meta.component
}

function parseMeta(meta) {
    let ret = Map()
    const parseProp = (propValue, parentPath, parentRealPath) => {
        if (!(propValue instanceof Immutable.Map)) {
            return
        }
        if (propValue.get('name') && propValue.get('component')) {
            const name = utils.string.trim(propValue.get('name'))
            parentPath = parentPath ? `${parentPath}.${name}` : name
            ret = ret.set(parentPath, parentRealPath)
        }

        propValue.keySeq().toArray().forEach(p => {

            let v = propValue.get(p),
                currentPath = parentPath ? `${parentPath}.${p}` : p
            if (v instanceof Immutable.List) {
                v.forEach((c, index) => {
                    let currentRealPath = parentRealPath ? `${parentRealPath}.${p}.${index}` : `${p}.${index}`
                    parseProp(c, `${currentPath}`, currentRealPath)
                })
            } else {
                let currentRealPath = parentRealPath ? `${parentRealPath}.${p}` : p
                parseProp(v, `${currentPath}`, currentRealPath)
            }
        })
    }

    parseProp(meta, '', '')
    return ret
}
