import React, { PureComponent } from 'react'
import { Table } from 'antd'
import ReactDOM from 'react-dom'
import { Map, List, is, fromJS, Record } from 'immutable'
import { Resizable } from 'react-resizable';
import DecorateTable from './DecorateTable'
import Checkbox from '../checkbox/index'

const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    return (
        <Resizable width={width ? width : 100} height={0} onResize={onResize}>
            <th {...restProps} ></th>
        </Resizable>
    )
}

@DecorateTable
export default class TableLarge extends PureComponent {
    static defaultProps = {
        resizeColumn: true
    }
    constructor(props) {
        super(props)
        const memoryWidthLocalSotrage = this.memoryWidth(props)
        this.state = {
            resizeColumn: this.props.allowColResize,
            scrollTop: 0,
            loading: this.props.loading,
            selectValue: props.checkboxValue ? this.initSelectValue(props.checkboxValue, props.dataSource) : new Map(),
            checkboxAllStatus: null,
            checkboxId: new Map(),
            rowHeight: props.rowHeight || 36.8,
            showRows: props.showRows || 20,
            scrollY: props.scroll && props.scroll.y || 600,
            memoryWidth: memoryWidthLocalSotrage,
            sumWidth: 1090
        }
        if (this.props.allowColResize) {
            const { newCol, sumWidth } = this.initStateWidth(props.columns, [], memoryWidthLocalSotrage)
            this.state.columns = newCol
            this.state.sumWidth = sumWidth
        }
    }

    componentDidMount = () => {
        const me = ReactDOM.findDOMNode(this)
        if (this.props.scroll&&this.props.scroll.y === true) {
            const tableThead = me.getElementsByClassName('ant-table-thead')[0]
            const scrollY = me.offsetHeight - tableThead.offsetHeight
            this.setState({
                scrollY
            })
        }

        const dom = me.querySelector('.ant-table-body')
        let tableH = me.querySelector('.ant-spin-nested-loading').offsetHeight || 0,
            tableHeadH = me.querySelector('.ant-table-thead').offsetHeight || 0,
            tableBodyH = me.querySelector('.ant-table-tbody').offsetHeight || 0,
            iTime, isWheel = false

        if (tableBodyH < tableH - tableHeadH) {
            me.querySelector('.ant-table-body').style.height = (tableH - tableHeadH) + 'px';
            me.querySelector('.ant-table-tbody').style.height = (tableH - tableHeadH) + 'px';
        }
        dom.addEventListener('mousewheel', (e) => {
            isWheel = true
        })

        dom.addEventListener('scroll', (e) => {
            if (!isWheel && this.lastHeight >= 0) {
                this.setState({
                    loading: true
                })
            }
            const tr = me.querySelector('.ant-table-body table .lazy_table_last')
            const top = me.querySelector('.ant-table-body').scrollTop
            let oldScrollTop = this.state.scrollTop
            // if(oldScrollTop && Math.abs(oldScrollTop - top) >)
            if (!tr) {

                const height = me.querySelector('.ant-table-body table').offsetHeight
                const { scrollY, scrollTop, rowHeight } = this.state
                if (Math.abs(scrollTop - top) < rowHeight) return
            }
            clearTimeout(iTime)
            let iThis = this
            iTime = setTimeout(function () {
                //需要执行的事件
                isWheel = false
                iThis.setState({
                    scrollTop: top,
                    loading: false,
                })
            }, 500);
        }, false)
    }

    componentWillReceiveProps = (nextProps) => {
        const { memoryWidth } = this.state
        let scrollY = nextProps.scroll && nextProps.scroll.y || 600
        if (nextProps.scroll && nextProps.scroll.y === true) {
            const me = ReactDOM.findDOMNode(this)
            const tableThead = me.getElementsByClassName('ant-table-thead')[0]
            scrollY = me.offsetHeight - tableThead.offsetHeight
        }
        if (nextProps.checkboxKey) {
            this.initCheckboxId(nextProps.dataSource)
        }
        let selectValue = nextProps.checkboxValue
        if (nextProps.checkboxValue) {
            selectValue = this.initSelectValue(nextProps.checkboxValue, nextProps.dataSource)
        }
        this.setState({
            rowHeight: nextProps.rowHeight || 36.8,
            showRows: nextProps.showRows || 20,
            scrollY,
            selectValue: selectValue
        })
        if (nextProps.allowColResize) {
            const { newCol, sumWidth } = this.initStateWidth(nextProps.columns, this.state.columns, memoryWidth)
            this.setState({
                columns: newCol,
                sumWidth
            })
        }
    }

