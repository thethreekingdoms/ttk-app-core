import React from 'react'
import { Transfer } from 'antd'
import classNames from 'classnames'

export default function TransferComponent(props) {
	let className = classNames({
		'mk-transfer': true,
		[props.className]: !!props.className
	})
	return <Transfer {...props} className={className} />
}
