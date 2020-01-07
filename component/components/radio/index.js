import React from 'react'
import { Radio } from 'antd'
import classNames from 'classnames'

function RadioComponent(props) {
	let className = classNames({
		'mk-radio': true,
		[props.className]: !!props.className
	})
	return <Radio {...props} className={className} />
}

RadioComponent.Group = Radio.Group
RadioComponent.Button = Radio.Button

export default RadioComponent
