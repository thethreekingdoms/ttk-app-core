import React from 'react'
import classNames from 'classnames'
import isequal from 'lodash.isequal'
import clonedeep from 'lodash.clonedeep'
import Button from '../button/index'
import Tabs from '../tabs/index'
import ItemOption from './ie8InputItem'

const TabPane = Tabs.TabPane

class ColumnsSetting extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            option: clonedeep(props.option) || [],
            num: 0 //该字段的作用是itemoption组件重新实例（）。
        }
        this.childRef = {}
        if( props.setOkListener ) {
            props.setOkListener(this.onOk)
        }
        if( props.setCancelLister ) {
            props.setCancelLister(this.onCancel)
        }
    }

    onOk = async () => {
        // const { confirmClick } =  this.props
        const { option } = this.state
        let value = option.map(item => {
            if( this.childRef[item.key] ){
                return {
                    ...item,
                    option: this.childRef[item.key].getValue()
                }
            }
            return item
        })
        this.setState({
            option: value
        })
        return {
            type: 'confirm',
            option: clonedeep(value)
        }
        
    }

    onCancel = async() => {
        
    }

    //如果不胡乱传递props我肯定不这样写
    getProps = ( props) => {
        const { 
            option, singleKey, checkedKey, labelKey, sort, editName, itemClassName  
        } = props
        return {
            option, singleKey, checkedKey, labelKey, sort, editName, itemClassName
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextOption = this.getProps(nextProps)
        const preOption = this.getProps(this.props)
        if( !isequal(nextOption, preOption) ){
            this.setState({
                option: clonedeep(nextProps.option) || []
            })
        }
    }


    renderItem = (arr) => {
        const { itemClassName, labelKey, checkedKey, singleKey, sort, editName } = this.props
        const { editingKey } = this.state
        let className = classNames({
            'ttk-ColumnsSetting-item': true,
            [itemClassName]: !!itemClassName
        })
        const width = 100/arr.length
        const childArr =  arr.map(item => {
            let key = item.key ? item.key : item.name
            return (
                <div key={key} style={{ width: `${width}%` }} className="ttk-ColumnsSetting-modal-item">
                    <div className="ttk-ColumnsSetting-modal-item-tit">{item.name}</div>
                    <ItemOption 
                        num={this.state.num}
                        ref={(child) => this.childRef[key] = child}
                        option={item.option}
                        labelKey={labelKey}
                        checkedKey={checkedKey}
                        singleKey={singleKey}
                        sort={sort}
                        editName={editName}
                        itemClassName={itemClassName}
                    />
                </div>
            )
        })
        return (
            <div className="ttk-ColumnsSetting-modal">
                <span className="ttk-ColumnsSetting-modal-line"></span>
                {childArr}
            </div>
        )
    }

    resetClick = () => {
        const { option, resetClick }  = this.props
        this.setState({
            option: clonedeep(option)
        })
        if( this.props.closeModal ){
            return this.props.closeModal({
                type: 'reset',
                option: clonedeep(this.props.option)
            })
        }
        return resetClick && resetClick()
    }

    confirmClick = () => {
        const { confirmClick } =  this.props
        const { option } = this.state
        let value = option.map(item => {
            let key = item.key ? item.key : item.name
            if( this.childRef[key] ){
                return {
                    ...item,
                    option: this.childRef[key].getValue()
                }
            }
            return item
        })
        this.setState({
            option: value
        })
        if( this.props.closeModal ){
            return this.props.closeModal({
                type: 'confirm',
                option: clonedeep(value)
            })
        }
        return confirmClick && confirmClick(value)
    }

    cancelClick = () => {
        const { cancelClick, option } = this.props
        this.setState({
            option: clonedeep(option),
            num: Math.random() ,
        })
        if( this.props.closeModal ){
            return this.props.closeModal({
                type: 'cancel',
                option: clonedeep(this.props.option)
            })
        }
        return cancelClick && cancelClick()
    }

    render(){
        const props = this.props
        const { option } = this.state
        let className = classNames({
            'ttk-ColumnsSetting': true,
            [props.className]: !!props.className,
        })
        return (
            <div className={className} style= {{paddingBottom : 0,paddingTop:0}}>
                
                <div className="ttk-ColumnsSetting-container">
                    {this.renderItem(option)}
                </div>
                {
                    true ? (
                        <div className="ttk-ColumnsSetting-footer" style= {{marginTop : 12}}>
                            <span className="ttk-ColumnsSetting-footer-line"></span>
                            <Button style= {{width : 60}} onClick={this.cancelClick}>取消</Button>
                            <Button style= {{width : 60}} onClick={this.resetClick}>重置</Button>
                            <Button style= {{width : 60}} type="primary" onClick={this.confirmClick}>确定</Button>
                        </div>
                    ) : null
                }
                
            </div>
        )
    }
}

export default ColumnsSetting