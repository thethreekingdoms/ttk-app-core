import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import isequal from 'lodash.isequal'
import Popover from '../popover'
import Icon from '../icon'
import Layout from '../layout'
import DataGrid from '../datagrid'
import Upload from '../upload'
import NoData from '../nodata'
import Spin from '../spin'
import Viewer from 'react-viewer'
import classNames from 'classnames'
const Column = DataGrid.Column
const Cell = DataGrid.Cell

export default class attachmentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            activeIndex: 0,
            contentIsVisible: props.visible,
            fileList: []
        }
    }

    assitShouldComponent = (target) => {
        let obj = {}
        for( const [key, value] of Object.entries(target) ) {
            if( typeof(value) != 'function' ) {
                obj[key] = value
            }
        }
        return obj
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log((isequal(this.props, nextProps) && isequal(this.state, nextState)))
        return !(isequal(this.assitShouldComponent(this.props), this.assitShouldComponent(nextProps)) && isequal(this.state, nextState))
    }
    contentVisibleChange = (visible) => {
        if (this.state.isOpen)
            return

        this.setState({ contentIsVisible: visible })
    }
    ComponentWillUpdate = () => {

    }
    download = (index) => () => {
        this.props.onDownload && this.props.onDownload(this.props.data[index])
    }

    del = (index) => () => {
        // this.setState({ contentIsVisible: true })
        this.props.onDel && this.props.onDel(this.props.data[index])
    }

    getContent = () => {
        const className = classNames({
            'mk-attachment-content': true,
            [this.props.contentClassName]: !!this.props.contentClassName
        })
        const data = this.props.data || []
        const status = this.props.status
        if (data && data.length == 0 && this.props.status != 1) {
            return (
                <div className={className + ' upload-content'}>
                    <Spin spinning={this.props.loading != undefined ? this.props.loading : false} tip='加载中...'>
                        <NoData type='noDocoments' small>
                            <span>亲，还没有文件，赶快上传呦</span>
                        </NoData>
                    </Spin>
                </div>
            )
        }
        const columns = [
            <Column
                columnKey='link'
                flexGrow={1}
                cell={(ps) => {
                    let iconComponent
                    switch (data[ps.rowIndex].type || (data[ps.rowIndex].file&&data[ps.rowIndex].file.type)) {
                        case 1000010001:
                            iconComponent = (<Icon type="tupian" className="picture" fontFamily="edficon" style={{color:'#8080F3'}}/>)
                            break;
                        case 1000010002:
                            iconComponent = (<Icon type="word" className="picture" fontFamily="edficon" style={{color:'#52C4FF'}}/>)
                            break;
                        case 1000010003:
                            iconComponent = (<Icon type="Excel" className="picture" fontFamily="edficon" style={{color:'#FF7739'}}/>)
                            break;
                        case 1000010004:
                            iconComponent = (<Icon type="ppt" className="picture" fontFamily="edficon" style={{color:'#4591FF'}}/>)
                            break;
                        case 1000010005:
                            iconComponent = (<Icon type="pdf" className="picture" fontFamily="edficon" style={{color:'#36CEAB'}}/>)
                            break;
                        case 1000010006:
                            iconComponent = (<Icon type="yasuobao" className="picture" fontFamily="edficon" style={{color:'#F9A022'}}/>)
                            break;
                        default:
                            break;
                    }
                    // console.log(data[ps.rowIndex], 'data[ps.rowIndex]')
                    return (

                        (data[ps.rowIndex].type || (data[ps.rowIndex].file&&data[ps.rowIndex].file.type)) == 1000010001 ?
                        <Popover
                            content={this.getThumbnail(data[ps.rowIndex])}
                            arrowPointAtCenter={true}
                            placement='leftTop'
                        >
                            <Cell className='mk-attachment-content-link-cell'>
                                <a>
                                    {iconComponent}
                                </a>
                                {data[ps.rowIndex].type == 1000010001 || (data[ps.rowIndex].file&&data[ps.rowIndex].file.type == 1000010001) ? 
                                <a className="attachmentName"
                                onClick={(e) => 
                                    this.openViewer(ps.rowIndex, e)} 
                                title={data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}>
                                {data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}
                                </a> : 
                                <span title={data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}>
                                {data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}</span>}
                            </Cell>
                        </Popover> : 
                            <div>
                                <Cell className='mk-attachment-content-link-cell'>
                                    <a>
                                        {iconComponent}
                                    </a>
                                    {data[ps.rowIndex].type == 1000010001 || (data[ps.rowIndex].file && data[ps.rowIndex].file.type == 1000010001) ?
                                        <a className="attachmentName"
                                            onClick={(e) =>
                                                this.openViewer(ps.rowIndex, e)}
                                            title={data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}>
                                            {data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}
                                        </a> :
                                        <span title={data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}>
                                            {data[ps.rowIndex].name || data[ps.rowIndex].alt || data[ps.rowIndex].file.originalName}</span>}
                                </Cell>
                            </div>
                    )
                }}
                width={100}
            />,
            <Column
                columnKey='option'
                cell={(ps) => (
                    <Cell>
                        <a href={ps.accessUrl} download={ps.name} onClick={this.download(ps.rowIndex)} type='download'><Icon className='download' fontFamily='edficon' title='下载' type='xiazai' /></a>
                        {this.props.status != 1 ? <a><Icon onClick={this.del(ps.rowIndex)} fontFamily='edficon' type='shanchu' title='删除' className="del" /></a> : null}
                    </Cell>
                )}
                width={70}
            />
        ]

        let loading = {
            spinning: this.props.loading != undefined ? this.props.loading : false,
            tip: '加载中...',
            size: 'default'
        }
        return (
            <div className={className}>
                <DataGrid
                    rowsCount={data ? data.length : 0}
                    rowHeight={36}
                    columns={columns}
                    isFix
                    height={210}
                    loading={loading}
                    width={250}
                />
                {/*<Layout className='mk-attachment-content-footer'>
                    <Upload
                        showUploadList={false}
                        {...this.props.uploadProps}
                    >
                        <a href="#">
                            上传<Icon type='upload' />
                        </a>
                    </Upload>
                </Layout>*/}
            </div>
        )
    }

    getTitle = () => {
        return (
            <div className="attachment-title">
                <span>附件列表</span>
                {
                    this.props.status != 1 ?
                        <Upload
                            showUploadList={false}
                            {...this.props.uploadProps}
                        >
                            <span className="upload">
                                <Icon className="upload-icon" fontFamily="edficon" type="xinzengkemu" style={{ fontSize: '25px', verticalAlign: 'bottom' }} />添加
						 </span>
                        </Upload> : null
                }
            </div>
        )
    }

    getThumbnail = (detail) => {
        if (detail.type != 1000010001) return (<div></div>)
        return (<div style={{ width: 300, height: 300 }}>
            <img height={300} width={300} src={detail.accessUrl} />
        </div>)
    }

    render() {
        const className = classNames({
            'mk-attachment': true,
            [this.props.className]: !!this.props.className
        })

        return (
            <Popover
                overlayClassName='mk-attachment-popover attachment'
                content={this.getContent()}
                // placement="bottomRight"
                onVisibleChange={this.contentVisibleChange}
                // visible={this.state.contentIsVisible || this.props.visible}
                title={this.getTitle()}
                trigger='click'
            >
                <span {...this.props} className={className}>
                    <Icon style={{ fontSize: '22px', verticalAlign: 'middle' }} fontFamily="edficon" type="fujian" />
                    <span style={{ display: 'inline-block', height: '24px', lineHeight: '24px', verticalAlign: 'middle' }}>附件</span>
                </span>
                {this.renderViewer(this.props.data)}
            </Popover>
        )
    }

    openViewer = (index, event) => {
        this.setState({
            isOpen: true,
            activeIndex: index
        })
    }

    closeViewer = () => {
        this.setState({
            isOpen: false,
        })
    }

    renderViewer(data) {
        if (!data) return null
        if (data.length == 0) return null
        let newData = []
        if (data instanceof Array) {
            data.forEach(item => {
                if(item.type == 1000010001){
                    newData.push({ src: item.accessUrl, alt: item.alt })
                }
            })
        }
        const activeIndex = newData.findIndex(item => {
            return item.src == data[this.state.activeIndex].accessUrl
        })
        return (
            <Viewer
                images={newData}
                visible={this.state.isOpen}
                activeIndex={activeIndex}
                container={null}
                onClose={this.closeViewer}
            />
        )
    }
}
