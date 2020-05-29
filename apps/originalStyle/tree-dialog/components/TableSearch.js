import React, { useState, useCallback } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, Dialog, TimePicker, Popover } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'
// import { Popover } from 'antd'
import MockKeyboard from '../dialog/components/MockKeyboard'

export default function CardTree(props) {
  const actions = useActions(props)
  const commit = useCommit()

  const handleToggle = useCallback((e) => {
    // console.log('handle event')
  }, [])

  const handleClick = useCallback((e) => {
    commit([props, 'tempState'], { type: 'setShowDialog', data: true })
  }, [])

  return (
    <Form
      layout="vertical"
      className="ttk-search-container"
    >
      <Row gutter={24}>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="Bordered">
            <Input value='{state.bordered}' onChange={handleToggle('bordered')} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="Bordered">
            <Input value='{state.bordered}' onChange={handleToggle('bordered')} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="Bordered">
            <Input value='{state.bordered}' onChange={handleToggle('bordered')} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="Bordered">
            <Input value='{state.bordered}' onChange={handleToggle('bordered')} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="测试">
            <Popover
              trigger="click"
              overlayClassName="rule-engine-popover"
              content={<MockKeyboard
                onClick={(key, e) => console.log('key down: ', key, e)}
                keys={['', 'a', { key: 'obj', value: '2' }, 'c', '#', '%', '7', 'b', 'c', '#', '%', '7', '7', '%', '', '']}
              />}
            >
              <Input value='{state.bordered}' onChange={handleToggle('bordered')} />
            </Popover>
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'none' }}>
          <Form.Item labelCol={{ span: 5 }} label="Bordered">
            <Input value='{state.bordered}' onChange={handleToggle('bordered')} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'none' }}>
          <Form.Item labelCol={{ span: 5 }} label="Bordered">
            <TimePicker onChange={handleToggle('bordered')} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="Pagination">
            <Radio.Group
              value={'none'}
              onChange={handleToggle}
            >
              <Radio.Button value="top">Top</Radio.Button>
              <Radio.Button value="bottom">Bottom</Radio.Button>
              <Radio.Button value="both">Both</Radio.Button>
              <Radio.Button value="none">None</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={8} style={{ display: 'block' }}>
          <Form.Item>
            <Button icon="plus" type="primary" onClick={handleClick}>modal</Button>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  )
}