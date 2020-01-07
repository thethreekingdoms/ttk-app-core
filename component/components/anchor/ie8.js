import React from 'react'
import classNames from 'classnames'

function AnchorComponent(props) {
	let className = classNames({
		'mk-anchor': true,
		[props.className]: !!props.className
	})
	return <div {...props} className={className}></div>
}

// AnchorComponent.Link = Anchor.Link
export default AnchorComponent
