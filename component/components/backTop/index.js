import React from 'react'
import { BackTop } from 'antd'
import classNames from 'classnames'

export default function BackTopComponent(props) {
	let className = classNames({
		'mk-back-top': true,
		[props.className]: !!props.className
	})
	return <BackTop {...props} className={className} />
}


