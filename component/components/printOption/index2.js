import React from 'react'
import moment from 'moment'
import Checkbox from '../checkbox/index'
import Button from '../button/index'
import Select from '../antdSelect/index'
import Radio from '../radio/index'
const RadioGroup = Radio.Group
const Option = Select.Option
class PrintOptionComponent2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: false,
            currency: false,
            currencyId: '0',
            isAllInOne: false,
            isOnlyEndNode: false
        }
    }

    onChange = (e, path) => {
        this.setState({
            [path]: e.target.checked
        })
    }

    confirm = () => {
        this.props.closeModal()
        this.props.callBack(this)
    }
    cancel = () => {
        this.props.closeModal()
    }

    getValue = () => {
        return this.state
    }

    selectChange = (value) => {
        this.setState({
            currencyId: value
        })
    }

    renderSelect = () => {
        const { currency } = this.props
        const { currencyId } = this.state
        const arr = currency.filter(item => item.value != '1')
        const optionArr = arr.map(item => {
            return <Option value={item.value} title={item.label} >{item.label}</Option>
        })
        return <Select dropdownClassName='printOption2-select-dropDown' className="printOption2-select" style={{ width: '378px' }} value={currencyId} onChange={this.selectChange}>{optionArr}</Select>
    }
    radioChange = (e, path) => {
        this.setState({
            [path]: e.target.value
        })
    }
    render() {
        const { num, currency, isAllInOne ,isOnlyEndNode} = this.state
        return (
            <div className="printOption2">
                <div className="printOption2-contaienr">
                    <div style={{ padding: '5px 0', marginBottom: '9px',fontSize:'12px' }} className="printOption2-title">请选择是否显示外币或数量</div>
                    <div style={{ padding: '5px 20px' }} className="printOption2-checkbox">
                        <div style={{ marginBottom: '14px' ,fontSize:'12px'}} clssName="printOption2-contaienr-item">
                            <span style={{ paddingRight: '8px',fontSize:'12px',fontFamily:'Microsoft YaHei' }} className="printOption2-label">币别</span>
                            {this.renderSelect()}
                        </div>
                        <div clssName="printOption2-contaienr-item" style={{ marginBottom: '14px' ,display:'inline',marginRight:'15px'}}>
                            
                            <Checkbox checked={num} onChange={(e) => this.onChange(e, 'num')}></Checkbox>
                            <span style={{ paddingRight: '8px', marginBottom: '9px',fontSize:'12px' ,fontFamily:'Microsoft YaHei'}} className="printOption2-label">数量</span>
                        </div>
                        <div clssName="printOption2-contaienr-item" style={{ marginBottom: '14px' ,display:'inline',fontFamily:'Microsoft YaHei'}}>
                            
                            <Checkbox checked={isOnlyEndNode} onChange={(e) => this.onChange(e, 'isOnlyEndNode')}></Checkbox>
                            <span style={{ paddingRight: '8px', marginBottom: '9px' ,fontSize:'12px',fontFamily:'Microsoft YaHei'}} className="printOption2-label">只{this.props.type}末级</span>
                        </div>
                        {
                            this.props.type == '导出' ?
                                <div clssName="printOption2-contaienr-item" style={{ marginTop: '14px'}}>
                                    <RadioGroup  onChange={(e) => this.radioChange(e, 'isAllInOne')} value={isAllInOne}>
                                        <Radio value={false} style={{fontSize:'12px'}}>不同科目分页签导出</Radio>
                                        <Radio value={true} style={{fontSize:'12px'}}>不同科目同页签连续导出</Radio>
                                    </RadioGroup>
                                </div> : null
                        }
                    </div>
                    {/* <div className="printOption2-detail">
                        <span>
                            说明: 选择外币或数量后，只{this.props.type}设置了外币或数量核算的科目
                        </span>
                    </div> */}
                </div>
                <div className="printOption2-bottom" style={{ textAlign: 'center', marginTop: '20px',fontSize:'12px' ,paddingTop:'12px'}}>
                    <Button onClick={this.cancel} style={{ padding: '0 15px', height: '32px', fontSize: '12px' }}>取消</Button>
                    <Button style={{ marginLeft: '8px', padding: '0 15px', height: '32px', fontSize: '12px' }} type='primary' onClick={this.confirm}>{this.props.type}</Button>
                </div>
            </div>
        )
    }
}

export default PrintOptionComponent2
