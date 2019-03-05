
export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-login',
		children: [{
			name: 'header',
			className: 'ttk-edf-app-login-header',
			component: 'Layout',
			children: [{
				name: 'header-left',
				component: 'Layout',
				className: 'ttk-edf-app-login-header-left',
				children: [{
					name: 'logo',
					component: 'img',
					className: 'ttk-edf-app-login-header-left-logo',
					src: '{{$getLogo()}}'
				}, {
					name: 'sitename',
					component: 'span',
					className: 'ttk-edf-app-login-header-left-sitename',
					children: '企业开发平台'
				}, {
					name: 'split',
					component: 'div',
					className: 'ttk-edf-app-login-header-left-split',
				}, {
					name: 'item',
					className: 'ttk-edf-app-login-header-left-login',
					component: 'span',
					children: '企业登录'
				}]
			}, {
				name: 'header-right',
				className: 'ttk-edf-app-login-header-right',
				component: 'a',
				onClick: '{{$goRegisterA}}',
				children: ['立即注册']
			}]
		}, {
			name: 'content',
			className: 'ttk-edf-app-login-content',
			component: 'Layout',
			children: [{
				name: 'bgs',
				className: 'ttk-edf-app-login-content-bgs',
				component: 'div',
				children: '{{$renderCal()}}'
			}, {
				name: 'form',
				component: 'Form',
				className: 'ttk-edf-app-login-content-form',
				onSubmit: '{{$login}}',
				children: [{
					name: 'item1',
					component: 'Form.Item',
					className: 'ttk-edf-app-login-content-form-title',
					children: '登录'
				}, {
					name: 'item2',
					component: 'Form.Item',
					validateStatus: "{{data.other.error.mobile?'error':'success'}}",
					help: '{{data.other.error.mobile}}',
					className: 'ttk-edf-app-login-content-form-mobile',
					children: [{
						name: 'mobile',
						component: 'Input',
						placeholder: '请输入手机号',
						onFocus: "{{function(e){$fieldChange('data.form.mobile', e.target.value)}}}",
						onChange: "{{function(e){$fieldChange('data.form.mobile', e.target.value)}}}",
						value: '{{data.form.mobile}}',
						prefix: {
							name: 'userIcon',
							component: 'Icon',
							fontFamily: 'edficon',
							type: 'yonghu',
						}
					}]
				}, {
					name: 'item3',
					component: 'Form.Item',
					validateStatus: "{{data.other.error.password?'error':'success'}}",
					help: '{{data.other.error.password}}',
					className: 'ttk-edf-app-login-content-form-password',
					children: [{
						name: 'password',
						component: 'Input',
						placeholder: '请输入密码',
						type: 'password',
						onChange: `{{function(e){$setField('data.other.error.password', undefined);$setField('data.other.userInput', true);$setField('data.form.password', e.target.value)}}}`,
						onBlur: `{{function(e){$fieldChange('data.form.password', e.target.value)}}}`,
						value: '{{data.form.password}}',
						prefix: {
							name: 'passwordIcon',
							component: 'Icon',
							fontFamily: 'edficon',
							type: 'mima',
						}
					}]
				}, {
					name: 'item4',
					component: 'Form.Item',
					className: 'ttk-edf-app-login-content-form-login',
					children: [{
						name: 'loginBtn',
						component: 'Button',
						type: 'softly',
						disabled: '{{$checkLogin()}}',
						children: '登录',
						onClick: '{{$login}}'
					}]
				}, {
					name: 'item5',
					component: 'Form.Item',
					className: 'ttk-edf-app-login-content-form-more',
					children: [{
						name: 'remember',
						component: 'Checkbox',
						className: 'ttk-edf-app-login-content-form-more-remember',
						checked: '{{data.form.remember}}',
						onChange: `{{function(e){$fieldChange('data.form.remember', e.target.checked)}}}`,
						children: '一周内自动登录'
					}, {
						name: 'register',
						className: 'ttk-edf-app-login-content-form-more-register',
						component: 'a',
						style: { float: 'right' },
						onClick: '{{$goRegisterB}}',
						children: '立即注册'
					}, {
						name: '',
						component: 'i',
						style: { float: 'right', margin: '0 10px', fontStyle: 'normal' },
						children: '|'
					}, {
						name: 'forgot',
						className: 'ttk-edf-app-login-content-form-more-forget',
						component: 'a',
						style: { float: 'right' },
						onClick: '{{$goForgot}}',
						children: '忘记密码'
					}]
				}]
			}]
		}, {
			name: 'footer',
			className: 'ttk-edf-app-login-footer',
			component: 'Layout',
			children: [{
				name: 'item1',
				component: 'p',
				children: [{
					name: 'item2',
					component: 'a',
					href: 'https://github.com/thethreekingdoms/ttk-app-core',
					children: 'ttk-app-core'
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				account: '',
				password: '',
				mobile: '',
				remember: false,
			},
			other: {
				error: {},
				selectedImgIndex: 0,
				imgs: [],
				userInput: false
			}
		}
	}
}