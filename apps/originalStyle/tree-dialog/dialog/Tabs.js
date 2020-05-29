import React, { useState, useCallback } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, DatePicker, Tabs } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'
import IO from './components/IO'
import FilterCriteria from './components/FilterCriteria'
import Requirement from './components/Requirement'

const TabPane = Tabs.TabPane

export default function CardTree(props) {

  const commit = useCommit()
  const actions = useActions(props)
  // const isEdit = useData([props, 'tempState', 'isEdit'])

  const handleChange = useCallback(async (e) => {
    console.log('on handle Change', e)
  }, [])
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={handleChange}
    >
      <TabPane tab="输入输出" key="1">
        <IO {...props} />
      </TabPane>
      <TabPane tab="筛选条件" key="2">
        <FilterCriteria {...props} />
      </TabPane>
      <TabPane tab="规则设置" key="3">
        <Requirement {...props} />
      </TabPane>
      <TabPane tab="测试" key="4">
      </TabPane>
    </Tabs>
  )
}
