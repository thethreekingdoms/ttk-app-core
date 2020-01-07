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
                filter = {enumId: '3336424919598080'}
            }
            const response = await this.webapi.enumDetail.init({ pagination, filter }),
            columns = await this.webapi.columnDetail.findByColumnCode('enumList')
            response.columns = columns
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
        filter = { enumId: selectedKeys[0] }  
        this.load(pagination, filter)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    getListColumns = () => {
        const enus = this.metaAction.gf('data.list').toJS()
        const columns = this.metaAction.gf('data.columns').toJS()
        let { Column, Cell } = DataGrid
        let cols = [
            <Column name='select' columnKey='select' flexGrow={1} width={40}
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
                        if (op.fieldName == 'code') {
                            return <Cell><a onClick={this.modifyDetail(enus[ps.rowIndex].id)}>{enus[ps.rowIndex][op.fieldName]}</a></Cell>  
                        }
                        return <Cell>{enus[ps.rowIndex][op.fieldName]}</Cell>            
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

    pageChanged = (current, pageSize) => {
        const filter = this.metaAction.gf('data.other.filter').toJS()
        this.load({ current, pageSize }, filter)
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
        const type = this.metaAction.gf('data.other.filter.enumId')
        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('edfx-app-enum-type', {
                store: this.component.props.store,
                parentId: type
            })
        })

        if (ret) {
            this.reload()
        }
    }

    modifyType = async () => {
        const type = this.metaAction.gf('data.other.filter.enumId')

        if (!type) {
            this.metaAction.toast('error', '请选中一个分类')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('edfx-app-enum-type', {
                store: this.component.props.store,
                typeId: type
            })
        })
        if (ret) {
            this.reload()
        }

    }

    delType = async () => {
        const type = this.metaAction.gf('data.other.filter.enumId')
        if (!type) {
            this.metaAction.toast('error', '请选中一个枚举分类')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const id = this.metaAction.gf('data.other.filter.enumId')
            const response = await this.webapi.enum.del({ id })
            this.metaAction.toast('success', '删除枚举分类成功')
            this.reload()

        }
    }

    addDetail = async () => {
        const type = this.metaAction.gf('data.other.filter.enumId')
        if (!type) {
            this.metaAction.toast('error', '请选中一个枚举分类')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('edfx-app-enum-detail', {
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
        const type = this.metaAction.gf('data.other.filter.enumId')
        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('edfx-app-enum-detail', {
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
        const type = this.metaAction.gf('data.other.filter.enumId')
        if (!type) {
            this.metaAction.toast('error', '请选中一个枚举分类')
            return
        }

        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
        {
            this.metaAction.toast('error', '请选中要删除的枚举项')
            return
        }
        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0)
        {
            this.metaAction.toast('error', '请选中要删除的枚举项')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if(!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.enumDetail.delDetail({ ids , enumId: type})
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
                columnCode: "enumList"
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