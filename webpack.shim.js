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
		shim: './shim.js'
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
