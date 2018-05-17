import React from 'react'
import classNames from 'classnames'
import isequal from 'lodash.isequal'
import clonedeep from 'lodash.clonedeep'
import Button from '../button/index'
import Tabs from '../tabs/index'
import ItemOption from './itemOption'

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
        const childArr =  arr.map(item => {
            return (
                <TabPane forceRender={true} tab={item.name} key={item.key}>
                    <ItemOption 
                        num={this.state.num}
                        ref={(child) => this.childRef[item.key] = child}
                        option={item.option}
                        labelKey={labelKey}
                        checkedKey={checkedKey}
                        singleKey={singleKey}
                        sort={sort}
                        editName={editName}
                        itemClassName={itemClassName}
                    />
                </TabPane>
            )
        })
        return (
            <Tabs defaultActiveKey="1">
                {childArr}
            </Tabs>
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
        return confirmClick && confirmClick(value)
    }

    cancelClick = () => {
        const { cancelClick, option } = this.props
        this.setState({
            option: clonedeep(option),
            num: Math.random() ,
        })
        return cancelClick && cancelClick()
    }

    render(){
        const props = this.props
        const { option } = this.state
        let className = classNames({
            'ttk-ColumnsSetting': true,
            [props.className]: !!props.className
        })
        return (
            <div className={className}>
                <div className="ttk-ColumnsSetting-header">
                    <div className="ttk-ColumnsSetting-header-title">
                        {/* <span>选择列</span> */}
                    </div>
                    <div>
                        <a href="javascript:;" onClick={this.resetClick}>恢复默认设置</a>
                    </div>
                </div>
                <div className="ttk-ColumnsSetting-container">
                    {this.renderItem(option)}
                </div>
                {
                    !this.props.setOkListener ? (
                        <div className="ttk-ColumnsSetting-footer">
                            <Button type="primary" onClick={this.confirmClick}>确定</Button>
                            <Button onClick={this.cancelClick}>取消</Button>
                        </div>
                    ) : null
                }
                
            </div>
        )
    }
}

export default ColumnsSetting