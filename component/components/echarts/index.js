import React from 'react'
// import EchartsForReact from 'echarts-for-react'
// import echarts from 'echarts'
import macarons from './macarons'
import shine from './shine'

class SingleClass {
	constructor(){
		this.load = this.load.bind(this)
	}
	echarts = null
	Component = null
	emit = {}
	send = false
	load = () => {
		let arr = this.emit
		for( const value of Object.values(arr) ) {
			value && value()
		}
		this.emit = {}
	}
}

const SingleObj = new SingleClass()


class EcharsComponent  extends React.Component{
	constructor(props) {
		super(props)
		this.state = {}
		this.keyRandom = Math.floor(Math.random()*10000)
	}

	loadEcharts = () => {
		return new Promise((resolve, reject) => {
			const dom = document.createElement('script')
			dom.type = 'text/javascript'
			dom.charset =  'utf-8'
			dom.src = './vendor/echarts.min.js'
			dom.onload = () => {
				resolve()
			}
			document.body.appendChild(dom)
			// require.ensure([], (require) => {
			// 	resolve(require('./echarts.min.js'))
			// }, 'echarts')
		})
	}

	loadZrender = () => {
		return new Promise((resolve, reject) => {
			const dom = document.createElement('script')
			dom.type = 'text/javascript'
			dom.charset =  'utf-8'
			dom.src = './vendor/zrender.min.js'
			// require.ensure([], (require) => {
			// 	resolve(require('./zrender.min.js'))
			// }, 'zrender')
			dom.onload = () => {
				resolve()
			}
			document.body.appendChild(dom)
		})
	}

	loadPackage = () => {
		return new Promise((resolve, reject) => {
			require.ensure([], (require) => {
				resolve(require('echarts-for-react'))
			}, 'echarts_for_react')
		})
	}

	loadDependencies = async() => {
		SingleObj.send = true
		await Promise.all([
			this.loadEcharts('./echarts.min.js', 'echarts'),
			this.loadZrender('./zrender.min.js', 'zrender')
			// import(
			// 	/* webpackChunkName: "echarts" */
			// 	'./echarts.min.js'), 
			// import(
			// 	/* webpackChunkName: "zrender" */
			// 	'./zrender.min.js')
		])
		// window.echarts = echarts
		// window.zrender = zrender
		// SingleObj.echarts = echarts
		const res =  await this.loadPackage()
		let Component = res['default']
		Component.registerTheme = echarts.registerTheme
		echarts.registerTheme('shine',shine)
		echarts.registerTheme('macarons',macarons)
		SingleObj.Component = Component
		SingleObj.load()
		this.setState({})
	}

	loadSuccess = () => {
		this.setState({})
	}

	render(){
		const { Component, emit, send } = SingleObj
		const props = this.props
		if( Component  ) {
			return <Component {...props} />
		}else{
			if( !send ) {
				this.loadDependencies()
			}else{
				emit[this.keyRandom] = this.loadSuccess
			}
			return null
		}
	}
}


export default EcharsComponent