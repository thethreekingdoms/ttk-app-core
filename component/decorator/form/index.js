import action from './action'
import reducer from './reducer'

function actionCreator(option) {
	return new action({ ...option})
}

function reducerCreator(option) {
	return new reducer({ ...option})
}

export default {
	actionCreator,
	reducerCreator
}