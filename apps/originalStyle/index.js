import table from './table'
import ttkTable from './ttk-table'
import treeDialog from './tree-dialog'

const obj = {
  [table.name]: table,
  [ttkTable.name]: ttkTable,
  [treeDialog.name]: treeDialog
}

window.publicModule && window.publicModule.callback(obj, "originalStyle");
export default obj;