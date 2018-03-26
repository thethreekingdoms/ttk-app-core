import { data, deleteRoleid, getData } from './db'

function deleteFunc(option){
    const { id } = option
    const newData = deleteRoleid(id)
    return {
        result: true,
        value: newData
    }
}

export default deleteFunc