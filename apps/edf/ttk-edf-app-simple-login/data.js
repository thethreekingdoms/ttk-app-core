export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-simple-login',
		children: [{
			name: 'header',
			className: 'ttk-edf-app-simple-login-header',
			component: 'Layout',
			children: [{
				name: 'header-left',
				component: 'Layout',
				className: 'ttk-edf-app-simple-login-header-left',
				children: [{
					name: 'logo',
					component: '::img',
					className: 'edfx-app-login-header-left-logo',
					src: '{{$getLogo()}}'
					// }, {
					// 	name: 'sitename',
					// 	component: '::span',
					// 	className: 'ttk-edf-app-simple-login-header-left-sitename',
					// 	children: '金财管家'
				}, {
					name: 'split',
					component: '::div',
					className: 'ttk-edf-app-simple-login-header-left-split'
				}, {
					name: 'item',
					className: 'ttk-edf-app-simple-login-header-left-login',
					component: '::span',
					children: '管理登录'
				}]
			}]
		}, {
			name: 'content',
			className: 'ttk-edf-app-simple-login-content',
			component: 'Layout',
			children: [{
				name: 'form',
				component: 'Form',
				className: 'ttk-edf-app-simple-login-content-form',
				onSubmit: '{{$login}}',
				children: [{
					name: 'item1',
					component: 'Form.Item',
					className: 'ttk-edf-app-simple-login-content-form-title',
					children: '登录'
				}, {
					name: 'item2',
					component: 'Form.Item',
					validateStatus: '{{data.other.error.mobile?\'error\':\'success\'}}',
					help: '{{data.other.error.mobile}}',
					className: 'ttk-edf-app-simple-login-content-form-mobile',
					children: [{
						name: 'mobile',
						component: 'Input',
						placeholder: '请输入手机号',
						onFocus: '{{function(e){$fieldChange(\'data.form.mobile\', e.target.value)}}}',
						onChange: '{{function(e){$fieldChange(\'data.form.mobile\', e.target.value)}}}',
						value: '{{data.form.mobile}}',
						prefix: {
							name: 'userIcon',
							component: 'Icon',
							fontFamily: 'edficon',
							type: 'yonghu'
						}
					}]
				}, {
					name: 'item3',
					component: 'Form.Item',
					validateStatus: '{{data.other.error.password?\'error\':\'success\'}}',
					help: '{{data.other.error.password}}',
					className: 'ttk-edf-app-simple-login-content-form-password',
					children: [{
						name: 'password',
						component: 'Input',
						placeholder: '请输入密码',
						type: 'password',
						// onChange: `{{function(e){$setField('data.other.error.password', undefined);$setField('data.other.userInput', true);$setField('data.form.password', e.target.value)}}}`,
						onChange: `{{function(e){$setField('data.other.error.password', undefined);$setField('data.form.password', e.target.value)}}}`,
						onBlur: `{{function(e){$fieldChange('data.form.password', e.target.value)}}}`,
						value: '{{data.form.password}}',
						prefix: {
							name: 'passwordIcon',
							component: 'Icon',
							fontFamily: 'edficon',
							type: 'mima'
						}
					}]
				}, {
					name: 'item4',
					component: 'Form.Item',
					className: 'ttk-edf-app-simple-login-content-form-login',
					children: [{
						name: 'loginBtn',
						component: 'Button',
						type: 'softly',
						// disabled: '{{$checkLogin()}}',
						children: '登录',
						onClick: '{{$login}}'
					}]
				}/*, {
					name: 'item5',
					component: 'Form.Item',
					className: 'ttk-edf-app-simple-login-content-form-more',
					children: [{
						name: 'remember',
						component: 'Checkbox',
						className: 'ttk-edf-app-simple-login-content-form-more-remember',
						checked: '{{data.form.remember}}',
						onChange: `{{function(e){$fieldChange('data.form.remember', e.target.checked)}}}`,
						_visible:false,
						children: '一周内自动登录'
					}]
				}*/]
			}]
		}, {
			name: 'footer',
			className: 'ttk-edf-app-simple-login-footer',
			component: 'Layout',
			children: [{
				name: 'item1',
				component: '::p',
				children: [{
					name: 'item1',
					component: '::span',
					children: '金财管家@2018' //版权所有 © 2018 金财互联数据服务有限公司 粤ICP备'
				}, {
					name: 'version',
					id: 'lbl-version',
					component: '::span',
					// children: '{{$getVersion()}}'
					children: '{{data.other.version}}'
				}
				]
			}]
		}/*, {
			name: 'browserCheck',
			className: 'ttk-edf-app-simple-login-browserCheck',
			_visible: '{{data.other.checkTips ? true :false}}',
			component: '::div',
			children: {
				name: 'browserCheck-middle',
				className: 'ttk-edf-app-simple-login-browserCheck-middle',
				component: '::span',
				children: [{
					name: 'warning-ico',
					component: '::img',
					className: 'ttk-edf-app-simple-login-browserCheck-img',
					src: require('./img/warning.png')
				}, {
					name: 'warning-test',
					component: '::span',
					className: 'ttk-edf-app-simple-login-browserCheck-title',
					children: '不建议手机端登录，请前往PC端'
				}, {
					name: 'warning-close',
					component: '::img',
					onClick: '{{$closeTips}}',
					className: 'ttk-edf-app-simple-login-browserCheck-close',
					src: require('./img/close.png')
				}]
			}
		}*/]
	};
}

export function getInitState() {
	return {
		data: {
			form: {
				account: '',
				password: '',
				mobile: '',
				remember: false
			},
			other: {
				error: {},
				selectedImgIndex: 0,
				imgs: [],
				// userInput: false,
				// checkTips: false,
				version: ''
			}
		}
	};
}
