import React, { useState, useCallback } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, DatePicker } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'

export default function CardTree(props) {

  const commit = useCommit()
  const actions = useActions(props)
  const isEdit = useData([props, 'tempState', 'isEdit'])
  const loading = useData([props, 'tempState', 'loading'])
  const selectKey = useData([props, 'selectKey']).toJS()
  const validateState = useData([props, 'validateState']).toJS()
  const formObj = useData([props, 'attributeForm']).toJS()
  const busType = []// useData([props, 'busType']).toJS()

  const updateForm = useCallback(async (e) => {
    await actions.updateFormObj(e)
  }, [])
  const save = useCallback(async () => {
    // 使用commit直接更新reducer数据。这种方式可跳过action直接更新reducer数据
    commit([props, 'tempState'], { type: 'setLoading', data: true })
    if (selectKey[0] === 0) {
      Message.warning('请先选择一个菜单进行操作')
    } else {
      const [validateResult, validateStatus, submitResult] = await actions.save()
      if (submitResult) {
        Message.success('保存成功。')
      }
    }
    commit([props, 'tempState'], { type: 'setLoading', data: false })
  }, [formObj.parentId])
  const onReset = useCallback(() => {
    commit([props, 'formObj'], {
      type: 'reset',
      data: {
        parentId: formObj.parentId,
        parentName: formObj.parentName,
        functioinId: formObj.functioinId
      }
    })
  }, [formObj.parentId, formObj.parentName, formObj.functioinId])
  return (
    <Card
      className="ttk-card-form"
      title="基本属性"
    >
      <Spin spinning={loading} delay={50}>
        <Layout className="content">
          <Form>
            <Row>
              <Col span={12}>
                {/* label120是指定label的宽度，预置有label100，120,130~180的宽度。默认宽度为100. 输入框的宽度是自适应的。 */}
                <Form.Item
                  className="label120"
                  label="上级菜单"
                  required={true} >
                  <Input disabled={true} value={formObj.parentName} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className="label120" label="类型" required={true} >
                  <Radio.Group
                    disabled={false}
                    showSearch={false}
                    value={formObj.functionType}
                    onChange={(e) => updateForm({ functionType: e.target.value })} >
                    <Radio value="desk">首页</Radio>
                    <Radio value="menu">菜单</Radio>
                    <Radio value="button">按钮</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="名称"
                  // required={true}
                  validateStatus={validateState.name.state}
                  help={validateState.name.message}>
                  <Input placeholder="请输入名称"  disabled={false} value={formObj.name} onChange={e => updateForm({ name: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="优先级"
                  // required={true}
                  validateStatus={validateState.code.state}
                  help={validateState.code.message}>
                  <Input placeholder="请输入优先级" disabled={false} value={formObj.code} onChange={e => updateForm({ code: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="有效期起"
                  // required={true}
                  validateStatus={validateState.code.state}
                  help={validateState.code.message}>
                    <DatePicker placeholder="请选择有效期起" defaultValue={formObj.dateStart} value={formObj.dateStart} onChange={e=>updateForm({dateStart: e})} />
                  {/* <Input disabled={false} value={formObj.code} onChange={e => updateForm({ code: e.target.value })} /> */}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="有效期止"
                  // required={true}
                  validateStatus={validateState.code.state}
                  help={validateState.code.message}>
                    <DatePicker placeholder="请选择有效期起" value={formObj.dateEnd} onChange={e=>updateForm({dateEnd: e})} />
                  {/* <Input placeholder="请选择有效期止" disabled={false} value={formObj.code} onChange={e => updateForm({ code: e.target.value })} /> */}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="是否循环"
                  // required={true}
                  validateStatus={validateState.busTypeId.state}
                  help={validateState.busTypeId.message}>
                  <Select
                    placeholder="请选择是否循环"
                    filterOption={null}
                    allowClear={true}
                    disabled={false}
                    value={formObj.busTypeId}
                    onChange={e => updateForm({ busTypeId: e })} >
                    {
                      busType.map((item, index) => <Select.Option value={item.itemCode}>{item.itemName}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="启用"
                  required={true}
                  validateStatus={validateState.busTypeId.state}
                  help={validateState.busTypeId.message}>
                  <Select
                    placeholder="请选择启用"
                    filterOption={null}
                    allowClear={true}
                    disabled={false}
                    value={formObj.busTypeId}
                    onChange={e => updateForm({ busTypeId: e })} >
                    {
                      busType.map((item, index) => <Select.Option value={item.itemCode}>{item.itemName}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  className="label120"
                  label="路径"
                  required={true}
                  validateStatus={validateState.url.state}
                  help={validateState.url.message}>
                  <Input disabled={false} value={formObj.url} onChange={e => updateForm({ url: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className="label120"
                  label="是否可见"
                  required={false} >
                  <Radio.Group disabled={false} showSearch={false} value={formObj.isShow} onChange={e => updateForm({ isShow: e.target.value })} >
                    <Radio value="Y">是</Radio>
                    <Radio value="N">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="状态"
                  required={false} >
                  <Radio.Group disabled={false} showSearch={false} value={formObj.isValid} onChange={e => updateForm({ isValid: e.target.value })} >
                    <Radio value="Y">启用</Radio>
                    <Radio value="N">停用</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label120"
                  label="图标"
                  required={false} >
                  <Input disabled={false} value={formObj.imageUrl} onChange={e => updateForm({ imageUrl: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  className="label120"
                  label="备注"
                  required={false} >
                  <Input.TextArea disabled={false} value={formObj.remark} onChange={e => updateForm({ remark: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  className="label120"
                  label="允许访问接口"
                  required={false} >
                  <Input.TextArea disabled={false} value={formObj.accessAuthorityPaths} onChange={e => updateForm({ accessAuthorityPaths: e.target.value })} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className="form-footer" span={24}>
                {isEdit ?
                  <Button type="primary" _visible={true} onClick={save}>修改</Button>
                  :
                  <Button type="primary" _visible={!isEdit} onClick={save}>新增</Button>
                }
                <Button onClick={onReset}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Layout>
      </Spin>
    </Card>
  )
}