import React, { PureComponent } from 'react'
import { getApps } from 'edf-app-loader'
import componentFactory from '../componentFactory'
import utils from 'edf-utils'
import { connect } from 'react-redux';
import config from '../config';
import regExpStr from './regExpStr';

class componentClass extends PureComponent {
    constructor(props) {
        super(props);
        let keysManager = props.parentProps.getDataChangeKeysManager();
        keysManager.registerConnectComponent(props.connectComponentId);
    }
    componentWillUnmount() {
        const { parentProps, connectComponentId } = this.props;
        if (parentProps && parentProps.getDataChangeKeysManager && connectComponentId) {
            parentProps.getDataChangeKeysManager().unregisterConnectComponent(connectComponentId)
        }
    }
    render() {
        const { renderProps, parentProps, data, ownerProps, dataChangeKeys } = this.props;
        let newProps = toProps(renderProps, parentProps, data, ownerProps.rowIndexStr || parentProps.rowIndexStr, dataChangeKeys, ownerProps);
        if (!newProps.powerComponent) {
            newProps = copyUndefinedProps(newProps, ownerProps);
            newProps = getPropsWithParent(newProps, parentProps);
        }
        let { powerComponent, ...rest } = newProps;
        if (powerComponent) {
            return powerComponent;
        }
        return createElement(rest);
    }
}

/**
 * 从源对象复制值（目标对象未定义的）到目标对象，
 * @param {*} target 目标对象
 * @param {*} source 源对象
 * @param {*} keys 要复制的key数组
 */
function copyUndefinedProps(target, source, keys) {
    if (!target || !source) {
        return target;
    }
    (keys || Object.keys(source)).forEach(key => {
        if (source[key] && !target[key]) target[key] = source[key];
    })
    return target;
}

function getPropsWithParent(componentProps, parentProps) {

    let newProps = componentProps;
    // 兼容旧path
    if (newProps.path && newProps.rowIndexStr) {
        newProps.path = `${newProps.path},${newProps.rowIndexStr}`;
    }
    // 指定唯一的key，避免数组key值相同或无key
    if (!newProps.key && (newProps.path || newProps.metaIndex)) {
        newProps.key = `${newProps.path}-${newProps.metaIndex || newProps.index}`;
    }
    // 删除渲染过程使用的属性
    delete newProps.renderWithParent;
    delete newProps.noConnectProp;
    delete newProps['_noConnectProp'];
    delete newProps.metaIndex;
    delete newProps['_power'];

    if (newProps.component === 'AppLoader') {
        // AppLoader继承的属性
        newProps = copyUndefinedProps(newProps, parentProps, [
            'gf',
            'sf',
            'store',
            'toast',
            'onEvent',
            'onFieldChange',
            'onShortcutKey',
            'setPortalContent',
            'rowIndexStr',
            'appName',
            'appFullName',
            'appDataId',
            'getParsedMeta',
            'getDataChangeKeysManager',
        ]);
        //删除一些组件不需要的属性
        delete newProps.clearAppState
        delete newProps.getDirectFuns
        delete newProps.initView
        delete newProps.payload
        delete newProps.componentWillMount
        delete newProps.componentDidMount
        delete newProps.shouldComponentUpdate
        delete newProps.componentWillReceiveProps
        delete newProps.componentWillUpdate
        delete newProps.componentDidCatch
        delete newProps.componentWillUnmount
        delete newProps.componentDidUpdate
        delete newProps.unmount
        delete newProps.rowIndexStr

        newProps.key = newProps.appName
        newProps.name = newProps.appName
    } else if (newProps.component.startsWith('::')) {
        // 前缀为::的为dom element
        delete newProps.rowIndexStr;
        delete newProps.store;
        delete newProps.path;
    } else if (newProps.component === 'QuanAndForeCurrency' || newProps.component === 'SubjectDisplay') {
        // ttk组件中部分需要gf、sf等函数
        // todo: 组件本不应该使用gf、sf直接操作数据，
        newProps = copyUndefinedProps(newProps, parentProps, [
            'gf',
            'sf',
        ]);
    }

    // 以下属性为常见业务属性类型有误的情况，development模式下react警告
    if (newProps.className === false) {
        delete newProps.className;
    }
    if (typeof newProps.onMouseLeave !== 'function') {
        delete newProps.onMouseLeave;
    }
    if (typeof newProps.onMouseOver !== 'function') {
        delete newProps.onMouseOver;
    }
    return newProps;
}

