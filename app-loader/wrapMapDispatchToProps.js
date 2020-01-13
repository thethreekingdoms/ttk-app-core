import { bindActionCreators } from 'redux';
import parseName from './parseName';
import AppFactory from './appFactory'

const app = AppFactory.getInstance();
export default function wrapMapDispatchToProps(fullName, actionCreators, reducer) {
	const parsedName = parseName(fullName),
		wrapActionCreators = {},
		keys = Object.keys(actionCreators);

	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];

		if (key === 'directFuns' || typeof actionCreators[key] !== 'function') {
			continue;
		}

		let wrapActionCreator = wrapAction(actionCreators[key],
			reducer, parsedName.fullName, parsedName.name,
			parsedName.query, parsedName.params);
		wrapActionCreators[key] = wrapActionCreator;
	}

	return dispatch => {
		return {
			...bindActionCreators(wrapActionCreators, dispatch),
			...((actionCreators.getDirectFuns && actionCreators.getDirectFuns(parsedName)) || {})
		};
	}
}

function wrapAction(actionCreator, reducer, fullName, name, query, params) {
	return (...args) => {
		return function () {
			return {
				fullName,
				name,
				query,
				params,
				actionCreator,
				reducer,
				args
			}
		};
	};
}

export function registryActionCouriers(fullName, appDataId, actions, reducers) {
	if(actions===null) return
	try{
		const keys = Object.keys(actions)
		const actionCouriers = {}
		keys.forEach((key, index) => {
			actionCouriers[key] = actionCourier(fullName, appDataId, actions[key], reducers)
		})
		app.registerAction({[fullName]:actionCouriers})
	}catch(error){
		throw new Error('注册action错误，请检查action函数的定义，每个action函数都必须单独export', error)
	}
}

// 将action包裹一层，并在appMiddleware中间件中调用后再调用真正的action, 该函数只使用于原生写法
export function actionCourier(fullName, appDataId, action, reducers) {
	return (...args) => async (dispatch, getState) => {
		const reduce = async (type, ..._args) => {
			dispatch({
				type: '@@originReduce',
				payload: {
					fullName,
					appDataId,
					type,
					reducers,
					payload: _args
				}
			})
		}
		const gf = ([...other] = [])=>{
			const temp = getState(`${fullName}/${other.join('/')}`)
			return temp&&temp.toJS() || {}
		}
		return await dispatch(action(reduce, gf, ...args )) // 调用真正的action
	}
}