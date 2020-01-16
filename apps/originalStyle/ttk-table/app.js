import React, { useEffect } from 'react'
import { Layout, Button } from 'edf-component'
import { useAppData, useData, DataGrid } from 'edf-app-loader'
import { SearchHeader } from './components/PageHeader'
import TableArea from './components/TableArea'
import Pagination from './components/Pagination'

export default React.memo(Page)
function Page(props) {
  return (
    <Layout className="original-style-table">
      <SearchHeader {...props} />
      <TableArea {...props} />
      <Pagination {...props} />
    </Layout>
  )
}