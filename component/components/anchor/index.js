import React from 'react'
import { Anchor } from 'antd'
import classNames from 'classnames'

function AnchorComponent(props) {
	let className = classNames({
		'mk-anchor': true,
		[props.className]: !!props.className
	})
	return <Anchor {...props} className={className} />
}

AnchorComponent.Link = Anchor.Link
export default AnchorComponent
