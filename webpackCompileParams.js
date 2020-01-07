const path = require("path")
const fs = require('fs')
const projectRootPath = path.resolve(__dirname, './')

let isUse = true
let start_params
try {
    start_params = JSON.parse(process.env.npm_config_argv)
    if (!start_params || start_params && (!start_params.original || start_params.original.length == 1)) {
        start_params = false
    }
    start_params = start_params.original.join('').toUpperCase()
    //console.log('start_params：' + start_params)
} catch (err) {
    start_params = false
}

const moduleConfig = {
    useEDF: {
        path: './apps/edf/',
        name: 'edf',
        less: 'edf'
    }
}


function checkRunParams(name) {
    if (!start_params) return true
    if (start_params.indexOf('--ARG') == -1) return true
    console.log(`***********检测${name}模块是否编译***********`, start_params.split('=')[1].split(' ').includes(name.toUpperCase()))
    return start_params.split('=')[1].split(' ').includes(name.toUpperCase())
}

function checkModule() {
    let target = {}
    for (const key in moduleConfig) {
        const value = moduleConfig[key]
        target[key] = fs.existsSync(path.resolve(projectRootPath, `${value.path}/index.less`)) ? checkRunParams(value.name) : false
    }

    return target
}

function webpackCompileParams(mode) {
    const checkParams = checkModule()
    const modifyVars = {}
    for (const key in moduleConfig) {
        const value = moduleConfig[key]
        modifyVars[`@${value.less}`] = checkParams[key] && isUse ? value.less : 'empty'
    }
    const aliasModule = {}

    for (const key in moduleConfig) {
        const value = moduleConfig[key]
        if (mode == 'development') {
            aliasModule[key] = checkParams[key] && isUse ? path.resolve(projectRootPath, `${value.path}/index.js`) : './empty.js'
        } else {
            aliasModule[key] = path.resolve(projectRootPath, `./modules/${value.name}.js`)
        }
    }
    // for( const [key, value] of Object.entries(moduleConfig) ) {
    //     aliasModule[key] = checkParams[key] && isUse ? path.resolve(projectRootPath, `${value.path}/index.js`) : './empty.js'
    // }
    return {
        modifyVars,
        aliasModule,
        start_params
    }
}

module.exports = webpackCompileParams
