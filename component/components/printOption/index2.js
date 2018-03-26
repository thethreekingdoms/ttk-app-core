import React from 'react'
import moment from 'moment'
import Checkbox from '../checkbox/index'
import Button from '../button/index'
import Select from '../antdSelect/index'
const Option = Select.Option
class PrintOptionComponent2 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            num: false,
            currency: false,
            currencyId: '0'
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
        return <Select dropdownClassName='printOption2-select-dropDown' className="printOption2-select" style={{ width: '378px' }}  value={currencyId} onChange={this.selectChange}>{optionArr}</Select>
    }
    
    render(){
        const { num, currency } = this.state
        return (
            <div className="printOption2">
                <div className="printOption2-contaienr">
                    <div style={{padding: '5px 0', marginBottom: '9px'}} className="printOption2-title">请选择是否显示外币或数量</div>
                    <div style={{padding: '5px 20px'}} className="printOption2-checkbox">
                        <div style={{marginBottom: '14px'}} clssName="printOption2-contaienr-item">
                            <span style={{paddingRight: '8px'}} className="printOption2-label">币别</span>
                            {this.renderSelect()}
                        </div>
                        <div clssName="printOption2-contaienr-item">
                            <span style={{paddingRight: '8px', marginBottom: '9px'}} className="printOption2-label">数量</span>
                            <Checkbox checked={num} onChange={(e) => this.onChange(e, 'num')}></Checkbox>
                        </div>
                    </div>
                    <div className="printOption2-detail">
                        <span>
                            说明: 选择外币或数量后，只{this.props.type}设置了外币或数量核算的科目。
                        </span>
                    </div>
                </div>
                <div className="printOption2-bottom" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button onClick={this.cancel} style={{padding:'0 15px', height: '32px', fontSize: '14px'}}>取消</Button>
                    <Button style={{marginLeft: '8px', padding:'0 15px', height: '32px', fontSize: '14px'}} type='primary' onClick={this.confirm}>{this.props.type}</Button>
                </div>
            </div>
        )
    }
}

export default PrintOptionComponent2
