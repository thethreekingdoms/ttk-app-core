import React from 'react';
import AppLoader from './appLoader';
import appMiddleware from './appMiddleware';
import reducer from './reducer';
import config from './config';
import start from './start';
import AppFactory from './appFactory';
import init from './init';
import loadApp from './loadApp'
import {commit} from './action'
import {useGetAction, useInitReducersData, useActions, useData, useAppData, useCommit} from './hookReducer'
const { registerApp, registerApps, getApp, getApps } = AppFactory.getInstance();

// const loadApp = (name, props) => {
// 	return <AppLoader {...props} name={name} />;
// };

export {
	AppLoader,
	appMiddleware,
	reducer,
	config,
	init,
	start,
	registerApp,
	registerApps,
	getApp,
	getApps,
	loadApp,
	commit,
	useGetAction, useInitReducersData, useActions,useData, useAppData, useCommit
}