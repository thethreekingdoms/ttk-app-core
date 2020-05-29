import React from 'react';
import { AppLoader } from 'edf-app-loader';
import * as common from '../common';
import utils from 'edf-utils';
import { fromJS } from 'immutable';
import contextManager from '../context';
import config from '../config';
import DataChangeKeysManager from './dataChangeKeysManager';
import regExpStr from './regExpStr';

const SHOW_EXEC_TIME = true;
const SHOW_EXEC_TIME_WARNING_MILLISECOND = 10;
const SHOW_EXEC_TIME_ERROR_MILLISECOND = 30;
const appInstances = {};

class action {
    constructor(option) {
        this.appInfo = option.appInfo;
        this.appDataId = option.appDataId;
        this.meta = fromJS(option.appInfo.meta);
        this.cache = {};
        common.setMeta(option.appInfo);
        this.dataChangeKeysManager = new DataChangeKeysManager();
    }

    config = ({ metaHandlers }) => {
        this.metaHandlers = metaHandlers;
        this.metaHandlersParams = [];
        Object.keys(this.metaHandlers).forEach(k => {
            this.metaHandlersParams.push(this.metaHandlers[k])
        });
    };

    initView = (component, injections) => {
        this.component = component;
        this.injections = injections;

        appInstances[component.props.appFullName] = {
            appName: component.props.appName,
            appQuery: component.props.appQuery,
            //app: config.getApps()[component.props.appName],
            instance: component
        };
        this.injections.reduce('setDataChangeKeysManager', this.dataChangeKeysManager);
        this.metaHandlers && this.metaHandlers['onInit'] && this.metaHandlers['onInit']({ component, injections });
    };

    unmount = () => {
        delete appInstances[this.component.props.appFullName]
    };

    componentWillMount = () => {
        this.metaHandlers
            && this.metaHandlers['componentWillMount']
            && this.metaHandlers['componentWillMount'] != this.componentWillMount
            && this.metaHandlers['componentWillMount']();
    };

    componentDidMount = () => {
        this.metaHandlers
            && this.metaHandlers['componentDidMount']
            && this.metaHandlers['componentDidMount'] != this.componentDidMount
            && this.metaHandlers['componentDidMount']();
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        this.metaHandlers
            && this.metaHandlers['shouldComponentUpdate']
            && this.metaHandlers['shouldComponentUpdate'] != this.shouldComponentUpdate
            && this.metaHandlers['shouldComponentUpdate'](nextProps, nextState);
    };

    componentWillReceiveProps = (nextProps) => {
        this.metaHandlers
            && this.metaHandlers['componentWillReceiveProps']
            && this.metaHandlers['componentWillReceiveProps'] != this.componentWillReceiveProps
            && this.metaHandlers['componentWillReceiveProps'](nextProps);
    };

    componentWillUpdate = (nextProps, nextState) => {
        this.metaHandlers
            && this.metaHandlers['componentWillUpdate']
            && this.metaHandlers['componentWillUpdate'] != this.componentWillUpdate
            && this.metaHandlers['componentWillUpdate'](nextProps, nextState);
    };

    componentDidCatch = (error, info) => {
        this.metaHandlers
            && this.metaHandlers['componentDidCatch']
            && this.metaHandlers['componentDidCatch'] != this.componentDidCatch
            && this.metaHandlers['componentDidCatch'](error, info);
    };

    componentWillUnmount = () => {
        this.metaHandlers
            && this.metaHandlers['componentWillUnmount']
            && this.metaHandlers['componentWillUnmount'] != this.componentWillUnmount
            && this.metaHandlers['componentWillUnmount']();
    };

    componentDidUpdate = () => {
        this.metaHandlers
            && this.metaHandlers['componentDidUpdate']
            && this.metaHandlers['componentDidUpdate'] != this.componentDidUpdate
            && this.metaHandlers['componentDidUpdate']();
    };

    getAppInstances = () => {
        return appInstances
    };


    getField = (fieldPath) => {
        return common.getField(this.injections.getState(), fieldPath, this.appDataId);
    };

    getFields = (fieldPaths) => {
        return common.getFields(this.injections.getState(), fieldPaths, this.appDataId);
    };

    setField = (fieldPath, value) => {
        return this.injections.reduce('setField', fieldPath, value, this.appDataId);
    };

    setFields = (values) => {
        return this.injections.reduce('setFields', values, this.appDataId);
    };

