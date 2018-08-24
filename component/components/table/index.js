import React from 'react'
import AntTable from './table'
import classNames from 'classnames'
import LazyTable from './lazyTable'

function TableComponent(props) {
	let className = classNames({
		'mk-table': true,
		[props.className]: !!props.className,
		'mk-table-loading': props.loading != undefined,
		'emptyShowScroll': props.emptyShowScroll
	})
	if( props.lazyTable && props.dataSource && props.dataSource.length>0 ) {
		return <LazyTable {...props} className={className} />
	}
	let allowColResize = props.allowColResize === true ? true : false
	return <AntTable {...props} allowColResize={allowColResize} className={className} />
}




TableComponent.Column = AntTable.Column
TableComponent.ColumnGroup = AntTable.ColumnGroup
TableComponent.rowSelection = AntTable.rowSelection
TableComponent.selection = AntTable.selection

export default TableComponent