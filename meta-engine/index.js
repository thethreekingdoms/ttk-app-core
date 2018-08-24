import { start, AppLoader } from 'edf-app-loader'
import config from './config'
import action from './action'
import reducer from './reducer'
import wrapper from './wrapper'
import componentFactory from './componentFactory'
//import tryCatchError from './reactTryCatchBatchingStrategy'
import templateFactory from './templateFactory'
import defaultComponent from './defaultComponent'

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