export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className:'ttk-edf-app-my-setting-change-mobile',
		children: {
			name: 'form',
			component: 'Form',
			className: 'changeMobile',
			children: [{
				name: 'oldMobile',
				component: 'Form.Item',
				colon: false,
				label: '原手机号',
				children: {
					name: 'input',
					component: 'Input',
					disabled: true,
					value: '{{data.form.oldMobile}}',
					style: {width: '270px', height:'30px'},
					onBlur: `{{function (e){$fieldChange('data.form.oldMobile',e.target.value)}}}`,
				}
			}, {
				name: 'password',
				component: 'Form.Item',
				colon: false,
				label: '密码',
				validateStatus: "{{data.error.password?'error':'success'}}",
				help: '{{data.error.password}}',
				children: {
					name: 'input',
					type: 'password',
					value: '{{data.form.password}}',
					component: 'Input',
					style: {width: '270px', height:'30px'},
					onBlur: `{{function (e){$fieldChange('data.form.password',e.target.value)}}}`,
				}
			}, {
				name: 'newMobile',
				component: 'Form.Item',
				colon: false,
				label: '新手机号',
				validateStatus: "{{data.error.newMobile?'error':'success'}}",
				help: '{{data.error.newMobile}}',
				children: {
					name: 'input',
					value: '{{data.form.newMobile}}',
					component: 'Input',
					style: {width: '270px', height:'30px'},
					onFocus: "{{function(e){$fieldChange('data.form.newMobile', e.target.value)}}}",
					onChange: "{{function(e){$fieldChange('data.form.newMobile', e.target.value)}}}",
					onBlur: "{{function(e){$fieldChange('data.form.newMobile', e.target.value, 'change')}}}",
				}
			}, {
				name: 'captcha',
				component: 'Form.Item',
				colon: false,
				label: '验证码',
				validateStatus: "{{data.error.captcha?'error':'success'}}",
				help: '{{data.error.captcha}}',
				children: {
					name: 'captcha',
					component: 'Input',
					style: {width: '270px', height:'30px'},
					value: '{{data.form.captcha}}',
					placeholder: "请输入验证码",
					type: 'captcha',
					onFocus: "{{function(){$setField('data.error.captcha',undefined)}}}",
					onChange: "{{function(e){$setField('data.form.captcha',e.target.value)}}}",
					addonAfter: {
						name: 'suffix',
						component: 'Button',
						style: {width: '76px'},
						disabled: '{{!data.form.newMobile || !!data.error.newMobile || !data.timeStaus }}',
						onClick: '{{$getCaptcha}}',
						children: '{{data.time}}'
					}
				}
			}]
		}
	}
}

export function getInitState() {
	return {
		data: {
			form: {
				oldMobile: '',
				password: '',
				newMobile: '',
				captcha: ''
			},
			time: '获取验证码',
			timeStaus:true,
			error: {

			}
		}
	}
}