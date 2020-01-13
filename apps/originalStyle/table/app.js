import React, { useEffect } from 'react'
import { Layout, Button } from 'edf-component'
import { useAppData, useData, DataGrid } from 'edf-app-loader'
import { SearchHeader } from './components/PageHeader'
import TableArea from './components/TableArea'

export default React.memo(Page)
function Page(props) {
  return (
    <Layout className="original-style-table">
      <SearchHeader {...props} />
      <TableArea {...props} />
      {/* <Layout className="ttk-edf-app-operation-header">
        <Button>test</Button>
      </Layout> */}
      {/* <DataGrid>

      </DataGrid> */}
    </Layout>
  )
}