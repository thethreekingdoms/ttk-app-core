import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppFactory from './appFactory'
import { commit } from './action'

export function useGetAction(fullName, actionName) {
  const actions = AppFactory.getInstance().getActions()
  return actions[fullName][actionName]
}

// 初始化reducer默认值到state树，原生hook写法已默认在框架中调用该函数，开发者无需再次初始化化
export function useInitReducersData(fullName, appDataId, reducers) {
  const dispatch = useDispatch()
  const initData = () => {
    const keys = Object.keys(reducers)
    keys.forEach(key => {
      dispatch({
        type: '@@originReduce', payload: {
          fullName, appDataId, type: key, reducers, payload: { type: Math.random() }
        }
      })
    })
  }
  useEffect(() => {
    initData()
  }, [])
}

export function useActions({ appName, appDataId }) {
  const dispatch = useDispatch()
  let actions = AppFactory.getInstance().getActions()
  actions = actions[appName]
  if (actions === undefined) return
  const keys = Object.keys(actions)
  let result = {}
  keys.forEach(key => {
    result[key] = async (...args) => await dispatch(actions[key](...args))
  })
  return result
}

export function useData(value) {
  if (value === undefined) {
    console.error('调用useData时未指定参数')
    return null
  }
  if (Array.isArray(value)) {
    const [props, ...other] = value
    return useSelector(state => {
      const temp = state.getIn([props.appName, props.appDataId, 'data', ...other])
      return temp || null
    })
  } else {
    return useAppData(value)
  }
}

export function useAppData(value) {
  if (value === undefined) {
    console.error('调用useAppData时未指定参数')
    return null
  }
  const [appName, ...args] = value.split('/')
  const temp = useSelector(state => {
    try {
      let appDataId
      state.getIn([appName]).filter((value, key) => {
        if (/^AppLoader_/.test(key)) {
          appDataId = key
          return value
        } else {
          return null
        }
      })
      return state.getIn([appName, appDataId, 'data', ...args]) || null
    } catch (error) {
      console.error(`store中未找到${appName}的数据`)
      return null
    }
  })
  return temp
  // return temp?temp.getIn([appDataId, 'data', ...args]):null
}

export function useCommit() {
  const dispatch = useDispatch()
  return (target, action) => {
    if (Array.isArray(target)) {
      const [props, reducer] = target
      dispatch(commit(`${props.appName}/${reducer}`, action))
    } else {
      dispatch(commit(target, action))
    }
  }
}