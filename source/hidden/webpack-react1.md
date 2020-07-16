---
title: 基于webpack4搭建一个简单的React脚手架 （一）
date: 2018-08-21 16:37:57
tags:
    - React
    - webpack
cover: https://images.pexels.com/photos/1352092/pexels-photo-1352092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260

---

![](https://s3.amazonaws.com/123rf-chrome/images/47188652_xl.jpg)

搭建一个React 脚手架的方法有很多， 官方也有现成的脚手架， 但是还是想自己从头开始，一点一点自己实现一遍， 仅以此文记录一下实现过程~


本文参考文章： 
 1. [<font color=#518dca>webpack4 官方文档</font>][1]
 2. [<font color=#518dca>从零搭建 webpack4+react 脚手架</font>][5]
 3. [<font color=#518dca>使用 webpack 定制前端开发环境</font>][6]



 <!-- more -->

## 开始前准备

  在开始前请先确保 安装了Node.js 的最新版本（推荐安装最新的稳定版）。

  项目中可以使用 npm 和 yarn 安装依赖， 本项目中使用了yarn。

  [<font color=#518dca>项目git地址</font>][0]

  [<font color=#518dca>webpack4 官方文档 ，请戳这里~</font>][1]

  现在， 我们开始吧~

## 初始化

#### 1. 新建文件夹
    mkdir webpackDemo && cd webpackDemo
#### 2. 初始化 package.json 
    yarn init
#### 3. 创建 ./src/index.js
 新建一个./src/index.js文件， 作为我们的入口文件。
 我们可以在里面输入任意的js代码。
```
console.log('从我开始~');
```
#### 4. webpack 简单尝试
 首先， 我们需要在项目中安装webpack依赖，需要注意的是 webpack-cli是webpack的命令行工具， 在4.X 版本之后需要安装使用

    yarn add webpack webpack-cli -D

 接下来， 我们在 package.json 添加 npm script 
```
"scripts" : { 
    "build":"webpack"
}
```

然后我们可以在终端执行 yarn build, 查看效果。打包完成后， 可以发现我们的项目中多了一个dist文件夹， 里面是我们打包之后的文件。可以在 dist中 新建一个 html 文件， 并且引用 一下打包好的文件， 在浏览器中运行一下这个html 文件， 我们就可以在控制台中看到输出内容了。


package.json: 

```
{
  "name": "webpackDemo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts" : { 
    "build":"webpack"
  },
  "devDependencies": {
    "webpack": "^4.17.0",
    "webpack-cli": "^3.1.0"
  }
}
```

#### 5. 一个简单的webpack 配置
从 webapck v4.x 开始， 可以不需要引入配置文件， 但是， webpack的很多功能还是需要通过配置文件来实现。 首先， 新建一个 webpack.config.js 文件，（开发和生产环境之间的配置差异 我们会在后续的章节中继续补充）。

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};
```

##  搭建基本开发环境

#### 1.  安装 react， react-dom

 在终端运行以下命令

    yarn add react react-dom -D

新建 .src/index.html 文件

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack demo</title>
</head>
<body>
    <div id="root"></div>
    <script type="text/javascript" src="../dist/bundle.js"></script>
</body>
</html>
```

更新 ./src/index.js

```
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
    <div>Hello world</div>,
    document.getElementById("root")
);
```

#### 2. bable-loader
 
 webpack只能识别编译es5 的JavaScript 文件，所以我们使用 es6 和 jsx 语句时， webpack 并不能 识别， 我们需要 使用 bable-loader， 把 webpack 不认识的语句转译成webpack 可以识别的语句。

 安装 babel

    yarn add babel-core babel-loader babel-preset-env babel-preset-react -D

 新建 .babelrc 文件， 进行babel配置

 ```
 {
  "presets": ["env","react"],
}
 ```

 修改 webpack.config.js文件

 ```
 module.exports = {
  // ...
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
    ]
  },
};
 ```

此时 我们在终端 执行 yarn build , 然后在浏览器中打开src中的 index.html, 便可以发现我们的页面可以显示 我们输入的 hello world了。

#### 3. 使用html-webpack-plugin对html打包。

 在上面的例子中， 我们是在 src 中 index.html 中引用了打包之后的js文件， 然后在浏览器中进行渲染。如果这个时候， 我们更改了入口文件， 或者更新了打包后文件的名称， 我们还需要手动更新html 文件中的内容。 这个问题可以通过[html-webpack-plugin][2]来解决这个问题。

    yarn add html-webpack-plugin -D

 更新 ./src/index.html

 ```
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
 ```

 更新 webpack.config.js

 ```
 const HtmlWebPackPlugin = require('html-webpack-plugin');

 module.exports = {
  // ...
  module: {
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "index.html"
        }),
    ],
  },
};
 ```

#### 4. 使用clean-webpack-plugin清理 /dist 文件夹

  每次我们打包的时候，/dist 文件中会保存此次打包产生的文件， 并不会主动清理， 时间久了， 就会让我们的/dist 文件夹变得混乱， 我们可以使用 [clean-webpack-plugin][3]在每次打包时先清空/dist 文件夹

    yarn add clean-webpack-plugin -D

  更新 webpack.config.js

 ```
 const CleanWebpackPlugin = require('clean-webpack-plugin');

 module.exports = {
  // ...
  module: {
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "index.html"
        }),
    ],
  },
};
 ```

#### 5.使用 webpack-dev-server
  我们在编译时， 如果每次编译，需要手动执行 yarn build 就会很麻烦， webpack 中有几种方式， 可以帮我们实现 代码的实时编辑。(具体 可以查看 [webpack 官方文档][4] )
    
    1. webpack's Watch Mode
    2. webpack-dev-server
    3. webpack-dev-middleware

 我们这里采用了 webpack-dev-server 的方式。

    yarn add webpack-dev-server -D

 修改 package.json

 ```
 "scripts": {
    "start": "webpack-dev-server --mode development --open --inline --progress",
    "build": "webpack --mode production"
  },
 ```

 修改 webpack.config.js
 ```
 module.exports = {
  // ...
  module: {
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        compress:true,
        port:8033,
    }
  },
};
 ```

#### 6. 模块热替换 
 
 因为我们使用了webpack-dev-server， 要实现模块的热更新， 我们可以更新  webpack-dev-server 的配置， 启用webpack 内置的 HMR 插件。

 ```
const webpack = require('webpack');
module.exports = {
  // ...
  module: {
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        compress:true,
        port:8033,
        hot: true,
    }
  },
};
 ```


最终我们的 配置文件 webpack.config.js
 ```
 const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    contentBase:path.join(__dirname,"dist"),
    compress:true,
    port:8033,
    hot: true,
  }
};
 ```


  [0]: https://github.com/LucineXL/webpackAndReact
  [1]: https://www.webpackjs.com/concepts/
  [2]: https://www.webpackjs.com/plugins/html-webpack-plugin/
  [3]: https://www.npmjs.com/package/clean-webpack-plugin
  [4]: https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-middleware
  [5]: https://xiaozhuanlan.com/fefe
  [6]: https://juejin.im/book/5a6abad5518825733c144469
