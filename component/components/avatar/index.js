import React from 'react'
import { Avatar } from 'antd'
import classNames from 'classnames'

export default function AvatarComponent(props) {
	let className = classNames({
		'mk-avatar': true,
		[props.className]: !!props.className
	})
	return <Avatar {...props} className={className} />
}