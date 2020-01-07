export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'ttk-edf-app-card-supplier',
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
                maxlength: '200',
                value: '{{data.form.name}}',
	            onChange: `{{function(e){$sf('data.form.name',e.target.value);$changeCheck()}}}`,
            }]

        }, {
            name: 'taxNumberItem',
            component: 'Form.Item',
            label: '税号',
            validateStatus: "{{data.other.error.taxNumber?'error':'success'}}",
            help: '{{data.other.error.taxNumber}}',
            children: [{
                name: 'taxNumber',
                component: 'Input',
                maxlength: '20',
                value: '{{data.form.taxNumber}}',
                onChange: "{{function(e){$fieldChange('data.form.taxNumber',e.target.value)}}}"
            }]
        }, {
            name: 'linkmanItem',
            component: 'Form.Item',
            label: '联系人',
            children: [{
                name: 'linkman',
                component: 'Input',
                maxlength: '50',
                value: '{{data.form.linkman}}',
                onChange: "{{function(e){$sf('data.form.linkman',e.target.value)}}}"
            }]
        }, {
            name: 'contactNumberItem',
            component: 'Form.Item',
            label: '联系电话',
            children: [{
                name: 'contactNumber',
                component: 'Input',
                maxlength: '20',
                value: '{{data.form.contactNumber}}',
                onChange: "{{function(e){$sf('data.form.contactNumber',e.target.value)}}}"
            }]
        }, {
            name: 'openingBankItem',
            component: 'Form.Item',
            label: '开户银行',
            children: [{
                name: 'openingBank',
                component: 'Input',
                maxlength: '50',
                value: '{{data.form.openingBank}}',
                onChange: "{{function(e){$sf('data.form.openingBank',e.target.value)}}}"
            }]
        }, {
            name: 'bankAccoutItem',
            component: 'Form.Item',
            label: '账号',
            children: [{
                name: 'bankAccout',
                component: 'Input',
                maxlength: '50',
                value: '{{data.form.bankAccout}}',
                onChange: "{{function(e){$sf('data.form.bankAccout',e.target.value)}}}"
            }]
        }, {
            name: 'addressAndTelItem',
            component: 'Form.Item',
            label: '地址及电话',
            children: [{
                name: 'addressAndTel',
                component: 'Input.TextArea',
                maxlength: '200',
                value: '{{data.form.addressAndTel}}',
                onChange: "{{function(e){$sf('data.form.addressAndTel',e.target.value)}}}"
            }]
        }, {
            name: 'remarkItem',
            component: 'Form.Item',
            label: '备注',
            children: [{
                name: 'remark',
                component: 'Input.TextArea',
                maxlength: '200',
                value: '{{data.form.remark}}',
                onChange: "{{function(e){$sf('data.form.remark',e.target.value)}}}"
            }]
        }, {
            name: 'statusItem',
            component: 'Form.Item',
            label: '停用',
            children: [{
                name: 'isEnable',
                component: 'Checkbox',
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
