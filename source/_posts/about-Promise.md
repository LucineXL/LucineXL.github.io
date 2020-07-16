---
title: 关于 Promise
date: 2017-08-17 14:32:39
tags:
  - es6
  - Promise
cover: https://images.pexels.com/photos/17658/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---

本文介绍了对Promise的一些理解~

<!-- more -->

在 [掘金](https://juejin.im/timeline)上看见一篇写promise的文章，感觉作者写的很棒，文章链接在这：[八段代码彻底掌握 Promise](https://juejin.im/post/597724c26fb9a06bb75260e8) 。看完之后感觉学到了很多，所以又重新把[JavaScript Promise迷你书（中文版）](http://liubin.org/promises-book/#promises-overview)刷了一遍，以下是我对于promise的理解。
####Promise 是什么？
>所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。          —— [ECMAScript 6 入门 阮一峰](http://es6.ruanyifeng.com/)

  Promise对象代表一个异步操作，有三种状态：Pending（准备状态），Fulfilled（成功状态，也称为Resolved状态），Rejected（失败状态）。只有异步操作的结果可以决定promise对象的状态，操作成功后，promise对象由Pending状态转换为Fulfilled状态，此时回调函数会执行 onFulfilled方法。反之，操作失败，promise对象由pending状态转换为Rejected状态，此时回调函数会执行onRejected方法。
如下图所示：

![Promise状态改变](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3n5z1cjj311m0gcwkq.jpg)

######创建一个Promise对象

```
var p1 = new Promise(function(resolve,reject){
    resolve('resolve');
});
var p2 = new Promise(function(resolve,reject){
    reject('reject');
});
```
p1 返回一个resolved状态，值为resolve的Promise对象
```
Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "resolve"}
```
p2 返回一个rejected状态，值为reject的Promise对象
```
Promise {[[PromiseStatus]]: "rejected", [[PromiseValue]]: "reject"}
```

####Promise 的基本API

######1.Promise#then
>Promise.then(onFulfilled,onRejected)

then方法定义了promise状态变为resolved或者rejected状态之后的回调函数:
* pending->resolved：执行onFulfilled函数，并且将promise对象的值传给onFulfilled函数
* pending->rejected：执行onRejected函数，并且将promise对象的值传给onRejected函数

代码示例如下：
```
var p = new Promise(function(resolve, reject){
  console.log("create a promise");
  resolve("success");
});

console.log("after new Promise");

p.then(function onFulfilled(value){
  console.log(value);
},function onRejected(error){
  console.log(error);
});
```
运行结果如下：
```
"create a promise"
"after new Promise"
"success"
```
new Promise返回一个resolved状态的promise对象，所以在p.then()方法中调用的是onFulfilled函数。
创建promise时，promise对象中的函数是立即执行的，并不是在调用then方法的时候才会去执行，所以首先会输出"create a promise"。但是执行的代码是异步代码，所以"after new Promise"会在"success"之前输出。
######2.Promise#catch
>promise.catch(onRejected);

catch方法捕获了promise运行过程中的异常。catch与then方法中的onRejected的不同是，onRejected 函数只能在promise状态变为rejected的时候调用，但catch既可以在promise状态变为rejected的时候调用，又可以捕获第一个onFulfilled方法中出现的错误。
可以参考promise迷你书中的这一段代码：
```
function throwError(value) {
    // 抛出异常
    throw new Error(value);
}
// <1> onRejected不会被调用
function badMain(onRejected) {
    return Promise.resolve(42).then(throwError, onRejected);
}
// <2> 有异常发生时onRejected会被调用
function goodMain(onRejected) {
    return Promise.resolve(42).then(throwError).catch(onRejected);
}
// 运行示例
badMain(function(){
    console.log("BAD");
});
goodMain(function(){
    console.log("GOOD");
});
```
在这段代码中，badMain函数中传入onRejected参数，因为Promise.resolve(42)返回一个resolved状态的promise对象（这个api的用法会在下一节中说到），所以会去调用throwError函数，throwError函数中抛出的异常onRejected是捕获不到的，但是catch可以捕获到。

![catch异常捕获](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3nni0ywj311m0eawif.jpg)

######3.Promise.resolve
这个方法会根据传进来的参数的不同，返回不同的promise对象。

```
//1.传入的参数是一个普通值
var p1 = Promise.resolve(1);//返回一个将该对象作为值的新promise对象
//2.传入的参数是一个Promise对象
var p2 = Promise.resolve(p1);//返回接收到的promise对象

p1 === p2   //true
```
在迷你书中介绍了三种情况，除了上面两种之外，还有一种thenable类型的对象的时候，那种这里就不做介绍了，有兴趣的朋友可以自己去看看啊~

######4.Promise.reject
这个方法跟Promise.resolve方法一样，会根据传进来的参数的不同，返回不同的promise对象。
```
//1.传入的参数是一个普通值
var p3 = Promise.reject(1);//返回一个将该对象作为值的新promise对象
//2.传入的参数是一个Promise对象
var p4 = Promise.reject(p3);//返回一个新的promise对象

p3 === p4   //false
```
跟resolve不同的是，当传入的参数是一个Promise对象的时候，会返回一个rejected状态的新promise对象。

######5.Promise.all
Promise.all接收一个 promise对象的数组作为参数，当这个数组里的所有promise对象全部变为resolve或reject状态的时候，它才会去调用 .then 方法。
示例代码：
```
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    console.log(results);  // [1, 2, 3]
});
```

######6.Promise.race
Promise.race也是接收一个 promise对象的数组作为参数，参数 promise 数组中的任何一个promise对象如果变为resolve或者reject的话， 该函数就会返回，并使用这个promise对象的值进行resolve或者reject。
```
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
Promise.race([p1, p2, p3]).then(function (value) {
    console.log(value);  // 1
});
```
这里需要注意的是，虽然在p1resolved之后便执行了then方法，但是并不是意味着往后的promise对象不执行了，其他的还是promise对象还是要执行的，只是不会再调用then函数。
下面这个demo便可以看出：
```
var p1 = new Promise(function(resolve,reject){
  console.log('I am p1!');
  resolve(1);
});
var p2 = new Promise(function(resolve,reject){
  console.log('I am p2!');
  resolve(2);
});
var p3 = new Promise(function(resolve,reject){
  console.log('I am p3!');
  resolve(3);
});
Promise.race([p1, p2, p3]).then(function (value) {
    console.log(value);
});
```
运行结果：
```
I am p1!
I am p2!
I am p3!
1
```

####Promise Demo

这是个很大的demo，，^-^,  涵盖了很多小知识点，
```
var p_1 = new Promise(function(resolve,reject){
  resolve(1);
});
var p_2 = Promise.resolve(1);
var p_3 = Promise.reject(1);
var p_4 = Promise.resolve(p_2);

// 方式1
var p1 = new Promise(function(resolve, reject){
  resolve(Promise.resolve('resolve'));
});

var p2 = new Promise(function(resolve, reject){
  resolve(Promise.reject('reject'));
});

var p3 = new Promise(function(resolve, reject){
  reject(Promise.resolve('resolve'));
});

var p4 = new Promise(function(resolve, reject){
  reject(Promise.reject('reject'));
});
//方式2
var p1 = Promise.resolve(Promise.resolve('resolve'))
var p2 = Promise.resolve(Promise.reject('reject'))
var p3 = Promise.reject(Promise.resolve('resolve'))
var p4 = Promise.reject(Promise.reject('reject'))

//定义回调函数
p1.then(
  function fulfilled(value){
    console.log('fulfilled1: ' + value);
  },
  function rejected(err){
    console.log('rejected1: ' + err);
  }
);

p2.then(
  function fulfilled(value){
    console.log('fulfilled2: ' + value);
  },
  function rejected(err){
    console.log('rejected2: ' + err);
  }
);

p3.then(
  function fulfilled(value){
    console.log('fulfilled3: ' + value);
  },
  function rejected(err){
    console.log('rejected3: ' + err);
  }
);

p4.then(
  function fulfilled(value){
    console.log('fulfilled4: ' + value);
  },
  function rejected(err){
    console.log('rejected4: ' + err);
  }
);

```


![p_1,p_2,p_3,p_4的值](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3kjsq2nj31jy0hcqbh.jpg)

采用new Promise 方式创建对象和采用Promise.resolve方法创建出来的对象其实是一样的，可以把Promise.resolve看做new Promise 的语法糖。只不过需要注意的是，在上面介绍resolve方法的时候说过，如果传入的参数是一个promise对象，会直接返回这个对象，，所以`p_2===p_4`输出的是true,但是通过new的方式创建出来的对象都是新创建的，所以new出来的对象跟别的对象都不会全等，即`p_1===p_2`会输出false。

![p1,p2,p3,p4的值](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3l19h3zj30ua0u0ne0.jpg)

两种方式定义的p1,p2,p3,p4都是相同的，从这段代码可以看出，不论是用那种方式创建promise对象，如果使用Promise.resolve方法传入一个新对象，还是会去‘读取’（可理解为）这个对象的，但是Promise.reject方法传入一个新对象，并不会去‘读取’这个对象，而会直接返回这个这个对象。（这个‘读取’的概念并不是promise中的概念，只是我的个人理解，在[八段代码彻底掌握 Promise](https://juejin.im/post/597724c26fb9a06bb75260e8) 这篇文章中，作者把他解释为‘拆箱’，也是作者的一种让人理解起来更简单的思路，至于promise官方文档中的规定，目前还没有去仔细深入研究，有时间会去看一下^-^）

new方式 回调执行结果

![new方式 回调执行结果](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3o9lgrfj30rw07iadl.jpg)

api方式 回调执行结果

![api方式 回调执行结果](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3on8uc9j310u0a8gri.jpg)

从这段代码可以看出，两种方式的执行顺序会有差别，至于为什么，今天也查找了很多资料，但是并没有找到原因，有研究过的大神欢迎指导~~