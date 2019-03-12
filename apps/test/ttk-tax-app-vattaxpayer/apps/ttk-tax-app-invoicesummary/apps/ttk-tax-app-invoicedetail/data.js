import moment from 'moment'
import {consts} from 'edf-consts'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
        className: 'ttk-tax-app-invoicedetail',
        children: [{
			name: 'ttk-tax-app-invoicedetail-top',
			component: '::div',
			className: 'ttk-tax-app-invoicedetail-top',
			children: '{{$getFilterOption()}}'
		},{
			name: 'ttk-tax-app-invoicedetail-content',
			component: '::div',
			className: 'ttk-tax-app-invoicedetail-content',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				//className: '{{$heightCount()}}',
				ellipsis: true,
				headerHeight: 37,
				rowHeight: 37,
				isColumnResizing: false,
				loading: '{{data.other.loading}}',
				rowsCount: "{{$getListRowsCount()}}",
				columns: '{{$getColumns()}}'
			}]
		},{
			name: 'footer',
			className: 'ttk-tax-app-invoicedetail-footer',
			component: 'Layout',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				pageSizeOptions: ['20', '50', '100', '200'],
				pageSize: '{{data.page.pageSize}}',
				current: '{{data.page.currentPage}}',
				total: '{{data.page.total}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]
    }
}

export function getInitState() {
	return {
		data: {
			form: {
				code: '',
				name: '',
				sbsqq: moment().format('YYYY-MM')
			},
			list: [],
			other: {
				error: {},
				loading: false,
				isShow: false,
				isChanged: false,
				page:{
					currentPage: 1, 
					pageSize: 20
				},
				sfdkList: [{
					id: 'all',
					name: '全部'
				},{
					id: 0,
					name: '否'
				},{
					id: 1,
					name: '是'
				}],
				sfdkList: [{
					id: 'all',
					name: '全部'
				},{
					id: false,
					name: '不予抵扣'
				},{
					id: true,
					name: '抵扣'
				}],
				kplxList:[{
					id: 'all',
					name: '全部'
				},{
					id: false,
					name: '自开'
				},{
					id: true,
					name: '代开'
				}]
			},
			page: {
				current: 1,
				total: 1,
				pageSize: 50,
			}
		}
	}
}

