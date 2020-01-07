//var loadJsArray = []
var getCurrentTime = function (type) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    if (type == 1) {
        return "" + date.getFullYear() + '-' + month + '-' + strDate + "  " + hour + ":" + minute + ":" + second;
    } else {
        return "" + date.getFullYear() + month + strDate + "" + hour + "" + minute;
    }

};

class moduleGlobal {
    constructor() {
        this.loadsCallback = {}
        this.data = null
        this.loadJSCallback = {}
        this.apps = {}
        if (!process.env.MODE_SPLIT) {
            this.loadGlobal()
        }

    }

    moduleName = ['edf']
    // moduleName = ['edf']

    loadGlobal = () => {
        const script = document.createElement('script')

        script.src = `./modulemanifest.js?${getCurrentTime()}`
        script.onerror = function () {

        }
        script.onload = () => {
            if (window.moduleManifest) {
                this.data = window.moduleManifest
                // window.moduleManifest = null
                this.publish()
                this.loadJS()
            }
        }

        document.body.appendChild(script)
    }

    get = (module) => {
        if (this.data) {
            return Promise.resolve(this.data[module])
        }
        return new Promise((resolve, reject) => {
            this.registerModule(module, resolve)
        })
    }

    registerModule = (module, callBack) => {
        this.loadsCallback[module] = callBack
    }

    publish = () => {
        if (this.data) {
            Object.entries(this.loadsCallback).forEach(([key, callBack]) => {
                callBack(this.data[key])
            })
        }
    }

    //因为加载js肯定只有一次，不需要多次加载所以和css有些不一样
    loadJS = () => {
        const path = this.data['mergeJsName']
        const script = document.createElement('script')
        //script.id = 'modulejs'
        script.type = "text/javascript"
        script.async = true
        script.defer = true
        script.src = `${path}`
        script.onerror = function () {
            if (this.publishJS) {
                this.publishJS()
            }
        }
        script.onload = () => {
            this.publishJS()
        }
        document.body.appendChild(script)

        // loadJsArray.find(e => e.src === src) || document.body.appendChild(script);
        // loadJsArray.find(e => e.src === src) || loadJsArray.push({
        //     src: src,
        //     promise: new Promise((rev, rej) => {
        //         script.onload = () => rev(222)
        //     })
        // });

        // if(loadJsArray.length ==0){

        // }

        // return loadJsArray.find(e => e.src === src).promise;
    }

    getJS = (module) => {
        return new Promise((resolve, reject) => {
            if (this.apps[module]) {
                resolve(this.apps[module])
            } else {
                this.loadJSCallback[module] = resolve
            }
        })
    }

    publishJS = () => {
        Object.entries(this.loadJSCallback).forEach(([key, callBack]) => {
            callBack(this.apps[key] ? this.apps[key] : {})
        })
    }

    callback = (result, name) => {
        this.apps[name] = result
    }
}

const result = new moduleGlobal()

window.publicModule = result

export default result

