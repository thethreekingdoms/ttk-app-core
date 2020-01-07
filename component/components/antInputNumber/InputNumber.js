import React, { Component } from 'react';
import { InputNumber } from 'antd';

export default class InputNumberComponent extends Component {

    state = {
        dafaultValue: this.props.dafaultValue || '',
        focusStatus: false
    }

    static defaultProps = {
        dafaultValue: '',
    }

    componentDidMount() {

        this.preValue = this.inputRef.inputNumberRef.state.inputValue || ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dafaultValue != this.state.dafaultValue) {
            this.setState({
                dafaultValue: nextProps.dafaultValue
            })
        }
    }

    componentWillUnmount() {
        this.preValue = ''
    }

    formatter = (value) => {

        let regex = /(\d)(?=(?:\d{3})+$)/g
        if (`${value}`.indexOf('.') > -1) {
            regex = /(\d{1,3})(?=(\d{3})+(?:\.))/g
        }
        value = `${value}`.replace(regex, "$1,")
        if (this.props.clearZero === true && this.state.focusStatus !== 'changing') {
            value = `${value}`.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
        }
        return value;
    }

    parser = (value) => {

        let { precision } = this.props;
        if (!this.preValue) this.preValue = ''
        if (!precision) precision = 6

        if (value === '-' || value === '-0' || value === '-0.') {
            this.preValue = value
            return value
        }

        if (value === '00') {
            this.preValue = '0'
            return '0'
        }

        if (value === '-00') {
            this.preValue = '-0'
            return '-0'
        }

        if (value === '--' || value == '-.') {
            this.preValue = '-'
            return '-'
        }

        value = `${value}`.replace(/\$\s?|(,*)/g, '')

        if (!isNaN(Number(value))) {
            if (value.indexOf('.') > -1) {
                let len = `${value}`.length - `${value}`.indexOf('.') - 1
                if (len > precision) {
                    return this.preValue
                }
            }
            this.preValue = value

            return value
        } else {
            return this.preValue
        }
    }

    onChange = (value) => {
        // console.log(this.inputRef, 'this.inputRef')
        this.setState({
            focusStatus: 'changing'
        })
        if (this.preValue === '-0' || this.preValue === '-0.') {
            value = this.preValue
        }

        let { onChange } = this.props;
        onChange && onChange(value)

    }

    onBlur = (e) => {

        this.setState({
            focusStatus: false
        })

        let { onBlur, clearZero } = this.props;
        e.target.value = `${e.target.value}`.replace(/,/g, '');
        if (clearZero === true) {
            if (e.target.value) {
                e.target.value = `${e.target.value}`.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
            }
        }
        onBlur && onBlur(e)

    }

    onFocus = (e) => {
        this.setState({
            focusStatus: true
        })
        let { onFocus } = this.props;
        onFocus && onFocus(e)

    }



    render() {
        const { dafaultValue } = this.state;
        let title
        if (Object.keys(this.props).includes('title')) {
            title = this.props.title || ''
        } else if (Object.keys(this.props).includes('value')) {
            title = this.formatter(this.props.value || '')
        } else {
            title = this.formatter(this.props.defaultValue || '')
        }
        return (
            <div title={title}>
                <InputNumber
                    {...this.props}
                    defaultValue={dafaultValue}
                    formatter={this.formatter}
                    parser={this.parser}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    ref={ref => this.inputRef = ref}
                />
            </div>
        );
    }
}