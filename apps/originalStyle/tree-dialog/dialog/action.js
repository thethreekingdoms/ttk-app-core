import webapi from '../webapi'
import { validator } from 'edf-utils'


/************************** 属性表单 start **************************/

// 定义需要校验的字段和校验规则, 支持同一个字段多条规则和异步校验，详情可参考
// https://github.com/yiminghe/async-validator
const descriptor = {
  code: [{ type: 'string', required: true, message: '请输入编码' }, {
    asyncValidator: async (rule, value, callback) => {
      const res = await webapi.person.validateFunctionCode(value)
      if (res.errorCode !== '0') {
        callback(res.errorMsg)
      } else {
        callback()
      }
    }
  }],
  name: { type: 'string', required: true, message: '请输入名称' },
  sortNo: [{ type: 'string', required: true, message: '请输入顺序' }, { pattern: /^\d{1,12}$/, message: '顺序必须是数字' }],
  busTypeId: { type: 'string', required: true, message: '请选择业务类型' },
  url: { type: 'string', required: true, message: '请输入路径' }
}
// 更新表单
export function updateFormObj(reduce, gf, fields) {
  return async (dispatch, getState) => {
    // 字段校验。返回一个长度为2的数组，第一个是boolean值，代表是否校验成功，第二个是错误消息状态
    const [result, resultObj] = await validator.fieldValidator(fields, descriptor)
    // 更新文本域验证状态
    reduce('validateState', { type: 'update', data: resultObj })
    // 更新表单数据
    reduce('attributeForm', { type: 'update', data: fields })
    return resultObj
  }
}

// 提交表单
export function dialogSave(reduce, gf, data) {
  return async (dispatch, getState) => {
    // 获取表单数据
    const formObj = gf(['attributeForm'])
    const isEdit = gf(['tempState', 'isEdit'])
    formObj.sortNo = String(formObj.sortNo)
    // 字段校验。返回一个长度为2的数组，第一个是boolean值，代表是否校验成功，第二个是错误消息状态
    const [result, resultObj] = await validator.fieldValidator(formObj, descriptor)
    // 更新文本域验证状态
    reduce('validateState', { type: 'update', data: resultObj })
    let submitResult = false
    let saveResult

    if (result) {
      // 提交表单
      saveResult = await webapi.person.update(formObj)
      if (saveResult === undefined) {
        submitResult = false
      } else {
        // 新增或修改时记录时需要更新树
        if (!isEdit) {
          dispatch(getTreeChildrenData(reduce, gf, { functioinId: formObj.parentId, subNodeFlag: '1' }))
          // reduce('treeData', { type: 'addChildren', data: { ...formObj } })
        } else {
          reduce('treeData', { type: 'updateChildren', data: { ...formObj } })
        }
        submitResult = true
      }
    }
    return [result, resultObj, submitResult]
  }
}

/************************** 属性表单 end **************************/
/************************** io表格 start **************************/
export function fetchIOTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const searchOption = {pager: {pageSize: 20, pageIndex:1}} // gf(['searchParam'])
    const res = await webapi.ioTable(searchOption)
    if(res){
      // reduce('searchParam', {type: 'update_search_page', data: res.pager})
      reduce('ioTableData', { type: 'update-list', data: res.data })
      return res
    }
  }
}

export function updateIOTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.updateData(data)
    if(res){
      reduce('ioTableData', { type: 'update-item', data })
      return res
    }
  }
}

export function deleteIOTablItem(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.deleteItem(data)
    if(res){
      reduce('ioTableData', { type: 'remove-item', data })
      return res
    }
  }
}

export function addIOTablItem(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.addItem(data)
    if(res){
      // console.log('addIOTablItem: action add-item: ', data)
      // reduce('f', {type: 'update_search_page', data: res.pager})
      reduce('ioTableData', { type: 'add-item', data })
      return res
    }
  }
}


/************************** io表格 end **************************/
/************************** 筛选条件表格 start **************************/
export function fetchFilterCriteriaTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const searchOption = {pager: {pageSize: 20, pageIndex:1}} // gf(['searchParam'])
    const res = await webapi.filterCriteriatable(searchOption)
    if(res){
      // reduce('searchParam', {type: 'update_search_page', data: res.pager})
      reduce('filterCriteriaTableData', { type: 'update-list', data: res.data })
      return res
    }
  }
}


export function updateFilterCriteriaTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.updateData(data)
    if(res){
      reduce('filterCriteriaTableData', { type: 'update-item', data })
      return res
    }
  }
}

export function deleteFilterCriteriaTablItem(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.deleteItem(data)
    if(res){
      reduce('filterCriteriaTableData', { type: 'remove-item', data })
      return res
    }
  }
}

export function addFilterCriteriaTablItem(reduce, gf, data) {
  return async (dispatch, getState) => {
    const res = true // await webapi.addItem(data)
    if(res){
      // console.log('addIOTablItem: action add-item: ', data)
      // reduce('f', {type: 'update_search_page', data: res.pager})
      reduce('filterCriteriaTableData', { type: 'add-item', data })
      return res
    }
  }
}

/************************** 筛选条件表格 end **************************/
