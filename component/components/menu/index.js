import React from 'react'
import { Menu } from 'antd'
import classNames from 'classnames'

function MenuComponent(props) {
	let className = classNames({
		'mk-menu': true,
		[props.className]: !!props.className
	})
	return <Menu {...props} className={className} />
}

MenuComponent.Divider = Menu.Divider
MenuComponent.Item = Menu.Item
MenuComponent.SubMenu = Menu.SubMenu
MenuComponent.ItemGroup = Menu.ItemGroup

export default MenuComponent
