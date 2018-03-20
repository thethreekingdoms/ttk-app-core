import React from 'react'
import { Steps } from 'antd'
import classNames from 'classnames'

function StepsComponent(props) {
	let className = classNames({
		'mk-steps': true,
		[props.className]: !!props.className
	})
	return <Steps {...props} className={className} />
}

StepsComponent.Step = Steps.Step
export default StepsComponent