import React, { Component, PropTypes } from 'react'

export default class Panel extends Component {
    state = {}

    constructor(props) {
        super(props)
    }

    render() {
        const split = this.props.split
        const classes = ['Panel', split, this.props.className]

        const style = Object.assign({}, this.props.style || {}, {
            flex: 1,
            position: 'relative',
            outline: 'none',
            overflow: 'hidden',
            display: 'flex'
        })

        if (this.state.size !== undefined) {
            if (split === 'vertical') {
                style.width = this.state.size
            }
            else if (split === 'horizontal') {
                style.height = this.state.size
            }
            else {
                style.height = this.state.size
                style.display = 'flex'
            }
            style.flex = 'none'
        }

        return (
            <div className={classes.join(' ')} style={style}>
                {this.props.children}
            </div>
        )
    }
}

