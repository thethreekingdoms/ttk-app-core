var webpack = require("webpack")
var path = require("path")
var fs = require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const es3ifyWebpackPlugin = require('es3ify-webpack-plugin-v2')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HappyPack = require('happypack')
const merge = require('webpack-merge')

const webpackCompileParams = require('./webpackCompileParams')

var env = process.env.NODE_ENV

var plugins = []

var projectRootPath = path.resolve(__dirname, './')
const happyThreadPool = HappyPack.ThreadPool({ size: 12 })
var defaultStyle = ["./assets/styles/businessBlue.less"]
var orangeStyle = ["./assets/styles/orange.less"]
var yellowStyle = ["./assets/styles/yellow.less"]
var blueStyle = ["./assets/styles/blue.less"]
var version_ie8 = './compatible/dist/index.html'

const version_ie8_bol = fs.existsSync(path.resolve(projectRootPath, version_ie8))

//node环境变量，生产环境：production，开发环境：development
plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
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
    chunks: ['bundle', 'edf', 'icon', 'blueTheme'],
    hash: false,
    inject: 'body'//允许插件修改哪些内容，包括head与body`
}))

plugins.push(new ExtractTextPlugin('[name].css'))

plugins.push(new CopyWebpackPlugin([{
    from: './version.txt',
    to: 'version.txt',
    toType: 'file'
}]))

plugins.push(new CopyWebpackPlugin([{
    from: './robots.txt',
    to: 'robots.txt',
    toType: 'file'
}]))

// plugins.push(new CopyWebpackPlugin([{
//     from: './checkLowBrowser.js',
//     to: 'checkLowBrowser.js',
//     toType: 'file'
// }]))


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

const { modifyVars, aliasModule } = webpackCompileParams()
plugins.push(new HappyPack({
    id: 'css',
    // loaders: ['css-loader', 'less-loader'],
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


module.exports = {
    devtool: false, //devtool: 'cheap-module-eval-source-map',
    entry: {
        bundle: "./index.js",
        edf: ["edf-app-loader", "edf-meta-engine", "edf-component", "edf-consts", "edf-utils", "webapi"],
        //businessBlueTheme: businessBlue.concat(['./assets/apps/businessBlue.less']),
        //orangeTheme: orangeStyle.concat(['./assets/apps/orange.less']),
        //yellowTheme: yellowStyle.concat(['./assets/apps/yellow.less']),
        blueTheme: blueStyle.concat(['./assets/apps/blue.less']),
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
            'zrender': path.resolve(projectRootPath, './vendor/zrender.min.js')
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
