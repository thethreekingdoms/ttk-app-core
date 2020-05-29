
import React, { useEffect, useCallback, useState } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Checkbox, Select, Button, Message, DatePicker, Tag, Tabs, DataGrid, Dialog, Modal } from 'edf-component'
import TextArea from 'antd/lib/input/TextArea'

const CheckboxGroup = Checkbox.Group;

export function ResultEditer(props) {
  let {
    className,
    // vlaue 必须是一个对象，且含 satisfyResult, dissatisfyResult, exceptionResult
    value,
    /** 虚拟键盘的点击事件 */
    onClick,
    onChange,
    ...other } = props

  // 点击弹框的回调函数
  const handlerClick = useCallback((type, checkedList) => {
    value = { ...value, [type]: value[type] + ' ' + checkedList.join(' ') }
    console.log('result editer: value: ', value)
    if (typeof onClick === 'function') {
      onClick(value)
    }
  }, [props.value])

  const handlerOnChange = useCallback((type, entryStr)=>{
    value = { ...value, [type]: entryStr }
    if(typeof onChange === 'function'){
      onChange(value)
    }
  }, [props.value])

  return (
    <div className={`result-editer${className ? ' ' + className : ''}`} >
      <div>
        <div style={{height:25}}>满足：</div>
        <OperateButton type="satisfyResult" onConfirm={(checkedList) => handlerClick('satisfyResult', checkedList)} />
        <TextArea value={value.satisfyResult} onChange={(e)=> handlerOnChange('satisfyResult', e.target.value )} />
      </div>
      <div>
        <div style={{height:25}}>不满足：</div>
        <OperateButton type="dissatisfyResult" onConfirm={(checkedList) => handlerClick('dissatisfyResult', checkedList)} />
        <TextArea value={value.dissatisfyResult} onChange={(e)=> handlerOnChange('dissatisfyResult', e.target.value )} />
      </div>
      <div>
        <div style={{height:25}}>异常：</div>
        <OperateButton type="exceptionResult" onConfirm={(checkedList) => handlerClick('exceptionResult', checkedList)} />
        <TextArea value={value.exceptionResult} onChange={(e)=> handlerOnChange('exceptionResult', e.target.value )} />
      </div>
    </div>
  )
}
/**
 * 规则设置里的结果编辑按钮
 * @param  {function} onConfirm : 当点击对话框时调用，并将选中的值作为参数, onConfirm(checkedList) 
 */
function OperateButton(props) {
  const { onConfirm } = props
  const [checkedList, setCheckedList] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [type, setType] = useState(null)

  const types = {
    tempVlue: '临时变量',
    quota: '指标',
    constant: '系统常量',
    value: '系统变量'
  }
  const widgets = {
    tempVlue: <TempValueWidget onClick={checkedList => setCheckedList(checkedList)} />,
    quota: <QuotaWidget onClick={checkedList => setCheckedList(checkedList)} />,
    constant: <TempValueWidget onClick={checkedList => setCheckedList(checkedList)} />,
    value: <div>编辑Widgets.js 中的 operateButton函数, 使用系统变量组件替换我</div>,
  }

  const handlerOnOk = useCallback(() => {
    onConfirm(checkedList)
    setShowDialog(false)
  }, [checkedList])

  const handlerClick = useCallback((type) => {
    return () => {
      setType(type)
      setShowDialog(true)
    }
  }, [handlerOnOk])
  return (
    <div>
      <Button type="primary" onClick={handlerClick('tempVlue')}>临时变量</Button>
      <Button type="primary" style={{marginLeft: '5px'}} onClick={handlerClick('quota')}>指标</Button>
      <Button type="primary" style={{marginLeft: '5px'}} onClick={handlerClick('constant')}>系统常量</Button>
      <Button type="primary" style={{marginLeft: '5px'}} onClick={handlerClick('value')}>系统变量</Button>
      <Dialog
        title={`选择${types[type]}`}
        visible={showDialog}
        onOk={handlerOnOk}
        destroyOnClose={true}
        onCancel={() => setShowDialog(false)}
      >
        {
          widgets[type]
        }
      </Dialog>
    </div>
  )
}

/**
 * 指标 对话框的内容组件，不含对话框
 * 接收onClick事件，通过该事件，父级组件可以获取当前选中了那些值。onClick(checkedList)
 */
export function QuotaWidget(props) {
  // 在这里重新绑定数据
  const options = ['Apple', 'Pear', 'Orange'] // useData([props, '']).toJS()
  const { onClick } = props
  const [checkedList, setCheckedList] = useState([]);
  const handlerClick = useCallback((checkedList) => {
    setCheckedList(checkedList)
    onClick(checkedList)
  })
  return (
    <div>
      <CheckboxGroup
        options={options}
        value={checkedList}
        onChange={handlerClick}
      />
    </div>
  )
}

/**
 * 临时变量 对话框的内容组件，不含对话框
 * 接收onClick事件，通过该事件，父级组件可以获取当前选中了那些值。onClick(checkedList)
 */
export function TempValueWidget(props) {
  // 在这里重新绑定数据
  const options = ['税负率', 'Pear'] // useData([props, '']).toJS()
  const { onClick } = props
  const [checkedList, setCheckedList] = useState([]);
  const handlerClick = useCallback((checkedList) => {
    setCheckedList(checkedList)
    onClick(checkedList)
  })
  return (
    <div>
      <CheckboxGroup
        options={options}
        value={checkedList}
        onChange={handlerClick}
      />
    </div>
  )
}