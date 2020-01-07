import React from 'react'
// import Intro from 'ttk-rc-intro'
import classNames from 'classnames'

function TourComponent(props) {
	let className = classNames({
		'mk-intro': true,
		[props.className]: !!props.className
	})

	return <div {...props} styles={{
		options: {
			arrowColor: '#ffffff',
			textColor: '#ffffff'
		}
	}} className={className} />
}

export default TourComponent