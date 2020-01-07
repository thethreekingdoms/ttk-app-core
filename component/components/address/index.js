import React,{ Component,PropTypes } from 'react'
import {Map} from 'immutable'
import {Select,Input} from 'antd'
import * as city from './city.js'
import {post} from '../../../utils/fetch'

const Option = Select.Option

class AddressComponent extends Component {

    static defaultProps = {
        prefixCls: 'z-address'
    }

    state = {
        cityList: city.cityList,
        districtList: city.countyList,
        provinces: '',
        citys:'',
        districts:'',
        text:'',
        city: city,
        disabled: true,
        isShowDetail:true
    }

    constructor(props){
        super(props)
        this.state.provinces = props.provinces
        this.state.districts = props.districts
        this.state.citys = props.citys
        this.state.text = props.text
        this.state.node = props.getPopupContainer
        Object.assign(this.state, props)
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            provinces : nextProps.provinces,
            districts : nextProps.districts,
            citys : nextProps.citys,
            text : nextProps.text
        })
    }
    componentDidMount() {
        
    }
    // 当值发生改变的时候
  	provincesChange(e){
        this.setState({provinces:e,citys:e.substr(0,2)+'0100',districts:e.substr(0,2)+'0101'})
        this.props.onChange && this.props.onChange(Map({provinces:e,citys:e.substr(0,2)+'0100',districts:e.substr(0,2)+'0101',text:this.state.text}))
  	}
    citysChange(e){
        let districtsArr = [],
            city = this.state.city
        city.countyList.map((x) => {
            if(x.c.substr(0,4) == e.substr(0,4)){
                districtsArr.push(x.c)
            }
        })
        this.setState({citys:e,districts:districtsArr[0]})
        this.props.onChange && this.props.onChange(Map({provinces:this.state.provinces,citys:e,districts:districtsArr[0],text:this.state.text}))
    }
    districtsChange(e){
        this.setState({districts:e})
        this.props.onChange && this.props.onChange(Map({provinces:this.state.provinces,citys:this.state.citys,districts:e,text:this.state.text}))
    }
    addressText(e){
        this.setState({text:e.target.value})
        this.props.onChange && this.props.onChange(Map({provinces:this.state.provinces,citys:this.state.citys,districts:this.state.districts,text:e.target.value}))
    }
    citysInit(){
        let arr = [],
            This = this,
            city = this.state.city
        city && city.cityList.map((x) => {
            if(!!This.state.provinces && This.state.provinces.substr(0,2) == x.c.substr(0,2)){
                arr.push(<Option key={x.c} value={x.c}>{x.n}</Option>)
            }else if(This.state.provinces == ''){
                arr.push(<Option key={x.c} value={x.c}>{x.n}</Option>)
            }
        })
        return arr
    }
    districtsInit(){
        let arr = [],
            This = this,
            city = this.state.city
        city && city.countyList.map((x) => {
            if(!!This.state.citys && This.state.citys.substr(0,4) == x.c.substr(0,4)){
                arr.push(<Option key={x.c} value={x.c}>{x.n}</Option>)
            }else if(This.state.citys == ''){
                arr.push(<Option key={x.c} value={x.c}>{x.n}</Option>)
            }
        })
        return arr
    }
	render(){
		let {value,showDetail,width,height,isRequired} = this.props
        let selectWidth = width || 182,
            selectHeight = height || 29,
            inputWidth = 306,
            city = this.state.city,
            disabled=value.disabled || false,
            isShowDetail = showDetail === false?showDetail:true
        
		return (
			<div className={`prefixCls`}>
                {isRequired ? (
                    <span style={{position:"absolute", zIndex:1, left: 11,top:7}}><span className="ant-form-item-required"></span></span>
                ) : null}

                <Select placeholder="省" className="provinceSelect" getPopupContainer={() => document.querySelector(this.state.node)} disabled={disabled} value={this.state.provinces} style={{height: selectHeight, width: selectWidth, 'margin-right':9 }} onChange={::this.provincesChange} >
                    {
                        city && city.provinceList.map((x) => {
                            return <Option key={x.c} value={x.c}>{x.n}</Option>
                        })
                    }
                </Select>
                <Select placeholder="市" getPopupContainer={() => document.querySelector(this.state.node)} disabled={disabled} value={this.state.citys} style={{height: selectHeight, width: selectWidth, 'margin-right':8 }} onChange={::this.citysChange}>
                    {
                        this.citysInit()
                    }
                </Select>
                <Select placeholder="县" getPopupContainer={() => document.querySelector(this.state.node)} disabled={disabled} value={this.state.districts}  style={{height: selectHeight, width: selectWidth, 'margin-right':showDetail ? 8 : 0}} onChange={::this.districtsChange}>
                    {
                        this.districtsInit()
                    }
                </Select>
                {isShowDetail?<Input disabled={disabled} placeholder="" value={this.state.text} onChange={::this.addressText} style={{height: selectHeight,width:inputWidth}}/>:''}
                
            </div>
		)
	}
}

export default AddressComponent