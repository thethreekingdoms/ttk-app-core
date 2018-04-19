import React from 'react'
import { AppLoader } from 'edf-app-loader'
import * as common from './common'
import utils from 'edf-utils'
import { fromJS } from 'immutable'
import contextManager from './context'
import config from './config'
//import * as Babel from 'babel-standalone'


const appInstances = {}
class action {
	constructor(option) {
		this.appInfo = option.appInfo
		this.meta = fromJS(option.appInfo.meta)
		this.cache = {}

		common.setMeta(option.appInfo)
	}

	config = ({ metaHandlers }) => {
		this.metaHandlers = metaHandlers
	}

	initView = (component, injections) => {
		this.component = component
		this.injections = injections

		appInstances[component.props.appFullName] = {
			appName: component.props.appName,
			appQuery: component.props.appQuery,
			//app: config.getApps()[component.props.appName],
			instance: component
		}

		this.metaHandlers && this.metaHandlers['onInit'] && this.metaHandlers['onInit']({ component, injections })
	}

	unmount = () => {
		delete appInstances[this.component.appFullName]
	}

	componentWillMount = () => {
		this.metaHandlers
			&& this.metaHandlers['componentWillMount']
			&& this.metaHandlers['componentWillMount'] != this.componentWillMount
			&& this.metaHandlers['componentWillMount']()
	}

	componentDidMount = () => {
		this.metaHandlers
			&& this.metaHandlers['componentDidMount']
			&& this.metaHandlers['componentDidMount'] != this.componentDidMount
			&& this.metaHandlers['componentDidMount']()
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		this.metaHandlers
			&& this.metaHandlers['shouldComponentUpdate']
			&& this.metaHandlers['shouldComponentUpdate'] != this.shouldComponentUpdate
			&& this.metaHandlers['shouldComponentUpdate'](nextProps, nextState)
	}

	componentWillReceiveProps = (nextProps) => {
		this.metaHandlers
			&& this.metaHandlers['componentWillReceiveProps']
			&& this.metaHandlers['componentWillReceiveProps'] != this.componentWillReceiveProps
			&& this.metaHandlers['componentWillReceiveProps'](nextProps)
	}

	componentWillUpdate = (nextProps, nextState) => {
		this.metaHandlers
			&& this.metaHandlers['componentWillUpdate']
			&& this.metaHandlers['componentWillUpdate'] != this.componentWillUpdate
			&& this.metaHandlers['componentWillUpdate'](nextProps, nextState)
	}

	componentDidCatch = (error, info) => {
		this.metaHandlers
			&& this.metaHandlers['componentDidCatch']
			&& this.metaHandlers['componentDidCatch'] != this.componentDidCatch
			&& this.metaHandlers['componentDidCatch'](error, info)
	}

	componentWillUnmount = () => {
		this.metaHandlers
			&& this.metaHandlers['componentWillUnmount']
			&& this.metaHandlers['componentWillUnmount'] != this.componentWillUnmount
			&& this.metaHandlers['componentWillUnmount']()
	}

	componentDidUpdate = () => {
		this.metaHandlers
			&& this.metaHandlers['componentDidUpdate']
			&& this.metaHandlers['componentDidUpdate'] != this.componentDidUpdate
			&& this.metaHandlers['componentDidUpdate']()
	}

	getAppInstances = () => {
		return appInstances
	}


	getField = (fieldPath) => {
		return common.getField(this.injections.getState(), fieldPath)
	}

	getFields = (fieldPaths) => {
		return common.getFields(this.injections.getState(), fieldPaths)
	}

	setField = (fieldPath, value) => {
		return this.injections.reduce('setField', fieldPath, value)
	}

	setFields = (values) => {
		return this.injections.reduce('setFields', values)
	}

	parseExpreesion = (v) => {
		if (!this.cache.expression)
			this.cache.expression = {}

		if (this.cache.expression[v]) {
			return this.cache.expression[v]
		}

		if (!this.cache.expressionParams) {
			this.cache.expressionParams = ['data']
				.concat(Object.keys(this.metaHandlers).map(k => "$" + k))
				.concat(['_path', '_rowIndex', '_vars', '_ctrlPath', '_lastIndex'])
		}

		var params = this.cache.expressionParams

		var body = utils.expression.getExpressionBody(v)


		this.cache.expression[v] = new Function(...params, body)
		return this.cache.expression[v]

	}

