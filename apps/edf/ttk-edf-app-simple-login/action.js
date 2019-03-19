import React from 'react';
import ReactDOM from 'react-dom'
import { Spin } from 'antd'
import { action as MetaAction, AppLoader } from 'edf-meta-engine';
import config from './config';
import md5 from 'md5';
import { consts } from 'edf-consts';
import { LoadingMask, Toast } from "edf-component";

class action {
	constructor(option) {
		this.metaAction = option.metaAction;
		this.config = config.current;
		this.webapi = this.config.webapi;
	}

	onInit = async ({ component, injections }) => {

		this.component = component
		let props = this.component.props
		const spinMask = this.spin()
		let source = null
		//外部对接：一键登录判断
		if (props != null && props.appParams != null) {
			if (source == null) {
				//云财税内部
				let appkey = props.appParams.appkey || '10001006'
				if (appkey != null) {
					let code = props.appParams.code || '1001', token = props.appParams.token || 'xxxxxxxxxxx'
					if ((code != null || token != null) || appkey == consts.app.APPKEY_FORESEE_ECS_SINGLE) {
						props.appParams.isReturnValue = true
						spinMask.show()
						let sourceType = null

						const response = await this.webapi.connector.accessLogin(props.appParams)
						spinMask.hide()
						// 正常时不变；else兼容刷新时code失效情况
						if (response) {

							sessionStorage['_accessToken'] = response.token


							response.value = {

							}

							let page = props.appParams.page
							response.value.appSource = { "appKey": 10005001, "name": "云代账", "defaultApp": `${page}`, "appProps": "{\"isOnlyContent\":true }", "isOnlyContent": true }

							sessionStorage['ompArgs'] = JSON.stringify(response.value.appSource)


							// if (props.appParams && props.appParams.appkey) {
							// 	localStorage['ompKey'] = JSON.stringify({ appkey: props.appParams.appkey })
							// }

							if (props.appParams) {
								sessionStorage['appParams'] = JSON.stringify({ appParams: props.appParams })
							}


							if (props.onRedirect && this.config.goAfterLogin) {
								props.onRedirect(this.config.goAfterLogin)
							}
						} else {
							if (response.error && sessionStorage['_accessToken'] && response.error.message.includes('CODE已失效,请重新生成')) {
								if (props.onRedirect && this.config.goAfterLogin) {
									props.onRedirect(this.config.goAfterLogin)
								}
							} else {
								Toast.error(response.error.message)
								// window.location.href = window.location.protocol + '//' + window.location.host
							}
						}
						return false
					}
				}
			}
		}
		let info = { mobile: '', password: '', remember: false }, currentTimestamp = (new Date()).getTime();
		//从cookie中读取mobile
		function getCookie(c_name) {
			if (document.cookie.length > 0) {
				let c_start = document.cookie.indexOf(c_name + '=');
				if (c_start != -1) {
					c_start = c_start + c_name.length + 1;
					let c_end = document.cookie.indexOf(';', c_start);
					if (c_end == -1) c_end = document.cookie.length;
					return unescape(document.cookie.substring(c_start, c_end));
				}
			}
			return '';
		}
		info.mobile = getCookie('THE_LAST_LOGIN');
		injections.reduce('init', info)
		//绑定回车事件
		this.bindEnter();
	};

	bindEnter = () => {
		let that = this;
		document.onkeydown = function (e) {
			e = e || window.event;
			let keyCode = e.keyCode;
			if (keyCode !== 13) return;
			let form = that.metaAction.gf('data.form')
				.toJS();
			that.fieldChange('data.form.mobile', form.mobile);
			that.fieldChange('data.form.password', form.password);
			that.login();
		};
	};

