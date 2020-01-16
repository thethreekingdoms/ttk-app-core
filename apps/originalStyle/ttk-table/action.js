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
    reduce('searchParam', {type: 'update_search_page', data: res.page})
    reduce('tableData', { type: 'rpt_update_list', data: res.list })
    return res
  }
}
