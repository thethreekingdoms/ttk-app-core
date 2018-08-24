import {consts} from 'edf-consts'

export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'app-company-manage-add',
        style: {background: '#fff'},
        children: [{
            name: 'method',
            component: '::div',
            className: 'app-company-manage-add-method',
            _visible: '{{!data.showAdd}}',
            children: {
                name: 'content',
                component: '::div',
                className: 'app-company-manage-add-method-content',
                children: [{
                    name: 'import',
                    component: '::div',
                    className: 'app-company-manage-add-method-import',
                    onClick: '{{$importCompany}}',
                    children: [{
                        name: 'import',
                        component: '::div',
                        children: [{
                            name: 'icon',
                            component: 'Icon',
                            fontFamily: 'edficon',
                            className: 'importIcon',
                            type: 'daoru'
                        }, {
                            name: 'span',
                            component: '::span',
                            children: '导入企业',
                            style: {color: '#47ACE1'},
                        }]
                    }, {
                        name: 'explain',
                        component: '::div',
                        children: '将其他财务软件的数据导入本系统，导入过程就创建了企业。'
                    }]
                }, {
                    name: 'directCreate',
                    component: '::div',
                    className: 'app-company-manage-add-method-direct',
                    onClick: '{{$toAddCompany}}',
                    children: [{
                        name: 'direct',
                        component: '::div',
                        children: [{
                            name: 'icon',
                            component: 'Icon',
                            fontFamily: 'edficon',
                            style: {marginRight: '-4px', color: '#EA9518'},
                            type: 'chuangjianqiye'
                        }, {
                            name: 'span',
                            component: '::span',
                            style: {color: '#EA9518'},
                            children: '创建企业'
                        }]
                    }, {
                        name: 'explain',
                        component: '::div',
                        children: '手工新增企业，并录入初始化数据。适合之前手工帐或不需要把以前的凭证导进来的企业'
                    }]
                }]
            }
        }, {
            name: 'directAdd',
            component: '::div',
            _visible: '{{data.showAdd}}',
            children: [{
                name: 'btnGroup',
                component: '::div',
                className: 'app-company-manage-add-header',
                style: {padding: '0px 100px'},
                children: [{
                    name: 'del',
                    component: 'Layout',
                    children: '创建企业',
                    className: 'app-company-manage-add-header-title'
                }]
            }, {
                name: 'content',
                component: '::div',
                className: 'app-company-manage-add-content',
                style: {padding: '0px 200px'},
                children: [{
                    name: 'item1',
                    component: '::div',
                    // validateStatus: "{{data.other.error.mobile?'error':'success'}}",
                    // help: '{{data.other.error.mobile}}',
                    className: 'app-company-manage-add-content-item1',
                    children: [{
                        name:'div',
                        component:'::div',
                        style:{width:'400px',display:'flex',alignItems:'flex-start',flexDirection:'column'},
                        children:[{
                            name: 'nameItem1',
                            component: 'Form.Item',
                            label: '企业名称',
                            required: true,
                            style: {display: 'flex'},
                            validateStatus: "{{data.other.error.name?'error':'success'}}",
                            help: '{{data.other.error.name}}',
                            children: [{
                                name: 'name',
                                component: 'Input',
                                placeholder: '请输入营业执照的企业名称',
                                style: {width: '290px', height: '32px'},
                                onBlur: "{{function(e){$fieldChange('data.form.name', e.target.value, 'create')}}}",
                                value: '{{data.form.name}}',
                                onChange: "{{function(e){$fieldChange('data.form.name', e.target.value)}}}",
                            }]
                        }, {
                            name: 'vatTaxpayerItem',
                            component: 'Form.Item',
                            label: '纳税人身份',
                            required: true,
                            style: {display: 'flex'},
                            // style: {display: 'flex', width: '50%', margin: '0 auto'},
                            validateStatus: "{{data.other.error.vatTaxpayer?'error':'success'}}",
                            help: '{{data.other.error.vatTaxpayer}}',
                            children: [{
                                name: 'vatTaxpayer',
                                component: 'Select',
                                // allowClear: true,
                                showSearch:false,
                                style: {width: '290px', height: '30px'},
                                value: '{{data.form.vatTaxpayer}}',
                                placeholder: "纳税人身份",
                                onSelect: "{{function(v){$setField('data.form.vatTaxpayer', v)}}}",
                                children: {
                                    name: 'option',
                                    component: 'Select.Option',
                                    value: '{{data.vatTaxpayer[_rowIndex].id}}',
                                    children: '{{data.vatTaxpayer[_rowIndex].name}}',
                                    _power: 'for in data.vatTaxpayer'
                                }
                            }]
                        }, {
                            name: 'enabledDateItem',
                            component: 'Form.Item',
                            label: '启用期间',
                            required: true,
                            _visible: '{{data.other.editDate}}',
                            style: {display: 'flex'},
                            // style: {display: 'flex', width: '50%', margin: '0 auto'},
                            children: [{
                                name: 'item',
                                component: '::div',
                                children: [{
                                    name: 'item2',
                                    component: '::span',
                                    children: '{{data.form.enabledDate}}'
                                }, {
                                    name: 'item3',
                                    className:'editBtn',
                                    component: 'Icon',
                                    fontFamily: 'edficon',
                                    type: 'bianji',
                                    onClick: '{{$changeDateState}}'
                                }]
                            }]
                        }, {
                            name: 'enabledDateItem',
                            component: 'Form.Item',
                            _visible: '{{!data.other.editDate}}',
                            label: '启用期间',
                            required: true,
                            style: {display: 'flex'},
                            // style: {display: 'flex', width: '50%', margin: '0 auto'},
                            validateStatus: "{{data.other.error.enableDate?'error':'success'}}",
                            help: '{{data.other.error.enableDate}}',
                            children: [{
                                name: 'enabledDate',
                                component: 'DatePicker.MonthPicker',
                                style: {width: '290px', height: '30px'},
                                defaultValue: "{{$stringToMoment((data.form.enabledDate),'YYYY-MM')}}",
                                placeholder: "启用期间",
                                onChange: "{{function(v){$sf('data.form.enabledDate', $momentToString(v,'YYYY-MM'))}}}",
                            }]
                        }, {
                            name: 'Standard',
                            component: 'Form.Item',
                            label: '会计准则',
                            required: true,
                            _visible: '{{data.other.editStandard}}',
                            style: {display: 'flex'},
                            // style: {display: 'flex', width: '50%', margin: '0 auto'},
                            children: [{
                                name: 'item1',
                                component: '::span',
                                children: '{{data.form.accountingStandardsName}}'
                            }, {
                                name: 'item3',
                                className:'editBtn',
                                component: 'Icon',
                                fontFamily: 'edficon',
                                type: 'bianji',
                                onClick: '{{$changeStandardState}}'
                            }]
                        }, {
                            name: 'accountingStandardsItem',
                            component: 'Form.Item',
                            _visible: '{{!data.other.editStandard}}',
                            label: '企业会计准则',
                            required: true,
                            style: {display: 'flex', margin: '0 auto 0'},
                            validateStatus: "{{data.other.error.accountingStandards?'error':'success'}}",
                            help: '{{data.other.error.accountingStandards}}',
                            children: [{
                                name: 'accountingStandards',
                                component: 'Select',
                                showSearch:false,
                                // allowClear: true,
                                style: {width: '290px', height: '30px'},
                                value: '{{data.form.accountingStandards}}',
                                placeholder: "企业会计准则",
                                //onFocus: '{{$accountingStandardsFocus}}',
                                onChange: "{{function(v,o){$setField('data.form.accountingStandards', v)}}}",
                                children: {
                                    name: 'option',
                                    component: 'Select.Option',
                                    value: '{{data.accountingStandards[_rowIndex].id}}',
                                    children: '{{data.accountingStandards[_rowIndex].name}}',
                                    _power: 'for in data.accountingStandards'
                                }
                            }]
                        }]
                    }]
                }]
            }, {
                name: 'btn',
                component: '::div',
                className: 'app-company-manage-add-btn',
                children: [{
                    name: 'add',
                    component: 'Button',
                    children: '取消',
                    onClick: '{{$cancel}}',
                    className: 'app-company-manage-add-btn-cancel'
                }, {
                    name: 'cancel',
                    component: 'Button',
                    // type:'primary',
                    children: '创建',
                    onClick: '{{$create}}',
                    className: 'app-company-manage-add-btn-create'
                }]
            }]
        }]
        
    }
}

export function getInitState() {
    return {
        data: {
            form: {
                name: '',
                enabledDate: '',
                vatTaxpayer: '',
                accountingStandards: '',
                accountingStandardsName: ''
            },
            other: {
                propertyList: [],
                error: {},
                editDate: true,
                editStandard: true
            },
            manageList: [],
            showAdd: false
        }
    }
}