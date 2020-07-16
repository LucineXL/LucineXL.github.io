---
title: 搭建Flutter开发环境--pod setup安装慢解决办法
date: 2019-08-22 16:50:27
tags:
    - flutter
cover: https://images.pexels.com/photos/1168742/pexels-photo-1168742.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

在搭建flutter开发环境的时候， 在运行 pod setup 的命令的时候，速度简直是慢的可怕，好不容易下载了50%， 结果还报错挂掉了， google之后找到了解决办法， 记录一下。


![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf502ox1axj31uo0is1a1.jpg)

#### 解决办法

1、到 [https://github.com/CocoaPods/Specs.git](https://github.com/CocoaPods/Specs.git) 把文件clone下来，默认文件夹名字为Specs-master
2、打开文件夹 ~/.cocoapods/repos
3、终端cd到你的工程目录中执行 pod setup，等待一会，等到开始下载的时候，会发现在~/.cocoapods/repos 下面多一个master文件，这时，需要复制master下面的.git 文件夹到Specs-master下面，同时停止pod setup
4、Specs-master文件夹名字修改为master，并替换~/.cocoapods/repos 下的master文件夹
5、直接可以正常执行pod install 等命令


完成上述操作后， 执行 `flutter doctor`， 你会发现之前的报错已经搞定了。


[0]: [https://github.com/CocoaPods/Specs.git]