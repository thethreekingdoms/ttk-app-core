import React from 'react'
import {Map} from 'immutable'
import { Progress } from 'antd'
import Button from '../button/index'
import InputNumber from '../input/inputNumber'

class RepeterComponent extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            isAdd: true,
            repeterChildren: []
        }
    }

    componentDidMount() {
        let children = this.props.children
        this.setState({repeterChildren: [children]})
    }

    addBtn = () => {
        this.setState({flag:true})
        if(this.state.repeterChildren.length<=100) {
            let arr = this.state.repeterChildren
            arr.push(this.props.children)
            this.setState({repeterChildren: arr})
        }else {
            alert('一百条了！')
        }
        this.props.addCallBack && this.props.addCallBack()
    }

    renderInputLife = () => {
        return (
            <div className='ttk-expense-input'>
                <span>{this.props.inputLifeName}:</span><InputNumber style={{ width: '200px' }}/>
            </div>
        )
    }

    renderRows = (name) => {
        return (
            <div className='ttk-scm-app-expense-card-form-div'>
                {/* <Button style={{ width: '200px' }} onClick={this.addBtn}>{name}</Button> */}
                {this.props.inputLife ? this.renderInputLife() : ''}
            </div>
        )
    }

    getRepeterChildren = (repeterChildren) => {
        return repeterChildren.map(item => {
            return item
        })
    }

    render(){
        let  { repeterChildren, isAdd, btnVisible } = this.props
        return (
            <div>
                {this.props.children}
                {btnVisible ? this.renderRows(this.props.buttonName) : null}  
            </div>
        )
    }
}

export default RepeterComponent