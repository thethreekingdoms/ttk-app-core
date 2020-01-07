import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { Input } from 'antd'
import utils from 'edf-utils'
import isequal from 'lodash.isequal'

export default class InputNumberComponent extends PureComponent {

    state = {
        oldValue: "",
        value: "",
        max: Infinity,
        min: -Infinity,
        format: "",
        interceptTab: false,
        regex: ""
    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.customAttribute) { //期初余额 自定义的一个属性 为了重置超过限制的数据为初始数据
            if (this.props.customAttribute !== nextProps.customAttribute) {
                this.setState(this.calculateState(nextProps))
            }
        }

        if (this.props.value !== nextProps.value) {
            this.setState(this.calculateState(nextProps))
        }

    }

    assitShouldComponent = (target) => {
        let obj = {}
        for (const [key, value] of Object.entries(target)) {
            if (typeof (value) != 'function') {
                obj[key] = value
            }
        }
        return obj
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(isequal(this.assitShouldComponent(this.props), this.assitShouldComponent(nextProps)) && isequal(this.state, nextState))
    }

    calculateState(props) {
        let data = {}

        if (props.value !== undefined) {
            data.value = props.value + '' || this.state.value
            data.oldValue = data.value
        }
        else {
            data.value = ''
            data.oldValue = data.value
        }

        if (props.min !== undefined && props.min !== null && props.min !== '' && !isNaN(props.min))
            data.min = props.min

        if (props.max !== undefined && props.max !== null && props.max !== '' && !isNaN(props.max))
            data.max = props.max

        if (props.format)
            data.format = props.format

        if (props.precision || props.precision == 0) {
            data.precision = props.precision || 0
        }

        if (props.interceptTab) {
            data.interceptTab = props.interceptTab
        }

        if (props.regex) {
            data.regex = props.regex
        } else {
            data.regex = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        }

        return data
    }

    getCurrentValidValue(value) {
        let val = value
        if (val === '') {
            return ''
        } else if (!this.isNotCompleteNumber(val)) {
            val = Number(val)
            if (val < this.state.min) {
                return this.state.min
            }

            if (val > this.state.max) {
                return this.state.max
            }
        } else {
            return this.state.value
        }
        return value
    }

    /**
     * 转换为数字
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    toNumber(num) {
        if (this.isNotCompleteNumber(num)) {
            return num
        }
        return Number(num)
    }

    /**
     * 判断是否非完整数字
     * @param  {[type]}  num [description]
     * @return {Boolean}     [description]
     */
    isNotCompleteNumber(num) {
        return (
            isNaN(num) ||
            num === '' ||
            num.toString().indexOf('.') === num.toString().length - 1
        )
    }

    /**
     * 根据精度转换值
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    toPrecisionAsStep(num) {

        //非完整数字直接返回, NaN,'',3444.
        if (this.isNotCompleteNumber(num) || num === '') {

            return num
        }

        //获取精度
        const precision = this.state.precision

        //精度非0的数字，转换
        if (precision) {
            return Number(num).toFixed(precision)
        }
        return num.toString()
    }

    /**
     * 获取最大精度
     * @param  {[type]} currentValue [description]
     * @return {[type]}              [description]
     */
    getMaxPrecision(currentValue) {
        const { step } = this.props
        let stepPrecision = this.getPrecision(currentValue)
        //存在step取step的精度，step的值例如0.0001
        if (step)
            stepPrecision = this.getPrecision(step)
        return stepPrecision
    }

    /**
     * 获取精度
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    getPrecision(value) {
        const valueString = value.toString()
        //取e-后字符转换成int,e-10=>10
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 1), 10)
        }

        let precision = 0;
        //取小数点后字符长度0.0001=>4
        if (valueString.indexOf('.') >= 0) {
            precision = valueString.length - valueString.indexOf('.') - 1
        }
        //否则0
        return precision
    }


    onChange(e) {
        let value
        if (e.target.validity) {
            value = (e.target.validity.valid) ? e.target.value : this.state.value
        } else {
            value = e.target.value
        }

        if (value.trim() == '-.') value = 0
        const regExp = this.getRegExp()
        let isFullAngle = value.match(/[\uff00-\uffff]/g)
        if (isFullAngle && isFullAngle.length > 0) {//全角输入法转换为半角输入法
            var tmp = "";
            for (var i = 0; i < value.length; i++) {
                if (value.charCodeAt(i) == 12288) {
                    tmp += String.fromCharCode(value.charCodeAt(i) - 12256);
                    continue;
                }
                if (value.charCodeAt(i) > 65280 && value.charCodeAt(i) < 65375) {
                    tmp += String.fromCharCode(value.charCodeAt(i) - 65248);
                }
                else {
                    tmp += String.fromCharCode(value.charCodeAt(i));
                }
            }
            value = tmp
        }
        // edge浏览器微软拼音输入法下，小数位数控制不住的问题处理
        if (value &&
            value.toString().length > 1 &&
            value.toString().substr(value.toString().length - 1, 1) != '.' &&
            value.toString().substr(value.toString().length - 1, 1) != '-' &&
            !regExp.test(utils.number.clearThousPos(value, true))) {

            if (e.preventDefault)
                e.preventDefault()
            if (e.stopPropagation)
                e.stopPropagation()

            return
        }        
        //当为小数正则表达式时，不进行小数点正则检查
        if (regExp.test('0.0') && e.target.value && e.target.value != '' && (e.target.value.indexOf('.') > -1 || e.target.value.indexOf('-') > -1)) {
            if (typeof this.props.maxValue == 'number' && !isNaN(Number(value)) && this.props.maxValue < Number(value)) {
                value = this.props.maxValue
            }
            if (this.props.maxValue == 0 && !isNaN(Number(value)) && 0 < Number(value)) {
                value = 0
            }
            if (typeof this.props.maxValue == 'number' && !isNaN(Number(value)) && this.props.minValue > Number(value)) {
                value = this.props.minValue
            }
            if (this.props.minValue == 0 && !isNaN(Number(value)) && 0 > Number(value)) {
                value = 0
            }
            let targetValue = e.target.value           
            if (targetValue.toString().length > 1 && targetValue.toString().substr(targetValue.toString().length - 1, 1) == '-') {//解决微软拼音下录入负数的情况，需要把负数提前
                const num = targetValue.split('-').length - 1
                let isMinu = num % 2 == 0 ? true : false  //偶数true
                if (isMinu) {
                    targetValue = `${targetValue.replace(/-/g, '')}`
                } else {
                    targetValue = `-${targetValue.replace(/-/g, '')}`
                }               
                this.setState({ value: targetValue })
            } else {                
                this.setState({ value })
            }

            if (this.props.timeout) {
                let keyRandom = Math.floor(Math.random() * 10000000)
                this.keyRandom = keyRandom

                clearTimeout(this.time)

                this.time = setTimeout(() => {
                    if (keyRandom == this.keyRandom) {
                        this.state.oldValue != value && this.props.onChange && this.props.onChange(value)
                    }
                }, 100)
            } else {
                this.state.oldValue != value && this.props.onChange && this.props.onChange(value)
            }

        }

        //是数字或者是空或者是-
        if ((!isNaN(utils.number.clearThousPos(value, true)) && regExp.test(utils.number.clearThousPos(value))) || value === '' || value === '-' || value == '=') {
            if (typeof this.props.maxValue == 'number' && !isNaN(Number(value)) && this.props.maxValue < Number(value)) {
                value = this.props.maxValue
            }
            if (this.props.maxValue == 0 && !isNaN(Number(value)) && 0 < Number(value)) {
                value = 0
            }
            if (typeof this.props.maxValue == 'number' && !isNaN(Number(value)) && this.props.minValue > Number(value)) {
                value = this.props.minValue
            }
            if (this.props.minValue == 0 && !isNaN(Number(value)) && 0 > Number(value)) {
                value = 0
            }
            this.setState({ value })
            if (this.props.timeout) {
                let keyRandom = Math.floor(Math.random() * 10000000)
                this.keyRandom = keyRandom
                clearTimeout(this.time)
                this.time = setTimeout(() => {
                    if (keyRandom == this.keyRandom) {
                        this.state.oldValue != value && this.props.onChange && this.props.onChange(value)
                    }
                }, 100)
            } else {
                this.state.oldValue != value && this.props.onChange && this.props.onChange(value)
            }

        }
    }

    getStep(str) {
        let strAfterPoint = (str + '').split('.')[1]
        return strAfterPoint && strAfterPoint.length ? strAfterPoint.length : 0
    }

    onBlur() {
        let value = this.state.value
        if (value && typeof (value) === 'number') {
            value = `${value}`
        }        
        //最后一个字符是.或者-那么去掉
        if (value && (value.charAt(value.length - 1) === '.' || value === '-')) {
            value = value.slice(0, -1)
            value = this.getCurrentValidValue(value)
            this.setState({ value: value + '' })
            this.state.oldValue != value && this.props.onChange && this.props.onChange(this.toNumber(this.toPrecisionAsStep(value)), this.toNumber(this.toPrecisionAsStep(this.state.oldValue)))
        }
        if (value == '' && this.props.nullToZero) {
            value = 0
        }
        if (this.props.executeBlur) {
            /**
             * 业务，填制凭证金额由于ONCHANGE事件，导致oldvalue与value永远相等，onblur事件一直执行
             */
            this.props.onBlur && this.props.onBlur(this.toNumber(this.toPrecisionAsStep(value)))
        }
        else {
            this.state.oldValue != value && this.props.onBlur && this.props.onBlur(this.toNumber(this.toPrecisionAsStep(value)))
        }
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode == 13 || e.keyCode == 108 || e.keyCode == 9) {  //e.keyCode == 9  不支持tab键,因为如果阻止了事件外抛,select的选择项键盘选中无法生效
            if (this.props.onEndEdit) {
                this.props.onEndEdit()
                if (this.props.interceptTab) {
                    if (e.keyCode == 9) {
                        if (e.preventDefault)
                            e.preventDefault()
                        if (e.stopPropagation)
                            e.stopPropagation()
                    }
                }
                return
            }
        }
        //空格和等号,这两个对于凭证有特殊含义的快捷键
        if (e.key === ' ' || e.keyCode == 32 || e.key === '=' || e.keyCode == 187 ||
            (e.target.value && (e.key === '-' || e.keyCode == 189 || e.keyCode == 109)) ||
            (e.key === 'Process' && e.keyCode === 229)
        ) {
            // 解决微软拼音中文状态下无法录入金额的问题
            if (e.key === 'Process' && e.keyCode === 229) {              
                if (e.preventDefault)
                    e.preventDefault()
                if (e.stopPropagation)
                    e.stopPropagation()
                return
            } else {

                if (this.props.onShortcutKey) {
                    this.props.onShortcutKey(e)
                    if (e.preventDefault)
                        e.preventDefault()
                    if (e.stopPropagation)
                        e.stopPropagation()
                    return
                }
            }
        }
        if (e.type !== 'keydown' ||
            e.keyCode == 8 ||
            e.keyCode == 46 ||
            e.keyCode == 27 ||
            e.keyCode == 9 ||
            e.keyCode == 37 ||
            e.keyCode == 39 ||
            e.keyCode == 38 ||
            e.keyCode == 40 ||
            e.key === 'Enter' ||
            e.keyCode == 13 ||
            e.keyCode == 108 ||
            (e.ctrlKey)) {

            //this.props.onEventKeyDown && this.props.onEventKeyDown(e)
            //this.props.onKeyDown && this.props.onKeyDown(e)
            return
        }

        // 获取光标当前位置
        let cursorPosition = this.getCursorPosition(e.target)

        let regExp = this.getRegExp()
        //IE 、IE8兼容处理

        let selectedText = this.getSelection(),
            checkText, keyCode

        //Chrome中小数点的ascii码是110（小键盘）、190（大键盘）
        if (e.keyCode == 46 || e.keyCode == 110 || e.keyCode == 190) {

            // keyCode = 46
            //当为小数正则表达式时，不进行小数点正则检查
            if (regExp.test('0.0') && e.target.value && e.target.value.indexOf('.') == -1) {
                console.log('e.key:   ' + e.key)
                return
            }
            //109：小键盘负号的keyCode 189:大键盘负号的keyCode
        } else if (e.keyCode == 189 || e.keyCode == 109) {
            keyCode = 45

            //当为负数正则表达式时，不进行负号正则检查
            if (regExp.test('-1') && !e.target.value) {
                return
            }
        } else {
            keyCode = e.keyCode
        }

        let stateValue = this.state.value.toString()
        if (selectedText != '') {
            stateValue = stateValue.replace(selectedText, '')
        }

        //将输入的字符插入数字串中
        if (stateValue.length == cursorPosition) {
            if (regExp.test('-1')) { //为了解决edge和ie下，值有负号不能全选修改的问题
                stateValue = stateValue.replace(/-/g, '')
            }

            checkText = stateValue + this.stringFromCharCode(keyCode)
        } else if (cursorPosition == 0) {
            if (regExp.test('-1')) {//为了解决edge和ie下，值有负号不能全选修改的问题
                stateValue = stateValue.replace(/-/g, '')
            }

            checkText = this.stringFromCharCode(keyCode) + stateValue
        } else {
            if (regExp.test('-1')) {//为了解决edge和ie下，值有负号不能全选修改的问题
                stateValue = stateValue.replace(/-/g, '')
            }

            checkText = stateValue.substring(0, cursorPosition) +
                this.stringFromCharCode(keyCode) +
                stateValue.substring(cursorPosition)

        }

        //去掉输入值中的逗号
        if (checkText) {
            if (checkText.indexOf(',') > -1) {
                checkText = checkText.replace(/,/g, '')
            }
        }

        // if (!regExp.test(checkText)) {
        //     if (e.preventDefault)
        //         e.preventDefault()
        //     if (e.stopPropagation)
        //         e.stopPropagation()
        //     return
        // }

        if (regExp.test('-1')) {
            // 为了解决 360浏览器和谷歌浏览器输入负号无法输入的情况
            if (checkText != '-' && !regExp.test(checkText)) {
                if (e.preventDefault)
                    e.preventDefault()
                if (e.stopPropagation)
                    e.stopPropagation()
                return
            }
        } else {
            if (!regExp.test(checkText)) {
                if (e.preventDefault)
                    e.preventDefault()
                if (e.stopPropagation)
                    e.stopPropagation()
                return
            }
        }
    }
    getCursorPosition = (target) => {
        var oTxt1 = target;
        var cursorPosition = -1;
        if (oTxt1.selectionStart != undefined) {//非IE浏览器
            cursorPosition = oTxt1.selectionStart;
        } else {//IE
            var range = document.selection.createRange();
            range.moveStart("character", -oTxt1.value.length);
            cursorPosition = range.text.length;
        }
        return cursorPosition
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

    getRegExp() {
        let regExp
        if (this.props.regex) {
            regExp = new RegExp(this.props.regex)
        } else {
            if (this.props.precision) {
                regExp = new RegExp("^(-?[0-9]+)(?:\\.[0-9]{1," + this.props.precision + "})?$")
            } else if (this.props.precision == 0) {
                regExp = new RegExp(/^(-?[0-9]+)?$/)
            } else {
                regExp = new RegExp(/^(-?[0-9]+)(?:\.[0-9]{1,12})?$/)
            }
        }

        return regExp
    }

    handleKeyUp(e) {
        let repValue = e.target.value
        //[\u4e00-\u9fa5] 中文正则表达式  将中文替换为空，实现Input无法输入中文的功能
        if (e.target.value.indexOf('.') != -1) {
            repValue = e.target.value.replace('。', '')
        }
        repValue = repValue.replace(/[\u4e00-\u9fa5]/g, '')
        //录入了字母+中文时，字母会被录入
        let regExp = this.getRegExp()
        //若regex为小数正则，则忽略小数点.
        if ((regExp.test('0.0') && e.target.value &&
            e.target.value.indexOf(".") == 0 &&
            e.target.value != '-.') ||
            (regExp.test('-1') && e.target.value == '-') ||
            (e.target.value != '-.')) {

            if (!regExp.test(e.target.value)) {
                if (e.preventDefault)
                    e.preventDefault()
                if (e.stopPropagation)
                    e.stopPropagation()
                return
            }
        } else {
            if (!regExp.test(repValue)) {
                repValue = ''
            }
        }  
        this.setState({ value: repValue })
        this.props.onKeyUp && this.props.onKeyUp(e)
    }

    stringFromCharCode = (keyCode) => {
        let ret = ''
        if (keyCode == 96) {
            ret = '0'
        } else if (keyCode == 97) {
            ret = '1'
        } else if (keyCode == 98) {
            ret = '2'
        } else if (keyCode == 99) {
            ret = '3'
        } else if (keyCode == 100) {
            ret = '4'
        } else if (keyCode == 101) {
            ret = '5'
        } else if (keyCode == 102) {
            ret = '6'
        } else if (keyCode == 103) {
            ret = '7'
        } else if (keyCode == 104) {
            ret = '8'
        } else if (keyCode == 105) {
            ret = '9'
        } else {
            ret = String.fromCharCode(keyCode)
        }

        return ret
    }

    handleFocus = (e) => {
        //获取事件对象 兼容IE8
        const eve = e || window
        ////获取document 对象的引用 兼容IE8
        const objEle = eve.target || eve.srcElement
        objEle.focus()

        let keyRandom = Math.floor(Math.random() * 10000000)
        this.keyRandom = keyRandom
        clearTimeout(this.time)
        this.time = setTimeout(() => {
            if (keyRandom == this.keyRandom) {
                if (document.activeElement && typeof document.activeElement.select == 'function') {
                    document.activeElement.select()
                } else {
                    objEle.select()
                }
            }
        }, 10)
        this.props.onFocus && this.props.onFocus(e)
    }


    render() {
        let className = classNames({
            'mk-input-number': true,
            [this.props.className]: !!this.props.className
        })
        return (
            <Input
                {...this.props}
                autocomplete='off'
                ref='internal'
                className={className}
                onChange={:: this.onChange}
    onKeyDown = {:: this.onKeyDown }
    onKeyUp = {:: this.handleKeyUp }
    onFocus = {:: this.handleFocus }
    value = { this.state.value }
    onBlur = {:: this.onBlur }
        />
        )
}
}
