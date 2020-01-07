import React from 'react'
import { Input} from 'antd'
import classNames from 'classnames'
import InputNumber from './inputNumber'
const AntNumber = InputNumber
class InputComponent extends React.Component {
  state = {
      regex: "",  //录入规则   内容为正则表达式
      value: ""
  }

	constructor(props) {
		super(props)
		this.state = { value: props.value }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.value })
	}

  handleKeyDown(e) {
  //e.keyCode  8:Backspace  46:Delete 27:Esc 9:Tab 37:Left 39:Right 保持Backspace键和Delete键可用
      if (e.type !== 'keydown' ||
          e.keyCode == 8 ||
          e.keyCode == 46 ||
          e.keyCode == 27 ||
          e.keyCode == 9 ||
          e.keyCode == 37 ||
          e.keyCode == 39) {
          return
      }

      //进行正则判断
      if (this.props.regex) {
          //支持Ctrl+C、Ctrl+V粘贴功能
          if(e.ctrlKey || e.keyCode == '86' || e.keyCode == '229'){
              return
          }
          // 获取光标当前位置
          let cursorPosition = this.getCursorPosition(e.target)
          let regExp = new RegExp(this.props.regex)///^[A-Za-z0-9]+$/)

          let selectedText = this.getSelection()//window.getSelection().toString(),
              checkText,keyCode

          //Chrome中小数点的ascii码是110（小键盘）、190（大键盘）
          if(e.keyCode == 46 || e.keyCode == 110 || e.keyCode == 190){
              keyCode = 46
              //当为小数正则表达式时，不进行小数点正则检查
              if(regExp.test('0.0') && e.target.value && e.target.value.indexOf('.') == -1){
                return
              }
          //189:负号(-)  109:小键盘的负号(-)
          }else if(e.keyCode == 189 || e.keyCode == 109){
              // if(!regExp.test(checkText)){
              //   if (e.preventDefault)
              //       e.preventDefault()
              //   if (e.stopPropagation)
              //       e.stopPropagation()
              //   return
              // }
              keyCode = 45

              //当为负数正则表达式时，不进行负号正则检查
              if(regExp.test('-1') && cursorPosition == 0 && e.target.value.indexOf('-') == -1){
                return
              }
          }else{
              keyCode = e.keyCode
          }

          let stateValue = this.state.value && this.state.value.toString()
          if(selectedText != ''){
              stateValue = stateValue.replace(selectedText, '')
          }

          //将输入的字符插入数字串中
          if(!stateValue) stateValue =''

          if(stateValue.length == cursorPosition){
              checkText = stateValue + this.stringFromCharCode(keyCode)
          }else if(cursorPosition == 0){
              checkText = this.stringFromCharCode(keyCode) + stateValue
          }else{
              checkText = stateValue.substring(0, cursorPosition) +
                  this.stringFromCharCode(keyCode) +
                  stateValue.substring(cursorPosition)
          }

          if(!regExp.test(this.clearThousandsPosition(checkText))){
            if (e.preventDefault)
                e.preventDefault()
            if (e.stopPropagation)
                e.stopPropagation()
            return
          }
      }
      this.props.onKeyDown && this.props.onKeyDown(e)
  }
    /**
         * IE：document.selection 　　
         * FireFox：window.getSelection() 
         * window.getSelection()也只有FireFox和Safari支持 selection   对象
         */
    getSelection = () => {
        if (window.getSelection) {
            return window.getSelection().toString()
        }
        else if (document.getSelection) {
            return document.getSelection().toString()

        } else if (document.selection) {
            return document.selection.createRange().text
        }
    }
  stringFromCharCode(keyCode){
      let ret = ''
      if(keyCode == 96){
          ret = '0'
      }else if(keyCode == 97){
          ret = '1'
      }else if(keyCode == 98){
          ret = '2'
      }else if(keyCode == 99){
          ret = '3'
      }else if(keyCode == 100){
          ret = '4'
      }else if(keyCode == 101){
          ret = '5'
      }else if(keyCode == 102){
          ret = '6'
      }else if(keyCode == 103){
          ret = '7'
      }else if(keyCode == 104){
          ret = '8'
      }else if(keyCode == 105){
          ret = '9'
      }else{
          ret = String.fromCharCode(keyCode)
      }

      return ret
  }

  //去除千分位
  clearThousandsPosition(num)
  {
      let ret

      if(num && num.toString().indexOf(',') > -1){
          ret = num.toString().replace(/,/g,"")
      }else{
          ret = num
      }

      return ret
  }

  getCursorPosition(target){
      var oTxt1 = target;
      var cursorPosition=-1;
      if(oTxt1.selectionStart != undefined){//非IE浏览器
          cursorPosition= oTxt1.selectionStart;
      }else{//IE
          var range = document.selection.createRange();
          range.moveStart("character",-oTxt1.value.length);
          cursorPosition=range.text.length;
      }

      return cursorPosition
  }

  handleKeyUp(e){
    let repValue=e.target.value
    if (this.props.regex) {
      //[\u4e00-\u9fa5] 中文正则表达式  将中文替换为空，实现Input无法输入中文的功能
      repValue =e.target.value.replace(/[\u4e00-\u9fa5]/g,'')

      //录入了字母+中文时，字母会被录入
      let regExp = new RegExp(this.props.regex)
      //若regex为小数正则，则忽略小数点.
      if((regExp.test('0.0') && e.target.value &&
          e.target.value.indexOf(".") == 0 &&
          e.target.value != '-.') ||
         (regExp.test('-1') && e.target.value == '-') ||
         (e.target.value != '-.')){

      }else{
          if(!regExp.test(repValue)){
            repValue = ''
          }
      }
    }

    this.setState({value: repValue})
    this.props.onKeyUp && this.props.onKeyUp(e)
  }

	handleChange(e) {

        //const value = e.target.validity ? (e.target.validity.valid ? e.target.value : this.state.value) : e.target.value
        //IE9一下没有此属性
        let value
        if (e.target.validity) {
            value = (e.target.validity.valid) ? e.target.value : this.state.value
        } else {
            value = e.target.value
        }        
        this.setState({ value })
		this.props.onChange && this.props.onChange(e)
	}

	render() {
		let className = classNames({
			'mk-input': true,
			[this.props.className]: !!this.props.className
		})

		return (
			<Input
				{...this.props}
				value={this.state.value}
				className={className}
				onChange={::this.handleChange}
                onKeyUp={::this.handleKeyUp}
                onKeyDown={::this.handleKeyDown}
  			/>
  		)
  	}
}

InputComponent.Search = Input.Search
InputComponent.Group = Input.Group
InputComponent.Number = InputNumber
InputComponent.TextArea = Input.TextArea
InputComponent.AntNumber = AntNumber

export default InputComponent
