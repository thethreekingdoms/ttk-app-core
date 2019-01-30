import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from 'antd'
import Button from '../button/index'
import classNames from 'classnames'
import isequal from 'lodash.isequal'
import Message from '../message/index'

class PaginationComponent extends React.Component{
	constructor(props){
		super()
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

    shouldComponentUpdate(nextProps, nextState) {
        // console.log((isequal(this.props, nextProps) && isequal(this.state, nextState)))
        return !(isequal(this.assitShouldComponent(this.props), this.assitShouldComponent(nextProps)) && isequal(this.state, nextState))
    }

	handleClick = () => {
		const props = this.props
		if( !props.total ){
			return
		}
		
		const thisDom = ReactDOM.findDOMNode(this)
		const jumperContaienr = thisDom.getElementsByClassName('ant-pagination-options-quick-jumper')[0]
		if(!jumperContaienr) return
		const dom = jumperContaienr.getElementsByTagName('input')[0]
		if( !dom ) return
		const num = parseInt(dom.value)
		const { total, pageSize } = props
		let size = Math.ceil(total/pageSize)
		if( !isNaN(num) && num > 0 && num <=size ) {
			
			props.onChange && props.onChange(num, null)
		}else {
			Message.warn('输入的页面不存在')
		}
	}

	componentDidMount(){
		this.calJumperInputValue()
	}

	componentDidUpdate(){
		this.calJumperInputValue()
	}

	calJumperInputValue = () => {
		try{
			const props  = this.props
			const me = ReactDOM.findDOMNode(this)
			if( !me ) {
				setTimeout(()=>this.calJumperInputValue(), 10)
				return
			}
			const jumperContaienr = me.getElementsByClassName('ant-pagination-options-quick-jumper')[0]
			if(!jumperContaienr) return setTimeout(()=>this.calJumperInputValue(), 10)
			const dom = jumperContaienr.getElementsByTagName('input')[0]
			if( !dom ) return setTimeout(()=>this.calJumperInputValue(), 10)
			if( parseInt(dom.value) == parseInt(props.current) ){
				return  
			}
			if( props.current ||  props.current == 0) {
                setTimeout(()=>{
					dom.value = props.current
				}, 16)
            }
		}catch(err){
			console.log(err)
		}
		
	}

	render(){
		const props = this.props
		let className = classNames({
			'mk-pagination': true,
			[props.className]: !!props.className
		})
		return (
			<div  className={className} >
				<Pagination pageSizeOptions={['50', '100', '150', '200']} {...props} showQuickJumper={true} showSizeChanger ={true}/>
				{ props.showQuickJumper != false ? <Button onClick={() => this.handleClick()} disabled={this.props.total ? false : true} className="mk-pagination-goto-btn">跳转</Button> : null }
			</div>
		)
	}
}

export default  PaginationComponent
// (props) {
// 	let className = classNames({
// 		'mk-pagination': true,
// 		[props.className]: !!props.className
// 	})
// 	const handleClick = () => {
// 		// props
// 		const jumperContaienr = document.getElementsByClassName('ant-pagination-options-quick-jumper')[0]
// 		if(!jumperContaienr) return
// 		const dom = jumperContaienr.getElementsByTagName('input')[0]
// 		if( !dom ) return
// 		const num = parseInt(dom.value)
// 		const { total, pageSize } = props
// 		let size = Math.ceil(total/pageSize)
// 		if( !isNaN(num) && num > 0 && num <=size ) {
			
// 			props.onChange && props.onChange(num, null)
// 		}else {
// 			Message.warn('输入的页面不存在')
// 		}
// 	}
// 	const calJumperInputValue = () => {
// 		setTimeout(()=>{
// 			const jumperContaienr = document.getElementsByClassName('ant-pagination-options-quick-jumper')[0]
// 			if(!jumperContaienr) return calJumperInputValue()
// 			const dom = jumperContaienr.getElementsByTagName('input')[0]
// 			if( !dom ) return calJumperInputValue()
// 			console.log('sssss')
// 			if( dom.value == props.current ){
// 				return  
// 			}
// 			dom.value = props.current
// 		}, 0)
// 	}
// 	calJumperInputValue()
// 	return (
// 		<div  className={className} >
// 			<Pagination {...props} showQuickJumper={true} showSizeChanger ={true}/>
// 			{ props.showQuickJumper != false ? <Button onClick={() => handleClick()} type="primary" className="mk-pagination-goto-btn">确定</Button> : null }
// 		</div>
// 	)
// }
