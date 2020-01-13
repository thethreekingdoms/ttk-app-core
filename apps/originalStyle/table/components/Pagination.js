import React from 'react'
import { Pagination } from 'antd'
import { useData, useActions, useCommit } from 'edf-app-loader'

export default function (props) {
  const actions = useActions(props)
  const commit = useCommit()
  const { currentPage, pageSize, totalCount } = useData([props, 'searchParam', 'page']).toJS()

  async function onShowSizeChange(current, pageSize) {
    // 使用commit直接更新reducer中的数据状态
    commit([props, 'showState'], true)
    await actions.updateSearchPage({ pageSize })
    await actions.fetchTableBody()
    commit([props, 'showState'], false)
  }

  async function onChange(page, pageSize) {
    // 使用commit直接更新reducer中的数据状态
    commit([props, 'showState'], true)
    await actions.updateSearchPage({ currentPage: page })
    await actions.fetchTableBody()
    commit([props, 'showState'], false)
  }

  return <Pagination
    pageSize={pageSize}
    total={totalCount}
    defaultCurrent={currentPage}
    pageSizeOptions={['20', '50', '100', '200', '300', '400']}
    onChange={onChange}
    showSizeChanger
    onShowSizeChange={onShowSizeChange}
  />
}