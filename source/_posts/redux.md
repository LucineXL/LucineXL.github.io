---
title: 通过 todoList 搞懂 redux
date: 2018-09-19 16:37:44
tags:
    - React
    - redux
cover: https://images.pexels.com/photos/789382/pexels-photo-789382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---

React中的数据传递是从根节点开始，一级一级的向下传递， 相邻较远的组件之间的数据进行交流 就需要一个漫长的传递数据的过程， 为了解决这个问题， 便有了 Redux。

简而言之， Redux 是一个状态管理工具。 Rudux中有一个存储数据的 store， 这个 store 是独立于React组件之外的，每一个组件都可以直接拿到和修改store中的数据， 就不需要把数据传来传去了。

我们通过 一个 todoList的demo 来 弄懂 redux。

在开始之前， 首先 先使用 creat-react-app 初始化一个react项目。 为了方便使用， 项目中的组件直接使用 ant design 中组件。

首先， 安装 redux

    yarn add redux react-redux antd -D


如图：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1ger3gp3awuj310a0huabo.jpg)


## 基础

#### action

redux 中的 store 是只读的。 要想修改 store中的值，只能通过触发 action 的方式来实现。
action 本质是一个 js 对象， action 内使用 type 字段来表示 将要执行动作，可以在reducer中针对不同type执行相应的数据操作。

##### action 创建函数

action 创建函数 是 生成一个 action的方法。

```
export const ADD_TODO = 'ADD_TODO';
export const DEL_TODO = 'DEL_TODO';

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export function delTodo(index) {
    return {
        type: DEL_TODO,
        index
    }
}

```

在 Rudux 中， 我们可以调用 store.dispatch() 方法， 触发action。

在 React 中， 可以使用 react-redux 中的 connect() 方法来使用。 bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。

#### reducer

reducer 是一个纯函数， 接受 旧的 state 和 action， 最后返回修改后的新 state。

注：
    1. 不要直接修改 state。 更新state时， 可以采用 Object.assign({}, {...newState}) 的方式。
    2. 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

reducer/list.js
```
import {
    ADD_TODO,
    DEL_TODO,
} from '../actions';

export function list(state = [], action) {
    switch (action.type) {
        case ADD_TODO: {
            const { text } = action;
            return [...state, text];
        }
        case DEL_TODO: {
            const { index } = action;
            let newState = [...state];
            newState.splice(index, 1);
            return newState;
        }
        default: {
            return state;
        }
    }
}
```

reducer/index.js
```
import { combineReducers } from 'redux'
import list from './list';

const app = combineReducers({
    list,
})

export default app;
```

#### store

store 就是我们当前项目的仓库， 我们可以在 store存储 我们项目中的用到的所有数据。 Redux 应用中只有一个单一的store。 如果需要对数据进行拆分， 可以把数据存储在多个reducer中， 然后使用 combineReducers() 将多个reducer 合并为一个。

所有的容器组件都可以访问 Redux Store， 一种方式是以 props 的形式传入 容器组件中， 但这样使用比较麻烦。 react 中 我们可以使用 <Provider>, 这样 我们所有的容器组件都可以访问store，不需要通过 props 的方式进行传递。

在react中， 容器组减可以使用 connect() 方法访问 store。使用 connect() 时， 使用mapStateToProps这个函数来指定当前 Redux store state 中需要映射到展示组件的 props 中的数据， 使用mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法。


```
import { connect } from 'react-redux';
import { addTodo } from 'action';

class Todo extends Component {
    // ...
}

export default connect(
  (state) => {
      return {
          list: state.list,
      }
  },
  {
    addTodo,
  }
)(Todo)
```



#### redux 调试工具

redux有很多 第三方调试工具， 我们这里使用[redux-devtools-extension][0].

使用步骤：
1. 首先，在Chrome中安装Redux Devtools扩展。
2. 用npm或yarn安装redux-devtools-extension包。

index.js

```
// ...
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(app, composeWithDevTools());
```


## 代码

#### 项目结构

├── README.md
├── package.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── actions
│   │   └── index.js
│   ├── components
│   │   ├── Footer
│   │   │   ├── index.js
│   │   │   └── style.css
│   │   └── Todo
│   │       ├── index.js
│   │       └── style.css
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reducer
│   │   ├── index.js
│   │   └── list.js
│   └── registerServiceWorker.js
└── yarn.lock


#### index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import app from './reducer';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const store = createStore(app, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();

```

#### App.js
```
import React, { Component } from 'react';
import Footer from './components/Footer';
import Todo from './components/Todo';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Footer />
          <Todo />
        </div>
      </div>
    );
  }
}

export default App;

```

#### action/index.js
```
export const ADD_TODO = 'ADD_TODO';
export const DEL_TODO = 'DEL_TODO';

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export function delTodo(index) {
    return {
        type: DEL_TODO,
        index
    }
}

```

#### reducer/index.js

```
import { combineReducers } from 'redux'
import list from './list';

const app = combineReducers({
    list,
})

export default app;

```

#### reducer/list.js
```
import {
    ADD_TODO,
    DEL_TODO,
} from '../actions';

export default function list(state = [], action) {
    switch (action.type) {
        case ADD_TODO: {
            const { text } = action;
            return [...state, text];
        }
        case DEL_TODO: {
            const { index } = action;
            let newState = [...state];
            newState.splice(index, 1);
            return newState;
        }
        default: {
            return state;
        }
    }
}
```

#### component/Footer/index.js

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, message } from 'antd';
import { addTodo } from '../../actions';
import "./style.css";

const Search = Input.Search;

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        }
    }

    handleChange = (e) => {
        const inputValue = e.target.value;
        this.setState({
            inputValue
        })
    }

    addTodo = () => {
        const { inputValue } = this.state;
        if (String(inputValue)) {
            this.props.addTodo(inputValue);
            this.setState({
                inputValue: '',
            })
        } else {
            message.error('todo is require');
        }
    }

    render() {
        const { inputValue } = this.state;
        return (
            <div className="footer">
                <Search
                    value={inputValue}
                    placeholder="add a todo"
                    onChange={this.handleChange}
                    onSearch={this.addTodo}
                    enterButton="ADD"
                />
            </div>
        );
    }
}

export default connect(
    () => { return {} },{
        addTodo
    }
  )(Footer);

```

#### component/Todo/index.js

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { delTodo } from '../../actions';
import "./style.css";

class Todo extends Component {
    constructor(props) {
        super(props);
    }

    delTodo = (index) => {
        this.props.delTodo(index);
    }

    render() {
        const { list } = this.props;

        if (!list || !list.length) {
            return null;
        }
        return (
            <div className="todo">
                {
                    list.map((item, index) => {
                        return (
                            <div key={index} className="todoItem">
                                {item}
                                <Button onClick={() => this.delTodo(index)}>Del</Button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default connect(
    (state) => { return {
        list: state.list,
    } },{
        delTodo
    }
  )(Todo);

```

[0]: https://www.npmjs.com/package/redux-devtools-extension