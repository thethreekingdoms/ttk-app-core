import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { Menu, Checkbox, DataGrid, Icon } from 'edf-component'
import extend from './extend'
import config from './config'
import { consts } from 'edf-consts'
import { fetch } from 'edf-utils'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.extendAction = option.extendAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.extendAction.gridAction.onInit({ component, injections })
        this.component = component
        this.injections = injections
        injections.reduce('init')

        let availableOrg = sessionStorage.getItem('currentOrgStatus')
        if (availableOrg != 1 && availableOrg != 2) {
            //隐藏返回按钮
            this.metaAction.sf('data.hideBackBtn', true)
        }
        this.isCurrentOrg = false
        this.load()
    }

    load = async (option) => {
        this.metaAction.sf('data.other.loading', true)

        let column = this.getColumns()
        let list = await this.getData()

        //如果删除的是当前则更新token
        if (this.isCurrentOrg && list.length != 0) {
            let response = await this.webapi.org.updateCurrentOrg({ "orgId": list[0].id })
            document.querySelector('.currentOrgName').innerHTML = list[0].name
        }
        let availableOrg = sessionStorage.getItem('currentOrgStatus')
        let response
        if (availableOrg != 1 && availableOrg != 2) {
            await this.webapi.portal.init()
            let response = await this.webapi.portal.portal()
            if (option) {
                response.org = option
            }

            if (response.user) {
                this.metaAction.context.set('currentUser', response.user)
            } else {
                this.metaAction.context.set('currentUser', undefined)
                if (this.component.props.onRedirect && this.config.goAfterLogout) {
                    this.component.props.onRedirect(this.config.goAfterLogout)
                }
            }
            if (response.org) {
                this.metaAction.context.set('currentOrg', response.org)
            } else {
                this.metaAction.context.set('currentOrg', undefined)
                if (this.component.props.onRedirect && this.config.goAfterLogout) {
                    this.component.props.onRedirect(this.config.goAfterLogout)
                }
            }
        }

        //如果企业都删除更新UI
        if (list.length == 0) {
            this.injections.reduce('load', column, list)
            this.injections.reduce('initQueryList', list)
            this.metaAction.sf('data.isShowSearch', false)
            sessionStorage['currentOrgStatus'] = 2
            //隐藏按钮
            this.metaAction.sf('data.hideBackBtn', false)
            this.component.props.hideHead()

            this.metaAction.sf('data.other.loading', false)
            return
        }

        this.injections.reduce('load', column, list)
        this.injections.reduce('initQueryList', list)
        this.metaAction.sf('data.isShowSearch', false)

        this.metaAction.sf('data.other.loading', false)
    }

    addManage = async () => {
        this.component.props.setPortalContent('新建企业', 'ttk-edf-app-company-manage-add')
    }
    manageBlur = () => {

    }

    manageResearch = (e) => {

    }

    goRegister = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        }
        if (e.stopPropagation) {
            e.stopPropagation()
        }
        this.component.props.onRedirect({ appName: 'ttk-edf-app-company-manage-add' })

    }
    goCompanyManage = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        }
        if (e.stopPropagation) {
            e.stopPropagation()
        }
        this.component.props.onRedirect({ appName: 'ttk-edf-app-company-manage' })
    }


    fieldChange = (path, value) => {
        // debugger
        let form = this.metaAction.gf('data.form').toJS()
        let column = this.getColumns()
        let searchList = []
        // this.getData().then((res) => {
        let res = this.metaAction.gf('data.queryList').toJS()
        res.map((option, index) => {
            if (option.name.indexOf(value) > -1) {
                searchList.push(option)
            }
            return searchList
        })
        if (value == '') {
            this.injections.reduce('load', column, res)
        } else {
            this.injections.reduce('load', column, searchList)
        }
    }
    //渲染表格列
    getListColumns = () => {

        let { Column, Cell } = DataGrid
        const columns = this.metaAction.gf('data.columns').toJS();
        let list = []
        if (this.metaAction.gf('data.list')) {
            list = this.metaAction.gf('data.list').toJS()
        }
        let cols = []
        columns.forEach(op => {
            let col = <Column name={op.id} isResizable={false} columnKey={op.id} flexGrow={1} width={op.name == 'name' || op.name == 'remark' ? (op.name == 'name' ? 270 : 70) : 150}
                header={<Cell name='header'
                    className="ttk-edf-app-company-manage-headerBgColor">{op.columnName}</Cell>}
                cell={(ps) => {
                    if (op.name == "lastLoginTime") {
                        return <Cell>{`${list[ps.rowIndex]['lastLoginTime']}`}</Cell>
                    }
                    if (op.name == 'contactNumber') {
                        return <Cell>{`${list[ps.rowIndex]['createTime'].replace(/-/g, '.')}-${list[ps.rowIndex]['expireTime'].replace(/-/g, '.')}`}</Cell>
                    }
                    if (op.name == 'status') {
                        if (list[ps.rowIndex]['status'] == consts.ORGTATUS_001) {
                            return <Cell>{`正常`}</Cell>
                        } else if (list[ps.rowIndex]['status'] == consts.ORGTATUS_002) {
                            return <Cell>{`过期`}</Cell>
                        } else {
                            return <Cell>{`试用期`}</Cell>
                        }
                    }
                    if (op.name == 'remark') {
                        let isOtherUser = list[ps.rowIndex].isOtherUser
                        return <Cell>

                            <span href="javascript:" className="ttk-edf-app-company-manage-font"
                                onClick={isOtherUser == true ? "" : this.delOrg.bind(this, list[ps.rowIndex].id)}>
                                <Icon disabled={isOtherUser} type="shanchu" fontFamily="edficon" style={{ fontSize: '24px' }} />
                            </span>

                        </Cell>
                    }
                    let name = list[ps.rowIndex][op.name]
                    return <Cell className={'portalOrgName'} title={name} onClick={() => {
                        this.setCurrentOrg(list[ps.rowIndex])
                    }}> {name}</Cell>
                }}
            />
            cols.push(col)
        })

        return cols
    }

    back = () => {	//返回到门户
        this.component.props.setPortalContent('门户首页', 'ttk-edf-app-portal', { isShowMenu: false, isTabsStyle: false })
    }

    getListRowsCount = () => {
        let list = this.metaAction.gf('data.list')
        return list ? list.size : 0
    }

    isCurrentOrg = false    //判断删除的是否是当前企业
    delOrg = async (id) => {
        let data = this.metaAction.context.get('currentOrg')
        const ret = await this.metaAction.modal('confirm', {
            title: '删除',
            content: '删除企业将永久删除该企业相关的数据，无法恢复，请谨慎操作。您确认要删除企业吗?',
            className: 'ttk-edf-app-company-manage-modal',
        })
        if (ret) {
            let response = await this.webapi.org.del({ id })
            if (response) {
                this.component.props.updateOrgList()
                this.metaAction.toast('success', '删除成功')
                if (id == data.id) {
                    this.isCurrentOrg = true
                } else {
                    this.isCurrentOrg = false
                }
            }
            this.load()
        } else {
            return
        }
    }
    setCurrentOrg = async (option) => {
        let response = await this.webapi.org.updateCurrentOrg({ "orgId": option.id })
        sessionStorage['currentOrgStatus'] = null
        this.component.props.onPortalReload && await this.component.props.onPortalReload()
        this.metaAction.context.set('currentOrg', option)
        this.component.props.setPortalContent('门户首页', 'ttk-edf-app-portal', { isShowMenu: false, isTabsStyle: false })
    }
    //修改档案
    modifyDetail = (id) => (e) => {
        let personId = id ? id : null
        this.add(personId)
    }

    //获取列表内容
    getData = async (pageInfo) => {
        let response = await this.webapi.org.queryList()
        return response
    }
    //获取列数据
    getColumns = () => {
        return [{
            columnName: '企业名称',
            id: 'name',
            name: 'name',
        }, {
            columnName: '使用状态',
            id: 'status',
            name: 'status',
        }, {
            columnName: '最后登录日期',
            id: 'lastLoginTime',
            name: 'lastLoginTime',
        }, {
            columnName: '授权日期',
            id: 'contactNumber',
            name: 'contactNumber',
        }, {
            columnName: '操作',
            id: 'remark',
            name: 'remark',
        }]
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        extendAction = extend.actionCreator({ ...option, metaAction }),
        o = new action({ ...option, metaAction, extendAction }),
        ret = { ...metaAction, ...extendAction.gridAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
