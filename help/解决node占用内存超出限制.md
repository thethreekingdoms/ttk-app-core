## webpack打包时，报了上述错误，这是node内存溢出的问题，解决方案如下：

1. 全局安装increase-memory-limit,命令如下：

### ==npm i -g increase-memory-limit==

2. 进入项目目录，执行下列命令：

###  ==increase-memory-limit==

通过上述步骤后，再次进行打包，不会再报错误。 