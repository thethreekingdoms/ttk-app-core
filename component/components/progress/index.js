import React from 'react'
import { Progress } from 'antd'
import classNames from 'classnames'

export default function ProgressfirmComponent(props) {
	let className = classNames({
		'mk-progress': true,
		[props.className]: !!props.className
	})
	return <Progress {...props} className={className} />
}
