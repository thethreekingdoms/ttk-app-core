var webpack = require("webpack")
var path = require("path")
var fs = require('fs')

var ManifestPlugin = require('webpack-manifest-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyWebpackPlugin = require('es3ify-webpack-plugin-v2')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const webpackCompileParams = require('../webpackCompileParams')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var env = process.env.NODE_ENV
var plugins = []

var projectRootPath = path.resolve(__dirname, './')


console.log('单独打包某个app')


//node环境变量，生产环境：production，开发环境：development
plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

//plugins.push(new webpack.ExtendedAPIPlugin())
plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: merge(require('../vendor/vendor.manifest.json')),
}))

plugins.push(new ManifestPlugin())
plugins.push(new es3ifyWebpackPlugin())
plugins.push(new webpack.NoEmitOnErrorsPlugin())

plugins.push(new LodashModuleReplacementPlugin)

plugins.push(new ExtractTextPlugin('[name].css'))

plugins.push(new HtmlWebpackPlugin({
    title: '金财管家', //标题
    favicon: './assets/img/favicon.ico', //favicon路径
    filename: 'index.html', //生成的html存放路径，相对于 path
    template: './dist/index.html', //html模板路径
    chunks: [ 'singleCss', 'singleApp'],
    hash: false,
    inject: false//允许插件修改哪些内容，包括head与body`
}))

// plugins.push(new BundleAnalyzerPlugin())

plugins.push(new webpack.DllReferencePlugin({
    context: path.resolve(__dirname, '../'),
    manifest: merge(require('../vendor/vendor.manifest.json')),
}))

const { aliasModule } = webpackCompileParams()


module.exports = {
    devtool: false,
    entry: {
        singleApp: `./webpacksingle/index.js`,
        singleCss: './webpacksingle/style.less'
    },
    output: {
        path: path.join(__dirname, `/dist/singleApp`),
        filename: '[name].min.js',
        chunkFilename: '[name].chunk.js',
        jsonpFunction: `singleWebpackJsonp`
    },

    resolve: {
        extensions: [".js"],
        alias: Object.assign({
            'edf-app-loader': path.resolve(projectRootPath, '../global/edf-app-loader.js'),
            'edf-meta-engine': path.resolve(projectRootPath, '../global/edf-meta-engine.js'),
            'edf-component': path.resolve(projectRootPath, '../global/edf-component.js'),
            'edf-utils': path.resolve(projectRootPath, '../global/edf-utils.js'),
            'webapi': path.resolve(projectRootPath, '../global/webapi.js'),
            'edf-consts': path.resolve(projectRootPath, '../global/edf-consts.js'),
            'edf-constant': path.resolve(projectRootPath, '../global/edf-constant.js'),
            'eharts': path.resolve(projectRootPath, '../vendor/echarts.min.js'),
            'zrender': path.resolve(projectRootPath, '../vendor/zrender.min.js'),
            'Theme': path.resolve(projectRootPath, '../component/assets/theme')
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
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "less-loader"
                }]
            })
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 8192
                }
            }
        }]
    },
    devServer: {
        contentBase: './dist/',
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            // '/v1/*': 'http://debug.aierp.cn:8088/',
            '/v1/*': 'http://172.16.10.22:30188/',
            // '/v1/*': 'http://172.16.20.227:8008/',
            // '/v1/*': 'http://erpdemo.jchl.com/',
            '/share-oss/*': 'http://debug.aierp.cn:8085/',
            // '/v1/*': 'http://172.16.20.239:8008/',
            // '/v1/*': 'http://127.0.0.1:8008/',
        }
    },
    plugins: plugins
}