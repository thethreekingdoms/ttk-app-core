import React from 'react'
import { Table } from 'antd'
import List from 'react-infinite'
import './TableLarge.less'

const data = []

while( data.length < 50000){
    data.push({
        name: data.length,
        age: `年龄${data.length}`,
        weight: `体重${data.length}`
    })
}


export default class TableLarge extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: 0,
            rowHeight: 50,
            showRows: 20,
            scorllY: 300
        }
    }


    componentDidMount = () => {
        const dom =  document.querySelector('.ant-table-body')
        dom.addEventListener('scroll', (e) => {
            const top = document.querySelector('.ant-table-body').scrollTop
            this.setState({
                scrollTop: top
            })
        }, false)
    }

    getDataSource = (data) => {
        const { rowHeight, showRows, scorllY } = this.state
        const scrollTop = document.querySelector('.ant-table-body') ? document.querySelector('.ant-table-body').scrollTop : 0
        const lens = data.length
        const sumHeight = document.querySelector('.ant-table-body table') ? document.querySelector('.ant-table-body table').offsetHeight : rowHeight * lens
        const dataHeight = showRows * rowHeight
        const polyFillHeight = (dataHeight - scorllY)/2
        let firstHeight = 0
        let lastHeight = 0
        if( scrollTop <=polyFillHeight ) {
            lastHeight = sumHeight - dataHeight
        }else {
            firstHeight = scrollTop - polyFillHeight
            lastHeight = sumHeight - firstHeight -  dataHeight
        }
        // firstHeight = scrollTop
        // lastHeight = sumHeight - firstHeight -  dataHeight
        let data2 = JSON.parse(JSON.stringify(data))
        let dataStart = Math.floor(firstHeight/rowHeight)
        let dataEnd = dataStart + showRows
        data2 = data2.slice(dataStart, dataEnd)
        console.log(firstHeight)
        if( firstHeight > 0 ) {
            data2.unshift({
                name: 'first',
                age: 1,
                weight: 1,
                height: firstHeight
            })
        }
        if( lastHeight > 0 ) {
            data2.push({
                name: 'last',
                age: 1,
                weight: 1,
                height: lastHeight
            })
        }
        return data2
    }

    onRow = (record) => {
        let style = {}
        if( record.height ){
            style.height = record.height + 'px'
        }
        return {
            className: 'xiaowu',
            style,
            key: Math.random()
        }
    }

    render(){
        const { scorllY } = this.state
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        }, {
            title: '体重',
            dataIndex: 'weight',
            key: 'weight'
        }]
        return (
            <Table
                onRow={this.onRow} 
                scroll={{ y: scorllY }} 
                pagination={false} 
                dataSource={this.getDataSource(data)} 
                columns={columns} 
            />
        )
    }
}