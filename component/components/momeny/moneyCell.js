import React, { Component } from 'react'

export default function moneyCell(props) {
    let v = Math.abs(parseFloat(props.value)).toFixed(2).toString().replace('.', ''),
        _value = props.value
    if (isNaN(props.value) || props.value == '' || props.value == '0' || props.value == '0.00' || props.value == undefined) {

        v = ''
    } else {
        v = Math.abs(parseFloat(props.value)).toFixed(2).toString().replace('.', '')
    }
    if (Number(v) == 0) {
        v = ''
    }
    v = v.padStart(12, ' ')
    let isNegative = _value < 0
    let children = []

    for (var i = 0; i < v.length; i++) {
        if (i >= 12) continue
        children.push(isNegative ? <div className='columnNegative'>{v[i]}</div> : <div>{v[i]}</div>)
    }

    return (
        <div className='app-proof-of-charge-money-cell'>
            {children}
        </div>
    )
}
