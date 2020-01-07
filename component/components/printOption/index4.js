import React from 'react'
import moment from 'moment'
import { Radio,Select,Checkbox, Button, Input } from 'antd'
const Option = Select.Option;
const RadioGroup = Radio.Group;
class PrintOptionComponent4 extends React.Component{
    constructor(props){
        super(props)
        const { printAuxAccCalc, type, ts, width, height,id } = props
        this.state = {
            printAccountChecked: printAuxAccCalc ? true : false,
            value: type ? type: '3',
            id: id ? id: '',
            ts: ts ? ts: '',
            width: width ? parseFloat(width) : '',
            height: height ? parseFloat(height) : ''
        }
    }
    componentWillReceiveProps(nextProps){
        const { printAuxAccCalc, type, maxLineNum, width, height } = nextProps

        this.setState({
            printAccountChecked: printAuxAccCalc == 1 ? true : false,
            value: type ? type: '0',
            id: id ? id: '',
            ts: ts ? ts: '',
            width: width ? parseFloat(width) : '',
            height: height ? parseFloat(height) : ''
        })
    }
    changeRadioState = (e) => {
        this.setState({
            value: e.target.value,
        })
    }
    changeAccount = (e) => {
        this.setState({
            printAccountChecked: e.target.checked,
        })
    }
    changeQuantity = (e) => {
        this.setState({
            printQuantityChecked: e.target.checked,
        })
    }
    changeMultiCurrency = (e) => {
        this.setState({
            printMultiChecked: e.target.checked,
        })
    }

    changePageSize = (e) => {
        this.setState({
            pageSize: e
        })
    }
    changeWidth = (e) => {

        this.setState({
            width: e
        })
    }
    changeHeight = (e) => {
        this.setState({
            height: e
        })
    }

    confirm = () => {
        this.props.closeModal()
        this.props.callBack(this)
        
    }
    cancel = () => {
        this.props.closeModal()
    }

    render(){
        return (
            <div className="printOption" style={{padding: '20px 20px 12px'}}>

              <form>
                <div className="ant-form-item ant-form-item-compact">
                    <div className="col-18">
                    <RadioGroup value = {this.state.value} onChange = {(e) => {this.changeRadioState(e)}}>
                        <div className="item" style={{display: 'flex',flexDirection: 'row',alignItems:'center',marginBottom:'10px'}}>
                            <Radio value="3">A4整版</Radio>
                        </div>
                        <div className="item" style={{marginBottom:'10px'}}>
                            <Radio value="0">A4两版</Radio>
                        </div>
                        <div className="item" style={{marginBottom:'10px', 'marginTop': '15px'}}>
                            <Radio value="1">A4三版</Radio>
                        </div>
                        <div className="item" style={{marginBottom:'10px', 'marginTop': '15px'}}>
                            <Radio value="4">A5</Radio>
                        </div>
                        <div className="item" style={{marginBottom:'10px', 'marginTop': '15px'}}>
                            <Radio value="6">B5</Radio>
                        </div>
                        <div className="item" style={{display: 'flex',flexDirection: 'row',alignItems:'center',marginBottom:'10px'}}>
                            <Radio value="2">自定义大小</Radio>
                            <div className="item-select" style={{marginRight:'5px'}}>
                                <label style={{fontSize: '12px'}}>宽：</label>
                                <Input value={this.state.width} style={{width:80,fontSize:12,textAlign:'right'}} disabled = {this.state.value == "2"?false:true} onChange = {(e) => {this.changeWidth(e.target.value)}}>
                                </Input>
                                <label style={{fontSize: '12px'}}>cm</label>
                            </div>
                            <div className="item-select" style={{}}>
                                <label style={{fontSize: '12px'}}>高：</label>
                                <Input value={this.state.height} style={{width:80,fontSize:12,textAlign:'right'}} disabled = {this.state.value == "2"?false:true} onChange = {(e) => {this.changeHeight(e.target.value)}}>

                                </Input>
                                <label style={{fontSize: '12px'}}>cm</label>
                            </div>
                        </div>
                        <div className="item">
                            <Checkbox checked = {this.state.printAccountChecked} onChange = {(e) => {this.changeAccount(e)}}>打印金额</Checkbox>
                        </div>
                    </RadioGroup>
                    </div>
                </div>
              </form>
                <div style={{ width: '100%', textAlign: 'right',paddingRight: '12px'}}>
                    <Button onClick={this.cancel} style={{ float: 'right' }}>取消</Button>
                    <Button style={{marginRight: '8px'}} type='primary' onClick={this.confirm}>确定</Button>
                </div>
            </div>
        )
    }
}

export default PrintOptionComponent4
