import React, { useState } from 'react'
import { useActions, useCommit } from 'edf-app-loader'
import { DateRangeMonthPicker, Layout, Radio, Row, Col, Form } from 'edf-component'
import moment from 'moment'

export const SearchHeader = React.memo(Header)
function Header(props) {

  return (
    <Content {...props} />
  )
}

const Content = (props) => {
  const { column } = props
  const commit = useCommit()
  const actions = useActions(props)
  const [receiveOrPay] = useState([{ value: 'all', label: '全部' }, { value: 'receive', label: '收入' }, { value: 'pay', label: '支出' }])
  const [voucherStatus] = useState([{ value: 0, label: '全部' }, { value: 1, label: '未补充' }, { value: 2, label: '已补充' }])

  const onReceiveOrPay = async (e) => {
    commit([props, 'showState'], true)
    actions.updateSearchParam({ receiveOrPay: e.target.value })
    await actions.fetchTableBody()
    commit([props, 'showState'], false)
  }
  const onVoucherStatus = async (e) => {
    commit([props, 'showState'], true)
    await actions.updateSearchParam({ voucherStatus: e.target.value })
    await actions.fetchTableBody()
    commit([props, 'showState'], false)
  }
  const handleChange = async (value) => {
    commit([props, 'showState'], true)
    await actions.updateSearchParam({ beginDate: value[0], endDate: value[1] })
    await actions.fetchTableBody()
    commit([props, 'showState'], false)
  }
  return (
    <Form
      layout="vertical"
      className="ttk-search-container"
    >
      <Row className="header" gutter={24}>
        <Col span={5} >
          <DateRangeMonthPicker
            format="YYYY-MM"
            allowClear={false}
            startEnableDate="2019-01"
            value={[moment(), moment()]}
            onChange={handleChange}
          />
        </Col>
        <Col span={7}>
          <label>支付类型: </label>
          <Radio.Group options={receiveOrPay} onChange={onReceiveOrPay} />
        </Col>
        <Col span={12}>
          <label>收据状态: </label>
          <Radio.Group options={voucherStatus} onChange={onVoucherStatus} />
        </Col>
      </Row>
    </Form>
  )
}