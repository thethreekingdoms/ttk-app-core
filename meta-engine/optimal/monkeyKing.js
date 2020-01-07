// import React from 'react'
// import { getApps } from 'edf-app-loader'
// import componentFactory from '../componentFactory'
// import utils from 'edf-utils'
// import { connect } from 'react-redux';
// import config from '../config';

// function getField(state, appFullName, appDataId, fieldPath) {
//     if (!fieldPath) {
//         return state.getIn([appFullName, appDataId, 'data']);
//     }

//     if (fieldPath instanceof Array) {
//         return state.getIn([appFullName, appDataId].concat(fieldPath));
//     } else {
//         return state.getIn([appFullName, appDataId].concat(fieldPath.split('.')));
//     }
// }

// function gf(dataMap, fieldPath) {
//     if (!fieldPath) {
//         return dataMap;
//     }
//     let keys = fieldPath instanceof Array ? fieldPath : fieldPath.split('.');
//     keys.splice(0, 1);
//     return dataMap.getIn(keys);
// }

// const componentClass = (props) => {
//     let { powerComponent, ...rest } = props;
//     if (powerComponent) {
//         return powerComponent;
//     }
//     return createElement(rest);
// };

// /**
//  * 从源对象复制值（目标对象未定义的）到目标对象，
//  * @param {*} target 目标对象
//  * @param {*} source 源对象
//  * @param {*} keys 要复制的key数组
//  */
// function copyUndefinedProps (target, source, keys) {
//     if (!target || !source) {
//         return target;
//     }
//     (keys || Object.keys(source)).forEach(key => {
//         if (source[key] && !target[key]) target[key] = source[key];
//     })
//     return target;
// }

// function getPropsWithParent(componentProps, parentProps) {
    
//     let newProps = componentProps;
//     if (newProps.useAllProps && newProps.component != 'AppLoader') {
//         newProps = copyUndefinedProps(newProps, parentProps);
//     } else {
//         newProps =copyUndefinedProps(newProps, parentProps, [
//             'gf',
//             'sf',
//             // 'store',
//             'toast',
//             'onEvent',
//             'onFieldChange',
//             'onShortcutKey',
//             'setPortalContent',
//             'rowIndexs',
//             'appName',
//             'appFullName',
//             'appDataId',
//             'getParsedMeta',
//         ]);
//     }
//     // delete newProps.name
    

//     if (newProps.component === 'AppLoader') {
        
//         newProps = copyUndefinedProps(newProps, parentProps);
//         //删除一些组件不需要的属性
//         delete newProps.clearAppState
//         delete newProps.getDirectFuns
//         delete newProps.initView
//         delete newProps.payload
//         delete newProps.componentWillMount
//         delete newProps.componentDidMount
//         delete newProps.shouldComponentUpdate
//         delete newProps.componentWillReceiveProps
//         delete newProps.componentWillUpdate
//         delete newProps.componentDidCatch
//         delete newProps.componentWillUnmount
//         delete newProps.componentDidUpdate
//         delete newProps.unmount
        

//         // if (!newProps.appName)
//         //     return null

//         // if (newProps._notRender === true && !getApps()[newProps.appName]) {
//         //     if (newProps.appName.indexOf('?') != -1) {
//         //         let noArgName = newProps.appName.split('?')[0]
//         //         if (!getApps()[noArgName]) {
//         //             return null
//         //         }
//         //     } else {
//         //         return null
//         //     }
//         // }
//         newProps.key = newProps.appName
//         newProps.name = newProps.appName
//     }
//     return newProps;
// }

// function execProp(value, data, rowIndexs = [], dataChange) {
//     if (value && value.renderType) {
//         let newValue;
//         if (value.renderType === 'ALL') {
//             newValue = value.exec(value.execFunction, data, rowIndexs);
//         } else if (value.renderType === 'SOME') {
//             if (value.last && dataChange && !hitKeys(dataChange.dataChangeKeys, value.dataKeys)) {
//                 newValue = value.last;
//             } else {
//                 newValue = value.last = value.exec(value.execFunction, data, rowIndexs);
//             }
//         } else if (value.hasOwnProperty('last')) {
//             newValue = value.last;
//         } else {
//             newValue = value.last = value.exec(value.execFunction, data, rowIndexs);
//         }
//         return newValue;
//     } else {
//         return value;
//     }
// }

// function execComponentProps(originProps, dataMap, rowIndexs = [], getParsedMeta, dataChange) {
//     if (!originProps) {
//         return originProps;
//     }
//     const newProps = {};
//     const data = dataMap && dataMap.toJS() || {};

