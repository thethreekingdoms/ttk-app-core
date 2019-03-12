import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import {Icon, Form, Select, FormDecorator, Input, Button, DatePicker, DateRangeMonthPickerComponent} from 'edf-component'
import config from './config'
import extend from './extend'
import { fromJS } from 'immutable'
import utils from 'edf-utils'
import renderColumns from './utils/renderColumns'
const FormItem = Form.Item
const Option = Select.Option

class action {
    constructor(option) {
        this.metaAction = option.metaAction
		this.extendAction = option.extendAction
		this.voucherAction = option.voucherAction
		this.config = config.current
		this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.extendAction.gridAction.onInit({ component, injections })
        this.component = component
        this.injections = injections
        if (this.component.props.setOkListener) {
            this.component.props.setOkListener(this.onOk)
        }
        if (this.component.props.setCancelLister) {
			this.component.props.setCancelLister(this.onCancel)
		}

        let addEventListener = this.component.props.addEventListener
        if (addEventListener) {
			addEventListener('onTabFocus', :: this.onTabFocus)
		}
        injections.reduce('init')

        this.load()
    }

    load = async () => {
        let filter = {}, response= {}, record, kplx
        let initData = this.component.props.initData
        // console.log(initData, 'initData')
        this.selfSystemDeclare = initData.selfSystemDeclare
        if(initData){ 
            record = initData.record
            if(initData.tabId=='01' || initData.isVattaxpayer){  // 销项发票
                if(!initData.isVattaxpayer){
                    if(record.expropriationMethod == undefined) {  
                        record.expropriationMethod = null
                    }else if(record.expropriationMethod == 'generalProject'){
                        record.expropriationMethod = 4000100002
                    }else{
                        record.expropriationMethod = 4000100001
                    }
                }else{   // 小规模带过来的货物类型
                    record.hwlx_idList = record.expropriationMethod
                    initData.record.hwlx_idList = record.expropriationMethod
                }
                filter = {
                    sbsqq: initData.date.skssqq.replace(/-/g, ''), // 申报属期
                    sbsqz: initData.date.skssqz.replace(/-/g, ''), // 申报属期
                    sl_id: record.sl_id, // 税率id
                    hwlx_idList: record.hwlx_idList ? record.hwlx_idList : [],  // 货物类型
                    jsfs_id: record.jsff_id, // 计税方式id
                    zsfs_id: record.expropriationMethod && !initData.isVattaxpayer ? record.expropriationMethod : null, // 征收方式id
                    kplx: initData.isVattaxpayer && record.dk!=undefined ? record.dk : null, //开票类型，是否代开
                    fplx_id: initData.isVattaxpayer && record.fplx_id!=undefined ? record.fplx_id : null, // 发票类型id
                    isInit: true,
                    page:{
                        pageSize: 20,
                        currentPage: 1
                    }
                }
                response = await this.webapi.fpCard.xxfpmx(filter)
            }else if(initData.tabId=='02'){   // 进项发票
                let kpyf, rzyf
                if(initData.record.expropriationMethod == 'authentication'){  // 本期认证抵扣
                    rzyf = initData.date.skssqq.replace(/-/g, '').substring(0,6)
                    kpyf = undefined
                }else{  // 发票日期在属期内的发票
                    kpyf = initData.date.skssqq.replace(/-/g, '').substring(0,6)
                    rzyf = undefined
                }
                filter = {
                    fplx_id: record.fplx_id, // 发票类型id
                    kpyf: kpyf,  // 开票月份
                    rzyf: rzyf, // 认证月份
                    sfdk: rzyf ? true : null, // 是否抵扣
                    isInit: true,
                    page:{
                        pageSize: 20,
                        currentPage: 1
                    }
                }
                response = await this.webapi.fpCard.jxfpmx(filter)
            }
        }
        if(response) {
            response.initData = initData
            this.injections.reduce('load', response)
        }
    }

    getListRowsCount = () => {
		return this.metaAction.gf('data.list').size
    }

