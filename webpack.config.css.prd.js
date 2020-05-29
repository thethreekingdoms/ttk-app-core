var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
// var ExtractTextPlugin = require("extract-text-webpack-plugin"); // webpack 3
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // webpack 4
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const CompressionWebpackPlugin = require('compression-webpack-plugin')
// ie9 下单个的css文件超过400k 不被解析
var CSSSplitWebpackPlugin = require("css-split-webpack-plugin").default;
const EnrichHtmlWebpackPlugin = require('./plugins/enrich-html-webpack-plugin')

const webpackCompileParams = require("./webpackCompileParams");
var env = process.env.NODE_ENV;
var plugins = [];

let useHash = process.env.NODE_ENV == "single" ? false : true;

let isSplitCss = false;
let start_params;
try {
    start_params = JSON.parse(process.env.npm_config_argv);
    if (!start_params ||
        (start_params &&
            (!start_params.original || start_params.original.length == 1))
    ) {
        start_params = false;
    }
    start_params = start_params.original.join("").toUpperCase();
} catch (err) {
    start_params = false;
}
isSplitCss = start_params.indexOf("SPLIT") > -1;
//node环境变量，生产环境：production，开发环境：development
plugins.push(
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env)
    })
);

//plugins.push(new webpack.ExtendedAPIPlugin())
plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

if (isSplitCss) {
    plugins.push(new CSSSplitWebpackPlugin({
        size: 3000
    }));
}

// plugins.push(new ExtractTextPlugin(`[name].${useHash ? "[hash:8]." : ""}css`)); //webpack 3
plugins.push(new MiniCssExtractPlugin({ // webpack 4
    //filename: `[name].${useHash ? "[hash:8]." : ""}css`,
    filename: '[name].css',
    chunkFilename: '[id].css',
}))
/*
plugins.push(new OptimizeCssAssetsPlugin(
    {
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: false
    }
))*/

// plugins.push(
//     new CompressionWebpackPlugin({
//         filename: '[path].gz[query]',   // 目标文件名
//         cache: true,
//         algorithm: 'gzip',   // 使用gzip压缩
//         test: /\.css(\?.*)?$/i,
//         compressionOptions: { level: 1 },
//         threshold: 8192,   // 资源文件大于时会被压缩
//         minRatio: 0.8  // 最小压缩比达到0.8时才会被压缩
//     })
// )

const {
    modifyVars
} = webpackCompileParams();
module.exports = {
    devtool: false,
    mode: 'production',
    entry: {
        businessBlueTheme: "./assets/styles/businessBlue.less",
        orangeTheme: "./assets/styles/orange.less",
        blueTheme: "./assets/styles/blue.less",
        yellowTheme: "./assets/styles/yellow.less",
        tax72Theme: "./assets/styles/tax72.less",
        ie: "./assets/styles/ie.less",
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                // 避免 cssnano 重新计算 z-index
                safe: true
            }
        })],
    },
    performance: {
        hints: false
    },
    output: {
        path: isSplitCss ?
            path.join(__dirname, "/dist/splitcss") :
            path.join(__dirname, "/dist/"),
        filename: "[name].min.js",
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [{
            test: /\.(css|less)/,
            use: [MiniCssExtractPlugin.loader, {
                loader: "css-loader"
            }, {
                loader: "less-loader",
                options: {
                    modifyVars: modifyVars,
                    javascriptEnabled: true
                }
            }]
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "img/[name].[hash:8].[ext]",
                    limit: 0,
                    // publicPath: '//static-erpdemo.jchl.com'
                }
            }
        }]
    },
    plugins: plugins
};