    setChildMeta = (appInfo, fullpath, propertys, val) => {
        common.setChildMeta(appInfo, fullpath, propertys, val);
    };

    parseExpreesion = (v, ctrlPath) => {
        if (!this.cache.expression) {
            this.cache.expression = {};
        }
        if (this.cache.expression[v]) {
            return {
                ...this.cache.expression[v],
                ctrlPath
            };
        }

        if (!this.cache.expressionParams) {
            this.cache.expressionParams = ['data']
                .concat(Object.keys(this.metaHandlers).map(k => "$" + k))
                .concat(['_path', '_rowIndex', '_vars', '_ctrlPath', '_lastIndex']);
        }

        const params = this.cache.expressionParams;
        const body = utils.expression.getExpressionBody(v);
        const execBody = body.replace('$$', '$');
        let renderType = 'ALL'; // 刷新类型：NONE:不刷新; ALL:全刷新; SOME:部分刷新
        let keys = [];

        this.cache.expression[v] = {
            originalStr: v,
            execFunction: new Function(...params, execBody), // 被执行函数
            exec: this.exec, // 统一的执行函数
            ctrlPath,
            renderType, // 刷新类型：NONE:不刷新; ALL:全刷新; SOME:部分刷新，根据绑定data key刷新
            dataKeys: [], // 绑定的data key
            hasIndexReg: regExpStr.hasIndexReg.test(body)
        }

        // 匹配立刻执行函数$name()或$$name(xxxx)，获取$name或$$name
        let funcs = body.match(regExpStr.exeFuncReg);
        // 表达式含立刻执行函数$xxxxx(), 排除立即执行函数在function(){}函数体中的情况
        if (funcs && funcs.length && !regExpStr.functionReg.test(body)) {
            // 部分浏览器不支持正则后瞻，因此匹配捕获$，再删掉$
            funcs = funcs.map(func => func.substring(1));
            // 在app的config.js文件配置需要全刷新的方法名，key为'forceRenderFuncs'，value为数组
            if (funcs.some(func => func.includes('$')) || this.metaHandlers.config.forceRenderFuncs && this.metaHandlers.config.forceRenderFuncs.some(f => funcs.includes(f))) {
                this.cache.expression[v].renderType = 'ALL';
                return this.cache.expression[v];
            }
            // 对立刻执行函数的函数体使用正则匹配data.xxxx.xxxxx
            funcs.forEach(name => {
                let func = this.metaHandlers[name];
                if (func && func.toString) {
                    let matchKeys = func.toString().match(regExpStr.funcBodyDataReg) || [];
                    matchKeys = matchKeys.map(k => {
                        return k.replace(regExpStr.funcBodyDataPrefixReg, '');
                    });
                    keys = keys.concat(matchKeys);
                }
            });
        }

        keys = keys.concat((body.match(regExpStr.dataReg) || []).map(func => func.substring(1)));
        if (keys.length) {
            this.cache.expression[v].renderType = 'SOME';
            this.cache.expression[v].dataKeys = keys;
        } else {
            this.cache.expression[v].renderType = 'NONE';
        }

        return this.cache.expression[v];
    }

    /**
     *  {{}}表达式转化为待执行的对象，包含以下属性
     *  execFunction: new Function(...params, body), // 被执行函数
     *  exec: this.exec, // 统一的执行函数
     *  renderType, // 刷新类型：NONE:不刷新; ALL:全刷新; SOME:部分刷新，根据绑定data key刷新
     *  dataKeys: [], // 绑定的data key
     *  hasIndexReg: /_rowIndex|_lastIndex/.test(body) // 是否有_power属性产生的索引
     */
    getExecObj = (expressContent, ctrlPath) => {
        let browserType = /(msie\s|trident.*rv:)([\w.]+)/.test(navigator.userAgent.toLowerCase());
        if (browserType) {
            if (expressContent && expressContent.indexOf('=>') > -1) {
                if (window.Babel) {
                    expressContent = window.Babel.transform(expressContent, { presets: ['es2015'] }).code;
                    expressContent = expressContent.replace(`"use strict";`, "");
                    expressContent = expressContent.replace(/\n/gi, '');
                    expressContent = expressContent.replace(/\{\s+\{/gi, '{{');
                    expressContent = expressContent.replace(/\}\s+\}/gi, '}}');
                }
            }
        }
        return this.parseExpreesion(expressContent, ctrlPath);
    }

