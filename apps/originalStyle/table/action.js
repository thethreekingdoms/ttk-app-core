import webapi from './webapi'
import moment from 'moment'

export function fetchDateAcion(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = await webapi.queryDate()
    reduce('dateRange', res)
  }
}

export function updateSearchParam(reduce, gf, data) {
  return async (dispatch, getState) => {
    reduce('searchParam', { type: 'update_search_param', data })
  }
}

export function updateSearchPage(reduce, gf, data) {
  return async (dispatch, getState) => {
    reduce('searchParam', { type: 'update_search_page', data })
  }
}
export function fetchThead(reduce, gf, data) {
  return async (dispatch, getState) => {
    // 查询时的查询条件应通过gf函数从store中获取参数，尽量减少从View层传参
    const searchOption = gf(['searchParam'])
    const { entity } = searchOption
    entity.beginDate = entity.beginDate.format('YYYY-MM')
    entity.endDate = entity.endDate.format('YYYY-MM')
    const res = await webapi.thead(searchOption)
    const columns = []
    res.column.columnDetails.map((item, index) => {
      if (!item.isVisible) return
      columns.push({
        title: item.caption,
        key: index,
        dataIndex: item.fieldName,
        isMustSelect: item.isMustSelect,
        editable: index === 0 ? false : true,
        width: index === 0 ? 60 : index === 1 ? 130 : index === 2 ? 280 : index === 3 ? 300 : index === 5 ? 180 : index === 8 ? 120 : 100,
      })
    })
    // 添加操作列
    columns.push({
      title: '操作',
      key: Math.random(),
      dataIndex: '操作',
      editable: false,
      isMustSelect: false,
      fixed: 'right',
      width: 180,
      // 渲染函数由页面传递过来
      render: data.operationRender
    })
    // 根据editabl属性设置可编辑列
    const resultColumns = columns.map(col => {
      if (!col.editable) return col
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          isMustSelect: col.isMustSelect,
          title: col.title,
          handleSave: row => updateTableRow(reduce, gf, row)
        })
      }
    })
    reduce('tableThead', resultColumns)
    return resultColumns
  }
}

export function fetchTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const searchOption = gf(['searchParam'])
    const res = await webapi.tableBody(searchOption)
    reduce('searchParam', {type: 'update_search_page', data: res.page})
    reduce('tableData', { type: 'rpt_update_list', data: res.list })
    return res
  }
}

export function updateSelectedRow(reduce, gf, data) {
  return async () => {
    reduce('tableCheckbox', data)
  }
}

export function deleteTableRow(reduce, gf, data) {
  return async (dispatch, getState) => {
    // 通过接口修改记录后更新本地记录
    // const res =  await deleteReceive()
    reduce('tableData', { type: 'rpt_remove_item', data })
  }
}
export function addRow(reduce, gf, data) {
  return async (dispatch, getState) => {
    const row = {
      ...data,
      businessDate: moment().format('YYYY-MM-DD')
    }
    const res = await webapi.addRow(row)
    if (res) {
      reduce('tableData', { type: 'rpt_insert_item', data:row })
    }
  }
}


// 这不是一个action函数，不会注册到action列表。没有export的函数并不是一个action
async function updateTableRow(reduce, gf, data) {
  // 通过接口修改记录后更新本地记录
  // const res = await   batchUpdateColumn()
  reduce('tableData', { type: 'rpt_update_item', data })
}