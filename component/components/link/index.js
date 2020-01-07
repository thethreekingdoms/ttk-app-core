import React from 'react'
import classNames from 'classnames'

export default function LinkComponent(props) {
	let className = classNames({
		'mk-link': true,
		[props.className]: !!props.className
	})
	return <a {...props} className={className} />
}