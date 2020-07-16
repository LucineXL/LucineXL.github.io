---
title: 一个例子深入浅出 Render Props 和 HOC
date: 2020-04-24 11:53:52
tags:
    - React
    - Render Props
    - HOC
cover: https://images.pexels.com/photos/666839/pexels-photo-666839.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

### 需求背景

假设目前有这样的一个需求，有一个后台管理系统， 里面有很多功能结构类似的列表， 每个列表都是进入页面后请求接口， 然后根据获取到的数据对列表进行渲染， 然后列表还包括一些简单的排序， 分页等功能。

这种最简单的实现方式就是在每个列表中把这些功能都实现一遍。

```
// list A
class ListA extends Components {
    // 列表通用逻辑
    handleSearch = () => {}
    handleChangePage = () => {}
    ...

    render() {
        const { list } = this.state;
        return (
            <div>
            // 列表A渲染
            </div>
        )
    }
}
// list B

class ListB extends Components {
    // 列表通用逻辑
    handleSearch = () => {}
    handleChangePage = () => {}
    ...

    render() {
        const { list } = this.state;
        return (
            <div>
            // 列表B渲染
            </div>
        )
    }
}

list C, list D....
```

这样正常使用是没有问题了， 可是用这样的实现方式， 写了太多的重复代码，身为一个追求完美的程序员， 自然是要追求更高级的实现方式~

React的高级组件有两种实现方式：

1. Render Props
2. 高阶组件 HOC

### Render Props

#### 什么是 Render Props
Render props 是 React 16 + 之后出现的新特性。 官方是这样解释的:
>“render prop” 是指一种简单的技术，用于使用一个值为函数的 prop 在 React 组件之间的代码共享。

通俗一点解释， 就是一个组件， 接受一个名为render的props属性， render是一个函数， 会在组件render 的时候调用，而不是实现自己的渲染逻辑。

看到这里， 还是有点一头雾水的感觉， react 不是 本来就有组件之间的封装和嵌套吗，为什么非要通过这种方式给一个组件注入另一个组件的代码呢？官方是这样解释的:
>render prop 是一个组件用来了解要渲染什么内容的函数 prop。

所以， 再通俗的解释， 当一个组件的基础功能是提供“可变数据”， 不知道自己需要渲染什么东西的时候， 具体的展示可以从外部注入。

我们可以通过上面的例子来加深理解

#### Render Props的使用

在上面的例子中， 列表获取、分页、筛选等功能都是相同的，没有必要再使用的时候一遍又一遍的重复写这些逻辑。

如果能把这些逻辑提取成公共组件的话， 那样就完美了。

可是如果提取成公共组件的话， 每个列表的渲染是不同的， 这段又不能被封装进公共部分，这个时候， 就可以使用 `Render Props` 了。

我们可以提供一个带有函数 props 的 ConmmonList 组件， 他能够根据我们的需要进行动态渲染。

实现方式：

```
class ConmmonList extends Components {
    // 列表通用逻辑
    handleSearch = () => {}
    handleChangePage = () => {}
    ...

    render() {
        const { list, render } = this.state;
        return { this.props.render(list) }
    }
}

class ListA extends Components {
    render() {
        return <ConmmonList render={(list) => (<ListARender list={list} >)}
    }
}

class ListB extends Components {
    render() {
        return <ConmmonList render={(list) => (<ListBRender list={list} >)}
    }
}

// ListC, ListD ...
```

`render props` 的好处在于， 不需要通过“混入”或者装饰来共享组件行为，一个普通组件只需要一个函数 prop 就能够进行一些 state 共享。

子组件（上例中的ConmmonList） 通过 render 方法将自己的state暴露给了父组件（ListA, listB）, 我们就可以在父组件中随意使用这个state， 组件之间的通信变得简单并且优雅。


#### 使用 Props 而非 render

我们只是把这种模式成为 `render props`, 传入组件中的props 不一定非要叫 render，换成 childer或者其他的名字都可以。

既然说到了`children`, 那么这个children和普通的children有什么不一样呢，  普通的children的使用：

```
render() {
    return <div>{this.props.children}<div>
}
```

普通的children 是一个react element， 不需要函数调用， 可以直接使用， 但是如果我们使用 `render props`， 那么传入的 children 是一个函数， 所以最好在propTypes 里声明 children 应为一个函数类型。

