前端框架Vue、React 和 Angular（数据对比）

### 一些历史

**Angular** 是基于 TypeScript 的 Javascript 框架。由 Google 进行开发和维护，它被描述为“超级厉害的 JavaScript [MVW](https://plus.google.com/+AngularJS/posts/aZNVhj355G2) 框架”。Angular（也被称为 “Angular 2+”，“Angular 2” 或者 “ng2”）已被重写，是与 AngularJS（也被称为 “Angular.js” 或 “AngularJS 1.x”）不兼容的后续版本。当 AngularJS（旧版本）最初于2010年10月发布时，仍然在[修复bug](https://github.com/angular/angular.js)，等等 —— 新的 Angular（sans JS）于 2016 年 9 月推出版本 2。最新的主版本是 4，[因为版本 3 被跳过了](https://www.infoworld.com/article/3150716/application-development/forget-angular-3-google-skips-straight-to-angular-4.html)。

**React** 被描述为 “用于构建用户界面的 JavaScript 库”。React 最初于 2013 年 3 月发布，由 Facebook 进行开发和维护，Facebook 在多个页面上使用 React 组件（但不是作为单页应用程序）。

**Vue** 是 2016 年发展最为迅速的 JS 框架之一。Vue 将自己描述为一款“用于构建直观，快速和组件化交互式界面的 [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) 框架”。它于 2014 年 2 月首次由 Google 前员工 [Evan You](https://github.com/yyx990803) 发布。

### 背景对比 

对比 | Vue | React | Angular 
:-----: | :-----: | :----: | :----: 
出现年月 | 2014-2 | 2013-3 | 2010-10 
框架类型 | MVVM | MVC | MVW 
开源许可 | MIT license | BSD3-license | MIT license 


* [MIT许可协议（The MIT License）](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)是许多软件许可条款中，被广泛使用的其中一种。与其他常见的软件许可协议（如GPL、LGPL、BSD）相比，MIT是相对宽松的软件许可协议。

* [BSD 许可协议（Berkeley Software Distribution license）](https://zh.wikipedia.org/wiki/BSD%E8%AE%B8%E5%8F%AF%E8%AF%81)，是自由软件中使用最广泛的许可协议之一。BSD 就是遵照这个许可证来发布，也因此而得名 BSD 许可协议。
> MIT license 与 BSD-license 之间的区别是：MIT license 允许衍生软件加上我们自己的名字做推广，而 BSD license 不可以。

--------------------------------------


### 开发对比

|  | Vue | React | Angular |
| :----: | :----: | :----: | :----: 
| 开发与维护 | 独立开发者 | Facebook | Google |
| 团队人数 | [25](https://cn.vuejs.org/v2/guide/team.html) | 未知 | [40](https://angular.io/about?group=Angular) |


--------------------------------------------


### GitHub Stats

|  | stars | forks | issues |updated | created |
| ------- | -----: | -----: | -----: | -----: | -----: |
| [angular.js](https://github.com/angular/angular.js) | 59308 | 29000 | 487 | Dec 18, 2018 | Jan 6,2010 |
| [Vue](https://github.com/vuejs/vue) | 122678 | 17540 | 230 | Dec 20, 2018 | Jul 29,2013 |
| [React](https://github.com/facebook/react) | 117977 | 21403 | 525 | Dec 20, 2018 | May 25,2013 |
| [angular](https://github.com/angular/angular) | 43663 | 11223 | 2618 | Dec 20, 2018 | Sep 19,2014 |


统计的数据有时效性，如需了解最新的数据[点我](https://www.npmtrends.com/angular-vs-react-vs-vue-vs-@angular/core)

-------------------------------

### 流行度对比
1. 国内流行度

    [百度指数](http://index.baidu.com/v2/main/index.html#/trend/vue?words=vue,react,angular)上的一个比较

   1. 搜索指数：指的是关键词最近一个月的总体搜索指数表现。

     * 日均值：一段时间内搜索指数日均值。
           
     * 同比：与去年同期的同比变化率。
           
     * 环比：与上一个相邻时间段（即上一个7天/30天）的环比变化率。
  
    ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/baidu%20num.png)


   2. 搜索指数趋势：互联网用户对键词搜索关注程度及持续变化情况。

     * 算法说明：以网民在百度的搜索量为数据基础，以关键词为统计对象，科学分析并计算出各个关键词在百度网页搜索中搜索频次的加权。

      ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/baidu%20chart.png)

2. 国外流行度 

  * [npm趋势](https://www.npmtrends.com/angular-vs-react-vs-vue-vs-@angular/core)
    
    ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/npm.png)



  * [谷歌趋势](https://trends.google.com/trends/explore?q=vue,react,angular)

  1. 热度随时间变化的趋势

      * 算法说明：数字代表相对于图表中指定区域和指定时间内最高点的搜索热度。热度最高的字词得 100 分；热度是前者一半的字词得 50 分；没有足够数据的字词得 0 分。

      ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/Time%20trend.png)
  
  2. 按区域比较细分数据

      ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/Compared%20breakdown%20by%20region.png)


  * stackoverflow

    Stack Overflow 是一个与程序相关的 IT 技术问答网站。该网站拥有 400 万用户，每月 5.6 亿的页面浏览量。

    我们对 [Stack Overflow 2018](https://insights.stackoverflow.com/survey/2018) 调查报告 进行分析（数据统计时间与本文时间差距较远，数据存在延后）。

    * 目前最流行的技术框架排名：
    ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/Stack%20Overflow%20hot.png)

    Angular 与 React 排名靠前，Vue 未上榜。

    * 目前大家最喜爱的技术框架排名：
    ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/Stack%20Overflow%20like.png)

    相对 Angular 来说，React 的表现很抢眼，Vue 未上榜。
  
  * statejs

    statejs 网站使用了一套包含上百个问题的问卷调查，从超过 20000 名开发者中得出的 2018 年关于前端框架调查，[结果](https://2018.stateofjs.com/front-end-frameworks/overview/) 如下：

    ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/stateofjs.png)

    较多开发者想学 Vue，而 React 拥有最多的开发者。

  > 总结：国内 流行 Vue，国外流行 React。

  ------------------------------

### 技术对比
    
| 对比 | Vue | React | Angular | 
| :----: | :----: | :----: | :----: |
| 基于组件 | 擅长 | 擅长 | - |
| 依赖标准 | ES6 或 ES6 | ES6 | TypeScript |
| 底层技术 | 单个文件（模板+脚本+样式） | JSX | 模板 |
| 数据绑定 | 单/双向绑定 | 单向绑定 | 双向绑定 |
| 支持原生开发 | 支持（Weex） | 支持（react-native/react-native-renderer） | 支持（NativeScript、Ionic） |
| 服务端渲染 | nuxt.js | next.js | Angular Universal |
| 浏览器兼容 | ie8以上 | ie9及以上 |  ie8 + | 
| 学习曲线 | 简单 | 中等 | 陡峭 |

1. 基于组件：一个组件得到一个输入，并且在一些内部的行为/计算之后，它返回一个渲染的 UI 模板作为输出。定义的组件可以很容易在网页或其他组件中重用。
   
2. 依赖标准：Vue 与 React 使用的都是 javaScript 语言标准，差别不大。Angular 是 javaScript 的超集，添加了可选的静态类型和基于类的面向对象编程；但与整个 JavaScript 语言相比，目前 TypeScript 的用户群仍然很小。
   
3. 底层技术 
  * Vue 具有[“单个文件组件”](https://cn.vuejs.org/v2/guide/single-file-components.html)。这似乎是对于关注分离的权衡 - 模板，脚本和样式在一个文件中，但在三个不同的有序部分中。这意味着你可以获得语法高亮，CSS 支持以及更容易使用预处理器（如 Jade 或 SCSS）。

  * React 的 JSX 是一个类似 HTML 语法的可选预处理器，并可在 JavaScript 中进行编译。因为代码写在同一个地方，所以可以在代码完成和编译时更好地检查。如果在 JSX 中输入错误时，React 将无法通过编译，它会打印出错的位置。

  * Angular 模板使用特殊的 Angular 语法（比如 ngIf 或 ngFor）来增强 HTML。虽然 React 需要 JavaScript 的知识，但 Angular 会迫使你学习 [Angular 特有的语法](https://angular.io/guide/cheatsheet)。
         
4. 数据绑定：当 UI 元素（例如，用户输入）被更新时，Angular 的双向绑定会改变 model 状态。Angular 的方式实现起来代码更干净，开发人员更容易实现。在 React 中实现该功能，必须先更新 model，然后渲染 UI 元素。React 的方式会有更好的数据总览，因为数据只能在一个方向上流动，这样更容易调试。
   
5. 支持原生：Angular 拥有用于原生应用的 [NativeScript](https://docs.nativescript.org/start/introduction)（由 Telerik 支持）和用于混合开发的 Ionic 框架。借助 React，你可以试试 [react-native-renderer](http://angularjs.blogspot.de/2016/04/angular-2-react-native.html) 来构建跨平台的 iOS 和 Android 应用程序，或者用 [react-native](https://facebook.github.io/react-native/) 开发原生 app。
    [Weex](https://weex.apache.org/) 允许你使用 Vue 语法开发不仅仅可以运行在浏览器端，还能被用于开发 iOS 和 Android 上的原生应用的组件。另一个选择是 [NativeScript-Vue](https://nativescript-vue.org/)，一个用 Vue.js 构建完全原生应用的 NativeScript 插件。

6. 服务端渲染：Javascript 框架在客户端上渲染页面。这对于性能，整体用户体验和 SEO 是不利的。服务器端预渲染是一个好办法。所有这三个框架都有相应的库来实现服务端渲染。React 有 next.js，Vue 有 nuxt.js，而 Angular 有...... [Angular Universal](https://angular.io/guide/universal)。
     
7. 浏览器兼容：
  * React兼容所有常用的浏览器，包括IE9及以上的版本。
    > 注意：我们不支持那些不兼容ES5方法的老版浏览器，但如果你的应用包含了polyfill，例如es5-shim 和 es5-sham，你可能会发现你的应用仍然可以在这些浏览器中正常运行。如果你选择这么干，你就只能孤军奋战了。
        
  * Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有[兼容 ECMAScript 5 的浏览器](https://caniuse.com/#feat=es5)。
    
   
8. 学习曲线：
  * Angular 的学习曲线是非常陡峭的——作为一个框架，它的 API 面积比起 Vue 要大得多，你也因此需要理解更多的概念才能开始有效率地工作。当然，Angular 本身的复杂度是因为它的设计目标就是只针对大型的复杂应用；但不可否认的是，这也使得它对于经验不甚丰富的开发者相当的不友好。

  * 对于 React，你可能需要针对第三方库进行大量重大决策。仅仅 React 中就有 16 种[不同的 flux 软件包来用于状态管理](https://github.com/voronianski/flux-comparison)可供选择。

  * Vue，你只需要有良好的 HTML 和 JavaScript 基础。有了这些基本的技能，你就可以非常快速地通过阅读 [指南](https://cn.vuejs.org/v2/guide/) 投入开发

    ------------------------------------------

### 体积和性能
 1. 体积

    任何框架都不会十全十美：Angular 框架非常臃肿。gzip 文件大小为 143k，而 Vue 为 23K，React 为 43k。
    >为了提高性能，React 和 Vue 都使用了虚拟 DOM（Virtual DOM）。
    
2. 性能

    ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/xingneng.png)

    Angular，React 和 Vue 性能比较[（源文件）](https://www.stefankrause.net/js-frameworks-benchmark6/webdriver-ts-results/table.html)

3. 内存分配
        
    ![image](https://raw.githubusercontent.com/HankBass/front-end-frameworks-comparison/master/images/ram.png)

    内存分配[（源文件）](https://www.stefankrause.net/js-frameworks-benchmark6/webdriver-ts-results/table.html)

    > 总结一下：Vue 有着很好的性能和高深的内存分配技巧。如果比较快慢的话，这些框架都非常接近（比如 [Inferno](https://www.stefankrause.net/js-frameworks-benchmark6/webdriver-ts-results/table.html)）。请记住，性能基准只能作为考虑的附注，而不是作为判断标准。

