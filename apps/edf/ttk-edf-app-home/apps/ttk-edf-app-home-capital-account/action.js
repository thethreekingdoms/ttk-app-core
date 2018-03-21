import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { List, fromJS, is } from 'immutable'
import config from './config'
import moment from 'moment'
import utils from 'edf-utils'

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
        this.load()
    }

    load = () => {
        if(this.component.props.data){
            this.initData(this.component.props.periodList, this.component.props.data)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if((!is(nextProps.periodList, this.component.props.periodList) || !is(nextProps.data, this.component.props.data)) && nextProps.data){
            this.initData(nextProps.periodList, nextProps.data)
        }
    }

    initData = (periodList, capitalAccount) => {
        let list = periodList.map( o => {
            return o.replace('年', '.').replace('月', '')
        }),
            data = {},
            {accountSumAmount, ...value} = capitalAccount
        for(let obj in value){
            value[obj] = Object.entries(value[obj])[0]
        }
        data = {
            periodList: list,
            capitalAccount: value,
            accountSumAmount: accountSumAmount
        }
        this.metaAction.sf('data.period', list[0])
        this.injections.reduce('load', data)
    }

    setField = async (path, value) => {
        this.metaAction.sf('data.period', value)
        let params = {year: value.split('.')[0], period: value.split('.')[1]},
            data = await this.webapi.query(params)
        this.refreshData(data)
    }

    openBalancesum = (key) => async () => {
        //余额表
        let value = this.metaAction.gf('data.capitalAccount').toJS(),
            dateValue = this.metaAction.gf('data.period')
        this.component.props.setPortalContent &&
        this.component.props.setPortalContent('余额表', 'app-balancesum-rpt',{
            initSearchValue: {
                date_end: this.metaAction.stringToMoment((dateValue.replace('.', "-")),'YYYY-MM'),
                date_start: this.metaAction.stringToMoment((dateValue.replace('.', "-")),'YYYY-MM'),
                beginAccountCode: value[key][0],
                endAccountCode: value[key][0]
            }               
        })
    }

    refresh = async () => {
        let value = this.metaAction.gf('data.period'),
		    params = {year: value.split('.')[0], period: value.split('.')[1]},
            data = await this.webapi.query(params)
        this.refreshData(data)
	}

    refreshData = (capitalAccount) => {
        let {accountSumAmount, ...value} = capitalAccount
        for(let obj in value){
            value[obj] = Object.entries(value[obj])[0]
        }
        this.injections.reduce('refresh', value, accountSumAmount)
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}