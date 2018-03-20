import React from 'react'
import { DatePicker } from 'antd'
import classNames from 'classnames'
import moment from 'moment'
import utils from '../../../utils/date/index'

const MonthPicker = DatePicker.MonthPicker


class DateRangeMonthPicker extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            preValue: props.value && props.value[0] ? props.value[0] : null,
            nextValue: props.value && props.value[1] ? props.value[1] : null,
            visible: false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            preValue: nextProps.value && nextProps.value[0] ? nextProps.value[0] : null,
            nextValue: nextProps.value && nextProps.value[1] ? nextProps.value[1] : null,
        })
    }

    transformDateToNum=(date)=>{
        let time = date
        if( typeof date == 'string' ){
            time = utils.date.transformMomentDate(date)
        }
        return parseInt(`${time.year()}${time.month() < 10 ?  `0${time.month()}` : `${time.month()}`}`)
    }

    dateWindowChange = (type, status) => {
        if( type == 'next' ){
            this.setState({
                visible: status
            })
        }
        if( type == 'next' && status == false ){
            // 采用异步是因为datePicker的onchange事件晚于onOpenChange触发
            setTimeout(()=>{
                this.update()
            }, 0)
        }
    }

    dateChange = (type, value) => {
        // 针对setstate设置this.state是异步的，因为update需要取值
        this.state[type] = value
        this.setState({
            [type]: value,
            visible: type == 'nextValue' ? false : true
        })
        if( type == 'preValue' ){
            const preNum = this.transformDateToNum(value)
            const { nextValue } = this.state
            const nextNum = this.transformDateToNum(nextValue)
            if( nextNum < preNum ){
                this.setState({
                    nextValue: value
                })
            }

        }
    }

    nextClick=()=>{
        this.setState({
            visible: true
        })
    }

    update = () => {
        const { preValue, nextValue } = this.state
        if( this.props.onChange ){
            this.props.onChange([ preValue, nextValue ])
        }
        if( this.props.onPanelChange ){
            this.props.onPanelChange([ preValue, nextValue ])
        }
    }

    transformDateToNum = (date) => {
        let time = date
        if (typeof date == 'string') {
            time = moment(new Date(date))
        }
        return parseInt(`${time.year()}${time.month() < 10 ? `0${time.month()}` : `${time.month()}`}`)
    }

    disabledStartDate = (currentValue) => {
        const { startEnableDate } = this.props
        const { nextValue } = this.state
        if( !nextValue && !startEnableDate ){
            return false
        }
        if( !startEnableDate ) {
            return this.transformDateToNum(nextValue) < this.transformDateToNum(currentValue)
        }else{
            return this.transformDateToNum(currentValue) < this.transformDateToNum(startEnableDate)
        }
    
        return false
    }
    disabledEndDate = (currentValue) => {
        const { endEnableDate } = this.props
        const { preValue } = this.state
        if( !preValue && !endEnableDate ){
            return false
        }
        if( !endEnableDate ) {
            return this.transformDateToNum(preValue) > this.transformDateToNum(currentValue)
        }else{
            return this.transformDateToNum(preValue) > this.transformDateToNum(currentValue) || this.transformDateToNum(currentValue) > this.transformDateToNum(endEnableDate)
        }
    
        return false
    }

    render(){
        const { preValue, nextValue, visible } = this.state
        const props = this.props
        let className = classNames({
            'mk-dateRangeMonthPicker': true,
            [props.className]: !!props.className
        })
        return (
            <div className={className}>
                <MonthPicker
                    { ...props }
                    disabledDate={ props.disabledStartDate ? props.disabledStartDate : this.disabledStartDate }
                    value={ preValue }
                    onOpenChange={(status) => this.dateWindowChange('pre', status)}
                    onChange={ (value) => this.dateChange('preValue', value) }
                />
                <span style={{padding: '0 3px', lineHeight: '30px'}}>-</span>
                <MonthPicker
                    {...props}
                    disabledDate={ props.disabledEndDate ? props.disabledEndDate : this.disabledEndDate}
                    onClick={ this.nextClick }
                    value={ nextValue }
                    open={ visible }
                    onOpenChange={(status) => this.dateWindowChange('next', status)}
                    onChange={ (value) => this.dateChange('nextValue', value) }
                />
            </div>
        )
    }
}

export default DateRangeMonthPicker