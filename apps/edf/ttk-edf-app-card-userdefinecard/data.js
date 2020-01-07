export function getMeta() {
    return {
        name: 'root',
        component: 'div',
        className: 'ttk-edf-app-card-userdefinecard',
        children: [{
            name: 'archivesName',
            component: 'div',
            className: 'ttk-edf-app-card-userdefinecard-archivesname',
            _visible: "{{data.archivesName ? true : false}}",
            children: [{
                name: 'name',
                component: 'Form.Item',
                label: '自定义档案名称',
                required: true,
                validateStatus: "{{data.other.error.name?'error':'success'}}",
                help: '{{data.other.error.name}}',
                children: {
                    name: 'name',
                    component: 'Input',
                    maxlength: '20',
                    value: '{{data.form.name}}',
	                onChange: `{{function(e){$sf('data.form.name',e.target.value);$changeCheck()}}}`,
                }

            }]
        }, {
            name: 'ttk-edf-app-card-userdefinecard-archive',
            component: 'div',
            className: 'archives-name',
            _visible: "{{data.archivesName ? false : true}}",
            children: [{
                name: 'codeItem',
                component: 'Form.Item',
                label: '编码',
                required: true,
                validateStatus: "{{data.other.error.code?'error':'success'}}",
                help: '{{data.other.error.code}}',
                children: {
                    name: 'code',
                    component: 'Input',
                    maxlength: '50',
                    value: '{{data.form.code}}',
                    onChange: "{{function(e){$sf('data.form.code',e.target.value);$changeCheck(1)}}}"
                }

            }, {
                name: 'name',
                component: 'Form.Item',
                label: '名称',
                required: true,
                validateStatus: "{{data.other.error.name?'error':'success'}}",
                help: '{{data.other.error.name}}',
                children: {
                    name: 'name',
                    component: 'Input',
                    maxlength: '20',
                    value: '{{data.form.name}}',
	                onChange: `{{function(e){$sf('data.form.name',e.target.value);$changeCheck()}}}`,
                }

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
        }]
    }
}

export function getInitState() {
    return {
        data: {
            archivesName: false,
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
