import React from 'react'
// import JSONTree from 'react-json-tree'
import classNames from 'classnames'

function JSONTreeComponent(props) {
	let className = classNames({
		'mk-jsonTree': true,
		[props.className]: !!props.className
	})
	return <div {...props} className={className} />
}

export default JSONTreeComponent