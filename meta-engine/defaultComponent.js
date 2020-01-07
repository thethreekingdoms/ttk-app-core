import React, { PureComponent } from 'react'

import wrapper from './wrapper'

@wrapper()
export default class C extends PureComponent {
	render() {
		return this.props.monkeyKing({ ...this.props, path: 'root' })
	}
}