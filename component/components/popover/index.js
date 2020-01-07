import React from 'react'
import { Popover } from 'antd'
import classNames from 'classnames'

export default function PopoverfirmComponent(props) {
	let className = classNames({
		'mk-popover': true,
		[props.className]: !!props.className
	})
	return <Popover {...props} calssName={className} />
}
