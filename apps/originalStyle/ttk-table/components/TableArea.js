
import React, { useEffect, useState } from 'react'
import { Modal, Button, Table } from 'antd'
import {DataGrid} from 'edf-component' // '../datagrid'
import { useData, useActions, useCommit } from 'edf-app-loader'
import Pagination from './Pagination'

export default function TableArea(props) {
  const commit = useCommit()
  const actions = useActions(props)
  const { loading } = useData([props, 'showState']).toJS()
  const tableData = useData([props, 'tableData']).toJS()
  const tableThead = useData([props, 'tableThead']).toJS()
  const { selectedRowKeys } = useData([props, 'tableCheckbox']).toJS()
  const [tableOption] = useState({ y: 480 })

  // 表格可选行的配置项
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // 使用commit直接更新reducer中的数据状态
      commit([props, 'showState'], true)
      actions.updateSelectedRow({ selectedRowKeys, selectedRows })
      commit([props, 'showState'], false)
    },
    getCheckboxProps: record => {
      return !record.id ? {
        disabled: true,
        style: { display: 'none', }
      } : {}
    }
  }

  async function addItem(record) {
    // 使用commit直接更新reducer中的数据状态
    commit([props, 'showState'], true)
    await actions.addRow(record)
    commit([props, 'showState'], false)
  }

  function handleDelete(record) {
    Modal.confirm({
      title: '删除',
      content: '确认删除?',
      onOk() {
        actions.deleteTableRow(record)
      }
    })
  }
  // 操作列的渲染函数
  function operationRender(text, record) {
    if (!record.id) return
    return (
      <div>
        <Button type="primary" size="small" onClick={() => addItem(record)}>add</Button>
        <Button type="danger" size="small" onClick={() => handleDelete(record)}>delte</Button>
      </div>
    )
  }

  // 请不要使用useEffect(async ()=>{...}) 这种方式来定义异步函数,异步函数应该在在函数内定义，如下
  useEffect(() => {
    async function fetchData() {
      // 使用commit直接更新reducer中的数据状态
      commit([props, 'showState'], true)
      await actions.fetchThead({ operationRender })
      await actions.fetchTableBody()
      commit([props, 'showState'], false)
    }
    fetchData()
  }, [])
  // size="middle"
  // ellipsis={false}
  return (
      <DataGrid
        loading={false}
        pagination={false}
        rowsCount={tableData.length}
        rowHeight={40}
        headerHeight={40}
        readonly={false}
        enableSequence={true}
        startSequence={1}
        enableAddDelrow={true}
        onAddrow={()=>console.log('on add row: ', arguments)}
        onDelrow={()=>console.log('on del row: ', arguments)}
        columns={tableThead.map((item, index) => {
          return <DataGrid.Column
            key={index}
            width={100}
            flexGrow={1}
            columnKey={item.dataIndex}
            header={<DataGrid.Cell key={index}>{item.title}</DataGrid.Cell>}
            cell={({ rowIndex, ...props }) => {
              return (<DataGrid.TextCell height={40} key={index+rowIndex} value={tableData[rowIndex][item.dataIndex]} />)
            }}
          ></DataGrid.Column>
        })}
      >
      </DataGrid>
  )
}

