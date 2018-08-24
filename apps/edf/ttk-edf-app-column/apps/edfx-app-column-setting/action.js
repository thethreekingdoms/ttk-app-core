import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { List, fromJS } from 'immutable'
import moment from 'moment'
import config from './config'
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

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        injections.reduce('init')
        this.load()
    }

    load = async () => {
        const response = await this.webapi.columnDetail.findByColumnCode(this.component.props.columnCode)
        this.injections.reduce('load', response)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    getListColumns = () => {
        const list = this.metaAction.gf('data.list').toJS();
        let { Column, Cell } = DataGrid
        let cols = [         
            <Column name='caption' columnKey='caption' flexGrow={1} width={200}
                header={<Cell name='header'>字段名称</Cell>}
                cell={(ps) => <Cell>{list[ps.rowIndex].caption}</Cell>}
            />,
            <Column name='isVisible' columnKey='isVisible' flexGrow={1} width={200}
            header={<Cell name='header'><Checkbox checked={this.isSelectAll(list)} onChange={this.selectAll()}>显示</Checkbox></Cell>}
            cell={(ps) => {
                if (list[ps.rowIndex].isMustSelect == 1) {
                    return <Cell><Checkbox checked={list[ps.rowIndex].isVisible} onChange={this.selectColumn(list[ps.rowIndex])} disabled='disabled'></Checkbox></Cell>
                }
                return <Cell><Checkbox checked={list[ps.rowIndex].isVisible} onChange={this.selectColumn(list[ps.rowIndex])}></Checkbox></Cell>
            }}
            />                    
        ]
        return cols
    }

    isSelectAll = (list) => {
        return list.length == list.filter(o => o && o.isVisible == 1).length
    }

    selectAll = () => (e) => {
        const list = this.metaAction.gf('data.list').toJS();
        list.forEach(o => {
            if (o.isMustSelect != 1) {
                if (e.target.checked)
                    o.isVisible = 1
                else
                    o.isVisible = 0
            }
        })
        this.injections.reduce('loadColumns', { list })
    }

    selectColumn = (column) => (e) => {
        const list = this.metaAction.gf('data.list').toJS();
        list.forEach(o => {
            if (o.id == column.id) {
                if (e.target.checked) {
                    o.isVisible = 1
                    return
                }
                else {
                    o.isVisible = 0
                    return
                }
            }
        })     
        this.injections.reduce('loadColumns', { list })
        //console.log(list)
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const list = this.metaAction.gf('data.list').toJS()
        if(list){
            const response = await this.webapi.columnDetail.batchUpdate(list)
            this.metaAction.toast('success', '修改成功')
            return response
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