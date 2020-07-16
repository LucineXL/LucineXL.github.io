---
title: 从零开始学Flutter (1)   初识Flutter
date: 2019-08-21 16:29:16
tags:
 - flutter
cover: https://images.pexels.com/photos/2131623/pexels-photo-2131623.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

在学习之前， 我们先来了解一下 flutter

----

关于flutter是什么， 我们先引用一段来自官网的描述， 有一个直观的认识。

>Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。 Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。

从上面的描述 我们可以看出， Flutter是新一代的跨平台UI 框架。 所以， 在开始介绍flutter 之前， 先来回顾一下 移动端跨平台开发的演进过程。

### 移动端跨平台开发

从Android，ios 推出至今，移动端的开发技术在不断的发展，在最开始的时候， 都是使用原生开发。

#### 原生开发

原生应用程序是指某一个移动平台（比如iOS或安卓）所特有的应用，使用相应平台支持的开发工具和语言，并直接调用系统提供的SDK API。

原生开发可访问平台所有的功能（摄像头等），并且具有速度快，性能高，用户体验好等优点， 但是他的痛点也是比较明显的， 就是相同的功能需要再不同的平台上都实现一遍，况且动态化弱，新功能只能通过发版来进行更新，开发和维护的成本较大， 于是 跨平台方案也就应运而生。


目前存在的跨平台框架（Android 和 ios）， 根据其实现原理， 主要分为两大类：

- H5 + 原生（Cordova、Ionic、微信小程序）
- JavaScript开发 + 原生渲染 （React Native、Weex）


#### H5 + 原生混合开发

这一部分实现的主要原理就是把APP中需要动态变更的部分通过H5进行实现，再把webView内嵌入APP中。这样在内容需要更新的时候， 只可以改变H5部分就可以了，不需要进行APP发版；H5的代码开发完成后， 可同时在Android 和 ios 运行， 也不需要维护两套代码。

在使用混合开发的过程中， H5的代码是运行在WebView中的， 但是 Webview 和 Native 是彼此独立的， 所以webview是没有权限访问Native中的一些系统能力的， 比如无法访问系统文件，无法调用摄像机等。 所以，H5实现不了的功能， 就只能原生去做。 这时 就需要把Native中的一些API暴露给H5调用，于是乎， webview 就变成了 Native 和 JavaScript之间的通信桥梁，负责传递调用消息，而消息的传递必须遵守一个标准的协议，它规定了消息的格式与含义，我们把依赖于WebView的用于在JavaScript与原生之间通信并实现了某种消息传输协议的工具称之为`WebView JavaScript Bridge`, 简称 `JsBridge`，它也是混合开发框架的核心。

JsBridge 把 Native 和 H5 完美的融合在了一起，出现了一系列的 Hybrid 开发框架， 比如 Cordova、Ionic、微信小程序 等。但是这些框架都是基于WebView实现的， 所以对于WebView本身具有网页加载速度慢、渲染慢、JavaScript执行慢 的缺点也是不可避免的。

#### JavaScript开发 + 原生渲染

React Native (简称RN)是Facebook于2015年4月开源的跨平台移动应用开发框架，是Facebook早先开源的JS框架 React 在原生移动应用平台的衍生产物，目前支持iOS和Android两个平台。

React中有一个很重要的概念是 `虚拟Dom`。众所周知，在浏览器中每一次操作DOM都有可能会造成浏览器的重绘或回流， 而浏览器的重绘和回流都是比较昂贵的操作。 而react 的虚拟dom是在dom的基础之上建立一个抽象层，我们对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟DOM，最后再批量同步到真实DOM中，而不是每次改变都去操作一下DOM。

React中虚拟DOM最终会映射为浏览器DOM树，而RN中则将虚拟DOM映射为原生控件树。

**ReactNative 内置了跨平台的布局引擎，可以将 H5 的布局转化为 Native 的布局。**

**使用 Native 原生组件渲染。**

**ReactNative 内置 JavaScript 的引擎，从而可以在不同平台上运行 JavaScript 代码。**

至此，React Native 便实现了跨平台。


从上面的跨平台方案不难看出，实现跨平台方案需要解决的技术难题：

- 逻辑代码： 需要使用一种语言来实现
- ui渲染：要么自己渲染， 要么使用原生的渲染

第一种开发方案 webview 使用js进行开发， js逻辑代码运行在WebView 容器中，UI 也是 webview 自己进行渲染；
第二种开发方案 reactNative 使用js进行开发， js逻辑代码运行在js引擎，使用原生进行ui渲染。

### 跨平台方案的新发展方向 —— Flutter

#### 跨平台自绘引擎

Flutter 在构建移动应用程序时，使用Skia作为其2D渲染引擎。Skia是Google的一个2D图形处理函数库，包含字型、坐标转换，以及点阵图都有高效能且简洁的表现，Skia是跨平台的，并提供了非常友好的API。这样不仅可以保证在Android和iOS上UI的一致性，而且也可以避免对原生控件依赖而带来的限制及高昂的维护成本。

#### 高性能

Flutter 采用Dart语言开发，同时支持 JIT 和 AOT 两种编译方式的特性，在不同场景下使用不同的编译方式，达到最高效的开发和运行体验。Dart在 JIT（即时编译）模式下，速度与 JavaScript基本持平。但是 Dart支持 AOT，当以 AOT模式运行时，JavaScript便远远追不上了。

目前，程序主要有两种运行方式：静态编译与动态解释。静态编译的程序在执行前全部被翻译为机器码，通常将这种类型称为AOT （Ahead of time）即 “提前编译”；而解释执行的则是一句一句边翻译边运行，通常将这种类型称为JIT（Just-in-time）即“即时编译”。

在 Debug 模式下，采用 JIT 这种动态编译的方式，将代码运行在 Dart 虚拟机上，使得我们编写的代码可以实时更新，实现 HotReload 的特性，提升开发体验。

而在 Release 模式下，则会采用 AOT 的编译方式，将代码直接编译成各自平台的 Native 代码，以此提高使用体验。这是JavaScript所不具有的。


Flutter使用他自己的渲染引擎进行ui渲染，布局数据等由Dart语言直接控制，所以不需要像RN那样 需要在JavaScript和Native之间通信，这也保证了flutter的高性能。




参考链接：

   1. [flutter 中文网](https://flutterchina.club/)
   2. [flutter 实战](https://book.flutterchina.club/)
   3. [Flutter 完全手册(掘金小册)](https://juejin.im/book/5c5423ef6fb9a049cd54a213)
   4. [Flutter免费视频第一季-环境搭建  （大佬技术胖 出品)](https://jspang.com/posts/2019/01/20/flutter-base.html)