import table from './table'
import ttkTable from './ttk-table'

const obj = {
  [table.name]: table,
  [ttkTable.name]: ttkTable
}

window.publicModule && window.publicModule.callback(obj, "originalStyle");
export default obj;