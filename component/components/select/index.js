import React from 'react'
import Select from 'ttk-rc-select'
import classNames from 'classnames'
import isequal from 'lodash.isequal'
import LazySelect from './lazySelect'

export default class SelectComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			props,
			defaultSelectRows: props.defaultSelectRows,
			selectRows: props.selectRows,
			currentRows: props.defaultSelectRows
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

    shouldComponentUpdate(nextProps, nextState) {
		// if( window.noshouldComponent ) {
        //     return true
        // }
        return !(isequal(this.assitShouldComponent(this.props), this.assitShouldComponent(nextProps)) && isequal(this.state, nextState))
    }

	componentWillReceiveProps(nextProps) {
        // if( !isequal(nextProps, this.props) ){
        //    console.log(isequal(nextProps, this.props))
        // }
    }
	filterOption(props){
		if (props.filterOption) {
			return props.filterOption
		}

		let filterOptionExpressions = props.filterOptionExpressions
		if(filterOptionExpressions){
			// debugger
			let filterFields = filterOptionExpressions.split(',')
			return (input, option)=>{
				for(let f of filterFields){
					let tmp = option.props.children
					if (tmp && tmp.toLowerCase().indexOf(input.toLowerCase()) != -1 )
						return true
				}
				return false
			}
		}
		return undefined
	}

	popupScroll({event, data, defaultSelectRows, selectRows}){
		//data:总数据
		//defaultSelectRows：初始默认行数
		//selectRows:滚动一次加载的行数
		if(this.state.props.selectPagination){
			if(event.target.scrollHeight - event.target.scrollTop - event.target.offsetHeight < 5){
				this.setState({
					currentRows: this.state.currentRows + selectRows
				})
			}
		}else{
			return
		}
	}

	SelectComponent(props) {
		let { className, notFoundContent, optionLabelProp,
			mode, combobox, tags, multiple, size, onPopupScroll,...otherProps } = props
		className = classNames({
			'ant-select': true,
			'mk-select': true,
			[`ant-select-lg`]: size === 'large',
			[`ant-select-sm`]: size === 'small',
			[className]: !!className
		})

		const isCombobox = mode === 'combobox' || combobox
		notFoundContent = notFoundContent || '无匹配结果'

		if (isCombobox) {
			notFoundContent = null;
			// children 带 dom 结构时，无法填入输入框
			optionLabelProp = optionLabelProp || 'value'
		}

		const modeConfig = {
			multiple: mode === 'multiple' || multiple,
			tags: mode === 'tags' || tags,
			combobox: isCombobox,
		}

		let suffix = props.suffix
		if (props.suffix) {
			suffix = React.cloneElement(props.suffix, { style: { float: "right" } })
		}
		if(this.state.props.selectPagination && props.children){
			otherProps.children = props.children.slice(0, this.state.currentRows)
		}
		else{
			otherProps.children = props.children
		}
		if( this.props.lazyload ) {
			return (
				<LazySelect
					{...otherProps}
					{...modeConfig}
					prefixCls='ant-select'
					className={className}
					notFoundContent={notFoundContent}
					suffix={suffix}
					// defaultSelectRows = {this.state.props.defaultSelectRows || 10}  //select组件默认显示行数
					// selectRows = {this.state.props.selectRows || 10} //select组件滚动一次加载的行数
					// selectPagination = {this.state.props.selectPagination || false} //select组件是否支持分页加载
					//onPopupScroll = {(e) => this.popupScroll({event, data: this.props.onPopupScroll, defaultSelectRows: this.props.defaultSelectRows, selectRows: this.props.selectRows})}
				/>
			)
		}
		return (<Select
			{...otherProps}
			{...modeConfig}
			prefixCls='ant-select'
			className={className}
			optionLabelProp={optionLabelProp || 'children'}
			notFoundContent={notFoundContent}
			filterOption={this.filterOption(this.state.props)}
			suffix={suffix}
			defaultSelectRows = {this.state.props.defaultSelectRows || 10}  //select组件默认显示行数
			selectRows = {this.state.props.selectRows || 10} //select组件滚动一次加载的行数
			selectPagination = {this.state.props.selectPagination || false} //select组件是否支持分页加载
			onPopupScroll = {(e) => this.popupScroll({event, data: this.props.onPopupScroll, defaultSelectRows: this.props.defaultSelectRows, selectRows: this.props.selectRows})}
		/>)
	}

	render(){
		return (
			this.SelectComponent(this.props)
		)
	}
}
SelectComponent.Option = Select.Option
SelectComponent.OptGroup = Select.OptGroup
