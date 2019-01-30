import React from 'react'
import { Row } from 'antd'
import classNames from 'classnames'

export default function RowComponent(props) {
	let className = classNames({
		'mk-row': true,
		[props.className]: !!props.className
	})
	return <Row {...props} className={className} />
}