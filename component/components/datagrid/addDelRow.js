import React from 'react'
import { Table, Column, Cell } from 'fixed-data-table-2'
import Icon from '../icon'

export default function AddDelrow(props) {
	const {
		enableAddDelrow, //启用增删行功能
		onAddrow, //增行事件
		onDelrow, //删行事件
	} = props
	
	const getContent = (ps) => {
		return <div className='mk-datagrid-addDelRow-cell'>
			{enableAddDelrow ? <Icon title="増行" type="plus-circle-o" className='mk-datagrid-editable-add-row' onClick={() => onAddrow ? onAddrow(ps) : undefined} /> : null}
			{enableAddDelrow ? <Icon title="删行" type="minus-circle-o" className='mk-datagrid-editable-remove-row' onClick={() => onDelrow ? onDelrow(ps) : undefined} /> : null}
		</div>
	}
	
	return (
		<Column
			key="_sequence"
			width={0}
			fixed={true}
			cell={ps => getContent(ps)}
			header={
				<Cell style={{position: 'relative', left: '-25px', background: '#fff', width: '24px'}}></Cell>
			}
			footer={
				<Cell style={{position: 'relative', left: '-25px', background: '#fff', width: '24px'}}></Cell>
			}
		/>
	)
}



