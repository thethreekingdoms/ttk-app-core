import React, { Component } from 'react'
import { List} from 'immutable'

function getMoneyStrList(){
  let columnCount = 12,   //十亿千百十万千百十元角分
    moneyStrList = List().setSize(columnCount),
    strList = List(['十', '亿', '千', '百', '十', '万', '千', '百', '十', '元', '角', '分']),
    i = columnCount - 1

  while (i >= 0) {
    let str = strList.get(i)

    if (i == columnCount - 1) {
      moneyStrList = moneyStrList.set(i, {str, className: "columnLast"})
    }
    else if (i == columnCount - 3) {
      moneyStrList = moneyStrList.set(i, {str, className: "columnRed"})
    }
    else if (i == columnCount - 6 || i == columnCount - 9 || i == columnCount - 12) {
      moneyStrList = moneyStrList.set(i, {str, className: "columnBlue"})
    }
    else {
      moneyStrList = moneyStrList.set(i, {str, className: "columnGrey"})
    }
    i--
  }

  return moneyStrList
}

export default function moneyCellHeader(props) {
  let moneyStrList = getMoneyStrList()

  return (
    <div className='app-proof-of-charge-money-cell-header'>
       <label className='app-proof-of-charge-money-cell-header-top'>{props.title}</label>
       <div className='app-proof-of-charge-money-cell-header-bottom'>
          {
              moneyStrList.map(str =>
                  <span className={str ? str.className : 'columnGrey'}
                        style={{width: "100%", textAlign: 'center', height: '100%', 'padding-top': '2px'}}>
                  {str ? str.str: ''}
                  </span>)
          }
       </div>
    </div>
  )
}
