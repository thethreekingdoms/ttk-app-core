import React, { useEffect, useState, useCallback } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import '../css/month-range.less'
// 月度区间选择-使用示例
/*
export const MonthRangeDemo = React.memo((props) => {
  const [disableMonth] = useState([moment('2018-03'), moment('2021-05')])
  function onChange(value) {
    console.log('新值：', value)
  }
  return <RangeMonth
  separator="=="
  value={[moment('2017-01-01'), moment()]}
  placeholder={['来个选择', '来个选择']}
  disabledMonth={disableMonth}
  onChange={onChange}
  />
})
*/


/**
 * 
 */
export default function RangeMonth(props) {
  const {
    separator,
    onChange,
    placeholder = ['请选择', '请选择'],
    value = [null, null],
    disabledMonth = [moment('1970-01-01'), moment()],
    ...rest
  } = props
  const [endOpen, setEndOpen] = useState(false)
  const [currentValue, setValue] = useState(value)

  const disabledStartDate = useCallback((currentDate) => {
    const [startValue, endValue] = disabledMonth;
    if (!currentDate || !startValue || !endValue) {
      return false;
    }
    return startValue.endOf('day') > currentDate || currentDate > endValue.endOf('day')
  }, [props])

  const disabledEndDate = useCallback((currentDate) => {
    const [startValue, endValue] = disabledMonth;
    if (!currentDate || !startValue || !endValue) {
      return false;
    }
    return startValue.endOf('day') > currentDate || currentDate > endValue.endOf('day')
  }, [props]);

  function handleStartOpenChange(open) {
    if (!open) {
      setEndOpen(true);
    }
  }

  function handleEndOpenChange(open) {
    setEndOpen(open)
  }

  useEffect(() => {
    onChange && !endOpen && onChange(currentValue)
  }, [currentValue])

  return (
    <span className='month-range'>
      <DatePicker.MonthPicker
        {...rest}
        disabledDate={disabledStartDate}
        format="YYYY-MM"
        value={currentValue[0]}
        placeholder={placeholder[0]}
        onChange={(_value) => setValue([_value, currentValue[1]])}
        onOpenChange={handleStartOpenChange}
        />
      <span>{separator ? separator : '~'}</span>
      <DatePicker.MonthPicker
        {...rest}
        disabledDate={disabledEndDate}
        format="YYYY-MM"
        value={currentValue[1]}
        placeholder={placeholder[1]}
        onChange={(_value) => setValue([currentValue[0], _value])}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </span>
  )
}
