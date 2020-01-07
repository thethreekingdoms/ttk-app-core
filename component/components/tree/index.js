import React from 'react'
import { Tree } from 'antd'
import classNames from 'classnames'

function TreeComponent(props) {
	let className = classNames({
		'mk-tree': true,
		[props.className]: !!props.className
	})
	return <Tree {...props} className={className} />
}

TreeComponent.TreeNode = Tree.TreeNode

export default TreeComponent
