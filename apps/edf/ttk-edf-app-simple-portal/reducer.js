import { Map, List, fromJS } from 'immutable';
import { reducer as MetaReducer } from 'edf-meta-engine';
import config from './config';
import { getInitState } from './data';
import { history } from 'edf-utils';
import { log } from 'util';

var listeners = Map();

class reducer {
	constructor(option) {
		this.metaReducer = option.metaReducer;
		this.config = config.current;
		this.webapi = this.config.webapi;
	}

	init = (state, option) => {
		let initState = getInitState();
		initState.data.other.username = sessionStorage['username'];
		state = this.metaReducer.init(state, getInitState());
		if (this.config.menu && !this.config.webapi.getMenu) {
			return this.load(state, { menu: this.config.menu });
		}
		let menuKeyNameMap = [], menuAppNameMap = [];
		return state = this.metaReducer.sfs(state, {
			'data.menuKeyNameMap': fromJS(menuKeyNameMap),
			'data.menuAppNameMap': fromJS(menuAppNameMap)
		})
	};

	load = (state) => {
		const childApp = history.getChildApp('ttk-edf-app-simple-portal');
		if (childApp) {
			return this.setContent(state, '', childApp, {});
		} else {
			state = this.metaReducer.sfs(state, {
				'data.isTabsStyle': true,
				'data.isShowMenu': true,
				'data.visible': false
			})
			let openApp = this.metaReducer.gf(state, 'data.app') && this.metaReducer.gf(state, 'data.app').toJS();
			if (openApp && openApp.defaultApp) {
				if (!openApp.defaultAppName) {
					openApp.defaultAppName = openApp.name;
				}
				let props = openApp.appProps && JSON.parse(openApp.appProps) || {}

				return this.setContent(state, openApp.defaultAppName, openApp.defaultApp, props);
			} else if (localStorage['ompKey'] && JSON.parse(localStorage['ompKey']) && JSON.parse(localStorage['ompKey']).appkey == "10001001") {
				if (menu.filter((menuData) => menuData.id == 99).length > 0) {
					return this.setContent(state, "我的桌面", "ttk-omp-app-home");
				}
			}
			return state;
		}
	};

	manageList = (state, { manageList }) => {
		if (!manageList) {
			manageList = [];
			manageList.push({ name: '无' });
		}
		if (manageList) {
			state = this.metaReducer.sfs(state, {
				'data.manageList': fromJS(manageList),
				'data.manageListShow': fromJS(manageList)
			})
		}
		return state;
	};

	setContent = (state, name, appName, appProps) => {
		//判断当前显示页签appName和要新打开的是否一致
		const currContent = this.metaReducer.gf(state, 'data.content');
		if (currContent && appName == currContent.get('appName')) {
			return state;
		}
		//如果要打开的app在map中，则修改props，反之添加到map中
		let menuAppNameMap = this.metaReducer.gf(state, 'data.menuAppNameMap');
		if (name && appName && appProps && menuAppNameMap.getIn([appName, 'name']) != name) {
			menuAppNameMap = menuAppNameMap.set(appName, fromJS({ name, props: appProps }));
			state = this.metaReducer.sf(state, 'data.menuAppNameMap', menuAppNameMap);
		} else if (name && appName && appProps && menuAppNameMap.getIn([appName, 'name']) == name) {
			menuAppNameMap = menuAppNameMap.updateIn([appName, 'props'], () => {
				return appProps.toJS ? appProps : fromJS(appProps);
			});
			state = this.metaReducer.sf(state, 'data.menuAppNameMap', menuAppNameMap);
		}
		/**
		 * 参数问题，zhaoyun@ttk.com
		 */
		let _appProps = menuAppNameMap.getIn([appName, 'props']);
		if (_appProps && _appProps.size > 0) {
			appProps = _appProps;
		}
		let content = null;
		if (appProps && appProps.size) {
			content = fromJS({ name, appName, appProps: appProps.toJS(), editing: false });
		} else {
			content = fromJS({ name, appName, appProps, editing: false });
		}
		state = this.metaReducer.sf(state, 'data.content', content);
		var openTabs = this.metaReducer.gf(state, 'data.openTabs') || List();
		var hit = openTabs.findIndex(o => o.get('name') == name || o.get('appName') == appName) != -1;
		let orgSign = false;
		if (appProps !== undefined && appProps.size > 0 && appProps !== '{}') {
			if (appProps.get('isTabsStyle') == false && appProps.get('isShowMenu') == false) {
				hit = false;
				orgSign = false;
				content = fromJS({ name: '我的桌面', appName: 'edfx-app-home', appProps: { isFolded: 0 } });
				openTabs = List();
				state = this.metaReducer.sfs(state, {
					'data.isTabsStyle': true,
					'data.isShowMenu': true,
					'data.content': content
				});
				let listener = listeners.get(`onTabFocus_edfx-app-home`);
				if (listener) {
					setTimeout(() => listener(), 16);
				}
			}
		}
		const isTabsStyle = this.metaReducer.gf(state, 'data.isTabsStyle');
		if (!hit) {
			if (isTabsStyle && openTabs.size > 0) {
				openTabs = openTabs.push(content);
			}
			else {
				openTabs = List()
					.push(content);
			}
			state = this.metaReducer.sf(state, 'data.openTabs', openTabs);
		}
		else {
			if (!isTabsStyle) {
				openTabs = List()
					.push(content);
				state = this.metaReducer.sf(state, 'data.openTabs', openTabs);
			}
			else {
				let listener = listeners.get(`onTabFocus_${appName}`);
				if (listener) {
					setTimeout(() => listener(appProps), 16);
				}
			}
		}
		if (orgSign) {
			setTimeout(() => {
				history.pushChildApp('ttk-edf-app-simple-portal');
			}, 0);
		}
		else {
			setTimeout(() => {
				history.pushChildApp('ttk-edf-app-simple-portal', content.get('appName'));
			}, 0);
		}
		return state;
	};

