import React from 'react'
import { Breadcrumb } from 'antd'
import classNames from 'classnames'

function BreadcrumbComponent(props) {
	let className = classNames({
		'mk-breadcrumb': true,
		[props.className]: !!props.className
	})
	return <Breadcrumb {...props} className={className} />
}

BreadcrumbComponent.Item = Breadcrumb.Item

export default BreadcrumbComponent
