---
title: TypeScript 学习笔记（2） - 关于function和object
date: 2021-04-21 11:12:48
tags:
  - ts
cover: https://cdn.pixabay.com/photo/2018/10/12/11/07/beach-3741909__480.jpg
---

ts 学习笔记 第二弹

[TypeScript 官方文档 ][0] 戳这里~

## Function

### 函数类型表达式

使用类型表达式的方式声明函数

```
  function greeter(fn:(str: string) => void) {
    fn('hello world');
  }

  function sayHello(str:string) {
    console.log(str);
  }

  greeter(sayHello);
```

也可以用类型别名的方式命名函数

```
  type greetFunction = (str: string) => void;
  function greeter(fn: greetFunction) {
    fn('hello world');
  }

  function sayHello(str:string) {
    console.log(str);
  }

  greeter(sayHello);

```

### Call Signatures

（我也不知道咋翻译， 调用签名？ 暂且这么称呼吧 🤷🏻‍♀️🤷🏻‍♀️🤷🏻‍♀️）

在 TypeScript 中，函数还可以具有属性。


```
  type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
  };

  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
  }

  const fun: DescribableFunction = (a) => {
    return !!a;
  };
  fun.description = '111111';

  doSomething(fun);
```

### Construct Signatures （构造签名）

您可以通过在调用签名之前添加 new 关键字来编写构造签名
(tips: 这一 part 暂时并没有看懂怎么用)

```
  type SomeConstructor = {
    new (a: string): any,
  }

  function fn(cons:SomeConstructor) {
    return new cons('hello');
  }

```

有些对象（比如 javaScript 中的 Date），可以带有 new 操作符进行调用， 也可以不带 new 进行使用。 还可以调用签名和构造签名共同使用

```
  interface CallOrConstruct {
    new (s: string): Date,
    (someArg: string): string,
  }

```

### 泛型函数

我们经常会遇到输出类型与入参类型有关的情况， 比如 返回数组的第一个元素

```
  function firstElement(arr: any[]) {
    return arr[0];
  }
  const a = firstElement1(["a", "b", "c"]); // any
  const b = firstElement1([1,2,3]); // any
```

这个函数可以完成我们的需求， 但是并没有声明入参和出参的类型

在 TypeScript 中，当我们要描述两个值之间的对应关系时，可以使用泛型

```
  function firstElementWith<Type>(arr: Type[]): Type {
    return arr[0];
  }
  const a = firstElement(["a", "b", "c"]); // string
  const b = firstElement([1,2,3]); // number
```

在这里， 我们并不需要特意指定 Type, TypeScript 可以自行推断类型

也可以指定多个类型

```
  function map<Input, Output>(arr: Input[], func:(n: Input) => Output): Output[] {
    return arr.map(func);
  }

  map(['1', '2', '3'], (n) => parseInt(n));
```

##### 约束

有时我们只需要对某些类型的特定子集进行操作，就可以使用约束来限制参数的类型

```
  function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }

  const longerArray = longest([1, 2], [1, 2, 3]);
  const longerString = longest("alice", "bob");
  const longerArr = longest([1, 2], ['1', '2', '3']);
  const notOK = longest(10, 100); // 类型“number”的参数不能赋给类型“{ length: number; }”的参数
```

在上面的例子中， 我们对传入参数的类型进行限制， 只允许传入带有 length 属性的参数， 且只能访问传入参数的 length 属性

接下来我们看一个使用通用约束时的常见错误：

```
  function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
  ): Type {
    if (obj.length >= minimum) {
      return obj;
    } else {
      // error 不能将类型“{ length: number; }”分配给类型“Type”。
      // "{ length: number; }" 可赋给 "Type" 类型的约束，但可以使用约束 "{ length: number; }" 的其他子类型实例化 "Type"。
      return { length: minimum };
    }
  }
```

上面的例子中， 入参和出参的类型都被约束为{length：number}, 这样看起来是没有问题的， 我的出参满足了类型约束， 那为什么会报错呢， 因为这个不仅要求类型满足{length：number}, 还要保证传入的参数类型与传出的类型一致

### 可选参数

我们在 js 中使用函数时， 有的参数可以不传， 例如`toFixed`

```
  function f(n: number) {
    n.toFixed();
    n.toFixed(2);
  }
```

我们在 ts 中可以使用`?`来标记参数为可选

```
  function f(x?: number) {
    // ...
  }
  f()  // ok
  f(10) // ok
```

另外还可以给函数的参数添加默认值, 但是如果给参数添加默认值后，参数的类型也就被限制了， 如果传入参数类型与默认参数不一致， 函数将会报错

```
  function f(x = 10) {
    // ...
  }
  f()   // ok
  f(0)  // ok
  f('string')  // error  类型“"string"”的参数不能赋给类型“number | undefined”的参数。
```

### 函数重载

我们可以通过控制参数数量或者类型的不同来执行不同的操作

```
  function makeDate(timestamp: number): Date;
  function makeDate(m: number, d: number, y: number): Date;
  function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
      return new Date(y, mOrTimestamp, d);
    } else {
      return new Date(mOrTimestamp);
    }
  }
  const d1 = makeDate(12345678);
  const d2 = makeDate(5, 5, 5);
  const d3 = makeDate(1, 3); // error
```

