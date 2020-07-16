---
title: xcode iOS 模拟器 无法显示系统键盘
date: 2019-09-02 17:22:19
tags:
    - xcode
cover: https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

在使用xCode运行ios模拟器时， 有时需要模拟手机系统键盘运行的效果， 但是默认xcode是使用电脑键盘的， 不会弹出系统键盘


解决办法：

点击模拟器， 在菜单中选择 `Hardware` -> `Keyboard` -> `Toggle Software Keyboard`

若是突然发现之前设置的失效了 或者 需要隐藏系统键盘， 则重新设置一下 即可

如图：

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf1534a73b9d78?w=1554&h=1198&f=png&s=1562835)


<!-- ![image.png](https://upload-images.jianshu.io/upload_images/5723572-2162656025cded6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) -->
或者：

Use the Same KeyBoard Language as macOS （使用与macOS相同的KeyBoard语言）

Connect Hardware KeyBoard （连接硬件KeyBoard）

顾名思义  将Connect Hardware KeyBoard 前面的✔️取消掉  就会一直是系统键盘的效果啦