```
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

#### 警告: 在 React.PureComponent 中使用 render props 要注意

我们在`render props` 时， 每次向子组件（上例中的 commonList）中传入的render函数 是一个匿名函数， 如果子组件（commonList）使用了react.pureComponent,  因为pureComponent 是进行了浅比较， 所以每次新的匿名函数和上次都不会相等， 那么组件每次都会重新render，pureComponent 也就不会生效了

解决方法： 把render方法也用变量存一下就可以了

```
class ListA extends Components {
    renderList = (list) => (<ListARender list={list} >);
    render() {
        return <ConmmonList render={this.renderList}
    }
}
```

### 高阶组件 - Higher Order Component（ HOC ）

#### 什么是高阶组件

在介绍高阶组件之前， 我们先来说一下高阶函数（ Higher-Order Function）。

通俗的解释， 高阶函数是一个接收函数作为参数或者将函数作为返回输出的函数。

比如`Array.prototype.map`，`Array.prototype.filter`，`Array.prototype.reduce` 和 `Array.prototype.sort`都是JavaScript中内置的高阶函数，它们接受一个函数作为参数，并应用这个函数到列表的每一个元素。

而高阶组件类似于高阶函数，就是一个函数，接收一个react组件作为参数， 返回另一个新的react组件。 高阶组件本质上来说，就是高阶函数。

#### 高阶组件的使用

通过高阶组件的方式解决上面的问题

```
function withSearchList(Component) {
    return class ConmmonList extends Components {
        // 列表通用逻辑
        handleSearch = () => {}
        handleChangePage = () => {}
        ...

        render() {
            const { list } = this.state;
            return { <Component list={list} /> }
        }
    }
}
```

#### 注意：

1. 不要再render中调用HOC

```
render() {
    const withSearchList = withSearchList(Component);
    return <withSearchList />
}
```
在render中调用HOC， 每次组件render时， 都会重新创建一个新的 withSearchList， 子组件每次都会卸载重新挂载， 这样不仅影响性能， 同样会导致子组件中的状态丢失。

所以 在使用的时候只需要在组件外部使用HOC， 只需要创建一次HOC就可以了


2. 复制静态方法

在使用HOC对组件进行包装时， 并不会将原始组件的静态方法包装在内， 需要手动把静态方法进行拷贝

```
// 定义静态函数
Component.staticMethod = function() {/*...*/}
// 现在使用 HOC
const searchListCompnent = withSearchList(Component);

// 增强组件没有 staticMethod
typeof searchListCompnent.staticMethod === 'undefined' // true

// 手动绑定静态方法
function withSearchList(Component) {
  class WithSearchList extends React.Component {/*...*/}
    // 必须准确知道应该拷贝哪些方法 :
    WithSearchList.staticMethod = Component.staticMethod;
  return WithSearchList;
}

```

3. Refs 不会被传递

虽然高阶组件的约定是将所有 props 传递给被包装组件，但这对于 refs 并不适用。那是因为 ref 实际上并不是一个 prop - 就像 key 一样，它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件。

### Render props 与 HOC

这两种方式都可以实现我们的需求， 那么这种实现方式有什么区别呢

在使用HOC时， 存在一个问题。

假设我们一个组件， 在经过了多个HOC封装之后， 最终得到了目标组件， 目标组件与初始组件相比， 很多属性发生了变化， 但是在目标组件中， 我们并不能明确的知道， 某个属性来自于那个HOC。 除此之外， 如果在HOC封装过程中， 不同的HOC存在相同的属性， 后面的HOC会将之前的HOC中相同名字的属性覆盖掉， 无法追溯。

但是这个问题在Render props中是不存在的， render props 父组件与子组件通过render方法共享state，不会因为重名出现属性覆盖的问题， 况且永远可以追溯。

Render props 和 HOC 都可以实现高级组件的功能， 至于要选择使用哪一个， 就具体情况具体分析呗~


>参考文章：
1. [React 高阶组件 官方文档][1]
2. [React Render props 官方文档][2]



[1]: https://zh-hans.reactjs.org/docs/higher-order-components.html
[2]: http://react.caibaojian.com/docs/render-props.html