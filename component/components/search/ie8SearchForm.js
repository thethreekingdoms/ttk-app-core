import React from 'react'
import { Form } from 'antd'
import moment from 'moment'
import antdFormItem from './ie8AntdFormItem'
import AssistForm from './AssistForm'
// const Option = Select.Option
const FormItem =Form.Item

class SearchForm extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    renderChildOption=(type, option)=> {
        if(!option){
            return null
        }
        return option.map(item=>{
            return React.createElement(type, item, <span title={item.label}>{item.label}</span>)
        })
    }

    renderOption=(type, data, childType, option )=>{
        let arr = type.split('.')
        if( !childType ){
            if ( arr.length == 1 ){
                return React.createElement(antdFormItem[type], data)
            }else{
                return React.createElement(antdFormItem[arr[0]][arr[1]], data)
            }
           
        }else{
            if( arr.length == 1 ){
                return React.createElement(antdFormItem[type],data, this.renderChildOption(antdFormItem[type][childType], option))
            }else {
                return React.createElement(antdFormItem[arr[0]][arr[1]],data, this.renderChildOption(antdFormItem[type][childType], option))
            }
            
        }
    }

    needToBroadcast = (key, value) => {
        if( this.props.onChange ){
            this.props.onChange(key, value)
        }
    }

    renderRange = (data) => {
        const { name, type, pre, next, label, centerContent, isTime } = data
        const { values } = this.props
        const { getFieldDecorator } = this.props.form
        let more = type == 'Checkbox' ? {valuePropName: 'checked'} : {}
        let nextMore = next.rules ? {rules : next.rules} : {}
        let preMore = pre.rules ? {rules : pre.rules} : {}
        let pre_name = pre.name ? pre.name : `${name}_start`
        let next_name = next.name ? next.name : `${name}_end`
        if( next.decoratorDate ) {
            next.disabledDate = (currentDate)=>{
                return next.decoratorDate(currentDate, values[pre_name])
            }
            next.onChange=(value)=>{this.needToBroadcast(next_name, value)}
            pre.onChange=(value)=>{this.needToBroadcast(pre_name, value)}
            pre.disabledDate = (currentDate)=>{
                return pre.decoratorDate(currentDate, values[next_name])
            }
        }
        
        return (
            <div className='select_range'>  
                <div className="select_range_label">{label}</div>
                <FormItem>
                    {getFieldDecorator(pre_name, {
                        initialValue:  values[pre_name],
                        ...more,
                        ...preMore
                    })(
                        pre.render ? pre.render(pre) : this.renderOption(pre.type, pre, pre.childType, pre.option )
                    )}
                </FormItem>
                <div className="select_range_content">{centerContent}</div>
                <FormItem>
                    {getFieldDecorator(next_name, {
                        initialValue:  values[next_name],
                        ...more,
                        ...nextMore,
                    })(
                        next.render ? next.render(next) : this.renderOption(next.type, next, next.childType, next.option )
                    )}
                </FormItem>
            </div>
        )
    }

    renderItem = () =>{
        const { item, values } = this.props
        const { getFieldDecorator } = this.props.form
        let allDom = []
        let itemDom = []
        item.forEach((data, index)=>{
            const { name, range, label, type, className, render, children, option, childType } = data
            if( range ){
                itemDom.push(this.renderRange(data))
            }else if( type == 'AssistForm' ){
                if( itemDom.length > 0 ) {
                    allDom.push(
                        <div className="mk_search_row">
                            {itemDom}
                            {index == item.length -1 && item.length%2 != 0 ? <FormItem></FormItem> : null}
                        </div>
                    )
                    itemDom = []
                }
                allDom.push(
                    <AssistForm
                        ref={form => this.props.target.assistForm=form}
                        {...data}
                    />
                )
                return 
            }else{
                let more = type == 'Checkbox' ? {valuePropName: 'checked'} : {}
                itemDom.push(
                    <FormItem
                        label={<span>{label}</span>}
                    >
                        {getFieldDecorator(name, {
                            initialValue: values[name],
                            ...more
                        })(
                            render ? render(data) : this.renderOption(type, data, childType, option )
                        )}
                    </FormItem>
                )
            }
            if( itemDom.length == 2 || index == item.length -1 ){
                allDom.push(
                    <div className="mk_search_row">
                        {itemDom}
                        {index == item.length -1 && item.length%2 != 0 ? <FormItem></FormItem> : null}
                    </div>
                )
                itemDom = []
            }
        })
        return allDom
    }

    render(){
        const { getFieldDecorator } = this.props.form
        const data = this.props.data
        return (
            <Form>
                {this.renderItem()}
            </Form>
        )
    }
}

export default Form.create()(SearchForm) 