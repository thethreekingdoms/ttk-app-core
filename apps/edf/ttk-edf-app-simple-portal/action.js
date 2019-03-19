import { action as MetaAction, AppLoader } from 'edf-meta-engine';
import { fromJS } from 'immutable';
import { history, environment } from 'edf-utils';
import config from './config';
import moment from 'moment'

let { changeTheme, changeThemeforIE } = window.changeTheme
let loadSplitCss = false

const borwserVersion = environment.getBrowserVersion()
if (borwserVersion.ie && borwserVersion.version < 10) {
	loadSplitCss = true
}
class action {
	constructor(option) {
		this.metaAction = option.metaAction;
		this.config = config.current;
		this.webapi = this.config.webapi;
	}

	onInit = ({ component, injections }) => {
		this.component = component;
		this.injections = injections;
		injections.reduce('init');
		//没有token跳转到登录
		if (!sessionStorage.getItem('_accessToken')) {
			this.component.props.onRedirect(this.config.goAfterLogout);
			return;
		}

		debugger
		let ompArgs = JSON.parse(sessionStorage.getItem('ompArgs'));
		if (ompArgs) {
			if (Object.keys(ompArgs).includes('isOnlyContent')) {
				ompArgs.isOnlyContent = !ompArgs.isOnlyContent;
			}
			this.metaAction.sf('data.app', fromJS(ompArgs));
		}
		// 更新皮肤
		let skin = localStorage.getItem('skin') || '#1EB5AD'
		this.toggleColor(skin)
		this.load();
		//history增加
		history.listen('ttk-edf-app-simple-portal', this.listen);
	};

	//history增加
	listen = (childApp, location, action) => {
		const currentAppName = this.metaAction.gf('data.content.appName');
		const targetAppName = childApp;
		if (!targetAppName) {
			this.injections.reduce('closeAll');
			return;
		}
		if (targetAppName == currentAppName) {
			return;
		}
	};

	componentWillUnmount = () => {
		history.unlisten('ttk-edf-app-simple-portal', this.listen);
	};


	componentDidMount = () => {
		//IE中无CustomEvent
		(function () {
			if (typeof window.CustomEvent === 'function') return false;
			function CustomEvent(event, params) {
				params = params || { bubbles: false, cancelable: false, detail: undefined };
				var evt = document.createEvent('CustomEvent');
				evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
				return evt;
			}
			CustomEvent.prototype = window.Event.prototype;
			window.CustomEvent = CustomEvent;
		})();
		(function () {
			var throttle = function (type, name, obj) {
				obj = obj || window;
				var running = false;
				var func = function () {
					if (running) {
						return;
					}
					running = true;
					requestAnimationFrame(function () {
						obj.dispatchEvent(new CustomEvent(name));
						running = false;
					});
				};
				if (obj.addEventListener) {
					obj.addEventListener(type, func);
				}
				else if (obj.attachEvent) {
					obj.attachEvent(type, func);
				}
			};
			throttle('resize', 'optimizedResize');
		})();
		//注册 resize 事件
		if (window.addEventListener) {
			window.addEventListener('optimizedResize', this.resize);
		} else if (window.attachEvent) {
			window.attachEvent('optimizedResize', this.resize);
		}
	};

	load = async (option) => {
		let response = await this.webapi.portal.portal();
		if (!response) {
			response = {}

		}

		this.injections.reduce('load', { menu: response.menu });

	};

	getOrgs = async () => {
		let manageList = await this.webapi.org.queryList();
		this.injections.reduce('manageList', { manageList });
	};

	handleVisibleChange = (visible) => {
		this.metaAction.sf('data.visible', visible);
	};

	animationEnd = () => {
		this.metaAction.gf('data.animation') == 'out' && this.metaAction.sf('data.showPanel', 'none');
	};

	getCurrentUser = () => this.metaAction.context.get('currentUser') || {};

	getCurrentOrg = () => this.metaAction.context.get('currentOrg') || {};

	getOrgName = () => {
		const org = this.getCurrentOrg();
		if (org) {
			return org.name;
		}
		return '';
	};

	resize = () => {
		this.injections.reduce('resize');
		let data = this.metaAction.gf('data') && this.metaAction.gf('data')
			.toJS();
		window.onresize = () => {
			if (data.widthPersonStatus == false) {
				let width = window.innerWidth > 1024 ? true : false;
				this.metaAction.sf('data.width', width);
			}
		};
		this.metaAction.sf('data.service.mathRandom', Math.random());
	};

	switchMenu = () => {
		let flag = this.metaAction.gf('data')
			.toJS();
		this.metaAction.sf('data.width', !flag.width);
		this.metaAction.sf('data.widthPersonStatus', true);
	};

