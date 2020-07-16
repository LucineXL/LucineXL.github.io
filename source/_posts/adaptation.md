---
title: 移动端适配那点事
date: 2020-03-28 17:59:22
tags:
    - 移动端适配
cover: https://images.pexels.com/photos/3944170/pexels-photo-3944170.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---


随着手机的普及， 现在手机的型号和尺寸越来越多， 也就衍生出了很多种的移动端的适配方案。

首先，我们先来了解几个基本的概念

### 一、基本概念

#### 英寸

一般英寸用来表示屏幕的大小。 比如在液晶显示器中，规格一般有17寸、19寸、22寸等; 在手机中，屏幕尺寸一般有5.0寸、5.5寸、6.44寸等。在平板电脑中，屏幕尺寸一般有7.9寸、9.7寸、12.9寸。

显示屏的大小通常以对角线的长度来衡量，以英寸单位。

#### 屏幕分辨率

屏幕分辨率指一个屏幕具体由多少个像素点组成。

#### 图像分辨率

我们通常说的图片分辨率其实是指图片含有的像素数，比如一张图片的分辨率为800 x 400。这表示图片分别在垂直和水平上所具有的像素点数为800和400。

同一尺寸的图片，分辨率越高，图片越清晰。

比如我们在开发过程中， 会用到二倍图， 三倍图，这里说的就是图像分辨率

#### 设备像素

设备像素即物理像素， 是显示器中最小的显示单元，每个像素可以根据操作系统设置自己的颜色和亮度。 对于一个设备来说， 从他出厂的那一刻， 他的设备像素就是固定的， 不会发生改变的

#### 设备独立像素

设备独立像素也叫`密度无关像素`，可以理解成是计算机坐标系统中的一个点，这个点表示一个可以由程序使用并控制的虚拟像素，可以由相关系统转换为物理像素。

在几年之前， 我们用的手机分辨率还比较低， 可是随着科技的发展， 手机的分辨率越来越高。  举个例子， 比如一个旧手机的分辨率是 `320*480`， 更新后新手机分辨率提高到了`640*960`。 如果按照物理像素作为单位， 同样的一张图片， 在分辨率为 `640*960` 的手机上， 只能占据屏幕的一半， 因为他的分辨率提高了一半， 但是事实不是这样的。

我们现在使用的智能手机， 不管分辨率多高， 展示出来的界面比例都是相似的。 乔布斯在iPhone4的发布会上首次提出了Retina Display(视网膜屏幕)的概念，它解决了上面的问题。在iPhone4使用的视网膜屏幕中，把2x2个像素当1个像素使用，这样让屏幕看起来更精致，但是元素的大小却不会改变。

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac3a65a53a177e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

对于上面的图片来说， 左边的手机用320*480个像素去渲染， 但是右边的手机用了640*960个像素去渲染， 所以右边的屏幕就比左边的精致的多。

所以，我们必须用一种单位来同时告诉不同分辨率的手机，它们在界面上显示元素的大小是多少，这个单位就是设备独立像素(Device Independent Pixels)简称DIP或DP。

#### 设备像素比

设备像素比`device pixel ratio`简称`dpr`，即物理像素和设备独立像素的比值。

在js中，浏览器为我们提供了 `window.devicePixelRatio` 来获取`dpr`

在css中，可以使用媒体查询 `min-device-pixel-ratio`，区分 `dpr`：
```
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){ }
```

在React Native中，我们也可以使用PixelRatio.get()来获取DPR。


### 二. 视口 viewport

视口（viewport）就是浏览器中用于显示网页的区域。

在PC中， 视口实际上指的是浏览器的可视区域，其宽度和浏览器窗口的宽度保持一致

在移动端， 浏览器通常宽度为240px~640px，而大多数PC端设计的网站宽度至少为800px，如果仍以浏览器窗口作为视口的话，网站内容在手机上看起来会非常窄。
所以在移动端，引入了`布局视口`（Layout Viewport）、`视觉视口`（Visual Viewport）和`理想视口`（Ideal Viewport）三个概念。

#### 布局视口 Layout Viewport

一般移动设备的浏览器都默认设置了一个 viewport 元标签，定义一个布局视口（layout viewport），用于解决早期的页面在手机上显示的问题。
布局视口是网页布局的基准窗口， 在PC浏览器上， 布局视口就等于当前浏览器的窗口大小， 在移动端，基本都将这个视口分辨率设置为980px，所以 PC 上的网页基本能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。

