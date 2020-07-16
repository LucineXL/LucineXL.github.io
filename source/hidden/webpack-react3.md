---
title: 基于webpack4搭建一个简单的React脚手架 （三）
date: 2018-09-05 16:46:53
tags:
    - React
    - webpack
cover: https://images.pexels.com/photos/1203309/pexels-photo-1203309.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---


### 往期文章地址
  [<font color=#518dca>基于 webpack4 搭建 一个简单 的 React 脚手架 （一）</font>][1]
  [<font color=#518dca>基于 webpack4 搭建 一个简单 的 React 脚手架 （二）</font>][2]

  [<font color=#518dca>项目git地址</font>][0]

  [<font color=#518dca>webpack4 官方文档 ，请戳这里~</font>][3]


## 1. typeScript

  关于 typeScript 是个什么东西， 在这里就不赘述了， [<font color=#518dca>中文文档 ，戳这里~</font>][4]
 
  安装
    
    yarn add  typescript @types/react @types/react-dom awesome-typescript-loader source-map-loader -D

  添加 tsconfig.json 文件, 详细信息看[这里][5]
```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react"
  },
  "include": [
      "./src/**/*"
  ]
}

```

  新建一个组件

  hello.tsx

```
import * as React from 'react';
export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

export default class Hello extends React.Component<Props, {}> {
  render() {
    const { name, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
      </div>
    );
  }
}

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```


index.tsx

```
import * as React from 'react';
import * as ReactDom from 'react-dom';
import './index.scss';
import Hello from "./hello";
const logo = require('./logo.png');

export class Root extends React.Component<{}, {}> {
    render() {
        return (
          <div>
            我是 root
            <Hello name="TypeScript" enthusiasmLevel={10} />
            <img src={logo} />
          </div>
        )
    }
}

ReactDom.render(
  <Root />,
  document.getElementById('root')
)
```


webpack.common.js

```
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};
```


## 2.babel

babel是一个广泛使用的转码器， 可以把我们项目中使用的 es6 代码转换为计算机可识别的 es5代码， 从而在现有环境执行。    可查看阮一峰的[Babel 入门教程][6]

在Babel执行编译的过程中，会从项目的根目录下的 .babelrc文件中读取配置。.babelrc是一个json格式的文件。
在.babelrc文件中， 我们可以对 presets（转码规则） 和 plugins（插件） 进行配置。

我们需要转换 es6 的语法， 可以使用 babel-preset-es2015 插件.

    yarn add babel-preset-es2015 -D

.babelrc
```
{
  "presets": ["es2015"] 
}
```

但是， babel-preset-es2015 只能帮助我们把 es6 的语法 转译为 es5, 对于 es7甚至是es8 的语法并不能转译。因此， 出现了 babel-preset-env ， 他可以 根据 目标环境选择 不支持的新特性进行转译。

  yarn add babel-preset-env -D

.babelrc
```
{
  "presets": ["env"],
}
```

更多关于 babel-preset-env 的参数 请查看 [如何写好.babelrc？Babel的presets和plugins配置解析][7]

需要注意的是， 在没有任何配置选项的情况下，babel-preset-env 与 babel-preset-latest（或者babel-preset-es2015，babel-preset-es2016和babel-preset-es2017一起）的行为完全相同。

它不会包含 stage-x 插件。

stage-x(stage-0/1/2/3/4)
stage-x和上面的es2015等有些类似，但是它是按照JavaScript的提案阶段区分的，一共有5个阶段。而数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。

之前遇到了一个问题， 在项目中使用的是 babel-preset-env， 但是使用箭头函数时 报错了， 重新安装了babel-preset-stage-0之后，就可以了。



  [0]: https://github.com/LucineXL/webpackAndReact
  [1]: https://lucinexl.github.io/2018/08/21/webpack-react/
  [2]: https://lucinexl.github.io/2018/08/27/webpack-react2/
  [3]: https://www.webpackjs.com/concepts/
  [4]: https://www.tslang.cn/
  [5]: https://www.tslang.cn/docs/handbook/tsconfig-json.html
  [6]: http://www.ruanyifeng.com/blog/2016/01/babel.html
  [7]: https://excaliburhan.com/post/babel-preset-and-plugins.html
