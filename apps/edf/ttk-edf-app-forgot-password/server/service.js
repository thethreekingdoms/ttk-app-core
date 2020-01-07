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

let myServiceDefine = ({ user }) => {
    let myServices = {
        user: {
            existsMobile: async (mobile) => {
                let users = await user.query({ mobile })
                return users.length != 0
            },
            resetPassword: async (userObj) => {
                let users = await user.query({ mobile: userObj.mobile })
                if (users.length == 0) {
                    throw { code: '100', message: '用户不存在' }
                }
                let userData = { id: users[0].id, password: userObj.password }
                let result = await user.update(userData)
                return result
            }
        },
        captcha: {
            fetch: () => '123456',
            validate: (captcha) => {
                if (captcha != '123456') {
                    return { result: false, error: { message: '验证码错误，请重新获取验证码录入' } }
                }
                return { result: true, value: true }
            }
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
