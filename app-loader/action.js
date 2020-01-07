export function loadApp(fullName, prevFullName, appDataId) {
    return {
        type: '@@loadApp',
        payload: {
            fullName,
            prevFullName,
            appDataId
        }
    }
}

export function clearAppState(fullName, appDataId) {
    return {
        type: '@@clearAppState',
        payload: {
            fullName,
            appDataId
        }
    }
}