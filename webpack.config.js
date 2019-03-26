var webpack = require("webpack")
var path = require("path")
var fs = require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
//const marauderDebug = require('sinamfe-marauder-debug')
const es3ifyWebpackPlugin = require('es3ify-webpack-plugin-v2')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HappyPack = require('happypack')
// ie9 下单个的css文件超过400k 不被解析
//var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')

const webpackCompileParams = require('./webpackCompileParams')

var env = process.env.NODE_ENV

var plugins = []

var projectRootPath = path.resolve(__dirname, './')
const happyThreadPool = HappyPack.ThreadPool({ size: 12 });
var businessBlue = ["./assets/styles/businessBlue.less"]
//var orangeStyle = ["./assets/styles/orange.less"]
//var yellowStyle = ["./assets/styles/yellow.less"]
//var blueStyle = ["./assets/styles/blue.less"]
var version_ie8 = './compatible/dist/index.html'

const version_ie8_bol = fs.existsSync(path.resolve(projectRootPath, version_ie8))

//node环境变量，生产环境：production，开发环境：development
plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env),
    "process.env.MODE_SPLIT": true
}))
plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
plugins.push(new webpack.ExtendedAPIPlugin())
plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: merge(require('./vendor/vendor.manifest.json')),
}))

plugins.push(new es3ifyWebpackPlugin())
plugins.push(new HtmlWebpackPlugin({
    title: '企业开发平台', //标题
    favicon: './assets/img/favicon.ico', //favicon路径
    filename: 'index.html', //生成的html存放路径，相对于 path
    template: 'index-dev.html', //html模板路径
    chunks: ['bundle', 'edf', 'icon', 'businessBlueTheme'],
    hash: false,
    inject: 'body'//允许插件修改哪些内容，包括head与body`
}))

plugins.push(new ExtractTextPlugin('[name].css'))

//plugins.push(new CSSSplitWebpackPlugin({ size: 3000 }))
/*
plugins.push(new OptimizeCssAssetsPlugin(
    {
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: false
    }
))
*/

plugins.push(new CopyWebpackPlugin([{
    from: './checkLowBrowser.js',
    to: 'checkLowBrowser.js',
    toType: 'file'
}]))


plugins.push(new CopyWebpackPlugin([{
    from: './sso.html',
    to: 'sso.html',
    toType: 'file'
}]))


if (version_ie8_bol) {
    plugins.push(new CopyWebpackPlugin([{
        from: './compatible/dist',
        to: './version/ie8',
        ignore: ['.*']
    }]))
}

plugins.push(new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool,
}))

plugins.push(new HappyPack({
    id: 'htm',
    loaders: ['html2json-loader?cacheDirectory'],
    threadPool: happyThreadPool,
}))

const { modifyVars, aliasModule, start_params } = webpackCompileParams('development')

plugins.push(new HappyPack({
    id: 'css',
    // loaders: ['css-loader', clientInformation'less-loader'],
    loaders: [{
        loader: 'css-loader',
    }, {
        loader: "less-loader",
        options: {
            "modifyVars": modifyVars
        }
    }],
    threadPool: happyThreadPool,
}))
//plugins.push(new marauderDebug())
plugins.push(new LodashModuleReplacementPlugin)

plugins.push(new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 102400, // ~100kb
}))

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['edf'],
    filename: '[name].min.js',
    minChunks: Infinity
}))

plugins.push(new CopyWebpackPlugin([{
    from: './vendor',
    to: './vendor',
    ignore: ['.*']
}]))


function mergeTheme(arr, type) {
    const newArr = [...arr]
    const modules = ['edf', 'test']

    if (start_params && start_params.toUpperCase() == 'RUNSTART' || !start_params) {
        modules.forEach(item => {
            newArr.push(`./apps/${item}/theme/${type}.less`)
        })
    }
    else {
        modules.forEach(item => {
            item = item.toUpperCase()
            if (start_params && start_params.includes(item)) {
                newArr.push(`./apps/${item}/theme/${type}.less`)
            }
        })
    }

    return newArr
}
module.exports = {
    devtool: false, //devtool: 'source-map',
    entry: {
        bundle: "./index.js",
        edf: ["edf-app-loader", "edf-meta-engine", "edf-component", "edf-consts", "edf-utils", "webapi"],
        businessBlueTheme: businessBlue.concat(mergeTheme(['./assets/apps/businessBlue.less'], 'businessBlue')),
        ie: './assets/styles/ie.less',
        icon: "./component/assets/style/iconset.less",
    },

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: '[name].min.js',
        chunkFilename: '[name].chunk.js'
    },

    resolve: {
        extensions: [".js"],
        alias: Object.assign({
            'edf-app-loader': path.resolve(projectRootPath, './app-loader/index.js'),
            'edf-meta-engine': path.resolve(projectRootPath, './meta-engine/index.js'),
            'edf-component': path.resolve(projectRootPath, './component/index.js'),
            'edf-utils': path.resolve(projectRootPath, './utils/index.js'),
            'webapi': path.resolve(projectRootPath, './api/index.js'),
            'edf-consts': path.resolve(projectRootPath, './constant/consts.js'),
            'edf-constant': path.resolve(projectRootPath, './constant/index.js'),
            'eharts': path.resolve(projectRootPath, './vendor/echarts.min.js'),
            'zrender': path.resolve(projectRootPath, './vendor/zrender.min.js'),
            'Theme': path.resolve(projectRootPath, './component/assets/theme')
        }, aliasModule)
    },
    externals: {
        "echarts": 'echarts',
        "zrender": 'zrender',
    },
    module: {
        rules: [{
            test: /\.(css|less)/,
            use: ExtractTextPlugin.extract({
                use: ['happypack/loader?id=css']
            })
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: ['happypack/loader?id=babel']
        }, {
            test: /\.htm$/,
            exclude: /node_modules/,
            use: ['html2json-loader?id=htm']
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 8192
                }
            }
        }],
    },
    devServer: {
        contentBase: './dist/',
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/v1/*': 'http://debug.aierp.cn:8085/',
            '/share-oss/*': 'http://debug.aierp.cn:8085/',
        }
    },
    plugins: plugins
}