![](https://upload-images.jianshu.io/upload_images/8066565-d3d732fd43565e33.png?imageMogr2/auto-orient/strip|imageView2/2/w/336/format/webp)

获取当前页面的布局视口大小：

```
document.documentElement.clientWidth // 布局视口宽度
document.documentElement.clientHeight // 布局视口高度
```

可以通过meta标签改变布局视口的大小

```
<meta name="viewport" content="width=750">
```

#### 视觉视口

视觉窗口是用户可以看到的部分，默认等于当前浏览器的窗口大小。  当用户对页面进行缩放时， 不会影响布局视口的大小， 但是会改变视觉窗口的大小。 当用户放大时， 视觉窗口会变小， css像素会跨越更多的物理像素

![](https://upload-images.jianshu.io/upload_images/8066565-8df20ab7b8bfeb16.png?imageMogr2/auto-orient/strip|imageView2/2/w/323/format/webp)

获取当前页面的视觉视口大小：

```
window.innerWidth //视口的宽度
window.innerHeight //视口的高度
```

#### 理想视口

我们在移动端上展示时，布局视口在移动端展示的效果并不是我们我们想要的理想的效果，所以理想视口(ideal viewport)就诞生了：网站页面在移动端展示的理想大小。

理想视口的值其实就是屏幕分辨率的值，跟设备的硬件像素无关的。如果用户没有进行缩放，那么一个 CSS 像素就等于一个 dip。

```
screen.width //设备独立像素宽度
screen.height //设备独立像素高度
```

用下面的方法可以使布局视口与理想视口的宽度一致：

```
<meta name="viewport" content="width=device-width">
```

#### meta viewport

meta标签中的viewport可以设置移动端的视口， 缩放等相关属性


`meta` 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。

`meta` 标签位于文档的头部，不包含任何内容。`meta` 标签的属性定义了与文档相关联的名称/值对。

meta标签的用法：

| 属性        | 值                                                                  | 是否必填 | 描述                                     |
| :--------: | :---------------------------------------------------------------:   | :-----: | ----------------------------------      |
| content    | some_text                                                           | 是      | 定义与 http-equiv 或 name 属性相关的元信息  |
| name       | author<br>description<br>keywords<br>generator<br>revised<br>others | 否      | 把 content 属性关联到一个名称              |
| http-equiv | content-type<br>expires<br>refresh<br>set-cookie                    | 否      | 把 content 属性关联到 HTTP 头部。          |
| scheme     | some_text                                                           | 否      | 定义用于翻译 content 属性值的格式。          |

`viewport`的使用：

```
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```

| 属性           | 描述                                                     |
| :------:      | :--------------------------------------------------:    |
| width         | 定义布局视口的宽度， 为一个正整数或字符串"device-width"        |
| height        | 定义布局视口的高度， 为一个正整数或字符串"device-height"       |
| initial-scale | 页面的初始缩放值，为一个数字，可以带小数  0.0 - 10.0           |
| minimum-scale | 用户的最小缩放值，为一个数字，可以带小数 0.0 - 10.0            |
| maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数  0.0 - 10.0        |
| user-scalable | 否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许 |

#### 三. 适配方案

#### flexible方案

flexible方案是阿里早期开源的一个移动端适配解决方案，引用flexible后，我们在页面上统一使用rem来布局。

实现方式：

```
// set 1rem = viewWidth / 10
var rem = docEl.clientWidth / 10
docEl.style.fontSize = rem + 'px'
```

rem 是相对于html节点的font-size来做计算的。  我们可以通过设置document.documentElement.style.fontSize就可以统一整个页面的布局标准。
上面的代码中，将html节点的font-size设置为页面clientWidth(布局视口)的1/10，即1rem就等于页面布局视口的1/10，这就意味着我们后面使用的rem都是按照页面比例来计算的。
这时，我们只需要将UI出的图转换为rem即可。


####  vh、vw方案

vh、vw方案即将视觉视口宽度 window.innerWidth和视觉视口高度 window.innerHeight 等分为 100 份。
上面的flexible方案就是模仿这种方案，因为早些时候vw还没有得到很好的兼容。

vw(Viewport's width)：1vw等于视觉视口的1%
vh(Viewport's height) :1vh 为视觉视口高度的1%
vmin :  vw 和 vh 中的较小值
vmax : 选取 vw 和 vh 中的较大值



> 参考文献：
[关于移动端适配，你必须要知道的][0]
[移动web之视口][1]



[0]: https://juejin.im/post/5cddf289f265da038f77696c
[1]: https://www.jianshu.com/p/b6ca276d7e3c
