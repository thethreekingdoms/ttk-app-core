
export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-role',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'ttk-edf-app-role-form',
			children: [ {
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