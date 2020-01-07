import React from 'react'
import InputNumber from './InputNumber'
import classNames from 'classnames'

function AntInputNumberComponent(props) {
    let className = classNames({
        'mk-ant-input-number': true,
        [props.className]: !!props.className
    })
    return <InputNumber {...props} className={className} />
}

export default AntInputNumberComponent