import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
import moment from 'moment'
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

        this.init()
    }

    init = async () => {
        const response = await this.webapi.role.init()
        response.operations.forEach(op => {
            op.count = 0
            response.menus.forEach(m => {
                let count = m.operations ? m.operations.filter(mop => mop.operationId == op.id).length : 0
                op.count += count
            })
        })
        response.filter = { roleId: response.roles.length && response.roles[0].id }
        this.injections.reduce('loadInit', response)
    }

    getOperationColumns = () => {
        const roleId = this.metaAction.gf('data.other.filter.roleId')
        const operations = this.metaAction.gf('data.operations').toJS();
        const menus = this.metaAction.gf('data.menus').toJS();
        let menuOperations = this.metaAction.gf('data.menuOperations');
        if (menuOperations) {
            menuOperations = menuOperations.toJS()
        } else {
            menuOperations = []
        }
        let { Column, Cell } = DataGrid
        let cols = [
            <Column name='name' columnKey='name' flexGrow={1} width={200}
                    header={<Cell name='header'>菜单</Cell>}
                    cell={(ps) => <Cell align='center'>{(menus[ps.rowIndex].parentId != 0 ? '' : '') + menus[ps.rowIndex].name}</Cell>}
            />
        ]
        operations.forEach(op => {
            let col = <Column name={op.id} columnKey={op.id} flexGrow={1} width={200}
                              header={<Cell name='header'><Checkbox disabled={!roleId} checked={this.isSelectedAll(op, menuOperations)} onChange={this.selectAll(op)}>{op.name}</Checkbox></Cell>}
                              cell={(ps) => {
                                  let m = menus[ps.rowIndex]
                                  let menuEnableOps = m.operations || [{ operationId: 0 }]
                                  if (!m.appName || m.appName == 'null' || !menuEnableOps.find(m => m.operationId == op.id)) {
                                      return <Cell />
                                  }
                                  let checked = !!menuOperations.find(mo => mo.menuId == m.id && mo.operationId == op.id)
                                  return <Cell><Checkbox disabled={!roleId} checked={checked} onChange={this.selectOperation(m, op)} ></Checkbox></Cell>
                              }}
            />
            cols.push(col)
        })
        return cols
    }

    isSelectedAll = (op, menuOperations) => {
        return op.count == menuOperations.filter(o => o && o.operationId == op.id).length
    }

    loadRole = async () => {
        // const response = await this.webapi.role.query({})
        // this.injections.reduce('loadRole', response)
        const filter = this.metaAction.gf('data.other.filter').toJS()
        await this.init(filter)
        const menuOperations = await this.webapi.roleMenuOperation.query(filter)
        this.injections.reduce('loadRoleMenuOperation', { menuOperations, filter })
    }


    getListRowsCount = () => {
        return this.metaAction.gf('data.menus').size
    }

    selectRole = async ({ selectedKeys }) => {
        const filter = { roleId: selectedKeys[0] }
        if (selectedKeys.length == 0) {
            this.injections.reduce('loadRoleMenuOperation', { menuOperations: [], filter })
            return
        }
        const menuOperations = await this.webapi.roleMenuOperation.query(filter)
        this.injections.reduce('loadRoleMenuOperation', { menuOperations, filter })
    }

    selectAll = (operation) => (e) => {
        const menus = this.metaAction.gf('data.menus').toJS();
        let menuOperations = this.updateOperation(menus, operation, e.target.checked)
        this.injections.reduce('loadRoleMenuOperation', { menuOperations })
        const {roleId} = this.metaAction.gf('data.other.filter').toJS()
        this.webapi.roleMenuOperation.save({roleId,menuOperations})
        // console.log(menuOperations)
    }

    selectOperation = (menu, operation) => (e) => {
        let menuOperations = this.updateOperation([menu], operation, e.target.checked)
        this.injections.reduce('loadRoleMenuOperation', { menuOperations })
        const {roleId} = this.metaAction.gf('data.other.filter').toJS()
        this.webapi.roleMenuOperation.save({roleId,menuOperations})
        // console.log(menuOperations)
    }

    updateOperation = (menus, operation, selected, menuOperations, callstackIds) => {
        if (callstackIds && operation) {
            if (callstackIds['_' + operation.id] == true) return  //避免无限递归
            callstackIds['_' + operation.id] = true
        }
        const roleId = this.metaAction.gf('data.other.filter.roleId')
        let operations = this.metaAction.gf('data.operations').toJS()
        menuOperations = menuOperations || this.metaAction.gf('data.menuOperations') || []
        if (menuOperations && menuOperations.toJS) {
            menuOperations = menuOperations.toJS()
        }
        let dependedOperations = operations.filter(op => op.id == operation.dependentId)
        let subOperations = operations.filter(op => op.dependentId == operation.id)
        menus.forEach(menu => {
            let theOpIndex = menuOperations.findIndex(mo => mo && mo.menuId == menu.id && mo.operationId == operation.id)
            if (selected && theOpIndex == -1) {
                if (menu.operations && menu.operations.find(mo => mo.operationId == operation.id)) {
                    menuOperations.push({
                        menuId: menu.id,
                        operationId: operation.id,
                        roleId: roleId,
                    })
                }
                dependedOperations.forEach(depOp => this.updateOperation([menu], depOp, selected, menuOperations, callstackIds || {}))
            } else if (!selected && theOpIndex != -1) {
                delete menuOperations[theOpIndex]
                subOperations.forEach(subOp => this.updateOperation([menu], subOp, selected, menuOperations, callstackIds || {}))
            }
        })
        return menuOperations.filter(mo => mo)
    }

    loopMenuChildren = data => data && data.map(
        ({ id, name }) => <Menu.Item key={id}>{name}</Menu.Item>
    )

    addRole = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增',
            children: this.metaAction.loadApp('ttk-edf-app-role', {
                store: this.component.props.store,
            })
        })

        if (ret) {
            this.loadRole()
        }
    }

    modifyRole = async () => {
        const id = this.metaAction.gf('data.other.filter.roleId')

        if (!id) {
            this.metaAction.toast('error', '请选修改项')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: '修改',
            children: this.metaAction.loadApp('ttk-edf-app-role', {
                store: this.component.props.store,
                id
            })
        })
        if (ret) {
            this.loadRole()
        }

    }

    delRole = async () => {
        const id = this.metaAction.gf('data.other.filter.roleId')
        if (!id) {
            this.metaAction.toast('error', '请选删除项')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '确认删除?'
        })

        if (ret) {
            const response = await this.webapi.role.delete({ id })
            this.metaAction.toast('success', '删除类型成功')
            this.init()
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