import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import appMiddleware from './appMiddleware';
import reducer from './reducer';
import config from './config';
import AppFactory from './appFactory';

const appFactory = AppFactory.getInstance();

export default function init() {
    const currentConfig = config.current;
    
    if(currentConfig.apps)
	    appFactory.registerApps(currentConfig.apps);

	var mw = [appMiddleware(currentConfig.actionInjections || {}, currentConfig.reducerInjections || {})];

	if (currentConfig.middlewares){
		mw = mw.concat(currentConfig.middlewares);
    }
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(reducer, Map(), composeEnhancers(applyMiddleware(...mw)));
	
	window.reduxStore = store;
}