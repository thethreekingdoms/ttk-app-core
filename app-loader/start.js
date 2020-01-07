import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import AppLoader from './appLoader';
import appMiddleware from './appMiddleware';
// import detectMiddleware from './detectMiddleware'; // 页面app、js、css探测中间件
import reducer from './reducer';
import config from './config';
import AppFactory from './appFactory';

const appFactory = AppFactory.getInstance();

export default function start() {
	const currentConfig = config.current;

	appFactory.registerApps(currentConfig.apps);

	var mw = [
        // detectMiddleware(currentConfig.actionInjections || {}, currentConfig.reducerInjections || {}), // 页面app、js、css探测中间件
        appMiddleware(currentConfig.actionInjections || {}, currentConfig.reducerInjections || {})
    ];

	if (currentConfig.middlewares) {
		mw = mw.concat(currentConfig.middlewares);
    }

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, Map(), composeEnhancers(applyMiddleware(...mw)));
    // const store = createStore(reducer, Map(), applyMiddleware(...mw));

    window.reduxStore = store;
	//window.__mk_store__ = store;

	if (!currentConfig.rootWrapper) {
		currentConfig.rootWrapper = (child) => {
			return child;
		};
	}

	render(
		currentConfig.rootWrapper((
			<Provider store={store}>
				<AppLoader name={currentConfig.startAppName} />
			</Provider>
		)),
		document.getElementById(currentConfig.targetDomId)
	)
}