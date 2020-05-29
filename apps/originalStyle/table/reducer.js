import { Map, fromJS, List } from 'immutable'
import moment from 'moment'

export function showState(state = Map(fromJS({
  loading: false
})), action) {
  // 框架在初始化state的值时，action默认带一个type小于1的随机值(如：action={type: 0.12354556435634})。
  // 这里判断小于1时返回默认值
  if (action.type && action.type < 1)
    return state
  state = state.sf(['loading'], action)
  return state
}

export function dateRange(state = Map({
  SystemDate: moment(),
  res: null,
  EnableDate: moment().format('YYYY-MM-DD')
}), action) {
  state = state.sfs(fromJS({
    SystemDate: moment(action.SystemDate),
    EnableDate: moment(action.EnableDate)
  }))
  return state
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
  page: {
    currentPage: 1,
    pageSize: 20,
    totalCount: 0,
    totalPage: 0
  }
})), action) {
  switch (action.type) {
    case "update_search_param":
      state = state.mergeIn(['entity'], action.data)
      return state
    case "update_search_page":
      return state = state.mergeIn(['page'], fromJS(action.data))
    default:
      return state
  }
}

export function tableThead(state = List(), action) {
  state = List(fromJS(action))
  return state
}

export function tableData(state = List(), action) {
  let index
  switch (action.type) {
    case 'rpt_update_list':
      state = List(fromJS(action.data))
      return state
    case 'rpt_insert_item':
      state = state.insert(parseInt(action.data.seq), fromJS({
        ...action.data,
        id: action.data.seq
      }))
      state = updataSeq(state)
      return state
    case 'rpt_remove_item':
      index = state.findIndex((item, index, array) => {
        return item.get('id') === action.data.id
      })
      return state.slice(0, index).concat(state.slice(index + 1, state.count()))
    case 'rpt_update_item':
      index = state.findIndex((item, index, array) => {
        return item.get('id') === action.data.id
      })
      state = state.update(index, record => record = fromJS(action.data))
      return state
    case 'selectall':
      return state.map(item=>{
        return item.sf(['selected'], action.data)
      })
      // return state
    default:
      return state
  }
}

// export function pageInfo(state = Map(fromJS({
//   currentPage: 1,
//   pageSize: 100,
//   totalCount: 0,
//   totalPage: 0
// })), action) {
//   state = state.sfs(fromJS(action))
//   return state
// }

// export function tableCheckbox(state = Map(fromJS([])), action) {
//   state = state.sfs(fromJS(action))
//   return state
// }


function updataSeq(state) {
  return state.map((item, index) => {
    return item.setIn(['seq'], `${index + 1}`)
  })
}

export function searchFlag(state, action) {
  switch(action.type) {
    case 'flag_true':
      return true
    case 'flag_false':
      return false
    default: 
      return true
  }
}