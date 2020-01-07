import config from './../config'
import { tree } from 'edf-utils'
const { dbProvider, dbConfig, webProvider } = config.current
const models = dbProvider && new dbProvider(
    dbConfig,
    {
        operation: [
            { id: 100, name: '查看', dependentId: null },
            { id: 900, name: '操作', dependentId: 100 },
        ],
    }
)

let myServiceDefine = ({ operation }) => 0 || {
    operation: {
        save: async (data, ctx) => {
            await operation.delete({})
            data.forEach(d => {
                d.id = Number(d.id)
                operation.create(d)
            })
            return data
        }
    }
}

let service = models && models.toService(myServiceDefine)

webProvider && webProvider({
    '/v1/edf/operation/query': service.operation.query,
    '/v1/edf/operation/save': service.operation.save,
})