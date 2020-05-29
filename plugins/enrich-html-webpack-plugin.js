const fs = require('fs')
const path = require('path')
const DEFAULT_URL = '//static-dev.bj.jchl.com' 

let start_params = DEFAULT_URL
let shellCommand = false
let shouldUseThisPlugin = false
try {
    start_params = JSON.parse(process.env.npm_config_argv)
    if(start_params && start_params.original && start_params.original.length > 1) {
        let length = start_params.original.length
        start_params.original.forEach(o => {
            if(o == '--split') {
                shellCommand = '--split'
            }
            if(o == '--plugin') {
                shouldUseThisPlugin = true
            }
            if(o.indexOf('--domain=') != -1) {
                const newParams = o.split('=')[1]
                start_params = newParams
            }
        })
    }
} catch (err) {
    start_params = DEFAULT_URL
    shellCommand = false
    shouldUseThisPlugin = false
}

class EnrichHtmlWebpackPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        const optinfo = this.options
        if(!optinfo || !optinfo.length) return 

        compiler.plugin('emit', function(compilation, callback) {
            if(!shouldUseThisPlugin) {
                return callback()
            }

            let assets = compilation.assets['index.html']
            if(!assets) {
                return callback()
            }
               
            let newAsset = assets.source()
            optinfo.forEach(o => {
                if(o.position) {
                    if(o.type === 'js') { // 1.1 html 引入文件加 hash
                        let matchReg = new RegExp(`<${o.position}>[\\d\\D]*</${o.position}>`, 'g')
                        let positionStr = newAsset.match(matchReg)
                        if(!positionStr || !positionStr.length) return 
    
                        let matchRegScript = new RegExp('</script>', 'g')
                        let scriptStr = positionStr[0].match(matchRegScript)
                        let matchRegEnd
                        if(scriptStr && scriptStr.length && o.forward) {
                            matchRegEnd = new RegExp(`<script`)
                            newAsset = newAsset.replace(matchReg, function (data) {
                                return replaceStr(data, matchRegEnd, o, compilation)
                            })
                        } else {
                            matchRegEnd = new RegExp(`</${o.position}>`, 'g')
                            newAsset = replaceStr(newAsset, matchRegEnd, o, compilation)
                        }
                    }
                } else { // 2.2 本次打包生成的文件增加 publicPath
                    let matchInfo = `${o.attr}(\\s)*=(\\s)*"(\.\/)?${o.path}${o.filename}`
                    let matchRegEnd = new RegExp(matchInfo, 'g')
                    newAsset = newAsset.replace(matchRegEnd, function (data) {
                        return `${o.attr}="${start_params}/${o.path}${o.filename}`
                    })
                }
            })
            
            newAsset = newAsset.replace(/--domain/g, function () {
                return start_params
            })

            compilation.assets['index.html'] = {
                source: () => {
                    return newAsset
                },
                size: () => {
                    return Buffer.byteLength(newAsset, 'utf8');
                }
            }
            callback()
        })
        
        compiler.plugin('afterEmit', function(compilation) {
            if(!shouldUseThisPlugin) return

            let assets = fs.readFileSync('./dist/index.html', 'utf8')
            let splitShell = false
            if(shellCommand && shellCommand === '--split') {
                splitShell = true
            }

            optinfo.forEach(o => {
                if(!splitShell) {
                    if(o.position) { // 1.1 对应文件名称增加 hash
                        rename(o, compilation)
                    }
                    if(o.type === 'css' && o.position) { // 2.2 非本次打包生成的文件增加 publicPath
                        let matchRegEnd = new RegExp(`</${o.position}>`, 'g')
                        modifyHtml(assets, matchRegEnd, o, compilation)
                    }
                    if(o.modules && o.modules.length) {
                        modulesModify(assets, o)
                    }
                }
                if(o.shell && shellCommand && o.shell === shellCommand) {
                    if(o.fileQuantity) {
                        shellFileRename(o, compilation)
                    } else {
                        shellFileChange(assets, o, compilation)
                    }
                }
            })
        })
    }
}

