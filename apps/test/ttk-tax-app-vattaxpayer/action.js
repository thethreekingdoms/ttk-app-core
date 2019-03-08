import React from 'react'
import { Map, fromJS, is } from 'immutable'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import config from './config'
import { Menu, Tabs, Collapse, Button, Icon, LoadingMask } from 'edf-component'
import moment from 'moment'
import { number, environment, formulaCalc } from 'edf-utils'
import { personaliseRenderTableName, personaliseFormatData, personaliseShowTable, personaliseCalc, personalDelEmptyRow, personalCancatCheckList } from './personalise'

const Panel = Collapse.Panel
let formulaList = [];
const CHECK = 1; //校验类型
const CALC = 0;  //计算类型 
const PATHRGX = /[a-zA-Z0-9]+[_]{1}[a-zA-Z0-9_]+/g
const SIGNRGX = /[==|\!=|<=|>=|<|>|?|\|\||\&\&|\:]+/g
const GSRGX = /[^=&^\!&^<&^>&^?&^\|&\&|\:]+/g
const ROUNDLEFTSTR = '(Math.round((('
const ROUNDRIGHTSTR = ')* 100)) / 100)'

let getSumRowCheckList = (index) => {
    return [{
        formula: `zzsxgmkcxmqd_kcxmqdmx_${index}_yxkcxmje<0`,
        message: "“允许扣除项目金额”合计应大于等于0",
        targetName: `zzsxgmkcxmqd_kcxmqdmx_${index}_yxkcxmje`,
        needHaveName: 'zzsxgmkcxmqd'
    }, {
        formula: `zzsxgmkcxmqd_kcxmqdmx_${index}_yxkcxmje!=(zzsxgmflzl_flzlForm_bqfse)+(zzsxgmflzl_flzlForm_bqfse5)`,
        message: "《应税服务扣除项目清单》的合计数不等于《增值税纳税申报表（适用于增值税小规模纳税人）附列资料》第2及第10栏本期发生额的合计数",
        targetName: `zzsxgmkcxmqd_kcxmqdmx_${index}_yxkcxmje,zzsxgmflzl_flzlForm_bqfse,zzsxgmflzl_flzlForm_bqfse5`,
        needHaveName: 'zzsxgmkcxmqd'
    }, {
        formula: "(zzsjmssbmxb_zzsjmssbmxbjsxmGrid_zzsjmssbmxbjsxmGridlbVO_1_bqfse)>20000",
        message: "《增值税减免税申报明细表》第2栏次的第2列本期发生额只能填写小于等于20000的数据。",
        targetName: "zzsjmssbmxb_zzsjmssbmxbjsxmGrid_zzsjmssbmxbjsxmGridlbVO_1_bqfse",
        needHaveName: 'zzsjmssbmxb'
    }]
}

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        let currentOrg = this.metaAction.context.get('currentOrg'),
            appKey = currentOrg ? currentOrg.appKey : '',
            appId = currentOrg ? currentOrg.appId : ''

        this.component.props.initData = {
            SS: "52",
            declareTime: "2019-01-15",
            extraParams: "",
            gdslx: "1",
            hasReadSJInfo: true,
            period: 1,
            reportId: 5839712302402560,
            rptGetDataVisible: undefined,
            sbywbm: "XGMZZS",
            selfSystemDeclare: undefined,
            skssqq: "2018-10-01",
            skssqz: "2018-12-31",
            state: 0,
            sumInvoiceVisible: undefined,
            systemDate: "2019-02-25",
            taxProjectCode: "10101",
            taxProjectName: "增值税(适用于小规模纳税人)",
            year: 2019
        }
        injections.reduce('init', this.component.props.initData, appKey, appId)
        this.load(undefined, true)
        let addEventListener = this.component.props.addEventListener
        if (addEventListener) {
            addEventListener('onTabFocus', :: this.onTabFocus)
        }
    }

    onTabFocus = (nextInit) => {
        this.updateState(nextInit.toJS())
    }

    updateState = async (nextInit) => {
        let params = this.getParams()
        let initData = { ...nextInit.initData }
        initData.beginMonth = initData.period
        initData.endMonth = initData.period
        initData.yzpzzlDm = "BDA0610611"
        if (initData.reportId != params.reportId) {
            if (this.metaAction.gf('data.change')) {
                const ret = await this.metaAction.modal('confirm', {
                    content: '增值税申报尚未保存，还要离开吗？'
                })
                if (ret) {
                    this.editCloseTips(false)
                    this.metaAction.sf('data.change', false)
                    this.load(initData, true)
                } else {
                    return
                }
            } else {
                this.load(initData, true)
            }
        } else {
            let rpt = await this.webapi.vattaxpayer.findById(
                { id: initData.reportId }
            )
            if (this.metaAction.gf('data.hasReadSJInfo') != nextInit.initData.hasReadSJInfo) {
                this.messageInfo(initData)
            }
            if (rpt) {
                this.metaAction.sfs({
                    'data.isDeclare': !!rpt.state
                })
            }
        }
        this.metaAction.sfs({
            'data.showHelp': false,
            'data.params': fromJS(initData),
            'data.hasReadSJInfo': nextInit.initData.hasReadSJInfo
        })
    }

    refresh = () => {
        this.load()
    }

    getParams = () => {
        let params = this.metaAction.gf('data.params') ? this.metaAction.gf('data.params').toJS() : {}
        params = {
            year: params.year,
            beginMonth: params.beginMonth,
            endMonth: params.endMonth,
            taxProjectId: params.taxProjectId,
            period: params.period,
            skssqq: params.skssqq,
            skssqz: params.skssqz,
            reportId: params.reportId,
            yzpzzlDm: "BDA0610611"
        }
        return params
    }

    messageInfo = (data) => {
        if (!data.hasReadSJInfo) return
        //已申报且不是本系统申报
        if (data.state == 1 && !data.selfSystemDeclare) {
            this.metaAction.toast('info', '您在其他通道申报了报表，只能填写报表，不能申报！')
        }
        //已过申报期且未申报
        if (moment(data.declareTime) < moment(data.systemDate)) {
            this.metaAction.sf('data.overdue', true)
            if (data.state != 1) {
                this.metaAction.toast('info', '已过申报期，只能填写报表，不能申报！')
            }
        } else if (moment(data.declareTime) > moment(data.systemDate)) {
            this.metaAction.sf('data.overdue', false)
        }
    }

    load = async (data, message) => {
        LoadingMask.show()
        let params = data || this.getParams()
        let rpt = await this.webapi.vattaxpayer.smallVatInit(
            params
        )
        let res2 = await this.webapi.vattaxpayer.queryReport({ appraisalId: params.reportId })
        LoadingMask.hide()
        if (rpt && res2) {
            // if (rpt.openMessage) {//未填写信息，弹出提示
            //     const res = await this.metaAction.modal('warning', {
            //         content: '请先设置网报帐号，并确认您的纳税人信息！',
            //         wrapClassName: 'tranreport-generate-modal-bg',
            //         className: 'tranreport-generate-modal',
            //         okText: '设置'
            //     })
            //     if (res) {
            //         console.log('关闭页签')
            //     }
            //     return
            // }


            rpt.zzssyyxgmnsrySbSbbdxxVO = personaliseFormatData(this.component.props.initData.SS, rpt.zzssyyxgmnsrySbSbbdxxVO)
            //小规模将是否个体工商户放到qtxx里 公式中会用到
            if (rpt && rpt.zzssyyxgmnsrySbSbbdxxVO && rpt.zzssyyxgmnsrySbSbbdxxVO.qtxx) {
                rpt.zzssyyxgmnsrySbSbbdxxVO.qtxx.isSelfemployed = rpt.isSelfemployed
            }
            if (rpt.zzssyyxgmnsrySbSbbdxxVO.isInit) {//是否需要初始化
                const res = await this.metaAction.modal('confirm', {
                    content: '申报表未初始化，请点击【初始化】按钮初始化申报表。',
                    okText: '初始化'
                })
                if (res) {
                    this.initialization(params)
                } else {
                    rpt.zzssyyxgmnsrySbSbbdxxVO.isCanModify = true
                }
            }

            if (message) {
                this.messageInfo(data || this.component.props.initData)
            }

            // if(rpt.hasOwnProperty('messageInfo')) {
            //     this.metaAction.toast('warning', rpt.messageInfo)
            //     // return
            // }
            rpt.menuInfos = res2.reportList
            this.setData(rpt, params)
        }
    }

    //初始化接口
    initialization = async (params) => {
        let init = this.metaAction.gf('data.button.init')
        if (!init) return false
        this.metaAction.sf('data.button.init', false)
        LoadingMask.show()
        params = params || this.getParams()
        let rpt = await this.webapi.vattaxpayer.openingZZSInit(params)
        LoadingMask.hide()
        this.metaAction.sf('data.button.init', true)
        if (rpt) {
            // if(rpt.hasOwnProperty('messageInfo')) {
            //     this.metaAction.toast('warning', rpt.messageInfo)
            // }
            this.metaAction.toast('success', '初始化成功')
            rpt.zzssyyxgmnsrySbSbbdxxVO = personaliseFormatData(this.component.props.initData.SS, rpt.zzssyyxgmnsrySbSbbdxxVO)
            this.setData(rpt, params)
        }
    }

    setData = (rpt, paramsObj) => {
        if (rpt.zzssyyxgmnsrySbSbbdxxVO) {
            rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqq = paramsObj.skssqq
            rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqz = paramsObj.skssqz
        }
        rpt.mapRelation.zzsxgmfjssb = {
            sybh: 1,
            zsxmDmMc: 2,
            zspmDmMc: 3,
            jsyj: 4,
            sl1: 5,
            ynse: 6,
            ssjmxzDmMc: 7,
            jmse: 8,
            ybtse: 9
        }
        // rpt.zzssyyxgmnsrySbSbbdxxVO = personaliseCalc( 
        // this.component.props.initData.SS , 
        // {
        //     gdslx: this.component.props.initData.gdslx,
        //     during: rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqz.split('-')[1] - rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqq.split('-')[1] + 1
        // },
        //     rpt.zzssyyxgmnsrySbSbbdxxVO )      

        rpt.checkList = this.checkListReplaceNum(rpt.checkList, rpt.qtxx)
        let activeMenuKey = rpt.tName,
            other = this.metaAction.gf('data.other').toJS(),
            treeLeft = other.treeList,
            showTabReportCodes = [],
            zzssyyxgmnsrySbSbbdxxVO = rpt.zzssyyxgmnsrySbSbbdxxVO,
            checkRes = zzssyyxgmnsrySbSbbdxxVO ? this.checkData(zzssyyxgmnsrySbSbbdxxVO, rpt.checkList) : undefined,
            checkData = [],
            failCount = 0

        //通过清册判断显示哪些表
        if (rpt.menuInfos) {

            rpt.menuInfos.map(item => {
                if (item.selected === true) { // || ( item.$ && item.$.selected.$ === true )
                    showTabReportCodes.push(item.projectReportCode)
                }
            })
            other.treeLeft = treeLeft.map(item => {
                if (showTabReportCodes.indexOf(item.projectReportCode) < 0) {
                    item.isShow = false
                } else {
                    item.isShow = true
                }
                if (rpt.tName == item.key) {
                    other.FillStatement = item.statement
                }
                return item
            })
        }

        other.treeLeft = personaliseShowTable(this.component.props.initData.SS, this.component.props.initData.gdslx, other.treeLeft)

        if (rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.slxxForm.sfzxsb == "N" && !rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.slxxForm.blrysfzjlxDm) {
            failCount += 1
        }
        if (rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.slxxForm.sfzxsb == "N" && !rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.slxxForm.blrysfzjhm) {
            failCount += 1
        }
        if (rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.slxxForm.sfzxsb == "N" && !rpt.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.slxxForm.slrxm) {
            failCount += 1
        }

        //江苏省申报包括申报中状态 state == 9
        if (this.component.props.initData.SS == '32') {
            rpt.isDeclare = this.component.props.initData.state != 0
        }

        let isCanModify
        if (this.component.props.initData.selfSystemDeclare === undefined) {
            isCanModify = rpt.zzssyyxgmnsrySbSbbdxxVO.isCanModify
        } else {
            isCanModify = rpt.zzssyyxgmnsrySbSbbdxxVO.isCanModify ?
                rpt.zzssyyxgmnsrySbSbbdxxVO.isCanModify :
                !this.component.props.initData.selfSystemDeclare
        }

        let newData = {
            'data.other': fromJS(other),
            'data.tableData': fromJS(rpt),
            'data.isDeclare': rpt.isDeclare,
            'data.state': rpt.state,
            'data.currentDate': rpt.currentDate,
            'data.isCanModify': isCanModify,
            'data.isInit': (rpt.zzssyyxgmnsrySbSbbdxxVO && rpt.zzssyyxgmnsrySbSbbdxxVO.isInit)

        }
        if (checkRes) {
            newData['data.tableFailCounts'] = fromJS(checkRes.tableFailCounts)
        }
        if (rpt.zzssyyxgmnsrySbSbbdxxVO.extendCheckInfo) {
            let selfFailCounts = JSON.parse(rpt.zzssyyxgmnsrySbSbbdxxVO.extendCheckInfo)
            selfFailCounts['zzssyyxgmnsr'] = failCount
            newData['data.selfFailCounts'] = fromJS(selfFailCounts)
        }

        this.metaAction.sfs(newData)
    }

    checkListReplaceNum = (checkList, qtxx) => {
        checkList = checkList.map(item => {
            if (item.message.indexOf('qtxx') >= 0) {
                item.message = this.transCheckListNum(item.message, qtxx)
            }
            return item
        })
        return checkList
    }

    transCheckListNum = (message, qtxx, changeData) => { //        
        if (message.indexOf('qtxx') >= 0 && qtxx === undefined) return false
        let paths = message.match(PATHRGX)

        paths.map(item => {
            if (isNaN(item - 0)) {
                try {
                    let pathStr = this.transPath(item),
                        value
                    if (pathStr.indexOf('qtxx') < 0) {
                        // value = eval('changeData.' + pathStr)
                        // if( pathStr.indexOf('.hmc')>=0 ) {
                        //     value = "'"+value+"'"
                        // } else {
                        //     value = value ? value : 0
                        //     value = value == '- -' ? 0 : value
                        // }
                    } else {
                        value = eval(pathStr)
                        if (!(value === 'false' || value === 'true' || !isNaN(parseInt(value)))) {
                            value = "'" + value + "'"
                        }
                    }
                    message = message.replace(item, value).replace('(', '').replace(')', '')
                } catch (err) {
                    console.log(err)
                }
            }
        })

        return message
    }

    tabChange = (key) => {
        let treeList = this.metaAction.gf('data.other.treeList').toJS()
        const obj = treeList.find(o => {
            if (o.key == key) {
                return o
            }
        })
        this.metaAction.sfs({
            'data.other.activeTabKey': key,
            'data.other.FillStatement': fromJS(obj.statement)
        })
    }

    menuSelect = (obj) => {
        this.injections.reduce('updateReduce', 'data.other.activeMenuKey', obj.key)
    }

    renderDeclarationList = () => {
        const treeList = this.metaAction.gf('data.other.treeList') ? this.metaAction.gf('data.other.treeList').toJS() : []
        return treeList.map((item) => {
            if (!item.isShow) return null
            return <Menu.Item key={item.key}>{item.name}</Menu.Item>
        })
    }

    renderStatement = () => {
        let FillStatement = this.metaAction.gf('data.other.FillStatement').toJS()

        if (FillStatement) {
            return FillStatement.map((item) => {
                const header = <div>
                    <span>{item.name}</span>
                    <div className='dashed'></div>
                    <Icon type="xia" className='ttk-tax-app-vatTaxpayer-wraper-treeLeft-downIcon' fontFamily='edficon'></Icon>
                </div>
                return <Panel key={item.key} header={header} showArrow={false}>
                    <div>
                        {
                            this.getItems(item.contnet)
                        }
                    </div>
                </Panel>
            })
        }
    }

    getItems(items) {
        return (<div>
            {
                items.map(item => {
                    return <p dangerouslySetInnerHTML={{ __html: item }}></p>
                })
            }
        </div>)
    }

    closeHelp = (e) => {
        const panel = $(e.target).parents('.Panel')
        this.helpWidth = panel[0].clientWidth
        this.metaAction.sf('data.showHelp', false)
        const resize = $(panel).siblings("span")
        panel.css('width', '0')
        resize.css('width', '0')
    }

    showHelp = (e) => {
        this.metaAction.sf('data.showHelp', true)
        const Pane1 = $(e.target).siblings("div").children(".Pane1")
        const resize = $(e.target).siblings("div").children(".Resizer")
        let width = this.helpWidth || 176
        Pane1.css('width', `${width}px`)
        resize.css('width', '7px')
    }

    download = async (e) => {
        if (!this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO')) return //如果 zzssyyxgmnsrySbSbbdxxVO 没值不能保存
        let data = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO') ? this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO').toJS() : {}
        // data.zzsjmssbmxb = this.formatData('zzsjmssbmxb', data)
        // if(data.zzsxgmkcxmqd) {
        //     data.zzsxgmkcxmqd = this.formatData('zzsxgmkcxmqd', data)
        // }
        // this.metaAction.sf('data.tableData.zzssyyxgmnsrySbSbbdxxVO', fromJS(data))
        let params = this.getParams()
        let extendCheckInfo = JSON.stringify(this.metaAction.gf('data.selfFailCounts'))

        if (e.key == 'XML') {
            params.sqqs = params.skssqq
            params.sqqz = params.skssqz
            await this.webapi.vattaxpayer.downXMl(params)
        } else if (e.key == 'PDF') {
            this.handleNext()

        } else if (e.key == 'PDFDOWNLOAD') {
            let pdfParams = this.metaAction.gf('data.params') ? this.metaAction.gf('data.params').toJS() : {}
            pdfParams = {
                sbywbm: pdfParams.sbywbm,
                reportId: pdfParams.reportId,
                taxProjectName: pdfParams.taxProjectName,
                taxProjectCode: pdfParams.taxProjectCode,
                year: params.year,
                startMonth: params.period,
                endMonth: params.period,
                fromDate: pdfParams.skssqq,
                toDate: pdfParams.skssqz,
                yzpzzlDm: "BDA0610611"
            }
            await this.webapi.vattaxpayer.generateImportPDF(pdfParams)
        }
    }

    renderTabs = () => {
        const treeList = this.metaAction.gf('data.other.treeList') ? this.metaAction.gf('data.other.treeList').toJS() : [],
            tableFailCounts = this.metaAction.gf('data.tableFailCounts') ? this.metaAction.gf('data.tableFailCounts').toJS() : {},
            selfFailCounts = this.metaAction.gf('data.selfFailCounts') ? this.metaAction.gf('data.selfFailCounts').toJS() : {},
            menuInfos = this.metaAction.gf('data.tableData.menuInfos') ? this.metaAction.gf('data.tableData.menuInfos').toJS() : [],
            treeElems = []

        treeList.map((item) => {
            let num,
                failCount = (tableFailCounts && tableFailCounts[item.key]) ? tableFailCounts[item.key].num : 0,
                selfFailCount = selfFailCounts[item.key] ? selfFailCounts[item.key] : 0
            num = failCount + selfFailCount
            if (!item.isShow) return false
            treeElems.push(<Tabs.TabPane key={item.key} tab={
                (<div><div className={num ? 'ttk-tax-app-vatTaxpayer-wraper-treeLeft-menuName1' : 'ttk-tax-app-vatTaxpayer-wraper-treeLeft-menuName'}>
                    {item.name}
                </div>
                    {
                        (num ?
                            <div className='ttk-tax-app-vatTaxpayer-wraper-treeLeft-errorNum'>
                                <Icon type='liangweishu' fontFamily='edficon' /><span>{num}</span>
                            </div> : null)
                    }</div>)
            }>

            </Tabs.TabPane>)
        })
        return treeElems
    }


    returnDefaultData = () => {
        return {
            SS: "52",
            declareTime: "2019-01-15",
            extraParams: "",
            gdslx: "1",
            hasReadSJInfo: true,
            period: 1,
            reportId: 5839712302402560,
            rptGetDataVisible: undefined,
            sbywbm: "XGMZZS",
            selfSystemDeclare: undefined,
            skssqq: "2018-10-01",
            skssqz: "2018-12-31",
            state: 0,
            sumInvoiceVisible: undefined,
            systemDate: "2019-02-25",
            taxProjectCode: "10101",
            taxProjectName: "增值税(适用于小规模纳税人)",
            year: 2019
        }
    }

    renderTable = () => {
        let data = this.metaAction.gf('data.tableData') ? this.metaAction.gf('data.tableData').toJS() : {},
            activeTabKey = this.metaAction.gf('data.other.activeTabKey'),
            zzssyyxgmnsrySbSbbdxxVO = data.zzssyyxgmnsrySbSbbdxxVO,
            tableFailCounts = this.metaAction.gf('data.tableFailCounts') ? this.metaAction.gf('data.tableFailCounts').toJS() : undefined,
            checkData = [],
            isDeclare = this.metaAction.gf('data.isDeclare'),
            isCanModify = this.metaAction.gf('data.isCanModify')
        if (tableFailCounts && tableFailCounts[activeTabKey]) {
            checkData = tableFailCounts[activeTabKey].target
        }


        this.component.props.initData = this.returnDefaultData()
        let initData = {
            SS: this.component.props.initData.SS,
            jmsMap: data.jmsMap,
            isDeclare: !!(isDeclare),
            isSelfemployed: data.isSelfemployed,
            isCanModify: isCanModify,
            qtxx: (data.zzssyyxgmnsrySbSbbdxxVO && data.zzssyyxgmnsrySbSbbdxxVO.qtxx) ? data.zzssyyxgmnsrySbSbbdxxVO.qtxx : undefined,
            checkData: checkData,
            mapRelation: data.mapRelation ? data.mapRelation : {},
            sbbhead: data.zzssyyxgmnsrySbSbbdxxVO ? data.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead : {},
            [activeTabKey]: data.zzssyyxgmnsrySbSbbdxxVO ? data.zzssyyxgmnsrySbSbbdxxVO[activeTabKey] : {
                sbbhead: {
                    skssqq: '',
                    skssqz: '',
                    nsrmc: ''
                },
                slxxForm: {}
            }
        }

        if (activeTabKey == 'zzssyyxgmnsr') {
            initData.zzsxgmflzl = data.zzssyyxgmnsrySbSbbdxxVO ? data.zzssyyxgmnsrySbSbbdxxVO.zzsxgmflzl : {}
        }

        let tableName = personaliseRenderTableName(this.component.props.initData.SS, activeTabKey)

        // return <AppLoader name={`ttk-tax-app-${activeTabKey}`}
        return <AppLoader name={tableName}
            initData={initData}
            setPortalContent={this.component.props.setPortalContent}
            setVOData={
                this.setVOData
            }
        />
    }

    editCloseTips = (istip) => {
        if (this.component.props.editing) {
            //设置凭证当前单据状态，供单据页签关闭用 false：关闭不提醒 true 关闭提醒
            this.component.props.editing(this.component.props.appName, istip)
        }
    }

    save = async () => {
        if (!this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO')) return //如果 zzssyyxgmnsrySbSbbdxxVO 没值不能保存
        let save = this.metaAction.gf('data.button.save')
        if (!save) return false
        this.metaAction.sf('data.button.save', false)
        let data = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO') ? this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO').toJS() : {},
            currentDate = this.metaAction.gf('data.currentDate')
        data.zzsjmssbmxb = this.formatData('zzsjmssbmxb', data)
        if (data.zzsxgmkcxmqd) {
            data.zzsxgmkcxmqd = this.formatData('zzsxgmkcxmqd', data)
        }
        let params = this.getParams()
        let extendCheckInfo = JSON.stringify(this.metaAction.gf('data.selfFailCounts'))
        if (currentDate && data && data.zzssyyxgmnsr && data.zzssyyxgmnsr.sbbhead && data.zzssyyxgmnsr.sbbhead.sbrq1) {
            data.zzssyyxgmnsr.sbbhead.sbrq1 = currentDate
        }
        let response = await this.webapi.vattaxpayer.save({
            data: {
                ...data, extendCheckInfo
            }, taxParam: params
        })
        this.metaAction.sf('data.button.save', true)
        if (response && response.checkFormular) {
            this.editCloseTips(false)
            this.metaAction.toast('success', '保存成功')
            data = personaliseFormatData(this.component.props.initData.SS, data)
            this.metaAction.sfs({
                'data.change': false,
                'data.state': 0,
                'data.tableData.zzssyyxgmnsrySbSbbdxxVO': fromJS(data)
            })
        }
    }

    //增减行数据保存申报格式化，去掉空行
    formatData = (tableName, data) => {
        if (!data[tableName]) return
        let list = data[tableName]
        if (tableName == 'zzsjmssbmxb') {
            let zzsjmssbmxbjsxmGridlbVO = list.zzsjmssbmxbjsxmGrid.zzsjmssbmxbjsxmGridlbVO
            let zzsjmssbmxbmsxmGridlbVO = list.zzsjmssbmxbmsxmGrid.zzsjmssbmxbmsxmGridlbVO
            // zzsjmssbmxbjsxmGridlbVO = zzsjmssbmxbjsxmGridlbVO.filter(item => item.ewbhxh)
            zzsjmssbmxbjsxmGridlbVO = personalDelEmptyRow(this.component.props.initData.SS, zzsjmssbmxbjsxmGridlbVO, 'zzsjmssbmxbjsxmGridlbVO')
            zzsjmssbmxbmsxmGridlbVO = zzsjmssbmxbmsxmGridlbVO.filter(item => item.ewbhxh)
            return {
                zzsjmssbmxbjsxmGrid: { zzsjmssbmxbjsxmGridlbVO },
                zzsjmssbmxbmsxmGrid: { zzsjmssbmxbmsxmGridlbVO }
            }
        } else {
            let kcxmqdmx = list.kcxmqdmx
            list.kcxmqdmx = kcxmqdmx.filter(item => {
                let value = Object.values(item)
                if (value.filter(o => o != '' && o != 0).length != 0) {
                    return item
                }
            })
            return list
        }

    }

    getErrorText(response, data, params) {
        let txt, titleTxt
        if (this.component.props.initData.SS != '32') {
            txt = `您的税款所属期为${params.skssqq}至${params.skssqz}的[增值税纳税申报表（使用增值税小规模纳税人）]（应征凭证序号为:${response.pzxh}）已申报成功。${parseFloat(response.ybtse) ? ('税款金额' + (number.format(new Number(response.ybtse).toString() - 0, 2)) + '元，请尽快缴款，以免产生滞纳金。') : '税款金额:0.00元，无需进行交款。'}`
            titleTxt = `尊敬的${data.zzssyyxgmnsr.sbbhead.nsrmc}(${data.zzssyyxgmnsr.sbbhead.nsrsbh}):`

        } else {
            txt = `您的税款所属期为${params.skssqq}至${params.skssqz}的[增值税纳税申报表（使用增值税小规模纳税人）]已提交待审核。`
            titleTxt = '尊敬的纳税人：'
        }
        return (<div className='ttk-tax-app-vattaxpayer-prompt'>
            <div className='ttk-tax-app-vattaxpayer-prompt-title'><i class="anticon anticon-check-circle"></i><span>{this.component.props.initData.SS != '32' ? '申报' : '提交'}成功！</span></div>
            <p>{titleTxt}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{txt}</p>
        </div>)
    }

    handleNext = async () => {
        if (!this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO')) return //如果 zzssyyxgmnsrySbSbbdxxVO 没值不能保存
        let data = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO') ? this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO').toJS() : {}
        // data.zzsjmssbmxb = this.formatData('zzsjmssbmxb', data)
        // if(data.zzsxgmkcxmqd) {
        //     data.zzsxgmkcxmqd = this.formatData('zzsxgmkcxmqd', data)
        // }
        // this.metaAction.sf('data.tableData.zzssyyxgmnsrySbSbbdxxVO', fromJS(data))
        let extendCheckInfo = JSON.stringify(this.metaAction.gf('data.selfFailCounts'))
        LoadingMask.show()
        let iframeEle = this.renderIframe()
        let that = this,
            params = this.metaAction.gf('data.params') ? this.metaAction.gf('data.params').toJS() : {}
        if (!this.isPDFPluginInstall) {
            LoadingMask.hidden()
            this.metaAction.toast('warning', '浏览器中未检测到PDF官方阅读器(Adobe Reader 10.0以上版本)的插件,点击确认将跳至PDF官方阅读器下载页面,安装完成后需要重新启动浏览器。')
            setTimeout(function () {
                window.open("http://get.adobe.com/cn/reader/download/?installer=Reader_11.0_Chinese_Simplified_for__Windows")
            }, 2000)
            return
        }
        params = {
            sbywbm: params.sbywbm,
            reportId: params.reportId + '',
            taxProjectName: params.taxProjectName,
            taxProjectCode: params.taxProjectCode,
            year: params.year,
            startMonth: params.period,
            endMonth: params.period,
            fromDate: params.skssqq,
            toDate: params.skssqz,
            yzpzzlDm: "BDA0610611"
        }
        setTimeout(function () {
            that.webapi.vattaxpayer.generatePDF(params, 'pdfIframe', LoadingMask.hide)
        }, 0)

        const res = await this.metaAction.modal('show', {
            title: 'pdf预览',
            children: (<div>
                {iframeEle}
            </div>),
            footer: null,
            className: 'tax-pdf',
            width: document.body.clientWidth - 7,
            height: document.body.clientHeight,
            closeBack: (back) => { this.closeTip = back }
        })
        if (res) {
            console.log('res')
        }
    }

    renderIframe = () => {
        return <div id='pdfDom'>
            <iframe name="pdfIframe" width={document.body.clientWidth - 31} height={document.body.clientHeight - 127} id="pdfIframe" className='pdfIframe'></iframe>
            <div className='footer'>
                <Button onClick={() => this.closePdf()}>关闭</Button>
                <Button onClick={() => this.closePdf()} type='primary'>确定</Button>
            </div>
        </div>
    }

    closePdf = () => {
        let parent = document.querySelector("#pdfDom")
        let child = document.querySelector('#pdfDom iframe')
        parent.removeChild(child);
        this.closeTip()
    }

    //申报
    submit = async (nextSubmitParams = {}) => {
        let currentOrg = this.metaAction.context.get('currentOrg'),
            appKey = currentOrg ? currentOrg.appKey : '',
            appId = currentOrg ? currentOrg.appId : ''
        let declare = this.metaAction.gf('data.button.declare')
        if (!declare) return false
        // 测试(test)、预生产erpdemou环境禁止申报和作废
        if (
            (
                (!this.metaAction.context || !this.metaAction.context.get('currentUser') || this.metaAction.context.get('currentUser').id != '5476984054474752')
                && appId != '105'
                && (location.href.toLowerCase().indexOf('test.') > -1 || location.href.toLowerCase().indexOf('erpdemo.') > -1)
            )
        ) {
            this.metaAction.toast('error', '测试和预生产环境连接开放平台生产环境，请不要使用申报和作废操作！')
            return
        }
        if (!this.metaAction.gf('data.tableData')) return
        let data = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO').toJS()
        let params = this.getParams(),
            tableFailCounts = this.metaAction.gf('data.tableFailCounts') ? this.metaAction.gf('data.tableFailCounts').toJS() : {},
            selfFailCounts = this.metaAction.gf('data.selfFailCounts') ? this.metaAction.gf('data.selfFailCounts').toJS() : {},
            isPass = true

        for (let key in tableFailCounts) {
            if ((tableFailCounts[key] && tableFailCounts[key].num)) {
                isPass = false
            }
        }
        for (let key in selfFailCounts) {
            if (selfFailCounts[key]) {
                isPass = false
            }
        }
        if (!isPass) {
            return this.metaAction.toast('warning', '小规模增值税申报表校验有问题，请修正后再申报！')
        }
        let { sfyczb, qzSB } = nextSubmitParams
        data.zzsjmssbmxb = this.formatData('zzsjmssbmxb', data)
        if (data.zzsxgmkcxmqd) {
            data.zzsxgmkcxmqd = this.formatData('zzsxgmkcxmqd', data)
        }
        this.metaAction.sf('data.button.declare', false)
        LoadingMask.show({ content: '已提交申报数据，等待返回结果。请稍后点击‘刷新’，可在回执中查看申报结果！' })
        let response = await this.webapi.vattaxpayer.submit({
            data, taxParam: params, sfyczb, qzSB
        })
        LoadingMask.hide()

        this.metaAction.sf('data.button.declare', true)

        if (response) {
            if (!response.success) {//失败，两种情况，校验信息不通过，第二种直接失败
                if (response.formularList) {// 校验未通过
                    this.openWarning(data, params, response)
                } else {//校验通过了失败
                    if (response.taxCompareResult &&
                        response.taxCompareResult.SBZzsSaveReturnVO &&
                        response.taxCompareResult.SBZzsSaveReturnVO.sBSbbdBdjgVO &&
                        response.taxCompareResult.SBZzsSaveReturnVO.sBSbbdBdjgVO.sfcbs != 'Y') {
                        let res11 = await this.metaAction.modal('show', {
                            title: '提示',
                            children: (<div className='ttk-tax-app-vattaxpayer-prompt'>
                                <p>尊敬的{data.zzssyyxgmnsr.sbbhead.nsrmc}({data.zzssyyxgmnsr.sbbhead.nsrsbh}):</p>
                                <p>您尚未抄报税，不能进行申报！</p>
                            </div>),
                            wrapClassName: 'tax-hz-wrap  hide-jkbtn',
                            cancelText: '终止',
                            className: 'tax-hz',
                            width: 450,
                        })
                        return
                    } else if (response.taxCompareResult &&
                        response.taxCompareResult.SBZzsSaveReturnVO &&
                        response.taxCompareResult.SBZzsSaveReturnVO.bdjgbz == 'N') {
                        response.taxCompareResult.textInfo = params
                        response.taxCompareResult.textInfo.nsrmc = data.zzssyyxgmnsr.sbbhead.nsrmc
                        response.taxCompareResult.textInfo.nsrsbh = data.zzssyyxgmnsr.sbbhead.nsrsbh
                        response.taxCompareResult.textInfo.tableName = '增值税纳税申报表（使用增值税小规模纳税人）'
                        response.taxCompareResult.textInfo.SS = this.metaAction.gf('data.params.SS')
                        let res22 = await this.metaAction.modal('show', {
                            title: '提示',
                            children: this.metaAction.loadApp('ttk-tax-app-comparison', {
                                store: this.component.props.store,
                                initData: {
                                    data: response.taxCompareResult,
                                    cb: this.submit,
                                    setPortalContent: this.component.props.setPortalContent,
                                }
                            }),
                            wrapClassName: 'tax-hz-wrap  hide-cancelbtn yjbd-box',
                            okText: '修改数据',
                            className: 'tax-hz',
                            width: 830,
                            height: 466
                        })
                    }
                }
            } else {//申报成功                
                this.editCloseTips(false)
                this.metaAction.sfs({
                    'data.isDeclare': (response.state != 0),
                    'data.state': 1,
                    'data.change': false,
                    // 'data.tableData.zzssyyxgmnsrySbSbbdxxVO': fromJS(data) 
                })
                // if( response.sflsb && this.component.props.initData.SS == '11' ) {//如果是0申报
                //     let zeroRes = await this.metaAction.modal('confirm', {
                //         content: '您当期的增值税、消费税为0，请确定您的附加税费应纳税额是否也为0，点击‘是’，您的附加税费‘免于零申报’；点击‘否’，对报表进行修改。',
                //         okText: '是',
                //         cancelText: '否',
                //     })
                //     if(zeroRes) {
                //         let zeroSubmitRes = await this.webapi.vattaxpayer.fjsAutoLsb( params )
                //         if(zeroSubmitRes) {
                //             this.metaAction.toast('success', '附加税申报成功')            
                //         }
                //         return
                //     }else {
                //         return
                //     }
                // } else {
                //     this.openSuccess(data, params, response)
                // }
                this.openSuccess(data, params, response)

            }
        }
    }

    openWarning = async (data, params, response) => {
        const res = await this.metaAction.modal('show', {
            title: '提示',
            children: (<div className='ttk-tax-app-vattaxpayer-prompt'>
                <div className='ttk-tax-app-vattaxpayer-prompt-title'><i class="anticon anticon-exclamation-circle"></i><span>申报失败！</span></div>
                <p>尊敬的{data.zzssyyxgmnsr.sbbhead.nsrmc}({data.zzssyyxgmnsr.sbbhead.nsrsbh}):</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您的税款所属期为{params.skssqq}至{params.skssqz}的[增值税纳税申报表（使用增值税小规模纳税人）]已申报失败，失败原因：</p>
                {response.formularList.map(item => <p>{item.message}</p>)}
            </div>),
            wrapClassName: 'tax-hz-wrap  hide-jkbtn',
            cancelText: '关闭',
            className: 'tax-hz',
            width: 450,
        })
        if (res) {
            console.log('关闭页签')
        }
        return
    }

    openSuccess = async (data, params, response) => {
        const res = await this.metaAction.modal('show', {
            title: '提示',
            children: this.getErrorText(response, data, params),
            width: 450,
            wrapClassName: (response.ybtse - 0 && this.component.props.initData.SS != '32') ? 'tax-hz-wrap' : 'tax-hz-wrap hide-jkbtn',
            className: 'tax-hz',
            okText: '缴款',
            cancelText: '关闭'
        })
        if (res) {
            const ret = await this.metaAction.modal('show', {
                title: '税款缴纳',
                okText: '立即缴款',
                width: 1200,
                footer: '',
                closeModal: this.close,
                closeBack: (back) => { this.closeTip = back },
                style: { top: 40 },
                bodyStyle: { padding: '24px 12px', height: 490 },
                wrapClassName: 'batchchargeback-model',
                children: this.metaAction.loadApp('ttk-taxapply-app-batchchargeback', {
                    store: this.component.props.store
                }),
            })
        } else {
            if (response.sflsb && this.component.props.initData.SS == '11') {//如果是0申报
                let zeroRes = await this.metaAction.modal('confirm', {
                    content: '您当期的增值税、消费税为0，请确定您的附加税费应纳税额是否也为0，点击‘是’，您的附加税费‘免于零申报’；点击‘否’，对报表进行修改。',
                    okText: '是',
                    cancelText: '否',
                })
                if (zeroRes) {
                    let zeroSubmitRes = await this.webapi.vattaxpayer.fjsAutoLsb(params)
                    if (zeroSubmitRes) {
                        this.metaAction.toast('success', '附加税申报成功')
                    }
                    return
                } else {
                    return
                }
            }
        }
        return
    }

    close = (ret) => {
        this.closeTip()
        this.metaAction.sf('data.state', ret.state)
    }

    //新的start
    setVOData = (changeData, type) => {
        let data = this.metaAction.gf('data.tableData') ? this.metaAction.gf('data.tableData').toJS() : {},
            activeTabKey = this.metaAction.gf('data.other.activeTabKey'),
            zzssyyxgmnsrySbSbbdxxVO = data.zzssyyxgmnsrySbSbbdxxVO ? data.zzssyyxgmnsrySbSbbdxxVO : {},
            oldVO = Object.assign({}, zzssyyxgmnsrySbSbbdxxVO),
            tableFailCounts = this.metaAction.gf('data.tableFailCounts') ? this.metaAction.gf('data.tableFailCounts').toJS() : {},
            selfFailCounts = this.metaAction.gf('data.selfFailCounts') ? this.metaAction.gf('data.selfFailCounts').toJS() : {},
            tFormulaList = data.tFormulaList,
            changeTable = changeData.changeTable,
            changeItems = changeData.changeItems,
            failCount = changeData.failCount,
            willCalcFormula = [],
            res = zzssyyxgmnsrySbSbbdxxVO,
            checkRes
        oldVO = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO').toJS()
        if (changeItems.length != 0) {
            this.metaAction.sf('data.change', true)
            this.editCloseTips(true)
        }
        zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr = changeData.changeTable
        let res2 = formulaCalc.setDataByFormula({
            type: 0,
            data: zzssyyxgmnsrySbSbbdxxVO,
            changeData: {
                changeItems: changeData.changeItems,
                changeTable: changeData.changeTable,//修改的表的数据
                changeTableName: 'zzssyyybnsrzb'//修改的表名
            },
            formulas: data.tFormulaList,
            checks: this.metaAction.gf('data.tableData.checkList') ? this.metaAction.gf('data.tableData.checkList').toJS() : [],
            notFormulasCheckFailCounts: {
            }, //非公式校验的错误数和错误的具体数据 必填项
            formulasCheckFailCounts: {
            }
        })
        this.metaAction.sfs({
            'data.tableData.zzssyyxgmnsrySbSbbdxxVO': fromJS(res2.data),
            'data.tableFailCounts': fromJS(res2 ? res2.formulasCheckFailCounts : {}),
            'data.selfFailCounts': fromJS(res2.notFormulasCheckFailCounts)
        })

        if (!res2.formulasCheckFailCounts) {
            return {
                changeData: res2.data[activeTabKey],
                checkData: []
            }
        } else {
            return {
                changeData: res2.data[activeTabKey],
                checkData: res2.formulasCheckFailCounts[activeTabKey] ? res2.formulasCheckFailCounts[activeTabKey].target : []
            }
        }


        // if (type) {//如果type为 true 是修改了不需要计算和校验，只需要更新的项。例如修改了文字，下拉项等
        //     if (failCount) {
        //         selfFailCounts[activeTabKey] = failCount
        //     } else {
        //         selfFailCounts[activeTabKey] = 0
        //     }
        //     zzssyyxgmnsrySbSbbdxxVO[activeTabKey] = changeTable
        //     // if (tableFailCounts[activeTabKey]) {
        //     //     tableFailCounts[activeTabKey].num = failCount ? failCount : 0
        //     // } else {
        //     //     tableFailCounts[activeTabKey] = {
        //     //         num: (failCount ? failCount : 0)
        //     //     }
        //     // }
        //     this.metaAction.sfs({
        //         'data.tableData.zzssyyxgmnsrySbSbbdxxVO': fromJS(zzssyyxgmnsrySbSbbdxxVO),
        //         'data.tableFailCounts': fromJS(tableFailCounts),
        //         'data.selfFailCounts': fromJS(selfFailCounts)
        //     })
        //     return
        // }
        // zzssyyxgmnsrySbSbbdxxVO[activeTabKey] = changeTable //把子组件传来的新值放进父组件的整体数据中
        // if (changeItems && changeItems.length == 1) {
        //     if( changeItems[0].path.indexOf('zzssyyxgmnsr_zzsxgmGrid_zzsxgmGridlb_2')>=0 || changeItems[0].path.indexOf('zzssyyxgmnsr_zzsxgmGrid_zzsxgmGridlb_3')>=0 ) {
        //         willCalcFormula = []
        //     } else {
        //         willCalcFormula = this.getAboutFormulas(changeItems[0].path, tFormulaList, willCalcFormula)
        //     }
        //     //如果有涉及的公式
        //     if (willCalcFormula && willCalcFormula.length) {
        //         let selfCals = this.isSelfCals(willCalcFormula[0].formula, changeItems[0])
        //         res = this.calculationData(changeItems[0].newValue, changeItems[0].oldValue, changeItems[0].path, zzssyyxgmnsrySbSbbdxxVO, oldVO, willCalcFormula[0], tFormulaList, willCalcFormula, selfCals)
        //         zzssyyxgmnsrySbSbbdxxVO = res
        //     }
        //     zzssyyxgmnsrySbSbbdxxVO = personaliseCalc( 
        //         this.component.props.initData.SS , 
        //         {
        //             gdslx: this.component.props.initData.gdslx,
        //             during: data.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqz.split('-')[1] - data.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqq.split('-')[1] + 1
        //         },
        //          zzssyyxgmnsrySbSbbdxxVO )
        //     checkRes = this.checkData(zzssyyxgmnsrySbSbbdxxVO)
        // } else if (changeItems && changeItems.length > 1) {
        //     changeItems.map(item => {
        //         willCalcFormula = this.getAboutFormulas(changeItems[0].path, tFormulaList, willCalcFormula)
        //         //如果有涉及的公式
        //         if (willCalcFormula && willCalcFormula.length) {
        //             let selfCals = this.isSelfCals(willCalcFormula[0].formula, item)
        //             res = this.calculationData(item.newValue, item.oldValue, item.path, zzssyyxgmnsrySbSbbdxxVO, oldVO, willCalcFormula[0], tFormulaList, willCalcFormula, selfCals)
        //             zzssyyxgmnsrySbSbbdxxVO = res
        //         }
        //     })
        //     zzssyyxgmnsrySbSbbdxxVO = personaliseCalc( 
        //         this.component.props.initData.SS , 
        //         {
        //             gdslx: this.component.props.initData.gdslx,
        //             during: data.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqz.split('-')[1] - data.zzssyyxgmnsrySbSbbdxxVO.zzssyyxgmnsr.sbbhead.skssqq.split('-')[1] + 1
        //         },
        //          zzssyyxgmnsrySbSbbdxxVO )            
        //     checkRes = this.checkData(zzssyyxgmnsrySbSbbdxxVO)
        // } else {
        //     res = zzssyyxgmnsrySbSbbdxxVO
        //     checkRes = this.checkData(zzssyyxgmnsrySbSbbdxxVO)
        // }
        // if (failCount) {
        //     selfFailCounts[activeTabKey] = failCount
        // } else {
        //     selfFailCounts[activeTabKey] = 0
        // }
        // this.metaAction.sfs({
        //     'data.tableData.zzssyyxgmnsrySbSbbdxxVO': fromJS(zzssyyxgmnsrySbSbbdxxVO),
        //     'data.tableFailCounts': fromJS(checkRes ? checkRes.tableFailCounts : {}),
        //     'data.selfFailCounts': fromJS(selfFailCounts)
        // })
        // if (!checkRes) {
        //     return {
        //         changeData: res[activeTabKey],
        //         checkData: []
        //     }
        // } else {
        //     return {
        //         changeData: res[activeTabKey],
        //         checkData: checkRes.tableFailCounts[activeTabKey] ? checkRes.tableFailCounts[activeTabKey].target : []
        //     }
        // }
    }

    //取出相关公式 getAboutFormulas
    getAboutFormulas = (path, tFormulaList, willCalcFormula) => {
        if (!willCalcFormula || !willCalcFormula.length) {
            willCalcFormula = []
        }
        let formulaStrArr = willCalcFormula.map(item => item.formula)
        tFormulaList.map(item => {
            if (item.split('=').length > 1 && item.split('=')[1].match(PATHRGX).indexOf(path) != -1) {
                if (formulaStrArr.indexOf(item) < 0) {
                    // console.log( item)
                    formulaStrArr.push(item)
                    willCalcFormula.push({
                        formula: item,
                        path
                    })
                }
            }
        })
        return willCalcFormula
    }

    //本年累计类型的特殊计算 减去原来的值加上新值
    isSelfCals(formula, changeItem) {
        if (!changeItem) return
        let newValue = changeItem.newValue,
            oldValue = changeItem.oldValue,
            path = changeItem.path
        if (oldValue === undefined) {
            oldValue = '0.00'
        }
        if (formula.split('=')[1].indexOf(formula.split('=')[0]) > -1) {
            let str = formula.split(path)[0].substr(-1),
                value
            if (str == '-') {
                value = '(' + (number.clearThousPos(newValue) + number.clearThousPos(oldValue)) + ')'
            } else if (str == '*') {
                value = '(' + (number.clearThousPos(newValue) / number.clearThousPos(oldValue)) + ')'
            } else if (str == '/') {
                value = '(' + number.clearThousPos(newValue) * number.clearThousPos(oldValue) + ')'
            } else {
                value = '(' + (number.clearThousPos(newValue) - number.clearThousPos(oldValue)) + ')'
            }
            return {
                newValue: value,
                oldValue: oldValue,
                path: path
            }
        } else {
            return false
        }
    }

    //计算
    calculationData = (newValue, oldValue, pathName, changeData, oldData, formulaObj, tFormulaList, willCalcFormula, selfCals) => {
        let formulaStr = formulaObj.formula,
            responsePath = formulaStr.split('=')[0],//目标值
            responseTName,
            formula = formulaStr.split('=').splice(1).join('='),
            responseNum,
            response,
            preValue,
            qtxx = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO.qtxx') ? this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO.qtxx').toJS() : undefined

        response = this.transNum(formula, changeData, qtxx, selfCals)
        preValue = this.getPathData(changeData, responsePath)// 取出计算前值
        changeData = this.setPathData(changeData, responsePath, this.mathRound(response, 2))//更新计算结果

        willCalcFormula = this.getAboutFormulas(responsePath, tFormulaList, willCalcFormula)
        willCalcFormula.shift()

        if (willCalcFormula && willCalcFormula.length == 0) {
            //这时计算完毕
            return changeData
        } else {
            let nextPath, nextOldValue, nextNewValue
            if (willCalcFormula[0].path == pathName) {
                nextPath = pathName
                nextOldValue = oldValue
                nextNewValue = newValue
            } else {
                nextPath = willCalcFormula[0].path
                nextOldValue = this.getPathData(oldData, willCalcFormula[0].path)
                nextNewValue = this.getPathData(changeData, willCalcFormula[0].path)
            }
            let selfCals2 = this.isSelfCals(willCalcFormula[0].formula, { newValue: nextNewValue, oldValue: nextOldValue, path: nextPath })
            return this.calculationData(nextNewValue, nextOldValue, nextPath, changeData, oldData, willCalcFormula[0], tFormulaList, willCalcFormula, selfCals2)
        }
    }

    //将名字由 a_b_c_4_f 改成 a_b_c[4]_f
    transPath(path) {
        let NUMRGX = /\_[\d]+\_/g,
            numArr = path.match(NUMRGX)
        if (numArr != null) {

            numArr.map(item => {
                let numStr = '[' + parseInt(item.replace('_', '')) + ']_'
                path = path.replace(item, numStr)
            })
        }
        return path.replace(/\_/g, '.')
    }

    mathRound = (num, digit = 2) => {//数字，精确位数 默认
        return Math.round(num * (Math.pow(10, digit))) / (Math.pow(10, digit))
    }

    //吧公式的变量名 转换成 数字 ，获得结果
    // const ROUNDLEFTSTR = '(Math.round((('
    // const ROUNDRIGHTSTR = ')* 100)) / 100)'
    transNum = (formula, changeData, qtxx, selfCals, type) => { //

        if (formula.indexOf('qtxx') >= 0 && qtxx === undefined) return false
        if (selfCals) {
            formula = formula.replace(selfCals.path, selfCals.newValue)
        }
        let paths = formula.match(PATHRGX)

        paths.map(item => {
            if (isNaN(item - 0)) {
                try {
                    let pathStr = this.transPath(item),
                        value
                    if (pathStr.indexOf('qtxx') < 0) {
                        value = eval('changeData.' + pathStr)
                        if (pathStr.indexOf('.hmc') >= 0) {
                            value = "'" + value + "'"
                        } else {
                            value = value ? value : 0
                            value = value == '- -' ? 0 : value
                        }
                    } else {
                        value = eval(pathStr)
                        if (!(value === 'false' || value === 'true' || !isNaN(parseInt(value)))) {
                            value = "'" + value + "'"
                        }
                    }
                    formula = formula.replace(item, value)
                } catch (err) {
                    console.log(err)
                }
            }
        })

        //
        let signArr = formula.match(SIGNRGX),
            gsArr = formula.match(GSRGX),
            signChangeArr,
            newFormula = ''
        // if (signArr) {//校验时 计算的结果保留两位数字再比较，防止等式两边因有一边未保留两位小数导致校验出现问题
        //     gsArr.map((item, index) => {
        //         if( item.match(/[\+|\-|\*|\\|\%]/g) ) {
        //             if (index <= signArr.length - 1) {
        //                 newFormula += ("(("+gsArr[index]+").toFixed(2)-0)" + signArr[index])
        //             } else {
        //                 newFormula += "(("+gsArr[index]+").toFixed(2)-0)"
        //             } 
        //         } else {
        //             if (index <= signArr.length - 1) {
        //                 newFormula += (gsArr[index] + signArr[index])
        //             } else {
        //                 newFormula += gsArr[index]
        //             }
        //         }
        //     })
        //     formula = newFormula
        // }
        if (signArr) {//校验时 计算的结果保留两位数字再比较，防止等式两边因有一边未保留两位小数导致校验出现问题

            gsArr.map((item, index) => {
                if (formula.indexOf(signArr[0]) == 0 && gsArr.length == signArr.length) {
                    if (item.match(/[\+|\-|\*|\\|\%]/g)) {
                        let leftLen = gsArr[index].match(/\(/g) ? gsArr[index].match(/\(/g).length : 0,
                            rightLen = gsArr[index].match(/\)/g) ? gsArr[index].match(/\)/g).length : 0
                        if (leftLen == rightLen) {
                            newFormula += (signArr[index] + ROUNDLEFTSTR + gsArr[index] + ROUNDRIGHTSTR)
                        } else {
                            if (leftLen > rightLen) {
                                newFormula += (signArr[index] + gsArr[index].substr(0, leftLen - rightLen) + ROUNDLEFTSTR + gsArr[index].substr(leftLen - rightLen) + ROUNDRIGHTSTR)
                            } else if (leftLen < rightLen) {
                                newFormula += (signArr[index] + ROUNDLEFTSTR + gsArr[index].substr(0, gsArr[index].length + leftLen - rightLen) + ROUNDRIGHTSTR + gsArr[index].substr(gsArr[index].length + leftLen - rightLen))
                            }
                            newFormula += (signArr[index] + gsArr[index])
                        }
                    } else {
                        newFormula += (signArr[index] + gsArr[index])
                    }
                } else {
                    if (item.match(/[\+|\-|\*|\\|\%]/g)) {
                        let leftLen = gsArr[index].match(/\(/g) ? gsArr[index].match(/\(/g).length : 0,
                            rightLen = gsArr[index].match(/\)/g) ? gsArr[index].match(/\)/g).length : 0
                        if (index <= signArr.length - 1) {
                            if (leftLen == rightLen) {
                                newFormula += (ROUNDLEFTSTR + gsArr[index] + ROUNDRIGHTSTR + signArr[index])
                            } else {
                                if (leftLen > rightLen) {
                                    newFormula += (gsArr[index].substr(0, leftLen - rightLen) + ROUNDLEFTSTR + gsArr[index].substr(leftLen - rightLen) + ROUNDRIGHTSTR + signArr[index])
                                } else if (leftLen < rightLen) {
                                    newFormula += (ROUNDLEFTSTR + gsArr[index].substr(0, gsArr[index].length + leftLen - rightLen) + ROUNDRIGHTSTR + gsArr[index].substr(gsArr[index].length + leftLen - rightLen) + signArr[index])
                                }
                            }
                        } else {
                            if (leftLen == rightLen) {
                                newFormula += ROUNDLEFTSTR + gsArr[index] + ROUNDRIGHTSTR
                            } else {
                                if (leftLen > rightLen) {
                                    newFormula += gsArr[index].substr(0, leftLen - rightLen) + ROUNDLEFTSTR + gsArr[index].substr(leftLen - rightLen) + ROUNDRIGHTSTR
                                } else if (leftLen < rightLen) {
                                    newFormula += ROUNDLEFTSTR + gsArr[index].substr(0, gsArr[index].length + leftLen - rightLen) + ROUNDRIGHTSTR + gsArr[index].substr(gsArr[index].length + leftLen - rightLen)
                                }
                            }
                        }
                    } else {
                        if (index <= signArr.length - 1) {
                            newFormula += (gsArr[index] + signArr[index])
                        } else {
                            newFormula += gsArr[index]
                        }
                    }
                }
            })
            formula = newFormula
        }
        formula = formula.replace(/\[/g, ROUNDLEFTSTR).replace(/\]/g, ROUNDRIGHTSTR)
        console.log(formula)
        try {
            return eval(formula)
        } catch (e) {
            console.log(formula + '---' + e + ' 公式有问题')
            return false
        }
    }

    //
    getPathData = (data, path) => {
        let pathStr = this.transPath(path),
            value = eval('data.' + pathStr)
        return value
    }
    setPathData = (data, path, response) => {
        let pathStr = this.transPath(path)
        eval('data.' + pathStr + '=' + response)
        return data
    }

    //校验
    // 校验和计算用不同类型表示
    checkData = (changeData, initCheckList) => {
        let checkList = this.metaAction.gf('data.tableData.checkList') ? this.metaAction.gf('data.tableData.checkList').toJS() : [],
            oldFailList = this.metaAction.gf('data.failList') ? this.metaAction.gf('data.failList').toJS() : [],
            newFailList = [],
            sumRowCheckList = getSumRowCheckList(changeData.zzsxgmkcxmqd.kcxmqdmx.length - 1),
            qtxx = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO.qtxx') ? this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO.qtxx').toJS() : (changeData.qtxx || undefined)//小规模初始化校验 qtxx取后端传的qtxx
        if (initCheckList) {
            checkList = initCheckList
        }
        checkList = personalCancatCheckList(this.component.props.initData.SS, checkList, sumRowCheckList, changeData)
        checkList.map(item => {//创建新的校验不通过的列表
            let res = this.transNum(item.formula, changeData, qtxx, undefined, CHECK)
            if (res) { //计算成功为 需要弹出提示
                newFailList.push(item)
            }
        })
        let tableFailCounts = this.getFailData(newFailList)
        return {
            tableFailCounts: tableFailCounts,
            newFailList: newFailList
        }
    }

    //得到每个表 有几个校验未通过项
    getFailData = (newFailList) => {
        let checkItemList = [],
            cellNameList = [],
            checkTargetList = []
        let tableFailCounts = {}

        newFailList.map(item => {
            let targetArr = item.targetName.split(',')
            targetArr.map(target => {
                checkItemList.push({
                    formula: item.formula,
                    target: target,
                    message: item.message
                })
            })
        })
        //checkItemList 分开所有需要提示的单元格
        newFailList.map(item => {
            cellNameList = cellNameList.concat(item.targetName.split(','))
        })
        cellNameList = Array.from(new Set(cellNameList)) //去除重复元素
        //相同单元格的合并
        cellNameList.map(item => {
            let message = []
            checkItemList.map(cell => {
                if (cell.target == item) {
                    message.push(cell.message)
                }
            })
            checkTargetList.push({
                target: item,
                message: message
            })
        })
        //将不同的表格项分组

        checkTargetList.map(cell => {
            let tName = cell.target.split('_')[0]
            if (tableFailCounts[tName]) {
                tableFailCounts[tName].num += 1
                tableFailCounts[tName].target.push(cell)
            } else {
                let arr = [cell]
                tableFailCounts[tName] = {
                    num: 1,
                    target: arr
                }
            }
        })
        return tableFailCounts
    }

    updateDeclareItem = async () => {
        const ret = await this.metaAction.modal('show', {
            title: '表单选择',
            height: 304,
            width: 750,
            okText: '保存',
            className: 'ttk-tax-app-select-modal',
            bodyStyle: { padding: '20px 30px', paddingBottom: '0' },
            children: this.metaAction.loadApp('ttk-tax-app-select', {
                store: this.component.props.store,
                columnCode: "common",
                initData: {
                    appraisalId: this.getParams().reportId
                }
            }),
        })

        if (ret) {
            this.metaAction.toast('success', '选择表单保存成功')
            this.load()
        }
    }

    //自动取数
    autoGetData = async () => {
        let getData = this.metaAction.gf('data.button.getData')
        if (!getData) return false
        this.metaAction.sf('data.button.getData', false)
        LoadingMask.show()
        let params = this.getParams(),
            paramsObj = this.metaAction.gf('data.params') ? this.metaAction.gf('data.params').toJS() : {},
            data = this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO') ? this.metaAction.gf('data.tableData.zzssyyxgmnsrySbSbbdxxVO').toJS() : {},
            obj = {
                "taxParam": params,
                isExternalCall: false,
                extraParams: paramsObj.extraParams
            }
        let rpt = await this.webapi.vattaxpayer.autoCreate(
            obj
        )
        this.metaAction.sf('data.button.getData', true)
        if (rpt) {
            if (rpt.openMessage) {//未填写信息，弹出提示
                LoadingMask.hide()
                const res = await this.metaAction.modal('warning', {
                    content: '请先设置网报帐号，并确认您的纳税人信息！',
                    wrapClassName: 'tranreport-generate-modal-bg',
                    className: 'tranreport-generate-modal',
                    okText: '设置'
                })
                if (res) {
                    console.log('关闭页签')
                }
                return
            }//自动取数成功，请核对数据！
            this.metaAction.toast('success', '自动取数成功，请核对数据！')
            rpt.zzssyyxgmnsrySbSbbdxxVO = personaliseFormatData(this.component.props.initData.SS, rpt.zzssyyxgmnsrySbSbbdxxVO)
            this.setData(rpt, paramsObj)
        }
        LoadingMask.hide()
    }
    //新的end
    isPDFPluginInstall = () => {
        if (!(!!window.ActiveXObject || "ActiveXObject" in window)) { //ie 浏览器 和  非ie浏览器支持
            // not ie
            if (navigator.plugins && navigator.plugins.length) {// / Adobe Reader | Adobe PDF | Acrobat | Chrome PDF Viewer
                for (var i = 0; i < navigator.plugins.length; i++) {
                    var plugin = navigator.plugins[i].name;
                    if (plugin == 'Adobe Reader' || plugin == 'Adobe PDF' || plugin == 'Acrobat' || plugin == 'Chrome PDF Viewer') return true;
                }
            }
            return false;
        } else {
            // ie
            var isInstalled = false;
            var version = null;

            var control = null;
            try {
                control = new ActiveXObject('AcroPDF.PDF');
            } catch (e) {
                alert(e);
            }
            if (!control) {
                try {
                    control = new ActiveXObject('PDF.PdfCtrl');
                } catch (e) {
                }
            }
            if (!control) {
                try {
                    control = new ActiveXObject('Adobe Acrobat');
                } catch (e) {
                }
            }

            if (!control) {
                try {
                    control = new ActiveXObject('Adobe PDF Plug-in');
                } catch (e) {
                }
            }
            if (control) {
                isInstalled = true;
                version = control.GetVersions().split(',');
                version = version[0].split('=');
                version = parseFloat(version[1]);
                return isInstalled;
            }
        }
    }

    handleBack = async () => {
        let appKey = this.metaAction.context.get('currentOrg').appKey,
            appName = '申报缴款',
            params = this.metaAction.gf('data.params').toJS(),
            isDeclare = !!this.metaAction.gf('data.isDeclare'),
            year = params.year,
            period = params.period < 10 ? ('0' + params.period) : params.period,
            defaultYearMonth = year + '-' + period

        let rpt = await this.webapi.vattaxpayer.query({ sourceFlag: 1 })
        rpt.map(item => {
            if (item.appKey == appKey) {
                appName = item.name
            }
        })
        if (this.component.props.setPortalContent) {
            localStorage.setItem('taxlist_reload', isDeclare)
            this.component.props.setPortalContent(appName, 'ttk-taxapply-app-taxlist', { defaultYearMonth })
        } else {
            window.history.back();
        }
    }

    openInvoiceSummary = async () => {
        let initData = this.metaAction.gf('data.params').toJS()
        const ret = await this.metaAction.modal('show', {
            title: '发票汇总',
            wrapClassName: 'ttk-tax-app-invoicesummary-model',
            width: '920px',
            closeModal: this.close,
            closeBack: (back) => { this.closeTip = back },
            footer: '',
            children: this.metaAction.loadApp('ttk-tax-app-invoicesummary', {
                store: this.component.props.store,
                initData: {
                    type: 'vattaxpayer',
                    option: initData
                }
            }),
        })
    }

    close = (ret) => {
        this.closeTip()
        if (ret == 'org') {
            this.component.props.setPortalContent &&
                this.component.props.setPortalContent('企业信息', 'edfx-app-org', { initData: { activeKey: '1' } })
        } else if (ret.isChanged) {
            this.autoGetData()
        }
    }
    //取数按钮是否显示
    rptGetDataVisible = (status) => {
        this.component.props.initData = this.returnDefaultData()
        if (this.component.props.initData.rptGetDataVisible === undefined) {
            return status
        } else if (status) {
            status = this.component.props.initData.rptGetDataVisible
        }
        return status
    }
    //发票汇总按钮是否显示
    sumInvoiceVisible = (status) => {
        if (this.component.props.initData.sumInvoiceVisible === undefined) {
            return status
        } else if (status) {
            status = this.component.props.initData.sumInvoiceVisible
        }
        return status
    }

    //是否是月报，小规模月报置灰所有增值税按钮
    getIsDisabled = () => {
        let isDisabled = false,
            params = this.getParams(),
            skssqq = params.skssqq,
            skssqz = params.skssqz
        if (skssqq.split('-')[1] == skssqz.split('-')[1]) {
            isDisabled = true
        }
        // if (!this.isDevMode() && this.component.props.initData.SS == '52') {
        //     isDisabled = true
        // }
        return isDisabled
    }

    isDevMode = () => {
        let href = location.href.toLowerCase()

        const devMode = href.indexOf('dev.') > -1
            || href.indexOf('dev-jr.') > -1
            || href.indexOf('dev-dz.') > -1
        return devMode
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })
    return ret
}

