var webpack = require("webpack")
var path = require("path")
var fs = require('fs')

var ManifestPlugin = require('webpack-manifest-plugin')
const es3ifyWebpackPlugin = require('es3ify-webpack-plugin-v2')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const webpackCompileParams = require('./webpackCompileParams')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // webpack 4

const PublicPathWebpackPlugin = require('./plugins/public-path-webpack-plugin')

var env = process.env.NODE_ENV
var plugins = []

var projectRootPath = path.resolve(__dirname, './')

var version_ie8 = './compatible/dist/index.html'

const version_ie8_bol = fs.existsSync(path.resolve(projectRootPath, version_ie8))

const CleanWebpackPlugin = require('clean-webpack-plugin')


//node环境变量，生产环境：production，开发环境：development
plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

//plugins.push(new webpack.ExtendedAPIPlugin())
plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: merge(require('./vendor/vendor.manifest.json')),
}))

plugins.push(new ManifestPlugin())
plugins.push(new es3ifyWebpackPlugin())
plugins.push(new webpack.NoEmitOnErrorsPlugin())

plugins.push(new LodashModuleReplacementPlugin)

// plugins.push(new ExtractTextPlugin('[name].[chunkhash:8].css')) // webpack 3
plugins.push(new MiniCssExtractPlugin({ // webpack 4
    filename: '[name].[chunkhash:8].css',
    chunkFilename: '[id].css',
}))
const { aliasModule } = webpackCompileParams()

const argv = JSON.parse(process.env.npm_config_argv)
let argName = null

switch (argv.original[2]) {
    case '--edf': argName = 'edf'
        break;
}

console.log('开始构建---- apps/' + argName + ' 模块')


plugins.push(new CleanWebpackPlugin([`dist/${argName}`], {
    root: __dirname
}))

// plugins.push(
//     new ParallelUglifyPlugin({
//         cacheDir: '.cache/',
//         uglifyJS: {
//             output: {
//                 comments: false
//             }
//         }
//     })
// )


// plugins.push(new BundleAnalyzerPlugin())


let entryConfig = {
    [argName]: ["edf-app-loader", "edf-meta-engine", "edf-component", "edf-consts", "edf-utils", "webapi", `./apps/${argName}/index.js`],
    // [`${argName}BlackTheme`]: `./apps/${argName}/theme/black.less`,
    [`${argName}BusinessBlueTheme`]: `./apps/${argName}/theme/businessBlue.less`,
    [`${argName}OrangeTheme`]: `./apps/${argName}/theme/orange.less`,
    [`${argName}YellowTheme`]: `./apps/${argName}/theme/yellow.less`,
    [`${argName}BlueTheme`]: `./apps/${argName}/theme/blue.less`,
    [`${argName}Tax72Theme`]: `./apps/${argName}/theme/tax72.less`,
}


module.exports = {
    devtool: false,
    mode: 'production',
    entry: entryConfig,
    output: {
        path: path.join(__dirname, `/dist/${argName}`),
        filename: '[name].[chunkhash:8].min.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        // filename: '[name].min.js',
        // chunkFilename: '[name].chunk.js',
        publicPath: `/${argName}/`,
        jsonpFunction: `${argName}WebpackJsonp`
    },
    resolve: {
        extensions: [".js"],
        alias: Object.assign({
            'edf-app-loader': path.resolve(projectRootPath, './global/edf-app-loader.js'),
            'edf-meta-engine': path.resolve(projectRootPath, './global/edf-meta-engine.js'),
            'edf-component': path.resolve(projectRootPath, './global/edf-component.js'),
            'edf-utils': path.resolve(projectRootPath, './global/edf-utils.js'),
            'webapi': path.resolve(projectRootPath, './global/webapi.js'),
            'edf-consts': path.resolve(projectRootPath, './global/edf-consts.js'),
            'edf-constant': path.resolve(projectRootPath, './global/edf-constant.js'),
            'eharts': path.resolve(projectRootPath, './vendor/echarts.min.js'),
            'zrender': path.resolve(projectRootPath, './vendor/zrender.min.js'),
            'Theme': '@ttk/component/dist/theme'
        }, aliasModule)
    },
    externals: {
        "echarts": 'echarts',
        "zrender": 'zrender',
    },
    module: {
        rules: [{
            test: /\.(css|less)/,
            use: [MiniCssExtractPlugin.loader, { // webpack 4
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
            /*use: ExtractTextPlugin.extract({ // webpack 3
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "less-loader"
                }]
            })*/
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
                    name: 'img/[name].[hash:8].[ext]',
                    limit: 0
                }
            }
        }]
    },
    optimization: {
        splitChunks: { // webpack 4
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        usedExports: true,
    },
    performance: {
        hints: false
    },
    plugins: plugins
}
