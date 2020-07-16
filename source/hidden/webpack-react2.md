---
title: 基于webpack4搭建一个简单的React脚手架 （二）
date: 2018-08-27 16:36:01
tags:
    - React
    - webpack
cover: https://images.pexels.com/photos/735647/pexels-photo-735647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---

  上一篇文章我们已经基本实现了一个简单的框架， 现在， 我们继续把我们的项目完善一下~

  [<font color=#518dca>上一篇：基于 webpack4 搭建 一个简单 的 React 脚手架 （一）</font>][1]

  [<font color=#518dca>项目git地址</font>][0]

  [<font color=#518dca>webpack4 官方文档 ，请戳这里~</font>][2]


## 生产环境构建
   
   开发环境(development)和生产环境(production)的构建目标差异很大, 所以我们在使用时通常会为每个环境编写一个独立的配置文件。为了出现大量的重复代码， 我们可以提取一个公共的配置文件， 通过  webpack-merge 可以把webpack合并起来。

   webpack-merge 安装

     yarn add webpack-merge -D

   最终， 我们的 代码结构如下：
```
dist
src
.babelrc
package.json
webpack
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```


   webpack.common.js:

```
const path = require('path');

module.exports = {
entry: {
    app: './src/index.js'
},
module: {
    rules: [
        {
            test: /\.js$/,
            include: path.resolve(__dirname, '../src'),
            use: {
                loader: "babel-loader"
            }
        }
    ]
},
plugins: [],
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
}
};
```

   webpack.dev.js

```
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer:{
    contentBase:path.join(__dirname,"../src"),
    compress: true,
    port: 8033,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: {
          html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
});
```

   webpack.prod.js


```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins:[
    new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
    new HtmlWebpackPlugin({
        minify:{ //是对html文件进行压缩
            removeAttributeQuotes: true  //removeAttrubuteQuotes是却掉属性的双引号。
        },
        hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
        template:'./src/index.html' //是要打包的html模版路径和文件名称。
    })
  ],
});
```

## 资源管理

#### 1. 加载css

安装 style-loader css-loade
    
    yarn add style-loader css-loader -D

webpack.config.js

```
module.exports = {
   // ...
   module: {
     rules: [
       // ...
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ]
   }
};
```

#### 2. 加载图片、字体

我们在写项目中引用路径的时候，填写的URL是基于我们开发时的路径， 但是在webpack打包时， 会将各个模块打包成一个文件，里面引用的路径是相对于入口html文件，并不是相对于我们的原始文件路径的。loader 可以解析项目中引入的URL，并且根据配置，把图片拷贝到相应路径， 再将打包后的文件中的路径 替换为图像的最终路径。 

file-loader 和 url-loader 都可以解决这个问题。 但是url-loader会将引入的图片进行编码， 我们引用的时候只需要引入这个文件就可以访问图片了， 可以大大减少 HTTP请求的次数。

url-loader 封装了 file-loader， 但并不依赖他， 所以我们可以只需要安装 url-loader就可以了。

安装 file-loader, url-loader 

    yarn add file-loader url-loader -D

webpack.config.js

```
module.exports = {
   // ...
   module: {
     rules: [
       // ...
       // 加载图片
       {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader', //是指定使用的loader和loader的配置参数
                    options: {
                        limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath:'images/',  //打包后的图片放到images文件夹下
                    }
                }
            ]
        },
        // 加载字体文件
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
            'file-loader'
            ]
        }
     ]
   }
};
```

#### 3. 加载数据

  csv-loader、xml-loader 可以处理CSV、TSV 和 XML这三类文件。

  安装 csv-loader、xml-loader

     yarn add csv-loader xml-loader -D

  webpack.config.js
```
module.exports = {
   // ...
   module: {
     rules: [
       // ...
       {
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }
     ]
   }
};
```

## 压缩输出

#### 1. 使用uglifyjs-webpack-plugin对打包后的文件进行压缩

uglifyjs-webpack-plugin （js 压缩插件）， 在webpack中默认集成，不需要额外安装。

webpack.prod.js

```
const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
   // ...
   plugins:[
       // ...
       new uglify()
   ],
}
```

## 关于 css
#### 1. css 文件抽离

在webpack4 版本中， 我们可以使用 mini-css-extract-plugin 插件， 将打包在js文件中的css抽离出来

安装 mini-css-extract-plugin

    yarn add mini-css-extract-plugin -D

webpack.prod.conf.js
```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules:
            [
                {
                    test: /\.(css)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                            }
                        },
                        {
                            loader: 'css-loader',
                        }
                    ]
                }
            ]
    },
    plugins:[
        // ...
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        }),
    ]
}

```

#### 2. css 压缩

使用 optimize-css-assets-webpack-plugin 插件来压缩 css

    yarn add optimize-css-assets-webpack-plugin -D

webpack.prod.js

```
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // ...
    plugins:[
        // ...
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:  /\.css\.*(?!.*map)/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ]
}
```

#### 3. less or sass


安装 sass-loader/less-loader, 需注意若使用的是 sass, 还需要安装 node-sass;

    yarn add node-sass sass-loader -D

webpack.dev.js

```
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.scss$/,
                use: [
                'style-loader',
                'css-loader',
                'sass-loader'
                ]
            },
        ]
    }
}
```

webpack.prod.js

```
module.exports = {
    // ...
    module: {
        rules: [
            // ...
             {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    {
                        loader: 'css-loader',
                    }, {
                        loader: 'sass-loader',
                    }
                ]
            }
        ]
    }
}
```

  [0]: https://github.com/LucineXL/webpackAndReact
  [1]: https://lucinexl.github.io/2018/08/21/webpack-react/
  [2]: https://www.webpackjs.com/concepts/
