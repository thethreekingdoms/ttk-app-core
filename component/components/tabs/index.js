import React from 'react'
import { Tabs } from 'antd'
import classNames from 'classnames'

function TabsComponent(props) {
	let className = classNames({
		'mk-tabs': true,
		[props.className]: !!props.className
	})
	return <Tabs {...props} className={className} />
}

TabsComponent.TabPane = Tabs.TabPane

export default TabsComponent
