import React, { Component, PropTypes } from 'react';


export default class Resizer extends Component {
    constructor(props) {
        super(props)
        this.onMouseDown = this.onMouseDown.bind(this)
    }

    onMouseDown(event) {
        this.props.onMouseDown(event)
    }

    render() {
        const { split, className } = this.props
        const classes = ['Resizer', split, className]
        return (
            <span 
                className={classes.join(' ')} 
                style={this.props.style || {width: 3,cursor: 'e-resize'}} 
                onMouseDown={this.onMouseDown} 
            />
        )
    }
}

