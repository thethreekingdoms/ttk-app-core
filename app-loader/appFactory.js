class appFactory {
    constructor() {
        this.apps = {}
    }

    registerApp = (name, app) => {
        if (this.apps[name])
            throw `已经注册过这个app，不能重复注册. name: ${name}`

        this.apps[name] = app
    }

    registerApps = (apps) => {
        this.apps = {
            ...this.apps,
            ...apps
        }

        //window.__mk_apps__ = this.apps
    }

    getApp = (name) => {
        var app = this.apps[name]

        if (!app) {
            throw `没有注册这个app. name: ${name}`
        }
        return app
    }

    getApps = () => {
        return this.apps
    }

}

const appFactoryInstance = new appFactory()

export default appFactoryInstance