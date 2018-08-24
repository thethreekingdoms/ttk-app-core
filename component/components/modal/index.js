import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Modal, LocaleProvider } from 'antd'
import info from './info'
import error from './error'
import success from './success'
import warning from './warning'
import confirm from './confirm'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import classNames from 'classnames'
import Drag from '../drag/index'

class DragTitle extends Component {
	updateTransform = transformStr => {
		this.modalDom.style.transform = transformStr;
	};
	componentDidMount() {
		this.modalDom = document.getElementsByClassName(
			"ant-modal" //modal的class是ant-modal
		)[0];
	}
	render() {
		const title = this.props.title
		return (
			<Drag updateTransform={this.updateTransform}>
				<div>{title}</div>
			</Drag>
		)
	}
}


class ModalComponent extends Component {
	state = {
		confirmLoading: false
	}

	setOkListener = (cb) => {
		this.setState({ okListener: cb })
	}

	setCancelListener = (cb) => {
		this.setState({ cancelListener: cb })
	}


	handleOk = async () => {
		this.setState({ confirmLoading: true })
		let listener = this.state.okListener, ret
		if (listener) {
			ret = await listener()
			this.setState({ confirmLoading: false })
			if (ret === false) {
				return
			}
		}
		this.props.onOk && this.props.onOk(ret)

	}

	handleCancel = async () => {
		let listener = this.state.cancelListener, ret

		if (listener) {
			ret = await listener()
			if (ret === false) {
				return
			}
		}

		this.props.onCancel && this.props.onCancel(ret)
	}

	render() {
		var { children, title, allowDrag, ...otherProps } = this.props
		var { confirmLoading } = this.state
		children = React.cloneElement(children, {
			setOkListener: this.setOkListener,
			setCancelLister: this.setCancelListener,
			closeModal: this.props.closeModal
		})
		let className = classNames({
			'mk-modal': true
		})
		
		allowDrag = allowDrag === false ? false : true

		if (allowDrag) {
			title = (
				<DragTitle title={title} />
			)
		}

		return (
			<LocaleProvider locale={zhCN}>
				<Modal
					visible={true}
					title={title}
					confirmLoading={confirmLoading}
					className={className}
					{...otherProps}
					children={children}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				/>
			</LocaleProvider>
		)
	}
}

ModalComponent.newInstance = (props) => {

	return {
		show(properties) {
			const div = document.createElement('div')
			return new Promise((resolve, reject) => {
				let handleCancel = (ret) => {
					ReactDOM.unmountComponentAtNode(div)
					try {
						document.body.removeChild(div)
					}
					catch (err) { }
					resolve(ret || false)
				}

				let handleOk = (ret) => {
					ReactDOM.unmountComponentAtNode(div)
					try {
						document.body.removeChild(div)
					}
					catch (err) { }
					resolve(ret || true)
				}

				const closeModal = (res) => {
					ReactDOM.unmountComponentAtNode(div)
					try {
						document.body.removeChild(div)
					}
					catch (err) { }
					resolve(res || true)
					return res
				}
				const title = (
					<DragTitle title="Basic Modal" />
				)

				const props = properties || {}
				if (props.closeBack) {
					props.closeBack(closeModal)
				}
				props.cancelText = props.cancelText || '取消'
				props.okText = props.okText || '确定'
				document.body.appendChild(div)

				ReactDOM.render(
					<ModalComponent
						visible
						closeModal={closeModal}
						maskClosable={false}
						{...props}
						onCancel={handleCancel}
						onOk={handleOk} />
					, div)

			})
		}
	}
}



let m = window.__Modal

if (!m) {
	m = ModalComponent.newInstance()
	window.__Modal = m
}

m.info = info
m.success = success
m.error = error
m.warning = warning
m.confirm = confirm

export default m