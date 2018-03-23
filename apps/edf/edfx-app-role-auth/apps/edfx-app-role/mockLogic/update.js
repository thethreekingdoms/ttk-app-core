import { update } from '../../../resData/db'

function update2(option){
    const result = update(option)
    return result ? {result: true, value: {}} : {result: false, message: {}}
}

export default update2