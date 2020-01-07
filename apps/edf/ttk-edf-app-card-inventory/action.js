import React from 'react'
import {action as MetaAction, AppLoader} from 'edf-meta-engine'
import config from './config'
import {FormDecorator} from 'edf-component'
import debounce from 'lodash.debounce'
import {Spin} from 'edf-component'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.voucherAction = option.voucherAction
        this.webapi = this.config.webapi
        this.fetchUser = debounce(this.fetchUser, 800);
        this.lastFetchId = 0
    }

    onInit = ({component, injections}) => {
        this.voucherAction.onInit({component, injections})
        this.component = component
        this.injections = injections

        if (this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        }

        injections.reduce('init', {
            isPop: this.component.props.isPop
        })

        this.load()
    }

    load = async () => {
        let data = {}, response = {}, code
        if (this.component.props.personId || this.component.props.personId === 0) {
            response = await this.webapi.inventory.query(this.component.props.personId)
        } else {
            code = await this.webapi.inventory.getCode()
        }
        if (code) data.code = code
        if (response) data.response = response

        let queryData = await this.webapi.inventory.queryData()
        if (queryData) data.queryData = queryData

        this.injections.reduce('load', data)
        this.fetchUser(1010)
    }

    fetchUser = async (value) => {
        if(!value){value = 1010}
        // console.log('数字',Number(value))
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.injections.reduce('taxCodeLoad', {data: [], fetching: true})
        let response = await this.webapi.inventory.taxClassification({key: value})
        if (response) {
            if (fetchId !== this.lastFetchId) { // for fetch callback order
                return;
            }
            const data = response.map(taxData => ({
                text: taxData.key + "-" + taxData.label,
                value: taxData.label + ',' + taxData.key,
            }));
            this.injections.reduce('taxCodeLoad', {data, fetching: false})
        }
    }

    taxOption = () => {
        const data = this.metaAction.gf('data.taxCode.data') && this.metaAction.gf('data.taxCode.data').toJS()
        if (data) {
            return data.map(d => <Option title={d.text} key={d.value}>{d.text}</Option>)
        }
    }
    taxNotFound = () => {
        const fetching = this.metaAction.gf('data.taxCode.fetching')
        return fetching ? <Spin size="small"/> : null
    }
    tacChange = (str) => {
        if (str) {
            this.injections.reduce('taxCodeLoad', {fetching: false})
            this.injections.reduce('taxCodeChange', str)
        } else {
            this.injections.reduce('taxCodeChange', str)
        }
    }

    onOk = async () => {
        return await this.save()
    }

    save = async () => {
        const form = this.metaAction.gf('data.form').toJS(),
            isProperty = this.metaAction.gf('data.isProperty')

        let checkArr = [{
            path: 'data.form.code', value: form.code
        }, {
            path: 'data.form.name', value: form.name
        }, {
            path: 'data.form.unit', value: form.unit
        }, {
            path: 'data.form.property', value: form.property
        }, {
            path: 'data.form.rate', value: form.rate
        }]

        if (isProperty) {
            checkArr.push({
                path: 'data.form.propertyDetail', value: form.propertyDetail
            })
        }

        const ok = await this.voucherAction.check(checkArr, this.check)

	    if(!ok){
		    this.metaAction.toast('warning','请按页面提示信息修改信息后才可提交')
		    return false
	    }

        let response, data = {}
        // if (form.taxClassificationId) data.taxClassificationId = form.taxClassificationId
        // if (form.taxClassificationName) data.taxClassificationName = form.taxClassificationName
        // if (form.code) data.code = form.code.trim()
        // if (form.name) data.name = form.name.trim()
	    // if (form.specification) data.specification = form.specification.trim()
	    // if (form.unit) data.unitId = form.unit.id
	    // if (form.property) data.propertyId = form.property.id
	    // if (form.propertyDetail) data.propertyDetail = form.propertyDetail.id
	    // if (form.rate) data.rate = form.rate.id
	    // if (form.isEnable || form.isEnable === false) data.isEnable = form.isEnable
	    // if (form.ts) data.ts = form.ts
	    data.taxClassificationId = form.taxClassificationId ? form.taxClassificationId : ''
	    data.taxClassificationName = form.taxClassificationName ? form.taxClassificationName : ''
	    data.code = form.code ? form.code.trim() : ''
	    data.name = form.name ? form.name.trim() : ''
	    data.specification = form.specification ? form.specification.trim() : ''
	    data.unitId = form.unit ? form.unit.id : ''
	    data.unitName = form.unit.name ? form.unit.name.trim() : ''
	    data.propertyId = form.property ? form.property.id : ''
	    data.propertyName = form.property ? form.property.name : ''
	    data.propertyDetail = form.propertyDetail ? form.propertyDetail.id : ''
	    data.rate = form.rate ? form.rate.id : '';
        data.rateName = form.rate.name ? form.rate.name : '';
	    data.isEnable = (form.isEnable || form.isEnable === false) ? form.isEnable : ''
	    data.ts = form.ts ? form.ts : ''
        data.isReturnValue = true
        if (this.component.props.personId || this.component.props.personId === 0) {
            data.id = this.component.props.personId
            response = await this.webapi.inventory.update(data)
        } else {
            response = await this.webapi.inventory.create(data)
        }

        if (response && response.error) {
            this.metaAction.toast('error', response.error.message)
            return false
        }else{
            this.metaAction.toast('success', '保存成功')
            return response
        }
    }

	changeCheck = (num) => {
		const form = this.metaAction.gf('data.form').toJS()
		if(num == 1){
			this.voucherAction.check([{
				path: 'data.form.code', value: form.code
			}], this.check)
		}else {
			this.voucherAction.check([{
				path: 'data.form.name', value: form.name
			}], this.check)
		}
	}

    check = (option) => {
        if (!option || !option.path)
            return

        if (option.path == 'data.form.code') {
            return {errorPath: 'data.other.error.code', message: option.value && option.value.trim() ? '' : '请录入编码'}
        }
        else if (option.path == 'data.form.name') {
            return {errorPath: 'data.other.error.name', message: option.value && option.value.trim() ? '' : '请录入名称'}
        }
        else if (option.path == 'data.form.unit') {
            return {errorPath: 'data.other.error.unit', message: option.value ? '' : '请选择计量单位'}
        }
        else if (option.path == 'data.form.property') {
            return {errorPath: 'data.other.error.property', message: option.value ? '' : '请选择存货及服务分类'}
        }
        else if (option.path == 'data.form.rate') {
            return {errorPath: 'data.other.error.rate', message: option.value ? '' : '请选择税率'}
        }
        else if (option.path == 'data.form.propertyDetail') {
            return {errorPath: 'data.other.error.propertyDetail', message: option.value ? '' : '请选择明细分类'}
        }
    }

    fieldChange = (path, value) => {
        this.voucherAction.fieldChange(path, value, this.check)
    }

    addUnit = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '新增计量单位',
			width: 350,
			height: 280,
            children: this.metaAction.loadApp(
                'ttk-edf-app-card-unit', {
                    store: this.component.props.store
                }
            )
        })
        if (ret) {
            let response = await this.webapi.unit.query()
            if (response) {
                this.injections.reduce('unit', response.list, ret)
            }
        }
    }

    propertyChange = (v) => {
        v = JSON.parse(v)
        let a = this.metaAction.gf('data.other.propertyDetail').toJS().filter((data) => {
            return v.id == data.propertyId
        })
        this.injections.reduce('propertyChange', v, a)
        const form = this.metaAction.gf('data.form').toJS(),
            checkArr = [ {
                path: 'data.form.property', value: form.property
            }]
        this.voucherAction.check(checkArr, this.check)
    }
    propertyDetailChange = (v) => {
        v = JSON.parse(v)
        let a = this.metaAction.gf('data.other.propertyDetail').toJS().filter((data) => {
            return v.id == data.propertyId
        })
        this.injections.reduce('propertyChange', v, a)
        const form = this.metaAction.gf('data.form').toJS(),
            checkArr = [{
                path: 'data.form.propertyDetail', value: form.propertyDetail
            }]
        this.voucherAction.check(checkArr, this.check)
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        voucherAction = FormDecorator.actionCreator({...option, metaAction}),
        o = new action({...option, metaAction, voucherAction}),
        ret = {...metaAction, ...voucherAction, ...o}


    metaAction.config({metaHandlers: ret})

    return ret
}
