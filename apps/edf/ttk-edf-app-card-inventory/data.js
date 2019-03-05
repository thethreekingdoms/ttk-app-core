export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'ttk-edf-app-card-inventory',
        children: {
            name: 'form',
            component: 'Form',
            className: 'ttk-edf-app-card-inventory-form',
            children: [
                {
                    name: 'propertyItem',
                    component: 'Form.Item',
                    label: '存货及服务分类',
                    className:"ttk-edf-app-card-inventory-form-sort",
                    required: true,
                    validateStatus: "{{data.other.error.property?'error':'success'}}",
                    help: '{{data.other.error.property}}',
                    children: {
                        name: 'property',
                        component: 'Select',
                        showSearch: false,
                        optionFilterProp: "children",
                        value: '{{data.form.property&&JSON.stringify(data.form.property)}}',
                        onChange: '{{$propertyChange}}',
                        children: {
                            name: 'selectItem',
                            component: 'Select.Option',
                            value: '{{JSON.stringify(data.other.property[_rowIndex])}}',
                            children: '{{data.other.property[_rowIndex].name}}',
                            _power: 'for in data.other.property'
                        }
                    }
                }, {
                    name: 'propertyDetailItem',
                    component: 'Form.Item',
                    label: '明细分类',
                    required: true,
                    _visible: '{{data.isProperty}}',
                    validateStatus: "{{data.other.error.propertyDetail?'error':'success'}}",
                    help: '{{data.other.error.propertyDetail}}',
                    children: {
                        name: 'property',
                        component: 'Select',
                        showSearch: false,
                        optionFilterProp: "children",
                        value: '{{data.form.propertyDetail&&JSON.stringify(data.form.propertyDetail)}}',
                        onChange: '{{$propertyDetailChange}}',
                        children: {
                            name: 'selectItem',
                            component: 'Select.Option',
                            value: '{{JSON.stringify(data.other.propertyDetailFilter[_rowIndex])}}',
                            children: '{{data.other.propertyDetailFilter[_rowIndex].name}}',
                            _power: 'for in data.other.propertyDetailFilter'
                        }
                    }
                }, {
                    name: 'line',
                    component: 'Layout',
                    className: 'title',
                    children: [{
                        name: 'info',
                        className: 'info',
                        component: 'span',
                        children: '存货信息'
                    }, {
                        name: 'line',
                        className: 'line',
                        component: 'span',
                        children: ''
                    }]
                }, {
                    name: 'codeItem',
                    component: 'Form.Item',
                    label: '存货编码',
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
                    name: 'nameItem',
                    component: 'Form.Item',
                    label: '存货名称',
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
                    name: 'sizeItem',
                    component: 'Form.Item',
                    label: '规格型号',
                    children: {
                        name: 'specification',
                        component: 'Input',
                        maxlength: '50',
                        value: '{{data.form.specification}}',
                        onChange: "{{function(e){$sf('data.form.specification',e.target.value)}}}"
                    }
                }, {
                    name: 'unitItem',
                    component: 'Form.Item',
                    label: '计量单位',
                    required: true,
                    validateStatus: "{{data.other.error.unit?'error':'success'}}",
                    help: '{{data.other.error.unit}}',
                    children: {
                        name: 'unit',
                        component: 'Select',
                        showSearch: false,
                        optionFilterProp: "children",
                        value: '{{data.form.unit&&data.form.unit.id}}',
                        onChange: `{{function(v){$fieldChange('data.form.unit',data.other.unit.filter(function(data){return data.id == v})[0])}}}`,
                        dropdownFooter: {
                            name: 'add',
                            component: 'Button',
                            type: 'primary',
                            style: { width: '100%', borderRadius: '0' },
                            onClick: '{{$addUnit}}',
                            children: '新增单位'
                        },
                        children: {
                            name: 'selectItem',
                            component: 'Select.Option',
                            value: '{{data.other.unit[_rowIndex].id}}',
                            children: '{{data.other.unit[_rowIndex].name}}',
                            _power: 'for in data.other.unit'
                        }
                    }
                }, {
                    name: 'taxRateItem',
                    component: 'Form.Item',
                    label: '税率',
                    required: true,
                    validateStatus: "{{data.other.error.rate?'error':'success'}}",
                    help: '{{data.other.error.rate}}',
                    children: {
                        name: 'rate',
                        component: 'Select',
                        showSearch: false,
                        optionFilterProp: "children",
                        value: '{{data.form.rate&&data.form.rate.id}}',
                        onChange: `{{function(v){$fieldChange('data.form.rate',data.other.rate.filter(function(data){return data.id == v})[0])}}}`,
                        children: {
                            name: 'selectItem',
                            component: 'Select.Option',
                            value: '{{data.other.rate[_rowIndex].id}}',
                            children: '{{data.other.rate[_rowIndex].name}}',
                            _power: 'for in data.other.rate'
                        }
                    }
                }, {
                    name: 'name',
                    component: 'div',
                    style:{width:'50px',display:'inline-block'}
                }, {
                    name: 'taxClassificationCodeItem',
                    component: 'Form.Item',
                    label: '税收分类编码',
                    children: {
                        name: 'property',
                        component: 'Select',
	                    className:'ttk-edf-app-card-inventory-taxCode',
                        allowClear: true,
                        value: '{{data.form.taxClassificationId}}',
                        placeholder: "输入关键字搜索",
                        notFoundContent: '{{$taxNotFound()}}',
                        filterOption: false,
                        dropdownMatchSelectWidth: false,
                        dropdownClassName: 'ttk-edf-app-card-inventory-taxCodeDropdown',
                        onSearch: '{{$fetchUser}}',
                        onChange: '{{$tacChange}}',
                        children: '{{$taxOption()}}'
                    }
                }, {
                    name: 'taxClassificationNameItem',
                    component: 'Form.Item',
                    label: '税收分类名称',
                    children: {
                        name: 'taxClassificationName',
                        component: 'Input',
                        disabled: true,
                        maxlength: '50',
                        value: '{{data.form.taxClassificationName}}',
                        onChange: "{{function(e){$sf('data.form.taxClassificationName',e.target.value)}}}"
                    }
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
        },

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
            isProperty: false,
            other: {
                error: {},
            },
            taxCode: {
                data: [],
                value: [],
                fetching: false,
            }
        }
    }
}