/*
* 字段说明：
* filename 文件名称
* path 文件相对 outputfile 路径
* outputfile 改名时需要找到对应文件夹，默认为 dist
* position 文件插入 html 标签的位置
* forward 文件插入时是否要放到 position 中第一个 script 标签之前
* type 文件类型
* options 插入标签的属性 
* attr 增加 publickPath 的时候查找的属性，一般有 script 的 src、link 的 href
* shell 表示根据特定命令进行特殊处理,需要匹配 shellCommand 的值进行特定操作
* 
* 使用注意事项：
* 根据 position 字段 区分文件在 html 中已经存在还是需要插件手动插入
* 本次打包生成 html 模版，需要改变它在 pluin 监听方法 emit 时机操作，反之在 afterEmit 时机操作
* rename 更改文件名称在 afterEmit 时机操作
*/
function modulesModify(assets, o) {
    let matchRegEnd = new RegExp(`${o.filename}(\.[\\w]{8}\.)?${o.suffix}`, 'g')
    let moduleName = assets.match(matchRegEnd)
    let moduleAssets = fs.readFileSync(`./dist/${moduleName}`, 'utf8')

    o.modules.forEach(k => {
        matchRegEnd = new RegExp(`\[\"\'\]\\.\\/\(${o.prefixFloder}\\/\)?${k}`, 'g')
        moduleAssets = moduleAssets.replace(matchRegEnd, function(data){
            return `(window.txtdomain || ".") + "${data.substr(2)}`
        })

    })
    fs.writeFileSync(`./dist/${moduleName}`, moduleAssets, 'utf8')
}

function shellFileRename(o, compilation) {
    let fpath = path.join('./', o.outputfile, o.path)
    for(let i = 1; i <= o.fileQuantity; i++) {
        fs.renameSync(`${fpath}/${o.filename}${o.part}${i}.${o.type}`, `${fpath}/${o.filename}.${compilation.hash.substr(0, 8)}${o.part}${i}.${o.type}`)
    }
}

function shellFileChange(assets, o, compilation) {
    let matchRegEnd = new RegExp(`rel="dns-prefetch" href="([\\d\\D]+)"(/)?>`)
    let matchHashReg = new RegExp(`${o.filename}.[0-9a-zA-Z]{8}.${o.type}`)
    let cdnUrlInfo = assets.match(matchRegEnd)
    let hashInfo = assets.match(matchHashReg)
    if (cdnUrlInfo && hashInfo &&  cdnUrlInfo.length && hashInfo.length) {
        let cdnUrl = cdnUrlInfo[1]
        let filename = hashInfo[0]
        let shellAssets = fs.readFileSync(`./dist/${filename}`, 'utf8')
        matchRegEnd = new RegExp(`./splitcss/' \\+ theme \\+ '-' \\+ i \\+ `)
        let newShellAssets = shellAssets.replace(matchRegEnd, function (data) {
            return `${start_params}${data.substr(1)}'${compilation.hash.substr(0, 8)}' + `
        })
        fs.writeFileSync(`./dist/${filename}`, newShellAssets, 'utf8')
    }
}

function replaceStr(newAsset, matchRegEnd, o, compilation) {
    return newAsset.replace(matchRegEnd, function (data) {
        if(o.type === 'js') {
            return insertScript(o, compilation, data)
        } else if(o.type === 'css') {
            return insertLink(o, compilation, data)
        }
    })
}

function insertScript(o, compilation, data) {
    const src = `${start_params}${o.path.substr(1)}${o.filename}.${compilation.hash.substr(0, 8)}.${o.type}`
    let str = `${"\r\n"}<script src="${src}"`
    if (o.options) {
        for (let k in o.options) {
            str += ` ${k}="${o.options[k]}"`
        }
    }
    str += ` ></script>${"\r\n"}${data}`
    return str 
}

function insertLink(o, compilation, data) {
    const href = `${start_params}${o.path.substr(1)}${o.filename}.${compilation.hash.substr(0, 8)}.${o.type}`
    let str = `${"\r\n"}<link href="${href}"`
    if (o.options) {
        for (let k in o.options) {
            str += ` ${k}="${o.options[k]}"`
        }
    }
    str += ` />${"\r\n"}${data}`
    return str 
}

function rename(o, compilation) {
    let fpath = path.join('./', o.outputfile, o.path)
    fs.renameSync(`${fpath}/${o.filename}.${o.type}`, `${fpath}/${o.filename}.${compilation.hash.substr(0, 8)}.${o.type}`)
}

function modifyHtml(assets, matchRegEnd, o, compilation) {
    let newAsset = replaceStr(assets, matchRegEnd, o, compilation)
    fs.writeFileSync('./dist/index.html', newAsset, 'utf8')
}

module.exports = EnrichHtmlWebpackPlugin