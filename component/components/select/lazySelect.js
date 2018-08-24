import React from 'react'
import Spin from '../spin/index'
import {Select} from 'antd'

const Option  = Select.Option
export default class LazySelect extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: 0,
            rowHeight: props.rowHeight || 31.6,
            showRows: props.showRows || 100,
            scorllY: props.scorllY || 250,
            value: props.value
        }
        this.top = 0
        this.isRender = false
        this.className =  `lazy_select_${Math.floor(Math.random()*10000)}` 
    }

    
    componentWillReceiveProps(nextProps) {
        if( nextProps.value !== this.state.value ) {
            const { children, value } = nextProps
            if( children && children instanceof Array ) {
                const single = children.find(item => {
                    return item.props.value == value
                })
                this.setState({
                    value: value,
                    children: single ? single.props.children : value
                })
            }
        }
    }

    componentDidUpdate = () => {
        const dom = document.querySelector(`.${this.className}`)
        if( dom ) {
            dom.querySelector('.ant-select-dropdown-menu').scrollTop = this.state.scrollTop
            setTimeout(() => {
                dom.querySelector('.ant-select-dropdown-menu').scrollTop = this.state.scrollTop
            }, 50)
        }
        setTimeout(() => {
            this.isRender = false
        }, 200)
        this.hiddenSpin()
    }

    hiddenSpin = () => {
        const dom2 = document.querySelector(`.${this.className}`) && document.querySelector(`.${this.className}`).querySelector('.ant-select-dropdown-menu')
        if( dom2 ) {
            const lastDom = dom2.querySelector('.lazy_select_last') 
            if( lastDom ) {
                lastDom.querySelector('.lazy_select_last_spin').style.opacity = '0'
            }
        }
    }

    showSpin = () => {
        const dom = document.querySelector(`.${this.className}`).querySelector('.ant-select-dropdown-menu')
        // const top = dom.scrollTop
        // const firstDom = dom.querySelector('.lazy_select_first')
        const lastDom = dom.querySelector('.lazy_select_last')
        // if( firstDom ) {
            // const height = firstDom.offsetHeight
        //     if( true ) {
        //         console.log('显示 first')
        //         firstDom.querySelector('.lazy_select_first_spin').style.display = 'block'
        //     }
        // }else 
        if( lastDom ) {
            // const containerHeight = document.querySelector(`.${this.className}`).offsetHeight
            // const sumheight = dom.offsetHeight, height = lastDom.offsetHeight
            if( true ) {
                console.log('显示')
                lastDom.querySelector('.lazy_select_last_spin').style.opacity = '1'
            }
            setTimeout(()=>{
                this.hiddenSpin()
            }, 300)
        }

        
    }

    componentDidMount = () => {
        document.body.addEventListener('scroll', this.onPopupScroll, false)
    }

    onPopupScroll = (e) => {
        this.showSpin()
        if( this.isRender ) {
            return
        }
        const keyRandom  = Math.floor(Math.random()*1000000)
        this.keyRandom = keyRandom
        setTimeout(()=>{
            const dom = document.querySelector(`.${this.className}`).querySelector('.ant-select-dropdown-menu')
            const top = dom.scrollTop
            if( top == this.state.scrollTop ) {
                return
            }

            if( this.keyRandom == keyRandom) {
                this.setState({
                    scrollTop: top
                })
            }
            setTimeout(()=>{
                this.hiddenSpin()
            }, 0)
        }, 200)
        
    }

    getDataSource = (data = []) => {
        const { rowHeight, showRows, scorllY, scrollTop } = this.state,
            lens = data.length,
            sumHeight = lens * rowHeight,
            dataHeight = rowHeight * showRows,
            polyFillHeight = (dataHeight - scorllY)/2
        let firstHeight = 0,lastHeight = 0
        if( scrollTop <=polyFillHeight ) {
            lastHeight = sumHeight - dataHeight
        }else {
            firstHeight = scrollTop - polyFillHeight
            lastHeight = sumHeight - firstHeight -  dataHeight
        }
        let dataStart = Math.floor(firstHeight/rowHeight)
        let dataEnd = dataStart + showRows
        const data2 = data.slice(dataStart, dataEnd)
        if( firstHeight > 0 ) {
            data2.unshift(
                <Option
                    className="lazy_select_first"
                    key='first'
                    value="lazy_select_first" 
                    style={{
                        height: `${firstHeight}px`,
                        position: 'static'
                    }}
                >
                    <span>  </span>
                </Option>
            )
        }
        if( data.length > 0 ) {
            data2.push(
                <Option 
                    key='last'
                    className="lazy_select_last"
                    value="lazy_select_last" 
                    style={{
                        height: `${lastHeight < 0 ? 0 : lastHeight}px`,
                        position: 'static',
                        background: '#fff'
                    }}
                >
                    <span>  </span>
                    <div
                        key={data.length}
                        className="lazy_select_last_spin" 
                        style={{
                            position: 'absolute', 
                            left: '0px', 
                            top: '0px', 
                            height: '100%', 
                            width: '100%',
                            opacity: '0',
                            pointerEvents: 'none', 
                            textAlign: 'center',
                            zIndex: '111111111111'
                        }}
                    >
                        <Spin style={{marginTop: '100px'}} delay={0}></Spin>
                    </div>
                </Option>
            )
        }
        this.showOption = data2
        return data2
    }

    handleChange = (value) => {
        if( value && typeof value == 'string'  && value.includes('lazy_select') ) {
            return 
        }
        const showOption = this.showOption
        const single = showOption.find(item => {
            return item.props && item.props.value == value
        })
        this.setState({
            value: value,
            children: single ? single.props.children : value,
            searchValue: ''
        })
        this.props.onChange && this.props.onChange(value)
    }

    handleSearch = (value) => {
        const { showSearch, onSearch } = this.props
        if( showSearch ) {
            return onSearch(value)
        }
        this.setState({
            searchValue: value
        })
    }

    render() {
        this.isRender = true
        const props = this.props
        const data = props.children
        const { children, value, searchValue } = this.state
        const { dropdownClassName, filterOption } = props
        let optionArr 
        if( searchValue &&  filterOption) {
            optionArr = data.filter((item) => {
                return filterOption(searchValue, item)
            })
        }else{
            optionArr = data
        }
        const option = this.getDataSource(optionArr)
        let  flag = true 
        if( value != null || value != undefined ) {
            flag = option.find(item => {
                return item.props.value == value
            })
        }
        return (
            <Select
                {...props}
                onChange={this.handleChange} 
                dropdownClassName= {`${this.className}${dropdownClassName ? ` ${dropdownClassName}` : ''}`}
                onPopupScroll={this.onPopupScroll}
                showSearch={ props.showSearch ? props.showSearch : filterOption ? true : false }
                onSearch={ this.handleSearch }
                value={ flag ? value : children }
                dropdownStyle={{position: 'relative'}}
            >
                {option}
            </Select>
        )
    }
}