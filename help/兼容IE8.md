## 兼容解决方案

antd组件库本身兼容到ie9浏览器。

### react 15

对于使用了`axios`这个请求库的项目，因为他使用了Promise语法，所以需要引入`es6-promise`的兼容包。

而对于使用其他es6语法的包或项目，需要使用`babel-polyfill`(包含promise)来进行语法兼容。

- 入口文件处引入

先下载安装

```
npm install -S babel-polyfill
```
再在入口文件处引入
```
import 'babel-ployfill'
```
- 使用script标签引入

```
<script src="http://cdn.*.com/polyfill.min.js"></script>

```


- webpack引入,修改wabpack配置文件的入口

```
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```


### react 16

对于老浏览器（ie < 11）

因为reactv16使用了map和set需要使用引入babel-polyfill或者使用core-js

如果使用core-js,在入口处

```
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
```

如果使用babel-polyfill

```
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
```

react也使用了`requestAnimationFrame`,可以使用`raf`包来兼容。

```
import 'raf/polyfill'
```


### 兼容 IE8

首先，你不应该使用 React v15 或更高版本。使用仍然支持 IE8 的 React v0.14 即可。

如果你需要查看 React v0.14 的文档，请访问：http://react-ie8.xcatliu.com

#### 使用 CommonJS

强烈推荐使用 CommonJS 风格来引入需要的模块。

首先安装这些模块：

```shell
npm install --save es5-shim console-polyfill
```

然后把以下代码插入到*入口文件最前面*：

```js
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
```

也可以使用我们提供的CDN的polyfill文件,放在所有js上面。

里面包含了`es5-shim`、`es5-sham`、`console-polyfill`、`babel-polyfill`文件

```
<script src="://cdn.*.com/polyfill.js"></script>
```

#### 其他问题

一些问题其实并不是 `React` 的问题，不过我也把他们列出来了：

错误信息 | 原因 | 解决方案 | 相关 Issue | 示例
-------- | ---- | -------- | ---------- | ----
`Expected identifier` | 代码中或者第三方模块中使用了保留字，比如 `default` | 使用 [es3ify] 或者 [es3ify-loader] | [#1] | [Fetch IE8]
`Exception thrown and not caught` | babel 把 `export * from 'xxx'` 编译成了 `Object.defineProperty`，而 IE8 中不支持 accessor property | 把 `require('es5-shim')` `require('es5-shim/es5-sham')` 插入到入口文件的最上方，并且在代码中不要使用 `export * from 'xxx'` | [#2][#2] [#32][#32] | [Hello World]
`Object expected` | 可能你使用了 `fetch` | 用 `es6-promise` 和 `fetch-ie8` polyfill | [#4] | [Fetch IE8]
`'Promise' is undefined` | `Promise` 需要 polyfill | 用 `es6-promise` polyfill | [#5] | [Fetch IE8]
`Object doesn't support this property or method` | 可能你使用了 `Object.assign` | 用 `core-js` polyfill | [#7] | [Object Assign]
`'JSON' is undefined` | 需要使用 IE8 Standards Mode | 添加 `<!DOCTYPE html>` 和 `<meta http-equiv="X-UA-Compatible" content="IE=EDGE"/>` | [#8] | [Hello World]
