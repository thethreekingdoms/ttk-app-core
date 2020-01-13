import React, {useEffect} from 'react'
import moment from 'moment'
import { useData, useActions } from 'edf-app-loader'
import RangeMonth from './MonthRange'

export const Month = React.memo((props) => {
  const actions = useActions(props)
  const EnableDate = useData([props, 'dateRange', 'EnableDate'])
  const SystemDate = useData([props, 'dateRange', 'SystemDate'])
  async function onChange(value) {
    await actions.fetchDateAcion()
  }

  return (<RangeMonth
    value={[moment(), moment()]}
    placeholder={['来个选择', '来个选择']}
    disabledMonth={[EnableDate, SystemDate]}
    onChange={onChange}
  />)
})