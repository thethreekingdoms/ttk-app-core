
export function getMeta() {
    return {
        name: 'root',
        component: '::div',
        className: 'ttk-tax-app-zzsjmssbmxb',
        children: [{
            name: 'title',
            className: 'ttk-tax-app-zzsjmssbmxb-title',
            component: '::h2',
            _visible: false,
            children: '增值税减免税申报明细表'
        }, {
            name: 'content',
            className: 'ttk-tax-app-zzsjmssbmxb-content',
            component: '::div',
            children: [{
                name: 'top',
                className: 'ttk-tax-app-zzsjmssbmxb-content-top theader',
                component: '::div',
                children: [{
                    name: 'top',
                    component: '::div',
                    children: [{
                        name: 'nsrsbh',
                        component: '::div',
                        className: 'nsrsbh',
                        children: ["纳税人识别号：", {
                            name: 'title',
                            component: '::span',
                            children: '{{$renderTitle(data.sbbhead.nsrsbh)}}'
                        }]
                    }, {
                        name: 'date',
                        component: '::div',
                        className: 'date',
                        children: '{{"税款所属期：" +(data.sbbhead.skssqq || "") + " 至 " + (data.sbbhead.skssqz || "")}}',
                    }]
                },{
                    name: 'bottom',
                    component: '::div',
                    children: [{
                        name: 'nsrmc',
                        component: '::div',
                        className: 'nsrmc',
                        children: '{{"纳税人名称（公章）："+ (data.sbbhead.nsrmc || "")}}',
                    },  {
                        name: 'sbrq1',
                        component: '::div',
                        className: 'sbrq1',
                        children: '{{"填表日期："+(data.sbbhead.sbrq1||"")}}',
                    }, {
                        name: 'unit',
                        component: '::div',
                        className: 'unit',
                        children: '金额单位：元至角分'
                    }]
                }]
            }, {
                name: 'table',
                component: '::div',
                className: 'ttk-tax-app-zzsjmssbmxb-content-body zzsjmssbmxb',
                children: [{
                    name: 'title1',
                    component: '::h4',
                    children: '一、减税项目'
                }, {
                    name: 'zzsjmssbmxbjsxmTable',
                    component: '::div',
                    className: 'zzsjmssbmxb-table',
                    children: {
                        pagination: false,
                        className: 'ttk-tax-app-zzsjmssbmxb-content-table zzsjmssbmxbjsxm',
                        name: 'zzsjmssbmxbjsxm',
                        component: 'Table',
                        pagination: false,
                        allowColResize: false,
                        enableSequenceColumn: true,
                        bordered: true,
                        dataSource: '{{data.zzsjmssbmxbjsxm}}',
                        // scroll:{ x: 866 },
                        noCalculate: true,
                        columns: [{
                                title: '减税性质代码及名称',
                                dataIndex: 'hmc',
                                key: 'hmc',
                                width: 128,
                                align: 'center',
                                render: "{{function(text, record, index){return $renderSelect('zzsjmssbmxbjsxm', index, 0, text)} }}"
                            }, {
                                title: '栏次',
                                dataIndex: 'C02',
                                key: 'C02',
                                width: 41,
                                align: 'center',
                                render: "{{function(text, record, index){return index+1} }}"
                            }, {
                                title:'期初余额',
                                children: [{
                                    title: '1',
                                    dataIndex: 'qcye',
                                    key: 'qcye',
                                    align: 'right',
                                    width: 128,
                                    render: "{{ function(text, record, index){return $renderInput('zzsjmssbmxbjsxm', 'qcye', index, 0, text)} }}"
                                }]
                            },{
                                title:'本期发生额',
                                children: [{
                                    title: '2',
                                    dataIndex: 'bqfse',
                                    key: 'bqfse',
                                    align: 'right',
                                    width: 128,
                                    render: "{{ function(text, record, index){return $renderInput('zzsjmssbmxbjsxm', 'bqfse', index, 0, text)} }}"
                                }]
                            },{
                                title:'本期应抵减税额',
                                children: [{
                                    title: '3=1+2',
                                    dataIndex: 'bqydjse',
                                    key: 'bqydjse',
                                    align: 'right',
                                    width: 128,
                                    render: "{{function(text, record, index){return $renderText('zzsjmssbmxbjsxm', 'bqydjse', index, record)}}}"
                                }]
                            },{
                                title:'本期实际抵减税额',
                                children: [{
                                    title: '4≤3',
                                    dataIndex: 'bqsjdjse',
                                    key: 'bqsjdjse',
                                    align: 'right',
                                    width: 128,
                                    render: "{{ function(text, record, index){return $renderInput('zzsjmssbmxbjsxm', 'bqsjdjse', index, 0, text)} }}"
                                }]
                            },{
                                title:'期末余额',
                                children: [{
                                    title: '5=3-4',
                                    dataIndex: 'qmye',
                                    key: 'qmye',
                                    align: 'right',
                                    width: 128,
                                    render: "{{function(text, record, index){return $renderText('zzsjmssbmxbjsxm', 'qmye', index, record)}}}"
                                }]
                            },{
                                title:'操作',
                                dataIndex: 'C08',
                                key: 'C08',
                                width: 65,
                                align: 'center',
                                render: "{{function(text, record, index){return $renderButton('zzsjmssbmxbjsxm', index)} }}"
                            }],
                    }
                }, {
                    name: 'title2',
                    component: '::h4',
                    children: '二、免税项目'
                }, {
                    name: 'zzsjmssbmxbmsxmTable',
                    component: '::div',
                    className: 'zzsjmssbmxb-table',
                    children: {
                        pagination: false,
                        className: 'ttk-tax-app-zzsjmssbmxb-content-table zzsjmssbmxbmsxm',
                        name: 'zzsjmssbmxbmsxm',
                        component: 'Table',
                        pagination: false,
                        // showHeader: false,
                        // scroll: '{{ data.colums <= 1000 ? (data.tableBody.length <= 5 ? {x:0,y:0}:{x:0,y:280}) : (data.tableBody.length <= 5 ? {x:(data.colums+50), y:0} : {x:(data.colums+50), y:280})}}',
                        allowColResize: false,
                        enableSequenceColumn: true,
                        bordered: true,
                        dataSource: '{{data.zzsjmssbmxbmsxm}}',
                        // scroll:{ x: 1007 },
                        noCalculate: true,
                        columns: [
                            {
                                title: '免税性质代码及名称',
                                dataIndex: 'hmc',
                                align: 'center',
                                key: 'hmc',
                                width: 128,
                                render: "{{function(text, record, index){return $renderSelect('zzsjmssbmxbmsxm', index, 2, text)} }}"
                            }, {
                                title: '栏次',
                                dataIndex: 'C02',
                                key: 'C02',
                                width: 41,
                                align: 'center',                          
                                render: "{{function(text, record, index){return index+1} }}"
                            }, {
                                title:'免征增值税项目销售额',
                                children: [{
                                    title: '1',
                                    dataIndex: 'mzzzsxmxse',
                                    key: 'mzzzsxmxse',
                                    align: 'right',
                                    width: 139,
                                    render: "{{ function(text, record, index){return $renderInput('zzsjmssbmxbmsxm', 'mzzzsxmxse', index, 2, text)} }}"
                                }]
                            },{
                                title:'免税销售额扣除项目本期实际扣除金额',
                                children: [{
                                    title: '2',
                                    dataIndex: 'bqsjkcje',
                                    key: 'bqsjkcje',
                                    align: 'right',
                                    width: 223,
                                    render: "{{ function(text, record, index){if(index == 1 || index == 2){return $renderNone()} return $renderInput('zzsjmssbmxbmsxm', 'bqsjkcje', index, 2, text)} }}"
                                }]
                            },{
                                title:'扣除后免税销售额',
                                children: [{
                                    title: '3=1-2',
                                    dataIndex: 'kchmsxse',
                                    // dataIndex: 'kchmsxse',
                                    key: 'kchmsxse',
                                    align: 'right',
                                    width: 128,
                                    render: "{{ function(text, record, index){if(index == 1 || index == 2){return $renderNone()} return $renderText('zzsjmssbmxbmsxm', 'kchmsxse', index, record) } }}"
                                }]
                            },{
                                title:'免税销售额对应的进项税额',
                                children: [{
                                    title: '4',
                                    // dataIndex: 'msxsedyjxse',
                                    dataIndex: 'msxsedyjxse',
                                    key: 'msxsedyjxse',
                                    align: 'right',
                                    width: 163,
                                    render: "{{ function(text, record, index){if(index == 1 || index == 2){return $renderNone()} return $renderInput('zzsjmssbmxbmsxm', 'msxsedyjxse', index, 2, text)} }}"
                                }]
                            },{
                                title:'免税额',
                                children: [{
                                    title: '5',
                                    dataIndex: 'mse',
                                    key: 'mse',
                                    align: 'right',
                                    width: 128,
                                    render: "{{ function(text, record, index){if(index == 1 || index == 2){return $renderNone()} return $renderText('zzsjmssbmxbmsxm', 'mse', index, record) } }}"
                                }]
                            },{
                                title:'操作',
                                dataIndex: 'C08',
                                key: 'C08',
                                align: 'center',
                                width: 65,
                                render: "{{function(text, record, index){return $renderButton('zzsjmssbmxbmsxm', index)} }}"
                            }
                        ],
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
            isDeclare: false,   //false表示未申报
            zzsjmssbmxbjsxm: [], //减税数据
            zzsjmssbmxbmsxm: [], //免税数据
            reduceTax: [], //减税性质
            freeTax: [], //免税性质
            error: {
                zzsjmssbmxbjsxm: [],  //减税校验错误信息
                zzsjmssbmxbmsxm: []    //免税校验错误信息
            },
            other: {
                isSetFocus: true
            }
        }
    }
}



