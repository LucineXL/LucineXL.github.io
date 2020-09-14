---
title: BFC的二三事
date: 2020-07-27 15:37:59
tags:
    - css
    - BFC
cover: https://cdn.pixabay.com/photo/2020/09/03/15/37/waterscape-5541692__480.jpg
---

BFC是css中一个比较经常被问到的概念， 这次，我们来彻底搞懂他


### 盒模型

css盒模型描述了通过 文档树中的元素 以及相应的 视觉格式化模型 所生成的矩形盒子。 浏览器在渲染页面时， 浏览器的渲染引擎会根据盒模型将所有元素表示为一个个矩形的盒子， 盒子的外观由css 控制

一个标准的盒子由四部分组成， 由内向外包括： `content(内容)`, `padding(内边距)`, `border(边框)`, `margin(外边距)`

如下图：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5lu41o5fj30ua0le75s.jpg)

盒模型分两种， `标准盒模型` 和 `怪异盒模型`

标准盒模型： 盒子的宽高只包括内容部分

标准盒模型可以通过`box-sizing: content-box`，默认即为标准盒模型

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5m4vtpssj31i00qo0yt.jpg)

怪异盒模型： 盒子的宽高除了包括内容部分外， 还包括padding和border

怪异盒模型可以通过`box-sizing: border-box`设置

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gh5m6vbilzj31hc0pogr6.jpg)

### 视觉格式化模型

css 的视觉格式化模型描述了盒子是怎样生成的， 简单来说， 他定义了盒子的计算规则， 通过规则 文档元素转换成一个个的盒子

每个盒子的布局由`尺寸`，`类型`，`定位`，`盒子的子元素或兄弟元素`，`视口的尺寸和位置`等因素决定。

视觉格式化模型的计算，取决于一个矩形的边界，这个边界，就是 `包含块( containing block )`：
```
<div>
    <p>
        <span>hello world</span>
    </p>
</div>
```
在上面的代码中， `div` 和 `p` 都是包含块, div 是 p 的包含块， p又是span 的包含块

盒子不受包含块的限制，当盒子的布局跑到包含块的外面时，就是我们说的溢出（overflow）

盒子的生成由视觉格式化模型定义生成， 盒子又包含几种不同的类型， 盒子的类型取决于display属性

- 块盒子  display:  block | list-item | table

    - 一个块级元素会被格式化成一个块，默认按照垂直方向依次排列。
    - 每个块级盒都会参与 BFC 的创建。

- 行内盒子  display: inline | inline-block | inline-table

    - 行内元素不会生成内容块，但是可以与其他行内级内容一起显示为多行。
    - 行内级元素会生成行内级盒子，该盒子参与 IFC 的创建。

- 匿名盒子

    - 匿名盒子会从父元素继承可继承属性，其他属性保持默认值initial。
    - 通常CSS引擎会自动为直接包含在块盒子中的文本创建一个匿名盒子。

```
<div>
   这是一个匿名盒子
   <p> 这是一个块盒子 </p>
   <span> 这是一个行内盒子 </span>
   这是另一个匿名盒子
</div>
```

### 渲染文档流

CSS 页面布局技术允许我们拾取网页中的元素，并且控制它们相对正常布局流（普通流）、周边元素、父容器或者主视口/窗口的位置。技术布局从宏观上来说是受定位方案影响，定位方案包括普通流（Normal Flow，也叫常规流，正常布局流），浮动（Float），定位技术（Position）。

#### 普通流

在普通流的块格式化上下文中，盒子在垂直方向依次排列。
在普通流的行内格式化上下文中，盒子则水平排列。
当 CSS 的 position 属性为 static 或 relative，并且 float 为 none 时，其布局方式也为普通流。
当 position 为 relative 时为相对定位，此时该盒子还会根据 top、bottom、left 和 right 属性的值在其原本所在的位置上产生指定大小的偏移，即使有偏移，仍然保留原有的位置，其它元素不能占用这个位置。

#### 浮动流

一个盒子的 float 值不为 none，并且其 position 为 static 或 relative 时，该盒子为浮动流。
在浮动流中，浮动盒子会浮动到当前行的开始或尾部位置。这会导致普通流中的元素会“流”到浮动盒子的边缘处（被浮动影响），除非元素通过 clear 清除了前面的浮动。
如果将 float 设置为 left，浮动盒子会流到当前行盒子的开始位置（左侧）;
如果设置为 right，浮动盒子会流到当前行盒子的尾部位置（右侧）;
不管是左浮动还是右浮动，行盒子都会伸缩以适应浮动盒子的大小。

#### 定位

如果元素的 position 为 absolute（绝对定位） 或 fixed（固定定位），该元素为定位模式。

定位模式有四种：`静态定位`，`相对定位`，`绝对定位`，`固定定位`。

1. 静态定位

默认的定位方式（position为static），此时元素处于普通流中。

2. 相对定位

相对定位通常用来对布局进行微调，position为relative时，元素使用相对定位，此时可以通过top，right，bottom，left属性对元素的位置进行微调，设置其相对于自身的偏移量。

3. 绝对定位

绝对定位方案中，盒会从普通流中移除，不会影响其他普通流的布局。绝对定位具有以下特点：

 - 元素的属性position为absolute或fixed时，它是绝对定位元素
 - 它的定位相对于它的包含块，可以通过 top，right，bottom，left 属性对元素的位置进行微调，设置其相对于包含块的偏移量
 - position为absolute的元素，其定位将相对于最近的一个relative、fixed或absolute的父元素，如果没有则相对于body

4. 固定定位
与绝对定位方案类似，唯一的区别在于，它的包含块是浏览器视窗。

### BFC是什么

BFC(Block Formatting Context)，我们可以拆开理解，FC 表示 `Formatting Context` 格式化上下文，是 W3C 规范中的一个概念，用于决定块级盒的布局及浮动相互影响范围的一个区域。决定了内部的盒子如何排列，它对外面的元素不会产生任何影响。

最常见的格式化上下文有 BFC、IFC、FFC、GFC。

BFC(Block Formatting Context) 块级格式化上下文
IFC(Inline Formatting Context) 内联格式化上下文
FFC(Flex Formatting Context) 弹性格式化上下文
GFC(Grid Formatting Context) 栅格格式化上下文

#### BFC的创建

以下元素会创建 BFC， 详情请参照 [MDN 块格式化上下文][0]

- 根元素（<html>）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

以上是 CSS2.1 规范定义的 BFC 触发方式，在最新的 CSS3 规范中，弹性元素和网格元素会创建 F(Flex)FC 和 G(Grid)FC。(下文会讲到)

#### BFC的特性

- BFC内部的块级盒会在垂直方向上一个接一个排列。（普通流）
- 计算BFC的高度时，浮动元素也会参与计算。
- 同一BFC下的相邻块级元素可能发生外边距折叠。(float可以避免外边距折叠 或者 打破同一BFC的结构)
- BFC元素不会和它的子元素发生外边距折叠。
- 浮动盒的区域不会和BFC重叠。
- BFC是一个独立的容器外面的元素不会影响BFC内部反之亦然。


### IFC
如何创建一个IFC布局：

行内块元素（元素的 display 为 inline-block）

#### IFC的特性

- 在行内格式化上下文中，盒(box)一个接一个地水平排列，起点是包含块的顶部
- 水平方向上的 margin，border 和 padding在盒之间得到保留
- 盒在垂直方向上可以以不同的方式对齐

### FFC
如何创建一个FFC布局：

弹性元素（display 为 flex 或 inline-flex）

### GFC
如何创建一个GFC布局：

网格元素（display 为 grid 或 inline-grid）





[0]: https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
