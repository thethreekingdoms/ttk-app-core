import React from 'react'
import {Select} from 'antd'
import classNames from 'classnames'

function filterOption(props){
	if (props.filterOption) {
		return props.filterOption
	}

	let filterOptionExpressions = props.filterOptionExpressions

	if(filterOptionExpressions){
		let filterFields = filterOptionExpressions.split(',')
		return (input, option)=>{
			for(let f of filterFields){
				let tmp = option.props._data[f]
				if (tmp && tmp.toLowerCase().indexOf(input.toLowerCase()) != -1 )
					return true
			}
			return false
		}
	}

	return undefined
}

function SelectComponent(props) {
	let { className, notFoundContent, optionLabelProp,
		mode, combobox, tags, multiple, size, ...otherProps } = props

	className = classNames({
		'ant-select': true,
		'mk-select': true,
		[`ant-select-lg`]: size === 'large',
		[`ant-select-sm`]: size === 'small',
		[className]: !!className
	})

	const isCombobox = mode === 'combobox' || combobox

	notFoundContent = notFoundContent || '无匹配结果'

	if (isCombobox) {
		notFoundContent = null;
		// children 带 dom 结构时，无法填入输入框
		optionLabelProp = optionLabelProp || 'value'
	}

	const modeConfig = {
		multiple: mode === 'multiple' || multiple,
		tags: mode === 'tags' || tags,
		combobox: isCombobox,
	}

	let suffix = props.suffix
	if (props.suffix) {
		suffix = React.cloneElement(props.suffix, { style: { float: "right" } })
	}

	return (<Select
		{...otherProps}
		{...modeConfig}
		prefixCls='ant-select'
		className={className}
		optionLabelProp={optionLabelProp || 'children'}
		notFoundContent={notFoundContent}
		filterOption={filterOption(props)}
		suffix={suffix}
	/>)
}

SelectComponent.Option = Select.Option
SelectComponent.OptGroup = Select.OptGroup

export default SelectComponent
