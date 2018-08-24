export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'ttk-edf-app-portal-menu',
        children: [{
            name: 'left',
            component: 'Card',
            className: 'ttk-edf-app-portal-menu-left',
            title: '菜单',
            extra: {
                name: 'header',
                component: '::div',
                children: [{
                    name: 'add',
                    component: 'Button',
                    className:'button',
                    icon: 'plus',
                    onClick: '{{$addType}}'
                }, {
                    name: 'modify',
                    component: 'Button',
                    className:'button',
                    icon: 'edit',
                    onClick: '{{$modifyType}}'
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
                selectedKeys: `{{[data.filter.parentId+'']}}`,
                onSelect: '{{$selectType}}',
                children: '{{$loopTreeChildren(data.other.tree)}}'
            }]
        }, {
            name: 'content',
            component: 'Card',
            className: 'ttk-edf-app-portal-menu-content',
            title: '菜单',
            extra: {
                name: 'header',
                component: '::div',
                className: 'ttk-edf-app-portal-menu-content-header',
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
                className:'',
                headerHeight: 37,
                rowHeight: 35,
                enableSequence: true,
                startSequence: '{{(data.pagination.currentPage-1)*data.pagination.pageSize + 1}}',
                rowsCount: '{{$getListRowsCount()}}',
                columns: '{{$getListColumns()}}'
            }, {
                name: 'footer',
                className: 'ttk-edf-app-portal-menu-content-footer',
                component: '::div',
                children: [{
                    name: 'pagination',
                    component: 'Pagination',
                    showSizeChanger: true,
                    pageSize: '{{data.pagination.pageSize}}',
                    current: '{{data.pagination.currentPage}}',
                    total: '{{data.pagination.totalCount}}',
                    onChange: '{{$pageChanged}}',
                    onShowSizeChange: '{{$pageChanged}}'
                }]
            }]
        }]
    };
}


export function getInitState() {
    return {
        data: {
            columns: [],
            list: [],
            pagination: { currentPage: 1, totalPage: 0, totalData: 0, pageSize: 50 },
            filter: {
                type: 1
            },
            other: {}
        }
    };
}
