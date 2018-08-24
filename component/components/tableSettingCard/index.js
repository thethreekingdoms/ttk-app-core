import React from 'react'
import classNames from 'classnames'
import { Map, fromJS } from 'immutable'
import isequal from 'lodash.isequal'
import Button from '../button/index'
import Checkbox from '../checkbox/index'

class TableSettingCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.ininData(props.data),
            initData: JSON.parse(JSON.stringify(props.data)),
            height: null,
            top: -2000,
            firstVisible: props.visible
        }

    }

    assitShouldComponent = (target) => {
        let obj = {}
        for( const [key, value] of Object.entries(target) ) {
            if( typeof(value) != 'function' ) {
                obj[key] = value
            }
        }
        return obj
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log((isequal(this.props, nextProps) && isequal(this.state, nextState)))
    //     return !(isequal(this.assitShouldComponent(this.props), this.assitShouldComponent(nextProps)) && isequal(this.state, nextState))
    // }

    getAbsPoint = (e) => {
        var x = e.offsetLeft
        var y = e.offsetTop
        while (e = e.offsetParent) {
            x += e.offsetLeft
            y += e.offsetTop
        }
        return { x, y }
    }

    componentDidMount() {
        let table = document.getElementsByClassName(this.props.positionClass)[0]
        if (table) {
            const point = this.getAbsPoint(table)
            let height = window.innerHeight - point.y - 10
            this.setState({
                height,
                top: point.y
            })
        }
        window.addEventListener('resize', this.computed, false)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.computed, false)
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.visible != this.props.visible ) {
            this.state.firstVisible = true
        }
        const data = this.ininData(nextProps.data)
        this.setState({
            data: data,
            ininData: JSON.parse(JSON.stringify(data))
        })
    }

    ininData = (data) => {
        if (!data) {
            return []
        }
        try {
            //bug TTK-1361 栏目顺序显示不正确 myf
            // data.sort((a, b) => {
            //     return a.id > b.id
            // })
            return data
        } catch (err) {
            console.log(err)
        }

    }

    handleChange = (e, item) => {
        const  data =  fromJS(this.state.data).toJS()
        const index = data.findIndex(index => {
            return index.id == item.id
        })
        data[index] = {
            ...data[index],
            isVisible: e.target.checked
        }
        this.setState({
            data
        })
    }

    computed = () => {
        let table = document.getElementsByClassName(this.props.positionClass)[0]
        if (table) {
            const point = this.getAbsPoint(table)
            let height = window.innerHeight - point.y - 10
            this.setState({
                height,
                top: point.y 
            })
        }
    }

    renderItem = (data) => {
        const arrLeft = [],
            arrRight = []
        data.forEach((item) => {
            if (item.isHeader == true) {
                arrLeft.push(
                    <div className="mk-tableSetting-item">
                        <Checkbox
                            className={`${item.isVisible ? 'active' : ''}`}
                            checked={item.isVisible}
                            onChange={(value) => this.handleChange(value, item)}
                            disabled={item.isMustSelect}
                        >
                            {item.caption}
                        </Checkbox>
                    </div>
                )
            } else {
                arrRight.push(
                    <div className="mk-tableSetting-item">
                        <Checkbox
                            className={`${item.isVisible ? 'active' : ''}`}
                            checked={item.isVisible}
                            onChange={(value) => this.handleChange(value, item)}
                            disabled={item.isMustSelect}
                        >
                            {item.caption}
                        </Checkbox>
                    </div>
                )
            }
        })
        return [arrLeft, arrRight]
    }

    renderItem2 = (data) => {
        const arr = data.map((item) => {
            return (
                <div className="mk-tableSetting-item-style2">
                    <Checkbox
                        className={`${item.isVisible ? 'active' : ''}`}
                        checked={item.isVisible}
                        onChange={(value) => this.handleChange(value, item)}
                        disabled={item.isMustSelect}
                    >
                        {item.caption}
                    </Checkbox>
                </div>
            )
        })
        // console.log(arr)
        return arr
    }

    confirmClick = () => {
        this.setState({
            initData: JSON.parse(JSON.stringify(this.state.data))
        })
        if (this.props.confirmClick) {
            this.props.confirmClick(this.state.data)
        }
    }

    cancelClick = () => {
        this.setState({
            data: JSON.parse(JSON.stringify(this.state.initData))
        })
        if (this.props.cancelClick) {
            this.props.cancelClick()
        }
    }
    reset = () => {
        if (this.props.resetClick) {
            this.props.resetClick()
        }
    }
    renderStyle1 = () => {
        const { data, height, top } = this.state
        const [arrLeft, arrRight] = this.renderItem(data)
        const arr = [
            <div className="mk-tableSetting-header">
                    <span>表头</span>
                    <span>明细</span>
            </div>,
            <div className="mk-tableSetting-container">
                <div className="mk-tableSetting-title">
                    {arrLeft}
                </div>
                <div className="mk-tableSetting-detail">
                    {arrRight}
                </div>
                <div className="mk-tableSetting-line">
                </div>
            </div>
        ]
        return arr
    }

    renderStyle2 = () => {
        const { data, height, top } = this.state
        const arr = this.renderItem2(data)
        return (
            <div className="mk-tableSetting-container2">
                {arr}
            </div>
        )
    }

    render() {
        const props = this.props
        let className = classNames({
            'mk-tableSetting':true,
            'mk-tableSetting1': props.showTitle?true:false,
            'mk-tableSetting2': props.showTitle?false:true,
            [props.className]: !!props.className,
            'animated': true,
            'slideInRight': this.props.visible,
            'slideOutRight': !this.props.visible,
        })
        let className2 = classNames({
            'mk-tableSetting-bottom': true,
            'slideInRight': this.props.visible,
            'slideOutRight': !this.props.visible
        })
        let className3 = classNames({
            'mk-tableSetting-bottom-btn': true,
            'left-btn': true,
        })
        const { data, height, top } = this.state
        const [arrLeft, arrRight] = this.renderItem(data)
        return (
            <div style={{display: `${this.state.firstVisible == false ?  'none' : 'block'}`}}>
                <div
                    className={className}
                    style={{ 
                        height: `${height}px`, 
                        position: 'fixed',
                        right: '0px',
                        top: `${top}px`,
                    }}
                >
                    <h2>栏目设置</h2>
                    <div style={{height: '100%', overflow: 'auto'}}>{  !props.showTitle ? this.renderStyle2() : this.renderStyle1()}</div>
                    <div className={className2}>
                        <Button className="mk-tableSetting-bottom-btn" onClick={this.cancelClick}>取消</Button>
                        
                        <Button className="mk-tableSetting-bottom-btn" onClick={this.reset}>重置</Button>
                        <Button className="mk-tableSetting-bottom-btn" type="primary " onClick={this.confirmClick}>确定</Button>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default TableSettingCard