function execProp(value, data, path, rowIndexStr, dataChangeKeys) {
    let newValue;
    if (value.renderType === 'ALL') {
        newValue = value.exec(value, data, path, rowIndexStr);
    } else if (value.renderType === 'SOME') {
        if (value.last && !value.hasIndexReg && dataChangeKeys && !hitKeys(dataChangeKeys, value.dataKeys)) {
            newValue = value.last;
        } else {
            newValue = value.last = value.exec(value, data, path, rowIndexStr);
        }
    } else if (value.hasOwnProperty('last') && !value.hasIndexReg) {
        newValue = value.last;
    } else {
        newValue = value.last = value.exec(value, data, path, rowIndexStr);
    }
    return newValue;
}

function execComponentProps(originProps, data, rowIndexStr, parentProps, getParsedMeta, dataChangeKeys) {
    if (!originProps) {
        return originProps;
    }
    let newProps = {};
    let tempProp;
    for (let [key, value] of Object.entries(originProps)) {
        if (value && value.renderType) {
            tempProp = execProp(value, data, originProps.path, rowIndexStr, dataChangeKeys);
            if (tempProp && tempProp['_isMeta'] === true) {
                tempProp = value.last = setDynamicMeta(tempProp, originProps, data, getParsedMeta);
            }
            newProps[key] = tempProp;
        } else {
            newProps[key] = metaToComponent(value, { ...parentProps, rowIndexStr }, data);
        }

    }
    newProps = setSpecialProps(newProps);
    return newProps;
}

// 处理_power属性，返回多个element
function execPowerProps(originProps, data, rowIndexStr = '', parentProps, ownerProps) {
    const powerString = originProps['_power'];
    const newProps = {};

    if (powerString && regExpStr.powerForIn.test(powerString)) {
        let p = powerString
            .replace(regExpStr.powerForIn, '')
            .replace(' ', '');
        if (p.indexOf('_rowIndex') != -1) {
            let rowIndexArray = rowIndexStr && rowIndexStr.split(',');
            p = p.replace('_rowIndex', rowIndexArray.length && rowIndexArray[0] || 0);
        }
        p = p.split('.').slice(1);
        let items = data;
        p.forEach(key => {
            items = items[key];
        });
        if (!items || items.length === 0) {
            newProps.powerComponent = [];
            return newProps;
        }

        newProps.powerComponent = items.map((o, index) => {
            const newRowIndexStr = rowIndexStr ? `${rowIndexStr},${index}` : `${index}`;
            let { children, ...renderProps } = originProps;
            let powerProps = execComponentProps(renderProps, data, newRowIndexStr, parentProps, parentProps.getParsedMeta)
            powerProps.rowIndexStr = newRowIndexStr;
            powerProps = copyUndefinedProps(powerProps, ownerProps);
            if (children) {
                if (children && children.renderType) {
                    children = execProp(children, data, children.path, newRowIndexStr);
                }
                powerProps.children = metaToComponent(children, { ...parentProps, rowIndexStr: newRowIndexStr }, data);
            }
            return createElement(getPropsWithParent(powerProps, parentProps));
        })
    }

    // 处理_power属性，返回单个element
    if (powerString && powerString.indexOf('=>') != -1) {
        newProps.powerComponent = (...args) => {
            let varsString = ''
            let trimPowerString = utils.string.trim(powerString)
            if (trimPowerString == '({rowIndex})=>rowIndex' || trimPowerString == '({rowIndex}) => rowIndex') {
                varsString = (new Function('return (function(_ref) {var rowIndex = _ref.rowIndex;return rowIndex})'))()(...args)
            }
            else {
                varsString = (new Function('return ' + trimPowerString))()(...args)
            }
            const newRowIndexStr = rowIndexStr ? `${rowIndexStr},${varsString}` : `${varsString}`;
            let { children, ...renderProps } = originProps;
            let powerProps = execComponentProps(renderProps, data, newRowIndexStr, parentProps, parentProps.getParsedMeta)
            powerProps.rowIndexStr = newRowIndexStr;
            powerProps = copyUndefinedProps(powerProps, ownerProps);
            if (children) {
                if (children && children.renderType) {
                    children = execProp(children, data, children.path, newRowIndexStr);
                }
                powerProps.children = metaToComponent(children, { ...parentProps, rowIndexStr: newRowIndexStr }, data);
            }
            return createElement(getPropsWithParent(powerProps, parentProps));
        }
    }
    return newProps;
}

function toProps(props, parentProps, data, rowIndexStr, dataChangeKeys, ownerProps) {
    let newProps;
    if (!props['_power']) {
        newProps = execComponentProps(props, data, rowIndexStr || parentProps.rowIndexStr, parentProps, parentProps.getParsedMeta, dataChangeKeys);
        if (newProps.renderWithParent) {
            newProps[newProps.noConnectProp] = metaToComponent(newProps[newProps.noConnectProp], parentProps, data);
        }
    } else {
        newProps = execPowerProps(props, data, rowIndexStr || parentProps.rowIndexStr, parentProps, ownerProps);
    }
    return newProps;
}

