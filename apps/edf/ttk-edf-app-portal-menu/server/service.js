import config from './../config'
import { tree } from 'edf-utils'
const { dbProvider, dbConfig, webProvider } = config.current
const models = dbProvider && new dbProvider(
    dbConfig,
    {
        menu: [
            { id: 20, name: '个人设置', code: '20', parentId: 0, appName: 'edfx-app-my-setting' },
            { id: 21, name: '菜单预置', code: '21', parentId: 0, appName: 'ttk-edf-app-portal-menu' },
            { id: 31, name: '用户管理', code: '31', parentId: 30 },
            { id: 30, name: '系统管理', code: '30', parentId: 0 },
        ],
    }
)

let myServiceDefine = ({ menu }) => {
    let myServices = {
        menu: {
            queryPageList: async (data, ctx) => {
                console.log(data.entity)
                let list = await menu.query(data.entity)
                return { list, page: data.page }
            },
            deleteBatch: (data, ctx) => {
                console.log(data)
                console.log(ctx)
            },
        }
    }
    return myServices
}

let service = models && models.toService(myServiceDefine)

webProvider && webProvider({
    '/v1/edf/menu/queryPageList': service.menu.queryPageList,
    '/v1/edf/menu/deleteBatch': service.menu.deleteBatch,
})
