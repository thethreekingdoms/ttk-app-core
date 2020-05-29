const fs = require('fs')
const path = require('path')
console.log('-------------------------------------')
console.log('---------开始合并业务资源------------')
console.log('-------------------------------------')

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
        return "" + date.getFullYear() + month + strDate + "" + hour + "" + minute + "" + second;
    }

};


const moduleName = ['edf']

const now = getCurrentTime()

const writeTime = getCurrentTime(1)

const output = 'mergeModule'

const mergeJsName = `${output}/mergeModule.${now}.js`

function createManifest() {

    let result = `
/*
* ${writeTime}
*/
window.moduleManifest = {}

window.moduleManifest.mergeJsName = '${mergeJsName}'

window.moduleManifest.nowtime = '${now}'

`
    moduleName.forEach(item => {
        try {
            const res = fs.readFileSync(`./dist/${item}/manifest.json`)
            result = result + `
    window.moduleManifest.${item} = ${filterUseful(res)}
    `
        }
        catch (err) {
            if (err && err.code !== 'ENOENT') throw e;
        }

    })


    fs.writeFileSync(path.join(__dirname, './dist/modulemanifest.js'), result, (err) => {
        if (err) {
            // 读文件是不存在报错
            // 意外错误
            // 文件权限问题
            // 文件夹找不到(不会自动创建文件夹)
            console.log(err);
        } else {
            console.log('files merge success');
        }
    });
}

createManifest()

function mergeBaseJs() {
    let content = ""
    moduleName.forEach(item => {

        let res = ''
        try {
            res = fs.readFileSync(`./dist/${item}/manifest.json`)
        }
        catch (ex) {
            throw ex
        }
        //const res = fs.readFileSync(`./dist/${item}/manifest.json`)
        const result = JSON.parse(res)
        const modulePath = result[`${item}.js`]
        const str = fs.readFileSync(path.resolve(__dirname, `./dist${modulePath}`))
        content = content + `
/*
*${item}.js
* 创建时间 ${writeTime}
*/
${str}
`

    })
    const lastPath = path.join(__dirname, `./dist/${mergeJsName}`)
    fs.writeFile(lastPath, content, 'utf8', (err) => {
        if (err) {
            // 读文件是不存在报错
            // 意外错误
            // 文件权限问题
            // 文件夹找不到(不会自动创建文件夹)
            console.log(err);
        } else {
            console.log('-------------------------------------')
            console.log('---------业务脚本合并成功------------')
            console.log('-------------------------------------')
        }
    });
}

function mergeCss() {
    const themes = ['YellowTheme', 'OrangeTheme', 'BusinessBlueTheme', 'BlueTheme', 'Tax72Theme']
    let status = true;
    themes.forEach(item => {
        let themeContent = ''
        moduleName.forEach(name => {
            let res = ''
            try {
                res = fs.readFileSync(`./dist/${name}/manifest.json`)
                const result = JSON.parse(res)
                const cssPath = result[`${name}${item}.css`]

                const str = fs.readFileSync(path.resolve(__dirname, `./dist${cssPath}`))
                themeContent = themeContent + `
/*
*${name}.css
* 创建时间 ${writeTime}
*/
${str}
`

            }
            catch (err) {
                console.log('缺少模块' + name)
            }

        })
        const lastPath = path.join(__dirname, `./dist/${output}/merge${item}.${now}.css`)
        fs.writeFile(lastPath, themeContent, 'utf8', (err) => {
            if (err) {
                // 读文件是不存在报错
                // 意外错误
                // 文件权限问题
                // 文件夹找不到(不会自动创建文件夹)
                status = false;
                console.log(err);
            } else {
            }
        });
    })
    if (status) {
        console.log('-------------------------------------')
        console.log('---------业务样式文件合并成功--------')
        console.log('-------------------------------------')
    }

}

function filterUseful(str) {
    if (!str) {
        return ''
    }
    try {
        let result = {}
        const data = JSON.parse(str.toString())
        for (const key in data) {
            const value = data[key]
            if (key.includes('.css')) {
                result[key] = value
            } else if (value.includes('.min.js')) {
                result[key] = value
            }
        }
        return JSON.stringify(result)
    } catch (err) {
        console.log(err)
        return ''
    }


}


function deleteFile(path) {
    try {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    deleteFile(curPath)
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    } catch (err) {
        console.log(err)
    }

}

function clearFile() {
    const a = path.resolve(__dirname, './dist/mergeModule')
    deleteFile(a)
    fs.mkdirSync(a)

}

clearFile()

mergeBaseJs()

mergeCss()
