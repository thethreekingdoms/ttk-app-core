import React from 'react'
import { Popconfirm } from 'antd'
import classNames from 'classnames'

export default function PopconfirmComponent(props) {
	let className = classNames({
		'mk-popconfirm': true,
		[props.className]: !!props.className
	})
	return <Popconfirm {...props} className={className} />
}
