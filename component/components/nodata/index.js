import React, { Component } from 'react'
import classNames from 'classnames'

export default function NoDataComponent(props) {
    let { className, style, width,
        height, type, children, small, ...others } = props,
        img = 'noContent'

    className = classNames({
        'mk-nodata': true,
        [className]: !!className,
        'small': !!small
        
    })

    style = style || {}

    if (width) {
        //style.flex = `0 0 ${width}px`
        style.width = `${width}px`
    }

    if (height) {
        //style.flex = `0 0 ${height}px`
        style.height = `${height}px`
    }

    if (type) {
        img = type
    }

    //搜索无结果 noSearch
    //无客户 noCustomers
    //无内容 noContent 默认值
    //无网络 //无网络
    //无文件 noDocoments
    //无消息 noMessage
    //无账套 noAccountWarp
    //系统维护中 systemMaintenance

    let src = require(`../../assets/img/${img}.png`)

    return (
        <div className={className} style={style}>
            <img className="mk-nodata-img" src={src} />
            <span className="mk-nodata-message">{children}</span>
        </div>
    )
}