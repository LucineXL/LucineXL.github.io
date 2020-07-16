---
title: es5 与 es6 中的 数组   （更新中。。。）
date: 2017-09-07 11:39:22
tags: Array
cover: https://images.pexels.com/photos/1322350/pexels-photo-1322350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---

JavaScript 中的数组是一种很常用的数据类型，有大量的api，在es6中又添加了一些，本文主要介绍了 es5 和 es6 中的Array 对象的大部分用法，便于记忆和查询。

<!-- more -->

### 数组的创建

数组的创建主要有两种方式。

##### 使用构造函数创建

```JavaScript
    var arr1 = new Array();     // []
    var arr2 = new Array(3);    // [undefined, undefined, undefined]
    var arr3 = new Array(1, 2, 3);   // [1,2,3]
```

##### 使用字面量方式构建

```JavaScript
    var arr1 = [];        // []
    var arr2 = [1,2,3];   // [1,2,3]
    var arr3 = [1,2,];    // [1,2,undefined],  不推荐
```

### 转换方法

##### toString

toString 方法将数组拼接成一个由','分隔的字符串。

```JavaScript
    var arr = [1,2,3];
    arr.toString()   // "1,2,3"
    console.log(arr)   // [1,2,3]
```
##### join

join 方法也是用来将数组拼接成一个字符串，与toString 不同的是，使用join方法我们可以自己定义分隔符。

```JavaScript
    var arr = [1,2,3];
    console.log(arr.join(''));    //"123"
    console.log(arr.join(','));   //"1,2,3"
    console.log(arr.join('|'));   //"1|2|3"
    console.log(arr);             //[1,2,3]
```

### 栈方法

栈结构是一种后进先出的数据结构，也就是最先插入的数据最后被删除。

#### push

此方法用来向数组的结尾插入数据。它可以接收任何数量的参数，把他们逐个插入到数组末尾，并且返回新数组的长度。

```JavaScript
    var arr = [1,2,3,4];
    console.log(arr.push(5,6)) // 6
    console.log(arr) // [1,2,3,4,5,6]
```

#### pop

此方法用来从末尾移除最后一项，并且返回删除的项，同时将数组的长度减1。

```JavaScript
    var arr = [1,2,3,4];
    console.log(arr.pop())  // 4
    console.log(arr) //[1,2,3]
```

### 队列方法

队列是一种先进先出的数据结构，也就是最新添加的项最先被移除。

#### shift

此方法用来从末尾移除数组的第一项，并且返回删除的项，同时将数组的长度减1。

```JavaScript
    var arr = [1,2,3,4];
    console.log(arr.shift()) // 1
    console.log(arr) // [2,3,4]
```

#### unshift

此方法用来向数组首部添加新数据，并且返回新数组的长度

```JavaScript
    var arr = [1,2,3,4];
    console.log(arr.unshift(5,6)) // 6
    console.log(arr) // [1,2,3,4,5,6]
```

### 重排序方法

#### reverse

reverse 方法用来反转数组的顺序

```JavaScript
    var arr = [1,2,3,4];
    arr.reverse();
    console.log(arr); //[4,3,2,1]
```

#### sort

sort方法可用来对数组进行排序。
默认情况下，sort() 方法会按升序排列数组项。需要注意的是，sort方法在排序的时候，会调用每个数组项的toString方法，所以sort比较的是字符串，比如：

```JavaScript
    var arr = [1,5,10,15,20,25];
    arr.sort();
    console.log(arr); // [1,10,15,20,25,5]
```



```JavaScript

```