---
title: 'React : 生命周期'
date: 2017-10-31 11:10:26
tags:
  - React
  - 生命周期函数
cover: https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---
---
![](https://o5wwk8baw.qnssl.com/d40ba0950637b6795eba91201dc47367/large)

<br>

本文对 react 的生命周期函数 做了一下简单的介绍

<!-- more -->

[官方文档 戳这里~][1]

react中的每个组件都有几个“生命周期函数”， 他们会在组件的运行过程中的特定时机触发。

react的生命周期函数主要包括三种：  挂载、更新和 卸载。

#### 挂载

这些方法在 创建组件示例并将其插入到DOM中调用。

* <a href='#1'> constructor() </a>
* <a href='#2'> componentWillMount() </a>
* <a href='#3'> render() </a>
* <a href='#4'> componentDidMount() </a>

#### 更新

这些方法在 组件的state或者props发生改变，组件重新渲染时 调用。

* <a href='#5'> componentWillReceiveProps() </a>
* <a href='#6'> shouldComponentUpdate() </a>
* <a href='#7'> componentWillUpdate() </a>
* <a href='#3'> render() </a>
* <a href='#8'> componentDidUpdate() </a>

#### 卸载

这些方法在 组件卸载的时候调用。

* <a href='#9'> componentWillUnmount() </a>

<hr />

##### <a name='3'>render()</a>

返回类型包括以下几种类型：
  1. react节点
  2. num或者 string， 将会被渲染成文本节点
  3. null， 不做渲染
  4. boolean， 不做渲染

注：  shouldComponentUpdate() 返回 false时 不会调用 render()

##### <a name='1'>constructor()</a>

React 的构造函数在挂载之前被调用。
构造函数常被用来进行数据的初始化操作，数据存放在对象  this.state 中。构造函数也经常用于将事件处理程序绑定到类实例。

如果不需要进行初始化状态，也不需要绑定方法，则 构造函数可省略，但是需要注意的是，若在组件中添加了constructor() 方法，则需添加super(props), 否则 this.props会在构造函数中被定义，导致错误。

##### <a name='2'>componentWillMount()</a>

componentWillMount() 在组件被挂载之前被调用。会在render() 方法之前调用。

##### <a name='4'>componentDidMount()</a>

componentWillMount() 在组件被挂载之后立即被调用。

##### <a name='5'>componentWillReceiveProps()</a>

componentWillReceiveProps()在组件接收新的props之前被调用。
如果需要根据props的变化更新state的值，可以通过比较this.props和nextProps和state并通过 this.setState()更新state的值。

本方法会在React组件接受到新的props时才会调用。但是需要注意的是，即使props没有发生变化，React也有可能会触发本函数。比如在父组件导致子组件重新渲染的时候。如果需要真正的处理props的变化，可以通过对this.props 和 nextProps 进行比较来实现。

##### <a name='6'>shouldComponentUpdate()</a>

当组件接收到新的props或state时，在组件渲染之前会先调用shouldComponentUpdate()。

本方法用于告诉 React 组件是否需要重新渲染。

在shouldComponentUpdate() 返回true，则组件会重新渲染（初始化渲染时除外），反之，组件将不会重新渲染。

##### <a name='7'>componentWillUpdate()</a>

componentWillUpdate()会在组件将要更新之前调用。

需要注意的是，不可在本方法中进行 setState操作。 更新state后，组件在重新渲染之前，会再次调用本方法，会造成程序崩溃。


##### <a name='8'>componentDidUpdate()</a>

在组件更新之后马上调用。

在本方法中也不可进行 setState操作。

##### <a name='9'>componentWillUnmount()</a>

在组件被卸载之前调用。可做一些清除操作。


  [1]: https://reactjs.org/docs/react-component.html