import React, { useState, useCallback, useEffect } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, DatePicker, Tag, Tabs, DataGrid, Dialog, Modal } from 'edf-component'
import { Divider } from 'antd';
import { useData, useActions, useCommit } from 'edf-app-loader'

export default function CardTree(props) {
  const commit = useCommit()
  const actions = useActions(props)
  const loading = useData([props, 'dialogTempState', 'loading'])
  const tableData = useData([props, 'filterCriteriaTableData']).toJS()
  const tableThead = useData([props, 'filterCriteriaThead']).toJS()
  const [selectAll, setSelectAll] = useState(false)
  const [filterCriteriaMap] = useState(['<', '>', '=', '<=', '>='])

  const handleChange = useCallback(async (e) => {
    console.log('on handle Change', e)
  }, [])

  const showQuotaDialog = useCallback((e) => {
    console.log('on handle Change', e)
    const dialog = Dialog.open({
      width: 1280,
      title: "选择指标",
      cancelText: '自定义取消',
      okText: '自定义确认',
      content: <div>指标库组件</div>,
      onOk: () => console.log('jjj'),
      onCancel: () => dialog.destroy()
    })
  }, [])

  useEffect(() => {
    const fetch = async () => {
      commit([props, 'dialogTempState'], { type: 'setLoading', data: true })
      await actions.fetchFilterCriteriaTableBody()
      commit([props, 'dialogTempState'], { type: 'setLoading', data: false })
    }
    fetch()
  }, [])

  return (
    <Layout className="ttk-table-container">
      <DataGrid
        style={{ marginBottom: 10 }}
        defaul={true}
        // height={300}
        maxHeight={600}
        loading={loading}
        pagination={false}
        rowsCount={tableData.length}
        rowHeight={45}
        headerHeight={50}
        readonly={false}
        align="center"
        columns={tableThead.map((item, index) => {
          return <DataGrid.Column
            key={index}
            isResizable={true}
            // 设置自适应宽度， flexGrow为2时，这个列为2倍宽度，（主要：所有的列宽相加后总宽度必须小于表格宽度才有效
            flexGrow={index === 0 ? 3 : index === 1 ? 2 : 1}
            width={100}
            // 设置固定列宽
            // width={index === 0 ? 60 : index === 1 ? 130 : index === 2 ? 350 : index === 3 ? 100 : index === 5 ? 380 : index === 8 ? 120 : 100}
            columnKey={item.dataIndex}
            // 固定左边2列
            fixed={index > 1 ? false : true}
            // fixedRight={index>1? false: true}
            header={<DataGrid.Cell style={{ padding: 8 }} key={index}>{
              item.title === 'checkbox' ?
                (<Checkbox onChange={(e) => onSelectAll(e.target.checked)} checked={selectAll}></Checkbox>)
                : item.title
            }</DataGrid.Cell>}
            cell={({ rowIndex, ...other }) => {
              const isEdit = tableData[rowIndex]['isEdit']
              switch (item.dataIndex) {
                case 'quota':
                  return (
                    <DataGrid.Cell style={{ textAlign: 'center', padding: 5 }} >
                      {
                        isEdit ?
                          <label><Tag color="blue">{tableData[rowIndex][item.dataIndex]}</Tag><Divider type="vertical" /><a onClick={showQuotaDialog}>选择指标</a></label>
                          : <label><Tag color="blue" >{tableData[rowIndex][item.dataIndex]}</Tag></label>
                      }
                    </DataGrid.Cell>
                  )
                case 'compareSymbol':
                  return (
                    <DataGrid.Cell style={{ textAlign: 'center', padding: 5 }} >
                      {
                        isEdit ?
                          <Select
                            placeholder="请选择是否循环"
                            style={{ width: '75%' }}
                            value={tableData[rowIndex][item.dataIndex]}
                            onChange={e => commit([props, 'filterCriteriaTableData'], { type: 'update-item', data: { ...tableData[rowIndex], compareSymbol: e } })} >
                            {
                              filterCriteriaMap.map((mapItem, mapIndex) => <Select.Option value={mapIndex}>{mapItem}</Select.Option>)
                            }
                          </Select>
                          : <label>{filterCriteriaMap[tableData[rowIndex][item.dataIndex]]}</label>
                      }
                    </DataGrid.Cell>
                  )
                case 'value':
                  return (
                    <DataGrid.Cell style={{ textAlign: 'center', padding: 5 }} >
                      {
                        isEdit ?
                          <Input value={tableData[rowIndex][item.dataIndex]} onChange={(e) => commit([props, 'filterCriteriaTableData'], { type: 'update-item', data: { ...tableData[rowIndex], value: e.target.value } })} />
                          : tableData[rowIndex][item.dataIndex]
                      }
                    </DataGrid.Cell>
                  )
                case 'operate':
                  return (
                    <DataGrid.Cell style={{ textAlign: 'center', padding: 5 }} >
                      {
                        isEdit ?
                          <a onClick={() => actions.updateFilterCriteriaTableBody({ ...tableData[rowIndex], isEdit: false })}>保存</a>
                          : <a onClick={() => commit([props, 'filterCriteriaTableData'], { type: 'update-item', data: { ...tableData[rowIndex], isEdit: true } })}>编辑</a>
                      }
                      <Divider type="vertical" />
                      <a onClick={(() => actions.deleteFilterCriteriaTablItem({ ...tableData[rowIndex] }))}>删除</a>
                    </DataGrid.Cell>
                  )
                default:
                  return (<DataGrid.TextCell height={40} key={index + rowIndex} value={tableData[rowIndex][item.dataIndex]} />)
              }
            }}
          ></DataGrid.Column>
        })}
      ></DataGrid>
      <Button icon="plus" type="dashed" onClick={() => commit([props, 'filterCriteriaTableData'], { type: 'add-item', data: null })}>添加</Button>
    </Layout>
  )
}
