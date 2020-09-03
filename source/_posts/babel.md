---
title: 初探AST和babel
date: 2020-08-24 17:18:46
tags:
    - babel
    - AST
cover: https://cdn.pixabay.com/photo/2020/07/20/06/42/english-bulldog-5422018__480.jpg
---

第一眼看见AST的时候， 并不是很清楚这是个什么， 只是隐隐记得， 大学里`编译原理` 好像学过， 但是并不是太清楚这个东西有什么用。 可是， 简单的了解一下才发现，原来我们的编码过程中， 处处都有他的身影

### 1. 什么是抽象语法树 （AST）

AST官方定义：

在计算机科学中，抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。

之所以说语法是「抽象」的，是因为这里的语法并不会表示出真实语法中出现的每个细节。

### 2. 使用场景

- 代码语法的检查， 代码格式化， 风格检查， 代码高亮，错误代码提示， 代码自动补全
- 代码压缩
- Babel 编译 ES6 语法

### 3. 生成 AST

我们通过下面的🌰来认识一下AST

```
const add = (a, b) => a + b
```

我们可以使用[Esprima][0]这个网站来在线生成AST

解析后的JSON格式如下：

```
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "add"
          },
          "init": {
            "type": "ArrowFunctionExpression",
            "id": null,
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              },
              {
                "type": "Identifier",
                "name": "b"
              }
            ],
            "body": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                "type": "Identifier",
                "name": "a"
              },
              "right": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "generator": false,
            "expression": true,
            "async": false
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
}
```

他的语法树长这个样子：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gi24wdluwnj30bo0oxta2.jpg)

可以用这张图更直观的看：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gi23rcrrooj30yg0s2kjl.jpg)


现在我们通过上面的语法树和图片来解析这段代码：

AST 的 根节点是 Program（每一个AST 的 根节点都是Program）

一个VariableDeclaration (变量声明）： 一个 name 为 add 的 ArrowFunctionExpression（箭头函数）

   - 箭头函数 add 接受 两个参数 `a` 和 `b`，
   - 函数主体是一个BinaryExpression（二项式)
        - left: a,
        - operator(操作符): +，
        -  right: b


再看一个例子：`(1+2)*3`

他的AST：

```
{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "BinaryExpression",
        "operator": "*",
        "left": {
          "type": "BinaryExpression",
          "operator": "+",
          "left": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          },
          "right": {
            "type": "Literal",
            "value": 2,
            "raw": "2"
          }
        },
        "right": {
          "type": "Literal",
          "value": 3,
          "raw": "3"
        }
      }
    }
  ],
  "sourceType": "script"
}
```

现在把上面例子中的（） 去掉， `1+2*3`

```
{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "BinaryExpression",
        "operator": "+",
        "left": {
          "type": "Literal",
          "value": 1,
          "raw": "1"
        },
        "right": {
          "type": "BinaryExpression",
          "operator": "*",
          "left": {
            "type": "Literal",
            "value": 2,
            "raw": "2"
          },
          "right": {
            "type": "Literal",
            "value": 3,
            "raw": "3"
          }
        }
      }
    }
  ],
  "sourceType": "script"
}
```

从上面这几个例子， 可以大概看出，  一些标签是固定的， 比如 `BinaryExpression(二项式)`， `ArrowFunctionExpression(箭头函数)`， `VariableDeclaration(变量声明)`等， 所以 语法抽象树其实就是将一类标签转化成通用标识符， 从而得到一个类似树形结构的语法树。


到这一步， 我们已经可以把js结构转换成一个结构树了，接下来能干什么呢？ 我们在没有结构树的时候，要想执行某一个操作，比如删除所有console， 就需要查找所有console并且删除代码， 可是如果我们有了抽象结构树， 我们对结构树进行一些修整， 再把调整后的结构树转换成js代码是不是就可以了呀


顺着这个思路， 我们是不是就可以做很多事情啦， 比如 `Bable`


### 4. 关于babel

babel 的功能其实很纯粹， 他只是一个编译器， 把`ECMAScript 2015 +`的代码转译成es 5 的代码， 使得代码可以在不同的浏览器或者不同的环境运行， 他不会运行我们的代码， 也不会对代码进行打包， 只是进行一个转译。

编译器的工作过程可以分为三部分：

1. 「Parse(解析)」：将源代码转换成更加抽象的表示方法（例如抽象语法树）
2. 「Transform(转换)」：对（抽象语法树）做一些特殊处理，让它符合编译器的期望
3. 「Generate(代码生成)」：将第二步经过转换过的（抽象语法树）生成新的代码

如图：

![](https://upload-images.jianshu.io/upload_images/9575907-350bc03649423cd4.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)


用一段简单的代码 模拟一下babel转译箭头函数的过程：

```
const esprima = require('esprima');  // 解析js代码生成AST
const estraverse = require('estraverse'); // estraverse 遍历并更新AST
const escodegen = require('escodegen'); // 将AST重新生成源码

let code = `let sum = (a, b)=>{return a+b}`;

let ast = esprima.parse(code); // 解析js代码生成AST

function ArrowFunctionExpression(path) {
  let { node } = path;
  let body = node.body;
  let params = node.params;
  let r = t.functionExpression(null, params, body, false, false);
  path.replaceWith(r);
}

estraverse.traverse(ast, {
  enter(node) {
    ArrowFunctionExpression(node);
  },
});  // estraverse 遍历并更新AST

let result = escodegen.generate(ast)  // 将AST重新生成源码
console.log(result);

```

这只是一个大致的过程， 中间的很多细节比如ast 怎么生成的， 又是怎么转换成js代码的， 还需要去详细的研究源码， 就不介绍了， 毕竟我也不清楚， 哈哈哈哈~  有感兴趣的同学可以自行深入研究哦


#### 参考文章
[看了就懂的 AST 和 Babel 工作流程][2]
[AST 抽象语法树][1]
[30分钟学会JS AST，打造自己的编译器][3]


[0]: https://esprima.org/
[1]: http://jartto.wang/2018/11/17/about-ast/
[2]: https://mp.weixin.qq.com/s/0vrLXF2aS5-Oa9iWF8VW5A
[3]: https://www.jianshu.com/p/eff95b93bb8a
