import React from 'react'
import { Select } from 'antd'
import classNames from 'classnames'

function AntdSelect(props) {
	let className = classNames({
		'mk-select': true,
		[props.className]: !!props.className
	})
	return <Select {...props} className={className} />
}

AntdSelect.Option = Select.Option 
AntdSelect.OptGroup = Select.OptGroup

export default AntdSelect