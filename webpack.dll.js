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
		vendor: [
			'react',
			'react-dom',
			'antd',
			'redux',
			'prop-types',
			'react-redux',
			'ttk-rc-select',
			'moment',
			'md5',
			'immutable',
			'history',
			'classnames',
			'omit.js',
			'react-resizable',
			'react-viewer',
			'whatwg-fetch',
			'fixed-data-table-2'
		]
	},
	output: {
		path: path.join(__dirname, 'vendor'),
		filename: '[name].[chunkhash:8].dll.js',
		library: '[name]_lib',
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
			name: '[name]_lib',
			path: path.join(__dirname, 'vendor', '[name].manifest.json'),
		}),
		new ParallelUglifyPlugin({
			cacheDir: '.cache/',
			uglifyJS: {
				output: {
					comments: false
				}
			}
		}),

	],
};
