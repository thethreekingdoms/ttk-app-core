import webapi from './webapi'
import moment from 'moment'

export function fetchDateAcion(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = await webapi.queryDate()
    reduce('dateRange', res)
    reduce('searchFlag', { type: 'flag_true' })
  }
}

export function updateSearchParam(reduce, gf, data) {
  return async (dispatch, getState) => {
    reduce('searchParam', { type: 'update_search_param', data })
    reduce('searchFlag', { type: 'flag_true' })
  }
}

export function updateSearchPage(reduce, gf, data) {
  return async (dispatch, getState) => {
    reduce('searchParam', { type: 'update_search_page', data })
    reduce('searchFlag', { type: 'flag_true' })
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
    // 添加Checkbox列
    const columns = [{
      title: 'checkbox',
      dataIndex: 'selected'
    }]
    res.column.columnDetails.map((item, index) => {
      if (!item.isVisible) return
      columns.push({
        title: item.caption,
        dataIndex: item.fieldName
      })
    })

    reduce('tableThead', columns)
    return columns
  }
}

export function fetchTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const searchOption = gf(['searchParam'])
    const res = await webapi.tableBody(searchOption)
    reduce('searchParam', { type: 'update_search_page', data: res.page })
    reduce('tableData', { type: 'rpt_update_list', data: res.list })
    return res
  }
}

// export function updateSelectedRow(reduce, gf, data) {
//   return async () => {
//     reduce('tableCheckbox', data)
//   }
// }

export function deleteTableRow(reduce, gf, data) {
  return async (dispatch, getState) => {
    // 通过接口修改记录后更新本地记录
    // const res =  await deleteReceive()
    reduce('tableData', { type: 'rpt_remove_item', data })
    reduce('searchFlag', { type: 'flag_false' })
  }
}
export function addRow(reduce, gf, data) {
  return async (dispatch, getState) => {
    const row = {
      ...data,
      businessDate: moment().format('YYYY-MM-DD')
    }
    // 根据实际情况，调用接口更新数据
    // const res = await webapi.addRow(row)
    // if (res) {
    reduce('tableData', { type: 'rpt_insert_item', data: row })
    reduce('searchFlag', { type: 'flag_false' })
    // }
  }
}


export function updateTableRow(reduce, gf, data) {
  // 通过接口修改记录后更新本地记录
  // const res = await   batchUpdateColumn()
  return async (dispatch, getState) => {
    reduce('tableData', { type: 'rpt_update_item', data })
  }
}