//     for (let [key, value] of Object.entries(originProps)) {
//         newProps[key] = execProp(value, data, rowIndexs, dataChange);
//         if (newProps[key] && newProps[key]['_isMeta'] === true) {
//             newProps[key] = value.last = setDynamicMeta(newProps[key], originProps, dataMap, getParsedMeta);
//         }
//         newProps[key] = metaToComponent(newProps[key], {rowIndexs}, dataMap);
//     }
//     setSpecialProps(newProps);
//     return newProps;
// }

// // 处理_power属性，返回多个element
// function execPowerProps(originProps, dataMap, rowIndexs = [], parentProps, ownerProps) {
//     const powerString = originProps['_power'];
//     const newProps = {};

//     if (powerString && /for[ ]+in/.test(powerString)) {
//         let p = powerString
//             .replace(/for[ ]+in/, '')
//             .replace(' ', '');
//         if (p.indexOf('_rowIndex') != -1) {
//             p = p.replace('_rowIndex', rowIndexs && rowIndexs.length && rowIndexs[rowIndexs.length - 1] || 0);
//         }

//         let items = gf(dataMap, p)
//         items = items && items.toJS ? items.toJS() : items;
//         if (!items || items.length === 0) {;
//             newProps.powerComponent = [];
//             return newProps;
//         } 

//         newProps.powerComponent = items.map((o, index) => {
//             const newRowIndexs = [...(rowIndexs|| []), index];
//             let { children, ...renderProps } = originProps;
//             let powerProps = execComponentProps(renderProps, dataMap, newRowIndexs, parentProps.getParsedMeta)
//             powerProps = copyUndefinedProps(powerProps, ownerProps);
//             if (!powerProps.key) {
//                 powerProps.key = index;
//             }
//             if (children) {
//                 if (children && children.renderType) {
//                     let data = dataMap && dataMap.toJS() || {};
//                     children = execProp(children, data, newRowIndexs);
//                 }
//                 powerProps.children = metaToComponent(children, {...parentProps, rowIndexs: newRowIndexs}, dataMap);
//             }
//             return createElement(getPropsWithParent(powerProps, parentProps));
//         })
//     }

//     // 处理_power属性，返回单个element
//     if (powerString && powerString.indexOf('=>') != -1) {
//         newProps.powerComponent = (...args) => {
//             let varsString = ''
//             let powerString = utils.string.trim(powerString)
//             if (powerString == '({rowIndex})=>rowIndex' || powerString == '({rowIndex}) => rowIndex') {
//                 varsString = (new Function('return (function(_ref) {var rowIndex = _ref.rowIndex;return rowIndex})'))()(...args)
//             }
//             else {
//                 varsString = (new Function('return ' + powerString))()(...args)
//             }
//             let newRowIndexs = [...rowIndexs, varsString];
//             let { children, ...renderProps} = originProps;
//             let powerProps = execComponentProps(renderProps, dataMap, newRowIndexs, parentProps.getParsedMeta)
//             powerProps = copyUndefinedProps(powerProps, ownerProps);
//             if (!powerProps.key) {
//                 powerProps.key = index;
//             }
//             if (children) {
//                 if (children && children.renderType) {
//                     let data = dataMap && dataMap.toJS() || {};
//                     children = execProp(children, data, newRowIndexs);
//                 }
//                 powerProps.children = metaToComponent(children, {...parentProps, rowIndexs: newRowIndexs}, dataMap);
//             }
//             return createElement(getPropsWithParent(powerProps, parentProps));
//         }
//     }
//     return newProps;
// }

// function toProps(props, parentProps, dataMap, rowIndexs, dataChange, ownerProps) {
//     let newProps;

//     if (!props['_power']) {
//         newProps = execComponentProps(props, dataMap, rowIndexs || parentProps.rowIndexs, parentProps.getParsedMeta, dataChange);
//         if (newProps.children) {
//             if (config.isChildrenNoWrapperComponent(props.component)) {
//                 newProps.children = metaToComponent(newProps.children, parentProps, dataMap);
//             }
//         }
//     } else {
//         newProps = execPowerProps(props, dataMap, rowIndexs || parentProps.rowIndexs, parentProps, ownerProps);
//     }
//     return newProps;
// }

// function hitKeys(dataChangeKeys, metaBindKeys) {
//     return dataChangeKeys.some(changeKey => metaBindKeys.some(bindKey => bindKey && bindKey.includes(changeKey)))
// }

// function getConnect(props, parentProps) {
//     let { connectProps, metaRenderType, metaBindKeys, ...renderProps } = props;
//     const { appFullName, appDataId, rowIndexs, key } = parentProps;

