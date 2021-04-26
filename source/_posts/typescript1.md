---
title: TypeScript 学习笔记（1） - 日常类型
date: 2021-03-24 15:17:46
cover: https://images.pexels.com/photos/3820994/pexels-photo-3820994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
tags:
  - ts
---

最近在学习 ts， 好记性不如烂笔头， 简单记录一下 `ts` 学习笔记~

[TypeScript 官方文档 ][0] 戳这里~

### hello world

学习一门新的语言， 当然要从 `hello world` 开始

快速上手，可以使用 `create-react-app` 创建一个 ts 的项目

```
create-react-app tsdemo --template typescript
```

创建出来的项目结构如下

<div align=center >
<img src="https://tva1.sinaimg.cn/large/008eGmZEly1gov2bjoxqwj30du0o0tao.jpg" width="200px" />
</div>

### 日常类型

#### 布尔值

```
let  isDone: boolean = false;
```

#### 数字

```
let num: number = 1;
```

#### 字符串

```
let name: string = 'Jon';
let age:number = 20;
let sentence: string = `I am ${name}, I'm ${age} years old`;
// 跟下面的方式等价
let sentence: string = 'I am ' + name + ', I'm ' + age + ' years old';
```

#### 数组

```
// 第一种定义方式
let list: number[] = [1, 2, 3];

// 第二种方式， 使用数组泛型
let list: Array<number> = [1, 2, 3];
```

#### any

any 可以为任意类型。 如果未指定类型， 并且 TypeScript 无法根据上下文推断出变量类型， 编辑器会默认认为任意类型

```
  let a: any;
  a = 1; // 正确
  a = '1'; // 正确
  a = false; // 正确
```

#### 变量的类型注释

我们在使用 let， const， var 定义变量时， 可以选择显示的制定变量的类型， 但是大部分情况下， TypeScript 会自行判断变量类型

#### 函数

##### 参数类型注释

声明函数时，可以在每个参数后面添加类型注释

```
function greet(name: string) {
  console.log("hello" + name);
}

greet('a'); // 正确
greet(1); // 错误， 传入参数类型不正确
```

##### 返回类型注释

可以在参数列表后面标注函数返回类型注释

```
function greet(name: string): string {
  console.log("hello" + name);
}
```

通常不需要特别标注返回类型注释，typeScript 会基于 return 自行判断返回类型

##### 匿名函数

匿名函数可以在调用时， 自行获取参数类型

```
const names = ["Alice", "Bob", "Eve"];

names.forEach((item) => {
  // 属性“tolocalelowercase”在类型“string”上不存在。你是否指的是“toLocaleLowerCase”?
  console.log(item.tolocalelowercase());
})

```

#### 对象类型

在定义对象时声明属性及类型

```
function printCord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCord({ x: 3, y: 7 });
```

##### 可选属性

对象类型可指定哪些属性是可选的

```
function printName(obj: { first: string; last?: string }) {
  // ...
}

printName({ first: "Bob" }); // ok
printName({ first: "Alice", last: "Alisson" }); // ok
```

若属性为可选属性， 在使用前， 需要先对该属性进行校验

```
function printName(obj: { first: string; last?: string }) {
    console.log(obj.first.toLocaleLowerCase())  // ok
    console.log(obj.last.toLocaleLowerCase())  // error: 对象可能为“未定义”。
    if(obj.last !== undefined) {
      console.log(obj.last.toLocaleLowerCase())  // ok
    }
    console.log(obj.last?.toLocaleLowerCase())  // ok
  }
```

#### 联合类型

##### 定义联合类型

```
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(101);  // OK
printId("202"); // OK
printId({ myID: 22342 }); // Error

```

##### 处理联合类型

```
function printId(id: number | string) {
  // error 类型“string | number”上不存在属性“toUpperCase”。类型“number”上不存在属性“toUpperCase”。
  console.log(id.toUpperCase());

  // ok
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
}
```

当不同类型拥有共同的方法时，TypeScript 也可正常运行

```
// 数组和字符串都有slice方法
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

#### 类型别名

我们通常会多次使用同一个类型，这时，就可以给这个类型起一个别名并且引用他

