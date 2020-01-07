import React from 'react'
import { Tag } from 'antd'
import classNames from 'classnames'
const { CheckableTag } = Tag;

function TagComponent(props) {
	let className = classNames({
		'mk-tag': true,
		[props.className]: !!props.className
	})
	return <Tag {...props} className={className} />
}

TagComponent.CheckableTag = Tag.CheckableTag

export default TagComponent