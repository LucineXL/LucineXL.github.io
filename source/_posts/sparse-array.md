---
title: js 中的 稀疏数组
date: 2020-05-13 20:12:25
tags:
    - 稀疏数组
cover: https://images.pexels.com/photos/207247/pexels-photo-207247.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500

---

用一段代码开始今天的内容， 下面这段代码的运行结果是什么？

```
// demo 1
new Array(5).forEach((item, index) => { console.log(item, index) })

// demo2
new Array(5).fill(1).forEach((item, index) => { console.log(item, index) })
```


运行结果：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gewrlxazofj317m0cmwg5.jpg)

从上面的运行结果看， demo2 是可以正常输出的， 但是 demo1 是不会有输出的。

`new Array(5)` 生成的数组 在 js 中被称为 `稀疏数组`

在开始之前， 先看一道题， 本题来自 [44个 Javascript 变态题解析][0]

```
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});

```

这个题的答案是 []， 你答对了吗？


### JavaScript 中的稀疏数组

#### 何为稀疏数组？
稀疏数组是指索引不连续，数组长度大于元素个数的数组，通俗地说就是 有空隙的数组。

通常来说， 数组的length属性值代表数组中元素的个数。如果数组是稀疏的，length属性值大于元素的个数。

#### 怎么生成一个稀疏数组？

1. 构造函数声明一个没有元素的数组

```
const a = new Array(5)    // [empty × 5]

```

2. 指定的索引值大于数组长度
如果为一个数组元素赋值，它的索引 i 大于或等于现有数组的长度时，length 属性的值将设置为 i+1，中间部分为空

```
const a = []
a[5] = 4                // [empty × 5, 4]

```

3. 指定大于元素个数的数组长度
实际上这不会向数组中添加新的元素，它只是在数组尾部创建一个空的区域。

```
const a = []
a.length = 5            // [empty × 5]
```

4.  数组直接量中省略值

```
const a = [0,,,,]         // [0, empty × 3]
```

5. 删除数组元素
对一个数组元素使用 delete 不会修改数组的 length 属性，也不会将元素从高索引处移下来填充已删除属性留下的空白。如果从数组中删除一个元素，它就变成稀疏数组。

```
const a = [0, 1, 2, 3, 4]
delete a[4]             // [0, 1, 2, 3, empty]
```



上面的代码中有个 `empty`，这是打印数组输出的值，但是 JavaScript 中并没有这个基础数据类型，那这个 `empty` 到底是什么呢？看下面的代码：

```
const a = new Array(5)
console.log(a)     // [empty × 5]
a[0]               // undefined
```

难道 `empty` === `undefined`？

其实并不是这样的，`稀疏数组`是指数组之间有间隙的数组，`empty` 的意思是缺失，指这个位置是一个间隙，是没有元素的。 当你访问这个缺失的数据时，JavaScript 会临时给赋值成 `undefined`。


#### 稀疏数组的特性

现在我们知道了什么是稀疏数组，并且知道了怎么去生成一个稀疏数组和它与密集数组的区别，那它都有哪些特性呢？

首先来普及一下一个知识点，V8 引擎访问对象的两种模式
- Dictionary mode（字典模式）
- Fast mode（快速模式）

解释一下这两种模式
- Dictionary mode（字典模式）：字典模式也成为哈希表模式，V8 引擎使用哈希表来存储对象。
- Fast mode（快速模式）：快速模式使用类似 C 语言的 struct 来表示对象，如果你不知道什么是 struct，可以理解为是只有属性没有方法的 class

`稀疏数组` 则是采用的字典模式存储的，而这种模式的数据访问速度会比较慢

网上找到的相关测试图片：
![](https://camo.githubusercontent.com/00fb0f85604cfec2331c16c3dd9b4a745e114d8b/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31363736373330312d626633386634383238313436343333382e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)



足够稀疏的数组通常在实现上比稠密的数组更慢、内存利用率更高，在这样的数组中查找元素的时间与常规对象属性的查找时间一样长。

所以在使用稀疏数组时， 最好还是考虑一下， 是不是真的有必要使用稀疏数组。

### 稀疏数组 和 密集数组

`密集数组`：数组元素之间是紧密相连的，不存在空隙，也就是我们平时常用的数组

#### 稀疏数组 和 密集数组的区别

稀疏数组和密集数组的本质区别就是数组元素间是否是紧密相连的。 他们在使用 `Array`的常用方法时， 也存在一些差异


- `forEach` 遍历

在遍历到稀疏数组的缺失元素时，回调函数是不会执行的, 所以这就解释了上面的 demo1 为什么不会正常打印

```
const a = [1,,3,,]
a.forEach(i => { console.log(i) }) // 1 3   // 只会打印出不缺失位置的元素
```

- `map` 与 `filter`

`map`不会遍历缺失元素，但返回的结果具有与源数组相同的长度和空隙

`filter`缺失的元素会过滤掉

```
const a = [1,,,,5]

a.map(i => i)     // [1, empty × 3, 5]

a.filter(i => i)  // [1, 5]
```

到这里， 开篇的那道题， 最后的结果为什么是 [] 就明白啦， 因为缺失的元素被过滤掉了~

- `for-in` 与 `for-of`

`for-in` 与上面类似

`for-of` 则会将缺失的元素输出位 `undefined`

```
const a = [1,,,,5]
for (const i in a) { console.log(i) }    // 0 4
for (const i of a) { console.log(i) }    // 1 undefined undefined undefined 5
```

- `join`
缺失元素的位置会被保留
```
const a = [1,,,,5]
a.join()  // 1,,,,5
```

- `sort`
会正常排序，但不会对缺失元素排序，会返回与源数组相同的长度
```
const a = [5,,,,1]
a.sort()  // [1, 5, empty × 3]
```

- tips: 我们可以使用 `in` 查看一个索引值是否是数组的属性， 稀疏数组中为empty的索引是不能被查出来的

```
const arr = [1,,,,5];

0 in arr    // true
2 in arr    // false
4 in arr    // true
8 in arr    // false

```


### 稀疏数组转密集数组

如果我们拿到了一个稀疏数组， 那么怎么把他转换成一个密集数组呢~

1. Array.prototype.apply

```
// 生成一个稀疏数组
let arr = new Array(5);
console.log(arr);     //  [empty x 5]

// 进行转换
arr = Array.apply(null, arr);
console.log(arr);     //  [undefined, undefined, undefined, undefined, undefined]

```

2. Array.prototype.from

```
// 生成一个稀疏数组
let arr = [1,2,3];
delete arr[2];
arr[5] = 5;
console.log(arr);   // [1, 2, empty × 3, 5]

// 进行转化
arr = Array.from(arr);
console.log(arr);   // [1, 2, undefined, undefined, undefined, 5]
```

3. 使用 `...` 运算符

```
// 生成一个稀疏数组
let arr = [1,2,3,,,,];
console.log(arr);   // [1, 2, 3, empty × 3]

// 进行转化
arr = [...arr];
console.log(arr);   // [1, 2, 3, undefined, undefined, undefined]
```


[0]: http://javascript-puzzlers.herokuapp.com/