	login = async () => {
		let form = this.metaAction.gf('data.form').toJS();
		//登录前校验
		const basicInfo = await this.check([{
			path: 'data.form.mobile', value: form.mobile
		}, {
			path: 'data.form.password', value: form.password
		}], 'login');
		if (!basicInfo) return;
		if (!(Object.keys(this.component.props.appParams).includes('appkey'))) {
			this.metaAction.toast('warn', '请在url中携带参数appkey');
			return false;
		}
		// if (other.userInput) {
		if (form.password) {
			form.clearText = Base64.encode(form.password);
			form.password = md5(form.password + '*the3Kingdom*');
			form.appkey = this.component.props.appParams.appkey;
		}
		// }
		const response = await this.webapi.user.login(form);
		if (!response.result) {
			if (response.error.code == 50111) {
				this.metaAction.sf('data.other.error.password', '密码不正确，请重新输入');
			}
			return;
		}
		//cookie中存储上次登录的用户名
		function setCookie(c_name, value, expiredays) {
			let exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie = c_name + '=' + escape(value) +
				((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
		}
		setCookie('THE_LAST_LOGIN', form.mobile, 7);
		this.metaAction.context.set('user', response.value);
		sessionStorage['mobile'] = form.mobile;
		sessionStorage['username'] = response.value.nickname;
		sessionStorage['_accessToken'] = response.token;
		sessionStorage['password'] = form.password;
		sessionStorage['currentOrgStatus'] = response.value.currentOrgStatus;
		sessionStorage['ompArgs'] = JSON.stringify(response.value.appSource);
		document.onkeydown = null;
		//登录时切换皮肤
		// let skin = (response.value.skin && response.value.skin.toUpperCase()) || '#1EB5AD';
		// localStorage['skin'] = skin;
		let skin = '#1EB5AD';
		localStorage['skin'] = skin
		localStorage['ompKey'] = JSON.stringify(this.component.props.appParams);
		if (this.component.props.onRedirect && this.config.goAfterLogin) {
			this.component.props.onRedirect(this.config.goAfterLogin);
		}
	};

	spin = () => {
		const div = document.createElement('div')
		div.setAttribute('class', 'ttk-edf-app-simple-login-loading')
		return {
			show() {
				document.body.appendChild(div)
				ReactDOM.render(<Spin size="large" tip={'正在处理中...'} />, div)
			},
			hide() {
				ReactDOM.unmountComponentAtNode(div)
				try {
					document.body.removeChild(div)
				} catch (e) {

				}
			}
		}
	}

	getLogo = () => './vendor/img/portal/logo_erp.png'

	fieldChange = async (fieldPath, value) => {
		this.metaAction.sf(fieldPath, value);
		await this.check([{ path: fieldPath, value }]);
	};

	check = async (fieldPathAndValues, action) => {
		if (!fieldPathAndValues) {
			return;
		}
		let checkResults = [];
		for (let o of fieldPathAndValues) {
			let r = { ...o };
			if (o.path == 'data.form.mobile') {
				Object.assign(r, await this.checkMobile(o.value, action));
			}
			else if (o.path == 'data.form.password') {
				Object.assign(r, await this.checkPassword(o.value, action));
			}
			checkResults.push(r);
		}
		let json = {}, hasError = true;
		checkResults.forEach(o => {
			// json[o.path] = o.value
			json[o.errorPath] = o.message;
			if (o.message) {
				hasError = false;
			}
		});
		this.metaAction.sfs(json);
		return hasError;
	};

	checkMobile = async (mobile, action) => {
		let message;
		if (action && action == 'login') {
			if (!mobile) {
				message = '请输入手机号';
			} else if (mobile.length != 11) {
				message = '请输入正确的手机号';
			} else {
				let flag = await this.webapi.user.existsMobile(mobile);
				!flag && (message = '该手机号未注册，请重新输入');
			}
		} else {
			if (!mobile) {
				message;
			} else if (mobile.length == 1 && !(mobile == '1')) {
				message = '请输入正确的手机号';
			} else if (mobile.length > 1 && mobile.length < 11 && !/^1[3|4|5|6|7|8|9]/.test(mobile)) {
				message = '请输入正确的手机号';
			} else if (mobile.length > 11) {
				message = '请输入正确的手机号';
			} else if (mobile.length == 11) {
				let flag = await this.webapi.user.existsMobile(mobile);
				!flag && (message = '该手机号未注册，请重新输入');
			}
		}
		return { errorPath: 'data.other.error.mobile', message };
	};

	checkPassword = (password) => {
		return { errorPath: 'data.other.error.password', message: !password ? '请输入密码' : undefined };
	};

	//检查是否要置灰登录
	checkLogin = () => {
		let data = this.metaAction.gf('data').toJS();
		return !((data.form.mobile && !data.other.error.mobile) && (data.form.password && !data.other.error.password));
	};
}

export default function creator(option) {
	const metaAction = new MetaAction(option),
		o = new action({ ...option, metaAction }),
		ret = { ...metaAction, ...o }
	metaAction.config({ metaHandlers: ret })
	return ret
}
