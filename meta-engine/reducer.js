import Immutable, { Map, List } from 'immutable'

import contextManager from './context'

import * as common from './common'

class reducer {
	constructor(option) {
		this.appInfo = option.appInfo
	}

	init = (state, option) => {
		const {
			data = {},
		} = option

		return this.initByImmutable(state, {
			data: Immutable.fromJS(data),
		})
	}

	initByImmutable = (state, option) => {
		const {
			data,
		} = option

		//清除state中非@@开头的属性，那属性是edf-app-loader增加的
		const keys = []
		state.mapKeys(key => {
			if (key.indexOf('@@') === -1)
				keys.push(key)
		})

		keys.forEach(key => {
			state = state.remove(key)
		})

		//设置状态
		return state
			.set('data', data)
	}

	getMeta = common.getMeta

	getField = common.getField

	getFields = common.getFields

	setField = common.setField

	setFields = common.setFields

	setChildMeta = common.setChildMeta

	gm = common.getMeta

	sm = common.setMetaForce

	gf = common.getField

	gfs = common.getFields

	sf = common.setField

	sfs = common.setFields

	context = contextManager

}

export default function creator(option) {
	return new reducer(option)
}