function hitKeys(dataChangeKeys, metaBindKeys) {
    return dataChangeKeys.some(changeKey => metaBindKeys.some(bindKey => bindKey && bindKey.includes(changeKey)))
}

function getConnect(props, parentProps) {
    let { connectProps, metaRenderType, metaBindKeys, ...renderProps } = props;
    const { appFullName, appDataId, getDataChangeKeysManager } = parentProps;
    let keysManager = getDataChangeKeysManager();
    let connectComponentId = keysManager.generateId();
    const ConnectComponent = connect(
        (state, ownerProps) => {
            let dataChangeKeys = keysManager.getDataKeys(connectComponentId);
            if (connectProps && (!dataChangeKeys || !dataChangeKeys.length || !metaRenderType ||
                (metaRenderType === 'SOME' && !hitKeys(dataChangeKeys, metaBindKeys)))) {
                return connectProps;
            }
            const data = state.getIn([appFullName, appDataId, 'data']).toJS();
            connectProps = {
                data,
                renderProps,
                parentProps,
                ownerProps,
                dataChangeKeys,
                connectComponentId
            };
            return connectProps;
        },
        null,
        null,
        { pure: true }
    )(componentClass);
    return <ConnectComponent key={`${renderProps.path}-${renderProps.metaIndex}`} store={parentProps.store} />
}

// 特殊属性处理，包括"_excludeProps"、"..."等
function setSpecialProps(props) {
    const newProps = { ...props };
    // 去除meta的排除属性
    const excludeProps = props['_excludeProps'];
    if (excludeProps && excludeProps instanceof Array) {
        excludeProps.forEach(k => {
            if (newProps[k])
                delete newProps[k];
        });
    }
    // 处理特殊属性'...'
    const pointProps = props['...'];
    if (pointProps && typeof pointProps === 'object') {
        Object.keys(pointProps).forEach(kk => {
            newProps[kk] = pointProps[kk]
        });
        delete newProps['...'];
    }
    // 返回新属性对象
    return newProps;
}

/**
 * 处理动态meta值，如{_isMeta: true, value: { name: xxx, component: xxx }}
 * 把表达式转化为execObj，再执行metaToComponent
 */
function setDynamicMeta(value, props, data, getParsedMeta) {
    const parsedMeta = getParsedMeta && getParsedMeta(value.value) || value.value;
    if (parsedMeta instanceof Array) {
        return parsedMeta.map((meta, key) => metaToComponent(meta, { ...props, key }, data))
    }
    return metaToComponent(parsedMeta, props, data);
}

/**
 * 创建react element
 * @param {*} props 
 */
function createElement(props, userMemo) {
    const { component: componentName, _visible, notRender, /**_notRender,**/ appName, ...elementProps } = props;
    // 处理_visible等属性
    if (_visible === false || (typeof _visible === 'function' && (_visible)() === false) /**|| notRender === true || _notRender === true**/) {
        return null;
    }
    // appName无注册
    if (componentName === 'AppLoader') {
        if (!appName) {
            return null;
        }
        if ((props._notRender || props.notRender) && !getApps()[appName]) {
            if (appName.indexOf('?') != -1) {
                let noArgName = appName.split('?')[0]
                if (!getApps()[noArgName]) {
                    return null
                }
            } else {
                return null
            }
        }

    }

    let component = componentFactory.getComponent(appName, componentName)
    if (typeof component === 'function' && userMemo) {
        component = React.memo(component);
    }
    return React.createElement(component, elementProps);
}

/**
 * 判断meta是否绑定data，需要connect函数包裹在外层，实现刷新
 * @param {*} props 
 */
function getMetaBindKeys(props) {
    let metaBindKeys = [];
    if (!props) {
        return metaBindKeys;
    }
    if (props instanceof Array) {
        for (let prop of props) {
            if (!prop) {
                continue;
            }
            let result = getMetaBindKeys(prop);
            if (!result) {
                return null;
            }
            if (result.length) {
                metaBindKeys = metaBindKeys.concat(result);
            }
        }
    }
    if (typeof props === 'object' && !nativeOrNotParse(props)) {
        for (let [key, value] of Object.entries(props)) {
            if (value) {
                if (value.renderType === 'ALL') {
                    return null;
                } else if (value.renderType === 'SOME') {
                    metaBindKeys = metaBindKeys.concat(value.dataKeys);
                } else if (value.renderType === 'NONE') {
                    continue;
                } else if (key === 'children' && !value.renderWithParent) {
                    continue;
                } else if (key === '_power' && value) {
                    const ks = value.match(regExpStr.dataReg);
                    if (ks && ks.length) {
                        metaBindKeys.push(ks[0].substring(1));
                    }
                } else {
                    let result = getMetaBindKeys(value);
                    if (!result) {
                        return null;
                    }
                    if (result.length) {
                        metaBindKeys = metaBindKeys.concat(result);
                    }
                }
            }
        }
    }
    return metaBindKeys;
}

