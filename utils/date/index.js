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

export default {
    transformDate,
    transformMomentDate
}