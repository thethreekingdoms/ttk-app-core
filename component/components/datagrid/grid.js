import React from 'react'
import ReactDOM from 'react-dom'
import {
	Table
} from 'fixed-data-table-2'
import SequenceColumn from './sequenceColumn'
import AddDelRow from './addDelRow'
import UpDownRow from './upDownRow'
import NoData from '../nodata'
import Spin from '../spin'

export default function GridComponent(props) {
	let {
		key,
		rowsCount,
		headerHeight,
		rowHeight,
		groupHeaderHeight,
		footerHeight,
		width,
		height,
		heightFromRowsCount,
		readonly,
		enableSequence,
		enableSequenceAddDelrow,
		startSequence,
		enableAddDelrow,
		enableUpDownrow,
		sequenceFooter,
		onAddrow,
		onDelrow,
		onUprow,
		onDownrow,
		onRowClick,
		onRowDoubleClick,
		onRowMouseEnter,
		onRowMouseLeave,
		onScrollEnd,
		scrollToRow,
		scrollToColumn,
		columns,
		isColumnSort,
		isColumnResizing,
		allowColumnResize,
		onColumnResizeEndCallback,
		onColumnResizeEnd,
		onSortChange,
		...other,
	} = props

	//高度根据行数计算
	if (heightFromRowsCount) {
		height = headerHeight + 2 + rowHeight * rowsCount + footerHeight
	}

	columns = [...columns]

	if (enableSequence) {
		if (columns.length > 0 && columns[0] && columns[0].props && columns[0].props.children) {
			columns[0].props.children.splice(0, 0, SequenceColumn({
				startSequence,
				enableSequenceAddDelrow: readonly === false ? enableSequenceAddDelrow : false,
				footer: sequenceFooter,
				onAddrow,
				onDelrow
			}))
		} else {
			columns.splice(0, 0, SequenceColumn({
				startSequence,
				enableSequenceAddDelrow: readonly === false ? enableSequenceAddDelrow : false,
				footer: sequenceFooter,
				onAddrow,
				onDelrow
			}))
		}
	}
	/**
	 * 行插入、删除
	 */
	if (enableAddDelrow) {
		columns.splice(0, 0, AddDelRow({
			enableAddDelrow: readonly === false ? enableAddDelrow : false,
			onAddrow,
			onDelrow
		}))
	}

	/**
	 * 行上移、下移
	 */
	if (enableUpDownrow) {
		columns.splice(0, 0, UpDownRow({
			enableUpDownrow: readonly === false ? enableUpDownrow : false,
			onUprow,
			onDownrow,
			width
		}))
	}

	/**
	 * 允许表格拖宽
	 */
	if (isColumnResizing) {
		isColumnResizing = !isColumnResizing
	}

	onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
		if (newColumnWidth < 41) newColumnWidth = 41
		onColumnResizeEnd && onColumnResizeEnd(newColumnWidth, columnKey)
	}

	onSortChange = (columnKey, sortDir) => {
	}

	//排序类型
	let SortTypes = {
		ASC: 'ASC',
		DESC: 'DESC'
	}

	//计算scroll值
	// let scrollOffsetHeight = (props.oldRowsCount - rowsCount) * rowHeight
	// 	scrollOffsetHeight = scrollOffsetHeight > 0 ? 0 : scrollOffsetHeight
	// let scrollLeft = 0,
	// 	scrollTop = props.scrollTop || 0
	// scrollTop += scrollOffsetHeight

	// scrollTop = scrollTop < 0 ? 0 : scrollTop
	// scrollToRow = parseInt(scrollTop / rowHeight)


	let size = props.loading && props.loading.size ? props.loading.size : 'large',
		tip = props.loading && props.loading.tip ? props.loading.tip : "数据加载中...",
		delay = props.delay ? props.delay : 2000,
		spinning = props.loading && props.loading.hasOwnProperty('spinning') ? props.loading.spinning : props.loading
	if (rowsCount == 0 || height == 0 || width == 0) {
		return (
			<div>
				{
					!props.loading ?
						<div style={{ position: 'relative' }}>
							<Table
								{...other}
								key={key}
								rowsCount={(height == 0 || width == 0) ? 0 : rowsCount}
								headerHeight={headerHeight}
								rowHeight={rowHeight}
								groupHeaderHeight={groupHeaderHeight}
								footerHeight={footerHeight}
								width={width}
								height={height + 2}
								isColumnResizing={false}
								onColumnResizeEndCallback={onColumnResizeEndCallback}
								scrollToRow={(height != 0 && width != 0) ? scrollToRow : undefined}
								scrollToColumn={(height != 0 && width != 0) ? scrollToColumn : undefined}
								onRowDoubleClick={readonly === false ? undefined : onRowDoubleClick}
								onRowClick={readonly === false ? undefined : onRowClick}
								onRowMouseEnter={readonly === true ? undefined : onRowMouseEnter}
								onRowMouseLeave={readonly === false ? undefined : onRowMouseLeave}
								onScrollEnd={onScrollEnd}
							>{columns}
							</Table>
							<NoData style={{ position: 'absolute', height: '220px', top: '50%', marginTop: '-110px' }}>暂无数据</NoData>
						</div>
						:
						<Spin delay={delay} size={size} tip={tip} {...props.loading}>
							<Table
								{...other}
								key={key}
								rowsCount={(height == 0 || width == 0) ? 0 : rowsCount}
								headerHeight={headerHeight}
								rowHeight={rowHeight}
								groupHeaderHeight={groupHeaderHeight}
								footerHeight={footerHeight}
								width={width}
								height={height + 2}
								isColumnResizing={false}
								onColumnResizeEndCallback={onColumnResizeEndCallback}
								scrollToRow={(height != 0 && width != 0) ? scrollToRow : undefined}
								scrollToColumn={(height != 0 && width != 0) ? scrollToColumn : undefined}
								onRowDoubleClick={readonly === false ? undefined : onRowDoubleClick}
								onRowClick={readonly === false ? undefined : onRowClick}
								onRowMouseEnter={readonly === true ? undefined : onRowMouseEnter}
								onRowMouseLeave={readonly === false ? undefined : onRowMouseLeave}
								onScrollEnd={onScrollEnd}
							>{columns}
							</Table>
						</Spin>
				}
			</div>
		)
	}

	return (
		<div>
			{
				props.loading ?
					<Spin delay={delay} size={size} tip={tip} {...props.loading}>
						<Table
							{...other}
							key={key}
							rowsCount={(height == 0 || width == 0) ? 0 : rowsCount}
							headerHeight={headerHeight}
							rowHeight={rowHeight}
							groupHeaderHeight={groupHeaderHeight}
							footerHeight={footerHeight}
							width={width}
							height={height + 2}
							isColumnResizing={false}
							onColumnResizeEndCallback={onColumnResizeEndCallback}
							scrollToRow={(height != 0 && width != 0) ? scrollToRow : undefined}
							scrollToColumn={(height != 0 && width != 0) ? scrollToColumn : undefined}
							onRowDoubleClick={readonly === false ? undefined : onRowDoubleClick}
							onRowClick={readonly === false ? undefined : onRowClick}
							onRowMouseEnter={readonly === true ? undefined : onRowMouseEnter}
							onRowMouseLeave={readonly === false ? undefined : onRowMouseLeave}
							onScrollEnd={onScrollEnd}
						>{columns}
						</Table>
					</Spin>
					:
					<Table
						{...other}
						key={key}
						rowsCount={(height == 0 || width == 0) ? 0 : rowsCount}
						headerHeight={headerHeight}
						rowHeight={rowHeight}
						groupHeaderHeight={groupHeaderHeight}
						footerHeight={footerHeight}
						width={width}
						height={height + 2}
						isColumnResizing={false}
						onColumnResizeEndCallback={onColumnResizeEndCallback}
						scrollToRow={(height != 0 && width != 0) ? scrollToRow : undefined}
						scrollToColumn={(height != 0 && width != 0) ? scrollToColumn : undefined}
						onRowDoubleClick={readonly === false ? undefined : onRowDoubleClick}
						onRowClick={readonly === false ? undefined : onRowClick}
						onRowMouseEnter={readonly === true ? undefined : onRowMouseEnter}
						onRowMouseLeave={readonly === false ? undefined : onRowMouseLeave}
						onScrollEnd={onScrollEnd}
					>{columns}
					</Table>
			}
		</div>

	)
}