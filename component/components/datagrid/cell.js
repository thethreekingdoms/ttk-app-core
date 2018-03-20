import React, { Component } from 'react'
import { Cell } from 'fixed-data-table-2'
import classNames from 'classnames'

export default class cellComponent extends Component {
	render() {
		const {
      		height,
			width,
			style,
			className,
			align,
			children,
			value,
			tip,
			...other
    	} = this.props

		let cls = classNames({
			'mk-datagrid-cellContent': true,
			[`mk-datagrid-cellContent-${align}`]: !!align,
			[className]: !!className
		})

		var innerStyle = {
			height,
			width,
			...style,
		}
		let title
		
		if(tip) {
			title = {title: children || value}
		}

		return (
			<div {...other} className={cls} style={innerStyle} {...title}>
				{children || value}
			</div>
		)
	}
}