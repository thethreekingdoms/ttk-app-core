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

    load = async (page, entity = {}) => {
        page.orderBy = 'code'
        const response = await this.webapi.menu.queryPageList({ page, entity })
        const columns = await this.webapi.columnDetail.findByColumnCode('menuList')
        response.columns = columns
        response.filter = entity
        this.injections.reduce('load', response)
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    getListColumns = () => {
        const menus = this.metaAction.gf('data.list').toJS()
        const columns = this.metaAction.gf('data.columns').toJS()
        let { Column, Cell } = DataGrid
        let cols = [
            <Column name='select' columnKey='select' flexGrow={1} width={40}
                header={<Cell name='cb'><Checkbox checked={this.isSelectAll()} onChange={this.selectAll()}></Checkbox></Cell>}
                cell={(ps) => {
                   return <Cell name='cell'><Checkbox onChange={this.selectRow(ps.rowIndex)} checked={menus[ps.rowIndex].selected}></Checkbox></Cell>
                }}
            />
        ]
        columns.forEach(op => {
            if (op.isVisible == 1) {
                let col = <Column name={op.id} columnKey={op.id} flexGrow={1} width={op.width}
                    header={<Cell name='header'>{op.caption}</Cell>}
                    cell={(ps) => {
                        if (op.fieldName == 'code') {
                            return <Cell><a onClick={this.modifyDetail(menus[ps.rowIndex].id)}>{menus[ps.rowIndex][op.fieldName]}</a></Cell>
                        }
                        return <Cell>{menus[ps.rowIndex][op.fieldName]}</Cell>
                    }}
                />
                cols.push(col)
            }
        })
        return cols
    }

    isSelectAll = () => {
        const list = this.metaAction.gf('data.list')
        if (!list || list.size == 0)
            return false
        let data = list.every(o => o.get('selected'))
        return data
    }

    selectAll = () => (e) => {
        this.injections.reduce('selectAll', e.target.checked)
    }

    selectRow = (rowIndex) => (e) => {
        this.injections.reduce('selectRow', rowIndex, e.target.checked)
    }

    pageChanged = (currentPage, pageSize) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load({ currentPage, pageSize }, filter)
    }

    selectType = (selectedKeys, info) => {
        let parentId = selectedKeys[0] || 0
        const pagination = { currentPage: 1, totalData: 0, pageSize: 50 },
            filter = { parentId: Number(parentId), isReloadTree: false }
        if (info.selected == false) {
            return false;
        }
        this.load(pagination, filter)
    }

    loopTreeChildren = (data, id) => {
        if (!data) return null
        return data.map((item) => {
            if (item.children && item.children.length) {
                return <Tree.TreeNode key={item.id} title={item.name}>{this.loopTreeChildren(item.children)}</Tree.TreeNode>
            }
            return <Tree.TreeNode key={item.id} title={item.name} />
        })
    }


    addType = async () => {
        const parent = this.metaAction.gf('data.filter.parentId') || 0
        // if (!parentId) {
        //     this.metaAction.toast('error', '请选中一个菜单')
        //     return
        // }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('ttk-edf-app-portal-menu-detail', {
                store: this.component.props.store,
                parentId: parent
            })
        })
        if (ret) {
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.load(pagination)
        }
    }

    modifyType = async () => {
        const id = this.metaAction.gf('data.filter.parentId')

        if (!id) {
            this.metaAction.toast('error', '请选中修改项')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('ttk-edf-app-portal-menu-detail', {
                store: this.component.props.store,
                id
            })
        })
        if (ret) {
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.load(pagination)
        }

    }

    delType = async () => {
        const parentId = this.metaAction.gf('data.filter.parentId')
        if (!parentId) {
            this.metaAction.toast('error', '请选中删除项')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const id = this.metaAction.gf('data.filter.parentId')
            const response = await this.webapi.menu.deleteBatch([{ id }])
            this.metaAction.toast('success', '删除成功')
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.load(pagination)
        }
    }

    addDetail = async () => {
        const parent = this.metaAction.gf('data.filter.parentId') || 0

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            width:500,
            children: this.metaAction.loadApp('ttk-edf-app-portal-menu-detail', {
                store: this.component.props.store,
                parentId: parent
            })
        })

        if (ret) {
            this.reload()
        }
    }

    modifyDetail = (id) => async () => {
        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('ttk-edf-app-portal-menu-detail', {
                store: this.component.props.store,
                id
            })
        })

        if (ret) {
            this.reload()
        }
    }

    batchDelDetail = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0)
            this.metaAction.toast('error', '请选中删除项')

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0)
            this.metaAction.toast('error', '请选中删除项')

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (!ret)
            return
        const ids = selectRows.map(o => ({ id: o.get('id') })).toJS()
        await this.webapi.menu.deleteBatch(ids)
        this.metaAction.toast('success', '删除成功')
        this.reload()
    }

    columnSetting = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '栏目设置',
            children: this.metaAction.loadApp('ttk-edf-app-column-setting', {
                store: this.component.props.store,
                columnCode: "menuList"
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