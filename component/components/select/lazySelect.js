import React from 'react'
import Spin from '../spin/index'
import { Select } from 'antd'
import classNames from 'classnames'
const Option = Select.Option
export default class LazySelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: 0,
            rowHeight: props.rowHeight || 31.6,
            showRows: props.showRows || 100,
            scorllY: props.scorllY || 250,
            value: props.value,
            children: null,
        }
        this.top = 0
        this.isRender = false
        this.className = `lazy_select_${Math.floor(Math.random() * 10000)}`
    }
    componentDidMount = () => {
        // document.body.addEventListener('wheel', this.onPopupScroll, true)
        if (this.props.value) {
            if (this.props.children && this.props.children instanceof Array) {
                const single = this.props.children.find(item => {
                    return item.props.value == this.props.value
                })
                this.setState({
                    children: single ? single.props.children : value
                })
            }
        }
        // document.body.addEventListener('touchmove', this.onPopupScroll, { passive: false })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            const { children, value } = nextProps

            if (children && children instanceof Array) {
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
        if (dom) {
            dom.querySelector('.ant-select-dropdown-menu').scrollTop = this.state.scrollTop
            setTimeout(() => {
                dom.querySelector('.ant-select-dropdown-menu').scrollTop = this.state.scrollTop
            }, 5)
        }
        setTimeout(() => {
            this.isRender = false
        }, 10)
        this.hiddenSpin()
    }
    componentWillUnmount() {
        /**
        * 组件从界面上移除触发
        */
        // if (window.removeEventListener) {
        //     document.body.removeEventListener('wheel', this.onPopupScroll, true)
        // } else if (window.detachEvent) {
        //     document.body.detachEvent('wheel', this.onPopupScroll)
        // }
    }

    hiddenSpin = () => {
        try {
            const dom2 = document.querySelector(`.${this.className}`) && document.querySelector(`.${this.className}`).querySelector('.ant-select-dropdown-menu')
            if (dom2) {
                const lastDom = dom2.querySelector('.lazy_select_last')
                if (lastDom) {
                    lastDom.querySelector('.lazy_select_last_spin').style.opacity = '0'
                }
            }
        } catch (e) {

        }

    }

    showSpin = () => {
        try {
            let dom = document.querySelector(`.${this.className}`).querySelector('.ant-select-dropdown-menu')
            let lastDom = dom.querySelector('.lazy_select_last')
            if (lastDom) {
                if (true) {
                    //console.log('显示')
                    lastDom.querySelector('.lazy_select_last_spin').style.opacity = '1'
                }
                setTimeout(() => {
                    this.hiddenSpin()
                }, 10)
            }
        } catch (e) {

        }

    }

    onPopupScroll = (e) => {
        if (e) {
            // e.preventDefault()
            // 阻止合成事件的冒泡
            e.stopPropagation();
            // 阻止与原生事件的冒泡
            // e.nativeEvent.stopImmediatePropagation();

        } else {
            //window.event.cancelBubble = true;//停止冒泡
            // window.event.returnValue = false;//阻止事件的默认行为
        }

        this.showSpin()
        // if (this.isRender) {
        //     return
        // }

        const keyRandom = Math.floor(Math.random() * 1000000)
        this.keyRandom = keyRandom
        setTimeout(() => {
            try {
                const dom = document.querySelector(`.${this.className}`).querySelector('.ant-select-dropdown-menu')
                const top = dom.scrollTop
                if (top == this.state.scrollTop) {
                    return
                }

                if (this.keyRandom == keyRandom) {
                    this.setState({
                        scrollTop: top
                    })
                }

            } catch (e) {

            }
        }, 200)

        setTimeout(() => {
            this.hiddenSpin()
        }, 0)
    }

    getDataSource = (data = []) => {
        const { rowHeight, showRows, scorllY, scrollTop } = this.state,
            lens = data.length,
            dataHeight = rowHeight * showRows,
            polyFillHeight = (dataHeight - scorllY) / 2
        let firstHeight = 0, lastHeight = 0, sumHeight = lens * rowHeight
        // if (this.props.isNeedAdd) {
        //     //新增按钮30px
        //     sumHeight += 30
        // }
        if (scrollTop <= polyFillHeight) {
            lastHeight = sumHeight - dataHeight
        } else {
            firstHeight = scrollTop - polyFillHeight
            lastHeight = sumHeight - firstHeight - dataHeight
        }

        let dataStart = Math.floor(firstHeight / rowHeight)
        let dataEnd = dataStart + showRows
        const data2 = data.slice(dataStart, dataEnd)

        data2.unshift(
            <Option
                className="lazy_select_first"
                key='first'
                value="lazy_select_first"
                style={{
                    height: `${firstHeight < 0 ? 0 : firstHeight}px`,
                    position: 'static',
                    background: '#fff'
                }}
            >
                <span> </span>
            </Option>
        )

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
                <span> </span>
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
                    <Spin style={{ marginTop: '100px' }} delay={0}></Spin>
                </div>
            </Option>
        )

        if (this.props.isNeedAdd) {
            if (data.length) {
                data2.push(
                    <div key='add' style={{
                        width: '100%',
                        height: '30px',
                        position: 'absolute',
                        bottom: '0px',
                        left: 0,
                        right: 0,
                        backgroundColor: '#0066B3',
                        color: '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer',
                        lineHeight: '15px',
                        fontSize: '12px'
                    }} onClick={() => this.props.addFooterClick()} value='lazy_select'> 新 增 </div>)
            } else {
                data2.push(
                    <div style={{ width: '100%', color: 'rgba(0, 0, 0, 0.25)', fontSize: '12px' }}
                        key='notFoundContent'
                        value='lazy_select'>无匹配结果</div>,
                    <div key='add' value='lazy_select'
                        style={{
                            width: '100%',
                            height: '30px',
                            position: 'absolute',
                            bottom: '0px',
                            left: 0,
                            right: 0,
                            backgroundColor: '#0066B3',
                            color: '#ffffff',
                            textAlign: 'center',
                            cursor: 'pointer',
                            lineHeight: '15px',
                            fontSize: '12px'
                        }}
                        onClick={() => this.props.addFooterClick()}> 新 增 </div>
                )
            }
        }
        this.showOption = data2
        return data2
    }

    handleChange = (value) => {

        if (value && typeof value == 'string' && value.includes('lazy_select')) {
            return
        }
        const showOption = this.showOption
        const single = showOption.find(item => {
            return item.props && item.props.value == value
        })
        this.setState({
            value: value,
            children: single ? single.props.children : value,
            searchValue: '',
        })
        this.props.onChange && this.props.onChange(value)
    }

    handleSearch = (value) => {

        const { showSearch, onSearch } = this.props
        this.setState({
            searchValue: value
        })
        if (showSearch && onSearch) {
            return onSearch(value)
        }
    }
    onBlur = () => {
        this.setState({
            searchValue: ''
        })
    }
    render() {
        this.isRender = true
        const props = this.props
        const data = props.children
        let { children, value, searchValue } = this.state
        const { dropdownClassName, filterOption, showSearch, dropdownClassNameCopy } = props
        let optionArr
        if (searchValue && filterOption && data) {
            optionArr = data.filter((item) => {
                return filterOption(searchValue, item)
            })
        } else {
            optionArr = data
        }
        let option = [], flag = true
        if (data) {
            option = this.getDataSource(optionArr)
        }
        if (value) {
            flag = option.find(item => {
                return item.props.value == value
            })
        }
        let className = classNames({
            'mk-lazy-select-need-add': this.props.isNeedAdd,
            [this.className]: true
        })
        return (
            <Select
                {...props}
                onChange={this.handleChange}
                dropdownClassName={!dropdownClassNameCopy ? `${className}${dropdownClassName ? ` ${dropdownClassName}` : ''}` : `${className}${dropdownClassNameCopy ? ` ${dropdownClassNameCopy}` : ''}`}
                onPopupScroll={this.onPopupScroll}
                showSearch={showSearch ? showSearch : filterOption ? true : false}
                onSearch={this.handleSearch}
                value={flag ? value : children}
                dropdownStyle={{ position: 'relative' }}
                onBlur={this.onBlur}
                onPopupScroll={this.onPopupScroll}
            >
                {option}
            </Select>
        )
    }
}