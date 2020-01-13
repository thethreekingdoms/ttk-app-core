import React, { useState } from 'react'
import { useActions } from 'edf-app-loader'
import { Layout, Radio, Row, Col } from 'edf-component'
// import { , Descriptions } from 'antd'
import { Month } from './Month'

export const SearchHeader = React.memo(Header)
function Header(props) {

  return (
        <Content {...props} />
  )
}

const Content = (props) => {
  const { column } = props
  const actions = useActions(props)
  const [receiveOrPay] = useState([{ value: 'all', label: '全部' }, { value: 'receive', label: '收入' }, { value: 'pay', label: '支出' }])
  const [voucherStatus] = useState([{ value: 0, label: '全部' }, { value: 1, label: '未补充' }, { value: 2, label: '已补充' }])

  const onReceiveOrPay = async (e) => {
    // actions.showStateAction(true)
    actions.updateSearchParam({ receiveOrPay: e.target.value })
    await actions.fetchTableBody()
    // actions.showStateAction(false)
  }
  const onVoucherStatus = async (e) => {
    // actions.showStateAction(true)
    actions.updateSearchParam({ voucherStatus: e.target.value })
    await actions.fetchTableBody()
    // actions.showStateAction(false)
  }
  return (
    <Row className="header" gutter={[0, 0]}>
      <Col span={8} >
        <Month {...props} />
      </Col>
      <Col span={8}>
        <label>支付类型</label>
        <Radio.Group options={receiveOrPay} onChange={onReceiveOrPay} />
      </Col>
      <Col span={8}>
        <label>收据状态</label>
        <Radio.Group options={voucherStatus} onChange={onVoucherStatus} />
      </Col>
    </Row>
  )
}