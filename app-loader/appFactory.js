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
        this.actions = {};
    }

    registerApp = (name, app) => {
        if (this.apps[name]) {
            return;
        }
        //throw `已经注册过这个app，不能重复注册. name: ${name}`
        this.apps[name] = app;
    };

    registerApps = (apps) => {
        Object.assign(this.apps, apps);
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

    getActions() {
        return this.actions
    }
    getAction(actionName) {
        return this.actions[actionName]
    }
    registerAction(action) {
        this.actions = Object.assign( this.actions, action)
    }

}

export default AppFactory;