    onCancel =()=> {
        let isChanged = this.metaAction.gf('data.other.isChanged')
        if(isChanged){
            return 'isChanged'
        }else{
            return true
        }
    }    
    // 筛选搜索
    onFieldChange = async( value, type, date, refresh) =>{
        if(value == undefined) return false

        if(!(date == 'dateL' && type == 'sbsqz')) this.metaAction.sf('data.other.isShow', false)
        let response,start,dateFilter,dateFilter1,dateFilter2,dateFilters
        if(!refresh){
            if(type == 'hwlx' && value.length >3) return false
            
            if(date == 'date'){
                start = value.startOf('month')
                start = utils.moment.momentToString(start, 'YYYY-MM-DD')
                
                this.metaAction.sf(`data.form.${type}`, fromJS(start))   
                this.metaAction.sf(`data.form.sbsqz`, fromJS(start))
            }else if(date == 'dateL'){   // 小规模
                if(type == 'sbsqq'){
                    start = value.startOf('month')
                    this.metaAction.sf('data.other.isShow', true)
                }else{
                    start = value.endOf('month')
                }
                start = utils.moment.momentToString(start, 'YYYY-MM-DD')
                this.metaAction.sf(`data.form.${type}`, fromJS(start))
            }else if(date == 'dateJX'){  // 进项，认证月份与开票月份，一个空一个有值
                start = value.startOf('month')
                start = utils.moment.momentToString(start, 'YYYY-MM-DD')
    
                if(type == 'kpyf'){
                    this.metaAction.sf(`data.form.${type}`, fromJS(start))
                    this.metaAction.sf(`data.form.rzyf`, undefined)
                }else if(type == 'rzyf'){
                    this.metaAction.sf(`data.form.${type}`, fromJS(start))
                    this.metaAction.sf(`data.form.kpyf`, undefined)
                }
            }else{
                this.metaAction.sf(`data.form.${type}`, fromJS(value))
            }
        }
        
        let form = this.metaAction.gf('data.form') && this.metaAction.gf('data.form').toJS(), filter
        let initData = this.component.props.initData
        if(form.sbsqq && initData.tabId=='01'){   // 销项  一般纳税人
            dateFilter = utils.moment.stringToMoment(form.sbsqq)
            dateFilter.startOf('month')
            dateFilter1 = utils.moment.momentToString(dateFilter, 'YYYY-MM-DD').replace(/-/g, '')
            if(!initData.isVattaxpayer){
                dateFilter.endOf('month')
                dateFilter2 = utils.moment.momentToString(dateFilter, 'YYYY-MM-DD').replace(/-/g, '')
            }else{
                dateFilters = utils.moment.stringToMoment(form.sbsqz)
                dateFilters.endOf('month')
                dateFilter2 = utils.moment.momentToString(dateFilters, 'YYYY-MM-DD').replace(/-/g, '')
            }
        }
        let hwlx_idList=[]
        if(form.hwlx){   // 货物类型
            if(!Array.isArray(form.hwlx)){
                hwlx_idList.push(form.hwlx)
            }else{
                hwlx_idList = form.hwlx
            }
        }
        
        let page = this.metaAction.gf('data.page')
        page = page.size ? page.toJS() : page
        if(refresh && refresh != 'refresh') {
            page = refresh
        }else{
            page.currentPage = 1
        }

        if(initData.tabId=='01' || initData.isVattaxpayer){  // 销项发票
            filter = {
                sbsqq: dateFilter1, // 申报属期  
                sbsqz: dateFilter2, // 申报属期
                sl_id: form.sl == 'all' ? null:form.sl, // 税率id
                hwlx_idList,  // 货物类型
                jsfs_id: form.jsfs == 'all' ? null:form.jsfs, // 计税方式id
                zsfs_id: form.zsfs == 'all' || initData.isVattaxpayer ? null:form.zsfs, // 征收方式id
                kplx: initData.isVattaxpayer ? (form.kplx == 'all' ? null:form.kplx) : null, //开票类型，是否代开
                fplx_id: initData.isVattaxpayer ? (form.fplx == 'all' ? null:form.fplx) : null, // 发票类型id
                isInit: false,
                page:{
                    currentPage: page.currentPage,
				    pageSize: page.pageSize
                }
            }
            response = await this.webapi.fpCard.xxfpmx(filter)
        }else if(initData.tabId=='02'){   // 进项发票
            filter = {
                fplx_id: form.fplx === 'all' ? null:form.fplx, // 发票类型id
                kpyf: form.kpyf ? form.kpyf.replace(/-/g, '').substring(0,6) : form.kpyf,  // 开票月份
                rzyf: form.rzyf ? form.rzyf.replace(/-/g, '').substring(0,6) : form.rzyf, // 认证月份
                sfdk: form.sfdk === 'all' ? null:form.sfdk, // 是否抵扣
                isInit: false,
                page:{
                    currentPage: page.currentPage,
				    pageSize: page.pageSize
                }
            }
            response = await this.webapi.fpCard.jxfpmx(filter)
        }
        response.initData = initData
        if(response) this.injections.reduce('load', response)
    }
    // 表格修改
    selectValue = async(index, value, type) => {
        if(value == undefined) return false
        let initData = this.component.props.initData
        let isVattaxpayer = this.component.props.initData.isVattaxpayer, filter={}
        let list = this.metaAction.gf('data.list').toJS(), id, hwlx_id, jsfs_id, zsfs_id, ts, kplx, sfdk

        id = list[index].id
        ts = list[index].ts
        if(type == 'hwlx') hwlx_id = value
        if(type == 'jsfs') jsfs_id = value
        if(type == 'zsfs') zsfs_id = value
        if(type == 'sfdk') sfdk = value

        let response
        if(isVattaxpayer && type == 'kplx'){
            if(value){
                kplx = '代开'
            }else{
                kplx = '自开'
            }
        }
        if(initData.tabId == '01'){
            filter = {
                id,
                hwlx_id,
                jsfs_id,
                zsfs_id,
                kplx,
                ts
            }
            response = await this.webapi.fpCard.xxfpmxUpdate(filter)
        }else{
            filter = {
                id,
                sfdk,
                ts
            }
            response = await this.webapi.fpCard.jxfpmxUpdate(filter)
        }
        if(response) {
            this.metaAction.sf('data.other.isChanged', true)
            this.onFieldChange('refresh',null,null,'refresh')
        }
    }

