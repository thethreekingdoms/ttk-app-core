import React from 'react'
import Select from '../antdSelect/index'

const Option = Select.Option

class ActiveLabelSelect extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectLabel: props.selectLabel ?  props.selectLabel : props.option && props.option[0] ? props.option[0].key : '',
            value: props.value ? props.value : '',
            option: props.option || []
        }
    }

    componentWillReceiveProps(nextProps){
        let state = this.state
        const props = this.props
        state = {
            ...state,
            option: nextProps.option || [] ,
            selectLabel: nextProps.selectLabel || '',
            value: nextProps.value ? nextProps.value : state.value
        }
        this.setState(state)
    }

    renderLabelChildItem = () => {
        const { option, selectLabel } = this.state
        return option.map(item => {
            return <Option title={item.name} className="activeLabelSelect-option" key={item.key}>{item.name}</Option>
        })
    }

    labelChange = (value) => {        
        this.state.selectLabel =value
        this.state.value = ''
        this.setState({})
        this.updateToParent()
    }

    renderLable = () => {                
        let { option, selectLabel } = this.state
        const item = option.find(item => item.key == selectLabel)  
        
        if(item){
            this.state.value = item.value 
        }           
        if( !selectLabel) {
            selectLabel = option&& option.length > 0 ? option[0].key : ''
        }
        return (
            <Select
                value={selectLabel}
                onChange={this.labelChange}
                dropdownClassName="activeLabelSelect-option-label-dropDown"
                className="mk-activeLabelSelect-label"
            >
                {this.renderLabelChildItem()}
            </Select>
        )
    }

    renderValueItem = (data) => {
        return data.map(item => {
            return <Option className="activeLabelSelect-option" value={item.value.toString()} title={item.label}>{item.label}</Option>
        })
    }

    valueChange = (value) => {        
        this.state.value = value
        this.setState({})
        this.updateToParent()
    }

    renderValue = () => {        
        let  { option, selectLabel, value } = this.state
        if( !selectLabel ) {
            selectLabel = option&& option.length > 0 ? option[0].key : ''
        }
        const item = option.find(item => item.key == selectLabel)       
        return (
            <Select
                onChange={this.valueChange}
                value={value}
                className="mk-activeLabelSelect-value"
                allowClear={true}
            >
                {item && item.children ? this.renderValueItem(item.children) : null}
            </Select>
        )
    }

    render(){
        return (
            <div className="mk-activeLabelSelect">
                {this.renderLable()}
                {this.renderValue()}
            </div>
        )
    }

    updateToParent = () => {        
        if( this.props.onChange ) {
            let  { selectLabel, value, option } =  this.state
            if( !selectLabel) {
                selectLabel = option&& option.length > 0 ? option[0].key : ''
            }
            this.props.onChange(selectLabel, value)
        }
    }
}

export default ActiveLabelSelect