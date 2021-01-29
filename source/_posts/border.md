---
title: 玩转 css border
date: 2021-01-21 15:41:04
tags:
    - css
cover: https://images.pexels.com/photos/4753647/pexels-photo-4753647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---


前几天看了一篇文章， 发现原来css还能玩出这么多的花样，于是乎，便跟着文章试验了一下，对css的 `linear-gradient ` 和 `conic-gradient`几个不常用的属性也有了更深刻的理解 （原链接 [CSS 奇思妙想边框动画][0]）

在开始之前， 先来复习一下css的几个属性（详细介绍篇幅过长， 就直接偷懒抛MDN链接了）

1. border  [MDN border 详情][4]

2. background   [MDN background 详情][1]

3. animation   [MDN animation 详情][2]

4. linear-gradient  [MDN linear-gradient 详情][3]

5. conic-gradient [MDN conic-gradient 详情][5]

6. clip-path [MDN clip-path 详情][6]

现在， 我们就来实现一些不一样的边框效果吧

#### 1. hover边框长度变化

实现效果：

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gmvf9yejljg30cg0b0myb.gif" width="300px" />
</div>

实现思路： 利用两个伪元素，分别只设置上、左边框 和 下、右边框， 鼠标hover改变伪元素长度。

dom:
```
  <div className={styles.con1}/>
```
css:
```
.con1 {
    position: relative;
    width: 150px;
    height: 100px;
    border: 1px solid #03A9F3;
    cursor: pointer;
    &::before, &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        transition: all 0.2s;
        border: 1px solid #03A9F3;
    }
    &::before {
        top: -5px;
        left: -5px;
        border-right: none;
        border-bottom: none
    }
    &::after {
        bottom: -5px;
        right: -5px;
        border-left: none;
        border-top: none;
    }
    &:hover {
        &::before, &::after {
            width: calc(100% + 10px);
            height: calc(100% + 10px);
        }
    }
}
```

#### 2. 虚线边框动画

实现效果：
<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gmwjeaykxqg30a80ggq5s.gif" width="300px" />
</div>

实现思路：

border 是可以实现虚线效果的， 但是不能做到动起来的效果， 所以可以换成用渐变的方式实现虚线

先来实现一条横着的虚线,  虚线其实就是 '- '   的循环， 所以我们只需要实现一个'- ', 然后利用background-repeat进行循环即可

css:
```
div {
    background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x;
    background-position: 0 0;
    background-size: 4px 1px;
}
```

效果如下：
150 * 100 的div， 拥有了一条虚线的上边框

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gmwl6uno2ej30ho0aemxg.jpg" width="300px" />
</div>

有了第一条， 同理， 就可以有第二，三，四条, 然后，利用animation, 让我们的虚线动起来， 上图中的第一个效果圆满完成

css：
```
@keyframes linearGradientMove {
    100% {
        background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
    }
}

.con2 {
    width: 150px;
    height: 100px;
    background:
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0%, 100% 0;
    &:hover {
        animation: linearGradientMove .3s linear infinite;
    }
}
```

上图效果2：

```
.con3 {
    width: 150px;
    height: 100px;
    border: 1px solid #333;

    &:hover {
        border: none;
        background:
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0%, 100% 0;
        animation: linearGradientMove .3s linear infinite;
    }
}
```



#### 3. 渐变的其他用法

利用渐变，我们还能实现效果

如下图
<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEgy1gn0wwh82jxg30ey0a2gn8.gif" width="500px" />
</div>


先用渐变实现一个下图的元素

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEgy1gn0wr48yzyj30fu09yaa8.jpg" width="500px" />
</div>


```
.con4 {
    width: 150px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;

    &::after {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: linear-gradient(#399953, #399953),  linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
        background-repeat: no-repeat;
        background-size: 50% 50%, 50% 50%;
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    }
```

使用伪元素实现这个元素， 每一个色块都和父元素一样大， 再通过父级的`overflow: hidden`将超出部分隐藏

然后， 给色款加上动画效果， 让色块动起来

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEgy1gn0wswfijng30ey0a6n2e.gif" width="500px" />
</div>

再添加一个伪元素， 将div内部部分遮住， 即可实现想要的效果，

为了更直观的观察， 可以给遮罩的伪元素加一个透明度的动画

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEgy1gn0x0fhx74g30g80a4k0c.gif" width="500px" />
</div>

最终代码：
```
@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}

.con4 {
    width: 150px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;

    &::after {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: linear-gradient(#399953, #399953),  linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
        background-repeat: no-repeat;
        background-size: 50% 50%, 50% 50%;
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
        animation: rotate 4s linear infinite;
    }

    &::before {
        content: '';
        position: absolute;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        top: 3px;
        left: 3px;
        background: #ffffff;
        z-index: 2;
        border-radius: 3px;
    }
}

```


实现了上面的效果之后， 我们还可以实现一种颜色的效果

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEgy1gn0xeikhycj30bk07k748.jpg" width="500px" />
</div>

动起来之后的效果

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEgy1gn0xfn609ag30cm092dgs.gif" width="500px" />
</div>


```
.con5 {
    width: 150px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;

    &::after {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: linear-gradient(#399953, #399953);
        background-repeat: no-repeat;
        background-size: 50% 50%;
        background-position: 0 0;
        animation: rotate 4s linear infinite;
    }

    &::before {
        content: '';
        position: absolute;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        top: 3px;
        left: 3px;
        background: #ffffff;
        z-index: 2;
        border-radius: 3px;
    }
}
```

在动起来的时候， 有的时候两边会出现小三角的情况， 并不是特别的美观

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEgy1gn0xkugnkej30ju07y75w.jpg" width="500px" />
</div>

这个时候， 可以使用`conic-gradient` 实现(详细介绍请通过上文跳转MDN)

先实现一个角向渐变

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gn0xy0qmohj30cw07kwf0.jpg" width="500px" />
</div>

渐变动起来
<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gn0xzoy9z4g30ac08e1b0.gif" width="500px" />
</div>

边框效果

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gn0y1ekokxg30co09iado.gif" width="500px" />
</div>

代码实现
```
.con6 {
    width: 150px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    background-color: black;

    &::after {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
        animation: rotate 4s linear infinite;
    }

    &::before {
        content: '';
        position: absolute;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        top: 4px;
        left: 4px;
        background: #ffffff;
        z-index: 2;
        border-radius: 3px;
    }
}

```

#### 4. clip-path

上面的例子除了用渐变还可以用 `clip-path`实现， 具体用法见上面

效果图

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gn14lplr1gg30b40eujt9.gif" width="500px" />
</div>

```
@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }
    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}

.con7 {
    width: 150px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid gold;
        animation: clippath 3s infinite linear;
    }
}
```

下图是上面动画中clip-path的拆解效果

<div align=center >
<image src="https://tva1.sinaimg.cn/large/008eGmZEly1gn14o2jsbej31eo08y74p.jpg" width="900px" />
</div>





[0]: https://juejin.cn/post/6918921604160290830
[1]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/background
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
[3]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient()
[4]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/border
[5]: https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient()
[6]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path