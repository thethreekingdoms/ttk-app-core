export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'app-card-currency',
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
                maxlength: '50',
                value: '{{data.form.code}}',
                onChange: "{{function(e){$sf('data.form.code',e.target.value);$changeCheck(1)}}}"
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
                maxlength: '20',
                value: '{{data.form.name}}',
	            onChange: `{{function(e){$sf('data.form.name',e.target.value);$changeCheck()}}}`,
            }]

        }, {
            name: 'exchangeRateItem',
            component: 'Form.Item',
            label: '汇率',
            required: true,
            validateStatus: "{{data.other.error.exchangeRate?'error':'success'}}",
            help: '{{data.other.error.exchangeRate}}',
            children: [{
                name: 'code',
                component: 'Input.Number',
                precision:'6',
                maxlength: '20',
	            disabled: '{{!!data.form.isBaseCurrency}}',
                value: '{{data.form.exchangeRate && (data.form.exchangeRate).toFixed(6)}}',
                onBlur: "{{function(e){$fieldChange('data.form.exchangeRate',e)}}}"
            }]

        }, {
            name: 'statusItem',
            component: 'Form.Item',
            label: '停用',
            children: [{
                name: 'isEnable',
                component: 'Checkbox',
	            disabled:'{{data.form.isBaseCurrency == true}}',
                checked: '{{!data.form.isEnable}}',
                onChange: "{{function(e){$sf('data.form.isEnable',!e.target.checked)}}}"
            }]
        }]
    }
}

export function getInitState() {
    return {
        data: {
            form: {
                code: '',
                name: '',
                isEnable: true
            },
            other: {
                error: {}
            }
        }
    }
}
