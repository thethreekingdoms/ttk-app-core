import React from 'react'
import classNames from 'classnames'
import clonedeep from 'lodash.clonedeep'
import isequal from 'lodash.isequal'
import Checkbox from '../checkbox/index'
import Button from '../button/index'
import Icon from '../icon/index'
import Input from '../input/index'

class ItemOption extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            option: clonedeep(props.option) || [],
            label: '',
            editingKey: null,
            checkAll: this.checkAllChecked(props.option, props.checkedKey)
        }
    }

    checkAllChecked = (option, checkedKey) => {
        if( !option ){
            return false
        }
        let flag = true
        option.forEach(item => {
            if(!item[checkedKey]){
                flag = false
            }
        })
        return flag
    }

    checkIndeterminate = () => {
        const { option, checkAll } = this.state
        const { checkedKey } = this.props
        if( checkAll || !option) {
            return false
        }
        let flag = false
        option.forEach(item => {
            if( item[checkedKey] ) {
                flag = true
            }
        })
        return flag
    }

    componentWillReceiveProps(nextProps) {
        if( !isequal(nextProps, this.props) ){
            this.setState({
                option: clonedeep(nextProps.option) || [],
                checkAll: this.checkAllChecked(nextProps.option, nextProps.checkedKey)
            })
        }
        
    }

    componentWillUnmount = () => {
        if (window.removeEventListener) {
            window.removeEventListener('click', this.winClick, false)
        } else if (window.detachEvent) {
            window.detachEvent('click', this.winClick)
        } else {
            window.onclick = undefined
        }
    }

    componentDidMount = () => {
        if (window.addEventListener) {
            window.addEventListener('click', this.winClick, false)
        } else if (window.attachEvent) {
            window.attachEvent('click', this.winClick)
        } else {
            window.onclick = this.winClick
        }
    }

    checkInputHidden = (className) => {
        if( !className ){
            return true
        }else{
            return !className.includes('ttk-ColumnsSetting-item-input') && 
            !className.includes('ttk-ColumnsSetting-item-action-edit')
        }
         
    }

    winClick = (e) => {
        if( e && e.target && this.state.editingKey && this.checkInputHidden(e.target.className) ){
            this.setState({
                editingKey: null
            })
        }
    }

    itemClick = (key, e) => {
        const { singleKey, checkedKey, itemClick } = this.props
        const { option } = this.state
        const index = option.findIndex(item => item[singleKey] == key)
        if( index > -1 ){
            option[index][checkedKey] = e.target.checked
            this.setState({
                option,
                checkAll: this.checkAllChecked(option, checkedKey)
            })
            itemClick && itemClick(option, option[index])
        }
    }

    exchangeArritemPosition = (arr, x, y) => {
        let a = arr[x],
        b = arr[ y]
        arr[y] = a
        arr[x] = b
        return arr
    }

    arrowUp = (key) => {
        const { singleKey } = this.props
        const { option } = this.state
        const index = option.findIndex(item => item[singleKey] == key)
        if( index > 0 ){
            this.setState({
                option: this.exchangeArritemPosition(option, index, index-1)
            })
        }
    }

    arrowDown = (key) => {
        const { singleKey } = this.props
        const { option } = this.state
        const index = option.findIndex(item => item[singleKey] == key)
        if( index < option.length - 1 ){
            this.setState({
                option: this.exchangeArritemPosition(option, index, index+1)
            })
        }
    }

    editClick = (key) => {
        this.setState({
            editingKey: key
        })
    }

    inputEdit = (key, e) => {
        const { singleKey, labelKey } = this.props
        const { option } = this.state
        const index = option.findIndex(item => item[singleKey] == key)
        option[index][labelKey] = e.target.value
        this.setState({
            option
        })
    }

    renderItem = (arr) => {
        const { itemClassName, labelKey, checkedKey, singleKey, sort, editName } = this.props
        const { editingKey } = this.state
        let className = classNames({
            'ttk-ColumnsSetting-item': true,
            [itemClassName]: !!itemClassName
        })
        return arr.map(item => {
            return (
                <div className={className} key={item[singleKey]}>
                    <div className='ttk-ColumnsSetting-item-container'>
                        {
                            editingKey == item[singleKey] ? (
                                <Input
                                    className="ttk-ColumnsSetting-item-input"
                                    value={item[labelKey]}
                                    onChange={(e) => this.inputEdit(item[singleKey], e)} 
                                />
                            ) : (
                                <Checkbox 
                                    checked={item[checkedKey]}
                                    onChange={(e)=>this.itemClick(item[singleKey], e)}
                                >
                                    {item[labelKey]}
                                </Checkbox>
                            )
                        }
                    </div>
                    <div className="ttk-ColumnsSetting-item-action" style={{textAlign:"right"}}>
                        {
                            sort ? (
                                <Icon 
                                    type="arrow-up" 
                                    title="上移" 
                                    onClick={() => this.arrowUp(item[singleKey])} 
                                />
                            ) : null
                        }
                        {
                            sort ? (
                                <Icon 
                                    type="arrow-down" 
                                    title="下移" 
                                    onClick={() => this.arrowDown(item[singleKey])} 
                                />
                            ) : null
                        }
                        {
                            editName ? (
                                <Icon 
                                    className="ttk-ColumnsSetting-item-action-edit"
                                    fontFamily='edficon' 
                                    type="bianji" 
                                    title="编辑"
                                    onClick={() => this.editClick(item[singleKey])}
                                />
                            ) : null
                        }
                        
                    </div>
                </div>
            )
        })
    }

    getValue = () => {
        return clonedeep(this.state.option)
    }

    onCheckAllChange = (e) => {
        let { option } = this.state 
        const { checkedKey} = this.props
        let flag = false
        if( !option ) {
            option = []
        }
        option.forEach(item => {
            if( !item[checkedKey] ){
                flag = true
            }
        })
        let value
        if( flag ){
            value = option.map(item => {
                return {
                    ...item,
                    [checkedKey]: true
                }
            })
        }else{
            value = option.map(item => {
                return {
                    ...item,
                    [checkedKey]: false
                }
            })
        }
        this.setState({
            option: value,
            checkAll: flag
        })
    }



    render(){
        const props = this.props
        const { option } = this.state
        let className = classNames({
            'ttk-ColumnsSetting': true,
            [props.className]: !!props.className
        })
        return (
            <div className="ttk-ColumnsSetting-container">
                <Checkbox
                    indeterminate={this.checkIndeterminate()}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >全选</Checkbox>
                {this.renderItem(option)}
            </div>
        )
    }
}

export default ItemOption