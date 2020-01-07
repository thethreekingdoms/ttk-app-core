import React from 'react'
import { Col } from 'antd'
import classNames from 'classnames'

export default function ColComponent(props) {
	let className = classNames({
		'mk-col': true,
		[props.className]: !!props.className
	})
	return <Col {...props} className={className} />
}