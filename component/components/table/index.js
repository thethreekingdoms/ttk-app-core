import React from 'react'
import AntTable from './table'
import classNames from 'classnames'

function TableComponent(props) {
	let className = classNames({
		'mk-table': true,
		[props.className]: !!props.className,
		'mk-table-loading': props.loading != undefined

	})
	let allowColResize = props.allowColResize === true ? true : false
	return <AntTable {...props} allowColResize={allowColResize} className={className} />
}




TableComponent.Column = AntTable.Column
TableComponent.ColumnGroup = AntTable.ColumnGroup
TableComponent.rowSelection = AntTable.rowSelection
TableComponent.selection = AntTable.selection

export default TableComponent