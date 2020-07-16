---
title: webpack + react 使用 eslint
date: 2018-09-11 11:48:21
tags:
    - React
    - webpack
    - eslint
cover: https://images.pexels.com/photos/1053769/pexels-photo-1053769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---


[ESLint][0] 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

在本文开始前， 我们假设您已经有一个webpack + react 的 初始项目。


#### 初始化

首先， 现在 项目中 安装 eslint  和 eslint-loader

    yarn add eslint eslint-loader -D

在webpack中，通过 .eslintrc 文件 对 eslint 进行配置。在根目录下 执行 `touch .eslintrc` 在根目录下生成 .eslintrc 配置文件

#### eslint-loader

在 webpack.config.js 中 配置 eslint-loader.

```
module: {
    // ...
    rules: [
        // ...
        {
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            loader: 'eslint-loader',
            include: path.resolve(__dirname, './src/**/*.js'),
            exclude: /node_modules/
        },
    ]
}
```

我们的项目中之前已经使用了 babel-loader对我们的代码进行转译， 我们可以把 eslint-loader 和他一起使用。

```
module: {
    // ...
    rules: [
        // ...
        {
            test: /\.(js|jsx)$/,
            loader: ['babel-loader', 'eslint-loader'],
            include: path.resolve(__dirname, './src/**/*.js'),
            exclude: /node_modules/
        },
    ]
}
```


#### babel-eslint
我们的项目中使用了 es6 的语法， 可以通过 babel-eslint 进行检测。

    yarn add babel-eslint -D

.eslintrc

```
{
  parser: "babel-eslint",
  "rules": {
  }
}
```

然后， 便可以添加 rules 来检测我们代码，更多规则可参考[官方文档][1]

```
{
  "parser": "babel-eslint",
  "rules": {
    "indent": ["error", 4, {
      "SwitchCase": 1
    }],
    "no-extra-boolean-cast": "error",
    "no-cond-assign": "error",
    "no-magic-numbers": ["off", {
      "ignoreArrayIndexes": true,
      "ignore": [0, 1],
      "enforceConst": true
    }],
    "max-params": ["error", 6],
    "no-var": "error",
    "no-console": "off",
    "no-alert": "off",
    "no-debugger": "off",
    // ...
  }
}
```

#### eslint-plugin-react

我们可以使用eslint-plugin-react 来检测 react 的一些语法规则

    yarn add eslint-plugin-react -D


.eslintrc
```
{
    // ...
    "plugins": [
        "react",
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/prop-types": "error",
         // ...
    }
}

```

#### Environments 指定脚本的运行环境。

 env: 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。

```
browser - 浏览器环境中的全局变量。
node - Node.js 全局变量和 Node.js 作用域。
commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
shared-node-browser - Node.js 和 Browser 通用全局变量。
es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
worker - Web Workers 全局变量。
amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
```

更多环境变量请参考 [官方文档][2]

.eslintrc
```
{
    // ...
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "amd": true
    },
}
```

#### Globals - 脚本在执行期间访问的额外的全局变量。

在配置文件里配置全局变量时，使用 globals 指出你要使用的全局变量。将变量设置为 true 将允许变量被重写，或 false 将不允许被重写。

.eslintrc
```
{
    // ...
    "globals": {
        "var1": true,
        "var2": false,
    }
}
```

#### eslint-config-airbnb

我们在使用 eslint 的时候 可以使用别人配置好的 配置， 我们可以选用 Airbnb 标准。

使用 Airbnb标准，还需要 两个 必须的 插件。

yarn add eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-import -D


.eslintrc

```
{
    // ...
    "extends": "airbnb",
}
```


#### pre-commit

我们的项目使用了git, 可以通过设置pre-commit 来对我们的代码 每次提交时 进行检测，如果检测到 代码 不符合 eslint规范，则不允许 提交， 这样可以很大程度上保证我们的代码质量。

    yarn add pre-commit -D

然后我们在 package.json 中 添加pre-commit配置

```
// ...
"scripts": {
   // ...
  "eslint": "eslint --ext .js src"
},
"pre-commit": [
  "eslint"
]
```


 [0]: http://eslint.cn/docs/user-guide/getting-started
 [1]: http://eslint.cn/docs/rules/
 [2]: http://eslint.cn/docs/user-guide/configuring