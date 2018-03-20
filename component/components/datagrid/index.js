import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import omit from 'omit.js'
import Grid from './grid'

import {
    Column,
    ColumnGroup
} from 'fixed-data-table-2'
import Cell from './cell'
import TextCell from './textCell'
//import _ from 'underscore'

class DataGridComponent extends React.Component {
    state = {
        height: 0,
        width: 0,
        rowsCount: 0,
        // scrollTop: 0,
        // scrollLeft: 0
    }
    
    constructor(props) {
        super(props)
        this.onResize = this.onResize.bind(this)
        // this.onScrollEnd = this.onScrollEnd.bind(this)
        // this.update = this.update.bind(this)
        // this.setStateDebounce = _.debounce(({ width, height }) => {
        //     this.setState({
        //         height,
        //         width
        //     })
        // }, 1)
        this.rowsCount = props.rowsCount
        this.changetab = props.changetab
    }


    componentDidUpdate(prevProps, prevState) {
    }

    componentDidMount() {
        //if (this.props.isFix === true) return
        this.refreshSize()
      
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
        let dom = ReactDOM.findDOMNode(this)
        this.setState({
            height: dom.offsetHeight,
            width: dom.offsetWidth
        })
    }

    componentWillReceiveProps(prevProps, prevState){
        // console.log(prevProps)
        this.rowsCount = this.state.rowsCount;
        this.changetab = this.props.changetab
        this.setState({
            rowsCount: prevProps.rowsCount,
            // scrollTop: prevProps.top
        })
    }

    // shouldComponentUpdate(prevProps, prevState){
    //     console.log('shouldComponentUpdate',prevState)
    //     return true
    // }

    componentWillUnmount() {
        //if (this.props.isFix === true) return
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
    }

    onResize() {
        this.refreshSize()
        if (this.props.onResize)
            setTimeout(this.props.onResize, 16)
    }

    refreshSize() {
        let dom = ReactDOM.findDOMNode(this)
        this.setState({
            height: dom.offsetHeight,
            width: dom.offsetWidth
        })
        
        
        // let keyRandom = Math.floor(Math.random()*100000)
        // this.keyRandom = keyRandom
        // setTimeout(()=>{
        //     if( keyRandom == this.keyRandom ) {
        //         let dom = ReactDOM.findDOMNode(this)
        //         this.setState({
        //             height: dom.offsetHeight,
        //             width: dom.offsetWidth
        //         })
        //     }
        // }, 500)
    }

    componentDidUpdate(){
        let width = ReactDOM.findDOMNode(this).offsetWidth
        if(width !== this.state.width){
            this.setState({
                width: width
            })
        }
    }

    // onScrollEnd = (x, y) => {
    //     console.log('scroll', x, y)
    //     this.setState({
    //         scrollTop: y,
    //         scrollLeft: x
    //     })
    //     // this.props.callBack('onScrollEnd', { path: this.props.path, x, y })
    // }

    // update() {
    //     let dom = ReactDOM.findDOMNode(this),
    //         height = dom.clientHeight,
    //         width = dom.clientWidth
    //     this.setStateDebounce({
    //         height,
    //         width
    //     })
    // }
    render() {
        let className = classNames({
            'mk-datagrid': true,
            'mk-datagrid-editable': this.props.readonly === false,
            [this.props.className]: !!this.props.className,
            'mk-addDel': this.props.enableAddDelrow || this.props.showBtnWidth,
            'mk-upDown': this.props.enableUpDownrow || this.props.showBtnWidth,
            'mk-ellipsis': this.props.ellipsis
        })

        let height = this.state.height,
            width = this.state.width,
            oldRowsCount = this.rowsCount,
            // onScrollEnd = this.onScrollEnd,
            // scrollLeft = this.state.scrollLeft,
            // scrollTop = this.changetab == this.props.changetab ? this.state.scrollTop : 0,
            changetab = this.changetab == this.props.changetab,
            loading = this.props.loading

        if (this.props.enableAddDelrow || this.props.enableUpDownrow || this.props.showBtnWidth) {
            height = height
            width = width - 50
        }
        if (this.props.isFix) {
            if (height > this.props.height) height = this.props.height
        }

        return (
            <div className={className}
                onKeyDown={this.props.onKeyDown}
                onKeyUp={this.props.onKeyUp}>
                {Grid({
                    ...omit(this.props, ['className']),
                    width,
                    height,
                    oldRowsCount,
                    // onScrollEnd,
                    // scrollLeft,
                    // scrollTop
                    changetab,
                    loading
                })}
            </div>
        )
    }
}

DataGridComponent.Cell = Cell
DataGridComponent.TextCell = TextCell
DataGridComponent.Column = Column
DataGridComponent.ColumnGroup = ColumnGroup

export default DataGridComponent