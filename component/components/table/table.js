import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Table } from 'antd'
import { Map, fromJS } from 'immutable'
import { Resizable } from 'react-resizable'
import Checkbox from '../checkbox/index'
import uuid from './uuid'
//import $ from 'jquery'
// import changeColSize from './resize'
import DecorateTable from './DecorateTable'
import NoData from '../nodata'
// import classNames from 'classnames'

const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    // if (!width) {
    //   return <th {...restProps} />;
    // }

    return (
        <Resizable width={width ? width : 100} height={0} onResize={onResize}>
            <th {...restProps} ></th>
        </Resizable>
    )
}
@DecorateTable
class AntTable extends Component {
    static defaultProps = {
        resizeColumn: true
    }

    constructor(props) {
        super(props)
        const memoryWidthLocalSotrage = this.memoryWidth(props)
        this.state = {
            resizeColumn: this.props.allowColResize,
            selectValue: props.checkboxValue ? this.initSelectValue(props.checkboxValue, props.dataSource) : new Map(),
            checkboxAllStatus: null,
            checkboxId: new Map(),
            columns: [],
            memoryWidth: memoryWidthLocalSotrage,
            sumWidth: 1090,
            y: undefined
        }
        if (this.props.allowColResize) {
            const { newCol, sumWidth } = this.initStateWidth(props.columns, [], memoryWidthLocalSotrage)
            this.state.columns = newCol
            this.state.sumWidth = sumWidth
        }
        // this.initCheckboxId(props.dataSource)
    }

    memoryWidth = (props) => {
        const { remberName } = props
        if (!remberName) {
            return {}
        }
        const memoryWidth = this.getAppData(remberName)
        return memoryWidth
    }

    removeDom = () => {
        let me = $(ReactDOM.findDOMNode(this))
        let table = me.find('table')
        let point = table.find('.table-needDel')
        const { noDelCheckbox } = this.props
        point.each(function (index, obj) {
            let num = $(obj).attr('data-rol')
            let sign = $(obj).parents('tr').find('.table-needDel2').attr('data-sign')
            if (!sign) {
                sign = $(obj).parents('tr').find('.table-needDel').attr('data-sign')
            }
            let backgroundColor = index % 2 == 0 ? '#fff' : '#F9F8FA '
            $(obj).parents('tr').css('background', backgroundColor).attr('data-background', backgroundColor).attr('data-hover', sign).find('td')
            let next = $(obj).parents('tr')
            for (var i = 0; i < num - 1; i++) {
                if (!noDelCheckbox) {
                    next.eq(0).next().css('background', backgroundColor).attr('data-hover', sign).find('td')
                } else {
                    next.eq(0).next().css('background', backgroundColor).attr('data-hover', sign).find('td').eq(0)
                }
                next = next.eq(0).next()
            }
            $(obj).parents('tbody').find(`tr[data-hover=${sign}]`).hover(() => {
                $(obj).parents('tbody').find(`tr[data-hover=${sign}]`).addClass('mk-active')
                $(`.ant-table-fixed tbody`).find(`tr[data-hover=${sign}]`).addClass('mk-active')
            }, () => {
                $(obj).parents('tbody').find(`tr[data-hover=${sign}]`).removeClass('mk-active')
                $(`.ant-table-fixed tbody`).find(`tr[data-hover=${sign}]`).removeClass('mk-active')
            })
        })
        try {
            let fixedTable = me.find('.ant-table-fixed')
            let point = table.find('.table-needDel2')
            let num = point.attr('data-rol')
            point.each(function (index, obj) {
                let num = $(obj).attr('data-rol')
                let sign = $(obj).attr('data-sign')
                let backgroundColor = table.find(`tr[data-hover=${sign}]`).eq(0).attr('data-background')
                $(obj).parents('tr').attr('data-hover', sign).css('background', backgroundColor)
                let next = $(obj).parents('tr').attr('data-hover', sign).find(`.table-needDel2[data-sign=${sign}]`)
                for (var i = 0; i < num - 1; i++) {
                    next.eq(0).next().attr('data-hover', sign).css('background', backgroundColor)
                    next = next.eq(0).next()
                }

                $(obj).parents('tr').hover(() => {
                    table.find(`tr[data-hover=${sign}]`).addClass('mk-active')
                    fixedTable.find(`tr[data-hover=${sign}]`).addClass('mk-active')
                }, () => {
                    table.find(`tr[data-hover=${sign}]`).removeClass('mk-active')
                    fixedTable.find(`tr[data-hover=${sign}]`).removeClass('mk-active')
                })
            })
        } catch (err) {
        }
    }