/**
 * meta转换为component，静态的（不随data更新而变化），不转换children meta
 * @param {*} props 
 * @param {*} parentProps 
 */
function metaToComponentStaticWithoutChildren(props, parentProps) {
    for (let [key, value] of Object.entries(props)) {
        if (value && value.renderType) {
            props[key] = value.exec(value, null, props.path, '');
        } else {
            props[key] = value;
        }
    }
    return createElement(getPropsWithParent(props, parentProps), true);
}

function getElement(props, parentProps, data) {
    let { powerComponent, ...rest } = props;
    if (powerComponent) {
        return powerComponent;
    }
    return createElement(getPropsWithParent(rest, parentProps));
}

/**
 * 有data，执行excecObj的函数，获取最新属性值，转为Component
 * @param {*} meta meta
 * @param {*} props 父props
 */
function metaToComponentWithData(meta, props, data) {
    // execObj，有data，执行excecObj的函数，获取最新属性值
    if (meta.renderType) {
        let newProp = execProp(meta, data, props.path, props.rowIndexStr)
        // 结果为meta，需先解析表达式，再转为component
        if (newProp && newProp['_isMeta'] === true) {
            newProp = setDynamicMeta(newProp, props, data, props.getParsedMeta);
        }
        return newProp;
    }

    const metaProps = toProps(meta, props, data);
    if (meta.component) {
        return getElement(metaProps, props, data)
    } else {
        return metaProps;
    }
}

/**
 * 无data，返回Connect Component
 * @param {*} meta meta
 * @param {*} props 父props
 */
function metaToComponentNoData(meta, props) {
    // execObj，无data直接返回
    if (meta.renderType) {
        return meta;
    }
    // 递归meta属性值，转为Connect Component     
    const metaProps = {};
    Object.keys(meta).forEach(key => {
        // 部分组件的父和子Component有相互依赖关系，子Component外不能包裹connect，因此不递归解析，待父Component渲染时一起渲染
        if (meta.renderWithParent && key === meta.noConnectProp) {
            metaProps[key] = meta[key];
        } else {
            metaProps[key] = metaToComponent(meta[key], props);
        }
    })
    if (metaProps.component) {
        // 获取组件所有属性绑定的data key，可能包含子组件的data key
        let metaBindKeys = getMetaBindKeys(metaProps);
        if (!metaBindKeys) {
            // 组件刷新类型：ALL:全刷新; SOME: 部分刷新，根据绑定data key刷新
            metaProps.metaRenderType = 'ALL';
            return getConnect(metaProps, props)
        } else if (metaBindKeys.length) {
            metaProps.metaRenderType = 'SOME';
            metaProps.metaBindKeys = metaBindKeys;
            return getConnect(metaProps, props)
        }
        if (metaProps.renderWithParent && metaProps.noConnectProp) {
            return getConnect(metaProps, props)
        }
        return metaToComponentStaticWithoutChildren(metaProps, props);
    } else {
        return metaProps;
    }
}

/**
 * meta转react Component。data不为空时，计算meta属性值，为空时，不计算
 * @param {*} meta json数据
 * @param {*} props 父props
 * @param {*} data 在redux的connect函数中，传data，monkeyKing中，不传
 */
function metaToComponent(meta, props, data) {
    // null/undefined
    if (!meta) {
        return meta;
    }
    // meta类型为array(object)
    if (meta instanceof Array) {
        return meta.map((item, index) => metaToComponent(item, props, data));
    }

    const metaType = typeof meta;
    if (metaType === 'object') {
        // react 组件 || moment || 不解析 || Date 时，直接返回
        if (nativeOrNotParse(meta)) {
            return meta;
        }

        if (meta['_visible'] === false) {
            return null;
        }
        return data ? metaToComponentWithData(meta, props, data) : metaToComponentNoData(meta, props);
    } else {
        // meta类型为Symbole/number/string/boolean/function(object)
        return meta;
    }
}

// react 组件 || moment || 不解析 || Date
function nativeOrNotParse(obj) {
    return obj['$$typeof'] || obj['_isAMomentObject'] || obj['_notParse'] || obj instanceof Date
}

/**
 * app渲染只执行一次该函数
 * @param {*} props 
 */
const MonkeyKing = (props) => {
    const { path, gm, gf } = props
    const data = gf().toJS()
    // metaToComponent不传data
    return metaToComponent(gm(path, undefined, data), props)
}

export default MonkeyKing
