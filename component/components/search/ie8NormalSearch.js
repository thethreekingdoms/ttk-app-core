import React from 'react'
import moment from 'moment'
import antdFormItem from './ie8AntdFormItem'
import Button from '../button/index'



const renderOption=(type, data, childType, target )=>{
    if( type.includes('RangePicker') ){
        data.onPanelChange = (e) => {
            target.normalSearchChange(data.name, e, 'time')
        }
        data.className = `${data.className} ${target.datePickerRandom}`
        const { DatePickerOpen } = target.state
        data.renderExtraFooter = () => {
            return (
                <Button type="primary" style={{ float: 'right' }} size='small' onClick={target.normalSelectDate}>
                    确定
                </Button>
            )
        }
        data.open = DatePickerOpen
    }else if(type == 'Input') {
        data.onChange = (e) => {
            target.normalSearchChange(data.name, e, 'e')
        }
    }else if( type == 'DateRangeMonthPicker' ||type=='DateRangeDatePicker'){
        if( !data.onChange ){
            data.onChange = (e) => {
                target.normalSearchChange(data.name, e, 'time', true)
            }
        }
    }else{
        data.onChange = (e) => {
            target.normalSearchChange(data.name, e, 'value')
        }
    }

    let arr = type.split('.')
    if( !childType ){
        if ( arr.length == 1 ){
            return React.createElement(antdFormItem[type], data)
        }else{
            return React.createElement(antdFormItem[arr[0]][arr[1]], data)
        }
        
    }else{
        if( arr.length == 1 ){
            return React.createElement(antdFormItem[type],data)
        }else {
            return React.createElement(antdFormItem[arr[0]][arr[1]], data)
        }
    }
}

function normalSearch (data, target){
    return renderOption(data.type, data, data.childType, target )
}

export default normalSearch
