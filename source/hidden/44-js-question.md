---
title: 44道 JavaScript 面试题
date: 2020-07-06 17:22:59
tags:
 - JavaScript
cover: https://cdn.pixabay.com/photo/2020/07/03/13/10/daisy-5366270__480.jpg

---


44道你应该知道的js面试题  链接： [JavaScript Puzzlers!][0]



#### 第1题
```
["1", "2", "3"].map(parseInt)
```

>// MDN map用法
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array
}[, thisArg])

callback: 生成新数组元素的函数，接收三个参数
&ensp;   `currentValue`: 当前正在处理的元素
&ensp;   `index`: 当前元素的索引值
&ensp;    `array`: 数组

实际运行代码：
```
parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2);
```

parseInt 接收两个参数， 第一个为要被解析的值， 第二个为2~36之间的正整数， 代表该进位系统的数字。

若传入的值不能被解析为一个数字， 返回NaN。

>MDN异常情况处理介绍
如果 radix 是 undefined、0或未指定的，JavaScript会假定以下情况：
如果输入的 string以 "0x"或 "0x"（一个0，后面是小写或大写的X）开头，那么radix被假定为16，字符串的其余部分被解析为十六进制数。
如果输入的 string以 "0"（0）开头， radix被假定为8（八进制）或10（十进制）。具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。
如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。


所以本题答案：  `[1, NaN, NaN]`

#### 第二题

```
[typeof null, null instanceof Object]
```

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
null 没有构造函数， 所以  null instanceof Object !== 'object'

null 其实并不是一个对象， 但是因为一些古老的原因， typeof null = 'object'， 这个是个例外， 记住就好了




[0]: http://javascript-puzzlers.herokuapp.com/




