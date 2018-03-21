export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-home-capital-account',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'ttk-edf-app-home-capital-account-header',
			children: [{
				name: 'left',
				component: '::div',
				className: 'ttk-edf-app-home-capital-account-header-left',
				children: [{
					name: 'title',
					component: '::span',
					className: 'ttk-edf-app-home-capital-account-header-left-title',
					children: '资金账户'
				},{
					name: 'selectTime',
					component: '::div',
					className: 'ttk-edf-app-home-capital-account-header-left-select',
					children: {
						name: 'timeSelect',
						className: '',
						component: 'Select',
						showSearch: false,
						value: '{{data.period}}',
						dropdownClassName: 'selectDate',
						onSelect:'{{function(v){$setField("data.period",v)}}}',
						children: {
							name:'option',
							component: 'Select.Option',
							children: '{{data.periodList && data.periodList[_rowIndex]}}',
							key: '{{data.periodList && data.periodList[_rowIndex]}}',
							_power: 'for in data.periodList'
						}
					}
				}]
			}, {
				name: 'button',
				component: '::span',
				className: 'ttk-edf-app-home-capital-account-header-right',
				children: {
					name: 'icon',
					component: 'Icon',
					showStyle: 'showy',
					fontFamily: 'edficon',
					type: 'shuaxin',
					onClick: '{{$refresh}}'
				}
			}]
		},{
			name: 'main',
			component: 'Layout',
			className: 'ttk-edf-app-home-capital-account-main',
			children:[{
				name: 'list',
				component: '::p',
				className: 'ttk-edf-app-home-capital-account-main-total',
				children: [{
					name: 'span',
					component: '::span',
					children: '合计：'
				},{
					name: 'number',
					component: '::span',
					children: '{{data.accountSumAmount || 0}}'
				}]
			},{
				name: 'bankdeposit',
				component: '::div',
				className: 'bankdeposit',
				onClick: '{{$openBalancesum("accountToBankAccountAmountMap")}}',
				children: [{
					name: 'icon',
					component: 'Icon',
					showStyle: 'showy',
					fontFamily: 'edficon',
					type: 'yinhangqia',
				},{
					name: 'title',
					component: '::span',
					children: '银行账户：'
				},{
					name: 'number',
					component: '::a',
					children: '{{data.capitalAccount && data.capitalAccount.accountToBankAccountAmountMap ? data.capitalAccount.accountToBankAccountAmountMap[1] : 0}}'
				}]
			},{
				name: 'cash',
				component: '::div',
				className: 'cash',
				onClick: '{{$openBalancesum("accountToCashAccountAmountMap")}}',
				children: [{
					name: 'icon',
					component: 'Icon',
					showStyle: 'showy',
					fontFamily: 'edficon',
					type: 'xianjin',
				},{
					name: 'title',
					component: '::span',
					children: '现金账户：'
				},{
					name: 'number',
					component: '::a',
					children: '{{data.capitalAccount && data.capitalAccount.accountToCashAccountAmountMap ? data.capitalAccount.accountToCashAccountAmountMap[1] : 0}}'
				}]
			},{
				name: 'alipay',
				component: '::div',
				className: 'alipay',
				onClick: '{{$openBalancesum("accountToAlipayAmountMap")}}',
				_visible: '{{data.capitalAccount && !!data.capitalAccount.accountToAlipayAmountMap}}',
				children: [{
					name: 'icon',
					component: 'Icon',
					showStyle: 'showy',
					fontFamily: 'edficon',
					type: 'zhifubao',
				},{
					name: 'title',
					component: '::span',
					children: '支付宝：'
				},{
					name: 'number',
					component: '::a',
					children: '{{data.capitalAccount && data.capitalAccount.accountToAlipayAmountMap ? data.capitalAccount.accountToAlipayAmountMap[1] : 0}}'
				}]
			},{
				name: 'wechat',
				component: '::div',
				className: 'wechat',
				onClick: '{{$openBalancesum("accountToWeChatAmountMap")}}',
				_visible: '{{data.capitalAccount && !!data.capitalAccount.accountToWeChatAmountMap}}',
				children: [{
					name: 'icon',
					component: 'Icon',
					showStyle: 'showy',
					fontFamily: 'edficon',
					type: 'weixin',
				},{
					name: 'title',
					component: '::span',
					children: '微信：'
				},{
					name: 'number',
					component: '::a',
					children: '{{data.capitalAccount && data.capitalAccount.accountToWeChatAmountMap ? data.capitalAccount.accountToWeChatAmountMap[1] : 0}}'
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			
		}
	}
}