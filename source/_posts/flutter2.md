---
title: 从零开始学Flutter (2)   Flutter 开发环境搭建
date: 2019-08-22 23:46:58
tags:
 - flutter
cover: https://images.pexels.com/photos/2747050/pexels-photo-2747050.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

往期链接：

- [从零开始学Flutter (1) 初识Flutter](https://lucinexl.github.io/2019/08/21/flutter1/)


### Flutter 开发环境搭建

flutter官网上讲述了 windows， macos, linux 三种操作系统的搭建方法， 本篇文章只讲述 `macos` 的搭建过程， 其他系统配置请参考官网。

安装flutter所需系统要求：

要安装并运行Flutter，您的开发环境必须满足以下最低要求:
- 操作系统: macOS (64-bit)
- 磁盘空间: 700 MB (不包括Xcode或Android Studio的磁盘空间）.
- 工具: Flutter 依赖下面这些命令行工具.
   - `bash`, `mkdir`, `rm`, `git`, `curl`, `unzip`, `which`

注意： 在环境配置的过程中， 需要用到brew， 没有安装的需要安装一下哦~ 鉴于这个与本文关系不大， 就不在这里介绍了，有需要请百度~~


#### 使用镜像

由于在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中：

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

注意： 此镜像为临时镜像，并不能保证一直可用，读者可以参考详情请参考 [Using Flutter in China](https://github.com/flutter/flutter/wiki) 以获得有关镜像服务器的最新动态。

##### 环境变量配置

1. 使用vim打开配置文件，在打开的文件中添加镜像配置代码。
   注意： bash 和 zsh 的配置文件是不同的。

   ```
   /* bash */
   vim ~/.bash_profile

   /* zsh */
   vim ~/.zshrc
   ```

2. 配置完成后， 使用`source`命令重新加载一下配置文件
   ```
   /* bash */
   source ~/.bash_profile

   /* zsh */
   source ~/.zshrc
   ```

#### 获取Flutter SDK

1. 官网下载最新的安装包  [戳这里~](https://flutter.dev/docs/development/tools/sdk/releases?tab=macos#macos)

flutter分为四个版本： `stabel`, `beta`, `dev`, `master`, 推荐使用`stabel`分支， 这是flutter的稳定分支

2. 解压安装包到你想安装的目录，如：

```
cd ~/flutter
unzip ~/Downloads/flutter_macos_v1.7.8+hotfix.4-stable.zip
```

3. 添加`flutter`相关工具到path中, 配置flutter命令在任何地方都可以使用:

```
export PATH=`pwd`/flutter/bin:$PATH
```

pwd 这个命令本指当前路径，在这里是指 flutter 的安装路径， 比如我的路径为： ~/flutter， 那么代码为：
```
export PATH=~/flutter/flutter/bin:$PATH
```

到此为止， flutter的安装工作就完成了， 但是还不具备开发环境，但是还不能进行开发。可以使用 `flutter -h`来检测一下。
安装成功后， 出现下面的结果。


![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf500cn5myj30u00zydx2.jpg)


#### 安装Xcode

 要为iOS开发Flutter应用程序，您需要Xcode 9.0或更高版本，可在应用商店下载， 此处不在介绍。 但是需要注意的是， 运行xcode需要统一xcode许可协议， 可通过打开一次xcode应用或者命令`sudo xcodebuild -license`进行同意。

#### 检查开发环境

上面说到， 我们安装好了flutter， 但是还不具备开发环境， 因为我们在开发中还需要用到很多插件和软件， 具体需要的插件和软件可以通过 `flutter doctor` 命令来进行检查。

运行结果如图：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf500tivqzj31tc0os7qo.jpg)
这部分是安卓相关的， 当前先拿ios版本的试试手， 安卓相关的先暂且放一下，日后会继续更新~

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf501c0odnj312v0u04qp.jpg)

大概意思就是我们还需要这些软件，请使用brew进行安装。
整个安装过程没有任何技术含量， 但是无奈网速太渣渣， 这个过程耗了我半个多下午才搞定。
这里值得一提的是， 在安装cocoapods 时， 执行 pod setup这个命令的时候，真的是非常非常的慢， 还老是跑到一半程序就崩溃报错了， 后来谷歌发现了一个比较靠谱的办法， [详情请戳~](https://lucinexl.github.io/2019/08/22/pod-setup/)

这一系列的命令结束后， 执行`flutter doctor` 无报错后， 我们的安装就接近尾声啦~

#### IDE配置与使用

理论上可以使用任何文本编辑器与命令行工具来构建Flutter应用程序。 不过，Flutter官方建议使用Android Studio和VS Code之一以获得更好的开发体验。Flutter官方提供了这两款编辑器插件，通过IDE和插件可获得代码补全、语法高亮、widget编辑辅助、运行和调试支持等功能，可以帮助我们极大的提高开发效率。

我使用的是VS code, 所以接下来介绍一下 vscode 的配置与使用。

##### 安装flutter 插件

1. 启动 VS code
2. 调用 View>Command Palette..., (command + shift + p), 输入 ‘install’, 然后选择 Extensions: Install Extension action。
 更加简单方便的方法： 点击 vscode 左侧图标， 进入插件安装页面
3. 在搜索框输入 `flutter` ，在搜索结果列表中选择 `Flutter`, 然后点击 Install。
4. 安装成功 重启 编辑器生效
5. 验证配置：
   - 调用 View>Command Palette…
   - 输入 ‘doctor’, 然后选择 ‘Flutter: Run Flutter Doctor’ action。
   - 查看“OUTPUT”窗口中的输出是否有问题

##### 创建flutter应用

1. 启动 VS Code
2. 调用 View>Command Palette…
3. 输入 ‘flutter’, 然后选择 ‘Flutter: New Project’ action
4. 输入 Project 名称 (如myapp), 然后按回车键
5. 指定放置项目的位置，然后按蓝色的确定按钮
6. 等待项目创建继续，并显示main.dart文件

##### 体验热重载

1. 打开lib/main.dart文件。
2. 将字符串 'You have pushed the button this many times:' 更改为 'You have clicked the button this many times:'。
3. 不要按“停止”按钮; 让您的应用继续运行。
4. 要查看您的更改，请调用 Save (cmd-s / ctrl-s), 或者点击 热重载按钮 (绿色圆形箭头按钮)。

如图：
![](https://user-gold-cdn.xitu.io/2019/8/22/16cb9cedafbb7565?w=566&h=76&f=png&s=6096)

##### 启动IOS模拟器

创建应用成功后， 点击左侧 debugger 按钮， 可调用xcode启动ios模拟器

1.在你的MAC上，通过 Spotlight 或以下命令找到模拟器：

```
open -a Simulator
```

2.通过检查模拟器 Hardware > Device 菜单中的设置，确保模拟器正在使用64位设备（iPhone 5s或更高版本）。

  可使用 `xcrun instruments -s` 命令查看可选择的模拟器机型列表。

  每一种设备都有一个唯一的id， 即下图中红框标识出来的部分。

   ![](https://user-gold-cdn.xitu.io/2019/8/22/16cb9dd899b54087?w=1280&h=288&f=png&s=117877)

  可通过`xcrun instruments -w <deviceId>` 命令启动模拟设备。 如 `xcrun instruments -w D5E1929F-2973-4DD2-9A84-D89B7E7C1F4`

3.运行 `flutter run`启动flutter应用程序，也可通过`flutter run -d <deviceId> `启动某种特定设备类型。


也可直接使用vscode 左侧的debugger启动模拟器， 如下图：
![](https://user-gold-cdn.xitu.io/2019/8/22/16cb9ca245470940?w=1848&h=1004&f=png&s=238331)

启动成功后， 我们的第一个flutter应用到此就正式跑起来啦~   效果如图：

![](https://user-gold-cdn.xitu.io/2019/8/22/16cb9cc4c5b3ec34?w=762&h=1622&f=png&s=92542)


##### 启动IOS真机

在执行`flutter doctor`的时候， 我们安装了很多东西， 其中 ios tools 那一部分的相关依赖 现在就能派上用场啦~

1. 在Flutter项目目录中通过 `open ios/Runner.xcworkspace ` 打开默认的Xcode workspace.
2. 在Xcode中，选择导航面板左侧中的Runner项目， 点击 Runner， 进入Runner target设置页面， 在 General > Signing > Team 下选择开发团队。 当选择一个团队后，Xcode会创建并下载开发证书，向你的设备注册你的帐户，并创建和下载配置文件（如果需要）。
3. 要开始您的第一个iOS开发项目，您可能需要使用您的Apple ID登录Xcode， 如图：
![](https://cdn.jsdelivr.net/gh/flutterchina/flutter-in-action/docs/imgs/1-5.png)
开发完成的app要想上架到 app store, 还需要注册Apple开发者计划， 这就不详细介绍了
4. 到此为止， 我们就可以连接用手机连接电脑， 连接成功后，需要同时信任你的Mac和该设备上的开发证书。 同意之后就可以再真机上看见我们的第一个app啦~~

到此为止， 我们的flutter 从安装到第一个应用程序跑起来就圆满成功啦~~

----
参考链接：

   1. [flutter 中文网](https://flutterchina.club/)
   2. [flutter 实战](https://book.flutterchina.club/)
   3. [Flutter 完全手册(掘金小册)](https://juejin.im/book/5c5423ef6fb9a049cd54a213)
   4. [Flutter免费视频第一季-环境搭建  （大佬技术胖 出品)](https://jspang.com/posts/2019/01/20/flutter-base.html)