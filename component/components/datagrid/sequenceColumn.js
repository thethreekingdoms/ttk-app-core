import React from 'react'
import { Table, Column, Cell } from 'fixed-data-table-2'
import Icon from '../icon'

export default function SequenceColumn(props) {
	const {
		enableLink, //启用链接
		startSequence, //开始序号值
		enableSequenceAddDelrow, //启用增删行功能
		footer, //脚
		onAddrow, //增行事件
		onDelrow, //删行事件
		onClick, //点击事件
	} = props

	const getContent = (ps) => {
		//序号列显示内容，如果有开始序号那么加上
		let text = startSequence ? (startSequence + ps.rowIndex) + '' : (ps.rowIndex + 1) + ''

		//启用链接，会响应click事件
		if (enableLink) {
			return (
				<div className='mk-datagrid-sequence-cell' onClick={onClick ? () => onClick(ps) : undefined}>
					{enableSequenceAddDelrow ? <Icon title="増行" type="plus-circle-o" className='mk-datagrid-editable-add-row' onClick={() => onAddrow ? onAddrow(ps) : undefined} /> : null}
					<a className = {enableSequenceAddDelrow ? 'addDelrow' : ''}>
						{text}
					</a>
					{enableSequenceAddDelrow ? <Icon title="删行" type="minus-circle-o" className='mk-datagrid-editable-remove-row' onClick={() => onDelrow ? onDelrow(ps) : undefined} /> : null}
				</div>
			)
		}

		return <div className='mk-datagrid-sequence-cell'>
			{enableSequenceAddDelrow ? <Icon title="増行" type="plus-circle-o" className='mk-datagrid-editable-add-row' onClick={() => onAddrow ? onAddrow(ps) : undefined} /> : null}
			<a className = {enableSequenceAddDelrow ? 'addDelrow' : ''} style={{ color: "#444444", cursor: "default" }}>
				{text}
			</a>
			{enableSequenceAddDelrow ? <Icon title="删行" type="minus-circle-o" className='mk-datagrid-editable-remove-row' onClick={() => onDelrow ? onDelrow(ps) : undefined} /> : null}
		</div>
	}



	return (
		<Column
			key="_sequence"
			width={42}
			fixed={true}
			cell={ps => getContent(ps)}
			header={
				<Cell>序号</Cell>
			}
			footer={footer}
		/>
	)


}

