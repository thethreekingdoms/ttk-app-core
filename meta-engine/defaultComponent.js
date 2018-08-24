import React, { Component } from 'react'

import wrapper from './wrapper'

@wrapper()
export default class C extends Component {
	render() {
		return this.props.monkeyKing({ ...this.props, path: 'root' })
	}
}