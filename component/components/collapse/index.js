import React from 'react'
import { Collapse } from 'antd'
import classNames from 'classnames'

function CollapseComponent(props) {
	let className = classNames({
		'mk-collapse': true,
		[props.className]: !!props.className
	})
	return <Collapse {...props} className={className} />
}

CollapseComponent.Panel = Collapse.Panel

export default CollapseComponent
