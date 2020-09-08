---
title: css-in-js
date: 2020-09-03 11:05:04
tags:
  - css
  - css in js
cover: https://cdn.pixabay.com/photo/2020/06/30/22/34/dog-5357794__480.jpg
---

我们从一个例子开始今天的文章

假设我们现在有一个需求， 要求实现一个 button， 具有悬停状态并且在悬停时略微升高

```
.button {
    color: #3ecf8e;
    padding: 20px;
    background-color: white;
    font-weight: bold;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    text-transform: uppercase;
    transition: 175ms ease-in-out;
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.35), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.button:hover,
.button:active {
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.08);
}
```

在某一天， 产品经理要求在这个button的基础上加一个辅助样式， 但还是使用原样式作为主要样式

```
.secondary {
    color: #7795f8;
    background-color: white;
}
```

之后的某一天， 产品经理又说 我需要一个比这个小一点的按钮
```
.button.tiny {
     font-size: 14px;
     padding: 10px 15px;
}
```
在之后的又一天， 产品经理又说  第二种情况的button 我需要一个hover效果

```
.button.secondary:hover {
    color: white;
    background-color: #7795f8;
}
```

嗯，其实每次要加的都是一个很简单的小功能， 但是， 时间长了，无数的小功能的堆叠， 我们的css代码就会变得不再那么干净了

然后 又是那么一个风和日丽的一天， 我们需要实现一个长得很像button的链接

```
<a class="button secondary"> 我只是一个链接 </a>
```

然后再写完之后， 发现咦，我的样式怎么不对呢， 找了半天，发现， 哦  原来 `button`, `secondary`这两个类名原来已经用过了， 那咋办呢， 好办， 用 `!important` 不就好了吗

长此以往下去，我们以后需要加一个小小的功能， 可能就会变得特别复杂


从上面的例子中， 我们可以看出传统css有一个最大的痛点， 就是全局作用域的问题

在多人协作的过程中， 其实就算是只有一个人开发， 也难免会遇到css 类名重复的问题。 为了解决这个问题， 出现了`BEM`, `OOCSS`等命名方式

以下是遵循`BEM`命名规范的写法：

```
<style>
    .form { }
    .form--theme-blue { }
    .form__input { }
    .form__submit { }
    .form__submit__disabled { }
</style>
<form class="form form--theme-blue">
    <input class="form__input" type="text" />
    <input class="form__submit form__submit__disabled" type="submit" />
</form>
```

这个写法的话， 用在公共组件库的话， 也就算了， 毕竟公共组件库， 还是越详细越通俗易懂越好一些， 可是如果用在业务组件中， 就有些繁琐了。 况且在多人团队开发中， 规则的制定，维护，与使用，耗费的成本还是比较大的


还有一个问题，css中删除样式是一件令人毛骨悚然的操作， 因为我们不知道删掉这段代码之后， 会造成什么样的影响， 需要经过许多的回归测试，才能保证不会有问题。 所以， 重构css就变得异常的困难


现在 还有一种应用比较广泛的方式， 就是 CSS Module。 我们可以通过webpack的css-loader在打包的时候指定打包后的类名格式，

```
// webpack config
module.exports = {
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        }
                    }
                ]
            },
        ]
    },
    ...
}
```

这样最终class类名就会被编译成`app__form__hash`这样的格式了， 就能保证不会出现重复类名的问题了

但是吧 在用这种方式的时候， 有一个小小的吐槽的点， 因为编译之后的类名是带hash的， 如果需要在使用的时候对类名进行重写的时候， 不是很能很准确的找到想重写的元素。


### css in js

顾名思义， css in js 就是在js中直接编写css， 也是react官方推荐的css 编写方案， [据统计][0]， 现在css in js相关的package 已经 60多个了

对几个比较典型的进行一下比较

|  name  |  star  |  ezis pizg  |  download  |
|  :--:  |  :--:  |  :-------:  |  :------:  |
|  styled-components  |  17,306  |  12.5KB  |  1,085,338  |
|  emotion  |4101|5.92KB|260,249|
|  jss  |5900|6.73KB|431,995|
|  radium  |6372|23.3k|857,067|
|  aphrodite  |4175|7.23KB|358,386|

从上面的表格可以看出， `emotion`是体积最小的，  `styled-components`是star最多的， 下载量也是最多的， 生态环境比较完整，文档也是比较完善的
看官方介绍的话， `emotion`, `aphrodite`, `jss`支持的特性会比较多一些

