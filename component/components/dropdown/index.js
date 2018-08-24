import React from 'react'
import { Dropdown } from 'antd'
import classNames from 'classnames'
import DropdownButton from './dropdownButton'


function DropdownComponent(props) {
	let className = classNames({
		'mk-dropdown': true,
		[props.className]: !!props.className
	})
	return <Dropdown {...props} className={className} />
}

DropdownComponent.Button = DropdownButton
DropdownComponent.AntButton = Dropdown.Button

export default DropdownComponent