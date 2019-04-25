var webpack = require("webpack")
var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const HappyPack = require('happypack')

const webpackCompileParams = require('./webpackCompileParams')

var env = process.env.NODE_ENV

var plugins = [
    new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') },
    }),
    new webpack.DllPlugin({
        context: __dirname,
        name: '[name]_lib',
        path: path.join(__dirname, 'edf-vendor', '[name].manifest.json'),
    }),
]

var projectRootPath = path.resolve(__dirname, './')
const happyThreadPool = HappyPack.ThreadPool({ size: 12 });


plugins.push(new ExtractTextPlugin('[name].css'))


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


module.exports = {
    devtool: false, 
    // devtool: 'source-map',
    entry: {
        edf: [
            'react',
            'react-dom',
            'antd',
            'redux',
            'prop-types',
            'react-redux',
            'ttk-rc-select',
            'ttk-rc-intro',
            'moment',
            'md5',
            'immutable',
            'history',
            'classnames',
            'omit.js',
            'react-keydown',
            'react-resizable',
            'react-json-tree',
            'react-viewer',
            'whatwg-fetch',
            'maka-fixed-data-table',
            "edf-app-loader", "edf-meta-engine", "edf-component", "edf-consts", "edf-utils", "webapi"
        ],
    },

    output: {
        path: path.join(__dirname, 'edf-vendor'),
        filename: '[name].dll.js',
        library: '[name]_lib',
        // library 与 DllPlugin 中的 name 一致
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
                    limit: 81920
                }
            }
        }],
    },
    
    plugins: plugins
}
