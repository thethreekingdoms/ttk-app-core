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
			currentRows: props.defaultSelectRows || 50,
			rowHeight: props.rowHeight || 36,
			isScrollBarTrigger: false,
			keyRandom: props.keyRandom || 0
		}
	}
	assitShouldComponent = (target) => {
		let obj = {}
		for (const [key, value] of Object.entries(target)) {
			if (typeof (value) != 'function') {
				obj[key] = value
			}
		}
		return obj
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !(isequal(this.assitShouldComponent(this.props), this.assitShouldComponent(nextProps)) && isequal(this.state, nextState))
	}

	componentWillReceiveProps(nextProps) {
		// console.log('componentWillReceiveProps')
		// let { children, value, selectPagination, selectRows } = nextProps
		// if (selectPagination && value && children && !nextState.isScrollBarTrigger) {
		// 	const dom = document.querySelector('.ant-select-dropdown-menu')
		// 	if (children instanceof Array
		// 		&& dom && dom.scrollHeight > 0
		// 	) {
		// 		const curIndex = children.findIndex(item => {
		// 			return item.props && item.props.value == value
		// 		})
		// 		const defaultCount = 5 * selectRows
		// 		let perDataPage
		// 		if (curIndex > defaultCount) {
		// 			let startIndex = curIndex - defaultCount
		// 			const endIndex = curIndex + selectRows
		// 			perDataPage = children.slice(startIndex, endIndex)					
		// 			nextProps.children = perDataPage
		// 		}
		// 	}
		// }
	}

	componentWillUpdate(nextProps, nextState) {
		// console.log('componentWillUpdate')
		// const { children, value, selectPagination, selectRows } = nextProps 
		// if (selectPagination && value && !nextState.isScrollBarTrigger) {
		// 	const dom = document.querySelector('.ant-select-dropdown-menu')
		// 	if (children && children instanceof Array && dom) {
		// 		const endIndex = children.findIndex(item => {
		// 			return item.props && item.props.value == value
		// 		})
		// 		let rowHeight = nextState.rowHeight,//行高								
		// 			dataLens = endIndex,//当前选择行对应的数据
		// 			dataShowHeight = dom && dom.offsetHeight,//内容高+padding+边框
		// 			sumHeight = Math.floor(dataLens * rowHeight),//当前选择数据距离顶部的高度
		// 			dataHeight = rowHeight * selectRows
		// 		if (sumHeight > dataHeight) {
		// 			setTimeout(() => {
		// 				this.calcScrollTop(sumHeight, dataShowHeight)
		// 			}, 20);
		// 		}
		// 	}
		// }
	}
	/**计算滚动条高度 */
	// calcScrollTop = (sumHeight, dataShowHeight = 216) => {
	// 	const dom = document.querySelector('.ant-select-dropdown-menu')
	// 	if (dom && dom.scrollTop !== undefined) {
	// 		dom.scrollTop = sumHeight
	// 		//console.log("scrollHeight:" + dom.scrollHeight + " scrollTop:" + dom.scrollTop)
	// 		let differShowHeight = sumHeight - Math.floor(Math.round(dom.scrollTop))
	// 		if (dom.scrollHeight > 0 && differShowHeight > 0) {
	// 			if (differShowHeight < dataShowHeight) {
	// 				dom.scrollTop = dom.scrollHeight - dataShowHeight
	// 			} else {
	// 				setTimeout(() => {
	// 					this.calcScrollTop(sumHeight, dataShowHeight)
	// 				}, 30);
	// 			}
	// 		}
	// 	}
	// }

	filterOption(props) {
		if (props.filterOption) {
			if (props.selectPagination && props.children) {
				const data = props.children
				if (data.length < 1) {
					return false
				}
			}
			return props.filterOption
		}
		let filterOptionExpressions = props.filterOptionExpressions
		if (filterOptionExpressions) {
			let filterFields = filterOptionExpressions.split(',')
			return (input, option) => {
				for (let f of filterFields) {
					let tmp = option.props.children
					if (tmp && tmp.toLowerCase().indexOf(input.toLowerCase()) != -1)
						return true
				}
				return false
			}
		}
		return undefined
	}

	popupScroll({ event, selectRows, data }) {
		//data:总数据
		//defaultSelectRows：初始默认行数
		//selectRows:滚动一次加载的行数		

		if (this.state.props.selectPagination) {

			// console.log('scrollHeight:' + event.target.scrollHeight + '  scrollTop:' + event.target.scrollTop + '  offsetHeight:' + event.target.offsetHeight)
			if (event.target.scrollHeight - event.target.scrollTop - event.target.offsetHeight < 5) {
				this.setState({
					currentRows: this.state.currentRows + selectRows,
					isScrollBarTrigger: true
				})
			}
			if (this.state.props.value
				&& event.target.scrollHeight > event.target.offsetHeight
				&& event.target.scrollTop < 1) {
				const curIndex = data.findIndex(item => {
					return item.props && item.props.value == this.state.props.value
				})
				const defaultCount = 3 * this.state.selectRows,
					startIndex = curIndex - defaultCount
					/**
					 * 当前查找行超过可视区域容纳行数后进行截取
					 */
				if (curIndex > defaultCount) {
					this.setState({
						currentRows: startIndex,
						isScrollBarTrigger: true
					})
				}

			}
		} else {
			return false
		}
	}

	SelectComponent(props) {
		let { className, notFoundContent, optionLabelProp,
			mode, combobox, tags, multiple, size, onPopupScroll, ...otherProps } = props
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
		if (this.state.props.selectPagination
			&& props.children
			&& props.children instanceof Array) {
			let data = props.children

			if (props.value && !this.state.isScrollBarTrigger) {
				const curIndex = data.findIndex(item => {
					return item.props && item.props.value == props.value
				})
				const defaultCount = 3 * this.state.selectRows
				if (curIndex > defaultCount) {
					const startIndex = curIndex - defaultCount,
						endIndex = curIndex + this.state.selectRows
					otherProps.children = data.slice(startIndex, endIndex)
				}
			} else {
				otherProps.children = props.children.slice(0, this.state.currentRows)
			}
		}
		else {
			otherProps.children = props.children
		}
		if (this.props.lazyload) {
			return (
				<LazySelect
					{...otherProps}
					{...modeConfig}
					prefixCls='ant-select'
					className={className}
					notFoundContent={notFoundContent}
					suffix={suffix}
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
			keyRandom={this.state.props.keyRandom}
			defaultSelectRows={this.state.props.defaultSelectRows || 10}  //select组件默认显示行数
			selectRows={this.state.props.selectRows || 10} //select组件滚动一次加载的行数
			selectPagination={this.state.props.selectPagination || false} //select组件是否支持分页加载
			onPopupScroll={(e) => this.popupScroll({ event: e, selectRows: this.props.selectRows, data: props.children })}
		/>)
	}

	render() {
		return (
			this.SelectComponent(this.props)
		)
	}
}
SelectComponent.Option = Select.Option
SelectComponent.OptGroup = Select.OptGroup
