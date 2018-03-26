import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'edfx-app-tree-table-detail',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'edfx-app-tree-table-detail-form',
			children: [{
				name: 'codeItem',
				component: 'Form.Item',
				label: '编码',
				required: true,
				validateStatus: "{{data.other.error.code?'error':'success'}}",
				help: '{{data.other.error.code}}',
				children: [{
					name: 'code',
					component: 'Input',
					value: '{{data.form.code}}',
					onChange: "{{function(e){$fieldChange('data.form.code',e.target.value)}}}"
				}]
			}, {
				name: 'nameItem',
				component: 'Form.Item',
				label: '名称',
				required: true,
				validateStatus: "{{data.other.error.name?'error':'success'}}",
				help: '{{data.other.error.name}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: "{{function(e){$fieldChange('data.form.name',e.target.value)}}}"
				}]
			}, {
				name: 'appNameItem',
				component: 'Form.Item',
				label: '应用名称',
				children: [{
					name: 'appName',
					component: 'Input',
					value: '{{data.form.appName}}',
					onChange: "{{function(e){$fieldChange('data.form.appName',e.target.value)}}}"
				}]
			}, {
				name: 'parentItem',
				component: 'Form.Item',
				label: '上级菜单',
				children: [{
					name: 'option',
					component: 'Select',
					showSearch: false,
					allowClear: true,
					value: '{{data.form.parentId ? data.form.parentId: undefined }}',
					onChange: "{{$parentMenuChange}}",
					onFocus: "{{$parentMenuFocus}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: "{{ data.other.parents ? data.other.parents[_rowIndex].id : undefined}}",
						children: '{{data.other.parents ? data.other.parents[_rowIndex].name : undefined}}',
						_power: 'for in data.other.parents'
					}
				}]
			}, {
				name: 'showOrderItem',
				component: 'Form.Item',
				label: '显示顺序',
				children: [{
					name: 'showOrder',
					component: 'Input',
					value: '{{data.form.showOrder}}',
					onChange: "{{function(e){$fieldChange('data.form.showOrder',e.target.value)}}}"
				}]
			}, {
				name: 'operations',
				component: 'Form.Item',
				label: '功能权限',
				children: [{
					name: 'cb',
					component: 'Checkbox.Group', 
					options:'{{data.other.options}}',
					value:'{{data.other.selectedOperations}}',
					onChange: '{{$selectOperations}}'
				}]
			}]
		}]
	}
}


export function getInitState() {
	var state = {
		data: {
			form: {
				name: '',
			},
			other: {
				error: {}
			}
		}
	}
	return state
}