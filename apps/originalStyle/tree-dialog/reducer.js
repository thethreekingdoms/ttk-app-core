import { Map, fromJS, List } from 'immutable'
import moment from 'moment'
export {
  dialogTempState,
  attributeForm,
  validateState,
  ioThead,
  ioTableData,
  filterCriteriaThead,
  filterCriteriaTableData,
} from './dialog/reducer'
export{conditionsThead, conditionsTableData} from './dialog/ruleReducer'

// 所有的reducers函数在框架初始化时都会被框架自动调用一次，以初始化state数据。调用时action的值为{type:0.022444457651 },type是一个小于1的随机值
export function tempState(state = Map({
  isEdit: false,
  loading: false,
  showDialog: false
}), action) {
  switch (action.type) {
    case 'setEdit':
      return state.sf(['isEdit'], action.data)
    case 'setLoading':
      return state.sf(['loading'], action.data)
    case 'setShowDialog':
      return state.sf(['showDialog'], action.data)
    default:
      return state
  }
}

export function searchParam(state = Map(fromJS({
  entity: {
    beginDate: moment(),
    endDate: moment(),
    receiptPayment: "",
    receiveOrPay: "all",
    reciprocalAccountName: "",
    sourceVoucherType: 0,
    summary: "",
    voucherStatus: 0
  },
  pager: {
    pageIndex: 1,
    pageSize: 20,
    recordCount: 0,
    pageCount: 0
  }
})), action) {
  switch (action.type) {
    case "update_search_param":
      state = state.mergeIn(['entity'], action.data)
      return state
    case "update_search_page":
      return state = state.mergeIn(['pager'], fromJS(action.data))
    default:
      return state
  }
}

/************************** 树数据 start **************************/
export function treeData(state = List(), action) {
  let temp
  switch (action.type) {
    case 'update':
      return List(fromJS(action.data))
    case 'updateChildren':
      temp = updateChildren(state.toJS(), action.data)
      return List(fromJS(temp))
    case 'addChildren':
      return addChildren(state, action.data)
    default:
      return state
  }
}
export function selectKey(state = List([0]), action) {
  switch (action.type) {
    case 'init':
      return state.set(0, action.data)
    default:
      return state
  }
}

function updateChildren(list, { functioinId, children, subNodeFlag, ...orther }) {
  return list.map(item => {
    if (item.functioinId === functioinId) {
      item = Object.assign(item, orther)
      if (children !== undefined)
        item.children = children
      if (subNodeFlag !== undefined)
        item.subNodeFlag = subNodeFlag
      return item
    } else {
      if (item && item.children) {
        let temp = item
        temp.children = updateChildren(item.children, { functioinId, children, subNodeFlag, ...orther })
        return temp
      } else {
        return item
      }
    }
  })
}

function addChildren(state, { parentId, ...orther }) {
  return state.map((value, key) => {
    let temp
    if (value.gf(['functioinId']) === parentId) {
      if (value.has('children')) {
        temp = value.update('children', children => children.push({ parentId, ...orther }))
      } else {
        temp = value.set('children', fromJS([{ parentId, ...orther }]))
      }
      temp = temp.set('subNodeFlag', '1')
      return temp
    } else {
      if (value.has('children')) {
        temp = value.update('children', children => {
          // console.log('jjjjjjechil dren: ', t, '---------', children, '==>>>>', children.toJS())
          return addChildren(children, { parentId, ...orther })
        })
      } else {
        temp = value
      }
    }
    return temp
  })
}
/************************** 树数据 end **************************/

/************************** 表格数据 start **************************/

export function tableThead(state = List(), action) {
  state = List(fromJS(action))
  return state
}

export function tableData(state = List(), action) {
  let index
  switch (action.type) {
    case 'update-list':
      state = List(fromJS(action.data))
      return state
    // case 'insert':
    //   state = state.insert(parseInt(action.data.seq), fromJS({
    //     ...action.data,
    //     // seq: parseInt(action.data.seq) + 1 + '',
    //   }))
    //   state = updataSeq(state)
    //   return state
    // case 'remove':
    //   index = state.findIndex((item, index, array) => {
    //     return item.get('id') === action.data.id
    //   })
    //   return state.slice(0, index).concat(state.slice(index + 1, state.count()))
    // case 'update':
    //   index = state.findIndex((item, index, array) => {
    //     return item.get('id') === action.data.id
    //   })
    //   state = state.update(index, record => record = fromJS(action.data))
    //   return state
    case 'selectall':
      return state.map(item => {
        return item.sf(['selected'], action.data)
      })
    default:
      return state
  }
}
/************************** 表格数据 end **************************/