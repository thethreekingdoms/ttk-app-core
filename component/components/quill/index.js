import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types';
import { Link } from './Component/Link/index.js';
import htmlToDraft from 'html-to-draftjs';

class CustomOption extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		isStatic: true
	};

	clear = () => {
		const { onChange } = this.props;
		onChange(EditorState.createEmpty());
	};

	render() {
		return (
			<div className={'quillContentClear'} onClick={this.clear}>清空</div>
		);
	}
}

export default class Quill extends Component {
	constructor(props) {
		super(props);
		let store = {
			editorState: EditorState.createEmpty(),
			isStatic: true
		};
		if (props.dataState) {
			const blocksFromHtml = htmlToDraft(props.dataState);
			const { contentBlocks, entityMap } = blocksFromHtml;
			const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
			const editorState = EditorState.createWithContent(contentState);
			store.editorState = editorState
		}
		this.state = store;
		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}
	
	componentWillReceiveProps (newProps) {
		if (newProps.dataState && this.state.isStatic) {
			let store = {
				editorState: EditorState.createEmpty()
			};
			const blocksFromHtml = htmlToDraft(newProps.dataState);
			const { contentBlocks, entityMap } = blocksFromHtml;
			const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
			const editorState = EditorState.createWithContent(contentState);
			store.editorState = editorState
			this.setState({
				editorState,
				isStatic: false
			});
		}
	}

	onEditorStateChange(editorState) {
		this.setState({
			editorState
		});
		this.props.onChange && this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};

	render() {
		const { editorState } = this.state;
		const options = ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'embedded', 'emoji', 'image', 'remove', 'history'];
		return (
			<Editor
				editorState={editorState}
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				toolbar={{ options: options }}
				toolbarCustomButtons={[<CustomOption/>, <Link title={true}/>, <Link title={false}/>]}
				onEditorStateChange={this.onEditorStateChange}
			/>
		);
	}
}
// import React from 'react';
// import 'quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// export default class Quill extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = { text: '' } // You can also pass a Quill Delta here
// 		this.handleChange = this.handleChange.bind(this)
// 	}
//
// 	handleChange(value) {
// 		this.setState({ text: value })
// 		// console.log('鼠标',value)
// 		this.props.onChange && this.props.onChange(value)
// 	}
//
// 	render() {
// 		return (
// 			<ReactQuill value={this.state.text}
// 			            onChange={this.handleChange} />
// 		)
// 	}
// }