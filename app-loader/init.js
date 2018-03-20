import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Map } from 'immutable'
import AppLoader from './appLoader'
import appMiddleware from './appMiddleware'
import reducer from './reducer'
import config from './config'
import appFactory from './appFactory'

export default function init() {
    const currentConfig = config.current
    
    if(currentConfig.apps)
	    appFactory.registerApps(currentConfig.apps)

	var mw = [appMiddleware(currentConfig.actionInjections || {}, currentConfig.reducerInjections || {})]

	if (currentConfig.middlewares)
		mw = mw.concat(currentConfig.middlewares)

	const store = createStore(reducer, Map(), applyMiddleware(...mw))
	
	window.reduxStore = store
	//window.__mk_store__ = store
}