import React, { Fragment } from 'react'
import AntTable from './table'
import classNames from 'classnames'
import LazyTable from './lazyTable'
import LazyTable2 from './lazyTable2'
import DragTable from './dragTable'
function TableComponent(props) {
	let className = classNames({
		'mk-table': true,
		[props.className]: !!props.className,
		'mk-table-loading': props.loading != undefined,
		'emptyShowScroll': props.emptyShowScroll
	})
	let allowColResize = props.allowColResize === true ? true : false,
		allowDrag = props.allowDrag === true ? true : false
	if (props.lazyTable && props.dataSource && props.dataSource.length > 200) {
		if (props.checkboxKey) {
			return <Fragment><LazyTable2 {...props} allowColResize={allowColResize} className={className} /></Fragment>
		}
		return <Fragment><LazyTable {...props} allowColResize={allowColResize} className={className} /></Fragment >
	}
	if (props.allowDrag) {
		return <Fragment><DragTable {...props} allowDrag={allowDrag} allowColResize={allowColResize} className={className} /></Fragment >
	}
	return <Fragment><AntTable {...props} allowColResize={allowColResize} className={className} /></Fragment >
}

TableComponent.Column = AntTable.Column
TableComponent.ColumnGroup = AntTable.ColumnGroup
TableComponent.rowSelection = AntTable.rowSelection
TableComponent.selection = AntTable.selection

export default TableComponent