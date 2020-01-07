import React from 'react'
import moment from 'moment'
import { Radio,Select,Checkbox, Button,InputNumber,Input } from 'antd'
const Option = Select.Option;
const RadioGroup = Radio.Group;
const maxLineNum = [5,6,7]
// const width = [19, 19.5, 20, 20.5, 21, 21.5, 22]
// const height = [10, 10.5, 11, 11.5, 12, 12.5, 13]
class PrintOptionComponent extends React.Component{
    constructor(props){
        super(props)
        const { printAuxAccCalc, isPrintQuantity, isPrintMulti, type, maxLineNum, width, height , leftPadding, rightPadding, from} = props

        this.state = {
            printAccountChecked: printAuxAccCalc == 1 ? true : false,
            printQuantityChecked: isPrintQuantity == 1 ? true : false,
            printMultiChecked: isPrintMulti == 1 ? true : false,
            value: type ? type: '0',
            pageSize: maxLineNum ? parseInt(maxLineNum) : 6,
            width: width ? parseFloat(width) : 21.5,
            height: height ? parseFloat(height) : 12.5,
            leftPadding: leftPadding,
            rightPadding: rightPadding,
            heightConst: [10, 10.5, 11, 11.5, 12, 12.5, 13],
            widthConst: from=='proofList'?[19, 19.5, 20, 20.5, 21, 21.5, 22, 24]:[19, 19.5, 20, 20.5, 21, 21.5, 22],
            creator: false,//制单人
            auditor: false,//审核人
            creatorOriginal: 0,
            creatorCustom: '',
            auditorOriginal: 0,
            auditorCustom: '',
            time: false,
        }
    }
    componentWillReceiveProps(nextProps){
        const { printAuxAccCalc, isPrintQuantity, isPrintMulti, type, maxLineNum, width, height, leftPadding, rightPadding } = nextProps

        this.setState({
            printAccountChecked: printAuxAccCalc == 1 ? true : false,
            printQuantityChecked: isPrintQuantity == 1 ? true : false,
            printMultiChecked: isPrintMulti == 1 ? true : false,
            value: type ? type: '0',
            pageSize: maxLineNum ? parseInt(maxLineNum) : 6,
            width: width ? parseFloat(width) : 215,
            height: height ? parseFloat(height) : 125,
            leftPadding: leftPadding,
            rightPadding: rightPadding
        })
    }
    changeRadioState = (e) => {
        this.setState({
            value: e.target.value,
        })
    }
    changeAccount = (e,nameStr ) => {
        this.setState({
            [nameStr]: e.target.checked,
        })
    }
    changeState = (e, nameStr ) => {
        this.setState({
            [nameStr]: e
        })
    }
    changeCustom= (e,nameStr ) => {
        this.setState({
            [nameStr]: e.target.value,
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
            <div className="printOption" style={{padding: '20px'}}>

              <form>
                <div className="ant-form-item ant-form-item-compact">
                    <div className="col-18">
                    <RadioGroup value = {this.state.value} onChange = {(e) => {this.changeRadioState(e)}} style={{width: '100%'}}>
                        <div className="item" style={{display: 'flex',flexDirection: 'row',alignItems:'center',marginBottom:'10px'}}>
                            <Radio value="0">A4两版</Radio>
                            <div className="item-select" style={{display: 'inline',width:'65%',textAlign:'right'}}>
                                <label style={{fontSize: '12px'}}>每页分录数：</label>
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
                        <div className="item" style={{marginBottom:'10px', 'marginTop': '15px'}}>
                            <Radio value="3">A5</Radio>
                        </div>
                        <div className="item" style={{display: 'flex',flexDirection: 'row',alignItems:'center',marginBottom:'10px'}}>
                            <Radio value="2">自定义大小</Radio>
                            <div className="item-select" style={{marginRight:'5px'}}>
                                <label style={{fontSize: '12px'}}>宽：</label>
                                <InputNumber value={this.state.width} disabled = {this.state.value == "2"?false:true} style={{width:80, marginRight: '5px',textAlign:'right'}} onChange = {(e) => {this.changeWidth(e)}} min={100} max={297} precision={0} />
                                <label style={{fontSize: '12px'}}>毫米</label>
                                {/* {this.state.widthConst.map(o => {
                                    return <Option value={o}>{o}</Option>
                                })} */}

                            </div>
                            <div className="item-select" style={{}}>
                                <label style={{fontSize: '12px'}}>高：</label>
                                <InputNumber value={this.state.height} disabled = {this.state.value == "2"?false:true} style={{width:80, marginRight: '5px',textAlign:'right'}} onChange = {(e) => {this.changeHeight(e)}} min={80} max={297} precision={0} />
                                <label style={{fontSize: '12px'}}>毫米</label>
                                {/* <Select value={this.state.height} style={{width:80}} disabled = {this.state.value == "2"?false:true} onChange = {(e) => {this.changeHeight(e)}}> */}
                                {/* {this.state.heightConst.map(o => {
                                    return <Option value={o}>{o}</Option>
                                })} */}

                            </div>
                        </div>
                        <div  style={{marginBottom:10}}>
                            <label value={2} style={{width: '59px',display: 'inline-block'}}>边距调整</label>
                            <div className="item-select" style={{marginRight:'5px',display: 'inline-block'}}>
                                <label style={{fontSize: '12px'}}>左：</label>
                                <InputNumber value={this.state.leftPadding} style={{width:80, marginRight: '5px',textAlign:'right'}} onChange = {(e) => {this.changeState(e,'leftPadding')}} min={5} max={30} precision={0} />
                                <label style={{}}>毫米</label>
                            </div>
                            <div className="item-select" style={{marginRight:'20px',display: 'inline-block'}}>
                                <label style={{}}>右：</label>
                                <InputNumber value={this.state.rightPadding} style={{width:80, marginRight: '5px',textAlign:'right'}} onChange = {(e) => {this.changeState(e,'rightPadding')}} min={5} max={30} precision={0} />
                                <label style={{}}>毫米</label>
                            </div>
                        </div>
                        <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                            <Checkbox checked = {this.state.printAccountChecked} onChange = {(e) => {this.changeAccount(e, 'printAccountChecked')}}>打印辅助核算</Checkbox>
                            <Checkbox checked = {this.state.printQuantityChecked} onChange = {(e) => {this.changeQuantity(e)}}>打印数量核算</Checkbox>
                            <Checkbox checked = {this.state.printMultiChecked} onChange = {(e) => {this.changeMultiCurrency(e)}}>打印外币核算</Checkbox>
                        </div>
                        {/* {this.props.from == 'proofList' ?
                        <div>
                            <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                              <Checkbox checked = {this.state.creator} onChange = {(e) => {this.changeAccount(e, 'creator')}}>打印制单人</Checkbox>
                              {this.state.creator?
                                 <RadioGroup value={this.state.creatorOriginal} onChange={(e) => { this.changeState(e.target.value, 'creatorOriginal') }} style={{}} >
                                    <Radio value={0} style={{ marginRight: '15px', lineHeight: '32px' }}>原制单人</Radio>
                                    <Radio value={1} style={{ lineHeight: '32px' }} >打印操作人</Radio>
                                    <Radio value={2} style={{ lineHeight: '32px',marginRight:'0px'  }} >自定义</Radio>
                                    <Input value={this.state.creatorCustom} style={{width:80, marginRight: '5px'}} onChange = {(e) => {this.changeCustom(e,'creatorCustom')}}/>
                                    </RadioGroup>:null
                              }
                          </div>
                          <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                              <Checkbox checked = {this.state.auditor} onChange = {(e) => {this.changeAccount(e, 'auditor')}}>打印审核人</Checkbox>
                              {this.state.auditor?
                                 <RadioGroup value={this.state.auditorOriginal} onChange={(e) => { this.changeState(e.target.value, 'auditorOriginal') }} style={{}} >
                                    <Radio value={0} style={{ marginRight: '15px', lineHeight: '32px' }}>原制单人</Radio>
                                    <Radio value={1} style={{ lineHeight: '32px' }} >打印操作人</Radio>
                                    <Radio value={2} style={{ lineHeight: '32px',marginRight:'0px'  }} >自定义</Radio>
                                    <Input value={this.state.auditorCustom} style={{width:80, marginRight: '5px'}} onChange = {(e) => {this.changeCustom(e,'auditorCustom')}}/>
                                    </RadioGroup>:null
                              }
                          </div>
                          <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                              <Checkbox checked = {this.state.time} onChange = {(e) => {this.changeAccount(e, 'time')}}>显示打印时间</Checkbox>
                          </div></div>:null
                        } */}
                      
                    </RadioGroup> 
                    </div>
                </div>
              </form>
                <div style={{ width: '100%', textAlign: 'right',paddingTop: '12px', paddingRight: '12px', borderTop: '1px solid #e8e8e8' }}>
                    <Button type='primary' onClick={this.confirm}>确定</Button>
                    <Button style={{marginLeft: '8px'}} onClick={this.cancel}>取消</Button>
                </div>
            </div>
        )
    }
}

export default PrintOptionComponent
