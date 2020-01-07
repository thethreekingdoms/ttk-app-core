export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'ttk-edf-app-card-department',
        children: [{
            name: 'nameItem',
            component: 'Form.Item',
            label: '部门名称',
            required: true,
            validateStatus: "{{data.other.error.name?'error':'success'}}",
            help: '{{data.other.error.name}}',
            children: [{
                name: 'name',
                component: 'Input',
                maxlength: '50',
                value: '{{data.form.name}}',
                onChange: `{{function(e){$sf('data.form.name',e.target.value);$changeCheck()}}}`,
            }]

        }, {
            name: 'attributeItem',
            component: 'Form.Item',
            label: '部门属性',
            required: true,
            validateStatus: "{{data.other.error.attribute?'error':'success'}}",
            help: '{{data.other.error.attribute}}',
            children: [{
                name: 'department',
                component: 'Select',
                showSearch: false,
                optionFilterProp:"children",
                width: 100,
                value: '{{data.form.attribute && data.form.attribute.id}}',
                onChange: `{{function(v){$fieldChange('data.form.attribute',data.other.attributes.filter(function(data){return data.id == v})[0])}}}`,
                children: {
                    name: 'option',
                    component: 'Select.Option',
                    value: '{{data.other.attributes && data.other.attributes[_rowIndex].id }}',
                    children: '{{data.other.attributes && data.other.attributes[_rowIndex].name }}',
                    _power: 'for in data.other.attributes'
                }
            }]

        }]
    }
}

export function getInitState() {
    return {
        data: {
            form: {
                name: ''
            },
            other: {
                error: {}
            }
        }
    }
}
