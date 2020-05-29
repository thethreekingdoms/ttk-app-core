import React from 'react'
import { Button } from 'antd'
import classNames from 'classnames'

export default function CustomComponent(props) {
	let className = classNames({
		'custom-component-btn': true,
		[props.className]: !!props.className
	})
	return <Button {...props} className={className} />
}
