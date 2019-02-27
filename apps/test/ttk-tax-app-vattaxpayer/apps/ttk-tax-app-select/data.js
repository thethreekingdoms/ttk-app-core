
export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'ttk-tax-app-select',
        children: [
            {
                name: 'content',
                className: 'ttk-tax-app-select-content',
                name: 'voucherItems',
                component: 'Table',
                pagination: false,
                id: 'balanceSheetRptId',
                allowColResize: false,
                enableSequenceColumn: false,
                bordered: true,
                // height: 222,
                scroll: {
                    y: 222
                },
                dataSource: '{{data.info}}',
                noDelCheckbox: true,
                columns: [
                    {
                        title: '序号',
                        dataIndex: 'id',
                        key: 'id',
                        align: 'center',
                        width: 46
                    }, {
                        title: '表单',
                        dataIndex: 'name',
                        key: 'name',
                        width: 550,
                        render: "{{function(text, record, index){return $NameCol(text, record, index)}}}"
                    }, {
                        title: '选择',
                        key: 'operator',
                        align: 'center',
                        className: 'table_fixed_width',
                        width: 44,
                        render: "{{function(record, index, v){return $optCol(record, index, v)}}}"
                    }
                ]
            },{
				name: 'resetBtn',
				className: 'ttk-tax-app-select-reset',
                component: 'Button',
                onClick: "{{$resetClick}}",
				width: 60,
				children: '重置'
			}
        ]
    }
}

export function getInitState() {
    return {
        data: {
            tableOption: {
                x: 900,
            },
            info: [],
            other: {
                loading: false,
                isOk: true,              
            }
        }
    }
}

