export function getMeta() {
    //app-account-subjects
    return {
        name: 'root',
        component: 'Layout',
        className: 'ttk-edf-app-company-manage',
        children: [
            {
                name: 'btnGroup',
                component: 'div',
                _visible: '{{data.hideBackBtn}}',
                className: 'ttk-edf-app-company-manage-back',
                children: [{
                    name: 'back',
                    component: 'Button',
                    children: '返回',
                    onClick: '{{$back}}',
                    className: 'ttk-edf-app-company-manage-back-btn'
                }]
            },
            {
                name: 'header2',
                component: 'div',
                className: 'ttk-edf-app-company-manage-header',
                children: [
                    {
                        name: 'btnGroup1',
                        component: 'div',
                        // className: 'ttk-edf-app-company-manage-header-left',
                        children: [{
                            name: 'list',
                            component: 'div',
                            children: '企业列表',
                            className: 'ttk-edf-app-company-manage-header-company-btn'
                        }]
                    }, {
                        name: 'Search',
                        component: 'Input.Search',
                        onChange: `{{function(e){$fieldChange('data.form.name',e.target.value)}}}`,
                        onFocus: '{{$manageBlur}}',
                        className: 'ttk-edf-app-company-manage-header-search',
                        placeholder: "企业名称",
                        // value: '{{data.form.manageName}}'
                    }, {
                        name: 'btnGroup2',
                        component: 'Layout',
                        className: 'ttk-edf-app-company-manage-header-right',
                        children: [{
                            name: 'new',
                            component: 'Button',
                            children: '创建企业',
                            onClick: '{{$addManage}}',
                            className: 'ttk-edf-app-company-manage-header-right-btn'
                        }]
                    }]
            }, {
                name: 'content',
                component: 'div',
                className: 'ttk-edf-app-company-manage-content',
                children: [{
                    name: 'dataGrid',
                    component: 'DataGrid',
                    headerHeight: 36,
                    isColumnResizing: true,
                    loading: '{{data.other.loading}}',
                    rowHeight: 36,
                    lineHeight: 36,
                    ellipsis: true,
                    // enableSequence: true,
                    // startSequence: '{{(data.pagination.currentPage-1)*data.pagination.pageSize + 1}}',
                    rowsCount: "{{$getListRowsCount()}}",
                    columns: "{{$getListColumns()}}"
                }]
            }]
    }
}

export function getInitState() {
    return {
        data: {
            hideBackBtn: false,
            list: [],
            manageList: [],
            form: {},
            pagination: {
                current: 1,
                total: 0,
                pageSize: 20
            },
            columns: []
        }
    }
}