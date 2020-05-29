import webapi from '../webapi'
import { validator } from 'edf-utils'

/************************** 筛选条件表格 start **************************/
export function fetchConditionsTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const searchOption = {pager: {pageSize: 20, pageIndex:1}} // gf(['searchParam'])
    const res = await webapi.conditionsTable(searchOption)
    if(res){
      // reduce('searchParam', {type: 'update_search_page', data: res.pager})
      reduce('conditionsTableData', { type: 'update-list', data: res.data })
      return res
    }
  }
}


export function updateConditionsTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.updateData(data)
    if(res){
      reduce('conditionsTableData', { type: 'update-item', data })
      return res
    }
  }
}

export function deleteConditionsTablItem(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.deleteItem(data)
    if(res){
      reduce('conditionsTableData', { type: 'remove-item', data })
      return res
    }
  }
}

export function addConditionsTablItem(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.addItem(data)
    if(res){
      // console.log('addIOTablItem: action add-item: ', data)
      // reduce('f', {type: 'update_search_page', data: res.pager})
      reduce('conditionsTableData', { type: 'add-item', data })
      return res
    }
  }
}

/************************** 筛选条件表格 end **************************/