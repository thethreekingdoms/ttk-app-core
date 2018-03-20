import React from 'react'
import { render } from 'react-dom'
import AppLoader from './appLoader'
import appMiddleware from './appMiddleware'
import reducer from './reducer'
import config from './config'
import start from './start'
import appFactory from './appFactory'
import init from './init'

const {registerApp, registerApps} = appFactory

const loadApp = (name, props)=>{
	return <AppLoader {...props} name={name} />
}

export {
	AppLoader,
	appMiddleware,
	reducer,
	config,
	init,
	start,
	registerApp,
	registerApps,
	loadApp
}