```
  type Point = {
    x: number,
    y: number,
  }
  function printCord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
  printCord({ x: 10, y: 10});
```

除了使用类型别名给对象起别名， 其他任何类型都可以

```
  type a = number;
  type b = string;
  type c = number | string;
```

TypeScript 中, 起别名不是新建一种类型， 只是对之前的类型新建了一个名字， 在使用过程中， 不同类型的不同别名是等价的

```
  declare function getInput(): string;
  declare function sanitize(str: string): string;

  type a = number;
  type b = string;
  type c = number | string;

  function sanitizeInput(str: b): c {
    // return sanitize(str);   // ok
    // return 1;   // ok
    // return '1';  // ok
    // return false;  // error
  }

  let userInput = sanitizeInput(getInput());

```

#### 接口

接口声明是命名对象类型的另一种方式

```
interface Point {
  x: number;
  y: number;
}

function printCord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCord({ x: 100, y: 100 });
```

##### 类型别名和接口之间的差异

类型别名和接口都可以对类型进行扩展， 但是不同的是， 接口创建后可以直接添加新类型， 但是类型别名一经创建， 不可更改

```
// 接口扩展

interface Animal {
  name: string,
}

interface Bear extends Animal {
  honey: boolean,
}

// 对animal进行修改
interface Animal {
  age: number,
}

declare function getBear(): Bear;
const bear = getBear();
bear.name // Animal.name: string
bear.honey // Bear.honey: boolean
bear.age //  Animal.age: number  animal类型添加了age属性

// 扩展类型

type Animal = {
  name: string,
}

type Bear = Animal & {
  honey: boolean,
}

declare function getBear(): Bear;
const bear = getBear();
bear.name // name: string
bear.honey // honey: boolean


// tips: 若在此处对Animal类型进行扩展， ts会报错提示 标识符“Animal”重复。
type Animal =  {
  age: number,
}

```

#### 类型断言

```
let someValue: any = '11';
// 类型断言的写法有两种
// 1.  使用<>的方式，  此种方式不能在jsx中使用
let len: number = (<string>someValue).length;

//  2.使用as的方式
let str = someValue as string;
let len: number = (someValue as string).length;
console.log(str, len);
```

#### 文字类型

除了常规类型`string`和`number`之外，我们还可以在类型位置引用特定的字符串和数字。

```
  let x: 'hello' = 'hello';
  x = 'hello'; // ok
  x = 'howdy'; // error  不能将类型“"howdy"”分配给类型“"hello"”
```

单独定义一个只有一个值的变量用处不大， 但是可以把文字类型组合成并集使用

```

// 文字类型组合使用
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre"); // error  类型“"centre"”的参数不能赋给类型“"left" | "right" | "center"”的参数

// 文字类型与其他类型组合使用

 interface Options {
    width: number;
  }
  function configure(x: Options | "auto") {
    // ...
  }
  configure({ width: 100 });
  configure("auto");
  configure("automatic"); // error 类型“"automatic"”的参数不能赋给类型“Options | "auto"”的参数。
```

#### 字面推论

```
declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // error 类型“string”的参数不能赋给类型“"GET" | "POST"”的参数。
```

上面的例子中， req.method中推断为string，不是"GET"，所以TypeScript认为他是错误的

解决办法：
```
// 1. 添加类型断言
// 类型断言改法1
const req = { url: "https://example.com", method: "GET" as "GET"};
// 类型断言改法2
handleRequest(req.url, req.method as "GET");
//2. 用 as const来将整个对象转换为类型文字：
const req = { url: "https://example.com", method: "GET" } as const;
```

####  null 和 undefined

JavaScript有两个原始值用于表示缺少或未初始化的值：null和undefined。这两种类型的行为取决于`strictNullChecks`是否开启。

`strictNullChecks` 开启时，null和undefined只能赋值给void和它们各自，在使用这两种类型的值之前也需要进行检测

```
function doSomething(x: string | undefined) {
  if (x === undefined) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

```
关闭时， 可以把他们赋值给任意类型



未完待续~

[0]: https://www.tslang.cn/docs/home.html
