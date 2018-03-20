import React from 'react'
import { Alert } from 'antd'
import classNames from 'classnames'

export default function AlertComponent(props) {
	let className = classNames({
		'mk-alert': true,
		[props.className]: !!props.className
	})
	return <Alert {...props} className={className} />
}
