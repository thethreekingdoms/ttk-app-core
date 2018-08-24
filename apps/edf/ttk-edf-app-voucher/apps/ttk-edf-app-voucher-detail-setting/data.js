import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-voucher-detail-setting',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'ttk-edf-app-voucher-detail-setting-form',
			children: [{
				name: 'nameItem',
				component: 'Form.Item',
				label: '字段名称',
				_visible: '{{!(data.other.target != "tbodys")}}',
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
				name: 'fieldNameItem',
				component: 'Form.Item',
				label: '字段名称',
				_visible: '{{data.other.target != "tbodys"}}',
				required: true,
				validateStatus: "{{data.other.error.fieldName?'error':'success'}}",
				help: '{{data.other.error.fieldName}}',
				children: [{
					name: 'fieldName',
					component: 'Input',
					value: '{{data.form.fieldName}}',
					onChange: "{{function(e){$fieldChange('data.form.fieldName',e.target.value)}}}"
				}]
			},{
				name: 'captionItem',
				component: 'Form.Item',
				label: '字段标题',
				required: true,
				validateStatus: "{{data.other.error.caption?'error':'success'}}",
				help: '{{data.other.error.caption}}',
				children: [{
					name: 'caption',
					component: 'Input',
					value: '{{data.form.caption}}',
					onChange: "{{function(e){$fieldChange('data.form.caption',e.target.value)}}}"
				}]
			},{
				name: 'colIndexItem',
				component: 'Form.Item',
				label: '显示顺序',
				required: true,
				children: [{
					name: 'colIndex',
					component: 'Input.Number',
					value: '{{data.form.colIndex}}',
					onChange: `{{function(v){$fieldChange('data.form.colIndex',v)}}}`
				}]
			},{
				name: 'isVisibleItem',
				component: 'Form.Item',
				label: '是否显示',
				children: [{
					name: 'isVisible',
					component: 'Checkbox',
					checked: '{{data.form.isVisible}}',
					onChange: `{{function(e){$fieldChange('data.form.isVisible', e.target.checked)}}}`
				}]
			},{
				name: 'isMustSelectItem',
				component: 'Form.Item',
				label: '是否必选',
				_visible: '{{data.other.target != "tbodys"}}',
				children: [{
					name: 'isMustSelect',
					component: 'Checkbox',
					checked: '{{data.form.isMustSelect}}',
					onChange: `{{function(e){$fieldChange('data.form.isMustSelect', e.target.checked)}}}`
				}]
			},{
				name: 'isSystemItem',
				component: 'Form.Item',
				label: '是否系统字段',
				_visible: '{{data.other.target != "tbodys"}}',
				children: [{
					name: 'isSystem',
					component: 'Checkbox',
					checked: '{{data.form.isSystem}}',
					onChange: `{{function(e){$fieldChange('data.form.isSystem', e.target.checked)}}}`
				}]
			}]
		}]
	}
}


export function getInitState() {
	var state = {
		data: {
			form: {
				code: '',
				name: '',
				voucherTableId: false
			},
			other: {
				target: '',
				error: {}
			}
		}
	}
	return state
}