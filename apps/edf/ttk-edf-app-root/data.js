import config from './config'

export function getMeta() {
    return {
        name: 'root',
        component: '::div',
        children: {
            name: 'currentApp',
            component: 'AppLoader',
            appName: '{{data.currentAppName}}',
            onRedirect: '{{$onRedirect}}'
        }
    }
}

export function getInitState() {
    return {
        data: {
            currentAppName: config.current.startAppName
        }
    }
}