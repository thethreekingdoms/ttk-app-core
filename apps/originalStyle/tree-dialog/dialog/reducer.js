import { Map, fromJS, List } from 'immutable'
import moment from 'moment'



// 所有的reducers函数在框架初始化时都会被框架自动调用一次，以初始化state数据。调用时action的值为{type:0.022444457651 },type是一个小于1的随机值
export function dialogTempState(state = Map({
  isEdit: false,
  loading: false
}), action) {
  switch (action.type) {
    case 'setEdit':
      return state.sf(['isEdit'], action.data)
    case 'setLoading':
      return state.sf(['loading'], action.data)
    default:
      return state
  }
}

/************************** 属性表单 start **************************/

export function validateState(state = Map({
  code: { state: 'success', message: '' },          // 编码
  name: { state: 'success', message: '' },          // 名称
  sortNo: { state: 'success', message: '' },        // 顺序
  busTypeId: { state: 'success', message: '' },     // 业务类型
  url: { state: 'success', message: '' }            // 路径
}), action) {
  switch (action.type) {
    case 'update':
      return state.sfs(fromJS(action.data))
    default:
      return state
  }
}

const defaultForm = {
  parentName: null,   // 上级菜单
  functionType: 'menu', // 类型
  code: null,         // 编码
  name: null,         // 名称
  sortNo: null,       // 顺序
  busTypeId: null, // 业务类型
  dateStart: moment('2015/01/01'),
  dateEnd: moment('2015/01/01'),
  url: null, //路径
  imageUrl: null, // icon
  isShow: 'Y', // 是否可见
  isValid: 'Y', //状态
  remark: null, // 备注
  accessAuthorityPaths: null, //允许访问接口
  applicationId: 0,
  target: '_top'
}
export function attributeForm(state = Map(fromJS(defaultForm)
), action) {
  switch (action.type) {
    case 'update':
      return state.sfs(fromJS(action.data))
    case 'reset':
      if (!action.data)
        return Map(fromJS(defaultForm))
      return Map(fromJS({ ...defaultForm, ...action.data }))
    default:
      return state
  }
}

/************************** 属性表单 end **************************/

/************************** IO表格 start **************************/

export function ioThead(state = List(), action) {
  state = List(fromJS([{
    title: '指标',
    dataIndex: 'quota'
  }, {
    title: '输入/输出',
    dataIndex: 'io'
  }, {
    title: '操作',
    dataIndex: 'operate'
  }]))
  return state
}

export function ioTableData(state = List(), action) {
  let index
  switch (action.type) {
    case 'update-list':
      state = List(fromJS(action.data))
      return state
    case 'add-item':
      if (action.data === null)
        action.data = {
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

/************************** IO表格 end **************************/
/************************** 筛选条件表格 start **************************/

export function filterCriteriaThead(state = List(), action) {
  state = List(fromJS([{
    title: '指标',
    dataIndex: 'quota'
  }, {
    title: '比较符',
    dataIndex: 'compareSymbol'
  }, {
    title: '值',
    dataIndex: 'value'
  }, {
    title: '操作',
    dataIndex: 'operate'
  }]))
  return state
}


export function filterCriteriaTableData(state = List(), action) {
  let index
  switch (action.type) {
    case 'update-list':
      state = List(fromJS(action.data))
      return state
    case 'add-item':
      if (action.data === null)
        action.data = {
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
/************************** 筛选条件表格 end **************************/

