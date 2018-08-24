export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'edfx-app-setting',
		children: [{
			name: 'content',
			className: 'edfx-app-setting-content',
			component: 'Card',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: 1,
				rowsCount: "{{$getListRowsCount()}}",
				columns: "{{$getListColumns()}}"
			}]
		}]
	}
}


export function getInitState() {
	return {
		data: {
			list: [],
			other: {}
		}
	}
}