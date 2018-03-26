import { getData, create } from '../../../resData/db'

function create2(option){
    const result = create(option)
    if( result ){
        return {
            result: true,
            value: {}
        }
    }else{
        return {
            result: false,
            value: {}
        }
    }
}

export default create2