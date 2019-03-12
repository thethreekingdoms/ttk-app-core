import React from 'react'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import { Icon, Tree, Form, Select, Switch, DatePicker, LoadingMask } from 'edf-component'
import config from './config'
import renderColumns from './utils/renderColumns'
import { fromJS } from 'immutable'
import moment from 'moment'
const Option = Select.Option
const FormItem = Form.Item

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        if (this.component.props.setCancelLister) {
			this.component.props.setCancelLister(this.onCancel)
		}

        //this.component.props.initData = {type: "vattaxpayer"}

        let initData = this.component.props.initData
        injections.reduce('init', initData)

        this.load()
    }

    componentDidMount = () => {
        if (window.addEventListener) {
            window.addEventListener('resize', this.onResize, false)
        } else if (window.attachEvent) {
            window.attachEvent('onresize', this.onResize)
        } else {
            window.onresize = this.onResize
        }
    }
    onResize = (type) => {
        let keyRandom = Math.floor(Math.random() * 10000)
        this.keyRandom = keyRandom
        //const tableOption = this.metaAction.gf('data.tableOption').toJS()
        setTimeout(() => {
            if (this.keyRandom == keyRandom) {
                let dom = document.getElementsByClassName('ttk-tax-app-invoicesummary-table')[0]
                if (!dom) {
                    if (type) {
                        return
                    }
                    setTimeout(() => {
                        this.onResize()
                    }, 20)
                } else {
                    let tableDom = dom.getElementsByClassName('ant-table-tbody')[0];
                    let num = dom.offsetHeight - tableDom.offsetHeight
                    let tableOption = this.metaAction.gf('data.tableOption').toJS()
                    if (num < 45) {
                        const width = dom.offsetWidth
                        const height = dom.offsetHeight
                        this.injections.reduce('setTableOption', { ...tableOption, y: height - 80, containerWidth: width - 100 })
                    } else {
                        delete tableOption.y
                        this.injections.reduce('updateOption', { path: 'data.tableOption', value: tableOption })
                    }
                                  
                }
            }
        }, 100)
    }
    componentWillUnmount = () => {
        if (this.props && this.props.isFix === true) return
        const win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
    }

    load = async () => {
        let other = this.metaAction.gf('data.other').toJS(), response = []
        let option = {
            sbsqq: moment(other.option.skssqq).format('YYYY-MM-DD').split('-').join(''),
            sbsqz: moment(other.option.skssqz).format('YYYY-MM-DD').split('-').join('')
        }

        response  = await this.webapi.invoicesummary.xxfptj(option)
        this.injections.reduce('load', response)
        setTimeout(() => {  
            this.onResize()              
        }, 50)
    }

    //刷新列表
    refresh = async () => {
        let other = this.metaAction.gf('data.other').toJS(), response = []
        let option = {
            sbsq: moment(other.option.skssqq).format('YYYY-MM').split('-').join('')
        }

        //一般纳税人进项发票
        if(other.tabId == '02'){
            response  = await this.webapi.invoicesummary.jxfptj(option)
        //销项发票
        }else{
            option = {
                sbsqq: moment(other.option.skssqq).format('YYYY-MM-DD').split('-').join(''),
                sbsqz: moment(other.option.skssqz).format('YYYY-MM-DD').split('-').join('')
            }
            response  = await this.webapi.invoicesummary.xxfptj(option)
        }
        this.injections.reduce('load', response)
        setTimeout(() => {  
            this.onResize()              
        }, 50)
    }

    moreActionOpeate = (e) => {
        this[e.key] && this[e.key]()
    }

    //清空发票
    emptyInvoice = async () => {
        let other = this.metaAction.gf('data.other').toJS(), response
        let option = {
            sbsq: moment(other.option.skssqq).format('YYYY-MM').split('-').join('')
        }

        LoadingMask.show()
        //一般纳税人进项发票
        if(other.tabId == '02'){
            response  = await this.webapi.invoicesummary.puclearBySbsq(option)
        //销项发票
        }else{
            option = {
                sbsqq: moment(other.option.skssqq).format('YYYY-MM-DD').split('-').join(''),
                sbsqz: moment(other.option.skssqz).format('YYYY-MM-DD').split('-').join('')
            }
            response  = await this.webapi.invoicesummary.saclearBySbsq(option)
        }
        LoadingMask.hide()
        this.metaAction.toast('success', '清空发票成功')

        this.refresh()
    }

    //页签切换
    tabChange = async (path, value) => {
        let other = this.metaAction.gf('data.other').toJS(), response = []
        let option = {
            sbsq: moment(other.option.skssqq).format('YYYY-MM').split('-').join('')
        }
        //一般纳税人进项发票
        if(other.tabId == '01'){
            response  = await this.webapi.invoicesummary.jxfptj(option)
        //一般纳税人销项发票
        }else{
            option = {
                sbsqq: moment(other.option.skssqq).format('YYYY-MM-DD').split('-').join(''),
                sbsqz: moment(other.option.skssqz).format('YYYY-MM-DD').split('-').join('')
            }
            response  = await this.webapi.invoicesummary.xxfptj(option)
        }

        this.injections.reduce('tabChange', path, value, response)
        setTimeout(() => {  
            this.onResize()              
        }, 50)
    }

    onCancel = () => {
        let isChanged = this.metaAction.gf('data.other.isChanged')
        this.component.props.closeModal({isChanged})
    }

    //点击一键采集
    oneKeyCollectClick = async () => {
        this.showPayTaxInfoSetPage()
        // let dlxxhasReadSJInfo = await this.webapi.invoicesummary.dlxxhasReadSJInfo({})
        // if (!dlxxhasReadSJInfo) {
        //     // 打开企业信息中的纳税申报设置界面
        //     this.showPayTaxInfoSetPage()
        // } else {
        //     const areaRule = this.metaAction.context.get('areaRule') //获取全局的启用日期
        //     if (areaRule && !areaRule.isGetInvoice) {
        //         this.metaAction.toast('error', '绑定的省市暂不支持采集发票')
        //     } else {
        //         this.onCollectModal();
        //     }
        // }
    }
    showPayTaxInfoSetPage = async () => {
        const ret = await this.metaAction.modal('show', {
            height: 325,
            width: 440,
            //closable: false,
            okText: '设置',
            title: '纳税设置',
            wrapClassName: 'paytaxinfo-tip',
            children: this.getSetContent(),
        })
        if (ret) {
            this.component.props.closeModal('org')
        }
    }

    getSetContent = () => {
        return <div>
            <p className='jinggao'><Icon type="jinggao" fontFamily='edficon' /><span>请先设置网报帐号，并确认您的纳税人信息！</span></p >
        </div>
    }

    //弹出采集发票
    onCollectModal = async () => {
        let other = this.metaAction.gf('data.other').toJS(), 
            currentOrg = this.metaAction.context.get("currentOrg"), flag = 'sa'
        if(other.tabId == '02') flag = 'pu'
        const ret = await this.metaAction.modal('show', {
            title: '采集发票',
            width: 450,
            okText: '采集',
            //  footer: false,
            children: this.metaAction.loadApp('ttk-scm-app-collect', {
                store: this.component.props.store,
                collectOnOk: async (params) => {
                    //打点统计
                    if (typeof (gio) == "function") {
                        gio('track', 'collectBills');
                    }
                    const domainName = location.host.split('.')
                    let vatOrEntry = 0
                    if(other.tabId == '02'){
                        vatOrEntry = 1
                    }
                    const seq = await this.webapi.invoicesummary.collecteData1({ ...params, vatOrEntry });
                    if (seq) {
                        let asyncRequestResult
                        return asyncRequestResult = await this.webapi.invoicesummary.asyncRequestResult({ seq }, 2000);
                    }
                },
                flag: flag,
                enableddateStart: moment(other.option.skssqq),
                enableddateEnd: moment(other.option.skssqz),
                defaultdate: moment(other.option.skssqq)//默认查询日期
            })
        })

        if (ret) {
            this.refresh()
        }
    }

    //列表展示
    tableColumns = () => {
        let list = this.metaAction.gf('data.list'),  //表格信息
            data = this.metaAction.gf('data').toJS()
        if (list) {
            return renderColumns(list, this, data)
        }
    }

    getLinkContent = (text, record, index) => {
        return this.getLink(text, record, index)
    }

    //一般项目
    getGeneralProjectLinkContent = (text, record, index) => {
        return this.getLink(text, record, index, 'generalProject')
    }

    //即征即退
    getSignAndRetreatLinkContent = (text, record, index) => {
        return this.getLink(text, record, index, 'signAndRetreat')
    }

    //本期认证抵扣
    getAuthenticationLinkContent = (text, record, index) => {
        return this.getLink(text, record, index, 'authentication')
    }

    //在属期内的发票
    getGeneratLinkContent = (text, record, index) => {
        return this.getLink(text, record, index, 'genera')
    }

    getHwjlwLinkContent = (text, record, index) => {
        let type = [3000130001, 3000130002]
        return this.getLink(text, record, index, type)
    }

    getFwbdchwxzcLinkContent = (text, record, index) => {
        let type = [3000130003, 3000130004, 3000130005]
        return this.getLink(text, record, index, type)
    }

    getLink = (text, record, index, type) => {
        return <span title={text} className='link'><a onClick = {() => { this.openInvoiceDetail(text, record, index, type) } }>{text}</a></span>
    }

    addThousandsPosition = (value) => {
        let num
        if(!value) {
            if(value == 0) return parseFloat(0).toFixed(2)
            return ''
        }
        if (value != '') {
            num = parseFloat(value).toFixed(2)
        }else{
            num = value.toString()
        }
        let regex = /(\d{1,3})(?=(\d{3})+(?:\.))/g
        return num.replace(regex, "$1,")
    }

    //计税方法
    getjsffContent = (text, record, index) => {
        if(record.jsff == '合计')  return this.getCalcColumnSpanContent(text, record, index, 3)
        return this.getCalcRowSpanContent(text, record, index, 'jsff')
    }

    //货物类型
    gethwlxContent = (text, record, index) => {
        if (record.hwlx == '合计') {
            return this.getCalcColumnSpanContent(text, record, index, 2)
        }else if(record.jsff == '合计') {
            return this.getCalcColumnSpanContent(text, record, index)
        }
         return this.getCalcRowSpanContent(text, record, index, 'hwlx')
    }

    //税率
    getslContent = (text, record, index) => {
        let other = this.metaAction.gf('data.other').toJS()
        if(other.isVattaxpayer){
            if(record.jsff == '合计') return this.getCalcColumnSpanContent(record.jsff, record, index, 2)
            return this.getCalcRowSpanContent(text, record, index, 'sl')
        }else{
            if (record.hwlx == '合计') {
                return this.getCalcColumnSpanContent(text, record, index)
            }else if(record.jsff == '合计') {
                return this.getCalcColumnSpanContent(text, record, index)
            }
            return <span style={{width: '35px'}} title={text} className='center'>{text}</span>
        }
    }

    //发票类型
    getInvoicesTypeContent = (text, record, index) => {
        let other = this.metaAction.gf('data.other').toJS()
        if(other.isVattaxpayer && record.jsff == '合计'){
            return this.getCalcColumnSpanContent(text, record, index)
        }
        return <span title={text}>{text}</span>      
    }

    //合并列
    getCalcRowSpanContent = (text, record, index, name) => {
        const num = this.calcRowSpan(record[name], name, index)
        let style = {}
        if(name=='hwlx'){
            style = {width: '100px'}
        }else if(name=='sl') {
            style = {width: '35px'}
        }
        const obj = {
            children: (
                <span title={text} style={style} className={name=='sl' ? 'center' : ''}>{text}</span>
            ),
            props: {
                rowSpan: num,
            },
        }
        return obj
    }

    //合并行
    getCalcColumnSpanContent = (text, record, index, num) => {
        const obj = {
            children: (
                <span title={text}>{text}</span>
            ),
            props: {
                colSpan: num ? num : 0,
            },
        }
        return obj
    }

    //合计行样式
    renderRowClassName = (record, index) => {
        let other = this.metaAction.gf('data.other').toJS()
        //小规模销项发票
        if(other.isVattaxpayer && (record.sl == '合计' || record.fplx == '合计')){
            return 'small-plan'
        //一般纳税人进项发票
        }else if(other.tabId == '02' && record.fplx == '合计'){
            return 'small-plan'
        //一般纳税人销项发票
        }else if(other.tabId == '01' && (record.hwlx == '合计' || record.jsff == '合计' || 
        record.sl == '合计')){
            return 'small-plan'
        }else {
            return ''
        }
    }

    getWord = () => {
        let other = this.metaAction.gf('data.other').toJS()
        if(other.tabId == '02'){
            return '本期内没有进项发票，请先采集发票吧！'
        }else{
            return '本期内没有销项发票，请先采集发票吧！'
        }
    }

    //打开发票清单弹框
    openInvoiceDetail = async (text, record, index, type) => {
        let other = this.metaAction.gf('data.other').toJS()
        let name = '一般纳税人销项发票清单'
        if(other.isVattaxpayer){
            name = '小规模纳税人销项发票清单'
        }else if(other.tabId == '02'){
            name = '一般纳税人进项发票清单'
        }
        if(type) {
            record.expropriationMethod = type
        }else{
            if(record.expropriationMethod) delete record.expropriationMethod
        }
        const ret = await this.metaAction.modal('show', {
            title: name,
            wrapClassName: 'ttk-tax-app-invoicedetail-model',
            width: '920px',
            footer: '',
            children: this.metaAction.loadApp('ttk-tax-app-invoicedetail', {
                store: this.component.props.store,
                initData: {
                    tabId: other.tabId, 
                    isVattaxpayer: other.isVattaxpayer, 
                    record, 
                    selfSystemDeclare: other.option.selfSystemDeclare,
                    date: { skssqq: other.option.skssqq, skssqz: other.option.skssqz }
                }
            }),
        })

        if(ret == 'isChanged'){
            this.injections.reduce('update', {path: 'data.other.isChanged', value: true})
            this.refresh()
        }
    }

    //合并行的
    calcRowSpan = (text, columnKey, currentRowIndex) => {
        let list = this.metaAction.gf('data.list')
        if (!list) return
        const rowCount = list.size
        if (rowCount == 0 || rowCount == 1) return 1

        if (currentRowIndex > 0
            && currentRowIndex <= rowCount
            && text == list.getIn([currentRowIndex - 1, columnKey])) {
            return 0
        }

        var rowSpan = 1
        for (let i = currentRowIndex + 1; i < rowCount; i++) {
            if (text == list.getIn([i, columnKey]))
                rowSpan++
            else
                break
        }

        return rowSpan
    }

    //表格复选框
    getRowSelection = () => {
        return undefined
    }

    getCurrentOrg = () => this.metaAction.context.get('currentOrg') || {}

    getOrgId = () => {
        const org = this.getCurrentOrg()
        if (org) {
            return org.id
        }
        return ""
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}