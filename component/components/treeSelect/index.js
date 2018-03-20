import React from 'react'
import { TreeSelect } from 'antd'
import classNames from 'classnames'

function TreeSelectComponent(props) {
	let className = classNames({
		'mk-tree-select': true,
		[props.className]: !!props.className
	})
	return <TreeSelect {...props} className={className} />
}

TreeSelectComponent.TreeNode = TreeSelect.TreeNode

export default TreeSelectComponent