    // 统一的执行函数
    exec = (value, data, fullPath = '', rowIndexStr) => {
        const { originalStr, execFunction, ctrlPath } = value;
        try {
            const parsedPath = utils.path.parsePath(rowIndexStr ? `${fullPath},${rowIndexStr}` : fullPath),
                path = parsedPath.path,
                rowIndex = parsedPath.rowIndex,
                vars = parsedPath.vars;
            let params = [data].concat(this.metaHandlersParams).concat([
                path,
                rowIndex,
                vars,
                rowIndexStr ? `${ctrlPath},${rowIndexStr}` : ctrlPath,
                vars && vars[vars.length - 1]
            ]);
            let startTimeMark;
            if (SHOW_EXEC_TIME) {
                startTimeMark = new Date().valueOf();
            }
            const result = execFunction.apply(this, params);
            this.showExecTime(startTimeMark, originalStr);
            return result;
        }
        catch (e) {
            this.metaHandlers
                && this.metaHandlers['componentDidCatch']
                && this.metaHandlers['componentDidCatch'] != this.componentDidCatch
                && this.metaHandlers['componentDidCatch'](e);
            console.error(`error:${originalStr}`);
            utils.exception.error(e);
        }
    }

    showExecTime(startTimeMark, methodName) {
        if (SHOW_EXEC_TIME) {
            const time = new Date().valueOf() - startTimeMark;
            if (time >= SHOW_EXEC_TIME_ERROR_MILLISECOND) {
                console.error(`[MetaEngine] '${methodName}' handler took ${time}ms. App name: ${this.appInfo.name}. App description: ${this.appInfo.description}`);
                return;
            }
            if (time >= SHOW_EXEC_TIME_WARNING_MILLISECOND) {
                console.warn(`[MetaEngine] '${methodName}' handler took ${time}ms. App name: ${this.appInfo.name}. App description: ${this.appInfo.description}`);
            }
        }
    };

    needUpdate = (meta) => {
        if (!meta)
            return false;

        const t = typeof meta;

        if (t == 'string' && utils.expression.isExpression(meta))
            return true;

        if (t != 'object')
            return false;

        if (meta["renderType"]) {
            return false;
        }

        if (meta["_notParse"] === true) {
            return false;
        }

        return !(t != 'object'
            || !!meta['$$typeof']
            || !!meta['_isAMomentObject']);
    };

    getParsedMeta = (meta, path = '', ctrlPath) => {
        let currentPath = path;
        if (!this.needUpdate(meta))
            return meta;

        if (meta["_visible"] === false)
            return null;

        if (meta instanceof Array) {
            for (let i = 0; i < meta.length; i++) {
                let sub = meta[i];
                if (!sub)
                    continue;

                if (sub instanceof Array) {
                    currentPath = `${path}.${i}`;
                    meta[i] = this.getParsedMeta(sub, currentPath, ctrlPath);
                    continue;
                }
                if (sub.name && sub.component) {
                    currentPath = `${path}.${sub.name}`;
                    sub.path = currentPath;
                    sub.metaIndex = i;
                    meta[i] = this.getParsedMeta(sub, currentPath, currentPath);
                    continue;
                } else if (typeof sub === 'object') {
                    currentPath = `${path}.${i}`;
                    sub.path = currentPath;
                    sub.metaIndex = i;
                    meta[i] = this.getParsedMeta(sub, currentPath, ctrlPath);
                    continue;
                }
            }
            return meta;
        }

        const keys = Object.keys(meta);
        let hasIndexReg = false;
        for (let key of keys) {
            let v = meta[key],
                t = typeof v;

            if (!v || key === '_power')
                continue;

            if (v instanceof Array) {
                currentPath = `${path}.${key}`;
                meta[key] = this.getParsedMeta(v, currentPath, ctrlPath);
                continue;
            }

            if (t === 'object') {
                if (v.name && v.component) {
                    currentPath = `${path}.${key}.${v.name}`;
                    v.path = currentPath;
                    meta[key] = this.getParsedMeta(v, currentPath, currentPath);
                } else {
                    currentPath = `${path}.${key}`;
                    v.path = currentPath;
                    meta[key] = this.getParsedMeta(v, currentPath, ctrlPath);
                }
                continue;
            }

            if (t == 'string' && utils.expression.isExpression(v)) {
                meta[key] = this.getExecObj(v, ctrlPath);
                if (meta[key].hasIndexReg) {
                    hasIndexReg = true;
                }
            }
        }
        // 包含_power, _noConnect的，不包裹connect
        if (meta['_power'] || hasIndexReg || meta['_noConnectProp']) {
            meta.renderWithParent = true;
            meta.noConnectProp = meta['_noConnectProp'] || 'children';
        }
        // 配置的组件，其children或其他props中的组件，需要和父组件一起转为component，不包裹connect
        const noConnectProp = config.getNoConnectProp(meta.component);
        if (noConnectProp) {
            meta.renderWithParent = true;
            meta.noConnectProp = noConnectProp;
        }
        return meta;
    }

