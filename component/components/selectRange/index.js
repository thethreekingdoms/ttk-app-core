import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import {Map} from 'immutable'
import { Select, Input } from 'antd'
const Option = Select.Option;

export default class selectRange extends React.Component {


    state = {
        data: Map({
            path: '',
            rangeStart: '',
            rangeEnd: '',
            className: '',
            isEndOpen: false,
            startDate: '',
            endDate: '',
            style: {},
            isEndLessThanStart: false//控制input输入值，为true时，后一项不能小于前一项，false不做判断
        })
    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
    }


    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props) {
        let { data } = this.state
        const { className, value, style, startOption, endOption, allowClear } = props
        const { rangeEnd, rangeStart } = value
        data = this.set(null, { className, rangeEnd, rangeStart, style, startOption, endOption, allowClear })
        return { data }
    }


    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        window._this = this.state.data
        return this.state.data.get(propertyName)
    }

    set(propertyName, value) {
        let data = this.state.data
        if (!propertyName || propertyName === '') {
            return data.merge(value)
        }
        if (typeof value === 'object') {
            return data.mergeIn(propertyName.split('.'), value)
        }
        else {
            return data.setIn(propertyName.split('.'), value)
        }
    }

    onStartChange = (value) => {
        let { data } = this.state
        data = this.set(null, { rangeStart: value })
        this.setState({ data })
        this.props.onChange && this.props.onChange({
            rangeStart: value,
            rangeEnd: this.get('rangeEnd')
        })
    }

    onEndChange = (value) => {
        let { data } = this.state
        data = this.set(null, { rangeEnd: value })
        this.setState({ data })
        this.props.onChange && this.props.onChange({
            rangeStart: this.get('rangeStart'),
            rangeEnd: value
        })
    }


    renderStart=() => {
        const startOption = this.get('startOption'),
        rangeStart = this.get('rangeStart')
        if( !startOption ) {
            return (
                <Input 
                    onChange={this.onStartChange} 
                    value={rangeStart}
                    allowClear={this.get('allowClear')}
                />
            )
        }else {
            startOption.props.onChange = this.onStartChange
            startOption.props.value = rangeStart
            startOption.props.allowClear = this.get('allowClear')
            return startOption
        }
    }

    renderEnd = () => {
        const endOption = this.get('endOption'),
        rangeEnd = this.get('rangeEnd')
        if( !endOption ){
            return (
                <Input
                    onChange={this.onEndChange}
                    value={rangeEnd}  
                    allowClear={this.get('allowClear')}
                />
            )
        } else {
            endOption.props.onChange = this.onEndChange
            endOption.props.value = rangeEnd
            endOption.props.allowClear = this.get('allowClear')
            return endOption
        }
    }

    render() {
        const className = this.get('className'),
            style = this.get('style')
        return (
            <div className={`${className} mk-selectRange`} style={style}>
                {this.renderStart()}
                <div className="mk-selectRange-center">{this.props.centerContent}</div>
                {this.renderEnd()}
            </div>
        )
    }
}
