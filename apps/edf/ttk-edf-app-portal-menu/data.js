export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'ttk-edf-app-portal-menu',
		children: [{
			name: 'left',
			component: 'Card',
			className: 'ttk-edf-app-portal-menu-left',
			title: '菜单预置',
			extra: {
				name: 'header',
				component: '::div',
				children: [{
					name: 'add',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'plus',
					onClick: '{{$addType}}'
				}, {
					name: 'modify',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'edit',
					onClick: '{{$modifyType}}'
				}, {
					name: 'del',
					component: 'Button',
					type: "showy",
					shape: "circle",
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
			title: '',
			extra: {
				name: 'header',
				component: '::div',
				className: 'ttk-edf-app-portal-menu-content-header',
				children: [{
					name: 'add',
					component: 'Button',
					type: 'primary',
					children: '新增',
					onClick: '{{$addDetail}}'
				}, {
					name: 'del',
					component: 'Button',
					type: 'primary',
					children: '删除',
					onClick: '{{$batchDelDetail}}'
				},{
					name: 'setting',
					component: 'Button',
					type: 'primary',
					children: '栏目设置',
					onClick: '{{$columnSetting}}'
				}]
			},
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: '{{(data.pagination.currentPage-1)*data.pagination.pageSize + 1}}',
				rowsCount: "{{$getListRowsCount()}}",
				columns: "{{$getListColumns()}}"
			}, {
				name: 'footer',
				className: 'ttk-edf-app-portal-menu-content-footer',
				component: 'Layout',
				children: [{
					name: 'pagination',
					component: 'Pagination',
					showSizeChanger: true,
					pageSize: '{{data.pagination.pageSize}}',
					current: '{{data.pagination.currentPage}}',
					total: '{{data.pagination.totalData}}',
					onChange: '{{$pageChanged}}',
					onShowSizeChange: '{{$pageChanged}}'
				}]

			}]
		}]
	}
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
	}
}
