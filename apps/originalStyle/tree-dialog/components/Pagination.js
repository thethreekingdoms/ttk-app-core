import React from 'react'
import { Pagination } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'

export default function (props) {
  const actions = useActions(props)
  const commit = useCommit()
  const { pageIndex, pageSize, recordCount } = useData([props, 'searchParam', 'pager']).toJS()

  async function onShowSizeChange(current, pageSize) {
    // 使用commit直接更新reducer中的数据状态
    commit([props, 'tempState'], { type: 'setLoading', data: true })
    commit([props, 'searchParam'], { type: 'update_search_page', data: { pageSize } })
    await actions.fetchTableBody()
    commit([props, 'tempState'], { type: 'setLoading', data: false })
  }

  async function onChange(page, pageSize) {
    // 使用commit直接更新reducer中的数据状态
    commit([props, 'tempState'], { type: 'setLoading', data: true })
    commit([props, 'searchParam'], { type: 'update_search_page', data: { pageIndex: page } })
    await actions.fetchTableBody()
    commit([props, 'tempState'], { type: 'setLoading', data: false })
  }

  return (
    <div className="custom-pagination">
      <Pagination
        pageSize={pageSize}
        total={recordCount}
        current={pageIndex}
        pageSizeOptions={['10', '20', '30']}
        onChange={onChange}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  )
}