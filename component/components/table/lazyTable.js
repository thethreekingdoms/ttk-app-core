import React from 'react'
import { Table } from 'antd'
import ReactDOM from 'react-dom'

export default class TableLarge extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: 0,
            rowHeight: props.rowHeight || 36.8,
            showRows: props.showRows || 20,
            scorllY: props.scroll && props.scroll.y || 300
        }
    }

    componentDidMount = () => {
        const me = ReactDOM.findDOMNode(this)
        const dom =  me.querySelector('.ant-table-body')
        dom.addEventListener('scroll', (e) => {
            const tr = me.querySelector('.ant-table-body table .lazy_table_last')
            const top = me.querySelector('.ant-table-body').scrollTop
            if( !tr ) {
                
                const height = me.querySelector('.ant-table-body table').offsetHeight
                const { scorllY,  scrollTop, rowHeight } = this.state
                if( Math.abs(scrollTop - top) < rowHeight ) return
            }
            this.setState({
                scrollTop: top
            })
        }, false)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            rowHeight: nextProps.rowHeight || 36.8,
            showRows: nextProps.showRows || 20,
            scorllY: nextProps.scroll && nextProps.scroll.y || 300
        })
    }

    getDataSource = (data) => {
        if(!data){
            return []
        }
        const me = ReactDOM.findDOMNode(this)
        const { scrollTop, rowHeight, showRows, scorllY } = this.state,
            lens = data.length,
            sumHeight = rowHeight * lens,
            dataHeight = showRows * rowHeight,
            polyFillHeight = (dataHeight - scorllY)/2
        
        let firstHeight = 0, lastHeight = 0
        if( scrollTop <=polyFillHeight ) {
            lastHeight = sumHeight - dataHeight
        }else {
            firstHeight = scrollTop - polyFillHeight
            lastHeight = sumHeight - firstHeight -  dataHeight
        }
        let data2 = JSON.parse(JSON.stringify(data))
        const dataStart = Math.floor(firstHeight/rowHeight)
        this.dataStart = dataStart
        this.lastHeight = lastHeight
        const dataEnd = dataStart + showRows
        data2 = data2.slice(dataStart, dataEnd)
        if( firstHeight > 0 ) {
            data2.unshift({
                name: 'first',
                height: firstHeight
            })
        }
        if( lastHeight > 0 ) {
            data2.push({
                name: 'last',
                height: lastHeight
            })
        }
        return data2
    }

    onRow = (record, index) => {
        let style = {}
        if( record.height ){
            style.height = record.height + 'px'
        }
        return {
            className:  record.height ? `lazy_table_tr lazy_table_${record.name}` : null,
            style,
            key: Math.random()
        }
    }

    renderColumns = (data) => {
        let count = 0
        if( this.dataStart == 0 ) {
            count = 0
        }else {
            count = this.dataStart - 1
        }
        return data.map(item => {
            return {
                ...item,
                render: (text, record, index) => {
                    return item.render(text, record, index + count)
                }
            }
        })
    }

    render(){
        const { scorllY } = this.state
        return (
            <Table
                {...this.props}
                onRow={this.onRow} 
                scroll={{ y: scorllY }} 
                pagination={false} 
                dataSource={this.getDataSource(this.props.dataSource)} 
                columns={ this.renderColumns(this.props.columns)} 
            />
        )
    }
}