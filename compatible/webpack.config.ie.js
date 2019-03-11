// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('etool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
var CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
var projectRootPath = path.resolve(__dirname, './')

const copyFile = require('./copyFile.js')
copyFile()

module.exports = function (webpackConfig) {
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    title: '企业开发平台',
    template: './index-dev.ejs',
    filename: 'index.html'
  }))
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push('transform-decorators-legacy');
  // webpackConfig.babel.plugins.push(['antd', {
  //   style: 'css',  // if true, use less
  // }]);
  webpackConfig.plugins.push(new CSSSplitWebpackPlugin({ size: 3000 }))
  // Enable this if you have to support IE8.
  webpackConfig.module.loaders.unshift({
    test: /\.js?$/,
    loader: 'es3ify-loader',
  });

  webpackConfig.module.loaders.push({
    test: /\.(eot|svg|ttf|woff|woff2)\w*/,
    loader: 'url-loader?limit=10000',
  })

  if (webpackConfig.UglifyJsPluginConfig) {
    webpackConfig.UglifyJsPluginConfig.output.beautify = false
    webpackConfig.UglifyJsPluginConfig.mangle = false
  }


  // Parse all less files as css module.
  // webpackConfig.module.loaders.forEach(function (loader, index) {
  // if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
  //   loader.test = /\.dont\.exist\.file/;
  // }
  // if (loader.test.toString() === '/\\.module\\.less$/') {
  //   loader.test = /\.less$/;
  // }
  // if (loader.loader && loader.loader.indexOf('babel-loader') > -1) {
  // if( loader.query && loader.query.presets ) {
  //   loader.query.presets.push(['es2015', { loose: true, modules: false }])
  // }else {
  //   loader.query = {
  //     presets: [ ['es2015', { loose: true, modules: false }] ]
  //   }
  // }
  // }
  // });
  webpackConfig.entry = {
    index: './index.js',
    // edf: ["edf-app-loader", "edf-meta-engine", "edf-component", "edf-consts", "edf-utils"],
    // edf: ["edf-app-loader", "edf-meta-engine", "edf-component", "edf-consts", "edf-utils", "webapi"],
    businessBlue: "./assets/styles/businessBlue.css",
    ie: "./assets/styles/ie.css",
    icon: "./component/assets/style/iconset.css",
  }
  webpackConfig.output.path = webpackConfig.output.path
  console.log(webpackConfig.output.path)
  // 多入口
  /*  const files = glob.sync('./src/entries*//*.js');
  const newEntries = files.reduce(function(memo, file) {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);*/

  /**
   * 全局别名，可以 require('src') 这样使用
   */
  webpackConfig.resolve.alias = {
    'edf-app-loader': path.resolve(projectRootPath, './app-loader/index.js'),
    'edf-meta-engine': path.resolve(projectRootPath, './meta-engine/index.js'),
    'edf-utils': path.resolve(projectRootPath, './utils/ie8.js'),
    'edf-component': path.resolve(projectRootPath, './component/ie8.js'),
    'webapi': path.resolve(projectRootPath, './api/index.js'),
    'edf-consts': path.resolve(projectRootPath, './constant/consts.js'),
    'edf-constant': path.resolve(projectRootPath, './constant/index.js')
  };
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
  );
  var Copyfile = new CopyWebpackPlugin([{
    from: './transreport',
    to: './ie8',
    ignore: ['.*']
  }])
  var clearFile = new CleanWebpackPlugin(['dist'], {
    root: __dirname
  })
  var [CommonsChunkPlugin, ExtractTextPlugin, OccurrenceOrderPlugin, ProgressPlugin, NpmInstallPlugin, ...more] = webpackConfig.plugins;
  webpackConfig.plugins = [clearFile, CommonsChunkPlugin, ExtractTextPlugin, OccurrenceOrderPlugin, ProgressPlugin, Copyfile, ...more];

  return webpackConfig;
};
