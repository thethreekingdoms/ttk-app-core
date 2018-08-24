const vfs = require('vinyl-fs')
const through = require('through2')
const deasync = require('deasync');


function copyFileSync(){
    var done = false;

    function createPromise(path) {
        return new Promise((resolve, reject) => {
            vfs.src([
                `../${path}/**`,
                `../${path}/.*`,
                `../${path}/.*/**`, 
            ])
            .pipe(through.obj(function(file, enc, cb){
                this.push(file)
                cb()
            }))
            .pipe(vfs.dest(`./${path}`))
            .on('end', function (err) {
                console.log(`完成${path}`)
                resolve(true)
            })
            .resume()
        })
    }

    //修改core-js依赖下的文件
    function editCoreJs() {
        // _object-dp.js
        return new Promise((resolve, reject) => {
            vfs.src([
                `./_object-dp.js`,
            ])
            .pipe(through.obj(function(file, enc, cb){
                this.push(file)
                cb()
            }))
            .pipe(vfs.dest(`./node_modules/core-js/modules`))
            .on('end', function (err) {
                console.log(`完成复制_object-dp.js`)
                resolve(true)
            })
            .resume()
        })
    }

    //copy vendor file
    function copyVendor() {
        // _object-dp.js
        return new Promise((resolve, reject) => {
            vfs.src([
                `../transreport/ie8/**`,
                `../transreport/ie8/.*`,
                `../transreport/ie8/.*/**`
            ])
            .pipe(through.obj(function(file, enc, cb){
                this.push(file)
                cb()
            }))
            .pipe(vfs.dest(`./transreport`))
            .on('end', function (err) {
                console.log(`完成复制dist/ie8`)
                resolve(true)
            })
            .resume()
        })
    }

    async function copyFile () {
        await createPromise('apps')
        await createPromise('api')
        await createPromise('app-loader')
        await createPromise('assets')
        await createPromise('component')
        await createPromise('constant')
        await createPromise('meta-engine')
        await createPromise('utils')
        await editCoreJs()
        await copyVendor()
        done = true
    }
    copyFile()
    deasync.loopWhile(function(){
        return !done
    })

    console.log('完成所有的复制')
}

module.exports = copyFileSync