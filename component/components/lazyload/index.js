import React from 'react'
//import Lazyload from 'ttk-rc-lazyload'
import classNames from 'classnames'

function LazyloadComponent(props) {
	let className = classNames({
		'mk-lazyload': true,
		[props.className]: !!props.className
	})	

	return <div once {...props} />
}

export default LazyloadComponent