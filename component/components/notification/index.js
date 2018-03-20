import React from 'react'
import { notification } from 'antd'
import classNames from 'classnames'

function promiseWrapper(fun) {
	return (props) => {
		return new Promise((resolve, reject) => {
			let handleClose = () => {
				resolve(true)
			}
			props.onClose = handleClose
			fun(props)
		})
	}
}

export default {
	open: promiseWrapper(notification.open),
	success: promiseWrapper(notification.success),
	error: promiseWrapper(notification.error),
	info: promiseWrapper(notification.info),
	warning: promiseWrapper(notification.warning),
	warn: promiseWrapper(notification.warn),
}