	closeContent = (state, name) => {
		const curContent = this.metaReducer.gf(state, 'data.content'), appName = curContent.get('appName');
		return this.closeContentReally(state, name);
	};

	onlyCloseContent = (state, appName) => {
		let openTabs = this.metaReducer.gf(state, 'data.openTabs').toJS()
		let index = null
		for (let i = 0; i < openTabs.length; i++) {
			if (openTabs[i].appName == appName) {
				index = i
				break
			}
		}
		openTabs.splice(index, 1)
		state = this.metaReducer.sf(state, 'data.openTabs', fromJS(openTabs))
		return state
	}

	closeContentReally = (state, name, fun, res, appName) => {
		let openTabs = this.metaReducer.gf(state, 'data.openTabs') || List(),
			desktop = openTabs.toJS().slice(0, 1),
			hitIndex = openTabs.findIndex(o => o.get('name') == name);
		if (name == 'all' || name == 'toggleManage') {
			state = this.metaReducer.sfs(state, {
				'data.width': true,
				'data.openTabs': fromJS(desktop),
				'data.content': openTabs.get(0)
			});
			if (name == 'toggleManage') return state;
			let listener = listeners.get(`onTabFocus_edfx-app-home`);
			if (listener) {
				setTimeout(() => listener(name == 'toggleManage' ? { action: 'toggleManage' } : {}), 16);
			}
			return state;
		}
		state = this.removeEventListener(state, name);
		openTabs = openTabs.remove(hitIndex);
		state = this.metaReducer.sfs(state, {
			'data.openTabs': openTabs,
			'data.content': openTabs.get(openTabs.size - 1)
		});
		history.pullChildAppMin(appName, openTabs);
		return state;
	};

	closeAll = (state) => {
		return state = this.metaReducer.sfs(state, {
			'data.openTabs': new List(),
			'data.content': new Map()
		});
	};

	reInit = (state, content, openTabs) => {
		return state = this.metaReducer.sfs(state, {
			'data.openTabs': openTabs,
			'data.content': content
		});
	};

	addEventListener = (state, eventName, handler) => {
		const currContent = this.metaReducer.gf(state, 'data.content'),
			appName = currContent.get('appName');
		eventName = eventName + '_' + appName;
		if (!listeners.get(eventName)) {
			listeners = listeners.set(eventName, handler);
		}
		return state;
	};

	removeEventListener = (state, name) => {
		if (name == 'all') { // 删除所有页签的listener
			listeners = Map();
			return state;
		}
		let appName;
		const openTabs = this.metaReducer.gf(state, 'data.openTabs')
			.toJS();
		for (let i = 0; i < openTabs.length; i++) {
			if (openTabs[i].name == name) {
				appName = openTabs[i].appName;
			}
		}
		// 删除当前页签的listener
		let listenersKey = Object.keys(listeners.toJS());
		for (let i = 0; i < listenersKey.length; i++) {
			if (listenersKey[i].indexOf('_' + appName) > -1 &&
				listeners.get(listenersKey[i])) {
				listeners = listeners.remove(listenersKey[i]);
			}
		}
		return state;
	};

	//判断页面是否处于编辑状态
	editing = (state, appName, status) => {
		let openTabs = this.metaReducer.gf(state, 'data.openTabs')
			.toJS();
		openTabs.forEach(o => {
			if (o.appName == appName) {
				o.editing = status;
			}
		});
		state = this.metaReducer.sf(state, 'data.openTabs', fromJS(openTabs));
		return state;
	};

	appList = (state, response, action) => {
		if (action && action == 'reload') {
			let activeApp = this.metaReducer.gf(state, 'data.content')
				.toJS();
			let listener = listeners.get(`onTabFocus_edfx-app-home`);
			if (listener) {
				setTimeout(() => listener(Map.isMap(activeApp.appProps) ? activeApp.appProps : Map(activeApp.appProps) || {}), 16);
			}
		}
		state = this.metaReducer.sf(state, 'data.desktopAppList', fromJS(response));
		return state;
	};

	//企业列表搜索
	manageListShow = (state, list) => {
		return state = this.metaReducer.sf(state, 'data.manageListShow', fromJS(list));
	};
	//resize事件
	resize = (state) => {
		let listener = listeners.toJS();
		let keys = Object.keys(listener);
		for (let i = 0; i < keys.length; i++) {
			if (keys[i].indexOf('onResize') != -1) {
				setTimeout(() => listener[keys[i]](), 16);
			}
		}
		return state;
	};
	//客服、二维码
	weixin = (state, status) => {
		state = this.metaReducer.sf(state, 'data.service.qrcodeVisible', status);
		return state;
	};
}

export default function creator(option) {
	const metaReducer = new MetaReducer(option),
		o = new reducer({ ...option, metaReducer });
	return { ...metaReducer, ...o }
}
