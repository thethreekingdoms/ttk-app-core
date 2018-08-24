import config from './../config'
const { dbProvider, dbConfig, webProvider } = config.current
const models = dbProvider && new dbProvider(
    dbConfig,
    {
        user: [
            { id: 10, name: '张三', mobile: '13334445556', password: '1' },
        ]
    }
)

let myServiceDefine = (models) => {
    let myServices = {
        user: {
            existsMobile: async (mobile) => {
                let users = await models.user.query({ mobile })
                return users.length != 0
            },
            create: async (userObj) => {
                if (userObj.captcha != '123456') {
                    throw { code: '100', message: '验证码错误，请重新获取验证码录入' }
                }
                let users = await models.user.query({ mobile: userObj.mobile })
                if (users.length != 0) {
                    throw { code: '100', message: '用户已经存在，请更换手机号注册' }
                } 
                let ids = await models.executeSql('select max(id)+1 id  from user')
                let user = {
                    id: ids[0].id || 1,
                    mobile: userObj.mobile,
                    name: userObj.mobile,
                    password: userObj.password
                }
                let result = await models.user.create(user)
                return result
            }
        },
        captcha: {
            fetch: () => '123456'
        }
    }
    return myServices
}

let service = models && models.toService(myServiceDefine)

webProvider && webProvider({
    '/v1/edf/captcha/fetch': service.captcha.fetch,
    '/v1/edf/user/create': service.user.create,
    '/v1/edf/user/existsMobile': service.user.existsMobile,
})
