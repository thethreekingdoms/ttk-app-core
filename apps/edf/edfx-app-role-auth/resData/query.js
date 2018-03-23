import {getData} from './db'

function getData2(type){
    const { checked } = getData()
    let result = checked[type]
    if( !result ){
        return {
            result: false,
            message: '没有这个东东' 
        }
    }
    return result
}


function query(option){
    if( option&&option.roleId ){
        return {
            value: getData2(option.roleId),
            result: true
        }
    }else{
        return {
            result: false,
            message: '你是不是少传参数了'
        }
    }
    
}

export default query