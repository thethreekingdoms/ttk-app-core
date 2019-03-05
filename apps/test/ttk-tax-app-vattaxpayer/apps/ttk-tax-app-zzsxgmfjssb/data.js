export function getMeta() {
	return {
		name: 'tax-table',
        component: 'div',
        className: 'ttk-tax-app-zzsxgmfjssb',
        children: [{
            component: 'div',
            className: 'ttk-tax-app-zzsxgmfjssb-content',
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
                            children: '{{$renderTitle(data.sbbhead.nsrsbh)}}'
                        }]
                    }, {
                        name: 'date',
                        component: 'div',
                        className: 'date align-center',
                        children: '{{"税款所属期：" +(data.sbbhead.skssqq || "") + " 至 " + (data.sbbhead.skssqz || "")}}',
                    }, {
                        name: 'empty',
                        component: 'div',
                        className: 'empty',
                        children: ' '
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
                        className: 'sbrq1 align-center',
                        children: '{{"填表日期："+(data.sbbhead.sbrq1||"")}}',
                    }, {
                        name: 'unit',
                        component: 'div',
                        className: 'unit align-right',
                        children: '金额单位：元至角分'
                    }]
                }]
            },{
                pagination: false,
                className: 'ttk-tax-app-zzsxgmfjssb-table',
                name: 'table1',
                component: 'Table',
                pagination: false,
                allowColResize: false,
                enableSequenceColumn: true,
                bordered: true,
                dataSource: '{{data.tTable}}',
                noCalculate: true,
                path: 'root.children.content.children.table',
                // scroll:{ x: 1152 },
                columns: [
                    {
                        title: '税源编号',
                        dataIndex: 'C01',
                        key: 'C01',
                        _visible: false,
                        width: 128,                    
                        render: "{{function(text, record, index){return $renderCell('C01', index, text)} }}"
                    }
                    ,{
                        title: '征收项目',
                        dataIndex: 'C02',
                        key: 'C02',
                        width: 128,     
                        render: "{{function(text, record, index){return $renderCell('C02', index, text)} }}"
                    }
                    ,{
                        title: '征收品目',
                        dataIndex: 'C03',
                        key: 'C03',
                        width: 128,                    
                        render: "{{function(text, record, index){return $renderCell('C03', index, text)} }}"
                    }
                    ,{
                        title: '计税依据',
                        dataIndex: 'C04',
                        key: 'C04',
                        width: 128,                    
                        align: 'right',               
                        render: "{{function(text, record, index){return $renderCell('C04', index, text)} }}"
                    }
                    ,{
                        title: '税率',
                        dataIndex: 'C05',
                        key: 'C05',
                        width: 128,                    
                        align: 'right',               
                        render: "{{function(text, record, index){return $renderCell('C05', index, text)} }}"
                    }
                    ,{
                        title: '本期应纳税额',
                        dataIndex: 'C06',
                        key: 'C06',
                        width: 128,                    
                        align: 'right',               
                        render: "{{function(text, record, index){return $renderCell('C06', index, text)} }}"
                    }
                    ,{
                        title: '减免性质代码',
                        dataIndex: 'C07',
                        key: 'C07',
                        width: 128,                    
                        render: "{{function(text, record, index){return $renderCell('C07', index, text)} }}"
                    }
                    ,{
                        title: '减免税额',
                        dataIndex: 'C08',
                        key: 'C08',
                        width: 128,                    
                        align: 'right',               
                        render: "{{function(text, record, index){return $renderCell('C08', index, text)} }}"
                    }
                    ,{
                        title: '本期应补（退）税额',
                        dataIndex: 'C09',
                        key: 'C09',
                        width: 128,                    
                        align: 'right',               
                        render: "{{function(text, record, index){return $renderCell('C09', index, text)} }}"
                    }
                ]
            }]
        }]
        
		
	}
}

export function getInitState() {
	return {
		data: {
            zzsxgmfjssb: {
                sbbhead:{},
                slxxForm:{}
            },
            tform1:{
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
            ],
			tTable: [
            ],
            originalMeta: {
                "C01": {
                    "name": "C01",
                    "component": "Text",
                    "renderMerge": []
                },
                "C02": {
                    "name": "C02",
                    "component": "Text",
                    "renderMerge": []
                },
                "C03": {
                    "name": "C03",
                    "component": "Text",
                    "renderMerge": []
                },
                "C04": {
                    "name": "C04",
                    "component": "Text",
                    "renderMerge": []
                },
                "C05": {
                    "name": "C05",
                    "component": "Text",
                    "renderMerge": []
                },
                "C06": {
                    "name": "C06",
                    "component": "Text",
                    "renderMerge": []
                },
                "C07": {
                    "name": "C07",
                    "component": "Text",
                    "renderMerge": []
                },
                "C08": {
                    "name": "C08",
                    "component": "Text",
                    "renderMerge": []
                },
                "C09": {
                    "name": "C09",
                    "component": "Text",
                    "renderMerge": []
                }
            }
		}
	}
}