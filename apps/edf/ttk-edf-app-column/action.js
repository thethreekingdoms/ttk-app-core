import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
import moment from 'moment'
import { Tree } from 'edf-component'
import { Menu, Checkbox, DataGrid } from 'edf-component'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }


    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')

        const pagination = this.metaAction.gf('data.pagination').toJS()
        this.load(pagination)
    }

    load = async (pagination, filter) => {
        if (filter == undefined) {
            //filter = {columnId: '3336333117359104'}
            const tree = await this.webapi.column.query({isDefault: 1})
            filter = { columnId: tree.length && tree[0].id }  
        }
        const response = await this.webapi.columnDetail.init({ pagination, filter }),
        columns = await this.webapi.columnDetail.findByColumnCode('columnList')
        response.columnsettings = columns
        response.filter = filter
        this.injections.reduce('load', response)
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
        filter = this.metaAction.gf('data.other.filter').toJS()
        this.load(pagination, filter)
    }

    selectType = async (selectedKeys, info) => {
        const pagination = { currentPage: 1, totalData: 0, pageSize: 20 },
        filter = { columnId: selectedKeys[0] }  
        this.load(pagination, filter)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    getListColumns = () => {
        const enus = this.metaAction.gf('data.list').toJS(),
        columns = this.metaAction.gf('data.columns').toJS()
        let { Column, Cell } = DataGrid
        let cols = [
            <Column name='select' columnKey='select' flexGrow={1} width={30}
                header={<Cell name='cb'><Checkbox checked={this.isSelectAll()} onChange={this.selectAll()}></Checkbox></Cell>}
                cell={(ps) => {
                   return <Cell name='cell'><Checkbox onChange={this.selectRow(ps.rowIndex)}></Checkbox></Cell>
                }}
            />
        ]
        columns.forEach(op => {
            if (op.isVisible == 1) {
                let col = <Column name={op.id} columnKey={op.id} flexGrow={1} width={op.width}
                    header={<Cell name='header'>{op.caption}</Cell>}
                    cell={(ps) => {
                        //console.log(op)
                        if (op.fieldName == 'fieldName' || op.fieldName == 'caption') {
                            return <Cell><a onClick={this.modifyDetail(enus[ps.rowIndex].id)}>{enus[ps.rowIndex][op.fieldName]}</a></Cell>  
                        }
                        else if (op.fieldTypeDTO.code == 'enum') {
                            return <Cell>{enus[ps.rowIndex][op.fieldName]}</Cell>  
                        }
                        else if (op.fieldTypeDTO.code == 'boolean') {
                            return <Cell>{enus[ps.rowIndex][op.fieldName] == 0 ? '否' : '是'}</Cell>                                                                                        
                        }
                        else {
                            return <Cell>{enus[ps.rowIndex][op.fieldName]}</Cell>     
                        }       
                    }}
                />
                cols.push(col)
            }
        })
        return cols
    }

    isSelectAll = () => {
        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
            return false

        return lst.every(o => o.get('selected'))
    }

    selectAll = () => (e) => {
        this.injections.reduce('selectAll', e.target.checked)
    }

    selectRow = (rowIndex) => (e) => {
        this.injections.reduce('selectRow', rowIndex, e.target.checked)
    }

    pageChanged = (currentPage, pageSize) => {
        const filter = this.metaAction.gf('data.other.filter').toJS()
        this.load({ currentPage, pageSize }, filter)
    }

    loopTreeChildren = data => {
        if (!data) return null
        return data.map((item) => {
            if (item.children && item.children.length) {
                return <Tree.TreeNode key={item.id} title={item.name}>{this.loopTreeChildren(item.children)}</Tree.TreeNode>
            }
            return <Tree.TreeNode key={item.id} title={item.name} />
        })
    }


    addType = async () => {
        const type = this.metaAction.gf('data.other.filter.columnId')
        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('ttk-edf-app-column-type', {
                store: this.component.props.store,
                parentId: type
            })
        })

        if (ret) {
            this.reload()
        }
    }

    modifyType = async () => {
        const type = this.metaAction.gf('data.other.filter.columnId')

        if (!type) {
            this.metaAction.toast('error', '请选中一个栏目方案')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('ttk-edf-app-column-type', {
                store: this.component.props.store,
                typeId: type
            })
        })
        if (ret) {
            this.reload()
        }

    }

    delType = async () => {
        const type = this.metaAction.gf('data.other.filter.columnId')
        if (!type) {
            this.metaAction.toast('error', '请选中一个栏目方案')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const id = this.metaAction.gf('data.other.filter.columnId')
            const response = await this.webapi.column.del({ id })
            this.metaAction.toast('success', '删除栏目成功')
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.reload()

        }
    }

    addDetail = async () => {
        const type = this.metaAction.gf('data.other.filter.columnId')
        if (!type) {
            this.metaAction.toast('error', '请选中一个栏目方案')
            return
        }
               
        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('ttk-edf-app-column-detail', {
                store: this.component.props.store,
                typeId: type
            })
        })

        if (ret) {
            var typeList = []
            typeList.push(type)
            this.selectType(typeList)
        }
    }

    modifyDetail = (id) => async () => {
        const type = this.metaAction.gf('data.other.filter.columnId')
        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('ttk-edf-app-column-detail', {
                store: this.component.props.store,
                id
            })
        })

        if (ret) {
            var typeList = []
            typeList.push(type)
            this.selectType(typeList)
        }
    }

    batchDelDetail = async () => {
        const type = this.metaAction.gf('data.other.filter.columnId')
        if (!type) {
            this.metaAction.toast('error', '请选中一个栏目方案')
            return
        }

        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
        {
            this.metaAction.toast('error', '请选中要删除的栏目')
            return
        }
        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0)
        {
            this.metaAction.toast('error', '请选中要删除的栏目')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if(!ret)
            return
        console.log(selectRows.toJS())
        const ids = selectRows.map(o => {
            console.log(o)
            return o.get('id')
        }).toJS()
        await this.webapi.columnDetail.delDetail({ ids , type})
        this.metaAction.toast('success', '删除成功')
        
        var typeList = []
        typeList.push(type)
        this.selectType(typeList)
    }

    columnSetting = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '栏目设置',
            children: this.metaAction.loadApp('ttk-edf-app-column-setting', {
                store: this.component.props.store,
                columnCode: "columnList"
            })
        })

        if (ret) {
            this.reload()
        }
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}