import React from 'react'
import { Button } from 'antd'
import classNames from 'classnames'
import omit from 'omit.js'
import ButtonGroupComponent from './buttonGroup'
import Icon from '../icon'

function ButtonComponent(props) {
	let className = classNames({
		'mk-btn': true,
		[`mk-btn-${props.type}`]: !!props.type,
		[props.className]: !!props.className
	})

	const iconNode = props.icon
		? <Icon type={props.icon} fontFamily={props.iconFontFamily} showStyle={props.iconShowStyle} />
		: null

	let children = props.children || null
	let ps = { ...omit(props, ['icon']), className: className }

	let _ref = props.ref

	if (iconNode && !children) {
		return (
			<Button {...ps}>
				{iconNode}
			</Button>
		)
	}

	if (iconNode && children) {
		return (
			<Button {...ps}>
				{iconNode}{children}
			</Button>
		)
	}

	return <Button {...ps} />
}


ButtonComponent.Group = ButtonGroupComponent

export default ButtonComponent
