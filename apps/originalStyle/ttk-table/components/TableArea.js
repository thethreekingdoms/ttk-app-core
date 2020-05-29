
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
  const [tableOption] = useState({ y: 480 })

  // 请不要使用useEffect(async ()=>{...}) 这种方式来定义异步函数,异步函数应该在在函数内定义，如下
  useEffect(() => {
    async function fetchData() {
      // 使用commit直接更新reducer中的数据状态
      commit([props, 'showState'], true)
      await actions.fetchThead()
      await actions.fetchTableBody()
      commit([props, 'showState'], false)
    }
    fetchData()
  }, [])
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
            width={index === 0 ? 60 : index === 1 ? 130 : index === 2 ? 350 : index === 3 ? 100 : index === 5 ? 380 : index === 8 ? 120 : 100}
            flexGrow={1}
            columnKey={item.dataIndex}
            // 固定左边2列
            fixed={index>1? false: true}
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

