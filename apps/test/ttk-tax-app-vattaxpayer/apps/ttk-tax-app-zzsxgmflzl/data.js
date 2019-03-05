
export function getMeta() {
    return {
        name: 'root',
        component: 'div',
        className: 'ttk-tax-app-zzsxgmflzl',
        children: [
            {
                name: 'content',
                className: 'ttk-tax-app-zzsxgmflzl-content',
                component: 'div',
                children:
                [{
                    name: 'formTitle',
                    component: 'div',
                    className: 'ttk-tax-app-zzsxgmflzl-content-formTitle',
                    _visible: false,
                    children: '增值税纳税申报表（小规模纳税人适用）附列资料'
                },{
                    name: 'formHead',
                    component: 'div',
                    className: 'ttk-tax-app-zzsxgmflzl-content-formHead theader',
                    children: [{
                        name: 'formHeadTop',
                        component: 'div',
                        className: 'ttk-tax-app-zzsxgmflzl-content-formHead-Div',
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
                        className: 'ttk-tax-app-zzsxgmflzl-content-formHead-Div',
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
                            name: 'ysxwkcejs1',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formTableTitle',
                            children: '应税行为（3%征收率）扣除额计算'
                        },{
                            name: 'ysxwkcejs2',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'qcyeh2l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '期初余额'
                            },{
                                name: 'bqfseh2l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '本期发生额'
                            },{
                                name: 'bqkceh2l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '本期扣除额'
                            },{
                                name: 'qmyeh2l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '期末余额'
                            }]
                        },{
                            name: 'ysxwkcejs3',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'qcyeh3l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '1'
                            },{
                                name: 'bqfseh3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '2'
                            },{
                                name: 'bqkceh3l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '3（3≤1＋2之和，且3≤5）'
                            },{
                                name: 'qmyeh3l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '4=1+2-3'
                            }]
                        },{
                            name: 'ysxwkcejs4',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'qcye',
                                component: 'Form.Item',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("qcye", data.flzlForm.qcye)}}'
                                // children: '{{$renderFormCell("qcye", data.flzlForm.qcye, "Text")}}'
                            },{
                                name: 'bqfse',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("bqfse",data.flzlForm.bqfse)}}'
                                // children: '{{$renderFormCell("bqfse",data.flzlForm.bqfse, "Input")}}'
                            },{
                                name: 'bqkce',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("bqkce",data.flzlForm.bqkce, "Input")}}'
                                children: '{{$renderFormCell("bqkce",data.flzlForm.bqkce)}}'
                            },{
                                name: 'qmye',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("qmye",data.flzlForm.qmye, "Text")}}'
                                children: '{{$renderFormCell("qmye",data.flzlForm.qmye)}}'
                            }]
                        }]
                    },{
                        name: 'jsxsejs1',
                        component: 'div',
                        children:[{
                            name: 'ysxwjsxsejs1',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formTableTitle',
                            children: '应税行为（3%征收率）计税销售额计算'
                        },{
                            name: 'ysxwjsxsejs2',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'ysfwxsqbhssrh2l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '全部含税收入（适用3%征收率）'
                            },{
                                name: 'ysfwxsbqkceh2l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '本期扣除额'
                            },{
                                name: 'ysfwxshsxseh2l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '含税销售额'
                            },{
                                name: 'ysfwxsbhsxseh2l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '不含税销售额'
                            }]
                        },{
                            name: 'ysxwjsxsejs3',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'ysfwxsqbhssrh3l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '5'
                            },{
                                name: 'ysfwxsbqkceh3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '6=3'
                            },{
                                name: 'ysfwxshsxseh3l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '7＝5－6'
                            },{
                                name: 'ysfwxsbhsxseh3l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '8＝7÷1.03'
                            }]
                        },{
                            name: 'ysxwjsxsejs4',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'ysfwxsqbhssr',
                                component: 'Form.Item',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("ysfwxsqbhssr", data.flzlForm.ysfwxsqbhssr, "Input")}}'
                                children: '{{$renderFormCell("ysfwxsqbhssr", data.flzlForm.ysfwxsqbhssr)}}'
                            },{
                                name: 'ysfwxsbqkce',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("ysfwxsbqkce", data.flzlForm.ysfwxsbqkce, "Text")}}'
                                children: '{{$renderFormCell("ysfwxsbqkce", data.flzlForm.ysfwxsbqkce)}}'
                            },{
                                name: 'ysfwxshsxse',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("ysfwxshsxse", data.flzlForm.ysfwxshsxse, "Text")}}'
                                children: '{{$renderFormCell("ysfwxshsxse", data.flzlForm.ysfwxshsxse)}}'
                            },{
                                name: 'ysfwxsbhsxse',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("ysfwxsbhsxse", data.flzlForm.ysfwxsbhsxse, "Text")}}'
                                children: '{{$renderFormCell("ysfwxsbhsxse", data.flzlForm.ysfwxsbhsxse)}}'
                            }]
                        }]
                    },{
                        name: 'kcejs2',
                        component: 'div',
                        children:[{
                            name: 'ysxwkcejs1',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formTableTitle',
                            children: '应税行为（5%征收率）扣除额计算'
                        },{
                            name: 'ysxwkcejs2',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'qcye5h2l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '期初余额'
                            },{
                                name: 'bqfse5h2l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '本期发生额'
                            },{
                                name: 'bqkce5h2l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '本期扣除额'
                            },{
                                name: 'qmye5h2l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '期末余额'
                            }]
                        },{
                            name: 'ysxwkcejs3',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'qcye5h3l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '9'
                            },{
                                name: 'bqfse5h3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '10'
                            },{
                                name: 'bqkce5h3l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '11（11≤9＋10之和，且11≤13）'
                            },{
                                name: 'qmye5h3l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '12=9+10-11'
                            }]
                        },{
                            name: 'ysxwkcejs4',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'qcye5',
                                component: 'Form.Item',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("qcye5", data.flzlForm.qcye5)}}'
                                // children: '{{$renderFormCell("qcye5", data.flzlForm.qcye5, "Text")}}'
                            },{
                                name: 'bqfse5',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("bqfse5",data.flzlForm.bqfse5)}}'
                                // children: '{{$renderFormCell("bqfse5",data.flzlForm.bqfse5,"Input")}}'
                            },{
                                name: 'bqkce5',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("bqkce5",data.flzlForm.bqkce5)}}'
                                // children: '{{$renderFormCell("bqkce5",data.flzlForm.bqkce5,"Input")}}'
                            },{
                                name: 'qmye5',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("qmye5",data.flzlForm.qmye5)}}'
                                // children: '{{$renderFormCell("qmye5",data.flzlForm.qmye5,"Text")}}'
                            }]
                        }]
                    },{
                        name: 'jsxsejs1',
                        component: 'div',
                        children:[{
                            name: 'ysxwjsxsejs1',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formTableTitle',
                            children: '应税行为（5%征收率）计税销售额计算'
                        },{
                            name: 'ysxwjsxsejs2',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'ysfwxsqbhssr5h2l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '全部含税收入（适用5%征收率）'
                            },{
                                name: 'ysfwxsbqkce5h2l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '本期扣除额'
                            },{
                                name: 'ysfwxshsxse5h1l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '含税销售额'
                            },{
                                name: 'ysfwxsbhsxse5h2l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItemTitle',
                                children: '不含税销售额'
                            }]
                        },{
                            name: 'ysxwjsxsejs3',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'ysfwxsqbhssr5h3l1',
                                component: 'div',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '13'
                            },{
                                name: 'ysfwxsbqkce5h3l2',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '14=11'
                            },{
                                name: 'ysfwxshsxse5h3l3',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '15＝13－14'
                            },{
                                name: 'ysfwxsbhsxse5h3l4',
                                component: 'div',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '16＝15÷1.05'
                            }]
                        },{
                            name: 'ysxwjsxsejs4',
                            component: 'div',
                            className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv',
                            children: [{
                                name: 'ysfwxsqbhssr5',
                                component: 'Form.Item',
                                style: {borderLeft: 0},
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                children: '{{$renderFormCell("ysfwxsqbhssr5", data.flzlForm.ysfwxsqbhssr5)}}'
                                // children: '{{$renderFormCell("ysfwxsqbhssr5", data.flzlForm.ysfwxsqbhssr5, "Input")}}'
                            },{
                                name: 'ysfwxsbqkce5',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("ysfwxsbqkce5", data.flzlForm.ysfwxsbqkce5, "Text")}}'
                                children: '{{$renderFormCell("ysfwxsbqkce5", data.flzlForm.ysfwxsbqkce5)}}'
                            },{
                                name: 'ysfwxshsxse5',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("ysfwxshsxse5", data.flzlForm.ysfwxshsxse5, "Text")}}'
                                children: '{{$renderFormCell("ysfwxshsxse5", data.flzlForm.ysfwxshsxse5)}}'
                            },{
                                name: 'ysfwxsbhsxse5',
                                component: 'Form.Item',
                                className: 'ttk-tax-app-zzsxgmflzl-content-formItemDiv-formItem',
                                // children: '{{$renderFormCell("ysfwxsbhsxse5", data.flzlForm.ysfwxsbhsxse5, "Text")}}'
                                children: '{{$renderFormCell("ysfwxsbhsxse5", data.flzlForm.ysfwxsbhsxse5)}}'
                            }]
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
            flzlForm:{
                qcye: 123,
                bqfse: 22
            },
            cellComponentsMap:{
                // qcye:"Text",
                qcye:"Input",
                bqfse:"Input",
                bqkce:"Input",
                qmye:"Text",
                ysfwxsqbhssr:"Input",
                ysfwxsbqkce:"Text",
                ysfwxshsxse:"Text",
                ysfwxsbhsxse:"Text",
                // qcye5:"Text",
                qcye5:"Input",
                bqfse5:"Input",
                bqkce5:"Input",
                qmye5:"Text",
                ysfwxsqbhssr5:"Input",
                ysfwxsbqkce5:"Text",
                ysfwxshsxse5:"Text",
                ysfwxsbhsxse5:"Text",
            },
            // tableHead: {
            //     pagination: false,
            //     className: 'ttk-tax-app-zzsxgmflzl-content-formBody',
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