//     const ConnectComponent =  connect(
//         (state, ownerProps) => {
//             let dataChange = state.get('DataChange');
//             if (connectProps && (!dataChange || dataChange.appDataId !== appDataId || !metaRenderType ||
//                 (metaRenderType === 'SOME' && !hitKeys(dataChange.dataChangeKeys, metaBindKeys)))) {
//                 return connectProps;
//             }
//             const dataMap = getField(state, appFullName, appDataId, 'data');
//             let newProps = toProps(renderProps, parentProps, dataMap, ownerProps.rowIndexs || rowIndexs, dataChange, ownerProps);
//             if (!newProps.powerComponent) {
//                 newProps = copyUndefinedProps(newProps, ownerProps);
//                 newProps = getPropsWithParent(newProps, parentProps);
//             }
//             connectProps = newProps;
//             return newProps;
//         },
//         null,
//         null,
//         { pure: true }
//     )(componentClass);
//     return <ConnectComponent key={key} />
// }

// // 特殊属性处理，包括"_excludeProps"、"..."等
// function setSpecialProps(props) {
//     const newProps = {...props};
//     // 去除meta的排除属性
//     const excludeProps = props['_excludeProps'];
//     if (excludeProps && excludeProps instanceof Array) {
//         excludeProps.forEach(k => {
//             if (newProps[k])
//                 delete newProps[k];
//         });
//     }
//     // 处理特殊属性'...'
//     const pointProps = props['...'];
//     if (pointProps && typeof pointProps === 'object') {
//         Object.keys(pointProps).forEach(kk => {
//             newProps[kk] = pointProps[kk]
//         });
//         delete newProps['...'];
//     }
//     // 返回新属性对象
//     return newProps;
// }

// /**
//  * 处理动态meta值，如{_isMeta: true, value: { name: xxx, component: xxx }}
//  * 把表达式转化为execObj，再执行metaToComponent
//  */
// function setDynamicMeta(value, props, dataMap, getParsedMeta) {
//     const parsedMeta = getParsedMeta && getParsedMeta(value.value) || value.value;
//     if (parsedMeta instanceof Array) {
//         return parsedMeta.map((meta,key) => metaToComponent(meta, {...props, key}, dataMap))
//     }
//     return metaToComponent(parsedMeta, props, dataMap);
// }

// /**
//  * 创建react element
//  * @param {*} props 
//  */
// function createElement(props, userMemo) {
//     const { component: componentName, _visible, notRender, /**_notRender,**/ appName, rowIndexs, ...elementProps } = props;
//     // 处理_visible等属性
//     if (_visible === false || (typeof _visible === 'function' && (_visible)() === false) /**|| notRender === true || _notRender === true**/) {
//         return null;
//     }
//     // appName无注册
//     if (componentName === 'AppLoader') {
//         if (!appName) {
//             return null;
//         }
//         if ((props._notRender || props.notRender) && !getApps()[appName]) {
//             if (appName.indexOf('?') != -1) {
//                 let noArgName = appName.split('?')[0]
//                 if (!getApps()[noArgName]) {
//                     return null
//                 }
//             } else {
//                 return null
//             }
//         }

//     }
//     if (!props.key && rowIndexs && rowIndexs.length) {
//         props.key = rowIndexs.join('-');
//     }

//     let component = componentFactory.getComponent(appName, componentName)
//     if (typeof component === 'function' && userMemo) {
//         component = React.memo(component);
//     }
//     return React.createElement(component, elementProps);
// }

// /**
//  * 判断meta是否绑定data，需要connect函数包裹在外层，实现刷新
//  * @param {*} props 
//  */
// function getMetaBindKeys(props) {
//     let metaBindKeys = [];
//     for (let value of Object.values(props)) {
//         if (value){
//             if (value.renderType === 'ALL') {
//                 return null;
//             } else if(value.renderType === 'SOME') {
//                 metaBindKeys = metaBindKeys.concat(value.dataKeys);
//             }
//         }
//     }
//     if (props.children && config.isChildrenNoWrapperComponent(props.component)) {
//         if (props.children instanceof Array) {
//             for (let child of props.children) {
//                 if (!child) {
//                     break;
//                 }
//                 let childMetaBindKeys = getMetaBindKeys(child);
//                 if (!childMetaBindKeys) {
//                     return null;
//                 }
//                 if (childMetaBindKeys.length) {
//                     metaBindKeys = metaBindKeys.concat(childMetaBindKeys);
//                 }
//             }
//         } else {
//             let childMetaBindKeys = getMetaBindKeys(props.children);
//                 if (!childMetaBindKeys) {
//                     return null;
//                 }
//                 if (childMetaBindKeys.length) {
//                     metaBindKeys = metaBindKeys.concat(childMetaBindKeys);
//                 }
//         }
//     }
//     return metaBindKeys;
// }

