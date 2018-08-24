import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-column-detail',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'ttk-edf-app-column-detail-form',
			children: [{
				name: 'fieldNameItem',
				component: 'Form.Item',
				label: '字段名称',
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
				name: 'fieldTypeItem',
				component: 'Form.Item',
				label: '字段类型',
				children: [{
					name: 'fieldType',
					component: 'Select',
					allowClear: true,
					value: '{{data.form.idFieldType}}',
					onFocus: '{{$fieldTypeFocus}}',
					onChange: "{{function(v){$setField('data.form.idFieldType', v)}}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.other.fieldTypes[_rowIndex].id}}',
						children: '{{data.other.fieldTypes[_rowIndex].name}}',
						_power: 'for in data.other.fieldTypes'
					}
				}]
			},{
				name: 'widthItem',
				component: 'Form.Item',
				label: '宽度',
				children: [{
					name: 'width',
					component: 'Input.Number',
					value: '{{data.form.width}}',
					onChange: `{{function(v){$fieldChange('data.form.width',v)}}}`
				}]
			},{
				name: 'defPrecisionItem',
				component: 'Form.Item',
				label: '默认精度',
				children: [{
					name: 'defPrecision',
					component: 'Input.Number',
					value: '{{data.form.defPrecision}}',
					onChange: `{{function(v){$fieldChange('data.form.defPrecision',v)}}}`
				}]
			},{
				name: 'alignItem',
				component: 'Form.Item',
				label: '对齐方式',
				children: [{
					name: 'align',
					component: 'Select',
					allowClear: true,
					value: '{{data.form.idAlignType}}',
					onFocus: '{{$alignTypeFocus}}',
					onChange: "{{function(v){$setField('data.form.idAlignType', v)}}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.other.alignTypes[_rowIndex].id}}',
						children: '{{data.other.alignTypes[_rowIndex].name}}',
						_power: 'for in data.other.alignTypes'
					}
				}]
			},{
				name: 'orderModeItem',
				component: 'Form.Item',
				label: '排序方式',
				children: [{
					name: 'orderMode',
					component: 'Select',
					allowClear: true,
					value: '{{data.form.idOrderMode}}',
					onFocus: '{{$orderModeFocus}}',
					onChange: "{{function(v){$setField('data.form.idOrderMode', v)}}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.other.orderModes[_rowIndex].id}}',
						children: '{{data.other.orderModes[_rowIndex].name}}',
						_power: 'for in data.other.orderModes'
					}
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
				name: 'isFixedItem',
				component: 'Form.Item',
				label: '是否固定列',
				children: [{
					name: 'isFixed',
					component: 'Checkbox',
					checked: '{{data.form.isFixed}}',
					onChange: `{{function(e){$fieldChange('data.form.isFixed', e.target.checked)}}}`
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
			},
			other: {
				error: {}
			}
		}
	}
	return state
}