    componentWillReceiveProps(nextProps) {
        const { memoryWidth } = this.state
        if (nextProps.checkboxKey) {
            this.initCheckboxId(nextProps.dataSource)
        }
        if (nextProps.checkboxValue) {
            const selectValue = this.initSelectValue(nextProps.checkboxValue, nextProps.dataSource)
            this.setState({
                selectValue
            })
        }
        if (nextProps.allowColResize) {
            setTimeout(() => {
                const { newCol, sumWidth } = this.initStateWidth(nextProps.columns, this.state.columns, memoryWidth)
                this.setState({
                    columns: newCol,
                    sumWidth
                })
            }, 20)
        }
        this.winResize()
    }

    components = this.props.components && this.props.components instanceof Object ? {
        ...this.props.components,
        header: {
            cell: ResizeableTitle,
        }
    } : {
            header: {
                cell: ResizeableTitle,
            }
        }

    componentShouldUpdate(nextProps, nextState) {
        // console.log('--------componentShouldUpdate-----------')
        // return false
    }
    handleResize = index => (e, { size }) => {
        let { columns, appContainerWidth } = this.state
        //删除操作列 key == 'voucherState'
        columns.map((item, index) => {
            if (item.key && item.key == 'voucherState') {
                columns.splice(index, 1)
            } else {
                columns = columns
            }
        })
        let preWidth
        let Index = columns.findIndex(item => {
            return item && item.dataIndex == index
        })

        if (Index == -1) {
            //index是-1代表拖拽的元素是子集
            columns.map(m => {
                if (m.children) {
                    m.children.map(n => {
                        if (n.dataIndex == index) {
                            preWidth = n.width
                            n.width = size.width
                            m.width += size.width - n.width
                        }
                    })
                } else {
                    return
                }
            })
        } else {
            //拖拽的元素是父级
            preWidth = columns[Index].width
            columns[Index].width = size.width
            if (columns[Index].children) {
                columns[Index].children.forEach(item => {
                    item.width = (size.width) / (columns[Index].children.length)
                })
            }
        }

        let sumWidth = 0,
            columnDetails = [],
            param = {}
        columns.forEach(item => {
            if (!item.children) {
                columnDetails.push({
                    fieldName: item.dataIndex,
                    width: item.width,
                    isVisible: true,
                    customDecideVisible: true //控制哪一列显示隐藏
                })
                sumWidth = sumWidth + item.width
            } else {
                item.width = 0
                item.children.forEach(child => {
                    item.width += child.width
                    columnDetails.push(child)
                })

                columnDetails.push(item)
            }
        })

        param.columnDetails = columnDetails
        this.setState({
            columns: columns,
            sumWidth: this.initStateWidth(columnDetails).sumWidth
        })

        let that = this, res
        this.onResizend(function () {
            res = that.props.onResizeEnd(param)

        })

    }