    handleDisabledDate = (current) => {
        if (current) {
            let enableTime = this.metaAction.gf('data.form.sbsqq')
            if (enableTime) enableTime = enableTime.replace(/-/g, '').substring(0,6)
            return current && current.format('YYYYMM') < enableTime
        }
    } 

    dateWindowChange = (type, status) => {
        if( type == 'next' ){
            this.metaAction.sf('data.other.isShow', status)
        }
    }
    getFilterOption = () => {
        let initData = this.component.props.initData, sbsqq,rzyf,kpyf,sbsqz
        let form = this.metaAction.gf('data.form') && this.metaAction.gf('data.form').toJS(),
        isShow = this.metaAction.gf('data.other.isShow')

        if(form.sbsqq) sbsqq = utils.moment.stringToMoment(form.sbsqq)
        if(form.sbsqz) sbsqz = utils.moment.stringToMoment(form.sbsqz)
        if(form.rzyf) rzyf = utils.moment.stringToMoment(form.rzyf.substring(0,7))
        if(form.kpyf) kpyf = utils.moment.stringToMoment(form.kpyf.substring(0,7))
        //小规模纳税人销项发票清单
        if(initData && initData.isVattaxpayer){
            console.log(initData.isVattaxpayer)
            return <div className='invoicedetail'>
                <FormItem className='invoicedetail-item invoicedetail-mounth' label='申报属期'>
                    <DatePicker.MonthPicker
                        onChange={(value) => this.onFieldChange( value, 'sbsqq', 'dateL')}
                        onOpenChange={(status) => this.dateWindowChange('pre', status)}
                        value={sbsqq}
                        />
                    <span className='text'>至</span>  
                    <DatePicker.MonthPicker
                        open={isShow}
                        onOpenChange={(status) => this.dateWindowChange('next', status)}
                        disabledDate={(value) => this.handleDisabledDate(value)}
                        onChange={(value) => this.onFieldChange( value, 'sbsqz', 'dateL')}
                        value={sbsqz}
                        />
                </FormItem>
                <FormItem className='invoicedetail-item fplxl-item' label='发票类型'>
                    <Select 
                        value= {form.fplx}
                        onChange={(value) => this.onFieldChange( value, 'fplx')}
                    >
                        {this.selectOption('fplxList')}
                    </Select>
                </FormItem>
                <FormItem className='invoicedetail-item sl-item' label='税率'>
                    <Select 
                        value= {form.sl}
                        onChange={(value) => this.onFieldChange( value, 'sl')}
                    >
                        {this.selectOption('slList')}
                    </Select>
                </FormItem>
                <FormItem className='invoicedetail-item hwlx-item' label='货物类型'>
                    <Select 
                        mode="tags"
                        maxTagCount={3}
                        value={form.hwlx}
                        onChange={(value) => this.onFieldChange( value, 'hwlx')}
                    >
                        {this.selectOption('hwlxList')}
                    </Select>
                </FormItem>
                <FormItem className='invoicedetail-item little-item' label='开票类型'>
                    <Select 
                        value={form.kplx}
                        onChange={(value) => this.onFieldChange( value, 'kplx')}
                    >
                        {this.selectOption('kplxList')}
                    </Select>
                </FormItem>
            </div>
        //一般纳税人进项发票清单
        }else if(initData && initData.tabId=='02'){
            return <div className='invoicedetail'>
                <FormItem className='invoicedetail-item' label='发票类型'>
                    <Select 
                        value={form.fplx}
                        onChange={(value) => this.onFieldChange( value, 'fplx')}
                    >
                        {this.selectOption('fplxList')}
                    </Select>
                </FormItem>
                <FormItem className='invoicedetail-item' label='开票月份'>
                    <DatePicker.MonthPicker
                        value={kpyf}
                        placeholder=''
                        onChange={(value) => this.onFieldChange( value, 'kpyf', 'dateJX')}
                        />
                </FormItem>
                <FormItem className='invoicedetail-item' label='认证月份'>
                    <DatePicker.MonthPicker
                        value={rzyf}
                        placeholder=''
                        onChange={(value) => this.onFieldChange( value, 'rzyf', 'dateJX')}
                        />
                </FormItem>
                <FormItem className='invoicedetail-item' label='是否抵扣'>
                    <Select 
                        value={form.sfdk}
                        onChange={(value) => this.onFieldChange( value, 'sfdk')}
                    >
                        {this.selectOption('sfdkList')}
                    </Select>
                </FormItem>
            </div>
        //一般纳税人销项发票清单
        }else {
            return <div className='invoicedetail'>
                <FormItem className='invoicedetail-item' label='申报属期'>
                    <DatePicker.MonthPicker
                        // disabledDate={this.getDisabledDate}
                        value={sbsqq}
                        onChange={(value) => this.onFieldChange( value, 'sbsqq', 'date')}
                        />
                </FormItem>
                <FormItem className='invoicedetail-item sll-item' label='税率'>
                    <Select 
                        value={form.sl}
                        onChange={(value) => this.onFieldChange( value, 'sl')}
                    >
                        {this.selectOption('slList')}
                    </Select>
                </FormItem>
                <FormItem className='invoicedetail-item hwlx-item' label='货物类型'>
                    <Select 
                        mode="tags"
                        maxTagCount={3}
                        value= {form.hwlx}
                        onChange={(value) => this.onFieldChange(value, 'hwlx')}
                    >
                        {this.selectOption('hwlxList')}
                    </Select>
                </FormItem>
                <FormItem className='invoicedetail-item js-item' label='计税方式'>
                    <Select 
                        value= {form.jsfs}
                        onChange={(value) => this.onFieldChange(value, 'jsfs')}
                    >
                        {this.selectOption('jsfsList')}
                    </Select>
                </FormItem>
                <FormItem className='invoicedetail-item js-item' label='征收方式'>
                    <Select 
                        value={form.zsfs}
                        onChange={(value) => this.onFieldChange( value, 'zsfs')}
                    >
                        {this.selectOption('zsfsList')}
                    </Select>
                </FormItem>
            </div>
        }
    }

