import React from 'react'
import moment from 'moment'
import { Radio,Select,Checkbox, Button } from 'antd'
const Option = Select.Option;
const RadioGroup = Radio.Group;
const maxLineNum = [5,6,7]
const width = [19, 19.5, 20, 20.5, 21, 21.5, 22]
const height = [10, 10.5, 11, 11.5, 12, 12.5, 13]
class PrintOptionComponent extends React.Component{
    constructor(props){
        super(props)
        const { printAuxAccCalc, type, maxLineNum, width, height } = props
        this.state = {
            printAccountChecked: printAuxAccCalc == 1 ? true : false,
            value: type ? type: '0',
            pageSize: maxLineNum ? parseInt(maxLineNum) : 6,
            width: width ? parseFloat(width) : 21.5,
            height: height ? parseFloat(height) : 12.5
        }
    }
    componentWillReceiveProps(nextProps){
        const { printAuxAccCalc, type, maxLineNum, width, height } = nextProps
        this.setState({
            printAccountChecked: printAuxAccCalc == 1 ? true : false,
            value: type ? type: '0',
            pageSize: maxLineNum ? parseInt(maxLineNum) : 6,
            width: width ? parseFloat(width) : 21.5,
            height: height ? parseFloat(height) : 12.5
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
            <div className="printOption" style={{padding: '20px'}}>
              
              <form>
                <div className="ant-form-item ant-form-item-compact">              
                    <div className="col-18">
                    <RadioGroup value = {this.state.value} onChange = {(e) => {this.changeRadioState(e)}}>
                        <div className="item" style={{display: 'flex',flexDirection: 'row',alignItems:'center',marginBottom:'10px'}}>
                            <Radio value="0" >A4两版</Radio>
                            <div className="item-select" style={{display: 'inline',width:'100%',textAlign:'right'}}>
                                <label className="col-6">每页分录数：</label>
                                <Select value={this.state.pageSize} style={{width:130}} disabled = {this.state.value == "0"?false:true} onChange = {(e) => {this.changePageSize(e)}}>
                                {maxLineNum.map(o => {
                                    return <Option value={o}>{o}</Option>
                                })}
                                                        
                                </Select>
                            </div>
                            
                        </div>
                        <div className="item" style={{marginBottom:'10px'}}>
                            <Radio value="1">A4三版</Radio>
                            
                        </div>  
                        <div className="item" style={{display: 'flex',flexDirection: 'row',alignItems:'center',marginBottom:'10px'}}>
                            <Radio value="2">自定义大小</Radio>
                            <div className="item-select" style={{display: 'inline',width:'100%',textAlign:'right',marginRight:'5px'}}>
                                <label className="col-6">宽：</label>
                                <Select value={this.state.width} style={{width:80}} disabled = {this.state.value == "2"?false:true} onChange = {(e) => {this.changeWidth(e)}}>
                                {width.map(o => {
                                    return <Option value={o}>{o}</Option>
                                })}
                                
                                </Select>
                            </div>
                            <div className="item-select" style={{display: 'inline',width:'100%',textAlign:'right'}}>
                                <label className="col-6">高：</label>
                                <Select value={this.state.height} style={{width:80}} disabled = {this.state.value == "2"?false:true} onChange = {(e) => {this.changeHeight(e)}}>
                                {height.map(o => {
                                    return <Option value={o}>{o}</Option>
                                })}
                                
                                </Select>
                            </div>
                        </div>
                        <div className="item">
                            <Checkbox checked = {this.state.printAccountChecked} onChange = {(e) => {this.changeAccount(e)}}>打印辅助核算</Checkbox>
                        </div>
                    </RadioGroup>
                    </div>
                </div>
              </form>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Button onClick={this.cancel}>取消</Button>
                    <Button style={{marginLeft: '8px'}} type='primary' onClick={this.confirm}>确定</Button>
                </div>
            </div>
        )
    }
}

export default PrintOptionComponent
