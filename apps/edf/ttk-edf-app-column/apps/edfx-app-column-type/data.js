import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-column-type',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'ttk-edf-app-column-type-form',
			children: [{
				name: 'codeItem',
				component: 'Form.Item',
				label: '栏目编码',
				required: true,
				validateStatus: "{{data.other.error.code?'error':'success'}}",
				help: '{{data.other.error.code}}',
				children: [{
					name: 'code',
					component: 'Input',
					value: '{{data.form.code}}',
					onChange: "{{function(e){$fieldChange('data.form.code',e.target.value)}}}"
				}]
			},{
				name: 'nameItem',
				component: 'Form.Item',
				label: '栏目名称',
				required: true,
				validateStatus: "{{data.other.error.name?'error':'success'}}",
				help: '{{data.other.error.name}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: "{{function(e){$fieldChange('data.form.name',e.target.value)}}}"
				}]
			},{
				name: 'isDefaultItem',
				component: 'Form.Item',
				label: '是否为默认方案',
				children: [{
					name: 'isDefault',
					component: 'Checkbox',
					checked: '{{data.form.isDefault}}',
					onChange: `{{function(e){$fieldChange('data.form.isDefault', e.target.checked)}}}`
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