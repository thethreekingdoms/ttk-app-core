import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Radio, Select, Checkbox, Button } from 'antd'

export default class exportOptionComponent extends Component {
    constructor(props) {
        super(props)
        const { printAuxAccCalc, isPrintQuantity, isPrintMulti, type, maxLineNum, width, height } = props

        this.state = {
            printAccountChecked: printAuxAccCalc == 1 ? true : false,
            printQuantityChecked: isPrintQuantity == 1 ? true : false,
            printMultiChecked: isPrintMulti == 1 ? true : false
        }
    }

    handleCancelClick() {
        this.closeModal()
    }

    handleConfirmClick() {
        let { data } = this.state,
            printAccountChecked = this.state.printAccountChecked,
            printQuantityChecked = this.state.printQuantityChecked,
            printMultiChecked = this.state.printMultiChecked,
            exportOption = {
                printAccountChecked,
                printQuantityChecked,
                printMultiChecked
            }

        sessionStorage.setItem('exportOption', JSON.stringify(exportOption))

        let confirmBtn = document.getElementsByClassName('ant-btn ant-btn-primary')

        for (var i = 0; i < confirmBtn.length; i++) {
            if (confirmBtn[i].innerHTML == '<span>确 定</span>') {
                confirmBtn[i].click()
            }
        }
    }

    changeAccount = (e, checkType) => {
        if (checkType == 'printAccountChecked') {
            this.setState({ printAccountChecked: e.target.checked })
        } else if (checkType == 'printQuantityChecked') {
            this.setState({ printQuantityChecked: e.target.checked })
        } else if (checkType == 'printMultiChecked') {
            this.setState({ printMultiChecked: e.target.checked })
        }
    }

    confirm = () => {
        this.props.closeModal()
        this.props.callBack(this)
    }

    cancel = () => {
        this.props.closeModal()
    }

    render() {
        let buttonStyle = {marginTop: '37px', display: 'flex', justifyContent: 'center', borderTop: 'solid 1px #e7e6e6', paddingBottom: '12px'}
 
        return (
          <div style={{width: '100%', textAlign: 'center', marginTop: '26px', fontSize: '12px'}}>
              <Checkbox checked = {this.state.printAccountChecked} onChange = {(e) => {this.changeAccount(e, 'printAccountChecked')}}>辅助核算</Checkbox>
              <Checkbox checked = {this.state.printQuantityChecked} onChange = {(e) => {this.changeAccount(e, 'printQuantityChecked')}}>数量核算</Checkbox>
              <Checkbox checked = {this.state.printMultiChecked} onChange = {(e) => {this.changeAccount(e, 'printMultiChecked')}}>外币核算</Checkbox>
              <div style={buttonStyle}>
                  <Button style={{ marginTop: '12px'}} onClick={this.cancel}>取消</Button>
                  <Button style={{ marginLeft: '8px', marginTop:'12px'}} type='primary' onClick={this.confirm}>确定</Button>
              </div>
          </div>
        )
    }
}
