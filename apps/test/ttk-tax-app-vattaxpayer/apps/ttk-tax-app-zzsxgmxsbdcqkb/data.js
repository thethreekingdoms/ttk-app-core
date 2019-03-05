
export function getMeta() {
    return {
        name: 'root',
        component: 'div',
        className: 'ttk-tax-app-zzsxgmxsbdcqkb',
        children: [
            {
                name: 'content',
                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content',
                component: 'div',
                children:
                [{
                    name: 'formTitle',
                    component: 'div',
                    className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formTitle',
                    _visible: false,
                    children: '增值税纳税申报表（小规模纳税人适用）附列资料'
                },{
                    name: 'formHead',
                    component: 'div',
                    className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formHead theader',
                    children: [{
                        name: 'formHeadTop',
                        component: 'div',
                        className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formHead-Div',
                        children: [{
                            name: 'leftTopP',
                            component: 'div',
                            children: ["纳税人识别号：", {
                                name: 'title',
                                component: 'span',
                                children: '{{$renderTitle(data.sbbhead.nsrsbh)}}'
                            }]
                        }, {
                            name: 'middleTopP',
                            component: 'div',
                            className: 'alignCenter',
                            children: '{{"税款所属期：" +(data.sbbhead.skssqq || "") + " 至 " + (data.sbbhead.skssqz || "")}}',
                        }]
                    }, {
                        name: 'formHeadMiddle',
                        component: 'div',
                        className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formHead-Div',
                        children: [{
                            name: 'leftP',
                            component: 'div',
                            children: '{{"纳税人名称（公章）："+ (data.sbbhead.nsrmc || "")}}',
                        },  {
                            name: 'MiddleP',
                            component: 'div',
                            className: 'alignCenter',
                            children: '{{"填表日期："+(data.sbbhead.sbrq1||"")}}',
                        },  {
                            name: 'RightP',
                            component: 'div',
                            className: 'alignRight',
                            children: `金额单位：元至角分`
                        }]
                    }]
                },{
                    name: 'form',
                    component: 'Form',
                    children:[{
                        name: 'kcejs1',
                        component: 'div',
                        children:[{
                            name: 'ysxwkcejs2',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv',
                            children: [{
                                name: 'qcyeh2l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItemTitle',
                                children: '项目'
                            },{
                                name: 'bqfseh2l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItemTitle',
                                children: '行次'
                            },{
                                name: 'bqkceh2l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItemTitle',
                                children: '销售额'
                            }]
                        },{
                            name: 'ysxwkcejs3',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv',
                            children: [{
                                name: 'qcyeh3l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem formItem-text-left',
                                children: '销售不动产不含税销售额'
                            },{
                                name: 'bqfseh3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem',
                                children: '1'
                            },{
                                name: 'bqkceh3l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("xsbdcbhsxse", data.zzsxgmxsbdcqkb.xsbdcbhsxse)}}'
                            }]
                        },{
                            name: 'ysxwkcejs4',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv',
                            children: [{
                                name: 'qcyeh3l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem formItem-text-left formItem-text-indent',
                                children: '其中：税务机关代开的增值税专用发票不含税销售额'
                            },{
                                name: 'bqfseh3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem',
                                children: '2'
                            },{
                                name: 'bqkceh3l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("swjgdkdzzszyfpbhsxse", data.zzsxgmxsbdcqkb.swjgdkdzzszyfpbhsxse)}}'
                            }]
                        },{
                            name: 'ysxwkcejs4',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv',
                            children: [{
                                name: 'qcyeh3l1',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem2  formItem-text-left',
                                children: '{{"收款日期："+(data.zzsxgmxsbdcqkb.sdrq||"")}}'
                            },
                            {
                                name: 'bqfseh3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem2',
                                children: '{{"接收人："+(data.zzsxgmxsbdcqkb.jsr||"")}}'                                
                            },
                            {
                                name: 'bqfseh3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formItemDiv-formItem2',
                                children: '{{"主管税务机关盖章："+(data.zzsxgmxsbdcqkb.zgswjggz||"")}}'                                
                            }
                            ]
                        }]
                    }]
                }]
            }
        ]
    }
}

export function getInitState() {
    return {
        data: {
            zzsxgmxsbdcqkb:{
            },
            cellComponentsMap:{
                xsbdcbhsxse:"Input",
                swjgdkdzzszyfpbhsxse:"Input",
                sdrq:"DatePicker",
                jsr:"InputStr",
                zgswjggz: "InputStr"
            },
            // tableHead: {
            //     pagination: false,
            //     className: 'ttk-tax-app-zzsxgmxsbdcqkb-content-formBody',
            //     name: 'report',
            //     component: 'Table',
            //     pagination: false,
            //     allowColResize: false,
            //     enableSequenceColumn: true,
            //     bordered: true,
            //     noCalculate: true,
            // },
            checkList: [],//校验元数据化
            calculationList:{//公式，应该不用这个，与后台返回的公式预置表用一套
                c3: [//公式元数据化
                    {
                        rNum: 0,
                        nextR: 2,
                        nextC: [ 'c4', 'c6' ],
                        nextCFormula: '$+',
                    },{
                        rNum: 1,
                        nextR: 2,
                        nextC: [ 'c4', 'c6' ],
                        nextCFormula: '$+',
                    },{
                        rNum: 2,
                        nextR: 4,
                        formula: '1+2',
                        nextC: [ 'c4', 'c6' ],
                        nextCFormula: '$+',
                    },{
                        rNum: 3,
                        nextR: 4,
                        nextC: [ 'c4', 'c6' ],
                        nextCFormula: '$+',
                    },{
                        rNum: 4,
                        formula: '3+4',
                        nextC: [ 'c4', 'c6' ],
                        nextCFormula: '$+',
                    }
                ],
                c4: [//公式元数据化
                    {
                        rNum: 0,
                        nextR: 2,
                    },{
                        rNum: 1,
                        nextR: 2,
                    },{
                        rNum: 2,
                        nextR: 4,
                        formula: '1+2',
                    },{
                        rNum: 3,
                        nextR: 4,
                    },{
                        rNum: 4,
                        formula: '3+4',
                    }
                ],
                c6: [//公式元数据化
                    {
                        rNum: 0,
                        nextR: 2,
                        nextC: [ 'c7' ],
                        nextCFormula: 'c5+c6',
                    },{
                        rNum: 1,
                        nextR: 2,
                        nextC: [ 'c7' ],
                        nextCFormula: 'c5+c6',
                    },{
                        rNum: 2,
                        nextR: 4,
                        formula: '1+2',
                        nextC: [ 'c7' ],
                        nextCFormula: 'c5+c6',
                    },{
                        rNum: 3,
                        nextR: 4,
                        nextC: [ 'c7' ],
                        nextCFormula: 'c5+c6',
                    },{
                        rNum: 4,
                        formula: '3+4',
                        nextC: [ 'c7' ],
                        nextCFormula: 'c5+c6',
                    }
                ],
                c7: [//公式元数据化
                    {
                        rNum: 0,
                        nextR: 2,
                    },{
                        rNum: 1,
                        nextR: 2,
                    },{
                        rNum: 2,
                        nextR: 4,
                        formula: '1+2',
                    },{
                        rNum: 3,
                        nextR: 4,
                    },{
                        rNum: 4,
                        formula: '3+4',
                    }
                ]
            }
        }
    }
}




