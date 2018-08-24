##运行环境步骤
* 1、npm install
* 2、npm start
* 3、http://localhost:8081

##后端服务地址配置

* webpack.config.js文件中修改devServer的后端服务地址

##开发模式与线上环境运行区别

* 开发模式 webpack 的NODE_ENV=developer或空，在打包后，会暴露更多的问题，开发模式下建议不指定的NODE_ENV
* 使用配置文件：webpack.config.js


* 线上模式 webpack 的NODE_ENV=production,会抛更少的错误，很多插件的内部做了线上环境的预处理
* 使用配置文件：webpack.config.prd.js