import React from 'react'
import Checkbox from '../checkbox/index'
import Icon from '../icon/index'
import Select from '../antdSelect/index'
import message from '../message/index'  
// import { isEqual } from 'lodash'
import isEqual from 'lodash.isequal'

const Option = Select.Option


class FormList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            option: props.assistFormOption ? props.assistFormOption : [],
            selectValue: props.assistFormSelectValue ? props.assistFormSelectValue : [],
            expandKey: ''
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !isEqual(nextProps.assistFormOption , this.props.assistFormOption)|| !isEqual(nextProps.assistFormSelectValue , this.props.assistFormSelectValue) || !isEqual(nextState, this.state)
    }

    componentWillReceiveProps(nextProps){
        const { state } = this
        if( !isEqual(nextProps.assistFormOption , this.props.assistFormOption)|| !isEqual(nextProps.assistFormSelectValue , this.props.assistFormSelectValue) ){
            this.setState({
                option: nextProps.assistFormOption ? nextProps.assistFormOption : state.option,
                selectValue: nextProps.assistFormSelectValue ? nextProps.assistFormSelectValue : state.selectValue,
            })
        }
    }
    

    changeList = (a, b) => {
        let { option } = this.state
        option = JSON.parse(JSON.stringify(option))
        const item1 = option[a]
        const item2 = option[b]
        option[a] = item2
        option[b] = item1
        return option
    }
    
    moveToUp = (key) => {
        let { option } = this.state
        option = JSON.parse(JSON.stringify(option))
        const index = option.findIndex(item => item.key == key)
        if( index == 0) {
            return 
        }
        const data = this.changeList(index-1, index)
        this.setState({
            option: data
        })
    }

    moveToDown = (key) => {
        let { option } = this.state
        option = JSON.parse(JSON.stringify(option))
        const index = option.findIndex(item => item.key == key)
        if( index == option.length - 1) {
            return 
        }
        const data = this.changeList(index, index+1)
        this.setState({
            option: data
        })
    }

    checkboxChange = (key) => {
        const { selectValue, option } = this.state
        const pre = selectValue.length
        const flag = selectValue.filter(item =>  item != key)
        const next = flag.length
        if( pre == next ) {
            flag.push(key)
        }
        if( flag.includes(key) ) {
            this.expandItem(key, true)
        }else{
            this.setState({
                expandKey: ''
            })
        }
        let newOption = option.map(item => {
            if( !flag.includes(item.key) ){
                item.value = []
                return item
            }else{
                return item
            }

        })
        this.setState({
            selectValue: flag,
            option: newOption
        })
    }

    expandItem = (key, checkboxChange) => {
        this.setState({
            expandKey: checkboxChange == true ? key : this.state.expandKey == key ? '' : key
        })
    }

    renderSelectChildren = (data) => {
        if( !data ){
            return null
        }
        return data.map(item => {
            return <Option key={item.value}>{item.label}</Option>
        })
    }

    renderList = (data) => {
        const { selectValue, expandKey } = this.state
        return data.map(item => {
            return (
                <div className="item-list" key={item.key}>
                    <div className="item-list-top">
                        <div className="item-list-top-title">
                            <Checkbox 
                                checked={selectValue.includes(item.key)}
                                onClick={() => this.checkboxChange(item.key)}
                            />
                            <span>{item.name}</span>
                        </div>
                        <div className="item-list-top-line-container"  onClick={ ()=> this.expandItem(item.key) }>
                            <div  className="item-list-top-line"></div>
                        </div>
                        <div className="item-list-top-line-action">
                            <span onClick={ ()=> this.expandItem(item.key) }><Icon type={ expandKey == item.key ? 'up' : 'down' } /></span>
                            <span onClick={() => this.moveToUp(item.key)}><Icon type="arrow-up" /></span>
                            <span onClick={() => this.moveToDown(item.key)}><Icon type="arrow-down" /></span>
                        </div>
                    </div>
                    <div 
                        className="item-list-bottom"
                        style={{
                            display: `${expandKey == item.key ? 'block' : 'none'}`
                        }}
                    >
                        <Select
                            mode="multiple"
                            disabled={!selectValue.includes(item.key)}
                            style={{ width: '100%' }}
                            onChange={(value) => {this.iemtSelectChange(value, item.key)}}
                            value={item.value}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.renderSelectChildren(item.children)}
                        </Select>
                    </div>
                </div>
            ) 
        })
    }

    iemtSelectChange = (value, key) => {
        let { option } = this.state
        option = JSON.parse(JSON.stringify(option))
        const index = option.findIndex(item => item.key == key)
        if( index == -1 ){
            return 
        }
        option[index].value = value
        this.setState({
            option
        })
    }

    render(){
        const { option } = this.state
        const { className, style } = this.props
        return (
            <div className={`FormList ${className ? className : ''}`} style={style}>
                {this.renderList(option)}
            </div>
        )
    }

    getValue = () => {
        const { option, selectValue } = this.state
        return {
            option,
            selectValue
        }
    }
    verify = () => {
        const { selectValue } = this.state
        if( selectValue.length == 0 ){
            message.warn('辅助项目信息不能为空')
        }
        return selectValue.length == 0 ? false : true
    }
}
export default FormList