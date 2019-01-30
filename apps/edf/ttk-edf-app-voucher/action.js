import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import { fromJS } from 'immutable'
import moment from 'moment'
import { getInitState } from './data'
import { Menu, Checkbox, DataGrid, Tree } from 'edf-component'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        this.injections.reduce('init')

        this.load()
    }

    load = async (id) => {
        let tree = await this.webapi.query.queryVoucher()
        let data = this.handleTreeData(tree)
        this.injections.reduce('load', data)
        let fields = await this.webapi.query.queryTableFields()
        this.injections.reduce('fields', fields)
        if(!id) {
            this.metaAction.sf('data.selectedKeys', tree[0].id + 'head')
            this.metaAction.sf('data.expandedKeys',[String(tree[0].id)])
            this.metaAction.sf('data.voucherId',String(tree[0].id))
            this.loadDetailData('thead', tree[0].id)
        }else if(id) {
            let type = 
            this.metaAction.sf('data.selectedKeys', id + 'head')
            let expandedKeys = this.metaAction.gf('data.expandedKeys')
            expandedKeys.push(String(id))
            this.metaAction.sf('data.expandedKeys', expandedKeys)
            this.metaAction.sf('data.voucherId',id)
            this.loadDetailData('thead', id)
        }
    }

    loadDetailData = async (type, voucherId, tableId) => {
        let response
        if(type == 'thead') {
            response = await this.webapi.query.queryTableHeadData({voucherId: voucherId})
        }else if(type == 'tbody') {
            response = await this.webapi.query.queryTableBodyData({voucherId: voucherId, voucherTableId: tableId})
        }else if(type == 'tbodys') {
            response = await this.webapi.query.queryTablesData({voucherId: voucherId})
        }
        this.metaAction.sf('data.other.type', type)
        this.injections.reduce('list', response)
    }

    handleTreeData = (tree) => {
        let data = []
        for(let i = 0 ; i < tree.length; i++) {
            let node = {}
            node.name = tree[i].name
            node.id = tree[i].id
            node.voucherId = tree[i].id
            node.type = 'root'
            node.children = []
            node.children.push({name: tree[i].header.name, id: tree[i].id + 'head', selectable: true, voucherId: tree[i].id, type: 'thead'})
            
            let tables = []
            for(let j = 0 ; j < tree[i].body.tables.length; j++) {
                tables.push({name: tree[i].body.tables[j].caption, id: tree[i].body.tables[j].id, voucherId: tree[i].id,selectable: true, type: 'tbody'})
            }
            node.children.push({name: tree[i].body.name, id: tree[i].id + 'body', children: tables, voucherId: tree[i].id, type: 'tbodys'})
            data.push(node)
        }
        return data
    }

    loopTreeChildren = (data, id) => {
        if (!data) return null
        return data.map((item) => {
            if (item.children && item.children.length) {
                return <Tree.TreeNode key={item.id} title={item.name} voucherId={item.voucherId} type={item.type}>{this.loopTreeChildren(item.children)}</Tree.TreeNode>
            }
            return <Tree.TreeNode key={item.id} title={item.name} voucherId={item.voucherId} type={item.type}/>
        })
    }

    selectType = (selectedKeys, info) => {
        let key = info.node.props.eventKey
        this.metaAction.sf('data.selectedKeys', key)
        let type = info.node.props.type
        let voucherId = info.node.props.voucherId
        this.metaAction.sf('data.voucherId',voucherId)
        let tableId
        if(type == 'thead') {
            tableId = null
            this.loadDetailData(type, voucherId, tableId)
        }else if(type == 'tbody'){
            tableId = key
            this.loadDetailData(type, voucherId, tableId)
        }else {
            let keys = this.metaAction.gf('data.expandedKeys')
            if(keys.indexOf(key) != -1){
                keys.splice(keys.indexOf(key), 1)
            }else {
                keys.push(key)
            }
            this.metaAction.sf('data.other.ts', new Date().getTime())
            this.metaAction.sf('data.expandedKeys',keys)
            if(type == 'tbodys') {
                this.loadDetailData(type, voucherId)
            }
        }   
    }

    updateExpandedKeys = (keys) => {
        this.metaAction.sf('data.expandedKeys',keys)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    getListColumns = () => {
        const list = this.metaAction.gf('data.list').toJS()
        const fields = this.metaAction.gf('data.fields').toJS()
        const type = this.metaAction.gf('data.other.type')
        let cols = []
        let { Column, Cell } = DataGrid
        let headerKeys
        if(!fields || !list || !type) return cols
        if(type == 'thead') {
            headerKeys = fields.header
        }else if(type == 'tbody'){
            headerKeys = fields.body
        }else if(type == 'tbodys') {
            headerKeys = fields.table || {voucherId: "单据ID", id:"单据表体id", name: "字段名称", caption: "字段标题", isVisible: "是否显示", colIndex: "显示顺序", createTime: '创建时间', }
        }
        Object.keys(headerKeys).forEach(op => {
            let col = <Column flexGrow={1} width={50}
                header={<Cell name='header'>{headerKeys[op]}</Cell>}
                cell={(ps) => {
                    if (op == 'isSystem' || op == 'isMustSelect' || op == 'isVisible') {
                        return <Cell><a>{list[ps.rowIndex][op] == 0 ? '否' : '是'}</a></Cell>
                    }
                    return <Cell><a>{list[ps.rowIndex][op]}</a></Cell>
                }}
            />
            cols.push(col)
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

    addVoucher = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('ttk-edf-app-voucher-setting', {
                store: this.component.props.store,
                actionType: 'add'
            })
        })

        if(ret) {
            this.load(ret.id)
        }
    }

    modifyVoucher = async () => {
        const id = this.metaAction.gf('data.voucherId')
        if(!id) return 
        let tree = this.metaAction.gf('data.other.tree').toJS()
        let data = tree.find(o => o.id == id)
        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('ttk-edf-app-voucher-setting', {
                store: this.component.props.store,
                actionType: 'modify',
                data
            })
        })
        if (ret) {
            console.log(ret)
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
        const id = this.metaAction.gf('data.voucherId')
        const type = this.metaAction.gf('data.other.type')
        let voucherTableId = null
        if(type == 'tbody') {
            voucherTableId = this.metaAction.gf('data.selectedKeys')
        }

        const ret = await this.metaAction.modal('show', {
            title: '新增',
            width:500,
            children: this.metaAction.loadApp('ttk-edf-app-voucher-detail-setting', {
                store: this.component.props.store,
                actionType: 'add',
                voucherId: id,
                target: type,
                voucherTableId
            })
        })

        if (ret) {
            if(type == 'tbodys') {
                let tree = await this.webapi.query.queryVoucher()
                let data = this.handleTreeData(tree)
                this.injections.reduce('load', data)
                this.loadDetailData(type, id, voucherTableId)
            }else {
                this.loadDetailData(type, id, voucherTableId)
            }
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