    getMeta = (fullPath, propertys) => {
        const meta = common.getMeta(this.appInfo, fullPath, propertys);
        meta['_power'] = undefined;
        meta.path = fullPath;
        return this.getParsedMeta(meta, fullPath);
    }

    setMetaForce = (appName, meta) => {
        common.setMetaForce(appName, meta);
    }

    focus = (path) => {
        if (this.isFocus(path)) return false;
        this.setField('data.other.focusFieldPath', path);
        return true;
    }

    focusByEvent = (e) => {
        const path = utils.path.findPathByEvent(e);
        return this.focus(path);
    }

    isGridReadOnly = (path) => {
        if (!path) return false;
        let gridReadOnly = this.getField(path);

        //this.getField('data.other.isGridReadOnly');
        if (!gridReadOnly) gridReadOnly = false;

        return gridReadOnly;
    }

    isReadOnly = (path) => {
        if (!path) return false;
        if (path.indexOf('.cell.cell') != -1) {
            path = path.split('.cell.cell,')[0];
        }
        let _isReadOnly = this.getField(path + '.isReadOnly');
        if (!_isReadOnly) _isReadOnly = false;

        return _isReadOnly;
    };

    isFocus = (path) => {
        if (!path) return false;
        const focusFieldPath = this.getField('data.other.focusFieldPath');
        if (!focusFieldPath) return false;
        return path.replace(/\s/g, '') == focusFieldPath.replace(/\s/g, '');
    };

    getDirectFuns = () => {
        return {
            getMeta: (...args) => {
                return this.getMeta(...args);
            },
            getField: (fieldPath) => {
                return this.getField(fieldPath);
            },
            gm: (...args) => {
                return this.getMeta(...args);
            },
            gf: (fieldPath) => {
                return this.getField(fieldPath);
            },
            getParsedMeta: this.getParsedMeta,
            getDataChangeKeysManager: () => {
                return this.dataChangeKeysManager;
            }
        };
    };

    toast = (...args) => {
        const Toast = config.getToast();
        if (Toast) {
            Toast.destroy();
        }
        if (!Toast || args.length == 0 || !Toast[args[0]]) return;
        if (Toast) {
            Toast[args[0]](...args.slice(1));
        }
    };

    alert = (...args) => {
        const Alert = config.getAlert();
        if (!Alert || args.length == 0 || !Alert[args[0]]) return;
        Alert[args[0]](...args.slice(1));
    };



    notification = (...args) => {
        const Notification = config.getNotification();
        if (!Notification || args.length == 0 || !Notification[args[0]]) return;
        Notification[args[0]](...args.slice(1));
    };

    popconfirm = (...args) => {
        const PopConfirm = config.getPopconfirm();
        if (!PopConfirm || args.length == 0 || !PopConfirm[args[0]]) return;
        return PopConfirm[args[0]](...args.slice(1));
    };

    modal = (...args) => {
        const Modal = config.getModal();
        if (!Modal || args.length == 0 || !Modal[args[0]]) return;
        return Modal[args[0]](...args.slice(1));
    };

    loadApp = (name, props) => {
        return <AppLoader {...props} name={name} />
    };

    gm = this.getMeta;

    sm = this.setMeta;

    gf = this.getField;

    gfs = this.getFields;

    sf = this.setField;

    sfs = this.setFields;

    findPathByEvent = utils.path.findPathByEvent;

    stringToMoment = utils.moment.stringToMoment;

    momentToString = utils.moment.momentToString;

    addThousPos = utils.number.addThousPos;

    fromJS = fromJS;

    context = contextManager;
}

export default function creator(option) {
    return new action(option);
}
