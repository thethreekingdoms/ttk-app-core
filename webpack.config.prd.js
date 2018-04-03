var webpack = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
//const marauderDebug = require('sinamfe-marauder-debug')
const es3ifyWebpackPlugin = require('es3ify-webpack-plugin-v2')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
var env = process.env.NODE_ENV
var plugins = []

var projectRootPath = path.resolve(__dirname, './')

//node环境变量，生产环境：production，开发环境：development
plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

plugins.push(new webpack.ExtendedAPIPlugin())
plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: merge(require('./vendor/shim.manifest.json'), require('./vendor/vendor.manifest.json')),
}))

plugins.push(
    new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }
    })
)
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['edf'],
    filename: '[name].[hash:8].min.js',
    minChunks: Infinity
}))

plugins.push(new es3ifyWebpackPlugin())
plugins.push(new webpack.NoEmitOnErrorsPlugin())
plugins.push(new HtmlWebpackPlugin({
    title: '企业开发平台', //标题
    favicon: './assets/img/favicon.ico', //favicon路径
    filename: 'index.html', //生成的html存放路径，相对于 path
    template: 'index.html', //html模板路径
    chunks: ['edf', 'bundle', 'icon', 'greenTheme'],
    hash: false,
    inject: 'body', //允许插件修改哪些内容，包括head与body`
    minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //删除空白符与换行符
        removeAttributeQuotes: true
    }
}))

plugins.push(new ExtractTextPlugin('[name].[hash:8].css'))
plugins.push(new LodashModuleReplacementPlugin)
/*
plugins.push(new OptimizeCssAssetsPlugin(
    {
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: false
    }
))*/
plugins.push(new CopyWebpackPlugin([{
    from: './robots.txt',
    to: 'robots.txt',
    toType: 'file'
}]))

plugins.push(new CopyWebpackPlugin([{
    from: './vendor',
    to: './vendor',
    ignore: ['.*']
}]))

module.exports = {
    devtool: false,
    entry: {
        bundle: "./index.js",
        edf: ["edf-app-loader", "edf-meta-engine", "edf-component", "edf-consts", "edf-utils", "webapi"],
        businessBlueTheme: "./assets/styles/businessBlue.less",
        blackTheme: "./assets/styles/black.less",
        greenTheme: "./assets/styles/green.less",
        orangeTheme: "./assets/styles/orange.less",
        blueTheme: "./assets/styles/blue.less",
        yellowTheme: "./assets/styles/yellow.less",
        icon: "./component/assets/style/iconset.less"
    },

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: '[name].[hash:8].min.js',
        chunkFilename: '[name].[hash:8].chunk.js'
    },

    resolve: {
        extensions: [".js"],
        alias: {
            'edf-app-loader': path.resolve(projectRootPath, './app-loader/index.js'),
            'edf-meta-engine': path.resolve(projectRootPath, './meta-engine/index.js'),
            'edf-component': path.resolve(projectRootPath, './component/index.js'),
            'edf-utils': path.resolve(projectRootPath, './utils/index.js'),
            'webapi': path.resolve(projectRootPath, './api/index.js'),
            'edf-consts': path.resolve(projectRootPath, './constant/consts.js'),
            'eharts': path.resolve(projectRootPath, './vendor/echarts.min.js'),
            'zrender': path.resolve(projectRootPath, './vendor/zrender.min.js')
        }
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
                    name: '[name].[hash:8].[ext]',
                    limit: 8192
                }
            }
        }],
    },
    devServer: {
        contentBase: './dist/',
        proxy: {
            //  '/v1/*': 'http://127.0.0.1:8008/',
        }
    },
    plugins: plugins
}