import React, { Component } from 'react'
import { Modal } from 'antd'
import classNames from 'classnames'

export default function confirm(props) {
	return new Promise((resolve, reject) => {
		let handleOk = () => {
			resolve(true)
		}

		let handleCancel = () => {
			resolve(false)
		}

		let className = classNames({
			'mk-confirm': true,
			[props.className]: !!props.className
		})
		if (!props.onOk) {
			props.onOk = handleOk
		}
		if(!props.width){
			props.width = 325
		}
		props.className = className
		props.onCancel = handleCancel

		props.okText = props.okText || '确定'
		props.cancelText = props.cancelText || '取消'


		Modal.confirm(props)
	})
}
