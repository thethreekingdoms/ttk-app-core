import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

export default function localeWrapper(lang, child){
    return <LocaleProvider locale={zhCN}>{child}</LocaleProvider>
}