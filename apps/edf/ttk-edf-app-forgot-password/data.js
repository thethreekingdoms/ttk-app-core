import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-forgot-password',
		children: [{
			name: 'header',
			className: 'ttk-edf-app-forgot-password-header',
			component: 'Layout',
			children: [{
				name: 'header-left',
				component: 'Layout',
				className: 'ttk-edf-app-forgot-password-header-left',
				children: [
				// 	{
				// 	name: 'logo',
				// 	component: '::img',
				// 	className: 'ttk-edf-app-login-header-left-logo',
				// 	src: '{{$getLogo()}}'
				// },
				{
					name: 'sitename',
					component: '::span',
					className: 'ttk-edf-app-login-header-left-sitename',
					children: '企业开发平台'
				}, {
					name: 'split',
					component: '::div',
					className: 'ttk-edf-app-login-header-left-split',
				}, {
					name: 'item',
					className: 'ttk-edf-app-login-header-left-login',
					component: '::span',
					children: '重置密码'
				}]
			}, {
				name: 'header-right',
				className: 'ttk-edf-app-forgot-password-header-right',
				component: '::a',
				onClick: '{{$goLogin}}',
				children: ['登录']
			}]
		}, {
			name: 'form',
			component: 'Form',
			className: 'ttk-edf-app-forgot-password-form',
			children: [{
				name: 'titleItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-forgot-password-form-title',
				children: "{{data.other.step==1?'安全验证':(data.other.step==2?'重置密码':'重新登录')}}"
			}, {
				name: 'barItem',
				component: '::div',
				className: 'ttk-edf-app-forgot-password-form-bar',
				// src: '{{$getBar()}}'
				children: [{
					name: 'step1',
					component: '::div',
					className: 'ttk-edf-app-register-form-bar-step',
					children: [{
						name: 'title',
						className: 'ttk-edf-app-register-form-bar-step-icon',
						component: '::div',
						style: {background: '#1EB5AD',borderColor: '#1EB5AD',color: '#fff'},
						children: ['1']
					}, {
						name: 'description',
						component: '::span',
						className: 'ttk-edf-app-register-form-bar-step-description',
						style: {color: '#1EB5AD'},
						children: ['安全验证']
					}]
				}, {
					name: 'line1',
					className: '{{data.other.step >= 2 ? "ttk-edf-app-register-form-bar-line active" : "ttk-edf-app-register-form-bar-line"}}',
					component: '::span',
				}, {
					name: 'step2',
					component: '::div',
					className: 'ttk-edf-app-register-form-bar-step',
					children: [{
						name: 'title',
						className: 'ttk-edf-app-register-form-bar-step-icon',
						style: "{{data.other.step>=2? {background: '#1EB5AD',borderColor: '#1EB5AD',color: '#fff'}:{background: '#fff',borderColor: '#666666',color: '#666666'}}}",
						component: '::div',
						children: ['2']
					}, {
						name: 'description',
						component: '::span',
						style: "{{data.other.step>=2?{color: '#1EB5AD'}:{color: '#666666'}}}",
						className: 'ttk-edf-app-register-form-bar-step-description',
						children: ['重置密码']
					}]
				}, {
					name: 'line2',
					className: '{{data.other.step >= 3 ? "ttk-edf-app-register-form-bar-line active" : "ttk-edf-app-register-form-bar-line"}}',
					component: '::span',
				}, {
					name: 'step3',
					component: '::div',
					className: 'ttk-edf-app-register-form-bar-step',
					children: [{
						name: 'title',
						className: 'ttk-edf-app-register-form-bar-step-icon',
						style: "{{data.other.step==3? {background: '#1EB5AD',borderColor: '#1EB5AD',color: '#fff'}:{background: '#fff',borderColor: '#666666',color: '#666666'}}}",
						component: '::div',
						children: ['3']
					}, {
						name: 'description',
						component: '::span',
						style: "{{data.other.step==3?{color: '#1EB5AD'}:{color: '#666666'}}}",
						className: 'ttk-edf-app-register-form-bar-step-description',
						children: ['重新登录']
					}]
				}]
			}, {
				name: 'mobileItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-forgot-password-form-mobile',
				validateStatus: "{{data.other.error.mobile?'error':'success'}}",
				help: '{{data.other.error.mobile}}',
				_visible: '{{data.other.step==1}}',
				children: [{
					name: 'mobile',
					component: 'Input',
					className: 'mobileInput',
					value: '{{data.form.mobile}}',
					placeholder: "请输入绑定手机号",
					onChange: `{{function(e){$fieldChange('data.form.mobile',e.target.value)}}}`,
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					}
				}]
			}, {
				name: 'captchaItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-forgot-password-form-captcha',
				validateStatus: "{{data.other.error.captcha?'error':'success'}}",
				help: '{{data.other.error.captcha}}',
				_visible: '{{data.other.step==1}}',
				children: [{
					name: 'captcha',
					component: 'Input',
					value: '{{data.form.captcha}}',
					placeholder: "请输入验证码",
					type: 'captcha',
					onFocus: "{{function(){$setField('data.other.error.captcha',undefined)}}}",
					onChange: "{{function(e){$setField('data.form.captcha',e.target.value)}}}",
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					},
					addonAfter: {
						name: 'suffix',
						component: 'Button',
						style: {width: '98px'},
						className: 'getCaptchaCode',
						disabled: '{{!data.form.mobile || !!data.other.error.mobile || !data.timeStaus}}',
						onClick: '{{$getCaptcha}}',
						children: '{{data.time}}'
					}
				}]
			}, {
				name: 'nextItem',
				className: 'ttk-edf-app-forgot-password-form-next',
				component: 'Form.Item',
				_visible: '{{data.other.step==1}}',
				children: [{
					name: 'next',
					disabled: '{{$checkNext()}}',
					component: 'Button',
					type: 'softly',
					children: '下一步',
					onClick: '{{$next}}'
				}]
			}, {
				name: 'passwordItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-forgot-password-form-password',
				validateStatus: "{{data.other.error.password?'error':'success'}}",
				help: '{{data.other.error.password}}',
				_visible: '{{data.other.step==2}}',
				children: [{
					name: 'password',
					component: 'Input',
					className: 'pwdInput',
					value: '{{data.form.password}}',
					placeholder: "新密码（6-20位至少包括一个字母和一个数字）",
					type: 'password',
					onChange: `{{function(e){$fieldChange('data.form.password',e.target.value)}}}`,
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					}
				}]
			}, {
				name: 'confirmPasswordItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-forgot-password-form-confirmPassword',
				validateStatus: "{{data.other.error.confirmPassword?'error':'success'}}",
				help: '{{data.other.error.confirmPassword}}',
				_visible: '{{data.other.step==2}}',
				children: [{
					name: 'confirmPassword',
					component: 'Input',
					value: '{{data.form.confirmPassword}}',
					className:'rePwdInput',
					placeholder: "确认新密码",
					type: 'password',
                    onBlur: `{{function(e){data.form.confirmPassword == data.form.password ? '' : $setField('data.other.error.confirmPassword','两次密码输入不一致，请确认')}}}`,
					onChange: `{{function(e){$fieldChange('data.form.confirmPassword',e.target.value)}}}`,
					prefix: {
						name: 'prefix',
						component: '::span',
						children: [{
							name: 'require',
							component: '::span',
							className: 'ant-form-item-required'
						}]
					}
				}]
			}, {
				name: 'relogin',
				component: '::div',
				className: 'ttk-edf-app-forgot-password-form-relogin',
				_visible: '{{data.other.step==3}}',
				children:[{
					name: 'success',
					component: '::div',
					children: [{
						name: 'successIcon',
						component: 'Icon',
						fontFamily: 'edficon',
						type: 'chenggongtishi'
					}, {
						name: 'text',
						component: '::span',
						style: {marginLeft: '8px'},
						children: '密码修改成功'
					}]
				}, {
					name: 'reloginBtn',
					component: '::div',
					children:['重新登陆（','{{data.reLoginTime}}',')']
				}]
			}, {
				name: 'modifyItem',
				className: 'ttk-edf-app-forgot-password-form-modify',
				component: 'Form.Item',
				_visible: '{{data.other.step==2}}',
				children: [{
					name: 'modify',
					// disabled: '{{$checkNext()}}',
					component: 'Button',
					type: 'softly',
					children: '重置密码',
					onClick: '{{$modify}}'
				}]
			}, {
				name: 'loginItem',
				component: 'Form.Item',
				className: 'formBottom',
				_visible: '{{data.other.step!=3}}',
				children: [{
					name: 'prev',
					component: '::a',
					children: '上一步',
					className: 'prev',
					onClick: '{{$prev}}',
					_visible: '{{data.other.step==2}}'
				},{
					name: 'login',
					component: '::a',
					style: { float: 'right' },
					children: '返回登录',
					className: 'backToLogin',
					onClick: '{{$goLogin}}'
				}]
			}]
		}, {
			name: 'footer',
			className: 'ttk-edf-app-login-footer',
			component: 'Layout',
			children: [{
				name: 'item1',
				component: '::p',
				children: [{
					name: 'item1',
					component: '::span',
					children: '企业开发平台'
				}
				//  ,{
				// 	name: 'item2',
				// 	component: '::a',
				// 	href: 'http://www.miitbeian.gov.cn',
				// 	children: '14007298'
				// }, {
				// 	name: 'item3',
				// 	component: '::span',
				// 	children: '号'
				// }
			]
			}]
		}]
	}
}


export function getInitState(option) {
	var state = {
		data: {
			form: {
				mobile: '',
				password: '',
				confirmPassword: '',
				captcha: ''
			},
			reLoginTime: 5,
			time: '获取验证码',
            timeStaus:true,
			other: {
				step: 1,
				error: {}
			}
		}
	}
	return state
}