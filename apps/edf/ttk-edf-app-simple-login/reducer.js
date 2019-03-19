import { Map, fromJS } from 'immutable';
import { reducer as MetaReducer } from 'edf-meta-engine';
import config from './config';
import { getInitState } from './data';
import utils from 'edf-utils';

class reducer {
	constructor(option) {
		this.metaReducer = option.metaReducer;
	}

	init = (state, option) => {
		let initState = getInitState();
		Object.assign(initState.data.form, option);
		let _browserType = utils.environment.getBrowserVersion();
		if (_browserType && _browserType.mobile) {
			initState.data.other.checkTips = true;
		}
		// initState.data.other.version = option.version;
		return this.metaReducer.init(state, initState);
	};
}

export default function creator(option) {
	const metaReducer = new MetaReducer(option),
		o = new reducer({ ...option, metaReducer });
	return { ...metaReducer, ...o };
}
