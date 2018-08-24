import config from './../config'
import { password } from 'edf-utils'

const { dbProvider, dbConfig, webProvider } = config.current
const models = dbProvider && new dbProvider(
    dbConfig,
    {
        user: [
            { id: 10, name: '张三', mobile: '13334445556', password: '1', nickname: '三儿', sex: 0, birthday: '2000-1-1' },
        ]
    }
)

let myServiceDefine = ({ user }) => {
    let myServices = {
        user: {
            update: async (data, ctx) => {
                let users = await user.query({ id: ctx.token.userId })
                if (users.length == 0) {
                    throw { code: '100', message: '用户不存在' }
                }
                let userObj = {
                    id: ctx.token.userId,
                    nickname: data.nickname,
                    sex: data.sex,
                    birthday: data.birthday
                }
                let result = await user.update(userObj)
                return result
            }
        },
        mySetting: {
            init: async (data, ctx) => {
                let users = await user.query({ id: ctx.token.userId })
                if (users.length == 0) {
                    throw { code: '100', message: '用户不存在' }
                }
                let securityLevel = password.analyzeSecurityLevel(users[0].password)
                return { user: users[0], securityLevel }
            }
        }
    }
    return myServices
}

let service = models && models.toService(myServiceDefine)

webProvider && webProvider({
    '/v1/edf/user/update': service.user.update,
    '/v1/edf/mySetting/init': service.mySetting.init,
})