    memoryWidth = (props) => {
        const { remberName } = props
        if (!remberName) {
            return {}
        }
        const memoryWidth = this.getAppData(remberName)
        return memoryWidth
    }

    getMaxLen = (dataStart, data, checkboxKey, showRows) => {
        let arr = [0], count = 0
        data = data.slice(dataStart, dataStart + showRows)
        data.map((o, k) => {
            if (o.checkboxKey && k > 0 && o.checkboxKey != data[k - 1][checkboxKey]) {
                count += 1
                arr.push(0)
            }
            arr[count] += 1
        })
        return Math.max.apply(null, arr)
    }

    getDataStart = (dataStart, data, checkboxKey) => {
        let arr = [dataStart]
        data.map((o, k) => {
            if (dataStart > 0 && data[dataStart] && data[dataStart][checkboxKey] == o[checkboxKey]) {
                arr.push(k)
            }
        })

        return [Math.min.apply(null, arr), arr.length, (this.calDataStart || 0) - Math.min.apply(null, arr)]
    }

    getDataSource = (data) => {
        if (!data) {
            return []
        }
        const { checkboxKey } = this.props
        const { scrollTop, rowHeight, scrollY } = this.state,
            lens = data.length

        /*初始化数据 showRows显示的数据行数、showHeight显示的数据高度、dataStart显示数据的第一行的index、
        calDataStart超出polyFillHeight部分本该隐藏的数据行的index、polyFillHeight超出可视区域顶部的数据加载高度、
        moreLen，moreHeight合并行超出polyFillHeight的部分*/

        let showRows = 200, //Math.floor(scrollY * 2 / rowHeight), 
            firstHeight = 0, lastHeight = 0, dataStart = 0, calDataStart = 0,
            data2 = JSON.parse(JSON.stringify(data)),
            showHeight = scrollY * 2, calDataHeight = 0,
            moreLen = 0, moreHeight = 0, firstDataLen = 1,
            polyFillHeight = 100 * rowHeight/*scrollY / 2*/, showMaxDataLen = 1

        /*根据单据的行数是否超过可视范围来定可视区域的行数、高度以及polyFillHeighti*/
        showMaxDataLen = this.getMaxLen((this.calDataStart || 1), data, checkboxKey, showRows)
        firstDataLen = this.getDataStart((this.calDataStart || 1), data, checkboxKey)[1] - 1
        console.log(showMaxDataLen, firstDataLen, '======================')
        firstDataLen = firstDataLen > showMaxDataLen ? firstDataLen : showMaxDataLen
        if (firstDataLen && firstDataLen > 200/*Math.floor(scrollY / rowHeight)*/) {
            showRows = firstDataLen * 2
            showHeight = showRows * rowHeight
            polyFillHeight = showHeight / 4
        }
        /*如果单据超出可视区域在未整体超出之前增加加载范围保证单据不被分割*/
        showRows = showRows + (this.moreLen || 0)
        showHeight = showHeight + (this.moreLen || 0) * rowHeight

        // console.log("dataStart: " + this.dataStart, "calDataStart: " + this.calDataStart, "showRows: " + showRows, "firstDataLen: " + firstDataLen,  '============================')
        const sumHeight = rowHeight * lens,
            dataHeight = showHeight

        if (scrollTop <= polyFillHeight) {
            lastHeight = sumHeight - dataHeight - polyFillHeight
        } else {
            firstHeight = scrollTop < sumHeight ? scrollTop - polyFillHeight : sumHeight - polyFillHeight
            // lastHeight = sumHeight - firstHeight - dataHeight - polyFillHeight
            calDataStart = Math.floor(firstHeight / rowHeight)
            calDataHeight = firstHeight
        }
        dataStart = Math.floor(firstHeight / rowHeight)
        dataStart = checkboxKey ? this.getDataStart(calDataStart, data, checkboxKey)[0] : dataStart
        moreLen = Math.floor(calDataHeight / rowHeight) - dataStart
        moreHeight = calDataHeight - dataStart * rowHeight
        /*如果单据超出可视区域在整体未超出之前动态计算滚动条位置*/
        firstHeight -= moreHeight
        if (this.dataStart && firstHeight > 0 && this.dataStart > 1 && data[this.dataStart] && data[this.dataStart][checkboxKey] && data[this.dataStart - 1] && data[this.dataStart - 1][checkboxKey] && data[this.dataStart][checkboxKey] != data[this.dataStart - 1][checkboxKey]) {
            /*如果单据超出可视区域在整体超出之前增加加载范围后移除*/
            firstHeight += (this.getDataStart(calDataStart - 1, data, checkboxKey)[1] - 1) * rowHeight
        }
        if (scrollTop >= polyFillHeight) {
            lastHeight = sumHeight - firstHeight - dataHeight - polyFillHeight
        }
        // console.log("firstHeight: " + firstHeight, "lastHeight: " + lastHeight, "moreLen:" + moreLen, '+++++++++++++++++++++++')

        this.moreHeight = moreHeight
        this.moreLen = moreLen
        this.dataStart = firstHeight > 0 ? dataStart - 1 : dataStart
        this.firstHeight = firstHeight
        this.lastHeight = lastHeight
        this.calDataStart = calDataStart
        const dataEnd = dataStart + showRows + moreLen
        data2 = data2.slice(dataStart, dataEnd)
        if (firstHeight > 0) {
            data2.unshift({
                name: 'first',
                height: firstHeight
            })
        }
        if (lastHeight > dataHeight) {
            data2.push({
                name: 'last',
                height: lastHeight,
            })
        }
        return data2
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

    onRow = (record, index) => {
        let style = {}
        if (record.height) {
            style.height = record.height + 'px'
        }
        if (record.position) {
            style.position = record.position
        }
        let onRowByProps = this.props.onRow ? this.props.onRow(record, index) : {};
        return {
            className: record.height ? `lazy_table_tr lazy_table_${record.name}` : null,
            style,
            key: Math.random(),
            ...onRowByProps
        }
    }

    renderColumns = (data) => {
        return data.map(item => {
            return item.render ? {
                ...item,
                render: (text, record, index) => {
                    return item.render(text, record, index + this.dataStart)
                }
            } : {
                    ...item
                }
        })

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

    renderChekbox = (type) => {
        const { checkboxKey } = this.props
        const { selectValue, columns } = this.state
        let dataStart = this.dataStart || 0
        return {
            title: <Checkbox {...this.showCheckboxType()} onClick={this.checkboxAllClick} />,
            dataIndex: 'checkboxKey',
            key: 'checkboxKey',
            className: "mk-table-checkbox",
            width: 34,
            render: (text, record, index) => {
                const obj = {
                    children: record[checkboxKey] ? <Checkbox
                        checked={selectValue.has(record[checkboxKey])}
                        // disabled = {record['checkboxDisabled']}
                        onClick={(e) => this.checkboxItemClick(e, record[checkboxKey], record)}
                    /> : null,
                    props: {
                        rowSpan: this.rowSpan(text, record, index + this.dataStart),
                    },
                }
                return obj
            }
        }

    }

    render() {
        const { scrollY, sumWidth } = this.state
        let scrollX = this.props.dataSource && this.props.dataSource.length > 0 ? sumWidth : null
        if (this.props.emptyShowScroll) {
            scrollX = sumWidth
        }
        let renderColumn = this.renderColumns(this.props.columns)
        if (this.props.checkboxKey && !this.props.disCheckBox) {
            renderColumn = [this.renderChekbox(), ...renderColumn]
        }
        const columns3 = this.decorateColumns(renderColumn)
        let columns4 = this.decorateHeaderTitle(columns3)
        if (this.state.resizeColumn) {
            columns4 = this.addColumn(columns3)
        }
        return (
            <Table
                {...this.props}
                onRow={this.onRow}
                loading={this.state.loading || this.props.loading}
                dataSource={this.getDataSource(this.props.dataSource)}
                scroll={{ y: scrollY, x: scrollX }}
                components={this.components}
                columns={columns4}
            />
        )
    }

    initCheckboxId = (data, type) => {
        if (!data) {
            return
        }
        data = data.filter(o => o.batchcheckboxDisabled == false || o.batchcheckboxDisabled == undefined)
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

    checkAllItem = () => {
        let { selectValue } = this.state,
            checkboxId = this.initCheckboxId(this.props.dataSource, 'get')
        let flag = true
        checkboxId.map((item, key) => {
            if (!selectValue.has(key) && typeof key != "undefined") {
                flag = false
            }
        })
        return flag
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

    update = (data, record) => {
        if (this.props.checkboxChange) {
            const arr = []
            const arrValue = []
            const { selectValue } = this.state
            data.map((value, key) => {
                arr.push(key)
                if (value.batchcheckboxDisabled == false || value.batchcheckboxDisabled == undefined) {
                    arrValue.push(value)
                }

            })
            this.props.checkboxChange(arr, arrValue, record)
        }
    }

    getcheckboxAllDisabled = () => {
        let dataSource = this.props.dataSource, disabled = true
        let item = dataSource.find(o => {
            if (!o.batchcheckboxDisabled) {
                return o
            }
        })
        if (item) {
            disabled = false
        }
        return disabled
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
    initStateWidth = (data, columns, memoryWidth) => {
        if (!data) {
            return []
        }
        // let sumWidth = 0
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
                appContainerWidth = dom.offsetWidth - 160 + 80
            } else {
                appContainerWidth = window.innerWidth - 100 - 160 + 80
            }

        } catch (err) {
            console.log(err)
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
            // if (sumWidth1 + 80 + 60 < appContainerWidth && !item.fixed) {
            //     item.width = avrWidth
            // }
            // sumWidth = sumWidth + parseFloat(item.width)

            return item
        })
        this.state.appContainerWidth = appContainerWidth
        return { newCol, sumWidth: sumWidth1 > appContainerWidth ? sumWidth1 : appContainerWidth + 50 }

    }

    showTheadTitle = (title) => {
        if (Object.prototype.toString.call(title) == "[object String]") {
            return <span title={title}>{title}</span>
        } else {
            return title
        }
    }

    decorateColumns = (columns) => {
        return columns.map((col, index) => {
            if (!(col.tip == false) && !col.render && col.dataIndex) {
                col.render = this.rnederTitle
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

    handleResize = index => (e, { size }) => {
        const { columns, appContainerWidth } = this.state
        delete columns[columns.length - 1]
        const Index = columns.findIndex(item => {
            return item && item.dataIndex == index
        })
        if (Index == -1) {
            return
        }
        let preWidth = columns[Index].width
        columns[Index].width = size.width
        let sumWidth = 0,
            columnDetails = [],
            param = {}
        columns.forEach(item => {

            columnDetails.push({
                fieldName: item.dataIndex,
                width: item.width,
                isVisible: true
            })
            sumWidth = sumWidth + item.width
        })
        param.columnDetails = columnDetails

        if (sumWidth <= appContainerWidth) {
            columns[Index].width = preWidth
        }
        this.setState({
            columns: columns,
            sumWidth
        })

        let that = this, res
        this.onResizend(function () {
            res = that.props.onResizeEnd(param)

        })

    }

    components = {
        header: {
            cell: ResizeableTitle,
        },
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

    decorateHeaderTitle = (column) => {

        if (!column) {
            return undefined
        }
        return column.map(item => {
            return this.getChildrenTitle(item)
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
            else if (typeof (item.children.keys) == 'function') {
                for (const value of item.children.keys()) {
                    arr.push(this.getChildrenTitle(value))
                }
            }
            obj.children = arr
        }
        return obj
    }

    addColumn = (data) => {
        const me = ReactDOM.findDOMNode(this)
        if (!me) {
            return data
        }
        const containerWidth = me.offsetWidth
        let setWidthSum = 0
        data.forEach(item => {
            setWidthSum = setWidthSum + parseFloat(item.width)
        })
        if (setWidthSum > containerWidth) {
            return data
        }
        let remain = containerWidth - setWidthSum - 10
        if (this.props.rowSelection) {
            let columnWidth = this.props.rowSelection.columnWidth
            if (typeof columnWidth === 'string') {
                columnWidth = Number(columnWidth.replace(/px/g, ''))
            }
            columnWidth = columnWidth || 60
            remain -= columnWidth
        }
        data.splice(data.length - 1, 0, {
            dataIndex: 'remain',
            title: <span></span>,
            key: 'remain',
            width: remain
        })
        return data
    }
}