    showTheadTitle = (title) => {
        if (Object.prototype.toString.call(title) == "[object String]") {
            return <span title={title}>{title}</span>
        } else {
            return title
        }
    }
    onResizend = (onResizend) => {
        /**
         * <<<算法说明>>>
         * ---------------------------------------------------------------------------------
         * 1. 默认窗口状态 normal.
         * 2. 调整窗口大小时状态 resizing.
         * 3. 调整窗口大小时设置动作状态为 resizing, 并设置延时任务. 若已存在延时任务,则重新设置.
         * 4. 若500毫秒后没有断续调整大小,则认为调整结束,执行resizend事件.
         */

        let that = this,
            timeOutTask = function () {
                that.state.taskPtr && clearTimeout(that.state.taskPtr)
                let taskPtr = setTimeout(function () {
                    onResizend && onResizend();
                }, 500)
                that.setState({ taskPtr: taskPtr })
            }
        timeOutTask()
    }
    initStateWidth = (data, columns, memoryWidth) => {
        if (!data) {
            return []
        }
        let norSetWidth = 0
        let flag = false
        data.forEach(item => {
            if (item.width) {
                norSetWidth++
            } else {
                flag = true
            }
        })
        if (flag) {
            norSetWidth = 0
        }
        let appContainerWidth = null
        try {
            let dom
            if ($) {
                dom = $('.edfx-app-portal-content-main')[0]
            } else {
                dom = document.getElementsByClassName('edfx-app-portal-content-main')[0]
            }
            if (dom) {
                if (this.props.id == 'app-detailaccount-rpt-Body-id') {
                    //明细账滚动条特殊处理
                    appContainerWidth = dom.offsetWidth - 160 + 80 - this.props.subjectWidth - 120
                } else if (this.props.id == 'app-sumaccount-rpt-Body-id' || this.props.id == 'app-balancesum-rpt-Body-id') {
                    //总账和余额表滚动条做特殊处理
                    appContainerWidth = dom.offsetWidth - 160 + 80 - 120
                } else {
                    appContainerWidth = dom.offsetWidth - 160 + 80
                }

            } else {
                appContainerWidth = window.innerWidth - 100 - 160 + 80

            }

        } catch (err) {
            appContainerWidth = 1090
        }

        let avrWidth = Math.ceil((appContainerWidth) / (data.length - 1))
        let sumWidth1 = 0
        data.map((item) => {
            if (item.width) {
                sumWidth1 = sumWidth1 + parseFloat(item.width)
            }
        })
        const newCol = data.map((item) => {

            item.title = this.showTheadTitle(item.title)
            return item
        })
        this.state.appContainerWidth = appContainerWidth
        return { newCol, sumWidth: sumWidth1 > appContainerWidth ? sumWidth1 : appContainerWidth + 50 }

    }

