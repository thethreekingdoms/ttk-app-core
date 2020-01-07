import React from 'react'
import EchartsForReact from 'echarts-for-react'
import echarts from 'echarts'
import macarons from './macarons'
import shine from './shine'

function EcharsComponent(props) {
	return <EchartsForReact {...props} />
}

EcharsComponent.registerTheme = echarts.registerTheme

echarts.registerTheme('shine',shine)
echarts.registerTheme('macarons',macarons)

export default EcharsComponent