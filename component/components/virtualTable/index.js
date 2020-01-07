import React, { PureComponent } from "react"
import { VariableSizeList as List } from "./react-window"
import classNames from "classnames"
import { Table, Spin } from "antd"
import { NoData, Table as TtkTable } from "edf-component"
import { Resizable } from "react-resizable"
const fun = function() {}

/**
 * VirualTable，对列采用了定宽，对行定高策略
 * 1、在使用过程中，请给table一个固定style.width、一个固定scroll.x；
 * 2、如果style.width>scroll.x，请确保colums中有一列是未设宽。
 * 3、如果style.width<scroll.x，请确保每一列都有宽度
 * 4、使用事例，请参考 inv-app-ledger-list/action.js
 */
export default class VirtualTable extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
        // 滚动条宽
        this.scrollBarWidth = !/AppleWebKit\/(\S+)/.test(navigator.userAgent)
            ? 18
            : /Edge\/(\S+)/.test(navigator.userAgent)
            ? 18
            : 12
        this.vrTableClass = "virtual-table-" + new Date().valueOf()
        this.vrGridId = "virtual-grid-" + new Date().valueOf()
    }
    componentDidMount() {
        this.tableBodyAddEventListener()
    }
    componentWillUnmount() {
        const dom = document.querySelector(
            "." + this.vrTableClass + " .ant-table-body"
        )
        if (dom) {
            removeEvent(dom, "scroll", ::this.onTableScroll)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.tableNotMount) {
            this.tableBodyAddEventListener()
        }
        const dom = document.querySelector(
            "." + this.vrTableClass + " .virtual-grid-main-scrollbar"
        )
        // window resize后，自定义滚动条位置修正
        if (dom) {
            const offsetLeft = document.querySelector(
                    "." + this.vrTableClass + " .ant-table-body"
                ).offsetWidth,
                left = offsetLeft - this.scrollBarWidth + 1 + "px"
            if (dom.style.left !== left) dom.style.left = left
        }
    }
    tableBodyAddEventListener() {
        const dom = document.querySelector(
            "." + this.vrTableClass + " .ant-table-body"
        )
        if (dom) {
            this.tableNotMount = false
            addEvent(dom, "scroll", ::this.onTableScroll)
        } else {
            this.tableNotMount = true
        }
    }
    onTableScroll(e) {
        // 滚动条位置
        const dom = document.querySelector(
            "." + this.vrTableClass + " .virtual-grid-main-scrollbar"
        )
        if (dom) {
            let offsetLeft = document.querySelector(
                "." + this.vrTableClass + " .ant-table-body"
            ).offsetWidth
            dom.style.left =
                offsetLeft -
                this.scrollBarWidth +
                1 +
                e.target.scrollLeft +
                "px"
        }
    }
    onScroll({ scrollDirection, scrollOffset }) {
        let tableHeader = document.getElementsByClassName("ant-table-thead") &&document.getElementsByClassName("ant-table-thead")[0],
            tableHeaderWidth = tableHeader && tableHeader.scrollWidth,
            vrgrid = document.getElementsByClassName(this.vrGridId)

        if (vrgrid && vrgrid.length > 0) {
            // document.querySelectorAll("." + this.vrGridId).forEach((dom, i) => {
            //     dom.scrollTop = scrollOffset
            //     if (i === 0) {
            //         dom.style.width = tableHeaderWidth + "px"
            //     }
            // })

            let dom
            for (var i = 0; i < vrgrid.length; i++) {
                dom = vrgrid[i]
                dom.scrollTop = scrollOffset
                if (i === 0) {
                    dom.style.width = tableHeaderWidth + "px"
                }
            }
        }
    }
    onRowMouseEnter(rowIndex, e) {
        if (
            document.querySelectorAll(
                "." + this.vrGridId + " .virtual-table-row.row-" + rowIndex
            )
        ) {
            // document.querySelectorAll("." + this.vrGridId + " .virtual-table-row.row-" + rowIndex)
            //     .forEach(dom => {
            //         if (dom) {
            //             dom.className = [
            //                 ...new Set(
            //                     dom.className
            //                         .split(" ")
            //                         .concat("virtual-table-row-hover")
            //                 )
            //             ].join(" ")
            //         }
            //     })

            let vrGrid = document.querySelectorAll("." + this.vrGridId + " .virtual-table-row.row-" + rowIndex),
                dom

            for (var i = 0; i < vrGrid.length; i++) {
                dom = vrGrid[i]

                if (dom) {
                    dom.className = [
                        ...new Set(
                            dom.className
                                .split(" ")
                                .concat("virtual-table-row-hover")
                        )
                    ].join(" ")
                }
            }
        }

        const { onRow, dataSource = [] } = this.props,
            { onMouseEnter } = (onRow && onRow(dataSource[rowIndex])) || {}
        onMouseEnter && onMouseEnter(e)
    }
    onRowMouseLeave(rowIndex, e) {
        if (
            document.querySelectorAll(
                "." + this.vrGridId + " .virtual-table-row.row-" + rowIndex
            )
        ) {
            // document.querySelectorAll("." + this.vrGridId + " .virtual-table-row.row-" + rowIndex)
            //     .forEach(dom => {
            //         if (dom) {
            //             dom.className = dom.className.replace(
            //                 "virtual-table-row-hover",
            //                 ""
            //             )
            //         }
            //     })

            let vrGrid = document.querySelectorAll("." + this.vrGridId + " .virtual-table-row.row-" + rowIndex),
                dom

            for (var i = 0; i < vrGrid.length; i++) {
                dom = vrGrid[i]

                if (dom) {
                    dom.className = dom.className.replace(
                        "virtual-table-row-hover",
                        ""
                    )
                }
            }
        }

        const { onRow, dataSource = [] } = this.props,
            { onMouseLeave } = (onRow && onRow(dataSource[rowIndex])) || {}
        onMouseLeave && onMouseLeave(e)
    }
    onRowClick(rowIndex, e) {
        const { onRow, dataSource = [] } = this.props,
            { onClick } = (onRow && onRow(dataSource[rowIndex])) || {}
        onClick && onClick(e)
    }
    onRowDoubleClick(rowIndex, e) {
        const { onRow, dataSource = [] } = this.props,
            { onDoubleClick } = (onRow && onRow(dataSource[rowIndex])) || {}
        onDoubleClick && onDoubleClick(e)
    }
    onRowContextMenu(rowIndex, e) {
        const { onRow, dataSource = [] } = this.props,
            { onContextMenu } = (onRow && onRow(dataSource[rowIndex])) || {}
        onContextMenu && onContextMenu(e)
    }
    rowHeight(index) {
       
        return 37
    }
    flat(cols) {
        cols = cols.flatMap(item => {
            if (item.children) {
                item = this.flat(item.children)
            }
            return item
        })
        return cols
    }
    addSelectRow(cols, props) {
        const item = (props.children[0]
                ? props.children[0].props.columns
                : []
            ).find(f => f.key === "selection-column"),
            { rowSelection } = this.props
        if (!item || !rowSelection) return cols
        const { columnWidth } = rowSelection
        ;(item.width =
            typeof columnWidth === "string"
                ? columnWidth.replace("px", "")
                : columnWidth || 62),
            cols.splice(0, 0, item)
        return cols
    }
    computeProps(fixed, _columns) {
        let tableWidth = 0,
            marginLeft = 0,
            marginRight = 0,
            unSetWidthColumn = 0,
            scrollHidden = false
        switch (fixed) {
            case "left":
                scrollHidden = true
                tableWidth = _columns
                    .filter(f => f.fixed === "left")
                    .map(m => m.width)
                    .reduce((a, b) => a + b, 0)
                break
            case "right":
                tableWidth = _columns
                    .filter(f => f.fixed === "right")
                    .map(m => m.width)
                    .reduce((a, b) => a + b, 0)
                break
            default:
                if (_columns.some(s => s.fixed === "right")) {
                    marginRight = _columns
                        .filter(f => f.fixed === "right")
                        .map(m => m.width)
                        .reduce((a, b) => a + b, 0)
                    scrollHidden = true
                }
                if (_columns.some(s => s.fixed === "left")) {
                    marginLeft = _columns
                        .filter(f => f.fixed === "left")
                        .map(m => m.width)
                        .reduce((a, b) => a + b, 0)
                }
                unSetWidthColumn =
                    scroll.x -
                    _columns.map(m => m.width || 0).reduce((a, b) => a + b, 0)
                break
        }
        return {
            tableWidth,
            marginLeft,
            marginRight,
            unSetWidthColumn,
            scrollHidden
        }
    }
    renderVirtualList(props) {
        // fixed 的列，width不能为空。
        const {
                scroll,
                style: tableStyle,
                columns: tempColumns,
                dataSource: rawData,
                rowHeight,
                rowClassName,
                rowSelection,
                rowKey = "key",
                matchIndex
            } = this.props,
            _columns = this.addSelectRow(this.flat(tempColumns), props),
            fixed = props.children[0].props.fixed,
            columns = _columns.filter(f => f.fixed === fixed)
        let selectedRowKeys = [],
            overflowX = "hidden",
            overflowY = "scroll",
            {
                tableWidth,
                marginLeft,
                marginRight,
                unSetWidthColumn,
                scrollHidden
            } = this.computeProps(fixed, _columns)
        const noWidthColumns = columns.filter(({ width }) => !width).length,
            mergedColumns = columns.map(column => {
                if (column.width) {
                    if (typeof column.width === "string")
                        column.width = column.width.replace("px", "")
                    return column
                }
                return {
                    ...column,
                    flex: column.flex || 1,
                    width:
                        unSetWidthColumn > 0
                            ? Math.floor(unSetWidthColumn / noWidthColumns)
                            : 100
                }
            }),
            // 单元格内容，可执行列配置的render方法
            renderCell = (columnIndex, rowIndex) => {
                const cell = mergedColumns[columnIndex],
                    dataIndex =
                        typeof cell.dataIndex === "function"
                            ? cell.dataIndex(rawData[rowIndex])
                            : cell.dataIndex
                return cell.render
                    ? cell.render(
                          rawData[rowIndex][dataIndex],
                          rawData[rowIndex],
                          rowIndex
                      )
                    : rawData[rowIndex][dataIndex]
            },
            // 列宽，最后一列特殊处理
            columnWidth = index => {
                const { width } = mergedColumns[index]
                if (!fixed && !marginRight) {
                    return index === mergedColumns.length - 1
                        ? width - this.scrollBarWidth + 2
                        : width
                }
                return fixed === "right" && index === mergedColumns.length - 1
                    ? width - this.scrollBarWidth + 2
                    : width
            },
            // 行中的每一列
            renderCols = (record, index) =>
                mergedColumns.map((col, i) => {
                    const { onCell } = col,
                        {
                            onClick: onCellClick,
                            onMouseEnter: onCellMouseEnter,
                            onMouseLeave: onCellMouseLeave,
                            onDoubleClick: onCellDoubleClick,
                            onContextMenu: onCellContextMenu
                        } = (onCell && onCell(record)) || {}
                    let cell = renderCell(i, index),
                        colWidth = 0,
                        colFlex = 0,
                        colHeight = 0,
                        { props, children } =
                            Object.prototype.toString.call(cell) ===
                            "[object Object]"
                                ? cell
                                : {}
                    if (props) {
                        const { colSpan } = props
                        if (colSpan === 0) return null
                        if (colSpan) {
                            if (colSpan > 1)
                                // mergedColumns.forEach((o, ii) => {
                                //     if (ii >= i && ii < i + colSpan) {
                                //         colWidth += o.width
                                //         colFlex += o.flex || 0
                                //     }
                                // })
                                for (var j = 0; j < mergedColumns.length; j++) {
                                    if (j >= i && j < i + colSpan) {
                                        colWidth += mergedColumns[j].width
                                        colFlex += mergedColumns[j].flex || 0
                                    }
                                }
                            cell = children
                        }
                    }

                    return (
                        <div
                            key={col.key || col.dataIndex}
                            className={classNames(
                                "virtual-table-cell",
                                {
                                    "virtual-table-cell-last":
                                        i === mergedColumns.length - 1
                                },
                                col.className || ""
                            )}
                            style={{
                                width: colWidth || columnWidth(i),
                                flex: colFlex || col.flex || "none",
                                textAlign:
                                    (col.key === "selection-column" &&
                                        "center") ||
                                    col.align ||
                                    "left"
                            }}
                            onMouseEnter={onCellMouseEnter || fun}
                            onMouseLeave={onCellMouseLeave || fun}
                            onClick={onCellClick || fun}
                            onDoubleClick={onCellDoubleClick || fun}
                            onContextMenu={onCellContextMenu || fun}
                        >
                            {cell}
                        </div>
                    )
                }),
            // list的每一行
            renderListRow = ({ index, style }) => {
                if (rowSelection) selectedRowKeys = rowSelection.selectedRowKeys

                const record = rawData[index],
                    dataIndex =
                        typeof rowKey === "function" ? rowKey(record) : rowKey,
                    rowSelected = selectedRowKeys.some(
                        s => s === record[dataIndex]
                    )

                return (
                    <div
                        className={classNames(
                            "virtual-table-row",
                            "row-" + index,
                            { "virtual-table-row-selected": rowSelected },
                            rowClassName ? rowClassName(index) : "",
                            matchIndex != -1 && matchIndex == index
                                ? "currentScrollRow"
                                : "",
                            record.accountName == "合计" ? "total" : ""
                        )}
                        style={{
                            ...style,
                            paddingLeft: marginLeft,
                            paddingRight: marginRight
                        }}
                        onMouseEnter={e => this.onRowMouseEnter(index, e)}
                        onMouseLeave={e => this.onRowMouseLeave(index, e)}
                        onClick={e => this.onRowClick(index, e)}
                        onDoubleClick={e => this.onRowDoubleClick(index, e)}
                        onContextMenu={e => this.onRowContextMenu(index, e)}
                    >
                        {renderCols(record, index)}
                    </div>
                )
            }
        if (
            !fixed &&
            !marginRight &&
            tableStyle.width &&
            tableStyle.width.replace("px", "") <= scroll.x
        ) {
            // 不是左右固定列，且表格容器宽<列宽
            return (
                <React.Fragment>
                    <List
                        style={{ overflowX, overflowY }}
                        className={classNames(this.vrGridId, {
                            "scroll-hidden": scrollHidden
                        })}
                        height={scroll.y || rawData.length * 37 || 100}
                        itemCount={rawData.length}
                        itemSize={rowHeight || this.rowHeight}
                        width={tableWidth || "100%"}
                        onScroll={::this.onScroll}
                    >
                        {renderListRow}
                    </List>
                    <List
                        className={classNames(
                            this.vrGridId,
                            "virtual-grid-main-scrollbar"
                        )}
                        height={scroll.y || rawData.length * 37 || 100}
                        itemCount={rawData.length}
                        itemSize={rowHeight || this.rowHeight}
                        width={this.scrollBarWidth - 1}
                        style={{
                            overflowX: "hidden",
                            overflowY: "scroll",
                            position: "absolute"
                        }}
                        onScroll={::this.onScroll}
                    >
                        {() => <div>&nbsp;</div>}
                    </List>
                </React.Fragment>
            )
        }
        return (
            <List
                style={{ overflowX, overflowY }}
                className={classNames(this.vrGridId, {
                    "scroll-hidden": scrollHidden
                })}
                height={scroll.y || rawData.length * 37 || 100}
                itemCount={rawData.length}
                itemSize={rowHeight || this.rowHeight}
                width={tableWidth || "100%"}
                onScroll={::this.onScroll}
            >
                {renderListRow}
            </List>
        )
    }
    render() {
        const {
            className,
            scroll,
            dataSource,
            emptyText,
            loading,
            delay,
            key,
            matchIndex
        } = this.props

        let tableHeight =
                document.getElementsByClassName(scroll.class) &&
                document.getElementsByClassName(scroll.class)[0],
            tableHeader =
                document.getElementsByClassName("ant-table-thead") &&
                document.getElementsByClassName("ant-table-thead")[0],
            tableHeightY = tableHeight && tableHeight.scrollHeight

        if (tableHeight) {
            scroll.y = tableHeightY - scroll.h
        }

        if (dataSource && dataSource.length) {
            if (tableHeader && document.querySelectorAll("." + this.vrGridId)) {
                // document.querySelectorAll("." + this.vrGridId)
                //     .forEach((dom, i) => {
                //         if (i === 0) {
                //             dom.style.width = scroll.x + "px"
                //             if (matchIndex != -1) {
                //                 dom.scrollTop = matchIndex * 37
                //             }
                //         }
                //     })

                let vrGrid = document.querySelectorAll("." + this.vrGridId), dom

                for (var i = 0; i < vrGrid.length; i++) {
                    dom = vrGrid[i]

                    if (i === 0) {
                        dom.style.width = scroll.x + "px"
                        if (matchIndex != -1) {
                            dom.scrollTop = matchIndex * 37
                        }
                    }
                }
            }
            if(!scroll.y && scroll.w) {
                this.props.shouldRender && this.props.shouldRender()
            }
            return (
                <Table
                    {...this.props}
                    key={key || this.vrTableClass}
                    className={classNames(
                        "virtual-table",
                        this.vrTableClass,
                        className
                    )}
                    scroll={{
                        x: scroll.x + 1,
                        y: scroll.y + (this.scrollBarWidth > 12 ? 30 : 12)
                    }}
                    components={{
                        header: {
                            cell: ResizeableTitle
                        },
                        body: {
                            wrapper: this.renderVirtualList.bind(this)
                        }
                    }}
                    pagination={false}
                    locale={{
                        emptyText: <NoData>{emptyText || "暂无数据"}</NoData>
                    }}
                ></Table>
            )
        }
        return (
            <Spin spinning={loading} tip="数据加载中..." delay={delay || 200}>
                <TtkTable
                    {...this.props}
                    loading={false}
                    key={key || this.vrTableClass + "-1"}
                    className={classNames("virtual-table", className)}
                ></TtkTable>
            </Spin>
        )
    }
}
/**
 * 添加事件
 * @Author   weiyang.qiu
 * @DateTime 2019-11-11T11:00:36+0800
 * @param    {element}                 ele     元素
 * @param    {string}                 funName 方法名
 * @param    {function}                 fun     方法
 * @return   {undefined}                         无返回值
 */
const addEvent = (ele, funName, fun) => {
    if (!ele) return
    if (ele.addEventListener) {
        ele.addEventListener(funName, fun, false)
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + funName, fun)
    } else {
        ele["on" + funName] = fun
    }
}
const removeEvent = (ele, funName, fun) => {
    if (!ele) return
    if (ele.removeEventListener) {
        ele.removeEventListener(funName, fun, false)
    } else if (win.detachEvent) {
        ele.detachEvent("on" + funName, fun)
    } else {
        ele["on" + funName] = undefined
    }
}
const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props

    if (!width) {
        return <th {...restProps} />
    }

    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    )
}
