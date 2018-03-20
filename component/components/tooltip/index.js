import React from 'react'
import { Tooltip } from 'antd'
import classNames from 'classnames'

export default function TooltipfirmComponent(props) {
	let className = classNames({
		'mk-tooltip': true,
		[props.className]: !!props.className
	})
	return <Tooltip {...props} className={className} />
}
