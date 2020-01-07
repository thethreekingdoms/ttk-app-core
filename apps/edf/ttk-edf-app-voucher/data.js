export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'edfx-app-voucher',
        children: [{
            name: 'left',
            component: 'Card',
            className: 'edfx-app-voucher-left',
            title: '单据',
            extra: {
                name: 'header',
                component: 'div',
                children: [{
                    name: 'add',
                    component: 'Button',
                    className:'button',
                    icon: 'plus',
                    onClick: '{{$addVoucher}}'
                }, {
                    name: 'modify',
                    component: 'Button',
                    className:'button',
                    icon: 'edit',
                    onClick: '{{$modifyVoucher}}'
                }, {
                    name: 'del',
                    component: 'Button',
                    icon: 'close',
                    onClick: '{{$delType}}'
                }]
            },
            children: [{
                name: 'tree',
                component: 'Tree',
                ts: '{{data.other.ts}}',
                selectedKeys: "{{[data.selectedKeys]}}",
                expandedKeys: '{{data.expandedKeys}}',
                onSelect: '{{$selectType}}',
                children: '{{$loopTreeChildren(data.other.tree)}}',
                onExpand: '{{$updateExpandedKeys}}'
            }]
        }, {
            name: 'content',
            component: 'Card',
            className: 'edfx-app-voucher-content',
            title: '单据',
            extra: {
                name: 'header',
                component: 'div',
                className: 'edfx-app-voucher-content-header',
                children: [{
                    name: 'add',
                    component: 'Button',
                    className:'button',
                    type: 'primary',
                    children: '新增',
                    onClick: '{{$addDetail}}'
                }, {
                    name: 'del',
                    component: 'Button',
                    className:'button',
                    children: '删除',
                    onClick: '{{$batchDelDetail}}'
                }, {
                    name: 'setting',
                    component: 'Button',
                    children: '栏目设置',
                    onClick: '{{$columnSetting}}'
                }]
            },
            children: [{
                name: 'dataGrid',
                component: 'DataGrid',
                headerHeight: 37,
                rowHeight: 35,
                enableSequence: true,
                rowsCount: '{{$getListRowsCount()}}',
                columns: '{{$getListColumns()}}'
            }]
        }]
    };
}


export function getInitState() {
    return {
        data: {
            columns: [],
            list: [],
            fields: {},
            pagination: { currentPage: 1, totalPage: 0, totalData: 0, pageSize: 50 },
            filter: {
                type: 1
            },
            other: {
                ts: new Date().getTime()
            }
        }
    };
}