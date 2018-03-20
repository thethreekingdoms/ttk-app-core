import React from 'react'
import classNames from 'classnames'
import omit from 'omit.js'

export default function LinkComponent(props) {
	let className = classNames({
		'mk-link': true,
		[props.className]: !!props.className
	})
	return <a {...props} className={className} />
}