	execExpression = (expressContent, data, path, rowIndex, vars, ctrlPath) => {

		let browserType = utils.environment.getBrowserVersion()
		if (browserType && browserType.ie) {
			if (expressContent && expressContent.indexOf('=>') > -1) {
				console.log('ie兼容exception:' + expressContent)
				//if (Babel) {
				//	expressContent = Babel.transform(expressContent, { presets: ['es2015'] }).code
					//expressContent = expressContent.replace("use strict;", "")
					//v = v.replace("use strict", '')
				//}
			}
		}
		let _express = this.parseExpreesion(expressContent)
		let values = [data]

		Object.keys(this.metaHandlers).forEach(k => {
			values.push((...args) => this.metaHandlers[k](...args, { currentPath: path, rowIndex, vars, lastIndex: vars && vars[vars.length - 1] }))
		})
		values = values.concat([path, rowIndex, vars, ctrlPath, vars && vars[vars.length - 1]])

		if (typeof (_express) != 'undefined') {
			try {
				return _express.apply(this, values)
			}
			catch (e) {
				this.metaHandlers
					&& this.metaHandlers['componentDidCatch']
					&& this.metaHandlers['componentDidCatch'] != this.componentDidCatch
					&& this.metaHandlers['componentDidCatch'](e)
				console.error(`表达式解析错误：${expressContent}`)
				utils.exception.error(e)
			}
		}

	}


	needUpdate = (meta) => {
		if (!meta)
			return false

		const t = typeof meta

		if (t == 'string' && utils.expression.isExpression(meta))
			return true

		if (t != 'object')
			return false

		if (meta["_notParse"] === true) {
			return false
		}

		return !(t != 'object'
			|| !!meta['$$typeof']
			|| !!meta['_isAMomentObject']
			|| !!meta["_power"]
			|| meta["_visible"] === false)
	}

	updateMeta = (meta, path, rowIndex, vars, data, ctrlPath) => {

		if (!this.needUpdate(meta))
			return

		if (meta instanceof Array) {
			for (let i = 0; i < meta.length; i++) {
				let sub = meta[i]
				let currentPath = path
				if (!sub)
					continue

				if (sub['_power']) {
					currentPath = `${path}.${sub.name}`
					sub.path = vars ? `${currentPath}, ${vars.join(',')}` : currentPath
					continue
				}

				let subType = typeof sub, isExpression = false, isMeta = false

				if (subType == 'string' && utils.expression.isExpression(sub)) {
					sub = this.execExpression(sub, data, path, rowIndex, vars, ctrlPath)
					isExpression = true
					if (sub && sub['_isMeta'] === true)
						isMeta = true

					if (sub && sub['_isMeta'] === true) {
						isMeta = true
						meta[i] = sub.value
					}
					else {
						meta[i] = sub
					}
				}

				if (!this.needUpdate(sub))
					continue

				if (isExpression && !isMeta) {
					continue
				}

				subType = typeof sub

				if (sub instanceof Array) {
					currentPath = `${path}.${i}`
					sub.path = vars ? `${currentPath}, ${vars.join(',')}` : currentPath
					this.updateMeta(sub, currentPath, rowIndex, vars, data, ctrlPath)
					continue
				}

				if (sub.name && sub.component) {
					currentPath = `${path}.${sub.name}`
					sub.path = vars ? `${currentPath}, ${vars.join(',')}` : currentPath
					this.updateMeta(sub, currentPath, rowIndex, vars, data, sub.path)
				}
				else {
					currentPath = `${path}.${i}`
					sub.path = vars ? `${currentPath}, ${vars.join(',')}` : currentPath
					this.updateMeta(sub, currentPath, rowIndex, vars, data, ctrlPath)
				}
			}
			return
		}
		var excludeProps = meta["_excludeProps"]
		if (excludeProps && utils.expression.isExpression(excludeProps)) {
			excludeProps = this.execExpression(excludeProps, data, path, rowIndex, vars, ctrlPath)
		}

		//去除meta的排除属性
		if (excludeProps && excludeProps instanceof Array) {
			excludeProps.forEach(k => {
				if (meta[k])
					delete meta[k]
			})
		}

		const keys = Object.keys(meta)

		for (let key of keys) {
			let v = meta[key],
				t = typeof v,
				currentPath = path

			if (!v)
				continue
			if (v['_power']) {
				currentPath = `${path}.${key}.${v.name}`
				v.path = vars ? `${currentPath}, ${vars.join(',')}` : currentPath
				continue
			}

			let isExpression = false, isMeta = false
			if (t == 'string' && utils.expression.isExpression(v)) {
				v = this.execExpression(v, data, `${path}.${key}`, rowIndex, vars, ctrlPath)
				isExpression = true
				if (key == '...' && v && typeof v == 'object') {
					Object.keys(v).forEach(kk => {
						meta[kk] = v[kk]
					})
					delete meta['...']
				} else {
					if (v && v['_isMeta'] === true) {
						isMeta = true
						meta[key] = v.value
					}
					else {
						meta[key] = v
					}
				}
			}

			t = typeof t

			if (!this.needUpdate(v))
				continue

			if (isExpression && !isMeta) {
				continue
			}
			if (v instanceof Array) {
				this.updateMeta(v, `${path}.${key}`, rowIndex, vars, data, ctrlPath)
				continue
			}

			if (v.name && v.component) {
				currentPath = `${path}.${key}.${v.name}`
				v.path = vars ? `${currentPath}, ${vars.join(',')}` : currentPath
				this.updateMeta(v, currentPath, rowIndex, vars, data, v.path)
			}
			else {
				currentPath = `${path}.${key}`
				v.path = vars ? `${currentPath}, ${vars.join(',')}` : currentPath
				this.updateMeta(v, currentPath, rowIndex, vars, data, ctrlPath)
			}
		}
	}

