const fs = require('fs')
const path = require('path')

let shouldUseThisPlugin = false
let shellModuleName = ''
try {
    start_params = JSON.parse(process.env.npm_config_argv)
    if(start_params && start_params.original && start_params.original.length > 1) {
        let length = start_params.original.length
        start_params.original.forEach(o => {
            if(o == '--plugin') {
                shouldUseThisPlugin = true
                shellModuleName = start_params.original[2]
            }
        })
    }
} catch (err) {
    shouldUseThisPlugin = false
}

class PublicPathWebpackPlugin {
	constructor(options) {
		this.options = options
	}

	apply(compiler) {
		if(!shouldUseThisPlugin) return 

		const optinfo = this.options
		if(!optinfo) return 

		compiler.plugin('afterEmit', function(compilation) {
			if(shellModuleName === '') return 

			let mname = shellModuleName.slice(2)

			try{
				const manifestAssets = fs.readFileSync(path.join('./', optinfo.outputPath, mname, 'manifest.json'), 'utf8')
				const moduleName = JSON.parse(manifestAssets)[`${mname}.js`].split(`/${mname}/`)[1]
				const moduleAssets = fs.readFileSync(path.join('./', optinfo.outputPath, mname, moduleName), 'utf8')
				const newModuleAssets = moduleAssets.replace(new RegExp(`\[\"\'\]/${mname}/\[\"\'\]`), function(data) {
					return `window.txtDomain+${data}`
				})
				fs.writeFileSync(path.join('./', optinfo.outputPath, mname, moduleName), newModuleAssets, 'utf8')
			}catch(err) {
				console.log(`找不到${mname}模块...`)
			}
		}) 
	}
}

module.exports = PublicPathWebpackPlugin