	getMenuChildren = () => {
		const menu = this.metaAction.gf('data.menu')
			.toJS();
		const loop = (children, num) => {
			const ret = [];
			if (num == 1) {
				children && children.forEach(child => {
					if (child.id != '99') {
						ret.push({
							name: child.key,
							key: child.key,
							className: '{{data.width ? \'level-first show-content\' : \'level-first hide-content\'}}',
							title: child.children && child.children.length !== 0 && [{
								name: 'title',
								component: '::span',
								className: 'leftNavMenu',
								children: [{
									name: 'icon',
									component: 'Icon',
									fontFamily: 'edficon',
									className: 'menu-icon',
									type: child.iconFont
								}, {
									name: 'title',
									component: '::span',
									className: 'menu-content',
									children: child.name
								}, {
									name: 'badgeImg',
									component: '::img',
									_visible: child.versionTag == 1,
									className: '{{data.width ? \'right_beta\' : \'top_beta\'}}',
									src: '{{$getBeta()}}'
								}]
							}],
							component: child.children && child.children.length == 0 ? 'Menu.Item' : 'Menu.SubMenu',
							children: child.children && child.children.length == 0 ? [{
								name: 'icon',
								component: 'Icon',
								fontFamily: 'edficon',
								className: 'menu-icon',
								type: child.iconFont //'link'
							}, {
								name: 'title',
								component: '::span',
								className: 'menu-content',
								children: child.name
							}] : loop(child.children, 2)
						});
					}
				});
			} else {
				children && children.forEach(child => {
					if (!child.children || (child.children && child.children.length == 0)) {
						ret.push({
							name: child.key,
							key: child.key,
							className: 'left-menu-submenu-menuitem',
							component: 'Menu.Item',
							children: child.name
						});
					} else {
						ret.push({
							name: child.key,
							key: child.key,
							className: 'left-menu-itemgroup',
							title: {
								name: 'title',
								component: '::span',
								children: child.name
							},
							component: 'Menu.ItemGroup',
							children: loop(child.children, 2)
						});
					}
				});
			}
			return ret;
		};
		return {
			_isMeta: true,
			value: loop(menu, 1)
		};
	};

	createLink = () => {
		let element = document.head.querySelector('.el-element');
		let origin = location.origin;
		let link = document.createElement('link');
		link.className = 'el-element';
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.id = 'skin';
		return link;
	};

	topMenuClick = async (e) => {
		this.metaAction.sf('data.userMenuVisible', false);
		switch (e.key) {
			case 'logout':
				if (this.component.props.onRedirect && this.config.goAfterLogout) {
					let res = await this.webapi.user.logout();
					if (res) {
						this.metaAction.context.set('currentUser', undefined);
						this.metaAction.context.set('currentOrg', undefined);
						sessionStorage.removeItem('mobile');
						sessionStorage.removeItem('username');
						sessionStorage.removeItem('_accessToken');
						sessionStorage.removeItem('password');
						this.component.props.onRedirect(this.config.goAfterLogout, localStorage && localStorage['ompKey'] && JSON.parse(localStorage['ompKey']));
					}
				}
				break;
		}
	};


	getMenuSelectKeys = () => {
		return ['50'];
	};
	tabChange = (key) => {
		if (key == 'more') return;
		const openTabs = this.metaAction.gf('data.openTabs');
		let curr = openTabs.find(o => o.get('name') == key);
		let _app = curr.toJS();
		if (_app.appProps) {
			_app.appProps.accessType = 0;
		} else {
			_app.appProps = {
				accessType: 0
			};
		}
		_app.appProps.isFolded && _app.appProps.isFolded == 1 ? this.metaAction.sf('data.width', false) : this.metaAction.sf('data.width', true);
		curr = fromJS(_app);
		this.setContent(curr.get('name'), curr.get('appName'), curr.get('appProps'));
	};

	onlyCloseContent = (appName) => {
		//判断app是否打开
		let openTabs = this.metaAction.gf('data.openTabs').toJS()
		let hasApp = false
		for (let i = 0; i < openTabs.length; i++) {
			if (openTabs[i].appName.indexOf(appName) != -1) {
				hasApp = true
				break
			}
		}
		if (hasApp) {
			this.injections.reduce('onlyCloseContent', appName)
		}
	}

	tabEdit = async (key, action) => {
		if (key == 'more') return;
		let that = this;
		let status = false;
		let openTabs = this.metaAction.gf('data.openTabs').toJS();
		openTabs.forEach(o => {
			if (o.name == key) {
				status = o.editing;
			}
		});
		if (action == 'remove') {
			if (status) {
				const ret = this.metaAction.modal('confirm', {
					title: '是否离开',
					content: `${key}尚未保存，还要离开吗？`,
					onOk() {
						that.injections.reduce('closeContent', key);
						that.metaAction.sf('data.mathRandom', Math.random());
						// that.reInitContent()
						return;
					},
					onCancel() {
						return;
					}
				});
			} else {
				this.injections.reduce('closeContent', key);
				this.metaAction.sf('data.mathRandom', Math.random());
				// this.reInitContent()
			}
		}
	};

