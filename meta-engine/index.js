import { start, AppLoader } from 'edf-app-loader'
import config from './config'
import action from './action'
import reducer from './reducer'
import wrapper from './wrapper'
import componentFactory from './componentFactory'
//import tryCatchError from './reactTryCatchBatchingStrategy'
import templateFactory from './templateFactory'
import defaultComponent from './defaultComponent'
//新增的optiaml-meta-engine的action和wrapper
// import optimalAction from './optimal/action'
// import optimalWrapper from './optimal/wrapper'

export default {
	start,
	config,
	action,
	reducer,
	wrapper,
	componentFactory,
	templateFactory,
	defaultComponent,
    AppLoader
}