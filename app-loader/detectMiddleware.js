/**
 * 页面app、js、css探测中间件，在app-loader/start.js中createStore加入redux中间件中
 */
import parseName from './parseName';
import AppFactory from './appFactory';
const appFactory = AppFactory.getInstance();

const DETECT_HEAD = 'p';

/**
 * 获取探测结果，包括原appInfo、loadDetectJs函数、loadDetectCss函数
 * @param {*} appName 探测前appName
 */
function getDetectApp(appName) {
    const appList = detectArray(appName);
    const detectApp = {};
    for (let i = 0; i < appList.length; i++) {
        let app = appFactory.getApp(appList[i], false);
        if (app) {
            if (!detectApp.appInfo && app.load) {
                detectApp.appInfo = app;
            }
            if (!detectApp.loadDetectCss && app.loadDetectCss) {
                detectApp.loadDetectCss = app.loadDetectCss;
            }
            if (!detectApp.loadDetectJs && app.loadDetectJs) {
                detectApp.loadDetectJs = app.loadDetectJs;
            }
            if (detectApp.appInfo && detectApp.loadDetectCss && detectApp.loadDetectJs) {
                return detectApp;
            }
        }
    }
    return detectApp;
}

/**
 * 需要探测的app列表
 * @param {*} appName 探测前appName
 */
function detectArray(appName) {
    if (!appName) {
        return [];
    }
    const appNameSplit = appName.split('-');
    // appName非detect开头的不探测
    if (!appNameSplit.length || DETECT_HEAD !== appNameSplit[0]) {
        return [appName];
    }
    appNameSplit.shift();
    // 解析报表类型编码、业务编码、流程编码、区域编码、渠道编码
    const { typeCode, bussinessCode, processCode, regionCode, channelCode } = parseAppName(appNameSplit)
    const defaultHead = 'd';
    const array = [];
    if (channelCode) {
        array.push(`${DETECT_HEAD}-${channelCode}-${bussinessCode}-${processCode}`);
        array.push(`${DETECT_HEAD}-${channelCode}-${defaultHead}-${processCode}`);
    } 
    if (regionCode) {
        array.push(`${DETECT_HEAD}-${regionCode}-${bussinessCode}-${processCode}`);
        array.push(`${DETECT_HEAD}-${regionCode}-${defaultHead}-${processCode}`);
    }
    array.push(`${DETECT_HEAD}-${typeCode}-${bussinessCode}-${processCode}`);
    array.push(`${DETECT_HEAD}-${typeCode}-${defaultHead}-${processCode}`);
    array.push(`${DETECT_HEAD}-${defaultHead}-${processCode}`);
    return array;
}

const getSearchObj = (url = window.location.href) => {
    const urlArr = url.split('?');
    if (urlArr.length === 1) return {};
    const search = urlArr.pop();
    const objs = search.split('&');
    const obj = {};

    objs.forEach((value) => {
        const [k, v] = value.split('=');
        if (v) {
            obj[k] = v;
        }
    });
    console.log(obj);
    return obj;
}

/**
 * 解析报表类型编码、业务编码、流程编码、区域编码、渠道编码
 * @param {*} array 
 */
function parseAppName(array) {
    const params = getSearchObj();
    let { ywlx,  dqdm,  qddm } = params;
    let bussinessCode = array[0], processCode = array[1];
    return { typeCode: ywlx, bussinessCode, processCode, regionCode: dqdm, channelCode: qddm };
}



export default (actionInjections, reducerInjections) => (store) => {
    return next => action => {
        const {
            getState,
            dispatch
        } = store;

        if (action.type && action.type == '@@loadApp' && action.payload.fullName.indexOf(`${DETECT_HEAD}-`) === 0) {
            try {
                const fullName = action.payload.fullName,
                    prevFullName = action.payload.prevFullName,
                    appDataId = action.payload.appDataId,
                    parsedName = parseName(fullName);

                let appRequire = getState().getIn([fullName, '@@require']);
                if (appRequire) {
                    return next({
                        type: '@@addAppContainor',
                        payload: {
                            fullName,
                            appDataId,
                            ...appRequire.toJS()
                        }
                    });
                }

                // 探测App页面和资源，获取appInfo、loadDetectJs函数、loadDetectCss函数
                let detectApp = getDetectApp(parsedName.name); 
                let appInfo = detectApp.appInfo;
                if (appInfo && appInfo.load) {
                    appInfo.load(async (component, action, reducer, meta, config) => {
                        if (!appInfo.meta && meta) {
                            appInfo.meta = meta.getMeta();
                        }
                        if (!appInfo.config && config) {
                            appInfo.config = config;
                        }
                        // 加载探测js文件
                        let detectJs, detectAction, detectReducer;
                        if (detectApp.loadDetectJs) {
                            detectJs = await detectApp.loadDetectJs();
                            detectAction = (o) => action(Object.assign(o, {detectJs}));
                            detectReducer = (o) => reducer(Object.assign(o, {detectJs}));
                        }
                        return next({
                            type: '@@loadAppReal',
                            payload: {
                                fullName,
                                appInfo,
                                component,
                                action: detectAction || action,
                                reducer: detectReducer || reducer,
                                prevFullName,
                                detectJs,
                                appDataId
                            }
                        });
                    })
                    // 加载探测css
                    if (detectApp.loadDetectCss) {
                        detectApp.loadDetectCss();
                    }
                } else {
                    return next(action);
                }
            }
            catch (e) {
                console.error(e);
                return next(action);
            }
        } else {
            return next(action);
        }
    }
}