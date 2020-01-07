class AppFactory {
    static getInstance() {
        if (!this.instance) {
            this.instance = new AppFactory(name);
        }
        return this.instance;
    }

    constructor() {
        this.instance = null;
        this.apps = {};
    }

    registerApp = (name, app) => {
        if (this.apps[name]) {
            return;
        }
        //throw `已经注册过这个app，不能重复注册. name: ${name}`

        this.apps[name] = app;
    };

    registerApps = (apps) => {
        // this.apps = {
        //     ...this.apps,
        //     ...apps
        // }
        Object.assign(this.apps, apps);
        //window.__mk_apps__ = this.apps
    };

    getApp = (name, showError = true) => {
        var app = this.apps[name];
        if (app)
            return app;
        if (typeof (config) != 'undefined') {
            if (config.current.requireFn
                && config.current.appsMap
                && config.current.appsMap[name]
            )
                return;

            if (config.current.requireFn
                && config.current.loadAppInfoFn)
                return;
        }
        if (!app && showError) {
            throw `没有注册这个app. name: ${name}`;
        }
        return app;
    };

    getApps = () => {
        return this.apps;
    };

}

export default AppFactory;