---
title: 从零开始学Flutter (3) flutter 初体验
date: 2019-09-05 17:35:28
tags:
    - flutter
cover: https://images.pexels.com/photos/2852438/pexels-photo-2852438.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

往期链接：

- [从零开始学Flutter (1) 初识Flutter](https://lucinexl.github.io/2019/08/21/flutter1/)
- [从零开始学Flutter (2) Flutter 开发环境搭建](https://lucinexl.github.io/2019/08/22/flutter2/)

## flutter框架结构

我们看一下Flutter官方提供的Flutter框架图
![flutter框架图](https://cdn.jsdelivr.net/gh/flutterchina/flutter-in-action/docs/imgs/1-1.png)

### Flutter Framework

Dart实现的SDK, 他实现了一套基础库。

- 底下两层（Foundation和Animation、Painting、Gestures）在Google的一些视频中被合并为一个dart UI层，对应的是Flutter中的dart:ui包，它是Flutter引擎暴露的底层UI库，提供动画、手势及绘制能力。

- Rendering层，这一层是一个抽象的布局层，它依赖于dart UI层，Rendering层会构建一个UI树，当UI树有变化时，会计算出有变化的部分，然后更新UI树，最终将UI树绘制到屏幕上，这个过程类似于React中的虚拟DOM。Rendering层可以说是Flutter UI框架最核心的部分，它除了确定每个UI元素的位置、大小之外还要进行坐标变换、绘制(调用底层dart:ui)。

- Widgets层是Flutter提供的的一套基础组件库，在基础组件库之上，Flutter还提供了 Material 和Cupertino两种视觉风格的组件库。Material 用于 Android，Cupertino 用于 iOS。**而我们Flutter开发的大多数场景，只是和这两层打交道**。

### Flutter Engine

这是一个纯 C++实现的 SDK，其中包括了 Skia引擎、Dart运行时、文字排版引擎等。在代码调用 dart:ui库时，调用最终会走到Engine层，然后实现真正的绘制逻辑。

##  flutter 的基础 - Widget

在进行Flutter 开发时， 一切都离不开 Widget，Widget是 Flutter 的基础。 在Flutter, 几乎所有的对象都是Widget。我们可以把widget理解成组件或者控件。

Widget的功能是“描述一个UI元素的配置数据”，也就是说，Widget其实并不是表示最终绘制在设备屏幕上的显示元素，而它只是描述显示元素的一个配置数据。而真正绘制在设备屏幕上的显示元素 是 Element。Widget类本身是一个抽象类，其中最核心的就是定义了createElement()接口。 在渲染时， 会通过Widget 生成 element，最终生成真正的UI渲染树。既然Widget只是一份配置数据， 那么 一个Widget 就可以对应多个 Element。

### Widget的结构： Widget树

Widget 组合的结构是树，所以叫做 Widget树。

![Widget树 结构](https://user-gold-cdn.xitu.io/2019/3/3/1694414ab4da9231?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在Widget树中， Widget有包含和被包含关系，但是一个Widget只能有一个根Widget。

在flutter中， 根Widget只能有三种方式：
- WidgetsApp
  WidgetsApp 是可以自定义风格的 根Widget。
- MaterialApp
  MaterialApp是基于 WidgetsApp 实现的 Material Design (Android默认的视觉风格) 风格的 根Widget。
- CupertinoApp
  CupertinoApp是基于 WidgetsApp 实现的 iOS 风格的 根Widget。

这三个中最常用的是 MaterialApp，因为 MaterialApp 的功能最完善。MaterialApp 经常与 Scaffold 一起使用。

Scaffold 实现了 Material Design 的基本布局结构，例如 AppBar、Drawer、SnackBar 等，所以为了使用这些布局，也必须要使用 Scaffold，所以一个 Flutter App 的 基本结构就是：Root Widget 是 MaterialApp ，然后 MaterialApp 的 子Widget 就是 Scaffold，然后我们在 Scaffolfd 的 子Widget 里写UI。

### Widget的种类： StatefulWidget 和 StatelessWidget

渲染是很耗性能的，为了减少不必要的渲染， 根据UI是否会发生变化， 将 Widget 分成了 `StatefulWidget` 和 `StatelessWidget`两种。

####  StatelessWidget： UI 不可以变化的 Widget

StatelessWidget 是没有 State（状态）的 Widget，当 Widget 在运行时不需要改变时，就用 StatelessWidget。

参考demo:

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        body: Text("Hello World"),
      ),
    );
  }
}
```

####  StatefulWidget：  UI 可以变化的 Widget

StatefulWidget 是 UI 可以变化的 Widget。


使用StatefulWidget实现一个简单的计数器， 代码实现如下：

```
import 'package:flutter/material.dart';

void main () => runApp(MyApp());

class MyApp extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => MyAppState();
}

class MyAppState extends State<MyApp> {
  int _counter = 0;

