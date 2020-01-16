
import React, { useEffect, useState } from 'react'
import { Modal, Button, Table } from 'antd'
import { DataGrid, Checkbox, Input } from 'edf-component' // '../datagrid'
import { useData, useActions, useCommit } from 'edf-app-loader'
import Pagination from './Pagination'

export default function TableArea(props) {
  const commit = useCommit()
  const actions = useActions(props)
  const { loading } = useData([props, 'showState']).toJS()
  const tableData = useData([props, 'tableData']).toJS()
  const tableThead = useData([props, 'tableThead']).toJS()
  // const [cellSelectState, setCellSelectState] = useState()
  const [selectAll, setSelectAll] = useState(true)
  const [cellTarget, setCellTarget] = useState([-1, -1])

  function onSelectAll(value) {
    setSelectAll(value)
    commit([props, 'tableData'], { type: 'selectall', data: value })
  }
  async function addItem(record) {
    // 使用commit直接更新reducer中的数据状态
    commit([props, 'showState'], true)
    await actions.addRow(tableData[record.rowIndex])
    commit([props, 'showState'], false)
  }

  function handleDelete(record) {
    Modal.confirm({
      title: '删除',
      content: '确认删除?',
      onOk() {
        actions.deleteTableRow(tableData[record.rowIndex])
      }
    })
  }

  async function updateItem(rowIndex, data) {
    commit([props, 'showState'], true)
    actions.updateTableRow({ ...tableData[rowIndex], ...data })
    commit([props, 'showState'], false)
  }


  // 请不要使用useEffect(async ()=>{...}) 这种方式来定义异步函数,异步函数应该在在函数内定义，如下
  useEffect(() => {
    async function fetchData() {
      // 使用commit直接更新reducer中的数据状态
      commit([props, 'showState'], true)
      await actions.fetchThead()
      await actions.fetchTableBody()
      commit([props, 'tableData'], { type: 'selectall', data: selectAll })
      commit([props, 'showState'], false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const maxRow = tableData.length
    const maxCol = tableThead.length
    if (!maxRow || maxRow<=0) return()=>{}
    function onKeydown(e) {
      let [colIndex, rowIndex] = cellTarget;
      if (rowIndex ===null) colIndex = rowIndex = 0
      else {
        if (e.key === 'ArrowUp') {
          rowIndex - 1 < 0 ? rowIndex=0 : rowIndex -= 1
        } else if (e.key === 'ArrowDown') {
          rowIndex + 1 > maxCol ? rowIndex=maxCol : rowIndex += 1
        } else if (e.key === 'ArrowLeft') {
          colIndex - 1 < 0 ? colIndex=0 : colIndex -= 1
        } else if (e.key === 'ArrowRight') {
          colIndex + 1 > maxRow ? maxRow : colIndex += 1
        }
      }
      setCellTarget([colIndex, rowIndex])
    }
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [tableData, tableThead])

  return (
    <DataGrid
      loading={loading}
      pagination={false}
      rowsCount={tableData.length}
      rowHeight={40}
      headerHeight={40}
      readonly={false}
      // enableSequence={true}
      // startSequence={1}
      enableAddDelrow={true}
      onAddrow={addItem}
      onDelrow={handleDelete}
      columns={tableThead.map((item, index) => {
        let t = false
        return <DataGrid.Column
          key={index}
          width={index === 0 ? 60 : index === 2 ? 130 : index === 3 ? 350 : index === 4 ? 100 : index === 6 ? 380 : index === 9 ? 120 : 100}
          flexGrow={1}
          columnKey={item.dataIndex}
          header={<DataGrid.Cell key={index}>{
            item.title === 'checkbox' ?
              (<Checkbox onChange={(e) => onSelectAll(e.target.checked)} checked={selectAll}></Checkbox>)
              : item.title
          }</DataGrid.Cell>}
          cell={({ rowIndex, ...props }) => {
            const [colTarget, rowTarget] = cellTarget;
            switch (item.dataIndex) {
              case 'selected':
                return (<DataGrid.Cell><Checkbox onChange={(e) => updateItem(rowIndex, { selected: e.target.checked })} checked={tableData[rowIndex][item.dataIndex]} /></DataGrid.Cell>)
              // 收支类型列
              case 'businessTypeName':
                return (<DataGrid.Cell onClick={e => setCellTarget([index, rowIndex])} >
                  {
                     colTarget === index && rowTarget === rowIndex ?
                      (<Checkbox onChange={(e) => updateItem(rowIndex, { selected: e.target.checked })} checked={tableData[rowIndex][item.dataIndex]} />)
                      : (<DataGrid.TextCell height={40} key={rowIndex} value={tableData[rowIndex][item.dataIndex]} />)
                  }
                </DataGrid.Cell>)
              // 摘要
              // case 'remark':
              default:
                return (<DataGrid.Cell onClick={e => setCellTarget([index, rowIndex])} >
                  {
                    colTarget === index && rowTarget === rowIndex ?
                      (<Input value={tableData[rowIndex][item.dataIndex]}  onBlur={e=>updateItem(rowIndex, { [item.dataIndex]: e.target.value })}  />)
                      : (<DataGrid.TextCell height={40} key={rowIndex} value={tableData[rowIndex][item.dataIndex]} />)
                  }
                </DataGrid.Cell>)
            }
          }}
        ></DataGrid.Column>
      })}
    >
    </DataGrid>
  )
}
