import React from 'react'
import Dropdown from './index'
import Button from '../button'
import Icon from '../icon'
import classNames from 'classnames'

const ButtonGroup = Button.Group

export default function DropdownButton(props) {
	const { type, className, overlay, trigger,
		align, onClick, disabled, visible,
		onVisibleChange, placement, children, ...other } = props

	const cls = classNames({
		'ant-dropdown-button': true,
		'mk-dropdown-button': true,
		[className]: !!className
	})

	const dropdownProps = {
		align,
		overlay,
		trigger: disabled ? [] : trigger,
		onVisibleChange,
		placement,
	}

	if ('visible' in props) {
		dropdownProps.visible = visible
	}

	return (
		<ButtonGroup {...other} className={cls}>
			<Button type={type} onClick={onClick} disabled={disabled}>{children}</Button>
			<Dropdown {...dropdownProps}>
				<Button type={type} disabled={disabled}>
					<Icon type="down" />
				</Button>
			</Dropdown>
		</ButtonGroup>
	)
}