import React, { useEffect, useCallback } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, DatePicker, Tag, Tabs, DataGrid, Dialog, Modal } from 'edf-component'


export default function MockKeyboard(props) {
  const {
    className,
    /**
     * 需要虚拟的键盘数组，允许数组内包含对象，如果是对象，该对象必须有key属性 
     * 例如：['', 'a', { key: 'obj', value: '2' }, 'c', '#', '%', '7', 'b', 'c', '#', '%', '7', '7', '%', '', '']
    */
    keys,
    /** 
     * 虚拟键盘的点击事件, 回调函数会将key值完全放回，例如onClick(key, e), key是数组中某个值
    */
    onClick,
    /** 声明虚拟键盘按钮在一行中占的大小。 键盘使用的是栅格布局，Row */
    span = 6,
    gutter = 0,
    ...other } = props

  const handlerClick = useCallback((key, e) => {
    if (typeof onClick === 'function')
      onClick(key, e)
  }, [keys])

  return (
    <div className={`mk-mock-keyboard${className ? ' ' + className : ''}`} >
      <Row className="mk-mock-keyboard-row" gutter={gutter} justify="center" >
        {
          keys.map((key, keyIndex) => {
            return (
              <Col className="mk-mock-keyboard-row-col" key={keyIndex} span={span}>
                <label
                  className="mk-mock-keyboard-row-col-label"
                  onClick={(e) => handlerClick(key, e)}
                >{typeof key === 'object' ? key.key : key}</label>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}