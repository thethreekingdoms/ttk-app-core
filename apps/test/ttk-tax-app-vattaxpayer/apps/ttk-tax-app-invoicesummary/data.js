export function getMeta() {
		return {
			name: 'root',
			component: '::div',
			className: 'ttk-tax-app-invoicesummary',
			children: [{
					name: 'ttk-tax-app-invoicesummary-tab',
					component: '::div',
					className: 'ttk-tax-app-invoicesummary-tab',
					children: [{
						name: 'tabNav',
						component: 'Tabs',
						activeKey: '{{data.other.tabId}}',
						onChange: "{{function(e){$tabChange('data.other.tabId', e)}}}",
						children: [{
							name: "option",
							component: 'Tabs.TabPane',
							tab: [{
								name: 'tab',
								component: '::div',
								children: '{{ data.other.tabArr && data.other.tabArr[_rowIndex].name }}'
							}],
							key: "{{ data.other.tabArr && data.other.tabArr[_rowIndex].id }}",
							_power: 'for in data.other.tabArr'
						}]
					}, {
						name: 'dateRange',
						component: '::span',
						className: 'dateRange',
						children: '{{ "税款所属期：" + (data.other.option ? data.other.option.skssqq : "") + " 至 " + (data.other.option ? data.other.option.skssqz : "") }}',
					}, {
						name: 'batch',
						component: 'Dropdown.AntButton',
						onClick: '{{$oneKeyCollectClick}}',
						className: 'dropdownbutton oneKey-collect',
						overlay: {
							name: 'menu',
							component: 'Menu',
							onClick: '{{$moreActionOpeate}}',
							children: [
								{
									name: 'emptyInvoice',
									component: 'Menu.Item',
									className: "app-asset-list-disposal",
									key: 'emptyInvoice',
									children: '清空发票'
								}
							]
						},
						children: '采集发票'
					}]
			},{
					name: 'content',
					className: 'ttk-tax-app-invoicesummary-content',
					component: 'Layout',
					children: [{
						name: 'invoices-group',
						className: 'invoices-group',
						component: '::div',
						_visible: '{{!data.list.length}}',
						children: [{
							name: 'invoices-word',
							component: '::p',
							className: 'invoices-word',
							children: '{{$getWord()}}',
						}, {
							name: 'invoices-btn',
							component: 'Button',
							className: 'invoices-btn',
							type: 'primary',
							children: '采集发票',
							onClick: '{{$oneKeyCollectClick}}'
						}],
					}, {
						name: 'content',
						className: 'ttk-tax-app-invoicesummary-table',
						component: 'Table',
						key: '{{data.other.tabId}}',
						pagination: false,
						allowColResize: false,
						enableSequenceColumn: false,
						bordered: true,
						scroll: '{{data.list.length > 0 ? data.tableOption : {} }}',
						dataSource: '{{data.list}}',
						rowSelection: '{{$getRowSelection()}}',
						columns: '{{$tableColumns()}}',
						rowClassName: '{{$renderRowClassName}}',
					}]
				}
			]
		}
}

export function getInitState() {
	return {
		data: {
			list: [],
			loading: false,
			tableOption: {
				y: null,
			},
			other: {
				tabId: '01',
				tabArr: [{
					"id":"01","name":"销项发票统计"
				},{
					"id":"02","name":"进项发票统计"
				}],
				isVattaxpayer: false,
				isChanged: false,
			}
		}
	}
}