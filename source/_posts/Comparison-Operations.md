---
title: 浅析js中的 “==” 与 “===”
date: 2017-09-12 18:21:34
tags: javaScript
cover: https://images.pexels.com/photos/930676/pexels-photo-930676.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---

关于js 中的 == 与 ===，之前踩了不少坑，特意在这里整理一下他们的用法。

<!-- more -->

在js中，'==' 和 '==='运算符用来比较两个值是否相等，但是他们对于相等的定义是不同的。两个运算符都可以用来比较任意类型的操作数，如果两个操作数相等，返回true，否则，返回false。'===' 严格相等运算符，用来比较两个操作数是否严格相等。'==' 相等运算符，用来比较两个操作数是否相等。
详细信息可参照ECMA标准（[戳这里][http://www.ecma-international.org/ecma-262/6.0/]）。

### Abstract Equality Comparison  ==

== 相等操作符，在比较前会把比较的两个数转换成相同的数据类型之后，然后对两个数进行比较。转换后，比较方式与 === 相同。

ECMA中比较规则如下：

```
The comparison x == y, where x and y are values, produces true or false.

1. ReturnIfAbrupt(x).
2. ReturnIfAbrupt(y).
3. If Type(x) is the same as Type(y), then
    Return the result of performing Strict Equality Comparison x === y.
4. If x is null and y is undefined, return true.
5. If x is undefined and y is null, return true.
6. If Type(x) is Number and Type(y) is String,
    return the result of the comparison x == ToNumber(y).
7. If Type(x) is String and Type(y) is Number,
    return the result of the comparison ToNumber(x) == y.
8. If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.
9. If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
10. If Type(x) is either String, Number, or Symbol and Type(y) is Object, then
    return the result of the comparison x == ToPrimitive(y).
11. If Type(x) is Object and Type(y) is either String, Number, or Symbol, then
    return the result of the comparison ToPrimitive(x) == y.
12. Return false.
```

翻译如下：

比较 x == y，当x 和 y是正常值时，返回 true 或者 false。

1. 如果x不是正常值（比如抛出一个错误），中断执行。
2. 如果y不是正常值，中断执行。
3. 如果Type(x)与Type(y)相同，执行严格相等运算x === y。
4. 如果x为null且y为undefined，则返回true。
5. 如果x为undefined，y为null，则返回true。
6. 如果Type（x）是Number，Type（y）是String，返回比较结果 x == ToNumber（y）。
7. 如果Type（x）是String，Type（y）是Number，返回比较结果ToNumber（x）== y。
8. 如果Type（x）为Boolean，则返回比较结果ToNumber（x）== y。
9. 如果Type（y）为Boolean，则返回比较结果x == ToNumber（y）。
10. 如果Type（x）为String，Number或Symbol，Type（y）为Object，则返回比较的结果x == ToPrimitive（y）。
11. 如果Type（x）是Object，Type（y）是String，Number或Symbol，那么
返回比较结果ToPrimitive（x）== y。
12. 返回假。

简化一下 ，可以理解为：

1. 如果两个操作数类型相同，则进行 x===y。
2. 如果一个为null，另一个为undefined，则返回true。
3. 如果两个操作数均为基本数据类型，则把操作数转换为Number类型进行比较。
4. 如果其中有一个操作数为Object，则调用对象的 toString 或者 valueOf 方法，将对象转化为原始值进行比较。
5. 如果不满足上述任何情况，则返回 false。


### Strict Equality Comparison '==='

'===' 严格相等操作符，用来比较两个操作数是否严格相等。

ECMA中比较规则如下：
```
1. If Type(x) is different from Type(y), return false.
2. If Type(x) is Undefined, return true.
3. If Type(x) is Null, return true.
4. If Type(x) is Number, then
    a. If x is NaN, return false.
    b. If y is NaN, return false.
    c. If x is the same Number value as y, return true.
    d. If x is +0 and y is −0, return true.
    e. If x is −0 and y is +0, return true.
    f. Return false.
5. If Type(x) is String, then
    a. If x and y are exactly the same sequence of code units (same length and same code           units at corresponding indices), return true.
    b. Else, return false.
6. If Type(x) is Boolean, then
    a. If x and y are both true or both false, return true.
    b. Else, return false.
7. If x and y are the same Symbol value, return true.
8. If x and y are the same Object value, return true.
9. Return false.
```

翻译：

1. 如果Type（x）与Type（y）不同，则返回false。
2. 如果Type（x）为Undefined，则返回true。
3. 如果Type（x）为Null，则返回true。
4. 如果Type（x）是Number，那么
    a. 如果x是NaN，则返回false。
    b. 如果y是NaN，则返回false。
    c. 如果x与y的Number值相同，则返回true。
    d. 如果x为+0且y为-0，则返回true。
    e. 如果x是-0而y是+0，则返回true。
    f. 返回假。
5. 如果Type（x）是String，那么
    a. 如果x和y是完全相同的代码单元序列（相同长度和相应索引处的相同代码单位），则返回true。
    b. 否则返回假。
6. 如果Type（x）为Boolean，则
    a.如果x和y都为true或都为false，则返回true。
    b.否则返回假。
7. 如果x和y是相同的符号值，则返回true。
8. 如果x和y是相同的Object值，则返回true。
9. 返回假。

简化一下，可以理解为：

1. 如果两个操作数类型不相同，返回false。
2.  undefined === undefined   => true
3.  null === null   => true
4. 如果操作数的数据类型都为Number，当两个数的值相同时，返回true， 否则返回 false。
    注： -0 === +0   => true     +0 === -0 => true
        NaN 与任何值都不相等，包括他自己。 所以要判断一个数值是否为NaN， 可采用 x !== x ,只有NaN 返回true
5. 如果操作数的数据类型都为String或Boolean时，只有x和y完全相同，返回ture。
6. 如果操作数的数据类型都为Object，只有两个操作数指向的地址完全相同时，返回true，否则返回false。
