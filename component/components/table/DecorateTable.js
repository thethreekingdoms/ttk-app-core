function DecorateTable(target){
    target.prototype.getAppData = (path, col) => {
        if( !path ){
            return null
        }
        let app 
        if( !app ) {
            app = target.prototype.getDataFromLocalStorage(path)
            // this.contaienr.set(path, app)
        }
        if( !col ){
            return app
        }else{
            return app[col]
        }
    }

    target.prototype.setAppData = (path, data, col) => {
        if( !path || !data ){
            return null
        }
        let app = target.prototype.getAppData(path)
        if( col ){
            app[col] = data
        }else{
            app = data
        }
        // this.contaienr.set(path, data)
        target.prototype.setDataToLocalStorage(path, app)
    }

    target.prototype.clearAppData = (path) => {
        localStorage.removeItem(path)
    }

    target.prototype.getDataFromLocalStorage = (path) => {
        let appStr = localStorage.getItem(path)
        if( !appStr ){
            let obj = {}
            target.prototype.setDataToLocalStorage(path, obj)
            return obj
        }
        let data = {}
        try{
            data = JSON.parse(appStr)
        }catch(err){
            console.log(err)
        }
        return data
    }

    target.prototype.setDataToLocalStorage = (path, data) => {
        if( !path || !data || Object.prototype.toString.call(data) !=  '[object Object]'){
            return 
        }
        localStorage.setItem(path, JSON.stringify(data))
    }

    return target
}

export default DecorateTable