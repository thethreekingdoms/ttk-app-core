var webpack = require("webpack")
var path = require("path")
var fs = require('fs')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
// ie9 下单个的css文件超过400k 不被解析
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default

const webpackCompileParams = require('./webpackCompileParams')
var env = process.env.NODE_ENV
var plugins = []

var projectRootPath = path.resolve(__dirname, './')

var defaultStyle = ["./assets/styles/businessBlue.less"]
var orangeStyle = ["./assets/styles/orange.less"]
var blueStyle = ["./assets/styles/blue.less"]
var yellowStyle = ["./assets/styles/yellow.less"]

let isUse = true


//node环境变量，生产环境：production，开发环境：development
plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

//plugins.push(new webpack.ExtendedAPIPlugin())
plugins.push(new webpack.optimize.ModuleConcatenationPlugin())


plugins.push(new CSSSplitWebpackPlugin({ size: 3000 }))

plugins.push(new ExtractTextPlugin('[name].css'))
/*
plugins.push(new OptimizeCssAssetsPlugin(
    {
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: false
    }
))*/

const { modifyVars } = webpackCompileParams()
module.exports = {
    devtool: false,
    entry: {
        businessBlueTheme: defaultStyle.concat(['./assets/apps/businessBlue.less']),
        orangeTheme: orangeStyle.concat(['./assets/apps/orange.less']),
        blueTheme: blueStyle.concat(['./assets/apps/blue.less']),
        yellowTheme: yellowStyle.concat(['./assets/apps/yellow.less']),
    },

    output: {
        path: path.join(__dirname, "/dist/splitcss"),
        filename: '[name].min.js',
        chunkFilename: '[name].chunk.js'
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
                    loader: "less-loader",
                    options: {
                        "modifyVars": modifyVars
                    }
                }]
            })
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
        proxy: {
            '/v1/*': 'http://debug.aierp.cn:8085/',
            '/share-oss/*': 'http://debug.aierp.cn:8085/',
        }
    },
    plugins: plugins
}