    winResize = () => {
        if (this.tid) clearTimeout(this.tid); //防止执行两次
        this.tid = setTimeout(this.setTableHeight, 300);
        this.getTableScroll()
    }
    getTableScroll = () => {
        // if ((!this.props.scroll || !this.props.scroll.y) && (this.props.dataSource && this.props.dataSource.length)) {
        //     return
        // }
        if (!this.props.scroll || (this.props.scroll.hasOwnProperty('y') && !this.props.scroll.y)) {
            return
        }
        if (this.timeId) clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
            try {
                let container = ReactDOM.findDOMNode(this)
                let thead = container.getElementsByClassName('ant-table-thead')[0]
                let tbody = container.getElementsByClassName('ant-table-tbody')[0]
                let y = container.offsetHeight - thead.offsetHeight

                if (y > tbody.offsetHeight) {
                    y = undefined
                }
                // console.log(y, 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
                this.setState({
                    y: y
                })
            } catch (err) {
                console.log(err)
            }
        }, 300);

    }

    setTableHeight = () => {
        // if (this.tid) clearTimeout(this.tid)
        // this.tid = setTimeout(() => {
        try {
            let container = ReactDOM.findDOMNode(this)
            let tableBody
            if ($) {
                tableBody = $(container).find('.ant-table-body')[0]
            } else {
                tableBody = container.getElementsByClassName('ant-table-body')[0]
            }
            // console.log(this.props.scroll, 'scroll')

            if (!this.props.dataSource || !this.props.dataSource.length) {
                tableBody.style.height = container.offsetHeight + 'px'
                return
            }
            if (!this.props.scroll || (this.props.scroll.hasOwnProperty('y') && !this.props.scroll.y)) {
                tableBody.style.height = 'auto'//兼容清册申报表
                return
            }
            tableBody.style.height = container.offsetHeight + 'px'
            // console.log(container.offsetHeight, 'fffffffffffffffffffff')
        } catch (err) {
            console.log(err)
        }
        //  }, 300);

    }


    componentDidUpdate() {
        // this.removeDom()

        if (this.state.resizeColumn) {
            if (typeof ($) == 'undefined' || $ == null) {
                this.AjaxLoadJquerylibrary()
                window.setTimeout(function () {
                }, 100)
            }
            let me = $(ReactDOM.findDOMNode(this))
            let table = me.find('table')
            let id = uuid()
            table.attr('id', id)
            // changeColSize(id, this.onResize)
            // 去掉所有col上面的width
            // this.setColumnsWidth(id)
        }
    }
    componentWillUnmount = () => {
        if (this.props.tableIsNotRefreshKey) {
            let key = this.props.tableIsNotRefreshKey
            const me = ReactDOM.findDOMNode(this)
            const dom = me.querySelector('.ant-table-body')
            dom.removeEventListener('scroll', (e) => {
                sessionStorage.setItem(`${key}ScrollTop`, e.target.scrollTop)
                // window.tableScrollTop = e.target.scrollTop
            }, false)
            sessionStorage.setItem(`${key}ScrollTop`, dom.scrollTop)
            // window.tableScrollTop = dom.scrollTop
        }
        const win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.winResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.winResize)
        } else {
            win.onresize = undefined
        }
        if (this.tid) clearTimeout(this.tid);
        if (this.timeId) clearTimeout(this.timeId)
    }

    componentDidMount() {
        const win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.winResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.winResize)
        } else {
            win.onresize = this.winResize
        }
        //tableIsNotRefreshKey为table组件记忆滚动条位置的标志
        if (this.props.tableIsNotRefreshKey) {
            let key = this.props.tableIsNotRefreshKey
            const me = ReactDOM.findDOMNode(this)
            const dom = me.querySelector('.ant-table-body')
            dom.addEventListener('scroll', (e) => {
                // console.log(e.target.scrollTop)
                sessionStorage.setItem(`${key}ScrollTop`, e.target.scrollTop)
                // window.tableScrollTop = e.target.scrollTop
            }, false)
            dom.scrollTop = sessionStorage.getItem(`${key}ScrollTop`)
            // dom.scrollTop = window.tableScrollTop
        }

        //  设置列表可拖动
        // this.removeDom()
        this.setTableHeight()
        this.getTableScroll()
        if (this.state.resizeColumn) {
            if (typeof ($) == 'undefined' || $ == null) {
                this.AjaxLoadJquerylibrary()
                window.setTimeout(function () {
                }, 100)
            }
            let me = $(ReactDOM.findDOMNode(this))
            let table = me.find('table')
            let id = uuid()
            table.attr('id', id)
            // changeColSize(id)
            // 去掉所有col上面的width
            // this.setColumnsWidth(id)
        }
        try {
            let height = ReactDOM.findDOMNode(this).offsetHeight
            let titleHeight
            if ($) {
                titleHeight = $('.ant-table-thead')[0].clientHeight
            } else {
                titleHeight = document.getElementsByClassName('ant-table-thead')[0].clientHeight
            }
            if (height !== this.state.height) {
                this.setState({
                    height: height - titleHeight - 32
                })
            }
        } catch (err) {

        }

        /**
         * 合并首列包含CHECKBOX的情况
         */
    }

    AjaxLoadJquerylibrary = () => {
        var d = document;
        if (d) {
            var s = d.getElementById('jqscript');
            if (s != null)
                return;
            s = d.createElement('script');
            s.type = 'text/javascript';
            s.src = './vendor/jquery.min.js';
            d.body.appendChild(s);
        }
    }

    // setColumnsWidth = (id) => {
    //     let me = $(ReactDOM.findDOMNode(this))
    //     let table = me.find(`#${id}`)
    //     let colgroup = table.find('colgroup')
    //     let cols = colgroup.find('col')
    //     $(cols).each(function (index, el) {
    //         this.style.width = 'auto'
    //     })
    // }

    getColumns = () => {
        let columns
        if (this.state.allowColResize) {
            columns = this.state.columns
        } else {
            columns = this.props.columns
        }
        let children = fromJS(columns),
            renderColumns = []

        if (!children || children.size == 0) {
            return []
        }
        for (let i = 0; i < children.size; i++) {
            let child = children.get(i)
            let column = this.getColumnByMeta(child)
            if (column)
                renderColumns.push(column)
        }
        return renderColumns
    }

    getColumnByMeta = (meta) => {
        let children = meta.get('children'),
            ret = { ...meta.toJS() }
        if (ret._visible === false)
            return undefined

        if (children && children.size > 0) {
            ret.children = []
            children.map((sub) => {
                let o = this.getColumnByMeta(sub)
                if (!o) return

                if (!ret.children)
                    ret.children = []
                ret.children.push(o)
            })
        }

        return ret
    }

    initSelectValue = (selcted, all) => {
        let selectValue = new Map()
        const { checkboxKey } = this.props
        selcted.forEach(item => {
            const i = all.find(key => key[checkboxKey] == item)
            selectValue = selectValue.set(item, i)
        })
        return selectValue
    }

    showCheckboxType = () => {
        let { selectValue } = this.state,
            checkboxId = this.initCheckboxId(this.props.dataSource, 'get')

        let obj = {}
        if (!checkboxId.size) {
            obj.checked = false
        } else if (this.checkAllItem()) {
            obj.checked = true
        } else if (this.noCheckItem()) {
            obj.checked = false
        } else {
            obj.checked = false
            obj.indeterminate = true
        }
        return obj
    }

    noCheckItem = () => {
        let { selectValue } = this.state,
            checkboxId = this.initCheckboxId(this.props.dataSource, 'get')
        let flag = true
        checkboxId.map((item, key) => {
            if (selectValue.has(key)) {
                flag = false
            }
        })
        // for (const key of checkboxId.keys()) {
        //     if (selectValue.has(key)) {
        //         flag = false
        //     }
        // }
        return flag
    }

    checkAllItem = () => {
        let { selectValue } = this.state,
            checkboxId = this.initCheckboxId(this.props.dataSource, 'get')
        let flag = true
        checkboxId.map((item, key) => {
            if (!selectValue.has(key) && typeof key != "undefined") {
                flag = false
            }
        })
        // for (const key of checkboxId.keys()) {
        //     if (!selectValue.has(key) && typeof key != "undefined") {
        //         flag = false
        //     }
        // }
        return flag
    }

    checkboxAllClick = (e) => {
        let { selectValue } = this.state
        if (this.initCheckboxId) {
            let checkboxId = this.initCheckboxId(this.props.dataSource, 'get')
            if (selectValue.size == 0) {
                checkboxId.map((value, key) => {
                    selectValue = selectValue.set(key, value)
                })
            } else if (this.checkAllItem()) {
                selectValue = new Map()
            } else {
                checkboxId.map((value, key) => {
                    selectValue = selectValue.set(key, value)
                })
            }
            this.setState({
                selectValue
            })
            this.update(selectValue)
        }
    }

    checkboxItemClick = (e, key, record) => {
        let map = this.state.selectValue
        if (!map.has(key)) {
            map = map.set(key, record)
        } else (
            map = map.delete(key)
        )
        this.setState({
            selectValue: map
        })
        this.update(map, record)
    }


    initCheckboxId = (data, type) => {
        if (!data) {
            return
        }
        data = data.filter(o => o && o.batchcheckboxDisabled == false || o && o.batchcheckboxDisabled == undefined)
        let map = new Map()
        const { checkboxKey } = this.props
        data.forEach(item => {
            if (item[checkboxKey] && !map.has(item[checkboxKey])) {
                map = map.set(item[checkboxKey], item)
            }
        })
        if (type == 'get') {
            return map
        }
        this.setState({
            checkboxId: map
        })
    }

    rowSpan = (text, record, index) => {
        const { checkboxKey } = this.props
        const { dataSource } = this.props
        if (!record[checkboxKey]) return 1;
        const key = dataSource.findIndex(item => item[checkboxKey] == record[checkboxKey])
        let num = 1
        if (key == index) {
            let i = 0
            while (dataSource[index + i] && dataSource[index + i][checkboxKey] && dataSource[key] && dataSource[key][checkboxKey] && (dataSource[index + i][checkboxKey] == dataSource[key][checkboxKey])) {
                i++
            }
            num = i
        } else {
            num = 0
        }
        return num
    }
    getcheckboxAllDisabled = () => {
        let dataSource = this.props.dataSource, disabled = true
        let item = dataSource.find(o => {
            if (!(o && o.batchcheckboxDisabled)) {
                return o
            }
        })
        if (item) {
            disabled = false
        }
        return disabled
    }
    renderChekbox = (type) => {
        const { checkboxKey, checkboxFixed } = this.props

        const { selectValue, columns } = this.state
        if (type == 1) {
            return {
                title: <Checkbox {...this.showCheckboxType()} onClick={this.checkboxAllClick} />,
                dataIndex: 'checkboxKey',
                key: 'checkboxKey',
                className: "mk-table-checkbox",
                width: 34,
                fixed: checkboxFixed ? checkboxFixed : '',
                render: (text, record, index) => {
                    const obj = {
                        children: record[checkboxKey] ? <Checkbox
                            checked={selectValue.has(record[checkboxKey])}
                            disabled={record['checkboxDisabled']}
                            onClick={(e) => this.checkboxItemClick(e, record[checkboxKey], record)}
                        /> : null,
                        props: {
                            rowSpan: this.rowSpan(text, record, index),
                        },
                    }
                    return obj
                }
            }

        } else {
            return [
                {
                    title: <Checkbox {...this.showCheckboxType()} onClick={this.checkboxAllClick} />,
                    dataIndex: 'checkboxKey',
                    key: 'checkboxKey',
                    width: 34,
                    className: "mk-table-checkbox",
                    render: (text, record, index) => {
                        const obj = {
                            children: <Checkbox
                                checked={selectValue.has(record[checkboxKey])}
                                disabled={record['checkboxDisabled']}
                                onClick={(e) => this.checkboxItemClick(e, record[checkboxKey], record)}
                            />,
                            props: {
                                rowSpan: this.rowSpan(text, record, index),
                            },
                        }
                        return obj
                    }
                },
                ...columns
            ]
        }
    }

    update = (data, record) => {
        if (this.props.checkboxChange) {
            const arr = []
            const arrValue = []
            const { selectValue } = this.state
            data.map((value, key) => {
                arr.push(key)
                if (value && value.batchcheckboxDisabled == false || value && value.batchcheckboxDisabled == undefined) {
                    arrValue.push(value)
                }

            })
            // for (const [key, value] of data.entries()) {
            //     arr.push(key)
            //     arrValue.push(value)
            // }
            this.props.checkboxChange(arr, arrValue, record)
        }
    }

    rnederTitle = (text) => {
        return <span title={text}>{text}</span>
    }

    decorateColumns = (columns) => {
        return columns.map((col, index) => {

            if (!(col.tip == false) && !col.render && col.dataIndex) {
                col.render = this.rnederTitle
            }
            if (col.children) {
                col.children.map(o => {
                    o.onHeaderCell = (column) => ({
                        width: column.width,
                        onResize: this.handleResize(column.dataIndex)
                    })
                })
            }
            if (this.state.resizeColumn) {
                return {
                    ...col,
                    onHeaderCell: (column) => ({
                        width: column.width,
                        onResize: this.handleResize(column.dataIndex),
                    }),
                }
            } else {
                return col
            }
        })
    }

    getChildrenTitle = (item) => {
        const obj = {
            ...item,
            title: this.showTheadTitle(item.title)
        }
        if (item.children) {
            const arr = []
            if (typeof (item.children.values) == 'function') {
                for (const value of item.children.values()) {
                    arr.push(this.getChildrenTitle(value))
                }
            }
            else {
                for (const value of item.children) {
                    arr.push(this.getChildrenTitle(value))
                }

            }
            obj.children = arr
        }
        return obj
    }

    decorateHeaderTitle = (column) => {

        if (!column) {
            return undefined
        }
        return column.map(item => {
            return this.getChildrenTitle(item)
        })
    }

    render() {
        let { ...otherProps } = this.props
        let { columns, sumWidth, y } = this.state,
            children = fromJS(this.props.columns),
            renderColumn = [],
            height = this.state.height, top, small = false, loading
        if (height >= 238) {
            top = (height - 238) / 2
        } else {
            small = true
            top = (height - 168) / 2
        }
        if (otherProps.loading != undefined) {
            loading = {
                size: 'large',
                delay: otherProps.delay || 2000,
                spinning: otherProps.loading,
                tip: "数据加载中..."
            }
        }
        let emptyText = <NoData style={{ position: 'relative', marginTop: top, paddingBottom: top }} small={small}>暂无数据</NoData>
        //table 控件自定义空数据描述
        if (this.props.emptyText) {
            emptyText = <NoData style={{ position: 'relative', marginTop: top, paddingBottom: top }} small={small}>{this.props.emptyText}</NoData>
        }

        if (this.props.pureText) {
            emptyText = this.props.pureText
        }

        // let locale = { 'emptyText': emptyText }
        let scroll = { y }
        if (this.props.scroll) {
            if (this.props.scroll.hasOwnProperty('y') && (!this.props.scroll.y || this.props.scroll.y === true)) delete this.props.scroll.y

            scroll = {
                ...scroll,
                ...this.props.scroll
            }
        }
        //if (scroll.y === true || !this.props.dataSource || !this.props.dataSource.length) scroll.y = y
        if (!scroll.x) scroll.x = 1

        if (children && children.size > 0) {
            let renderColumn = this.getColumns()
            if (this.props.checkboxKey) {
                renderColumn = [this.renderChekbox(1), ...renderColumn]
            }
            const columns3 = this.decorateColumns(renderColumn)
            let newColumn = this.decorateHeaderTitle(columns3)
            let scrollX = this.props.dataSource && this.props.dataSource.length > 0 ? sumWidth : null
            if (this.props.emptyShowScroll) {
                scrollX = sumWidth
            }

            if (this.state.resizeColumn) {
                return <Table {...this.props}
                    scroll={{ ...this.props.scroll, y: y, x: scrollX }}
                    components={this.components}
                    columns={this.addColumn(this.decorateHeaderTitle(columns3))}
                    locale={{ 'emptyText': emptyText }}
                    loading={loading}
                />
            } else {
                return <Table {...this.props} scroll={scroll} columns={this.decorateHeaderTitle(columns3)} locale={{ 'emptyText': emptyText }} loading={loading} />
            }
        }
        else {
            return <Table {...this.props} scroll={scroll} columns={this.decorateHeaderTitle(this.props.columns)} locale={{ 'emptyText': emptyText }} loading={loading} />
        }
    }

    addColumn = (data) => {
        const me = ReactDOM.findDOMNode(this)
        if (!me) {
            return data
        }
        const containerWidth = me.offsetWidth
        let setWidthSum = 0
        data.forEach(item => {
            if (item.width) {
                setWidthSum = setWidthSum + parseFloat(item.width)
            }
        })
        if (setWidthSum > containerWidth) {
            return data
        }
        let remain = containerWidth - setWidthSum - 10;

        if (this.props.rowSelection) {
            let columnWidth = this.props.rowSelection.columnWidth
            if (typeof columnWidth === 'string') {
                columnWidth = Number(columnWidth.replace(/px/g, ''))
            }
            columnWidth = columnWidth || 60
            remain -= columnWidth
        }
        if (remain < 0) remain = 0
        let operateIndex = data.findIndex(item => item.key && item.key == 'voucherState') //找到操作列，把空白列插入到操作列之前
        if (this.props.id && this.props.id !== 'app-detailaccount-rpt-Body-id' &&
            this.props.id !== 'app-sumaccount-rpt-Body-id' &&
            this.props.id !== 'app-balancesum-rpt-Body-id' ||
            !this.props.id) {
            //明细账，总账和余额表不额外增加空白列
            if (operateIndex != -1) {
                data.splice(data.length - 1, 0, {
                    dataIndex: 'remain',
                    title: <span></span>,
                    key: 'remain',
                    width: remain
                })
            } else {
                data.splice(data.length, 0, {
                    dataIndex: 'remain',
                    title: <span></span>,
                    key: 'remain',
                    width: remain
                })
            }
        }

        return data
    }
}

AntTable.Column = Table.Column
AntTable.ColumnGroup = Table.ColumnGroup
AntTable.rowSelection = Table.rowSelection
AntTable.selection = Table.selection

export default AntTable
