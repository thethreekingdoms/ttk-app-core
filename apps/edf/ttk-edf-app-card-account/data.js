export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'ttk-edf-app-card-account',
        children: [{
            name: 'bankAccountTypeItem',
            component: 'Form.Item',
            label: '账户类型',
            required: true,
            validateStatus: "{{data.other.error.bankAccountType?'error':'success'}}",
            help: '{{data.other.error.bankAccountType}}',
            children: {
                name: 'bankAccountType',
                component: 'Select',
                showSearch: false,
                disabled: '{{$updateDisabled()}}',
                value: '{{data.form.bankAccountType && data.form.bankAccountType.id && data.form.bankAccountType.id == 3000050001 ? "现金" : data.form.bankAccountType.id}}',
                onChange: "{{function(value){$fieldChange('data.form.bankAccountType',data.other.bankAccountType.filter(function(data){return data.id == value})[0])}}}",
                children: {
                    name: 'option',
                    component: 'Select.Option',
                    value: "{{data.other.bankAccountType && data.other.bankAccountType[_rowIndex].id}}",
                    children: '{{data.other.bankAccountType && data.other.bankAccountType[_rowIndex].name }}',
                    _power: 'for in data.other.bankAccountType'
                },
                style: {width: '100%'}
            }
        }, {
            name: 'code',
            component: 'Form.Item',
            label: '{{data.form.bankAccountType && data.form.bankAccountType.name == "银行" ? "账号" : "账户编码"}}',
            required: true,
            validateStatus: "{{data.other.error.code?'error':'success'}}",
            help: '{{data.other.error.code}}',
            children: {
                name: 'code',
                component: 'Input',
                disabled: '{{data.form.bankAccountType && data.form.bankAccountType.id == 3000050001}}',
                maxlength: '50',
                value: '{{data.form.code}}',
                onChange: "{{function(e){$sf('data.form.code',e.target.value);$changeCheck(1)}}}"
            }
        }, {
            name: 'name',
            component: 'Form.Item',
            label: '{{data.form.bankAccountType && data.form.bankAccountType.name == "银行" ? "开户银行" : "账户名称"}}',
            required: true,
            validateStatus: "{{data.other.error.name?'error':'success'}}",
            help: '{{data.other.error.name}}',
            children: {
                name: 'name',
                component: 'Input',
                disabled: '{{data.form.bankAccountType && data.form.bankAccountType.id == 3000050001}}',
                maxlength: '20',
                value: '{{data.form.name}}',
	            onChange: `{{function(e){$sf('data.form.name',e.target.value);$changeCheck()}}}`,
            }

        }, {
            name: 'openingBalanceItem',
            component: 'Form.Item',
            validateStatus: "{{data.other.error.beginningBalance?'error':'success'}}",
            help: '{{data.other.error.beginningBalance}}',
            label: '期初余额',
            children: {
                name: 'beginningBalance',
                component: 'Input.Number',
                disabled: '{{data.other.haveMonthlyClosing}}',
                precision:'2',
                maxlength: '20',
                value: '{{data.form.beginningBalance && (data.form.beginningBalance).toFixed(2)}}',
                onBlur: "{{function(e){$fieldChange('data.form.beginningBalance',e)}}}"
            }
        }, {
            name: 'earlyMonthsItem',
            component: 'Form.Item',
            label: '期初月份',
            children: {
                name: 'earlyMonths',
                component: 'Input.Number',
                disabled: true,
                maxlength: '20',
                value: '{{data.form.earlyMonths}}',
                onChange: "{{function(e){$sf('data.form.earlyMonths',e)}}}"
            }
        }, {
            name: 'footer',
            component: 'Layout',
            children: [{
                name: 'statusItem',
                component: 'Form.Item',
                label: '停用',
                children: [{
                    name: 'isEnable',
                    component: 'Checkbox',
                    disabled: '{{data.form.bankAccountType && data.form.bankAccountType.id == 3000050001}}',
                    checked: '{{!data.form.isEnable}}',
                    onChange: "{{function(e){$sf('data.form.isEnable',!e.target.checked)}}}"
                }]
            }, {
                name: 'defaultAccountItem',
                component: 'Form.Item',
                label: '默认',
                children: {
                    name: 'isDefault',
                    component: 'Checkbox',
                    disabled: '{{data.form.bankAccountType && data.form.bankAccountType.id == 3000050001}}',
                    checked: '{{data.form.isDefault}}',
                    onChange: "{{function(e){$sf('data.form.isDefault',e.target.checked)}}}"
                }
            }]
        }]
    }
}

export function getInitState() {
    return {
        data: {
            form: {
                bankAccountType: '',
                isEnable: true
            },
            other: {
                error: {},
            },
        }
    }
}
