export function getMeta() {
	return {
		name: 'root',
		component: 'div',
		className: 'ttk-edf-app-my-setting',
		children: {
			name: 'content',
			component: 'div',
			className: 'ttk-edf-app-my-setting-content',
			children: {
				name: 'item',
				component: 'div',
				className: 'container',
				children: [{
					name: 'baseInfo',
					component: 'div',
					className: 'ttk-edf-app-my-setting-baseInfo',
					children: [{
						name: 'title',
						component: '::h1',
						className: 'ttk-edf-app-my-setting-baseInfo-title',
						children: '个人基础信息'
					}, {
						name: 'form',
						component: 'Form',
						className: 'ttk-edf-app-my-setting-baseInfo-form',
						children: [{
							name: 'photoItem',
							component: 'Form.Item',
							className: 'ttk-edf-app-my-setting-baseInfo-form-photo',
							required: true,
							children: [{
								name: 'container',
								component: 'div',
								children: [{
									name: 'photo',
									component: '::img',
									src: '{{$getPhoto(data.form.sex)}}'
								}
								]
							}]
						}, {
							name: 'detailItem',
							component: 'div',
							className: 'ttk-edf-app-my-setting-baseInfo-form-detail',
							children: [{
								name: 'sexItem',
								component: 'Form.Item',
								className: 'ttk-edf-app-my-setting-baseInfo-form-detail-sex',
								label: '性别',
								required: true,
								children: [{
									name: 'male',
									component: '::img',
									className: "{{data.form.sex == 1 ? 'selectImg' : 'unSelectImg'}}",
									src: '{{$getPhoto("1")}}',
									onClick: '{{function(e){$setField("data.form.sex", "1")}}}'
								}, {
									name: 'female',
									component: '::img',
									className: "{{data.form.sex == 2 ? 'selectImg' : 'unSelectImg'}}",
									src: '{{$getPhoto("2")}}',
									onClick: '{{function(e){$setField("data.form.sex", "2")}}}'
								},{
									name: 'other',
									component: '::img',
									className: "{{data.form.sex == 0 ? 'selectImg' : 'unSelectImg'}}",
									src: '{{$getPhoto("0")}}',
									onClick: '{{function(e){$setField("data.form.sex", "0")}}}'
								}]
							}, {
								name: 'mobileItem',
								component: 'Form.Item',
								label: '手机号',
								required: true,
								children: [{
									name: 'mobile',
									component: 'Input',
									disabled: 'disabled',
									value: '{{data.form.mobile}}',
								}]
							}, {
								name: 'nicknameItem',
								component: 'Form.Item',
								label: '昵称',
								required: true,
								validateStatus: "{{data.other.error.nickname?'error':'success'}}",
								help: '{{data.other.error.nickname}}',
								children: [{
									name: 'nickname',
									component: 'Input',
									onChange: "{{function(e){$fieldChange('data.form.nickname', e.target.value)}}}",
									value: '{{data.form.nickname}}',
								}]
							}
							]
						}, {
							name: 'saveItem',
							component: 'Form.Item',
							className: 'ttk-edf-app-my-setting-baseInfo-form-saveBtn',
							children: [{
								name: 'save',
								component: 'Button',
								type: 'primary',
								children: '保存',
								onClick: '{{$saveBaseInfo}}'
							}]

						}]
					}]

				}, {
					name: 'security',
					component: 'div',
					className: 'ttk-edf-app-my-setting-security',
					children: [{
						name: 'title',
						component: '::h1',
						className: 'ttk-edf-app-my-setting-baseInfo-title',
						style: { marginTop: '12px' },
						children: '安全设置'
					}, {
						name: 'item',
						component: 'div',
						className: 'ttk-edf-app-my-setting-security-box',
						children: [
						// 	{
						// 	name: 'level',
						// 	component: 'div',
						// 	className: '{{$getSecurityLevelClassName()}}',
						// 	children: [{
						// 		name: 'label',
						// 		component: '::e',
						// 		children: '安全等级:'
						// 	}, {
						// 		name: 'text',
						// 		component: '::span',
						// 		children: '{{$getSecurityLevelText()}}'
						// 	}, {
						// 		name: 'bar',
						// 		component: 'Progress',
						// 		percent: '{{data.form.securityLevel*20}}',
						// 		showInfo: false
						// 	}]
						// }, {
						// 	name: 'securityLevel',
						// 	component: 'div',
						// 	children: []
						// },
							{
							name: 'grid',
							component: 'div',
							className: 'ttk-edf-app-my-setting-security-grid',
							className: 'ttk-edf-app-my-setting-security-layout',
							children: [{
								name: 'password',
								className: 'ttk-edf-app-my-setting-security-grid-row',
								component: 'div',
								key: 'password',
								dataGrid: { x: 0, y: 0, w: 1, h: 1 },
								children: [{
									name: 'level',
									component: 'div',
									children: [
									// 	{
									// 	name: 'icon',
									// 	component: 'Icon',
									// 	type: '{{true ? "check" : "setting"}}'
									// }
									// , {
									// 	name: 'explain',
									// 	component: '::span',
									// 	children: '{{true ? "已完成" : "未完成"}}'
									// }
								]
								}, {
									name: 'type',
									component: 'div',
									children: {
										name: 'p',
										component: '::p',
										children: '登录密码'
									}
								}, {
									name: 'remind',
									component: 'div',
									children: [{
										name: 'p',
										component: 'div',
										className: 'pws',
										children: [{
											name: 'item1',
											component: '::span',
											className: 'pws-title',
											children: '密码强度'
										}, {
											name: 'text',
											component: '::span',
											className: 'pws-level',
											children: '{{$getPasswordStrength()}}'
										}, {
											name: 'bar',
											component: 'div',
											className: 'pws-bar',
											children: {
												name: 'bar',
												component: 'Progress',
												className: "{{$getColor()}}",
												style: {display: 'none'},
												percent: '{{data.form.securityLevel*20}}',
												showInfo: false
											}
										}]
									}, {
										name: 'p',
										component: '::p',
										children: '建议您设置为8个字符以上，包含数字、大小写字母、特殊字符的密码'
									}]
								}, {
									name: 'btn',
									component: 'div',
									children: [{
										name: 'btn',
										component: 'Button',
										onClick: '{{$changePassword}}',
										type: 'primary',
										children: '修改'
									}]
								}]
							}, {
								name: 'phone',
								className: 'ttk-edf-app-my-setting-security-grid-row',
								component: 'div',
								key: 'phone',
								dataGrid: { x: 1, y: 0, w: 1, h: 1 },
								children: [{
									name: 'level',
									component: 'div',
									children: [
									// 	{
									// 	name: 'icon',
									// 	component: 'Icon',
									// 	type: '{{true ? "check" : "setting"}}'
									// }
									// , {
									// 	name: 'explain',
									// 	component: '::span',
									// 	children: '{{true ? "已完成" : "未完成"}}'
									// }
								]
								}, {
									name: 'type',
									component: 'div',
									children: {
										name: 'p',
										component: '::p',
										children: '手机绑定'
									}
								}, {
									name: 'remind',
									component: 'div',
									children: {
										name: 'p',
										component: '::p',
										children: '{{"您绑定的手机为：" + data.form.mobile}}'
									}
								}, {
									name: 'btn',
									component: 'div',
									children: [{
										name: 'btn',
										component: 'Button',
										type: 'primary',
										onClick: '{{$changeMobile}}',
										children: '{{true ? "修改" : "绑定"}}'
									}]
								}]
							}
								//  {
								// 	name: 'email',
								// 	className: 'ttk-edf-app-my-setting-security-grid-row',
								// 	component: 'div',
								// 	key: 'email',
								// 	dataGrid: {x:2,y:0,w:1,h:1},
								// 	children: [{
								// 		name: 'level',
								// 		component: 'div',
								// 		children: [{
								// 			name: 'icon',
								// 			component: 'Icon',
								// 			type: '{{true ? "check" : "setting"}}'
								// 		}, {
								// 			name: 'explain',
								// 			component: '::span',
								// 			children: '{{true ? "已完成" : "未完成"}}'
								// 		}]
								// 	}, {
								// 		name: 'type',
								// 		component: 'div',
								// 		children: {
								// 			name: 'p',
								// 			component: '::p',
								// 			children: '邮箱绑定'
								// 		}
								// 	}, {
								// 		name: 'remind',
								// 		component: 'div',
								// 		children: {
								// 			name: 'p',
								// 			component: '::p',
								// 			children: '{{true ? "您绑定的邮箱为：y_sp_mail@163.com" : "绑定邮箱，账号安全一步到位"}}'
								// 		}
								// 	}, {
								// 		name: 'btn',
								// 		component: 'div',
								// 		children: [{
								// 			name: 'btn',
								// 			component: 'Button',
								// 			type: 'primary',
								// 			children: '{{true ? "修改" : "绑定"}}'
								// 		}]
								// 	}]
								// }
							]
						}]
					}]
				}]
			}

		}

	}
}

export function getInitState() {
	return {
		data: {
			form: { sex: '0' },
			other: {
				error: {

				}
			}
		}
	}
}