	closeTabs = (e) => {
		let key = e.key,
			name = null,
			status = false,
			that = this,
			content = this.metaAction.gf('data.content')
				.toJS(),
			openTabs = this.metaAction.gf('data.openTabs')
				.toJS();
		for (let i = 0; i < openTabs.length; i++) {
			if (key == 'all') {
				if (openTabs[i].editing) {
					status = true;
					name = openTabs[i].name;
					break;
				}
			} else {
				if (openTabs[i].appName == content.appName) {
					status = openTabs[i].editing;
					if (status) name = content.name;
					break;
				}
			}
		}
		if (status) {
			const ret = this.metaAction.modal('confirm', {
				title: '是否离开',
				content: `${name}尚未保存，还要离开吗？`,
				onOk() {
					if (key == 'all') {
						that.injections.reduce('closeContent', 'all');
						that.metaAction.sf('data.mathRandom', Math.random());
					} else {
						that.injections.reduce('closeContent', content.name);
						that.metaAction.sf('data.mathRandom', Math.random());
					}
					return;
				},
				onCancel() {
					return;
				}
			});
		} else {
			if (e.key == 'all') {
				this.injections.reduce('closeContent', 'all');
				this.metaAction.sf('data.mathRandom', Math.random());
			} else {
				this.injections.reduce('closeContent', content.name);
				this.metaAction.sf('data.mathRandom', Math.random());
			}
		}
	};
	/**
	 * reinit时调用
	 * 记录当前打开的所有页签
	 * 关闭所有后重新打开
	 */
	reInitContent = async () => {
		let content = this.metaAction.gf('data.content');
		let openTabs = this.metaAction.gf('data.openTabs');
		this.injections.reduce('closeAll');
		setTimeout(() => {
			this.injections.reduce('reInit', content, openTabs);
		}, 0);
	};

	//从企业管理和创建企业返回时调用
	setContent = (name, appName, appProps = {}) => {
		this.injections.reduce('setContent', name, appName, appProps);
	};

	//关闭popover时取消选中menu
	cancelCheckStatus = (visible) => {
		if (!visible) {
			this.metaAction.sf('data.selectedKeys', fromJS([]));
		}
	};

	foldMenu = () => {
		this.metaAction.sf('data.isShowMenu', !this.metaAction.gf('data.isShowMenu'));
		setTimeout(function () {
			var event = document.createEvent('HTMLEvents');
			event.initEvent('resize', true, true);
			window.dispatchEvent(event);
		}, 0);
	};

	addEventListener = (eventName, handler) => {
		this.injections.reduce('addEventListener', eventName, handler);
	};

	removeEventListener = (eventName) => {
		this.injections.reduce('removeEventListener', eventName);
	};

	toggleColor = async (color, action) => {
		if (loadSplitCss) {
			return this.toggleColorforIe(color, action)
		}
		let origin = location.origin
		let link = null
		if (document.querySelector("#skin")) {
			link = document.querySelector("#skin")
			link.id = "refSkin"
		} else {
			link = this.createLink()
			link.id = "refSkin"
			document.head.appendChild(link)
		}
		switch (color) {
			case '#FF913A':
				link.href = origin + '/yellowTheme' + '.css'
				break;
			case '#00B38A':
				link.href = origin + '/greenTheme' + '.css'
				break;
			case '#0066B3':
				link.href = origin + '/blueTheme' + '.css'
				break;
			case '#1EB5AD':
				link.href = origin + '/businessBlueTheme' + '.css'
				break;
			case '#B4A074':
				link.href = origin + '/orangeTheme' + '.css'
				break;
			case '#414141':
				link.href = origin + '/blackTheme' + '.css'
				break;
			default:
				link.href = origin + '/yellowTheme' + '.css'
				break;
		}

		//各个子模块主题颜色加载
		changeTheme(origin, color)

		if (action && action == 'change') {
			this.webapi.user.updateSkin(color)
			localStorage['skin'] = color
		}
	}

	toggleColorforIe = async (color, action) => {
		//let hash = (__webpack_hash__).slice(0, 8)
		for (let i = 1; i < 3; i++) {
			let origin = location.origin
			let link = null
			if (document.querySelector("#skin")) {
				link = document.querySelector("#skin")
			} else {
				link = this.createLink()
				document.head.appendChild(link)
			}
			switch (color) {
				case '#FF913A':
					link.href = origin + '/splitcss/yellowTheme' + `-${i}` + '.css'
					break;
				case '#00B38A':
					link.href = origin + '/splitcss/greenTheme' + `-${i}` + '.css'
					break;
				case '#0066B3':
					link.href = origin + '/splitcss/blueTheme' + `-${i}` + '.css'
					break;
				case '#1EB5AD':
					link.href = origin + '/splitcss/businessBlueTheme' + `-${i}` + '.css'
					break;
				case '#B4A074':
					link.href = origin + '/splitcss/orangeTheme' + `-${i}` + '.css'
					break;
				case '#414141':
					link.href = origin + '/splitcss/blackTheme' + `-${i}` + '.css'
					break;
				default:
					link.href = origin + '/splitcss/yellowTheme' + `-${i}` + '.css'
					break;
			}
			if (action && action == 'change') {
				this.webapi.user.updateSkin(color)
				localStorage['skin'] = color
			}
		}
		changeThemeforIE(color)
	}

}

export default function creator(option) {
	const metaAction = new MetaAction(option),
		o = new action({ ...option, metaAction }),
		ret = { ...metaAction, ...o };
	metaAction.config({ metaHandlers: ret });
	return ret;
}
