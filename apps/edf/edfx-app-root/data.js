import config from './config'

export function getMeta() {
    return {
        name: 'root',
        component: '::div',
        className: 'edfx-app-root',
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