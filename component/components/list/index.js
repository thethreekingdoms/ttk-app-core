import React from 'react'
import { List, Card } from 'antd'
import classNames from 'classnames'

export default function ListComponent(props) {
    let className = classNames({
        'mk-list': true,
        [props.className]: !!props.className
    })
    return <List {...props} className={className} >
        <Card title={'title'}>Card content</Card>
    </List>
}