  void _countClick() {
    setState(() {
      _counter++;
    });
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'flutter demo',
      theme: ThemeData(
        primaryColor: Colors.blue
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('flutter demo'),
        ),
         body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('You have pushed the button this many times:'),
              Text(_counter.toString()),
            ],
          )
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _countClick,
          tooltip: 'Increment',
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```

简化一下 MyApp 的结构：
```
class MyApp extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => MyAppState();
}

class MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
      return ...
  }
}

```
可以看到实现 StatefulWidget，需要两部分组成：

- StatefulWidget
- State

##### StatefulWidget

StatefulWidget 的实现步骤：
- 继承自 StatefulWidget
- 通过createState()方法  返回一个State

StatefulWidget 的功能就是创建一个State

##### State

一个StatefulWidget类会对应一个State类，State表示与其对应的StatefulWidget要维护的状态。

State 的实现步骤：

- 首先继承 State，State 的泛型类型是上面定义的 Widget 的类型
- 实现 build() 的方法，返回一个 Widget
- 需要更改数据，刷新 UI 的话，调用 setState()

State有两个功能：

- build() —— 创建 Widget， 用于显示UI
- setState() —— 更新状态，刷新 UI

#### State  的生命周期

1. initState

 当Widget第一次插入到Widget树时会被调用，对于每一个State对象，Flutter framework只会调用一次该回调。

2. didChangeDependencies

initState() 方法运行完后，就立即运行 didChangeDependencies() 方法。

当State对象的依赖发生变化时此方法也会被调用。

3. build

它主要是用于构建Widget子树的，会在如下场景被调用：

    - 在调用initState()之后。
    - 在调用didUpdateWidget()之后。
    - 在调用setState()之后。
    - 在调用didChangeDependencies()之后。
    - 在State对象从树中一个位置移除后（会调用deactivate）又重新插入到树的其它位置之后。

4. setState

当状态有变化，需要刷新UI的时候，就调用 setState()，会触发强制重建 Widget。

5. didUpdateWidget

在widget重新构建时，Flutter framework会调用Widget.canUpdate来检测Widget树中同一位置的新旧节点，然后决定是否需要更新，如果Widget.canUpdate返回true则会调用此回调。

在 didUpdateWidget() 里，会把新的 Widget 的配置赋值给 State，相当于重新 initState() 了一次。

6. deactive

当State对象从树中被移除时，会调用此回调。

7. dispose

当State对象从树中被永久移除时调用；通常在此回调中释放资源。

8. reassemble

此回调是专门为了开发调试而提供的，在热重载(hot reload)时会被调用，此回调在Release模式下永远不会被调用。

StatefulWidget生命周期如图所示：

![生命周期](https://cdn.jsdelivr.net/gh/flutterchina/flutter-in-action/docs/imgs/3-2.jpg)


然后  我们可以通过之前那个计数器的例子  来更加直观的看一下：

```
import 'package:flutter/material.dart';

void main () => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'flutter demo',
      theme: ThemeData(
        primaryColor: Colors.blue
      ),
      home: Count(),
    );
  }
}

class Count extends StatefulWidget {

  final initCount = 0;

  @override
  State<StatefulWidget> createState() => CountState();
}

class CountState extends State<Count> {

  int _counter;

  @override
  void initState() {
    super.initState();
    //初始化状态
    _counter = widget.initCount;
    print("initState");
  }

  void _countClick() {
    print('setState');
    setState(() {
      _counter++;
    });
  }
  @override
  Widget build(BuildContext context) {
     print("build");
    return Scaffold(
      appBar: AppBar(
        title: Text('flutter demo'),
      ),
        body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times: 1'),
            Text(_counter.toString()),
          ],
        )
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _countClick,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }

  @override
  void didUpdateWidget(Count oldWidget) {
    super.didUpdateWidget(oldWidget);
    print("didUpdateWidget");
  }

  @override
  void deactivate() {
    super.deactivate();
    print("deactive");
  }

  @override
  void dispose() {
    super.dispose();
    print("dispose");
  }

  @override
  void reassemble() {
    super.reassemble();
    print("reassemble");
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print("didChangeDependencies");
  }
}

```


我们这个时候去启动项目， 就能在终端中看见输出的 log

```
Launching lib/main.dart on iPhone X in debug mode...
Xcode build done.                                            8.0s
flutter: initState
flutter: didChangeDependencies
flutter: build
```

我们这个时候， 去改变页面的展示文案， 然后我们点击⚡️按钮热重载， 控制台输出日志：

```
flutter: reassemble
flutter: didUpdateWidget
flutter: build
```

然后 我们将MyApp中 Count 移除

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'flutter demo',
      theme: ThemeData(
        primaryColor: Colors.blue
      ),
      home: Scaffold(
      appBar: AppBar(
        title: Text('flutter demo'),
      ),
        body: Text('hello world')
      ),
    );
  }
}
```

在Count从widget树中移除时，deactive和dispose会依次被调用。 此时可以看到控制台的输出：

```
flutter: reassemble
flutter: deactive
flutter: dispose
```
