import React, { useState, useEffect, useCallback } from 'react'
import { Layout, Button, Card, Dialog } from 'edf-component'
import { useAppData, useData, useActions, useCommit } from 'edf-app-loader'
import CardTree from './components/CardTree'
import CardTable from './components/CardTable'
import Pagination from './components/Pagination'
import TableSearch from './components/TableSearch'
import CardForm from './dialog/CardForm'
import TabsPage from './dialog/Tabs'

export default React.memo(Page)
function Page(props) {
  const actions = useActions(props)
  const commit = useCommit()
  const showDialog = useData([props, 'tempState', 'showDialog'])

  useEffect(() => {
    actions.getTreeData()
  }, [])

  const handleDialgOK = useCallback((e) => {
    commit([props, 'tempState'], { type: 'setShowDialog', data: false })
  }, [showDialog])
  const handleDialgCancel = useCallback((e) => {
    commit([props, 'tempState'], { type: 'setShowDialog', data: false })
  }, [showDialog])

  return (
    <Layout className="ttk-menu-container rule-engine">
      <CardTree {...props} />
      <Layout className="ttk-table-container">
        <TableSearch {...props} />
        <CardTable {...props} />
        <Pagination {...props} />
      </Layout>
      <Dialog
        className="rule-engine-dialog"
        title="新增"
        visible={showDialog}
        style={{ top: 70 }}
        width={1280}
        onOk={handleDialgOK}
        onCancel={handleDialgCancel}
      >
        <div className="ttk-table-container">
          <CardForm {...props} />
          <TabsPage {...props} />
        </div>
      </Dialog>
    </Layout>
  )
}