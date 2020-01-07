import React from 'react'
import { Table, Column, Cell } from 'fixed-data-table-2'
import Icon from '../icon'

export default function AddDelrow(props) {
	const {
		enableUpDownrow, //启用上下移行功能
		onUprow, //上移行事件
		onDownrow, //下移行事件
		width
	} = props
	
	const getContent = (ps) => {
		return <div className='mk-datagrid-upDownRow-cell' style={{position: 'relative', left: width}}>
			{enableUpDownrow ? <Icon title="上移" type="up" className='mk-datagrid-editable-up-row' onClick={() => onUprow ? onUprow(ps) : undefined} /> : null}
			{enableUpDownrow ? <Icon title="下移" type="down" className='mk-datagrid-editable-down-row' onClick={() => onDownrow ? onDownrow(ps) : undefined} /> : null}
		</div>
	}
	return (
		<Column
			key="_sequence"
			width={0}
			cell={ps => getContent(ps)}
			fixed={true}
			header={
				<Cell style={{position: 'relative', left: width, background: '#fff', width: '24px'}}></Cell>
			}
			footer={
				<Cell style={{position: 'relative', left: width, background: '#fff', width: '24px'}}></Cell>
			}
		/>
	)
}