所以 可以先从`styled-components`试着上手接触， 但是综合来看，`emotion` 是个比较不错的选择

虽然相关的库有很多， 但是实现方法大致分为两种， 唯一css选择器 和 内联样式。 我们可以在[CSS-in-JS Playground][2]快速尝试不同CSS-in-JS实现

#### Styled-components

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gihwvjv5a7j31l60u0at0.jpg)

打开控制台， 看一下他的css

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gihwyu7abuj311a0u0wxj.jpg)


`Styled-components` 是通过模板定义好一个styled过的组件， 我们直接使用styled之后的组件就可以了。  他会给这个组件生成一个随机的哈希字符串的类名，实现了局部css作用域的效果， 各个组件的类名不会重复， 不会发生冲突

#### emotion

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gihx34f335j31270u0ned.jpg)

打开控制台， 看一下他的css

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gihx3twyo7j31090u0k9y.jpg)

`emotion` 跟 `Styled-components`相似， 都是通过`styled`生成一个新组件， 并且样式都是通过随机class名称实现局部css作用域的方式实现的

#### radium

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gihx7l9806j31810u0h1n.jpg)

生成的css

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gihx8uwfdlj315b0u0dxe.jpg)

从上面的例子可以出， 他和 `Styled-components` 和 `emotion` 的语法有很大区别， 他是以内联样式的方式插入css的。
由于标签内联样式在处理诸如media query以及:hover，:focus，:active等和浏览器状态相关的样式的时候非常不方便，所以radium为这些样式封装了一些标准的接口以及抽象， 如下图

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gihx89tfiwj30qy11cjzf.jpg)


### css in js 的 好处

#### 1. 局部作用域

css 最被人诟病的问题就是 全局作用域， 所有的样式一旦声明全局适用。 所以页面上任何元素只要匹配这个规则， 就会生效， 况且规则之前是可以叠加的， 开发过程中产生冲突的概率就会大大增加


css in js 自动提供局部作用域的功能， 组件的样式被限制只能在当前组件使用， 不会对其他组件产生影响

#### 2. 避免无用样式堆积

因为在我们的开发项目中， 一般样式与css并不具有很明确的对应关系， 所以删除css 是一件很痛苦的问题。

但css in js 一个特色就是会把css与组件绑定在一起， 当删除组件时， 直接删除文件会把js和css一起删除， 不用担心删除css会对其他组件产生影响

#### 3. 基于状态的样式定义

在我们日常的开发过程中， 可能需要根据页面中的状态展示不同的颜色， 为了实现这个需求， 需要针对不同的状态设置不同的类名， 然后给不同的类名设置不同的样式，  在交互特别复杂的时候， 就会变得异常的困难

但是在css in js中， 我们可以获取到当前页面中的状态值， css直接根据状态进行设置即可

```
import styled from 'styled-components'

const circleColorLookup = {
  healthy: 'green',
  stop: 'red',
  ready: 'yellow'
}

export default styled.div`
  ... circle base styles
  background-color: ${({ status }) => circleColorLookup[status]};
`

```

#### 4. 样式按需挂载

页面需要的样式才会加载，有效避免样式冗余 （未深入研究）


### css in js 的 缺点

#### 1. 学习成本

使用css in js 需要学习某个css in js的库的实现， 需要时间适应新的开发习惯，学习成本较高，引入初期可能会降低开发效率

#### 2.  依赖库的实现

某些特性的实现， 只能依赖库的实现， 不能完全复用原生环境

#### 3. 代码可读性差

大部分css in js 库会生成唯一的css 类名， 自动生成的类选择器会使代码的可读性变差， 增加debug的难度

#### 4. 没有统一标准

目前css in js 并没有社区统一遵循的规则和标准， 不同的库的用法可能差异较大， 迁移时难度较大

### 总结

css in js  有好处也有坏处， 我们根据自己的实际情况判断是否需要引入就好了~




### 参考文献


[CSS in JS 简介][4]
[CSS in JS的好与坏][3]







[0]: https://github.com/MicheleBertoli/css-in-js
[1]: https://styled-components.com
[2]: https://www.cssinjsplayground.com/
[3]: https://juejin.im/post/6844904051369328648
[4]: http://www.ruanyifeng.com/blog/2017/04/css_in_js.html