上面的例子中， 假设传入一个参数时， 会根据时间戳生成一个 Date， 如果传入 3 个参数， 会根据年月日的方式生成 Date 对象，但是传入两个参数时会报错， 因为我们的函数体不支持 2 个参数的情况

##### 重载签名与实现签名

重载签名可以简单理解为函数的定义， 实现签名可以理解为函数的实现

```
function fn(x: string): void;
function fn() {
  // ...
}
fn();  // error: 应有 1 个参数，但获得 0 个。
```

上面的例子中 函数 fn 在定义的时候要有一个参数， 但是在实现的时候并没有入参， 所以报错

```
function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void;  // error: 此重载签名与其实现签名不兼容。
function fn(x: boolean) {}
```

重载签名中规定 x 为 string， 但是实现的时候，x 的类型为 boolean， 重载签名与其实现签名不兼容

### 其他要知道的类型

#### void

`void`表示函数不返回任何类型。 在 js 中， 不返回任何值的函数将隐式的返回`undefined`, 但是在 ts 中， `undefined` 和 `void` 是不同的

```
function fun1(): void {
  return;
}
const a = fun1(); // ok   a: void

function fun2(): void {
  return undefined;
}
const b: undefined = fun2(); // error  不能将类型“void”分配给类型“undefined”。
```

#### object

`object`是指不是原始值的任何值（string, number, boolean, symbol, null, undefined）

#### unknown

`unknown`表示任何值。 他与`any`类型相似， 但是更安全， 因为对未知类型做任何操作都是不合法的

```
function f1(a: any) {
  a.b(); // ok
}
function f2(a: unknown) {
  a.b(); // error
}

```

#### never

有一些函数永远不会返回值

```
function fail(msg: string): never {
  throw new Error(msg);
}
```

#### Function

```
function doSomething(f: Function) {
  f(1, 2, 3);
}
```

这里的入 f 是一个没有定义返回类型的函数， 他可以返回`any`类型的值，通常我们要避免使用这种函数，因为返回`any`类型并不安全，如果你并不打算使用他返回值， 可以使用 `() => void`;

## Object

在 TypeScript， 我们也用 object 表示对象类型。

他可以是匿名的：

```
function greet(person: { name: string; age: number }) {
  return "Hello " + person.age;
}
```

也可以用 interface 来命名

```
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.age;
}
```

或者类型别名

```
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.age;
}
```

### 属性修饰符

对象类型中的每个属性都可以指定几项内容： 类型， 属性是否可选，是否可以写入该属性

#### 可选属性

我们可以使用 ? 来表示这个属性为可选属性

```
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

```

可选属性没有传入时， 会默认他为`undefined`, 我们也可以访问这个属性

```
function paintShape(opts: PaintOptions) {
  let xPos1 = opts.xPos; // let xPos: number | undefined
  let yPos1 = opts.yPos; // let yPos: number | undefined

  let xPos2 = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos2 = opts.yPos === undefined ? 0 : opts.yPos;

  // ...
}
```

可以给可选属性设置默认值

```
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  let xPos = opts.xPos; // let xPos: number
  let yPos = opts.yPos; // let yPos: number
}
```

注： 现在没有办法把类型注释放在解构模式中， 因为这种写法在 js 中是别名的意思

```
  function paintShape({shape: Shape, xPos: number = 100}) {
    console.log(shape); // error 找不到名称“shape”。你是否指的是“Shape”?
    console.log(xPos); // error 找不到名称“xPos”
  }
```

#### 只读属性

在 ts 中， 我们可以把一个属性标记为只读， 被标记后的属性在运行过程中无法被更改。 但是这个只读仅仅指的是这个属性本身无法更改

```
interface SomeType {
    readonly prop: string;
    readonly resident: { name: string; age: number };
  }

  function doSomething(obj: SomeType) {
    console.log(`prop has the value '${obj.prop}'.`);

    obj.prop = "hello";  // error: 无法分配到 "prop" ，因为它是只读属性。

    obj.resident = { name: '1', age: 12 }; // 无法分配到 "resident" ，因为它是只读属性。

    obj.resident.age = 12; // ok
  }
```

只读属性还可以通过别名的方式进行更改

```
interface Person {
    name: string;
    age: number;
  }

  interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
  }

  let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
  };

  let readonlyPerson: ReadonlyPerson = writablePerson;

  readonlyPerson.age++; // error: 无法分配到 "age" ，因为它是只读属性。
  console.log(readonlyPerson.age); // prints '42'

  writablePerson.age++;
  console.log(readonlyPerson.age); // prints '43'
```

### 扩展类型

扩展类型可以理解为继承

```
  interface Animal {
    name: string
  }

  interface Dog extends Animal {
    say: () => void,
  }

  let dog: Dog = {
    name: 'hhh',
    say: () => {
      console.log('汪汪')
    }
  }
```

interface 也可继承多种类型

```
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

### 交叉点类型

我们可以使用interface扩展其他类型来创建新的类型，还可以使用`&`交集类型构造新类型，这种方式通常用来组合已经存在的类型

```
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

let cc1:ColorfulCircle = { color: 'red', radius: 40 } // ok
let cc2:ColorfulCircle = { color: 'red', raduis: 40 } // error 类型“ColorfulCircle”中不存在“raduis”属性
```



[0]: https://www.tslang.cn/docs/home.html
