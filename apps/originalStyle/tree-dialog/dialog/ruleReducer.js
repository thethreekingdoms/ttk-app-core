import { Map, fromJS, List } from 'immutable'
import moment from 'moment'

/************************** 规则-条件表格 start **************************/

export function conditionsThead(state = List(), action) {
  state = List(fromJS([{
    title: '条件',
    dataIndex: 'expresstionText'
  }, {
    title: '结果',
    dataIndex: 'satisfyResult'
  }, {
    title: '操作',
    dataIndex: 'operate'
  }]))
  return state
}


export function conditionsTableData(state = List(), action) {
  let index
  switch (action.type) {
    case 'update-list':
      state = List(fromJS(action.data))
      return state
    case 'add-item':
      if (action.data === null)
        action.data = {
          satisfyResult:'', 
          dissatisfyResult:'', 
          exceptionResult:'',
          expresstionText:'',
          tempId: Date.parse(new Date()), // 添加临时ID，用于更新记录
          isEdit: true
        }
      // 插入到指定位置
      // state = state.insert(parseInt(action.data.seq), fromJS({...action.data}))
      // 在列表最后插入记录
      state = state.push(fromJS({ ...action.data }))
      return state
    case 'remove-item':
      index = getIndex(state, action.data)
      return state.slice(0, index).concat(state.slice(index + 1, state.count()))
    case 'update-item':
      index = getIndex(state, action.data)
      state = state.update(index, record => record = fromJS(action.data))
      return state
    // case 'selectall':
    //   return state.map(item=>{
    //     return item.sf(['selected'], action.data)
    //   })
    default:
      return state
  }
}

// 查找data在state列表中的index值
function getIndex(state, data){
  return state.findIndex((item, index, array) => {
    if (data.id)
      return item.get('id') === data.id
    else
      // 如果没有id字段，使用添加时的临时ID来查找
      return item.get('tempId') === data.tempId
  })
}
/************************** 规则-条件表格 end **************************/