// /**
//  * meta转换为component，静态的（不随data更新而变化），不转换children meta
//  * @param {*} props 
//  * @param {*} parentProps 
//  */
// function metaToComponentStaticWithoutChildren(props, parentProps){
//     for (let [key, value] of Object.entries(props)) {
//         if (value && value.renderType) {
//             props[key] = value.exec(value.execFunction, null, []);
//         } else {
//             props[key] = value;
//         }
//     }
//     if (parentProps.key) {
//         props.key = parentProps.key;
//     }
//     return createElement(getPropsWithParent(props, parentProps), true);
// }

// function getElement(props, parentProps, dataMap) {
//     let newProps = toProps(props, parentProps, dataMap);
//     let { powerComponent, ...rest } = newProps;
//     if (powerComponent) {
//         return powerComponent;
//     }
//     return createElement(getPropsWithParent(rest, parentProps));
// }

// /**
//  * 有data，执行excecObj的函数，获取最新属性值，转为Component
//  * @param {*} meta meta
//  * @param {*} props 父props
//  */
// function metaToComponentWithData(meta, props, dataMap) {
//     // execObj，有data，执行excecObj的函数，获取最新属性值
//     if (meta.renderType) {
//         let data = dataMap && dataMap.toJS() || {};
//         let newProp = execProp(meta, data, props.rowIndexs)
//         // 结果为meta，需先解析表达式，再转为component
//         if (newProp && newProp['_isMeta'] === true) {
//             newProp = setDynamicMeta(newProp, props, dataMap, props.getParsedMeta);
//         }
//         return metaToComponent(newProp, props, dataMap)
//     }

//     const metaProps = toProps(meta, props, dataMap);
//     if (meta.component) {
//         return getElement(metaProps, props, dataMap)
//     } else {
//         return metaProps;
//     }
// }

// /**
//  * 无data，返回Connect Component
//  * @param {*} meta meta
//  * @param {*} props 父props
//  */
// function metaToComponentNoData(meta, props) {
//     // execObj，无data直接返回
//     if (meta.renderType) {
//         return meta;
//     }
//     // 递归meta属性值，转为Connect Component     
//     const metaProps = {};
//     Object.keys(meta).forEach(key => {
//         // 部分组件的父和子Component有相互依赖关系，子Component外不能包裹connect，因此不递归解析，待父Component渲染时一起渲染
//         if (key === 'children' && meta.renderWithParent) {
//             metaProps[key] = meta[key];
//         } else {
//             metaProps[key] = metaToComponent(meta[key], props);
//         }
//     })
//     if (meta.component) {
//         // 获取组件所有属性绑定的data key，可能包含子组件的data key
//         let metaBindKeys = getMetaBindKeys(metaProps);
//         if (!metaBindKeys) {
//             // 组件刷新类型：ALL:全刷新; SOME: 部分刷新，根据绑定data key刷新
//             metaProps.metaRenderType = 'ALL'; 
//             return getConnect(metaProps, props)
//         } else if (metaBindKeys.length) {
//             metaProps.metaRenderType = 'SOME';
//             metaProps.metaBindKeys = metaBindKeys;
//             return getConnect(metaProps, props)
//         }
//         if (config.isChildrenNoWrapperComponent(metaProps.component)) {
//             return getConnect(metaProps, props)
//         }
//         return metaToComponentStaticWithoutChildren(metaProps, props);
//     } else {
//         return metaProps;
//     }
// }

// /**
//  * meta转react Component。data不为空时，计算meta属性值，为空时，不计算
//  * @param {*} meta json数据
//  * @param {*} props 父props
//  * @param {*} dataMap 在redux的connect函数中，传data，monkeyKing中，不传
//  */
// function metaToComponent(meta, props, dataMap) {
//     // null/undefined
//     if (!meta) {
//         return meta;
//     }
//     // meta类型为array(object)
//     if (meta instanceof Array) {
//         return meta.map((item, index) => metaToComponent(item, { ...props, metaKey: index }, dataMap));
//     }

//     const metaType = typeof meta;
//     if (metaType === 'object') {
//         // react 组件 || moment || 不解析 || Date 时，直接返回
//         if (meta['$$typeof'] || meta['_isAMomentObject'] || meta['_notParse'] || meta instanceof Date) {
//             return meta;
//         }
        
//         if (meta['_visible'] === false) {
//             return null;
//         }

//         return dataMap ? metaToComponentWithData(meta, props, dataMap) : metaToComponentNoData(meta, props);
//     } else {
//         // meta类型为Symbole/number/string/boolean/function(object)
//         return meta;
//     }
// }

// /**
//  * app渲染只执行一次该函数
//  * @param {*} props 
//  */
// const MonkeyKing = (props) => {
//     const { path, gm, gf } = props
//     const data = gf().toJS()
//     // metaToComponent不传data
//     return metaToComponent(gm(path, undefined, data), props)
// }

// export default MonkeyKing
