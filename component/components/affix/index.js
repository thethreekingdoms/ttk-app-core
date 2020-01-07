import React from 'react'
import { Affix } from 'antd'
import classNames from 'classnames'

export default function AffixComponent(props) {
	let className = classNames({
		'mk-affix': true,
		[props.className]: !!props.className
	})
	return <Affix {...props} className={className} />
}
