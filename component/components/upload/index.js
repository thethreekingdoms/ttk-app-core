import React from 'react'
import { Upload } from 'antd'
import classNames from 'classnames'

export default function UploadComponent(props) {
	let className = classNames({
		'mk-upload': true,
		[props.className]: !!props.className
	})
	return <Upload {...props} multiple={true} className={className} />
}
