---
title: 使用VS code 调试运行 dart
date: 2019-08-26 11:16:52
tags:
    - dart
    - vscode
cover: https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

#### dart 安装 （mac）

安装好brew之后，执行下面的命令：
```
brew tap dart-lang/dart
brew install dart
brew install dart --devel // 安装开发版
```

在安装成功后  可使用  `dart --version` 进行查看， 若能正常显示版本号， 则说明安装成功

#### VS code 下运行dart

1. 启动 VS code
2. 调用 View>Command Palette..., (command + shift + p), 输入 ‘install’, 然后选择 Extensions: Install Extension action。
 更加简单方便的方法： 点击 vscode 左侧图标， 进入插件安装页面
3. 在搜索框输入 `code runner` ，在搜索结果列表中选择 `code runner`, 然后点击 Install。
4. 安装成功 重启 编辑器生效

安装成功后， 创建一个新的 XXX.dart文件， 点击 VScode 右上角 的运行 按钮， 即可对代码进行调试

如图：

![](https://user-gold-cdn.xitu.io/2019/8/26/16ccc0e3cdc8abe6?w=1406&h=1514&f=png&s=141946)