import React from 'react'
import classNames from 'classnames'
import FormItem from './formItem'

function FormComponent(props) {
	let className = classNames({
		'mk-form': true,
		'mk-form-horizontal': props.layout == 'horizontal',
		'mk-form-vertical': props.layout == 'vertical',
		[props.className]: !!props.className
	})

	return (
		<div
			{...props}
			className={className}
		/>
	)
}

FormComponent.Item = FormItem

export default FormComponent