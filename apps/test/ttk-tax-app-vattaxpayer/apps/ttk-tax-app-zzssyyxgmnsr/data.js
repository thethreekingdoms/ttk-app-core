export function getMeta() {
    return {
        name: 'tax-table',
        component: 'div',
        className: 'ttk-tax-app-zzsxgmGrid',
        children: [{
            component: 'div',
            className: 'theader',
            children: [{
                name: 'top',
                component: 'div',
                children: [{
                    name: 'nsrsbh',
                    component: 'div',
                    className: 'nsrsbh',
                    children: ["纳税人识别号：", {
                        name: 'title',
                        component: 'span',
                        children: '{{$renderTitle(data.zzssyyxgmnsr.sbbhead.nsrsbh)}}'
                    }]
                }, {
                    name: 'date',
                    component: 'div',
                    className: 'date',
                    children: '{{"税款所属期：" +(data.zzssyyxgmnsr.sbbhead.skssqq || "") + " 至 " + (data.zzssyyxgmnsr.sbbhead.skssqz || "")}}',
                }]
            }, {
                name: 'bottom',
                component: 'div',
                children: [{
                    name: 'nsrmc',
                    component: 'div',
                    className: 'nsrmc',
                    children: '{{"纳税人名称（公章）："+ (data.zzssyyxgmnsr.sbbhead.nsrmc || "")}}',
                }, {
                    name: 'sbrq1',
                    component: 'div',
                    className: 'sbrq1',
                    children: '{{"填表日期："+(data.zzssyyxgmnsr.sbbhead.sbrq1||"")}}',
                }, {
                    name: 'unit',
                    component: 'div',
                    className: 'unit',
                    children: '金额单位：元至角分'
                }]
            }]
        }, {
            pagination: false,
            className: 'ttk-tax-app-vatTaxpayer-table',
            name: 'table1',
            component: 'Table',
            pagination: false,
            allowColResize: false,
            enableSequenceColumn: true,
            bordered: true,
            dataSource: '{{data.tTable}}',
            noCalculate: true,
            path: 'root.children.content.children.table',
            scroll: { x: 956 },
            columns: [
                {
                    title: '项目',
                    dataIndex: 't1',
                    colSpan: 2,
                    width: 29,
                    render: "{{function(text, record, index){return $renderCell('t1', index, text)} }}"
                }
                , {
                    title: '',
                    dataIndex: 't2',
                    key: 't2',
                    width: 297,
                    colSpan: 0,
                    render: "{{function(text, record, index){return $renderCell('t2', index, text)} }}"
                }
                , {
                    title: '栏次',
                    dataIndex: 't3',
                    key: 't3',
                    width: 90,
                    render: "{{function(text, record, index){return $renderCell('t3', index, text)} }}"
                }, {
                    title: '本期数',
                    children: [
                        {
                            title: '货物及劳务',
                            dataIndex: 'C01',
                            key: 'C01',
                            align: 'right',
                            width: 128,
                            render: "{{ function(text, record, index){return $renderCell('C01', index, text)} }}"
                        }, {
                            title: '服务、不动产和无形资产',
                            dataIndex: 'C02',
                            key: 'C02',
                            align: 'right',
                            width: 151,
                            render: "{{function(text, record, index){return $renderCell('C02', index, text)} }}"
                        }
                    ]
                }, {
                    title: '本年累计',
                    children: [
                        {
                            title: '货物及劳务',
                            dataIndex: 'C03',
                            key: 'C03',
                            align: 'right',
                            width: 128,
                            render: "{{ function(text, record, index){return $renderCell('C03', index, text)} }}"
                        }, {
                            title: '服务、不动产和无形资产',
                            dataIndex: 'C04',
                            key: 'C04',
                            align: 'right',
                            width: 151,
                            render: "{{function(text, record, index){return $renderCell('C04', index, text)} }}"
                        }
                    ]
                }
            ]
        }, {
            component: 'div',
            className: 'formData',
            children: [
                {
                    component: 'div',
                    className: 'tform1Top',
                    children: [{
                        component: "div",
                        className: 'tform1Top-cell',
                        children: '{{$renderSelectCell("sfzxsb",data.zzssyyxgmnsr.slxxForm.sfzxsb, "Radio", "N")}}'
                    }, {
                        component: "div",
                        className: 'tform1Top-cell',
                        children: '办理人员身份证件类型： ',
                    }, {
                        component: "div",
                        className: 'tform1Top-cell',
                        children: '{{$renderSelectCell("blrysfzjlxDm",data.zzssyyxgmnsr.slxxForm.blrysfzjlxDm, "Select",(data.zzssyyxgmnsr.slxxForm.sfzxsb=="N"&&!data.zzssyyxgmnsr.slxxForm.blrysfzjlxDm) )}}'
                    }, {
                        component: "div",
                        className: 'tform1Top-cell',
                        children: '办理人员身份证件号码： '
                    }, {
                        component: "div",
                        className: 'tform1Top-cell',
                        children: '{{$renderFormCell("blrysfzjhm",data.zzssyyxgmnsr.slxxForm.blrysfzjhm, "Input", (data.zzssyyxgmnsr.slxxForm.sfzxsb=="N"&&!data.zzssyyxgmnsr.slxxForm.blrysfzjhm) )}}'
                    }]
                },
                {
                    component: 'div',
                    className: 'tform1Left',
                    children: {
                        className: 'tform1LeftText',
                        component: 'p',
                        children: '纳税人或代理人声明：此纳税申报表是根据国家税收法律的规定填报的，我确定它是真实的、可靠的、完整的。'
                    }
                }, {
                    component: 'Form',
                    className: 'tform1Right',
                    children: [
                        {
                            component: 'Form.Item',
                            wrapperCol: 16,
                            className: 'colSpan4',
                            children: [
                                {
                                    component: 'span',
                                    children: '如纳税人填报，由纳税人填写以下各栏： ',
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: [
                                {
                                    component: 'span',
                                    children: '办税人员：',
                                }
                            ]
                        }
                        , {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: '{{$renderFormCell("bsrxm",data.zzssyyxgmnsr.slxxForm.bsrxm, "Input",false)}}'
                            // children: [
                            //     {
                            //         component:'span',
                            //         // children: '{{data.zzssyyxgmnsr.slxxForm.bsrxm}}',
                            //         children: '{{$renderFormCell("bsrxm",data.zzssyyxgmnsr.slxxForm.bsrxm, "Input")}}'                                    
                            //     }
                            // ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: [
                                {
                                    component: 'span',
                                    children: '财务负责人：',
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: '{{$renderFormCell("cwfzrxm",data.zzssyyxgmnsr.slxxForm.cwfzrxm, "Input",false)}}'
                            // children: [
                            //     {
                            //         component:'span',
                            //         // children: '{{data.zzssyyxgmnsr.slxxForm.cwfzrxm}}',
                            //         children: '{{$renderFormCell("cwfzrxm",data.zzssyyxgmnsr.slxxForm.cwfzrxm, "Input")}}'                                    
                            //     }
                            // ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: [
                                {
                                    component: 'span',
                                    children: '法定代表人：',
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: '{{$renderFormCell("fddbrxm",data.zzssyyxgmnsr.slxxForm.fddbrxm, "Text",false)}}'
                            // children: [
                            //     {
                            //         component:'span',
                            //         // children: '{{data.zzssyyxgmnsr.slxxForm.fddbrxm}}',
                            //         children: '{{$renderFormCell("fddbrxm",data.zzssyyxgmnsr.slxxForm.fddbrxm, "Input")}}'                                    
                            //     }
                            // ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: [
                                {
                                    component: 'span',
                                    children: '联系电话：',
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: '{{$renderFormCell("bsrlxdh",data.zzssyyxgmnsr.slxxForm.bsrlxdh, "Input",false)}}'
                            // children: [
                            //     {
                            //         component:'span',
                            //         // children: '{{data.zzssyyxgmnsr.slxxForm.bsrlxdh}}',
                            //         children: '{{$renderFormCell("bsrlxdh",data.zzssyyxgmnsr.slxxForm.bsrlxdh, "Input")}}'                                    
                            //     }
                            // ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 16,
                            className: 'colSpan4',
                            children: [
                                {
                                    component: 'span',
                                    children: '如委托代理人填报，由代理人填写以下各栏：',
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            className: 'rowSpan2',
                            children: [
                                {
                                    component: 'span',
                                    children: '代理人名称（公章）：',
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            className: 'rowSpan2',
                            children: '{{$renderFormCell("slrxm",data.zzssyyxgmnsr.slxxForm.slrxm, "Input",(data.zzssyyxgmnsr.slxxForm.sfzxsb=="N"&&!data.zzssyyxgmnsr.slxxForm.slrxm))}}'
                            // children: [
                            //     {
                            //         component:'span',
                            //         // children: ' ',
                            //         children: '{{$renderFormCell("slrxm",data.zzssyyxgmnsr.slxxForm.slrxm, "Input")}}'                                    
                            //     }
                            // ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: [
                                {
                                    component: 'span',
                                    children: '经办人：',
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: '{{$renderFormCell("jbrxm",data.zzssyyxgmnsr.slxxForm.jbrxm, "Input",false)}}'
                            // children: [
                            //     {
                            //         component:'span',
                            //         // children: '{{data.zzssyyxgmnsr.slxxForm.jbrxm}}',
                            //         children: '{{$renderFormCell("jbrxm",data.zzssyyxgmnsr.slxxForm.jbrxm, "Input")}}'                                    
                            //     }
                            // ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: [
                                {
                                    component: 'span',
                                    children: '联系电话： '
                                }
                            ]
                        }, {
                            component: 'Form.Item',
                            wrapperCol: 4,
                            children: '{{$renderFormCell("jbrlxdh",data.zzssyyxgmnsr.slxxForm.jbrlxdh, "Input",false)}}'
                            // children: [
                            //     {
                            //         component:'span',
                            //         // children: '{{data.zzssyyxgmnsr.slxxForm.jbrlxdh}}'
                            //         // children: '{{data.zzssyyxgmnsr.slxxForm.jbrlxdh}}'
                            //         children: '{{$renderFormCell("jbrlxdh",data.zzssyyxgmnsr.slxxForm.jbrlxdh, "Input")}}'                                    
                            //     }
                            // ]
                        }
                    ]
                }
            ]
        }]

    }
}

export function getInitState() {
    return {
        data: {
            zzssyyxgmnsr: {
                sbbhead: {},
                slxxForm: {}
            },
            tform1: {
                text1: '纳税人或代理人声明：此纳税申报表是根据国家税收法律的规定填报的，我确定它是真实的、可靠的、完整的。',
                text11: '如纳税人填报，由纳税人填写以下各栏： '
            },
            thead: {
                tname: '增值税纳税申报表（适用增值税小规模纳税人）',
                nsrmc: '纳税人名称（公章）：广州市兴毅农业有限公司',
                nsrsbh: '纳税人识别号91440114724329952G',
                tbrq: '填表日期： 2018-05-29',
                skssq: '税款所属期   至  ',
                jedw: '金额单位：元（列至角分）'
            },
            originalTable: [
                {
                    "t1": " 一、计税依据",
                    "t2": "（一）应征增值税不含税销售额（3%征收率）",
                    "t3": "1"
                },
                {
                    "t2": "税务机关代开的增值税专用发票不含税销售额",
                    "t3": "2"
                },
                {
                    "t2": "税控器具开具的普通发票不含税销售额",
                    "t3": "3"
                },
                {
                    "t2": "（二）应征增值税不含税销售额（5%征收率）",
                    "t3": "4",
                    "C01": "- -",
                    "C03": "- -"
                },
                {
                    "t2": "税务机关代开的增值税专用发票不含税销售额",
                    "t3": "5",
                    "C01": "- -",
                    "C03": "- -"
                },
                {
                    "t2": "税控器具开具的普通发票不含税销售额",
                    "t3": "6",
                    "C01": "- -",
                    "C03": "- -"
                },
                {
                    "t2": "（三）销售使用过的固定资产不含税销售额",
                    "t3": "7(7≥8)",
                    "C02": "- -",
                    "C04": "- -"
                },
                {
                    "t2": "其中：税控器具开具的普通发票不含税销售额",
                    "t3": "8",
                    "C02": "- -",
                    "C04": "- -"
                },
                {
                    "t2": "（四）免税销售额",
                    "t3": "9=10+11+12"
                },
                {
                    "t2": "其中：小微企业免税销售额",
                    "t3": "10"
                },
                {
                    "t2": "未达起征点销售额",
                    "t3": "11"
                },
                {
                    "t2": "其他免税销售额",
                    "t3": "12"
                },
                {
                    "t2": "（五）出口免税销售额",
                    "t3": "13(13≥14)"
                },
                {
                    "t2": "其中：税控器具开具的普通发票销售额",
                    "t3": "14"
                },
                {
                    "t1": "二、税款计算",
                    "t2": "本期应纳税额",
                    "t3": "15"
                },
                {
                    "t2": "本期应纳税额减征额",
                    "t3": "16"
                },
                {
                    "t2": "本期免税额",
                    "t3": "17"
                },
                {
                    "t2": "其中：小微企业免税额",
                    "t3": "18"
                },
                {
                    "t2": "未达起征点免税额",
                    "t3": "19"
                },
                {
                    "t2": "应纳税额合计",
                    "t3": "20=15-16"
                },
                {
                    "t2": "本期预缴税额",
                    "t3": "21",
                    "C03": "- -",
                    "C04": "- -"
                },
                {
                    "t2": "本期应补（退）税额",
                    "t3": "22=20-21",
                    "C03": "- -",
                    "C04": "- -"
                }
            ],
            tTable: [
                {
                    "t1": " 一、计税依据",
                    "t2": "（一）应征增值税不含税销售额（3%征收率）",
                    "t3": "1"
                },
                {
                    "t2": "税务机关代开的增值税专用发票不含税销售额",
                    "t3": "2"
                },
                {
                    "t2": "税控器具开具的普通发票不含税销售额",
                    "t3": "3"
                },
                {
                    "t2": "（二）应征增值税不含税销售额（5%征收率）",
                    "t3": "4",
                    "C01": "- -",
                    "C03": "- -"
                },
                {
                    "t2": "税务机关代开的增值税专用发票不含税销售额",
                    "t3": "5",
                    "C01": "- -",
                    "C03": "- -"
                },
                {
                    "t2": "税控器具开具的普通发票不含税销售额",
                    "t3": "6",
                    "C01": "- -",
                    "C03": "- -"
                },
                {
                    "t2": "（三）销售使用过的固定资产不含税销售额",
                    "t3": "7(7≥8)",
                    "C02": "- -",
                    "C04": "- -"
                },
                {
                    "t2": "其中：税控器具开具的普通发票不含税销售额",
                    "t3": "8",
                    "C02": "- -",
                    "C04": "- -"
                },
                {
                    "t2": "（四）免税销售额",
                    "t3": "9=10+11+12"
                },
                {
                    "t2": "其中：小微企业免税销售额",
                    "t3": "10"
                },
                {
                    "t2": "未达起征点销售额",
                    "t3": "11"
                },
                {
                    "t2": "其他免税销售额",
                    "t3": "12"
                },
                {
                    "t2": "（五）出口免税销售额",
                    "t3": "13(13≥14)"
                },
                {
                    "t2": "其中：税控器具开具的普通发票销售额",
                    "t3": "14"
                },
                {
                    "t1": "二、税款计算",
                    "t2": "本期应纳税额",
                    "t3": "15"
                },
                {
                    "t2": "本期应纳税额减征额",
                    "t3": "16"
                },
                {
                    "t2": "本期免税额",
                    "t3": "17"
                },
                {
                    "t2": "其中：小微企业免税额",
                    "t3": "18"
                },
                {
                    "t2": "未达起征点免税额",
                    "t3": "19"
                },
                {
                    "t2": "应纳税额合计",
                    "t3": "20=15-16"
                },
                {
                    "t2": "本期预缴税额",
                    "t3": "21",
                    "C03": "- -",
                    "C04": "- -"
                },
                {
                    "t2": "本期应补（退）税额",
                    "t3": "22=20-21",
                    "C03": "- -",
                    "C04": "- -"
                }
            ],
            originalMeta: {
                "t1": {
                    "name": "t1",
                    "component": "Text",
                    "renderMerge": [{
                        "index": 0,
                        "props": {
                            "rowSpan": 14
                        }
                    }, {
                        "index": 1,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 2,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 3,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 4,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 5,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 6,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 7,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 8,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 9,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 10,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 11,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 12,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 13,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 14,
                        "props": {
                            "rowSpan": 8
                        }
                    }, {
                        "index": 15,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 16,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 17,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 18,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 19,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 20,
                        "props": {
                            "rowSpan": 0
                        }
                    }, {
                        "index": 21,
                        "props": {
                            "rowSpan": 0
                        }
                    }]
                },
                "t2": {
                    "name": "t2",
                    "component": "Text",
                    "renderMerge": [
                    ]
                },
                "t3": {
                    "name": "t3",
                    "component": "Text",
                    "renderMerge": [
                    ]
                },
                "C01": {
                    "name": "C01",
                    "component": "Text",
                    "renderMerge": [{
                        "index": 0,
                        "component": "Input"
                    }, {
                        "index": 1,
                        "component": "Input"
                    }, {
                        "index": 2,
                        "component": "Input"
                    }, {
                        "index": 6,
                        "component": "Input"
                    }, {
                        "index": 7,
                        "component": "Input"
                    }, {
                        "index": 9,
                        "component": "Input"
                    }, {
                        "index": 10,
                        "component": "Input"
                    }, {
                        "index": 11,
                        "component": "Input"
                    }, {
                        "index": 12,
                        "component": "Input"
                    }, {
                        "index": 13,
                        "component": "Input"
                    }, {
                        "index": 14,
                        "component": "Text"
                    }, {
                        "index": 15,
                        "component": "Input"
                    }, {
                        "index": 16,
                        "component": "Text"
                    }, {
                        "index": 17,
                        "component": "Text"
                    }, {
                        "index": 18,
                        "component": "Text"
                    }, {
                        "index": 20,
                        "component": "Input"
                    }]
                },
                "C02": {
                    "name": "C02",
                    "component": "Text",
                    "renderMerge": [{
                        "index": 0,
                        "component": "Input"
                    }, {
                        "index": 1,
                        "component": "Input"
                    }, {
                        "index": 2,
                        "component": "Input"
                    }, {
                        "index": 3,
                        "component": "Input"
                    }, {
                        "index": 4,
                        "component": "Input"
                    }, {
                        "index": 5,
                        "component": "Input"
                    }, {
                        "index": 9,
                        "component": "Input"
                    }, {
                        "index": 10,
                        "component": "Input"
                    }, {
                        "index": 11,
                        "component": "Input"
                    }, {
                        "index": 12,
                        "component": "Input"
                    }, {
                        "index": 13,
                        "component": "Input"
                    }, {
                        "index": 14,
                        "component": "Text"
                    }, {
                        "index": 15,
                        "component": "Input"
                    }, {
                        "index": 16,
                        "component": "Input"
                    }, {
                        "index": 17,
                        "component": "Input"
                    }, {
                        "index": 18,
                        "component": "Input"
                    }, {
                        "index": 20,
                        "component": "Input"
                    }]
                },
                "C03": {
                    "name": "C03",
                    "component": "Text",
                    "renderMerge": [{
                        "index": 3,
                        "component": "Text"
                    }, {
                        "index": 4,
                        "component": "Text"
                    }, {
                        "index": 5,
                        "component": "Text"
                    }, {
                        "index": 20,
                        "component": "Text"
                    }, {
                        "index": 21,
                        "component": "Text"
                    }]
                },
                "C04": {
                    "name": "C04",
                    "component": "Text",
                    "renderMerge": [{
                        "index": 6,
                        "component": "Text"
                    }, {
                        "index": 7,
                        "component": "Text"
                    }, {
                        "index": 20,
                        "component": "Text"
                    }, {
                        "index": 21,
                        "component": "Text"
                    }]
                }
            }
        }
    }
}