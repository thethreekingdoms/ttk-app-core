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
        menu: [
            { id: 20, name: '个人设置', code: '20', parentId: 0, appName: 'edfx-app-my-setting' },
            { id: 21, name: '菜单预置', code: '21', parentId: 0, appName: 'ttk-edf-app-portal-menu' },
            { id: 31, name: '用户管理', code: '31', parentId: 30 },
            { id: 30, name: '系统管理', code: '30', parentId: 0 },
        ],
        menuOperation: [
            { id: 1000, menuId: 10, operationId: 100, roleId: 0 },
            { id: 1001, menuId: 10, operationId: 900, roleId: 0 },
            { id: 1002, menuId: 20, operationId: 100, roleId: 0 },
            { id: 1003, menuId: 20, operationId: 900, roleId: 0 },
        ]
    }, {
        menu: {
            name: 'menu',
            fields: '*',
            operations: {
                name: 'menuOperation',
                fields: '*',
                where: {
                    menuId: '$parent.id',
                    roleId: 0
                }
            }
        },
    }
)

let myServiceDefine = ({ menu, menuOperation, operation }) => 0 || {
    menu: {
        create: async (data, ctx) => {
            let mIds = await menu.executeSql('select max(id)+1 id  from menu')
            let moIds = await roleMenuOperation.executeSql('select max(id)+1 id  from menuOperation')
            data.id = mIds[0] && mIds[0].id || 1
            await menu.create(data)
            if (data.operations && data.operations.length != 0) {
                let moId = moIds[0] && moIds[0].id || 1
                data.operations.forEach(mo => {
                    mo.id = moId++
                    mo.menuId = data.id
                    mo.roleId = 0
                })
                await roleMenuOperation.createBatch(data.operations)
            }
            return data
        },
        findFullById: (id, ctx) => {
            return menu.view({ id })
        },
    }
}

let service = models && models.toService(myServiceDefine)

webProvider && webProvider({
    '/v1/edf/menu/create': service.menu.create,
    '/v1/edf/menu/update': service.menu.update,
    '/v1/edf/menu/findFullById': service.menu.findFullById
})
