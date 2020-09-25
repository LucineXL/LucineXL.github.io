---
title: 2020 js 高频面试题
date: 2020-09-14 11:07:31
tags:
    - javaScript
    - 面试
cover: https://cdn.pixabay.com/photo/2020/06/26/17/16/daisies-5343423__480.jpg
---

梳理一下比较高频的面试题

### 1. 拷贝

#### 1. 浅拷贝： 只拷贝对象或数组的第一层内容

```
function shallowClone = (target) => {
    if (typeof target === 'object' && target !== null) {
        return Array.isArray(target) ? [...target] : Object.assign({}, target);
    }
    return target;
}
```

#### 2. 深拷贝： 拷贝整个对象或者数组

##### JSON.stringify

最简单粗暴的方式 使用`JSON.stringify`， 但是需要注意的是，`JSON.stringify`会存在一些问题

1.  `undefined`, `function`, `symbol`  会变成 null
2. 正则表达式`RegExp`会变成空对象
3. Date 的格式会发生变化

看以下例子
```
let arr = [
  1, '1', null, true, undefined, [1,2,3], new Date(), new RegExp(/a/), function() {}, Symbol('111')
]

let newArr = JSON.parse(JSON.stringify(arr));
```

![](https://tva1.sinaimg.cn/large/007S8ZIlly1giqfon88a3j31540u0td1.jpg)

##### 手动实现一个深拷贝

```
function deepClone = (target) => {
  // 处理 null
  if (target === null) return target;
  // 非null 的其他基本数据类型
  if (typeof target !== 'object') return target;
  // RegExp 类型
  if (target instanceof RegExp) return new RegExp(target);
  // Date 类型
  if (target instanceof Date) return new Date(target);
  // 递归
  let result = new target.constructor;
  for (let key in target) {
    if(target.hasOwnProperty(key)) {
      result[key] = deepClone(target[key]);
    }
  }
  return result;
}

```


### 2. 手动实现一个防抖函数

防抖： 短时间内多次触发同一事件， 只执行第一次或者最后一次

应用场景： 窗口resize或者scroll的时候， 不需要每次都执行回调， 只需要执行第一次或者最后一次即可


只执行最后一次
```
function debounce(func, dur) {
  let timer = null;
  return function(...params) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.call(this, ...params);
    }, dur)
  }
}
```

只执行第一次

```
function debounce(func, dur) {
  let timer = null;
  return function(...params) {
    if(timer) clearTimeout(timer);
    let isNow = !timer;
    timer = setTimeout(() => {
      timer = null;
    }, dur);
    if(isNow) {
      func.call(this, ...params);
    }
  }
}
```

综合版
```
// immediate 是否立即执行   true/false
function debounce(func, dur, immediate) {
  let timer = null;
  return function(...params) {
    if(timer) clearTimeout(timer);
    if (immediate) {
      let isNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, dur);
      if(isNow) {
        func.call(this, ...params);
      }
    } else {
      timer = setTimeout(() => {
        timer = null;
        func.call(this, ...params);
      }, dur)
    }
  }
}
```
### 3. 手动实现一个节流函数

节流：  连续触发同一事件，在一段时间内只执行一次

应用场景：输入框搜索， 一定时间内 只搜索一次即可

```
function throttle(fn, dur){
  let timer = null
  return function(...params){
    if(!timer){
      timer = setTimeout(() => {
        timer = null
        fn.call(this, ...params)
      }, dur)
    }
  }
}

```

### 4. 实现数组扁平化

```
const arr = [1, [2, [3, [4, 5]]], 6];
```

#### 1. Array.flat()

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

flat接受一个参数， 指定要提取的数组深度， 默认为1

```
const res1 = arr.flat(); // [1,2,[3,[4,5]],6]
const res2 = arr.flat(2); // [1,2,3, [4, 5], 6]
const res3 = arr.flat(Infinity); // [1,2,3,4,5,6]   使用Infinity展开任意结构的数组
```

#### 2. 使用foreach实现

```
function flat(arr) {
  const res = [];
  arr.forEach(element => {
    if (Array.isArray(element)) {
      res.push(...flat(element));
    } else {
      res.push(element)
    }
  });
  return res;
}
```

#### 3.使用reduce实现
```
function flat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, [])
}
```


### 5. 数组去重

#### 1. 使用 Set 结构
```
Array.from(new Set(arr))
```

#### 2. 使用indexof

```
function unique(arr) {
    const res = [];
    arr.forEach((item, index) => {
      if (arr.indexof(item) === index) {
        res.push(item);
      }
    })
    return res;
}
```

#### 3. 使用includes

```
function unique(arr) {
    const res = [];
    arr.forEach((item, index) => {
      if (!res.includes(item)) {
        res.push(item);
      }
    })
    return res;
}
```

#### 4. 使用filter

```
function unique(arr) {
    return arr.filter((item, index) => arr.indexof(item) === index);
}
```

#### 5. 使用对象键值对

```
function unique(arr) {
  let obj = {};
  let res = [];
  arr.forEach((item, i) => {
    if (obj[item] === undefined) {
      obj[item] = item;
      res.push(item);
    }
  });
  obj = null;
  return res;
}
```
#### 6. 正则表达式

```
function unique(arr) {
  arr.sort((a,b)=> (a-b));
  let str = arr.join('@') + '@';
  let reg = /(\d+@)\1*/g;
  let res = [];
  str.replace(reg, (value, group) => {
    console.log(value, group)
    res.push(parseFloat(group))
  })
  return res;
}
```

### 6. 手动实现reduce方法

reduce:   arr.reduce((prev, next, currentIndex, array) => {}, initValue)

```
  let arr = [1,2,3, 4];
  Array.prototype.myRuduce = function (callback, initValue) {
    let prev = initValue;
    this.forEach((item, index) => {
      prev = callback(prev, item, index, this);
    })
    return prev;
  }

  let res = arr.myRuduce((pre, item, index, arrList) => {
    console.log(pre, item, index, arrList);
    pre += item;
    return pre;
  }, 0)
```

### 7. 类数组转化为数组

类数组：
1. 拥有length属性，其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)
```
var a = {'1':'gg','2':'love','4':'meimei',length:5}; // 类数组
var b = {'1':'gg','2':'love','4':'meimei'}; // 非类数组
```
2. 不具有数组所具有的方法
 如 shift,unshift,splice,slice,concat,reverse,sort等


常见的类数组有arguments、DOM操作方法返回的结果。


#### 1. Array.from
```
Array.from(a)
```
#### 2. 扩展运算符

```
[...document.querySelectorAll('div')]
```

#### 3. 使用concat

```
Array.prototype.concat.apply([], a)
```

#### 4. 使用slice

```
Array.prototype.slice.call(a)
```

### 8. 手动实现通用柯理化函数

柯理化函数: 是指这样一个函数(假设叫做currying)，他接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数。
参考文章： [前端基础进阶（十）：深入详解函数的柯里化][1]

```
 function add (a,b,c,d) {
    return a+b+c+d
  }

  function currying (fn, ...args) {
    // fn.length 回调函数的参数的总和
    // args.length currying函数 后面的参数总和
    // 如：add (a,b,c,d)  currying(add,1,2,3,4)

    if (args.length < fn.length) {
      return function(...argments) {
        return currying(fn, ...args, ...argments);
      }
    }
    return fn(...args);
  }
```





参考文章

[「灵魂之作」2020斩获30道高频JS手撕面试题][0]


[0]: https://juejin.im/post/6870319532955828231
[1]: https://www.jianshu.com/p/5e1899fe7d6b