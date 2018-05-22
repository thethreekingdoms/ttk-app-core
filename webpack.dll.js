var path = require('path');
var webpack = require('webpack');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: false,
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		shim: [
			'console-polyfill',
			'es5-shim',
			'es5-shim/es5-sham',
			'html5shiv',
		],
		vendor: [
			'raf/polyfill',
			'babel-polyfill',
			'url-polyfill',
			'es6-promise',
			'react',
			'react-dom',
			'antd',
			'redux',
			'prop-types',
			'react-redux',
			'mk-rc-select',
			'moment',
			'md5',
			'immutable',
			'history',
			'fastclick',
			'classnames',
			'omit.js',
			'react-keydown',
			'react-resizable',
			'react-json-tree',
			'react-viewer',
			'whatwg-fetch',
			'fixed-data-table-2',
			'babel-standalone'
		]
	},
	output: {
		path: path.join(__dirname, 'vendor'),
		filename: '[name].dll.js',
		library: '[name]_[chunkhash:8]',
		// library 与 DllPlugin 中的 name 一致
	},
	plugins: [
		//new CleanWebpackPlugin(['vendor']),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') },
		}),
		new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),
		// new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new webpack.DllPlugin({
			context: __dirname,
			name: '[name]_[chunkhash:8]',
			path: path.join(__dirname, 'vendor', '[name].manifest.json'),
		}),
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
		}),

	],
};