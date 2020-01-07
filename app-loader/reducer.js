import { Map } from 'immutable';
import wrapMapStateToProps from './wrapMapStateToProps';
import wrapMapDispatchToProps from './wrapMapDispatchToProps';
import createReduxConnector from './createReduxConnector';

export default function (state = Map(), {
    type,
    payload
}) {
    switch (type) {
        case "@@addAppContainor":
            return clearDataChangeKeys(addAppContainor(state, payload));
        case "@@loadAppReal":
            return clearDataChangeKeys(loadApp(state, payload));
        case "@@reduce":
            return reduce(state, payload);
        case "@@clearAppState":
            return clearDataChangeKeys(clearAppState(state, payload));
        default:
            return state;
    }
}

/**
 * 清除刷新用的DataChangeKeys
 * 1、AppLoader加载卸载时清除
 * 2、清除App实例的reducer中setFiled、setFields临时保存的数据
 */
function clearDataChangeKeys(state) {
    return state.delete('DataChange');
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
    // if (appInfo.name != 'ttk-edf-app-root' && appInfo.name != null) {
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

    state = addAppContainor(state, {fullName, appInfo, component, action, reducer, appDataId});

    if (prevFullName && prevFullName != fullName) {
        state = clearAppState(state, { fullName: prevFullName, appDataId });
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

    let dataChangeKeys = newState.get('DataChange') || [],
        appDataId = reducer.appDataId;

    newState = clearDataChangeKeys(newState); // 清除App实例临时保存的DataChange
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
    let returnState = state.set(fullName, newState);
    returnState = returnState.set('DataChange', { appDataId, dataChangeKeys });
    return returnState;
}
