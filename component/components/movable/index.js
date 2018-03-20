import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

export default class movableComponent extends Component {

	static defaultProps = {
      	prefixCls: 'mk-movable'
  	}

    state = {
	    pos:{x: 0,y: 0},
        startMove: false,
	    isMoving: false,
        isMoved: false,
        rel: null
    }

    constructor(props){
        super(props)
    }


    handleMouseDown = (e) =>{
        if (e.button !== 0) return
        var pos = ReactDOM.findDOMNode(this.refs.internal).getBoundingClientRect()
        var parentPos = ReactDOM.findDOMNode(this.refs.internal).parentElement.getBoundingClientRect()
        this.setState({
            startMove: true, 
            rel: {
                x: pos.left - parentPos.left ,
                y: pos.top - parentPos.top,
                oldPageX: e.pageX,
                oldPageY: e.pageY,
                maxX :parentPos.width - pos.width,
                maxY : parentPos.height - pos.height
            },
            pos:{
                x: pos.left - parentPos.left ,
                y: pos.top - parentPos.top
            }
        })
           
        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)
        
        e.stopPropagation()
        e.preventDefault()
    }

    handleMouseMove = (e) =>{
        if (!this.state.startMove) return

        let x = e.pageX - this.state.rel.oldPageX + this.state.rel.x,
            y = e.pageY - this.state.rel.oldPageY + this.state.rel.y

        if(x < 0)
            x = 0

        if(x > this.state.rel.maxX)
            x = this.state.rel.maxX

        if(y < 0)
            y = 0

        if(y > this.state.rel.maxY)
            y = this.state.rel.maxY


        this.setState({
            pos: {x,y}, 
            isMoving: true,
            isMoved: true
        })
        e.stopPropagation()
        e.preventDefault()

    }

    handleMouseUp = (e) =>{
        let w = Math.abs(this.state.pos.x - this.state.rel.x), 
            h = Math.abs(this.state.pos.y - this.state.rel.y)

        const validOffset = (w<5 && h <5)
        if((validOffset || !this.state.isMoving) && this.props.onClick)
            this.props.onClick() 
        this.setState({isMoving: false,startMove: false})
    	document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        e.stopPropagation()
        e.preventDefault()
    }

    handleClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    render(){

    	let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.props.className]: !!this.props.className,
		}), style

        if(!this.state.isMoved){
            style = this.props.style || {}
            style.position = 'absolute'
            style.lineHeight = (style.height|| 70) + 'px'
            style.textAlign = 'center'
        }else{
            style = this.props.style || {}
            style = {
                position: 'absolute',
                left: this.props.isStopX ? this.state.rel.x :this.state.pos.x,
                top: this.props.isStopY ? this.state.rel.y :this.state.pos.y,
                width: style.width || 70,
                height:style.height || 70,
                lineHeight: (style.height || 70) + 'px', 
                textAlign: 'center'
            }
        }

    	return (
    		<div 
                ref='internal' 
                className={className}
                {...this.props}
                onMouseDown={this.handleMouseDown}
                onClick = {this.handleClick}
                style={style}>
                {this.props.children}
    		</div>
    	)
    }

}