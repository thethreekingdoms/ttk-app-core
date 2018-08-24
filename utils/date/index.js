import { parse } from "url";
import moment from 'moment'

function transformDate(str){
    let splitStr = null
    if( str.includes('-') ){
        splitStr = '-'
    }else if( str.includes('/') ){
        splitStr = '/'
    }
    const arr = str.split(splitStr)
    let arrNum = arr.map(item => {
        return parseFloat(item) > 9 ? item : `0${parseFloat(item)}`
    })
    return new Date(arrNum.join('-'))
}

function transformMomentDate(str){
    if( typeof(str) != 'string' ){
        console.log(str)
        console.log('不是一个字符串')
        return str
    }
    let splitStr = null
    if( str.includes('-') ){
        splitStr = '-'
    }else if( str.includes('/') ){
        splitStr = '/'
    }
    const arr = str.split(splitStr)
    let arrNum = arr.map(item => {
        return parseFloat(item) > 9 ? item : `0${parseFloat(item)}`
    })
    return moment(new Date(arrNum.join('-')))
}

//获取指定月份首末日
function monthStartEndDay(str){
	if(typeof(str) != 'string'){
		return '请输入格式化后的日期'
	}
	let date = {}
	date.startDay = moment(str).format("YYYY-MM")+'-01'
	date.endDay = moment(str).format("YYYY-MM") +'-'+ moment(str).daysInMonth()
	return date
}

export default {
    transformDate,
    transformMomentDate,
	monthStartEndDay
}
