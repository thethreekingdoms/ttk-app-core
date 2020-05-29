import webapi from './webapi'
import { validator } from 'edf-utils'
export {
  updateFormObj,
  dialogSave,
  fetchIOTableBody,
  updateIOTableBody,
  deleteIOTablItem,
  addIOTablItem,
  fetchFilterCriteriaTableBody,
  updateFilterCriteriaTableBody,
  deleteFilterCriteriaTablItem,
  addFilterCriteriaTablItem
} from './dialog/action'
export {
  fetchConditionsTableBody,
  updateConditionsTableBody,
  deleteConditionsTablItem,
  addConditionsTablItem
} from './dialog/ruleAction'

/************************** 树组件数据 start **************************/

export function deleteTreeItem(reduce, gf, fields) {
  return async (dispatch, getState) => {
    const formObj = gf(['formObj'])
    const result = await webapi.delDic(formObj)
    if (result.errorCode === '0') {
      dispatch(getTreeChildrenData(reduce, gf, { functioinId: formObj.parentId }))
      reduce('selectKey', { type: 'init', data: 0 })
      reduce('formObj', { type: 'reset', data: {} })
      return result
    }
  }
}

export function getTreeData(reduce, gf, data) {
  return async (dispatch, getState) => {
    const treeData = gf(['treeData'])
    if (treeData.length > 0) return
    const root = await webapi.getTreeData({})
    if (root === undefined) return
    reduce('treeData', { type: 'update', data: root })
  }
}

export function getTreeChildrenData(reduce, gf, { functioinId, ...orther }) {
  return async (dispatch, getState) => {
    const res = await webapi.getSubTreeData({
      pid: functioinId,
      level: 0
    })
    if (res === undefined) return null
    reduce('treeData', { type: 'updateChildren', data: { children: res, functioinId, ...orther } })
    return res
  }
}

export function getTreeNodeDetail(reduce, gf, functioinId) {
  return async (dispatch, getState) => {
    let res = await webapi.findById({ functioinId })
    if (res === undefined) return
    reduce('formObj', {
      type: 'update', data: {
        parentName: res.parentName,
        ...res.secFunctioinDTOReturn
      }
    })
    reduce('tempState', { type: 'setEdit', data: true })
  }
}

/************************** 树组件数据 end **************************/

/************************** 表格数据 start **************************/

export function fetchThead(reduce, gf, data) {
  return async (dispatch, getState) => {
    // 查询时的查询条件应通过gf函数从store中获取参数，尽量减少从View层传参
    const searchOption = gf(['searchParam'])
    const res = await webapi.thead(searchOption)
    // 添加Checkbox列
    let columns = [{
      title: 'checkbox',
      dataIndex: 'selected'
    }]
    if (res) {
      res.map((item, index) => {
        // if (!item.isVisible) return
        columns.push({
          ...item,
          key: index,
        })
      })
      reduce('tableThead', columns)
      return columns
    }
  }
}

export function fetchTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const searchOption = gf(['searchParam'])
    const res = await webapi.tableBody(searchOption)
    if (res) {
      reduce('searchParam', { type: 'update_search_page', data: res.pager })
      reduce('tableData', { type: 'update-list', data: res.data })
      return res
    }
  }
}

/************************** 表格数据 end **************************/