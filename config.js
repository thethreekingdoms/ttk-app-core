import React from 'react'
import {
	Toast,
	Notification,
	Modal,
	Popconfirm,
	localeWrapper,
	Alert,
	Icon
} from 'edf-component'
import {
	fetch,
	environment
} from 'edf-utils'
// import { websql } from './../../../mk-js/core/mk-orm/src'
//import { websql } from 'mk-orm'
import './mock.js' //脱离后台测试，启用mock，否则这行注释

var _options = {}

//配置fetch
fetch.config({
	mock: true, //脱离后台测试，启用mock，否则这行注释

	//fetch支持切面扩展（before,after），对restful api统一做返回值或者异常处理
	after: (response, url, data, header) => {

		if (response.result) {
			if (response.token) { //登录后设置accessToken,根据需要调整
				fetch.config({
					token: response.token
				})
			}
			const specialUrl = [
				'/v1/edf/user/login'
			]
			if (specialUrl.indexOf(url) > -1) {
				return response
			}
			return response.value
		} else if (response.sysNetException) {
			response.error = {}
			response.error.code = 504
			response.error.message = '网络异常'
			return response
		} else if (response.networkException) {
			//window.location.href = gotoLogin('notfound.html')
			//Toast.destory()
			Toast.error('服务器正在维护中,请稍后访问!')
			return false
		} else if (response.unknownException) {
			return {
				result: false,
				error: {
					code: '9999'
				}
			}
		} else {
			if (data && data.isReturnValue) {
				if (response.error && response.error.type && response.error.type.name == 'alert') {
					Modal.error({
						title: '异常提示',
						okText: '关闭',
						width: 600,
						bodyStyle: 'height:300px;max-height:300px;overflow:auto;',
						content: <div id='infoCard'><div id='infoTitle'>{response.error.message}</div> <p id='infoStack'>{response.error.stack}</p><a id='detailMsg'>查看详情↓</a></div>

					})
					$("#detailMsg").click(function () {
						if ($("#detailMsg").text().indexOf('查看') > -1) {
							$("#detailMsg").text('隐藏详情↑');
						}
						else if ($("#detailMsg").text().indexOf('隐藏') > -1) {
							$("#detailMsg").text('查看详情↓');
						}
						$('#infoStack').toggle(0);
					});
					return false;

				} else {
					if (response.error && response.error.type) {
						if (response.error.type.name == 'warning') {
							Toast.warning(response.error.message)
						} else if (response.error.type.name == 'info') {
							Toast.info(response.error.message)
						} else if (response.error.type.name == 'notip') {
							//此处业务代码自己处理异常提醒，不需要公共弹出错误信息
						}else {
							Toast.error(response.error.message)
						}
					}
					else {
						if (response.error.message) {
							if (response.error.message.includes('505012') || response.error.message.includes('505048')) {
								return response
							}
							else{
								Toast.error(response.error.message)
							}
						}

					}
				}
				return response
			} else {
				let errorCode = ''
				if (response.error.code == 50000) return 50000
				if (response.error && response.error.code) {
					errorCode = response.error.code
				}
				if (response.error && response.error.type && response.error.type.name == 'alert') {
					//开发环境
					if (errorCode == '40100' || errorCode == '40101' || errorCode == '40102') {
						window.location.href = gotoLogin()
					} else {
						Modal.error({
							title: '异常提示',
							okText: '关闭',
							width: 600,
							bodyStyle: 'height:300px;max-height:300px;overflow:auto;',
							content: <div id='infoCard'><div id='infoTitle'>{response.error.message}</div> <p id='infoStack'>{response.error.stack}</p><a id='detailMsg'>查看详情↓</a></div>
						})
						$("#detailMsg").click(function () {
							if ($("#detailMsg").text().indexOf('查看') > -1) {
								$("#detailMsg").text('隐藏详情↑');
							}
							else if ($("#detailMsg").text().indexOf('隐藏') > -1) {
								$("#detailMsg").text('查看详情↓');
							}
							$('#infoStack').toggle(0);
						});
						return false;
					}

				} else {
					if (response.error && response.error.type) {
						if (response.error.type.name == 'warning') {
							Toast.warning(response.error.message)
						}
						else if (response.error.type.name == 'info') {
							Toast.info(response.error.message)
						} else if (response.error.type.name == 'notip') {
							//此处业务代码自己处理异常提醒，不需要公共弹出错误信息
						}
						else {
							Toast.error(response.error.message)
						}
					}
					else {
						Toast.error(response.error.message)
					}

					if (errorCode == '40100' || errorCode == '40101' || errorCode == '40102') {
						window.location.href = gotoLogin()
					}
					//Modal.error({ title: '错误：', okText: '关闭', content: response.error.code })
				}

				return
			}
		}
	}
})

function config(options) {
	Object.assign(_options, options)

	let config = {
		'*': {
			//webapi,//正式网站应该有一个完整webapi对象，提供所有web请求函数
			webProvider: fetch.mock,
			//dbProvider: websql,
			dbConfig: {
				name: 'test'
			},
		},
		'ttk-edf-app-root': {
			startAppName: 'ttk-edf-app-login',
		}
	}
	
	//对应用进行配置，key会被转换为'^<key>$'跟app名称正则匹配
	_options.apps && _options.apps.config(config)

	//require('./mock.js')
	_options.targetDomId = 'app' //react render到目标dom
	_options.startAppName = 'ttk-edf-app-root' //启动app名，需要根据实际情况配置

	_options.toast = Toast //轻提示使用组件，edf-meta-engine使用
	_options.notification = Notification //通知组件
	_options.modal = Modal //模式弹窗组件
	_options.popconfirm = Popconfirm //confirm提示组件
	_options.alert = Alert //alert
	_options.rootWrapper = (child) => localeWrapper('zh-CN', child) //国际化处理
	return _options
}

function gotoLogin(url) {
	if (typeof (url) == 'string') {
		return window.location.protocol + '//' + window.location.host + '/' + url
	}
	return window.location.protocol + '//' + window.location.host
}

config.current = _options

export default config