	getMeta = (fullPath, propertys, data) => {
		const meta = common.getMeta(this.appInfo, fullPath, propertys),
			parsedPath = utils.path.parsePath(fullPath),
			path = parsedPath.path,
			rowIndex = parsedPath.vars ? parsedPath.vars[0] : undefined,
			vars = parsedPath.vars

		if (!data)
			data = common.getField(this.injections.getState()).toJS()

		meta['_power'] = undefined
		meta.path = fullPath
		this.updateMeta(meta, path, rowIndex, vars, data, fullPath)
		return meta
	}

	setMetaForce = (appName, meta) => {
		common.setMetaForce(appName, meta)
	}

	focus = (path) => {
		if (this.isFocus(path)) return false
		this.setField('data.other.focusFieldPath', path)
		return true
	}

	focusByEvent = (e) => {
		const path = utils.path.findPathByEvent(e)
		return this.focus(path)
	}

	isGridReadOnly = (path) => {
		if (!path) return false
		let gridReadOnly = this.getField(path)

		//this.getField('data.other.isGridReadOnly')
		if (!gridReadOnly) gridReadOnly = false

		return gridReadOnly
	}

	isReadOnly = (path) => {
		if (!path) return false
		if (path.indexOf('.cell.cell') != -1) {
			path = path.split('.cell.cell,')[0]
		}
		let _isReadOnly = this.getField(path + '.isReadOnly')
		if (!_isReadOnly) _isReadOnly = false

		return _isReadOnly
	}

	isFocus = (path) => {
		if (!path) return false
		const focusFieldPath = this.getField('data.other.focusFieldPath')
		if (!focusFieldPath) return false
		return path.replace(/\s/g, '') == focusFieldPath.replace(/\s/g, '')
	}

	getDirectFuns = () => {
		return {
			getMeta: (...args) => {
				return this.getMeta(...args)
			},
			getField: (fieldPath) => {
				return this.getField(fieldPath)
			},
			gm: (...args) => {
				return this.getMeta(...args)
			},
			gf: (fieldPath) => {
				return this.getField(fieldPath)
			},
		}
	}

	toast = (...args) => {
		const Toast = config.getToast()
		if(Toast){
			Toast.destroy()
		}
		if (!Toast || args.length == 0 || !Toast[args[0]]) return
		if (Toast) {
			Toast[args[0]](...args.slice(1))
		}
	}

	alert = (...args) => {
		const Alert = config.getAlert()
		if (!Alert || args.length == 0 || !Alert[args[0]]) return
		Alert[args[0]](...args.slice(1))
	}

	clearToast = (Toast) => {
		window.setTimeout(function(){

		},0)
	}

	notification = (...args) => {
		const Notification = config.getNotification()
		if (!Notification || args.length == 0 || !Notification[args[0]]) return
		Notification[args[0]](...args.slice(1))
	}

	popconfirm = (...args) => {
		const PopConfirm = config.getPopconfirm()
		if (!PopConfirm || args.length == 0 || !PopConfirm[args[0]]) return
		return PopConfirm[args[0]](...args.slice(1))
	}

	modal = (...args) => {
		const Modal = config.getModal()
		if (!Modal || args.length == 0 || !Modal[args[0]]) return
		return Modal[args[0]](...args.slice(1))
	}

	loadApp = (name, props) => {
		return <AppLoader {...props} name={name} />
	}

	gm = this.getMeta

	sm = this.setMeta

	gf = this.getField

	gfs = this.getFields

	sf = this.setField

	sfs = this.setFields

	findPathByEvent = utils.path.findPathByEvent

	stringToMoment = utils.moment.stringToMoment

	momentToString = utils.moment.momentToString

	fromJS = fromJS

	context = contextManager
}

export default function creator(option) {
	return new action(option)
}
