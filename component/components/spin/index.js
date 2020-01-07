import React from 'react'
import { Spin } from 'antd'
import classNames from 'classnames'

export default function SpinfirmComponent(props) {
	let className = classNames({
		'mk-spin': true,
		[props.className]: !!props.className,
	})
	let delay = props.delay || 2000
	return <Spin {...props} delay={delay} className={className} />
}
