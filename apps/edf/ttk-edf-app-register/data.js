import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-register',
		children: [{
			name: 'header',
			className: 'ttk-edf-app-register-header',
			component: 'Layout',
			children: [{
				name: 'header-left',
				component: 'Layout',
				className: 'ttk-edf-app-register-header-left',
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
					children: '企业注册'
				}]
			}, {
				name: 'header-right',
				className: 'ttk-edf-app-register-header-right',
				component: '::a',
				onClick: '{{$goLogin}}',
				children: ['登录']
			}]
		}, {
			name: 'form',
			component: 'Form',
			className: 'ttk-edf-app-register-form',
			children: [{
				name: 'titleItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-register-form-title',
				children: '企业注册'
			}, {
				name: 'barItem',
				component: '::div',
				className: 'ttk-edf-app-register-form-bar',
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
						children: ['设置用户名']
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
						children: ['企业信息']
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
						children: ['注册成功']
					}]
				}]
			}, {
				name: 'mobileItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-register-form-mobile',
				validateStatus: "{{data.other.error.mobile?'error':'success'}}",
				_visible: '{{data.other.step==1}}',
				help: '{{data.other.error.mobile}}',
				children: [{
					name: 'mobile',
					component: 'Input',
					value: '{{data.form.mobile}}',
					placeholder: "请输入手机号",
					onFocus: "{{function(e){$fieldChange('data.form.mobile', e.target.value)}}}",
					onChange: "{{function(e){$fieldChange('data.form.mobile', e.target.value)}}}",
					onBlur: "{{function(e){$fieldChange('data.form.mobile', e.target.value, 'next')}}}",
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
				name: 'passwordItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-register-form-password',
				validateStatus: "{{data.other.error.password?'error':'success'}}",
				_visible: '{{data.other.step==1}}',
				help: '{{data.other.error.password}}',
				children: [{
					name: 'password',
					component: 'Input',
					value: '{{data.form.password}}',
					placeholder: "请输入密码（6-20位，至少包含一个字母和数字）",
					type: 'password',
					onFocus: "{{function(e){$fieldChange('data.form.password',e.target.value)}}}",
					onChange: "{{function(e){$setField('data.form.password',e.target.value)}}}",
					// onBlur: "{{function(e){$fieldChange('data.form.password',e.target.value, 'next')}}}",
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
				className: 'ttk-edf-app-register-form-captcha',
				validateStatus: "{{data.other.error.captcha?'error':'success'}}",
				_visible: '{{data.other.step==1}}',
				help: '{{data.other.error.captcha}}',
				children: [{
					name: 'captcha',
					component: 'Input',
					value: '{{data.form.captcha}}',
					placeholder: "请输入验证码",
					type: 'captcha',
					onFocus: `{{function(e){$fieldChange('data.form.captcha',e.target.value)}}}`,
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
						style:{fontSize: "14px",color: '#999999', width: '88px'},
						disabled: '{{!data.form.mobile || !!data.other.error.mobile || !data.timeStaus }}',
						onClick: '{{$getCaptcha}}',
						children: '{{data.time}}'
					}
				}]
			}, {
				name: 'orgItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-register-form-org',
				validateStatus: "{{data.other.error.org?'error':'success'}}",
				_visible: '{{data.other.step==2}}',
				help: '{{data.other.error.org}}',
				children: [{
					name: 'org',
					component: 'Input',
					value: '{{data.form.org}}',
					placeholder: "请输入企业名称",
					onChange: '{{function(e){$fieldChange("data.form.org", e.target.value)}}}',
					onBlur: `{{function(e){$fieldChange('data.form.org',e.target.value)}}}`,
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
				name: 'industryItem',
				component: 'Form.Item',
				_visible: '{{data.other.step==9}}',
				children: [{
					name: 'industry',
					component: 'Select',
					showSearch:false,
					defaultValue: '{{data.industry && data.industry[0].id}}',
					placeholder: "行业",
					//onFocus: '{{$industrysFocus}}',
					onBlur: "{{function(v){$setField('data.form.industry', v)}}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.industry[_rowIndex].id}}',
						children: '{{data.industry[_rowIndex].name}}',
						_power: 'for in data.industry'
					}
				}]
			}, {
				name: 'vatTaxpayerItem',
				component: 'Form.Item',
				_visible: '{{data.other.step==2}}',
				validateStatus: "{{data.other.error.vatTaxpayer?'error':'success'}}",
				help: '{{data.other.error.vatTaxpayer}}',
				children: [{
					name: 'vatTaxpayer',
					component: 'Select',
					showSearch:false,
					value: '{{data.form.vatTaxpayer}}',
					placeholder: "请选择纳税人身份",
					onFocus: '{{function(){$setField("data.other.error.vatTaxpayer", null)}}}',
					onChange: "{{function(v){$fieldChange('data.form.vatTaxpayer', v)}}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.vatTaxpayer[_rowIndex].id}}',
						children: '{{data.vatTaxpayer[_rowIndex].name}}',
						_power: 'for in data.vatTaxpayer'
					}
				}]
			}, {
				name: 'enabledDateItem',
				component: 'Form.Item',
				className: 'ttk-edf-app-register-form-date',
				_visible: '{{data.other.step==3 && !data.other.editDate}}',
				validateStatus: "{{data.other.error.enableDate?'error':'success'}}",
				help: '{{data.other.error.enableDate}}',
				required: true,
				children: [{
					name: 'enabledDate',
					component: 'DatePicker.MonthPicker',
					defaultValue: "{{$stringToMoment((data.form.enableDate),'YYYY-MM')}}",
					placeholder: "启用期间",
					onFocus: '{{function(){$setField("data.other.error.enableDate", null)}}}',
					onChange: "{{function(v){$sf('data.form.enableDate', $momentToString(v,'YYYY-MM'))}}}",
				}]
			}, {
				name: 'enabledDateItem',
				component: '::div',
				className: 'ttk-edf-app-register-form-editDate',
				_visible: '{{data.other.step==3 && data.other.editDate}}',
				required: true,
				children: [{
					name: 'item1',
					component: '::span',
					children: '启用期间：'
				}, {
					name: 'item2',
					component: '::span',
					children: '{{data.form.enableDate}}'
				}, {
					name: 'item3',
					component: 'Icon',
					className: 'editBtn',
					fontFamily: 'edficon',
                    type: 'bianji',
					onClick: '{{$changeDateState}}'
				}]
			}, {
				name: 'Standard',
				component: '::div',
				className: 'ttk-edf-app-register-form-editStandard',
				_visible: '{{data.other.step==3 && data.other.editStandard}}',
				required: true,
				children: [{
					name: 'item1',
					component: '::span',
					children: '会计准则：'
				}, {
					name: 'item1',
					component: '::span',
					children: '{{data.form.accountingStandardsName}}'
				}, {
					name: 'item3',
					component: 'Icon',
					className: 'editBtn',
					fontFamily: 'edficon',
                    type: 'bianji',
					onClick: '{{$changeStandardState}}'
				}]
			}, {
				name: 'accountingStandardsItem',
				component: 'Form.Item',
				_visible: '{{data.other.step==3 && !data.other.editStandard}}',
				validateStatus: "{{data.other.error.accountingStandards?'error':'success'}}",
				help: '{{data.other.error.accountingStandards}}',
				children: [{
					name: 'accountingStandards',
					component: 'Select',
					showSearch:false,
					value: '{{data.form.accountingStandard}}',
					placeholder: "会计准则",
					onFocus: '{{function(){$setField("data.other.error.accountingStandards", null)}}}',
					onChange: "{{function(v){$setField('data.form.accountingStandard', v)}}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.accountingStandards[_rowIndex].id}}',
						children: '{{data.accountingStandards[_rowIndex].name}}',
						_power: 'for in data.accountingStandards'
					}
				}]
			}, {
				name: 'userregisterItem',
				className: 'ttk-edf-app-register-form-register',
				component: 'Form.Item',
				children: [{
					name: 'userregister',
					component: 'Button',
					type: 'softly',
					disabled: '{{$checkNext()}}',
					children: "{{data.other.step==3? '立即体验' : '下一步'}}",
					onClick: '{{$userregister}}'
				}]
			}, {
				name: 'back',
				component: '::div',
				_visible: '{{data.other.step >= 2}}',
				className:'backLastStep',
				children: {
					name: 'content',
					component: '::span',
					onClick: '{{$backLastStep}}',
					children: '返回上一步'
				}
			}, {
				name: 'loginItem',
				component: 'Form.Item',
				_visible: '{{data.other.step==1}}',
				children: [{
					name: 'agree',
					component: 'Checkbox',
					checked: '{{data.form.agree}}',
					onChange: "{{function(e){$sf('data.form.agree',e.target.checked)}}}",
					children: '同意'
				}, {
					name: 'agreement',
					component: '::a',
					onClick: '{{$showAgreement}}',
					className: 'protocol',
					style: {color: '#1EB5AD'},
					children: '《用户协议条款》'
				}, {
					name: 'login',
					component: '::span',
					className: 'gologin',
					style: { float: 'right' },
					children: ['已有账户 ', {
						name: 'login',
						component: '::a',
						style: {color: '#1EB5AD'},
						children: '请登录',
						onClick: '{{$goLogin}}'
					}]
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
				// , {
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

    let state = {
        data: {
            form: {
                mobile: '',
                password: '',
                captcha: '',
                org: '',
                industry: '',
                agree: true,
                enableDate: '',
                accountingStandard: '',
                accountingStandardsName: ''
            },
            time: '获取验证码',
            timeStaus:true,
            other: {
                sysOrg: {},
                step: 1,
                error: {},
                editDate: true,
                editStandard: true
            }
        }
    }
    return state
}