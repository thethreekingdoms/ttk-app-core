import React, { useState, useCallback, useEffect } from 'react'
import {
  Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, DatePicker,
  Tag, Tabs, Tooltip, DataGrid, Dialog, Modal, Popover
} from 'edf-component'
import { Divider } from 'antd';
import { useData, useActions, useCommit } from 'edf-app-loader'
import MockKeyboard from './MockKeyboard'
import { ResultEditer, QuotaWidget } from './Widgets'

const defaultStyle = {
  padding: 5, display: 'flex', lineHeight: "20px", wordBreak: "break-word", whiteSpace: 'normal', width: '100%'
}
const editStyle = {
  textAlign: 'center', lineHeight: "350px"
}

export default function Component(props) {
  const commit = useCommit()
  const actions = useActions(props)
  const loading = useData([props, 'dialogTempState', 'loading'])
  const tableData = useData([props, 'conditionsTableData']).toJS()
  const tableThead = useData([props, 'conditionsThead']).toJS()
  const [selectAll, setSelectAll] = useState(false)
  const [conditionsPop, setConditionsPop] = useState(false)
  const [resultPop, setResultPop] = useState(false)
  // const [filterCriteriaMap] = useState(['<', '>', '=', '<=', '>='])

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
      await actions.fetchConditionsTableBody()
      commit([props, 'dialogTempState'], { type: 'setLoading', data: false })
    }
    fetch()
  }, [])

  return (
    <Layout className="ttk-table-container">
      <div className="ant-card-head-title" style={{
        flex: 'none',
        padding: '16px 32px',
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '16px'
      }}>条件</div>
      {/* <Card className="ttk-card-form" title="条件" style={{padding: 0}}></Card> */}
      <DataGrid
        style={{ marginBottom: 10 }}
        defaul={true}
        // height={300}
        maxHeight={600}
        loading={loading}
        pagination={false}
        rowsCount={tableData.length}
        rowHeight={80}
        headerHeight={50}
        readonly={false}
        align="center"
        rowHeightGetter={(index) => {
          if (tableData.length <= 0) return
          if (tableData[index] === undefined) return 80
          return tableData[index]['isEdit'] ? 350 : 80
        }}
        columns={tableThead.map((item, index) => {
          return <DataGrid.Column
            key={index}
            isResizable={true}
            // 设置自适应宽度， flexGrow为2时，这个列为2倍宽度，（主要：所有的列宽相加后总宽度必须小于表格宽度才有效
            flexGrow={index === 0 ? 2 : index === 1 ? 3 : 1}
            width={100}
            // 设置固定列宽
            // width={index === 0 ? 60 : index === 1 ? 130 : index === 2 ? 350 : index === 3 ? 100 : index === 5 ? 380 : index === 8 ? 120 : 100}
            columnKey={item.dataIndex}
            // 固定左边2列
            // fixed={index > 1 ? false : true}
            // fixedRight={index>1? false: true}
            header={<DataGrid.Cell style={{ padding: 8 }} key={index}>{
              item.title === 'checkbox' ?
                (<Checkbox onChange={(e) => onSelectAll(e.target.checked)} checked={selectAll}></Checkbox>)
                : item.title
            }</DataGrid.Cell>}
            cell={({ rowIndex, ...other }) => {
              const isEdit = tableData[rowIndex]['isEdit']
              const result = {
                satisfyResult: tableData[rowIndex].satisfyResult,
                dissatisfyResult: tableData[rowIndex].dissatisfyResult,
                exceptionResult: tableData[rowIndex].exceptionResult
              }
              switch (item.dataIndex) {
                case 'satisfyResult':
                  return (
                    <DataGrid.Cell style={isEdit ? {} : defaultStyle} >
                      <Tooltip title="必填项">
                        {
                          isEdit ?
                            <ResultEditer
                              value={result}
                              onChange={(obj) => commit([props, 'conditionsTableData'], { type: 'update-item', data: { ...tableData[rowIndex], ...obj } })}
                              onClick={(obj) => commit([props, 'conditionsTableData'], { type: 'update-item', data: { ...tableData[rowIndex], ...obj } })}
                            />
                            : (
                              <div style={{ width: '100%', textAlign: 'left' }}>
                                满足：{result.satisfyResult}<br />
                                不满足：{result.dissatisfyResult}<br />
                                异常：{result.exceptionResult}
                              </div>
                            )
                        }
                      </Tooltip>
                    </DataGrid.Cell>
                  )
                case 'expresstionText':
                  return (
                    <DataGrid.Cell style={isEdit ? editStyle : { ...defaultStyle, textAlign: 'left' }} >
                      <Tooltip title="必填项">
                        {
                          isEdit ?
                            <Popover
                              trigger="focus"
                              overlayClassName="rule-engine-popover"
                              content={<MockKeyboard
                                onClick={async (key, e) => {
                                  // 使用键盘代理处理所有虚拟按钮，特别是带有二次确认的按钮需要特殊处理
                                  const keyValue = await keyboardProxy(key)
                                  commit([props, 'conditionsTableData'], { type: 'update-item', data: { ...tableData[rowIndex], expresstionText: tableData[rowIndex][item.dataIndex] + keyValue } })
                                }}
                                // 在这里重新定义你的虚拟键盘按钮
                                keys={['', 'a', { key: 'obj', value: '2' }, { key: '指标', value: 'quota' }, '#', '%', '7', 'b', 'c', '#', '%', '7', '7', '%', '', '']}
                              />}
                            >
                              <Input
                                value={tableData[rowIndex][item.dataIndex]}
                                onChange={(e) => commit([props, 'conditionsTableData'], { type: 'update-item', data: { ...tableData[rowIndex], expresstionText: e.target.value } })}
                              />
                            </Popover>
                            : tableData[rowIndex][item.dataIndex]
                        }
                      </Tooltip>
                    </DataGrid.Cell>
                  )
                case 'operate':
                  return (
                    <DataGrid.Cell style={isEdit ? editStyle : defaultStyle} >
                      {
                        isEdit ?
                          <a onClick={() => actions.updateConditionsTableBody({ ...tableData[rowIndex], isEdit: false })}>保存</a>
                          : <a onClick={() => commit([props, 'conditionsTableData'], { type: 'update-item', data: { ...tableData[rowIndex], isEdit: true } })}>编辑</a>
                      }
                      <Divider type="vertical" />
                      <a onClick={(() => actions.deleteConditionsTablItem({ ...tableData[rowIndex] }))}>删除</a>
                    </DataGrid.Cell>
                  )
                default:
                  return (<DataGrid.TextCell height={40} key={index + rowIndex} value={tableData[rowIndex][item.dataIndex]} />)
              }
            }}
          ></DataGrid.Column>
        })}
      ></DataGrid>
      <Button icon="plus" type="dashed" onClick={() => commit([props, 'conditionsTableData'], { type: 'add-item', data: null })}>添加</Button>
    </Layout>
  )
}

/**
 * 虚拟键盘事件代理，这是一个异步函数，处理指定key值的事件，主要用来处理带二次确定的虚拟按钮
 * @param {*} key 虚拟键盘传过来的key值。
 */
function keyboardProxy(key) {
  const keyValue = typeof key !== 'object' ? key : key.value
  let dialog
  return new Promise((resolve, reject) => {
    switch (keyValue) {
      case "quota":
        let quotaCheckedList
        dialog = Dialog.open({
          title: "选择指标",
          content: <QuotaWidget onClick={checkedList => quotaCheckedList = checkedList} />,
          onOk: () => {
            resolve(quotaCheckedList.join(' '))
            dialog.destroy()
          },
          onCancel: () => {
            resolve('')
            dialog.destroy()
          }
        })
        return
      case '其它按钮':
        resolve('')
      default:
        return resolve(keyValue)
    }
  })
}