import React from 'react'
import classNames from 'classnames'

export default function ListComponent(props) {
    let className = classNames({
        'mk-list': true,
        [props.className]: !!props.className
    })
    return <div {...props} className={className} >
        <div title={'title'}>Card content</div>
    </div>
}