// // export { default as Steps } from './steps'
// // export { default as Hints } from './hints'

// import React, { Component } from 'react'

// import Setps from './steps'
// import classNames from 'classnames'



// export default function StepComponent(props) {
// 	let className = classNames({
// 		'ttk-step': true,
// 		[props.className]: !!props.className
// 	})
// 	return <Setps {...props} className={className} />
// }


// /*

// export default class StepComponent extends Component {
// 	constructor(props) {
// 		super(props)
// 		debugger
// 		this.state = {
// 			stepsEnabled: true,
// 			initialStep: 0,
// 			steps: [
// 				{
// 					element: '.hello',
// 					intro: 'Hello step',
// 				},
// 				{
// 					element: '.world',
// 					intro: 'World step',
// 				},
// 			]
// 		}
// 	}
// 	onExit = () => {
// 		this.setState(() => ({ stepsEnabled: false }));
// 	};

// 	render() {
// 		debugger
// 		const { stepsEnabled, steps, initialStep } = this.state;

// 		return (
// 			<div>
// 				<Steps
// 					enabled={stepsEnabled}
// 					steps={steps}
// 					initialStep={initialStep}
// 					onExit={this.onExit}
// 				/>



// 				<h1 className="hello">Hello,</h1>
// 				<hr />
// 				<h1 className="world">World!</h1>
// 				<hr />
// 				<h1 className="alive">It's alive!</h1>
// 			</div>
// 		);
// 	}
// }


// */