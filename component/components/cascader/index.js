import React from 'react'
import { Cascader } from 'antd'
import classNames from 'classnames'

export default function CascaderComponent(props) {
	let className = classNames({
		'mk-cascader': true,
		[props.className]: !!props.className
	})
	return <Cascader {...props} className={className} />
}
