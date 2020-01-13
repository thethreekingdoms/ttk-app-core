import { Map, is } from 'immutable';
import wrapMapStateToProps from './wrapMapStateToProps';
import wrapMapDispatchToProps, { registryActionCouriers } from './wrapMapDispatchToProps';
import createReduxConnector from './createReduxConnector';

export default function (state = Map(), {
    type,
    payload
}) {
    switch (type) {
        case "@@addAppContainor":
            return addAppContainor(state, payload);
        case "@@loadAppReal":
            return loadApp(state, payload);
        case "@@reduce":
            return reduce(state, payload);
        case "@@clearAppState":
            return clearAppState(state, payload);
        case "@@originReduce":
            return originReduce(state, payload)
        case "@@updateState":
            return updateState(state, payload)
        default:
            return state;
    }
}


function addAppCount(state, { fullName }) {
    if (state.has(fullName)) {
        // 对加载的App计数，requireCount为0时，在clearAppState清除@@require数据
        let requireCount = state.getIn([fullName, '@@requireCount']);
        if (requireCount === undefined) {
            requireCount = 0;
        }
        requireCount += 1;
        state = state.setIn([fullName, '@@requireCount'], requireCount);
    }
    return state;
}

function addAppContainor(state, {
    fullName,
    appInfo,
    component = {},
    action = {},
    reducer = {},
    appDataId
}) {
    if (appInfo.type !== 'origin') {
        if (!state.getIn([fullName, appDataId])) {

            const actionInstance = typeof action == 'function' ? action({ appInfo, fullName, appDataId }) : action,
                reducerInstance = typeof reducer == 'function' ? reducer({ appDataId }) : reducer,
                container = createReduxConnector(
                    component,
                    wrapMapStateToProps(fullName, appDataId),
                    wrapMapDispatchToProps(fullName, actionInstance, reducerInstance),
                    null, { pure: true }
                );
            state = addAppCount(state, { fullName });
            state = state.setIn([fullName, appDataId, 'container'], container);
        }
    } else {
        state = state.setIn([fullName, appDataId, 'container'], component);
        state = state.setIn([fullName, appDataId, 'data'], Map());
        state = state.setIn([fullName, appDataId, 'type'], 'origin')
        registryActionCouriers(fullName, appDataId, action, reducer)
    }
    return state;
}

function loadApp(state, {
    fullName,
    prevFullName,
    appInfo,
    component = {},
    action = {},
    reducer = {},
    appDataId
}) {
    // if (appInfo) {
    // //埋点记录所有的打开页面
    // if (appInfo.name != 'edfx-app-root' && appInfo.name != null) {
    //     _hmt && _hmt.push(['_trackEvent', appInfo.moduleName || '', appInfo.description || '', appInfo.name])
    // }
    // }
    /*    let appDataInfoEle = document.getElementById('appDataInfo'),
            appDataInfoV = JSON.parse(appDataInfoEle.value || "[]")*/
    state = state.setIn([fullName, '@@require'], Map({
        fullName,
        appInfo,
        component,
        action,
        reducer
    }));
    state = addAppContainor(state, { fullName, appInfo, component, action, reducer, appDataId });
    if (prevFullName && prevFullName != fullName) {
        state = clearAppState(state, { fullName, prevFullName, appDataId });
    }

    return state;
}

function clearAppState(state, {
    fullName,
    appDataId
}) {
    if (!state.has(fullName)) {
        return state;
    }

    let requireCount = state.getIn([fullName, '@@requireCount']);
    if (requireCount && requireCount > 1) {
        requireCount -= 1;
        state = state.setIn([fullName, '@@requireCount'], requireCount);
        state = state.update(fullName, x => x.remove(appDataId));
    } else {
        state = state.remove(fullName);
        return state;
    }
    return state;
}


function reduce(state, {
    reducer,
    type,
    payload,
    fullName,
    injectFunsForReducer
}) {

    var startDate = new Date();
    var oldState = state.get(fullName);
    var newState = reducer[type].apply(this, [oldState].concat(payload));
    if (typeof newState === "function") {
        newState = newState(injectFunsForReducer);
    }
    if (window.__reduxAction == true) {
        window.reduxAction = window.reduxAction || [];
        var endDate = new Date();
        window.reduxAction.unshift({
            appFullName: fullName,
            reduceMethod: type,
            payload,
            oldState,
            newState,
            startTime: startDate.getHours() + ':' + startDate.getMinutes() + ':' + startDate.getSeconds() + '.' + startDate.getMilliseconds(),
            endTime: endDate.getHours() + ':' + endDate.getMinutes() + ':' + endDate.getSeconds() + '.' + endDate.getMilliseconds(),
            elapsedTime: Math.abs((startDate.getTime() - endDate.getTime()))
        });
    }

    return state.set(fullName, newState);
}

function originReduce(state, {
    fullName,
    appDataId,
    type,
    reducers,
    payload
}) {
    try {
        const oldState = state.getIn([fullName, appDataId, 'data', type])
        const newState = reducers[type].apply(this, [oldState].concat(payload))
        const isEqual = is(oldState, newState)
        if (isEqual) {
            return state
        }
        return state.setIn([fullName, appDataId, 'data', type], newState)
    } catch (error) {
        throw new Error(`调用reduce('${type}', ...)错误。`, error)
    }
}

function updateState(state, { target, action }) {
    let appDataId
    const [fullName, reducer] = target.split('/')
    const appState = state.getIn([fullName])
    for (let key in appState.toJS()) {
        if (/^AppLoader_/.test(key)) {
            appDataId = key
        }
    }
    const appOldState = appState.getIn([appDataId, 'data', reducer])
    // const appNewState = state.getIn([fullName, '@@require', 'reducer', reducer])(appOldState, action)
    const appNewState = state.getIn([fullName, '@@require']).toJS().reducer[reducer](appOldState, action)
    if (is(appOldState, appNewState)) return state
    return state.setIn([fullName, appDataId, 'data', reducer], appNewState)
}