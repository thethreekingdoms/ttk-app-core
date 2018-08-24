import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { Map, List, fromJS } from 'immutable'
import Button from '../button/index'
import { action as MetaAction, AppLoader } from 'edf-meta-engine'
import clonedeep from 'lodash.clonedeep'
import SearchForm from './ie8SearchForm'
import normalSearchFuc from './ie8NormalSearch'
import AssistForm from './AssistForm'


class SearchComponent extends Component {
    state = {
        data: Map({
            initMeta: '',
            initData: '',
            className: '',
            visible: false,
            displayText: '',
            childVisible: false
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            data: this.computeState(this.props),
            visible: false,
            searchValue: clonedeep(props.moreSearch),
            key: '',
            height: 10000,
            normalSearch: props.normalSearchValue ? clonedeep(props.normalSearchValue) : {},
            count: 0,
            containerHeight: 500
        }
        this.value = {}
        this.datePickerRandom = Math.floor(Math.random() * 100000000)
        this.props.didMount && this.props.didMount(this)
        this.props.moreSearchItem && this.props.moreSearchItem.map(item => {
            if (
                item.pre && item.pre.type && item.pre.type.includes('DatePicker') &&
                item.next && item.next.type && item.next.type.includes('DatePicker')
            ) {
                this.state[`showDateWin_${item.pre.name}`] = false
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.computeState(nextProps))
        this.setState({
            searchValue: clonedeep(nextProps.moreSearch),
            normalSearch: clonedeep(nextProps.normalSearchValue)
        })
    }

    computeState(props) {
        let { data } = this.state
        let { value, height, width, style, className, placement, refName, child, okText, cancelText, resetText, btnTextAlign, loadApp } = props
        if (!Map.isMap(value) && !List.isList(value) && (typeof value == 'object')) {
            value = fromJS(value)
        }

        data = data.set('value', value)
        data = data.set('height', height)
        data = data.set('width', width)
        data = data.set('style', style)
        data = data.set('className', className)
        data = data.set('placement', placement)
        data = data.set('refName', refName)
        data = data.set('child', child)
        data = data.set('okText', okText)
        data = data.set('cancelText', cancelText)
        data = data.set('resetText', resetText)
        data = data.set('btnTextAlign', btnTextAlign)
        data = data.set('loadApp', loadApp)
        this.oldValue = value
        return data
    }

    componentDidMount() {
        this.setState({
            height: document.getElementsByClassName('mk-search-high-search')[0].offsetHeight + 300
        })
        this.showPickerDidMount()
        this.computed()
        window.addEventListener('resize', this.computed, false)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.computed, false)
    }

    dateWindowChange = (type, status, key) => {
        if (type == 'next') {
            this.setState({
                [key]: status
            })
        }
        if (type == 'next' && status == false) {
            // 采用异步是因为datePicker的onchange事件晚于onOpenChange触发
        }
    }

    showPickerDidMount = () => {
        const { normalSearch } = this.props
        if (!normalSearch || normalSearch.length == 0) {
            return
        }
        const flag = normalSearch.find(item => item.type == 'DatePicker.RangePicker')
        if (!flag) {
            return
        }
        const dateDom = document.getElementsByClassName(this.datePickerRandom)[0]
        if (!dateDom) {
            setTimeout(() => {
                this.showPickerDidMount()
            }, 50)
            return
        }
        dateDom.addEventListener('click', this.rangePickerClick, false)
    }



    getPopupContainer() {
        return document.querySelector('.app-proof-of-list')
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    set(propertyName, value) {
        let data = this.state.data
        if (!propertyName || propertyName === '') {
            return data.merge(value)
        }
        if (typeof value === 'object') {
            return data.mergeIn(propertyName.split('.'), value)
        }
        else {
            return data.setIn(propertyName.split('.'), value)
        }
    }

    showMoreSearch = (bol) => {
        let { data, count } = this.state
        data = this.set(null, { childVisible: bol })

        this.setState({
            data,
            count: 1
        })
    }

    confirmClick = () => {
        const { searchClick, moreSearchRules } = this.props
        const _this = this
        this.form.validateFields((err, values) => {
            if (err) {
                return
            }
            let flag = true
            let option
            if (_this.props.moreSearchItem.findIndex(item => item.type == 'AssistForm') > -1) {
                flag = _this.assistForm.verify()

                if (flag) {
                    const getValue = _this.assistForm.getValue()
                    values.groupStr = this.sortAssitItem(getValue.option, getValue.selectValue)
                    values.whereStr = _this.getWhereStr(getValue.option, getValue.selectValue)
                    option = getValue
                }
            }

            if (moreSearchRules) {
                flag = moreSearchRules(values, _this.form)
            }
            if (!flag) {
                return
            }
            _this.showMoreSearch(false)
            if (searchClick) {
                setTimeout(() => {
                    if (_this.props.moreSearchItem.findIndex(item => item.type == 'AssistForm') > -1) {
                        searchClick(values, option)
                    } else {
                        searchClick(values)
                    }
                }, 800)


            }
        })

    }

    // 对辅助项参数进行排序
    sortAssitItem = (data, selectValue) => {
        const arr = []
        data.forEach(item => {
            if (selectValue.includes(item.key)) {
                arr.push(item.key)
            }
        })
        return arr.join(',')
    }

    //修改辅助项参数
    getWhereStr = (option, selectLabel) => {
        let arr = []
        option.forEach(item => {
            if (item.value && item.value.length > 0 && selectLabel.includes(item.key)) {
                arr.push(`${item.key}:${item.value.join(',')}`)
            }
        })
        return arr.join(';')
    }

    cancelClick = () => {
        const { cancelClick } = this.props
        this.showMoreSearch(false)
        this.setState({
            searchValue: clonedeep(this.props.moreSearch),
            key: Math.random()
        })
        cancelClick && cancelClick()
    }

    clearClick = () => {
        const { clearClick } = this.props
        const value = this.clearValue()
        clearClick && clearClick(value)
    }

    clearValue = () => {
        const { searchValue } = this.state
        const { clearClick, moreSearchItem } = this.props
        let clearValue = {}
        moreSearchItem.forEach(item => {
            if (item.range) {
                if (!item.pre.noClear) {
                    clearValue[item.pre.name] = null
                }
                if (!item.next.noClear) {
                    clearValue[item.next.name] = null
                }
            } else if (!item.noClear) {
                clearValue[item.name] = null
            }

        })
        this.setState({
            searchValue: { ...searchValue, ...clearValue },
            key: Math.random()
        })
        return { ...searchValue, ...clearValue }
    }


    normalSearchChange = (name, e, type, bol) => {
        const { normalSearch } = this.state
        let value = e && e.target ? e.target.value : e
        normalSearch[name] = value
        this.setState({
            normalSearch
        })
        if (name == 'date' && !bol) {
            // if (this.state.normalSearch[name] == value && this.props.normalSearchChange) {
            //     let initValue = this.clearValue()
            //     this.props.normalSearchChange(name, value, initValue, type)
            // }
            return
        }
        // 测试说简单搜索的情况下要清空高级搜索的内容
        setTimeout(() => {
            if (this.state.normalSearch[name] == value && this.props.normalSearchChange) {
                let initValue = this.clearValue()
                this.props.normalSearchChange(name, value, initValue, type)
            }
        }, 1000)
    }

    renderNormalSearch = () => {
        const { normalSearch } = this.props
        if (!normalSearch) {
            return null
        }
        const normalSearchValue = this.state.normalSearch
        return normalSearch.map((item) => {
            item.value = normalSearchValue[item.name]
            return normalSearchFuc(item, this)
        })
    }

    trantoNumber = (num) => {
        if (!num) {
            return 0
        }
        try {
            return parseInt(num.format('YYYYMM'))
        } catch (err) {
            console.log(err)
            return 0
        }
    }

    someChange = (key, value) => {
        try {
            const { searchValue } = this.state
            searchValue[key] = value
            if (this.state[`showDateWin_${key}`] != undefined) {
                let nextKey
                this.props.moreSearchItem.forEach(item => {
                    if (item.next && item.pre && item.pre.name == key) {
                        nextKey = item.next.name
                    }
                    if (this.trantoNumber(value) > this.trantoNumber(searchValue[nextKey])) {
                        searchValue[nextKey] = value
                    }
                })
                this.setState({
                    [`showDateWin_${key}`]: true
                })
            }
            this.setState({
                searchValue
            })
        } catch (err) {
            console.log(err)
        }

    }

    normalSelectDate = () => {
        let name = 'date'
        const { normalSearch } = this.state
        let value = normalSearch.date
        this.setState({
            DatePickerOpen: false
        })
        if (this.state.normalSearch[name] == value && this.props.normalSearchChange) {
            let initValue = this.clearValue()

            this.props.normalSearchChange(name, value, initValue)
        }
    }

    rangePickerClick = () => {
        this.setState({
            DatePickerOpen: true
        })
    }

    render() {
        let data = this.state.data.get('value') && this.state.data.get('value').get('data')
        data = data && data.size ? data : fromJS(data)
        const { confirmBtn, cancelBtn, clearBtn, refreshBtn } = this.props
        const { containerHeight } = this.state
        let This = this
        const moreSearchItem = this.props.moreSearchItem ? this.props.moreSearchItem.filter(item => {
            if (item.pre && item.next &&
                item.pre.type.includes('DatePicker') && item.next.type.includes('DatePicker')) {
                return {
                    ...item,
                    next: {
                        ...item.next,
                        onOpenChange: (status) => this.dateWindowChange('next', status, `showDateWin_${item.pre.name}`),
                        open: this.state[`showDateWin_${item.pre.name}`]
                    },
                    pre: {
                        ...item.pre,
                        onOpenChange: (status) => this.dateWindowChange('pre', status, `showDateWin_${item.pre.name}`)
                    }
                }
            }
            if (!item.visible) return item
        }) : null

        return (
            <div ref='retrieveWrap' className='retrieveWrap mk-search' style={{ position: 'relative' }}>
                <div className="mk-normal-search" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="mk-normal-search-left" style={{ display: 'flex' }}>
                        {this.props.selectDate ? this.props.selectDate : null}
                        {this.renderNormalSearch()}
                        {this.props.normalSearcChildren ? this.props.normalSearcChildren : null}
                        {this.props.moreSearchItem ? <span
                            className='mk-span'
                            onClick={this.showMoreSearch.bind(this, true)}
                            style={{
                                zIndex: '3',
                                fontSize: '14px',
                                display: 'flex',
                                marginRight: '6px',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                            <a className="searchBtn">高级查询</a>
                        </span> : null}
                        {refreshBtn}
                    </div>
                    <div className="mk-title-otherBtn">
                        {this.props.menuBtn}
                    </div>
                </div>

                <div
                    style={{
                        width: '100%',
                        height: '0',
                        position: 'absolute',
                        top: '0px',
                        zIndex: '10',
                        background: '#fff',
                        boxShadow: '0 0 5px #999',
                        display: `${this.state.count == 1 ? 'block' : 　'none'}`
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            maxHeight: `${containerHeight}px`
                            // top: `${this.state.data.get('childVisible') ? '0' : `-${this.state.height}px`}`
                        }}
                        className={`mk-search-high-search animated ${this.state.data.get('childVisible') ? 'slideInDown' : 　'slideOutUp'}`}
                    >
                        <h2>
                            <div>高级查询</div>
                        </h2>
                        <div className="search-form-contaienr" style={{ maxHeight: `${containerHeight - 90}px` }}>
                            {this.props.treeSelect ? this.props.treeSelect : null}
                            {this.props.moreSearchItem && <SearchForm
                                target={this}
                                onChange={this.someChange}
                                item={moreSearchItem}
                                key={Math.random()}
                                ref={(form) => { this.form = form }}
                                values={this.state.searchValue}
                            />}
                            {this.props.assistForm ? (
                                <AssistForm
                                    ref={form => this.assistForm = form}
                                    option={this.props.assistFormOption}
                                    selectValue={this.props.assistFormSelectValue}
                                />
                            ) : null}
                        </div>

                        <div className="mk-search-high-search-bottomBtn" style={{ textAlign: This.get('btnTextAlign') }}>
                            <span id='btnClick'>
                                {
                                    cancelBtn && cancelBtn.hidden ? null : (
                                        <Button onClick={this.cancelClick} className='cancel'>
                                            {cancelBtn && cancelBtn.text ? cancelBtn.text : '取消'}
                                        </Button>
                                    )
                                }
                                {
                                    clearBtn && clearBtn.hidden ? null : (
                                        <Button onClick={this.clearClick} className='clear_btn' style={{ marginLeft: '8px' }}>
                                            {clearBtn && clearBtn.text ? clearBtn.text : '清空'}
                                        </Button>
                                    )
                                }
                                {
                                    confirmBtn && confirmBtn.hidden ? null : (
                                        <Button onClick={this.confirmClick} className='query' type="primary" style={{ marginLeft: '8px' }}>
                                            {confirmBtn && confirmBtn.text ? confirmBtn.text : '查询'}
                                        </Button>
                                    )
                                }
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    getAbsPoint = (e) => {
        var x = e.offsetLeft
        var y = e.offsetTop
        while (e = e.offsetParent) {
            x += e.offsetLeft
            y += e.offsetTop
        }
        return { x, y }
    }

    computed = () => {
        let table = ReactDOM.findDOMNode(this)
        if (table) {
            const point = this.getAbsPoint(table)
            let height = window.innerHeight - point.y
            this.setState({
                containerHeight: height - 5
            })
        }
    }
}

export default SearchComponent