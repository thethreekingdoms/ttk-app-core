import React from 'react'
import moment from 'moment'
import { Radio, Select, Checkbox, Button, InputNumber,Tooltip,Input,DatePicker  } from 'antd'
import Icon from '../icon/index'
import utils from 'edf-utils'

const Option = Select.Option;
const RadioGroup = Radio.Group;
const maxLineNum = [5, 6, 7]
const width = [190, 195, 200, 205, 210, 215, 220]
const height = [100, 105, 110, 115, 120, 125, 130]
class PrintOptionComponent3 extends React.Component {
    constructor(props) {
        super(props)
        const { height, printTime, landscape, type, width, leftPadding, rightPadding, samePage, topPadding, bottomPadding, contentFontSize, printCover,printAuxData } = props
        this.state = {
            printTime: printTime || false,
            landscape: landscape || false,
            type: type ? type : 3,
            width: width ? parseFloat(width) : 215,
            height: height ? parseFloat(height) : 125,
            leftPadding: leftPadding,
            rightPadding: rightPadding,
            topPadding: topPadding,
            bottomPadding: bottomPadding,
            contentFontSize: contentFontSize,
            printCover: printCover,
            printAuxData: printAuxData,
            samePage: samePage || false,
            printAuxDataDisabled:samePage==true?true:false,
            creator:props.creator ? props.creator :'',//自定义制表人
            supervisor:props.supervisor ?props.supervisor :'',//自定义财务负责人
            creatorButton:props.creatorType==-1?false:true,
            supervisorButton:props.supervisorType==-1?false:true,
            creatorType:props.creatorType||props.creatorType==0 ? props.creatorType :'', //制表人勾选项枚举类型(-1:没有勾选，0:自定义，1:制表人)
            supervisorType:props.supervisorType||props.supervisorType==0 ? props.supervisorType :'', //财务负责人勾选项枚举类型(-1:没有勾选，0:自定义，1:制表人)
            enableddate: props.enableddate ? props.enableddate :'',
            customPrintTime: props.customPrintTime ?moment(props.customPrintTime,'YYYY-MM-DD HH:mm:ss'): '',//自定义时间
            timeOriginal:props.customPrintTime?1:0,

        }
    }
    componentWillReceiveProps(nextProps) {
        const { height, printTime, landscape, type, width, leftPadding, rightPadding, samePage, topPadding, bottomPadding, contentFontSize, printCover,printAuxData } = nextProps
        this.setState({
            printTime: printTime || false,
            landscape: landscape || false,
            type: type ? type : 3,
            width: width ? parseFloat(width) : 215,
            height: height ? parseFloat(height) : 125,
            leftPadding: leftPadding,
            rightPadding: rightPadding,
            topPadding: topPadding,
            bottomPadding: bottomPadding,
            contentFontSize: contentFontSize,
            printCover: printCover,
            printAuxData: printAuxData,
            samePage: samePage || false,
            printAuxDataDisabled:samePage==true?true:false
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
    disabledDate = (time,type) => {
        const enableddate = this.state.enableddate
        let currentMonth = this.transformDateToNum(time)
        let enableddateMonth = this.transformDateToNum(enableddate)
        return currentMonth < enableddateMonth

    }
    transformDateToNum = (date) => {
        try {
            if (!date) {
                return 0
            }
            let time = date
            if (typeof date == 'string') {
                time = utils.date.transformMomentDate(date)
            }
            return parseInt(`${time.year()}${time.month() < 10 ? `0${time.month()}` : `${time.month()}`}`)
        } catch (err) {
            return 0
        }

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
    changeCustom= (e,nameStr ) => {
        this.setState({
            [nameStr]: e.target.value,
        })
    }
    changeState = (e, nameStr) => {
        if(nameStr=='samePage'){
            this.setState({
                printAuxDataDisabled: e,
                printAuxData: false,
            })
        }
        if(nameStr=='creatorButton'&&e==true){
            this.setState({
                creatorType: this.state.creatorType!==-1?this.state.creatorType:1,
            })
        }
        if(nameStr=='supervisorButton'&&e==true){
            this.setState({
                supervisorType: this.state.supervisorType!==-1?this.state.supervisorType:1,
            })
        }
        if(nameStr=='supervisorType'&&e==1){
            this.setState({
                supervisor: '',
            })
        }
        if(nameStr=='creatorType'&&e==1){
            this.setState({
                creator: '',
            })
        }
        if(nameStr=='timeOriginal'&&e==0){
            this.setState({
                customPrintTime: '',
            })
        }
        this.setState({
            [nameStr]: e
        })
    }
    dateChange =( key, value ) => {
        // console.log(moment(value).format('YYYY-MM-DD HH：mm：ss'),  typeof moment(value).format('YYYY-MM-DD HH：mm：ss'))
        this.setState({
            [key]: value
        })
    }
    confirm = () => {
        this.props.closeModal()
        if(this.state.creatorButton==false){
            this.state.creatorType=-1
        }
        if(this.state.supervisorButton==false){
            this.state.supervisorType=-1
        }
        this.state.customPrintTime=this.state.customPrintTime&&this.state.timeOriginal==1?moment(this.state.customPrintTime).format('YYYY-MM-DD HH:mm:ss'):''
        this.props.callBack(this.state)
    }
    cancel = () => {
        this.props.closeModal()
    }

    render() {
        const { customPrintTime } = this.state
        return (
            <div className="printOption" style={{ padding: '12px 0px' }}>
                <form>
                    <div className="ant-form-item ant-form-item-compact" style={{ padding: '0px 12px' }}>
                        <div className="col-18">
                            <div>
                                <RadioGroup value={this.state.landscape} onChange={(e) => { this.changeState(e.target.value, 'landscape') }} style={{}} >
                                    <label style={{ fontSize: '12px', width: '75px', lineHeight: '32px', display: 'inline-block' }}>打印方向</label>
                                    <Radio value={false} style={{ marginRight: '15px', lineHeight: '32px' }}>纵向</Radio>
                                    <Radio value={true} style={{ lineHeight: '32px' }} >横向</Radio>
                                </RadioGroup>
                                <RadioGroup value={this.state.type} style={{ marginBottom: 5 }} onChange={(e) => { this.changeState(e.target.value, 'type') }} >
                                    <label style={{ fontSize: '12px', width: '75px', lineHeight: '32px', height: '32px', verticalAlign: 'top', display: 'inline-block' }}>纸张模板</label>
                                    <Radio value={3} style={{ marginRight: '10px', height: '32px' }}><span style={{ lineHeight: '32px' }}>A4</span><span style={{ marginBottom: 0, fontSize: '10px' }}>（{this.state.landscape ? '297*210毫米' : '210*297毫米'}）</span></Radio>
                                    <Radio value={4} style={{ marginRight: '10px', height: '32px' }}><span style={{ lineHeight: '32px' }}>A5</span><span style={{ marginBottom: 0, fontSize: '10px' }}>（{this.state.landscape ? '210*148毫米' : '148*210毫米'}）</span></Radio>
                                    <Radio value={5} style={{ marginRight: '10px', height: '32px' }}><span style={{ lineHeight: '32px' }}>标准凭证纸</span><span style={{ marginBottom: 0, fontSize: '10px' }}>（{this.state.landscape ? '240*140毫米' : '140*240毫米'}）</span></Radio>
                                    <Radio value={2} style={{ marginRight: '0px' }}>自定义大小</Radio>
                                    <div style={{ marginBottom: '7px', display: (this.state.type == 2 ? 'block' : 'none') }}>
                                        <div className="item-select" style={{ marginLeft: '75px', marginRight: '20px', display: 'inline-block' }}>
                                            <label style={{ fontSize: '12px' }}>宽：</label>
                                            {/* <Select value={this.state.width} style={{ width: 80, marginRight: '5px' }} disabled={this.state.type == 2 ? false : true} onChange={(e) => { this.changeState(e, 'width') }}>
                                                {width.map(o => {
                                                    return <Option value={o}>{o}</Option>
                                                })}
                                            </Select> */}
                                            <InputNumber value={this.state.width} disabled = {this.state.type == 2 ?false:true} style={{width:80, marginRight: '5px',textAlign:'right',height: '26px', verticalAlign: 'middle'}} onChange = {(e) => {this.changeState(e, 'width')}} min={100} max={297} precision={0} />
                                            <label style={{ fontSize: '12px' }}>毫米</label>

                                        </div>
                                        <div className="item-select" style={{ display: 'inline-block' }}>
                                            <label style={{ fontSize: '12px' }}>高：</label>
                                            {/* <Select value={this.state.height} style={{ width: 80, marginRight: '5px' }} disabled={this.state.type == 2 ? false : true} onChange={(e) => { this.changeState(e, 'height') }}>
                                                {height.map(o => {
                                                    return <Option value={o}>{o}</Option>
                                                })}
                                            </Select> */}
                                            <InputNumber value={this.state.height} disabled = {this.state.type == 2?false:true} style={{width:80, marginRight: '5px',textAlign:'right',height: '26px', verticalAlign: 'middle'}} onChange = {(e) => {this.changeState(e, 'height')}} min={80} max={297} precision={0} />
                                            <label style={{ fontSize: '12px' }}>毫米</label>
                                        </div>
                                    </div>
                                </RadioGroup>
                                <div style={{ marginBottom: 10 }}>
                                    <label value={2} style={{ width: '75px', display: 'inline-block' }}>边距调整</label>
                                    <div className="item-select" style={{ marginRight: '20px', display: 'inline-block' }}>
                                        <label style={{ fontSize: '12px' }}>左：</label>
                                        <InputNumber value={this.state.leftPadding} style={{ width: 60, marginRight: '5px', textAlign: 'right', height: '26px', verticalAlign: 'middle' }} onChange={(e) => { this.changeState(e, 'leftPadding') }} min={5} max={30} precision={0} />
                                        <label style={{}}>毫米</label>
                                    </div>
                                    <div className="item-select" style={{ marginRight: '20px', display: 'inline-block' }}>
                                        <label style={{}}>右：</label>
                                        <InputNumber value={this.state.rightPadding} style={{ width: 60, marginRight: '5px', textAlign: 'right', height: '26px', verticalAlign: 'middle' }} onChange={(e) => { this.changeState(e, 'rightPadding') }} min={5} max={30} precision={0} />
                                        <label style={{}}>毫米</label>
                                    </div>
                                    <div className="item-select" style={{ marginRight: '20px', display: 'inline-block' }}>
                                        <label style={{}}>上：</label>
                                        <InputNumber value={this.state.topPadding} style={{ width: 60, marginRight: '5px', textAlign: 'right', height: '26px', verticalAlign: 'middle' }} onChange={(e) => { this.changeState(e, 'topPadding') }} min={5} max={30} precision={0} />
                                        <label style={{}}>毫米</label>
                                    </div>
                                    <div className="item-select" style={{ display: 'inline-block' }}>
                                        <label style={{}}>下：</label>
                                        <InputNumber value={this.state.bottomPadding} style={{ width: 60, marginRight: '5px', textAlign: 'right', height: '26px', verticalAlign: 'middle' }} onChange={(e) => { this.changeState(e, 'bottomPadding') }} min={5} max={30} precision={0} />
                                        <label style={{}}>毫米</label>
                                    </div>
                                </div>
                                <div>
                                    <label value={2} style={{ width: '75px', display: 'inline-block', marginBottom: 5 }}>字体调整</label>
                                    <div className="item-select" style={{ marginRight: '20px', display: 'inline-block' }}>
                                        <InputNumber value={this.state.contentFontSize} style={{ width: 60, marginRight: '5px', textAlign: 'right', height: '26px', verticalAlign: 'middle' }} onChange={(e) => { this.changeState(e, 'contentFontSize') }} min={5} max={12} precision={0} />
                                    </div>
                                </div>
                            </div>
                            {this.props.from == 'sumaccount' || this.props.from == 'detailaccount' ?
                                <div clssName="printOption2-contaienr-item" style={{ marginTop: '12px' }}>
                                    <RadioGroup onChange={(e) => this.changeState(e.target.value, 'samePage')} value={this.state.samePage}>
                                        <Radio value={false} style={{ fontSize: '12px' }}>不同科目分页签打印</Radio>
                                        <Radio value={true} style={{ fontSize: '12px' }}>不同科目同页签连续打印</Radio>
                                    </RadioGroup>
                                </div> :
                                null
                            }
                             {this.props.from == 'detailaccount' ?
                                <div className="item" style={{ paddingBottom:'8px',height: '32px', lineHeight: '32px' }}>
                                    <Checkbox checked={this.state.printAuxData} disabled={this.state.printAuxDataDisabled?this.state.printAuxDataDisabled:false} onChange={(e) => { this.changeState(e.target.checked, 'printAuxData') }} style={{ fontSize: '12px' }}>打印辅助核算</Checkbox>
                                    <Tooltip placement="right" title='连续打印暂不支持打印辅助项' overlayClassName='helpIcon-tooltip'>
                                        <Icon type='bangzhutishi' fontFamily='edficon' style={{fontSize:'22px',top:'4px', color:'#0066b3',position:'relative',cursor: 'pointer'}} ></Icon>
                                    </Tooltip> 
                                </div>:
                                null
                            }
                            {this.props.glFrom?
                            <div>
                                <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                                  <Checkbox checked = {this.state.creatorButton} onChange = {(e) => {this.changeState(e.target.checked, 'creatorButton')}}>打印操作人</Checkbox>
                                  {this.state.creatorButton?
                                     <RadioGroup value={this.state.creatorType} onChange={(e) => { this.changeState(e.target.value, 'creatorType') }} style={{}} >
                                        <Radio value={1} style={{ marginRight: '15px', lineHeight: '32px' }}>当前操作人</Radio>
                                        <Radio value={0} style={{ lineHeight: '32px',marginRight:'0px'  }} >自定义</Radio>
                                        <Input value={this.state.creator} style={{width:100, marginRight: '5px'}} disabled={this.state.creatorType==1?true:false} onChange = {(e) => {this.changeCustom(e,'creator')}}/>
                                        </RadioGroup>:null
                                  }
                              </div>
                              <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                                  <Checkbox checked = {this.state.printTime} onChange = {(e) => {this.changeState(e.target.checked, 'printTime')}}>显示打印时间</Checkbox>
                                  {this.state.printTime?
                                     <RadioGroup value={this.state.timeOriginal} onChange={(e) => { this.changeState(e.target.value, 'timeOriginal') }} >
                                        <Radio value={0} style={{ marginRight: '15px', lineHeight: '32px' }}>当前操作时间</Radio>
                                        <Radio value={1} style={{ lineHeight: '32px',marginRight:'0px'  }} >自定义</Radio>
                                        <DatePicker 
                                            style={{ width: '200px'  }}
                                            disabled={this.state.timeOriginal==0?true:false}
                                            allowClear={false} 
                                            value={ customPrintTime }
                                            format="YYYY-MM-DD HH：mm：ss"
                                            disabledDate  = {(current) => this.disabledDate(current)}
                                            onChange={(value)=>this.dateChange('customPrintTime', value)} 
                                        />
                                        </RadioGroup>:null
                                  }
                              </div></div>:null
                            }
                            {this.props.from == 'balancesheetRpt'||this.props.from == 'profitstatementRpt' ||this.props.from =='cashflowstatementRpt'?
                            <div>
                                <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                                  <Checkbox checked = {this.state.creatorButton} onChange = {(e) => {this.changeState(e.target.checked, 'creatorButton')}}>打印制表人</Checkbox>
                                  {this.state.creatorButton?
                                     <RadioGroup value={this.state.creatorType} onChange={(e) => { this.changeState(e.target.value, 'creatorType') }} style={{}} >
                                        <Radio value={1} style={{ marginRight: '15px', lineHeight: '32px' }}>打印操作人</Radio>
                                        <Radio value={0} style={{ lineHeight: '32px',marginRight:'0px'  }} >自定义</Radio>
                                        <Input value={this.state.creator} style={{width:100, marginRight: '5px'}} disabled={this.state.creatorType==1?true:false} onChange = {(e) => {this.changeCustom(e,'creator')}}/>
                                        </RadioGroup>:null
                                  }
                              </div>
                              <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                                  <Checkbox checked = {this.state.supervisorButton} onChange = {(e) => {this.changeState(e.target.checked, 'supervisorButton')}}>打印财务负责人</Checkbox>
                                  {this.state.supervisorButton?
                                     <RadioGroup value={this.state.supervisorType} onChange={(e) => { this.changeState(e.target.value, 'supervisorType') }} style={{}} >
                                        <Radio value={1} style={{ marginRight: '15px', lineHeight: '32px' }}>打印操作人</Radio>
                                        <Radio value={0} style={{ lineHeight: '32px',marginRight:'0px'  }} >自定义</Radio>
                                        <Input value={this.state.supervisor} style={{width:100, marginRight: '5px'}} disabled={this.state.supervisorType==1?true:false} onChange = {(e) => {this.changeCustom(e,'supervisor')}}/>
                                        </RadioGroup>:null
                                  }
                              </div>
                              <div className="item" style={{paddingBottom:'8px',height:'40px',lineHeight:'40px'}}>
                                  <Checkbox checked = {this.state.printTime} onChange = {(e) => {this.changeState(e.target.checked, 'printTime')}}>显示打印时间</Checkbox>
                                  {this.state.printTime?
                                     <RadioGroup value={this.state.timeOriginal} onChange={(e) => { this.changeState(e.target.value, 'timeOriginal') }} >
                                        <Radio value={0} style={{ marginRight: '15px', lineHeight: '32px' }}>当前操作时间</Radio>
                                        <Radio value={1} style={{ lineHeight: '32px',marginRight:'0px'  }} >自定义</Radio>
                                        <DatePicker 
                                            style={{ width: '200px'  }}
                                            disabled={this.state.timeOriginal==0?true:false}
                                            allowClear={false} 
                                            value={ customPrintTime }
                                            format="YYYY-MM-DD HH：mm：ss"
                                            disabledDate  = {(current) => this.disabledDate(current)}
                                            onChange={(value)=>this.dateChange('customPrintTime', value)} 
                                        />
                                        </RadioGroup>:null
                                  }
                              </div></div>:null
                            }
                            {(this.state.type != 3 && this.state.type != 4 )?null :<div className="item" style={{ height: '32px', lineHeight: '32px' }}>
                                <Checkbox checked={this.state.printCover} onChange={(e) => { this.changeState(e.target.checked, 'printCover') }} style={{ fontSize: '12px' }}>打印封皮</Checkbox>
                            </div>}
                        </div>
                    </div>
                </form>
                <div className='printOption2-bottom' style={{ width: '100%', textAlign: 'right', paddingTop: '12px', paddingRight: '12px', borderTop: '1px solid #e8e8e8' }}>
                    <Button style={{ marginRight: '8px', fontSize: '12px' }} type='primary' onClick={this.confirm}>保存</Button>
                    <Button style={{ fontSize: '12px' }} onClick={this.cancel}>取消</Button>
                </div>
            </div>
        )
    }
}

export default PrintOptionComponent3
