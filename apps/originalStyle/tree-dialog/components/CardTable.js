import React, { useState, useCallback, useEffect } from 'react'
import { DataGrid, Spin, Card, Layout, Row, Col, Form, Input, Radio, Checkbox, Select, Button, Message } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'
import TableSearch from './TableSearch'

export default function CardTree(props) {
  const commit = useCommit()
  const actions = useActions(props)
  const loading = useData([props, 'tempState', 'loading'])
  const tableThead = useData([props, 'tableThead']).toJS()
  const tableData = useData([props, 'tableData']).toJS()
  const [selectAll, setSelectAll] = useState(false)

  // 请不要使用useEffect(async ()=>{...}) 这种方式来定义异步函数,异步函数应该在在函数内定义，如下
  useEffect(() => {
    async function fetchData() {
      // 使用commit直接更新reducer中的数据状态
      commit([props, 'tempState'], { type: 'setLoading', data: true })
      await actions.fetchThead()
      await actions.fetchTableBody()
      commit([props, 'tempState'], { type: 'setLoading', data: false })
    }
    fetchData()
  }, [])

  const onSelectAll = useCallback((value) => {
    setSelectAll(value)
    commit([props, 'tableData'], { type: 'selectall', data: value })
  }, [tableData])
  return (
    <DataGrid
      loading={loading}
      pagination={false}
      rowsCount={tableData.length}
      rowHeight={40}
      headerHeight={40}
      readonly={false}
      align="center"
      // enableSequence={true}
      // startSequence={1}
      // enableAddDelrow={true}
      // onAddrow={()=>console.log('on add row: ', arguments)}
      // onDelrow={()=>console.log('on del row: ', arguments)}
      columns={tableThead.map((item, index) => {
        return <DataGrid.Column
          key={index}
          isResizable={true}
          // 设置自适应宽度， flexGrow为2时，这个列为2倍宽度，（主要：所有的列宽相加后总宽度必须小于表格宽度才有效
          flexGrow={index === 2? 2: 1}
          width={30}
          // 设置固定列宽
          // width={index === 0 ? 60 : index === 1 ? 130 : index === 2 ? 350 : index === 3 ? 100 : index === 5 ? 380 : index === 8 ? 120 : 100}
          columnKey={item.dataIndex}
          // 固定左边2列
          fixed={index>1? false: true}
          // fixedRight={index>1? false: true}
          header={<DataGrid.Cell key={index}>{
            item.title === 'checkbox' ?
              (<Checkbox onChange={(e) => onSelectAll(e.target.checked)} checked={selectAll}></Checkbox>)
              : item.title
          }</DataGrid.Cell>}
          cell={({ rowIndex, ...props }) => {
            switch (item.dataIndex) {
              case 'selected':
                return (<DataGrid.Cell style={{ textAlign: 'center' }} ><Checkbox onChange={(e) => updateItem(rowIndex, { selected: e.target.checked })} checked={tableData[rowIndex][item.dataIndex]} /></DataGrid.Cell>)
              default:
                return (<DataGrid.TextCell height={40} key={index + rowIndex} value={tableData[rowIndex][item.dataIndex]} />)
            }
          }}
        ></DataGrid.Column>
      })}
    ></DataGrid>
  )
}