import React from 'react'
import { Spin } from 'antd'
import classNames from 'classnames'

export default function SpinfirmComponent(props) {
	let className = classNames({
		'mk-spin': true,
		[props.className]: !!props.className
	})
	return <Spin {...props} className={className} />
}