    selectOption = (params, isTable) => {
        let paramsArr = this.metaAction.gf(`data.other.${params}`)
            paramsArr = paramsArr && paramsArr.toJS()
        if(params != 'hwlxList' && isTable == 'isTable') paramsArr.shift()

        if(paramsArr){
            return paramsArr.map((item,index) => {
                return <Option key={item.id} value={item && item.id} title={item && item.name}>{item && item.name}</Option>
            })
        }
    }

    //分页修改
	pageChanged = async (currentPage, pageSize) => {
        if (pageSize == null || pageSize == undefined) {
			pageSize = this.metaAction.gf('data.page').toJS().pageSize
        }
        this.onFieldChange('refresh',null,null, {currentPage, pageSize})
	}

    getColumns = () => {
        let list = this.metaAction.gf('data.list').toJS(),
            other = this.metaAction.gf('data.other').toJS(),
            initData = this.component.props.initData
        let columnDto = [{
            caption: "序号",
            fieldName: "xh",
            idAlignType: '1000050001',
            width: 43,
        }, {
            caption: "发票代码",
            fieldName: "fpdm",
            idAlignType: '1000050002',
            width: 110,
        }, {
            caption: "发票号码",
            fieldName: "fphm",
            idAlignType: '1000050002',
            width: 100,
        }, {
            caption: "开票日期",
            fieldName: "kprq",
            idAlignType: '1000050002',
            width: 90,
        }]

        //一般纳税人进项发票清单
        if(initData && initData.tabId=='02'){
            columnDto = columnDto.concat([{
                caption: "供应商",
                fieldName: "gys",
                idAlignType: '1000050002',
                width: 220,
                flexGrow: 1,
            },{
                caption: "金额",
                fieldName: "je",
                idAlignType: '1000050003',
                width: 108,
            },{
                caption: "税额",
                fieldName: "se",
                idAlignType: '1000050003',
                width: 108,
            },{
                caption: "价税合计",
                fieldName: "jshj",
                idAlignType: '1000050003',
                width: 108,
            },{
                caption: "认证（抵扣）月份",
                fieldName: "rzyf",
                idAlignType: '1000050002',
                width: 120
            },{
                caption: "是否抵扣",
                fieldName: "sfdk",
                idAlignType: '1000050002',
                width: 120
            }])
        }else {
            columnDto = columnDto.concat([{
                caption: "客户",
                fieldName: "kh",
                idAlignType: '1000050002',
                width: 220,
                flexGrow: 1,
            },{
                caption: "商品",
                fieldName: "sp",
                idAlignType: '1000050002',
                width: 220,
                flexGrow: 1,
            },{
                caption: "金额",
                fieldName: "je",
                idAlignType: '1000050003',
                width: 108,
            },{
                caption: "税率",
                fieldName: "sl",
                idAlignType: '1000050002',
                width: 85,
            },{
                caption: "税额",
                fieldName: "se",
                idAlignType: '1000050003',
                width: 108,
            },{
                caption: "价税合计",
                fieldName: "jshj",
                idAlignType: '1000050003',
                width: 108,
            },{
                caption: "货物类型",
                fieldName: "hwlx",
                fieldName_id: "hwlx_id",
                idAlignType: '1000050002',
                width: 120,
                flexGrow: 1
            }])

            //小规模纳税人销项发票清单
            if(initData && initData.isVattaxpayer){
                columnDto = columnDto.concat([{
                    caption: "开票类型",
                    fieldName: "kplx",
                    fieldName_id: "kplx_id",
                    idAlignType: '1000050002',
                    width: 120,
                    flexGrow: 1
                }])
            //一般纳税人销项发票清单
            }else{
                columnDto = columnDto.concat([{
                    caption: "计税方式",
                    fieldName: "jsfs",
                    fieldName_id: "jsfs_id",
                    idAlignType: '1000050002',
                    width: 120,
                    flexGrow: 1
                },{
                    caption: "征收方式",
                    fieldName: "zsfs",
                    fieldName_id: "zsfs_id",
                    idAlignType: '1000050002',
                    width: 120,
                    flexGrow: 1
                }])
            }
        }
        
        return renderColumns(columnDto, list, other, this, initData.tabId)
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
		extendAction = extend.actionCreator({ ...option, metaAction }),
		voucherAction = FormDecorator.actionCreator({ ...option, metaAction }),
		o = new action({ ...option, metaAction, extendAction,voucherAction }),
		ret = { ...metaAction, ...extendAction.gridAction,...voucherAction, ...o }
	
	metaAction.config({ metaHandlers: ret })
	return ret
}