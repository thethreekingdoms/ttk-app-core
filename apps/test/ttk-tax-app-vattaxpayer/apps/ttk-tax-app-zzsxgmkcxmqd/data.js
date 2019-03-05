
export function getMeta() {
    return {
        name: 'root',
        component: 'div',
        className: 'ttk-tax-app-zzsxgmkcxmqd',
        children: [{
            name: 'content',
            className: 'ttk-tax-app-zzsxgmkcxmqd-content',
            component: 'div',
            children: [{
                name: 'top',
                className: 'ttk-tax-app-zzsxgmkcxmqd-content-top theader',
                component: 'div',
                children: [{
                    name: 'top',
                    component: 'div',
                    children: [{
                        name: 'nsrsbh',
                        component: 'div',
                        className: 'nsrsbh',
                        children: ["纳税人识别号：", {
                            name: 'title',
                            component: '::span',
                            children: '{{$renderTitle(data.sbbhead.nsrsbh)}}'
                        }]
                    }, {
                        name: 'date',
                        component: 'div',
                        className: 'date',
                        children: '{{"税款所属期：" +(data.sbbhead.skssqq || "") + " 至 " + (data.sbbhead.skssqz || "")}}',
                    }]
                },{
                    name: 'top',
                    component: 'div',
                    children: [{
                        name: 'nsrsbh',
                        component: 'div',
                        className: 'nsrsbh',
                        children: '{{"主管税务机关名称："+ (data.zgswjgmc || "")}}',
                    }, {
                        name: 'date',
                        component: 'div',
                        className: 'date',
                        children: '{{"主管税务机关代码："+ (data.zgswjgdm || "")}}',
                    }]
                },{
                    name: 'bottom',
                    component: 'div',
                    children: [{
                        name: 'nsrmc',
                        component: 'div',
                        className: 'nsrmc',
                        children: '{{"纳税人名称（公章）："+ (data.sbbhead.nsrmc || "")}}',
                    },  {
                        name: 'sbrq1',
                        component: 'div',
                        className: 'sbrq1',
                        children: '{{"填表日期："+(data.sbbhead.sbrq1||"")}}',
                    }, {
                        name: 'unit',
                        component: 'div',
                        className: 'unit',
                        children: '金额单位：元至角分'
                    }]
                }]
            }, {
                name: 'table',
                component: 'div',
                className: 'ttk-tax-app-zzsxgmkcxmqd-content-body zzsxgmkcxmqd',
                children: [{
                    name: 'zzsxgmkcxmqdTable',
                    component: 'div',
                    className: 'zsxgmkcxmqd-table',
                    children: {
                        pagination: false,
                        className: 'ttk-tax-app-zzsxgmkcxmqd-content-table zzsxgmkcxmqd',
                        name: 'zzsxgmkcxmqd',
                        component: 'Table',
                        pagination: false,
                        allowColResize: false,
                        enableSequenceColumn: true,
                        bordered: true,
                        dataSource: '{{data.zzsxgmkcxmqd}}',
                        // scroll:{ x: 866 },
                        noCalculate: true,
                        columns: [{
                                title: '凭证种类',
                                dataIndex: 'pzzl',
                                key: 'pzzl',
                                width: 128,
                                align: 'center',
                                render: "{{function(text, record, index){return $renderSelect(index, text)} }}"
                            // }, {
                            //     title: '栏次',
                            //     dataIndex: 'C02',
                            //     key: 'C02',
                            //     width: 41,
                            //     align: 'center',
                            //     render: "{{function(text, record, index){return index+1} }}"
                            }, {
                                title:'开票方纳税人识别号',
                                dataIndex: 'kpfnsrsbh',
                                key: 'kpfnsrsbh',
                                align: 'right',
                                width: 128,
                                render: "{{ function(text, record, index){return $renderInput('kpfnsrsbh', index, text)} }}"
                            },{
                                title:'开票方单位名称',
                                dataIndex: 'kpfdwmc',
                                key: 'kpfdwmc',
                                align: 'right',
                                width: 128,
                                render: "{{ function(text, record, index){return $renderInput('kpfdwmc', index, text)} }}"
                            },{
                                title:'发票代码',
                                dataIndex: 'fpdm',
                                key: 'fpdm',
                                align: 'right',
                                width: 128,
                                render: "{{function(text, record, index){return $renderInput('fpdm', index, text)}}}"
                            },{
                                title:'发票号码',
                                dataIndex: 'fphm',
                                key: 'fphm',
                                align: 'right',
                                width: 128,
                                render: "{{ function(text, record, index){return $renderInput('fphm', index, text)} }}"
                            },{
                                title:'服务项目名称',
                                dataIndex: 'fwxmmc',
                                key: 'fwxmmc',
                                align: 'right',
                                width: 128,
                                render: "{{function(text, record, index){return $renderInput('fwxmmc', index, text)}}}"
                            },{
                                title:'允许扣除项目金额',
                                dataIndex: 'yxkcxmje',
                                key: 'yxkcxmje',
                                align: 'right',
                                width: 128,
                                render: "{{ function(text, record, index){return $renderNumber('yxkcxmje', index, text)} }}"
                            },{
                                title:'开票日期',
                                dataIndex: 'kjrq',
                                key: 'kjrq',
                                align: 'right',
                                width: 128,
                                render: "{{function(text, record, index){return $renderDate( index, text)}}}"
                            },{
                                title:'操作',
                                dataIndex: 'C08',
                                key: 'C08',
                                width: 65,
                                align: 'center',
                                render: "{{function(text, record, index){return $renderButton(index)} }}"
                            }],
                    }
                }]
            }]
        }]
    }
}

export function getInitState() {
    return {
        data: {
            sbbhead: {
                nsrmc: '', //纳税人公章
                skssqq: '', //税款所属期起
                skssqz: '', //税款所属期止
            },
            zgswjgdm: '',
            zgswjgmc: '',
            isDeclare: false,   //false表示未申报
            zzsxgmkcxmqd: [{
                kjrq: '20180919',
                yxkcxmje: '20',
                fwxmmc: '木方',
                fphm: '222122332',
                fpdm: 'sadcdsvsadas',
                kpfdwmc: '水电费第三方',
                kpfnsrsbh: '师德师风的深V从',
                pzzl: '2'
            }, {
                kjrq: '--',
                yxkcxmje: '20',
                fwxmmc: '--',
                fphm: '--',
                fpdm: '--',
                kpfdwmc: '--',
                kpfnsrsbh: '--',
                pzzl: '合计'
            }], 
            pzzl: [{
                value: '1',
                lable: '发票',
            }, {
                value: '2',
                lable: '财政票据',
            }, {
                value: '3',
                lable: '境外签收单据',
            }, {
                value: '4',
                lable: '完税凭证',
            }, {
                value: '5',
                lable: '其它凭证',
            }], //凭证类型
            error: [],
            other: {
                isSetFocus: true,
                zzsxgmkcxmqd: [{
                    kjrq: '20180919',
                    yxkcxmje: '20',
                    fwxmmc: '木方',
                    fphm: '222122332',
                    fpdm: 'sadcdsvsadas',
                    kpfdwmc: '水电费第三方',
                    kpfnsrsbh: '师德师风的深V从',
                    pzzl: '2'
                }, {
                    kjrq: '--',
                    yxkcxmje: '20',
                    fwxmmc: '--',
                    fphm: '--',
                    fpdm: '--',
                    kpfdwmc: '--',
                    kpfnsrsbh: '--',
                    pzzl: '合计'
                }]
            }
        }
    }
}



