import parseName from './parseName'
import appFactory from './appFactory'
import config from './config'

const appConfig = (apps, options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

export default (actionInjections, reducerInjections) => (store) => {
	return next => action => {
		const {
			getState,
			dispatch
		} = store

		if (typeof action === 'function') {
			const {
				fullName,
				name,
				query,
				params,
				actionCreator,
				args,
				reducer
			} = action()

			const reduce = (type, ...args) => {
				dispatch({
					type: '@@reduce',
					payload: {
						fullName,
						name,
						query,
						type,
						reducer,
						payload: args,
						reducerInjections
					}
				})
			}

			const getStateByApp = () => getState().get(fullName)
			const injections = {
				currentApp: {
					fullName,
					name,
					query,
					params
				},
				store,
				reduce,
				getState: getStateByApp,
				...actionInjections
			}
			const realAction = actionCreator(
				...args,
				injections
			)

			if (typeof realAction === 'function') {
				realAction(injections)
			}

		} else if (action.type && action.type == '@@loadApp') {
			try {
				const fullName = action.payload.fullName,
					prevFullName = action.payload.prevFullName,
					parsedName = parseName(fullName)
				let appInfo = appFactory.getApp(parsedName.name)

				if (appInfo) {
					appInfo.load((component, action, reducer, meta, config) => {
						if (!appInfo.meta && meta) {
							appInfo.meta = meta.getMeta()
						}
						if (!appInfo.config && config) {
							appInfo.config = config
						}
						return next({
							type: '@@loadAppReal',
							payload: {
								fullName,
								appInfo,
								component,
								action,
								reducer,
								prevFullName
							}
						})
					})
				}
				else if (config.current.requireFn
					&& config.current.appsMap
					&& config.current.appsMap[parsedName.name]) {
					let appName = parsedName.name,
						val = config.current.appsMap[parsedName.name],
						url = (typeof val) == 'string' ? val : val.asset,
						options = typeof val == 'string' ? {} : val.options,
						pub = url.indexOf('/') ? url.substr(0, url.lastIndexOf('/') + 1) : '',
						cssUrl = url.indexOf('.min.js') != -1
							? `css!${url.replace(/\.min\.js/, '.min.css')}`
							: `css!${url.replace(/\.js/, '.css')}`

					window[`__pub_${appName}__`] = pub

					config.current.requireFn([url, cssUrl], (...args) => {
						if (args.length > 0) {
							appInfo = args[0]
							const apps = { ...appFactory.getApps(), [appInfo.name]: appInfo }
							appFactory.registerApp(appInfo.name, appInfo)
							appConfig(apps, {
								"*": { apps: apps },
								[appName]: options
							})

							appInfo.load((component, action, reducer) => {
								return next({
									type: '@@loadAppReal',
									payload: {
										fullName,
										appInfo,
										component,
										action,
										reducer,
										prevFullName
									}
								})
							})
						}
					})
				}
				else if (config.current.requireFn
					&& config.current.loadAppInfoFn
				) {
					config.current.loadAppInfoFn(parsedName.name).then(ret => {
						if (ret) {
							let appName = parsedName.name,
								val = ret,
								url = (typeof val) == 'string' ? val : val.asset,
								options = typeof val == 'string' ? {} : val.options,
								pub = url.indexOf('/') ? url.substr(0, url.lastIndexOf('/') + 1) : '',
								cssUrl = url.indexOf('.min.js') != -1
									? `css!${url.replace(/\.min\.js/, '.min.css')}`
									: `css!${url.replace(/\.js/, '.css')}`

							window[`__pub_${appName}__`] = pub

							config.current.requireFn([url, cssUrl], (...args) => {
								if (args.length > 0) {
									appInfo = args[0]
									const apps = { ...appFactory.getApps(), [appInfo.name]: appInfo }
									appFactory.registerApp(appInfo.name, appInfo)
									appConfig(apps, {
										"*": { apps: apps },
										[appName]: options
									})

									appInfo.load((component, action, reducer) => {
										return next({
											type: '@@loadAppReal',
											payload: {
												fullName,
												appInfo,
												component,
												action,
												reducer,
												prevFullName
											}
										})
									})
								}
							})
						}
						else {
							console.error(`加载应用${parsed.name}失败`)
						}
					})
				}
				else {
					console.error(`加载应用${parsed.name}失败`)
				}

			}
			catch (e) {
				console.error(e)
				return next(action)
			}

		} else {
			return next(action)
		}
	}
}