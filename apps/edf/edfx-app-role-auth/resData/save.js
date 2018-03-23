import {getData} from './db'

function save (option){
    try{
        const {checked} = getData()
        const { roleId, menuOperations } = option
        checked[roleId.toString()] = menuOperations
        return {
            result: true,
            value: menuOperations
        }
    }catch(err){
        console.log(err)
        return {
            result: false,
            message: '参数错误'
        }
    }
}

export default save
