import React from 'react'
import JSONTree from 'react-json-tree'
import classNames from 'classnames'

function JSONTreeComponent(props) {
	let className = classNames({
		'edf-jsonTree': true,
		[props.className]: !!props.className
	})
	return <JSONTree {...props} className={className} />
}

export default JSONTreeComponent