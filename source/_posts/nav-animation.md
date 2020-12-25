---
title: 二级导航进化史
date: 2020-12-25 14:21:20
tags:
---

最近在做导航的重构， 关于导航的动画几经波折， 终于圆满结束， 梳理一下进化过程

##### 导航dom结构及最终效果

左侧一级导航列表 `ul`, 每一个一级导航模块为`li`, 右侧二级导航部分为`div`, 右侧二级导航部分始终固定在一级导航右侧， 高度撑满全屏， hover一级导航时展示对应二级导航

样式如下图
<div align=center >
<image src="https://tva1.sinaimg.cn/large/0081Kckwgy1gm05zdbxflj30gs0hkdia.jpg" width="300px" />
</div>

最终效果如图
<div align=center >
![](https://tva1.sinaimg.cn/large/0081Kckwgy1gm04k6gf2fg30a006ogu9.gif)
</div>


其实跟[淘宝首页][0]类别选择模块的效果很相似
<div align=center >
<image src="https://tva1.sinaimg.cn/large/0081Kckwgy1gm0525nblej318q0u07ms.jpg" width="400px" />
</div>


### v1.0

```
<ul>
{menu.map(item => {
    <li>
        <a href={item.url}>{item.name}</a>
        <div>
            // 展示一级导航相关的二级导航
            {...item.detail}
        </div>
    </li>
})}
</ul>
```

最初版本实现方式， 将二级导航（以下称为detail部分）放在`li`内部， `li`hover时, 将该`li`中的detail`display`设为可见

导航右侧detail部分在显示和隐藏的时候需要有一个缓慢收起和打开的动画效果， 鼠标在左侧导航列表hover过程中， 右侧detail部分只应该内容切换， div大小不能发生改变。

使用这个实现方式， 在每一个`li`元素下都有一个detail元素， 所以是没有办法做到hover切换的时候， 右侧detail大小不变， 只切换展示内容的

于是乎， 这个版本 pass


### v2.0

为了解决1.0的detail宽度不变的问题， 就只能所有二级导航共用一个detail元素， 只能通过变量记录需要当前hover的一级导航， 根据变量在detail渲染相关内容

dom结构如下：
```
class MainNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentNav: null,
        };
    }

    // 鼠标移入事件
    setCurrent = (nav = null) => {
        this.setState({
        currentNav: nav,
        });
    });

    // 鼠标移出事件
    handleMouseLeave = () => {
        if (this.state.currentNav) {
        this.setCurrent();
        }
    }

    return () {
        return (
            <div>
                <ul>
                    <li
                        onMouseEnter={() => this.setCurrent(currentNavObj)}
                        onMouseLeave={this.handleMouseLeave}
                    >一级导航</li>
                </ul>
                <div
                    onMouseEnter={() => this.setCurrent(currentNavObj)}
                    onMouseLeave={this.handleMouseLeave}
                >
                    {...details}
                </div>
            </div>
        )
    }
}
```

通过监听鼠标的移入移出事件， 鼠标移入 设置变量， 鼠标移出 清空变量

左侧列表和右侧detail是连在一起的，左侧li移出的同时，右侧鼠标移入， 1.0 的问题完美解决

截止到现在， 已经基本完成需求， 但还是有一些问题

<div align=center >
<image src="https://tva1.sinaimg.cn/large/0081Kckwly1gm06yh6f6bj316c0qwq6x.jpg" width="500px" />
</div>

如上图, 当hover在位置靠下的一级导航块B的时候， 鼠标右滑点击二级导航时， 本着两点之间直线最短的原则，正常操作会直接斜向上滑动到二级导航（图中红色箭头的路线）， 当鼠标滑动到一级导航块A范围内的时候， 变量会被设置为A， 于是， 此时二级导航部分展示的其实是导航A的内容，  要想显示B的二级导航内容， 就只能鼠标先向右滑动， 再向上滑动， 这样的交互对用户不是特别友好

于是， 便有了接下来的 3.0 版本

### v3.0

前端面试中经常出现的一个面试题是`防抖`和`节流`, 我们先来复习一下


#### 1. 防抖

如果短时间内大量触发同一事件，只会在最后一次执行这个函数。

实现方式：

```
function debounce(fn,delay){
    let timer = null
    return function() {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn,delay)
    }
}
```


#### 2. 节流

如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。

实现方式：

```
function throttle(fn,delay){
    let valid = true
    return function() {
       if(!valid){
           return false
       }
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
```

所以优化一下鼠标移入和移出函数

```
  this.enterTimer = null;
  this.leaveTimer = null;

  /**
   * 鼠标移入事件
   */
  mouseEnter = (nav = null) => {
    // 清空鼠标移出的计时器
    clearTimeout(this.leaveTimer);
    // 使用防抖， 100ms内只执行最后一次
    if (this.enterTimer) {
      clearTimeout(this.enterTimer);
    }
    this.enterTimer = setTimeout(() => {
      this.setState({
        currentNav: nav,
      });
    }, 100);
  };

  /**
   * 鼠标移除时间
   */
  mouseLeave = () => {
    // 若鼠标移出50s后， 清空移入计时器， 清空变量
    this.leaveTimer = setTimeout(() => {
      clearTimeout(this.enterTimer);
      this.setState({
        currentNav: null,
      });
    }, 50);
  };

```


至此， 导航动画圆满结束

梳理一下  其实也没啥难点， 就是用了个防抖

------

刚刚被告知这个需求有可能要重构   🤣🤣🤣🤣🤣🤣

就用这篇文章证明一下  这几天没有折腾个寂寞吧

tips: 我终于分清哪个是防抖， 哪个是节流了 ~



[0]: https://www.taobao.com/