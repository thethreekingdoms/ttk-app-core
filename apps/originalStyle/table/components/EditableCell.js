import React, { useState, useRef } from 'react'
import { Input, Form } from 'antd'

import "../css/editable-cell.less"

const EditableContext = React.createContext();
function EditableRow({ form, index, ...props }) {
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  )
}

export const EditableFormRow = Form.create()(EditableRow);
export function EditableCell(props) {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef()
  const [form, setForm] = useState(null)
  function toggleEdit() {
    setEditing(!editing)
  }
  function save(e, c) {
    const { record, handleSave } = props
    form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      toggleEdit()
      handleSave({ ...record, ...values })
    })
  }
  function renderCell(form) {
    const { children, dataIndex, isMustSelect = false, record, title } = props
    setForm(form)
    return editing ? (
      <Form.Item className="editable-cell">
        {
          form.getFieldDecorator(dataIndex, {
            rules: [{ required: isMustSelect, message: `${title} is required.` }],
            initialValue: record[dataIndex]
          })(<Input ref={inputRef} autoFocus onPressEnter={save} onBlur={save} />)
        }
      </Form.Item>
    ) : (
        <div className="editable-cell-value-wrap" style={{ width: "100%" }} onClick={toggleEdit}>
          {children}&nbsp;
        </div>
      )
  }
  const {
    editable, children, record, dataIndex, handleSave, isMustSelect, ...restProps
  } = props
  // if (inputRef.current === "undefined")
    // !!record && inputRef.current && inputRef.current.focus()
  return (
    <td {...restProps}>
      {
        editable && !!record.id ? (
          <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
        ) : (
            children
          )
      }
    </td>
  )
}