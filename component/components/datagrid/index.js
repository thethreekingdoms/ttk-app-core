import React, { Fragment } from 'react'
import Datagrid from './datagrid'
import FixedDataTable from './fixedDataTable'
function DataGridComponent(props) {
  if(props.isRenderDatagridCol == true){
    return <Fragment><FixedDataTable {...props} /></Fragment >
  }
	return <Fragment><Datagrid {...props} /></Fragment >
}

DataGridComponent.Cell = Datagrid.Cell
DataGridComponent.TextCell = Datagrid.TextCell
DataGridComponent.Column = Datagrid.Column
DataGridComponent.ColumnGroup = Datagrid.ColumnGroup

export default DataGridComponent