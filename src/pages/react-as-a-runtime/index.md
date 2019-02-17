---
title: React as a UI Runtime
date: '2019-02-02'
spoiler: An in-depth description of the React programming model.
---

翻译自 Dan 的[博客](https://overreacted.io/react-as-a-ui-runtime/)。文章很长:)

目前进度

- [x] 免责声明
- [x] host tree
- [x] host instance
- [x] renderers
- [x] react elements
- [x] entry point
- [x] lists
- [x] purity
- [x] recursion
- [x] inverse of control
- [x] lazy evaluation
- [x] state
- [x] consistency
- [x] memoization
- [x] raw model
- [x] batching
- [x] call tree
- [x] context
- [x] hooks
- [ ] custom hooks
- [ ] static use order
- [ ] what's left out

许多教程中提到 React 是一个 UI 库，这说得没什么问题。就像字面上一样，它确实是一个 UI 库！
![React homepage screenshot: "A JavaScript library for building user interfaces"](./react.png)

我之前写过关于创建 [UI](/the-elements-of-ui-engineering/) 所遇到的挑战，但是这篇博客将采用一个不同的方式的来讨论 React—更接近 [programming runtime](https://en.wikipedia.org/wiki/Runtime_system)

**这篇文章不会教你怎么使用 React 来创建 UI，**如果你对 React 的编程方式有了更为深入的理解后，这篇文章可能帮到你。

---

**注意：如果你正在学习 React，最好先看[文档](https://reactjs.org/docs/getting-started.html#learn-react)**

<font size="60">⚠️</font>

*这是一篇深度文章，而不是一篇新人向教程！*在这里，我会从首要原则来描述大部分的 React 细节。我不会解释怎么使用它们—只说明它们是如何工作的。

这文章面向有经验的开发和那些还在权衡是否使用 React 的其他 UI 库的使用者。我希望它能帮助到你们！

**很多开发者即使没有考虑过这方面的问题，也舒舒服服地使用了 React 很长一段时间，** This is definitely a programmer-centric view of React rather than, say, a [designer-centric one](http://mrmrs.cc/writing/2016/04/21/developing-ui/). But I don’t think it hurts to have resources for both.

看完了免责声明，起飞 🛫️ 吧！

「译者注」：现在开始进入正题，标题和一些通用术语不翻译。

---

## Host Tree

一部分程序吐出(output)数字，一些程序会写诗。不同的语言和它们的 runtimes 通常会针对一些特定的用例进行优化，React 也一样。

React 程序通常会得到**一颗随时会改变的树**。它可能是 [DOM 树](https://www.npmjs.com/package/react-dom)、[iOS 层级图(iOS hierarchy)](https://developer.apple.com/library/archive/documentation/General/Conceptual/Devpedia-CocoaApp/View%20Hierarchy.html)，[PDF primitives](https://react-pdf.org/)，甚至一个 [JSON](https://reactjs.org/docs/test-renderer.html) 对象。大多是时候我们都希望它为我们展示 UI。我们之所以称它为 ”_host_ tree”是因为它属于 **宿主环境（host environment）** 的一部分—就像 DOM 和 iOS。Host tree 通常会有它们[自身](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)[特有](https://developer.apple.com/documentation/uikit/uiview/1622616-addsubview)的命令式（imperative） API。React is a layer on top of it.

所以 React 是用来做什么的？抽象地说，它帮助你在响应一些类似于交互，网络响应，计时器等外部事件时，也能够可预测地管理这复杂的 Host tree。

当一个专用工具可以通过施加特定的约束并从中获益的时候，它表现得会比通用的工具要好。React 在两个原则上做了一个赌注：

- **稳定性。** Host tree 相对稳定，大多数的更新都不会从根本上改变它的整体结构。一个 app 每秒都会重新排列它所有的交互元素的工具显然很难使用，我的 button 去哪了？为什么我的显示屏在乱动？
- **规律性。** Host tree 可以分解成外观和行为一致的 UI 模式（比如按钮 🔘，列表，头像 👤）而不是随机的形状。

**对于大多数 UI 来说这些行为是正确的。**但是如果你需要的 UI 没有稳定的输出模式时，React 就不适合了。比如，React 可以帮助你写一个类似 Twitter 客户端的玩意，但是写不了 [3D pipes screensaver](https://www.youtube.com/watch?v=Uzx9ArZ7MUU)

## Host Instances

Host tree 由大量的 “host instances” 构成。

在 DOM 环境中，host instances 可以认为是普通的 DOM 节点—就是你平时调用 `document.createElement('div')` 得到的对象。在 iOS 中，host instances 就是通过 JS 来唯一标示的 native view。

Host instances 拥有自己的属性（`domNode.className` 或者 iOS 中的 `view.tintColor`)。它们同样也包含了其他 host instances 作为自己的子节点。

（这里和 React 没有任何关心，我仅仅在描述 Host environment）

通常会有一系列 API 用来操作 host instances。DOM 就提供了如同 `appendChild`, `removeChild`, `setAttribute` 等等方法。而在 React 中，你一般不会直接去掉用这些方法。React 会帮你做好它。

## Renderers

一个 _渲染器（renderer）_ 会告诉 React 如何去和 host environment（宿主环境）沟通，并管理它的 host instances。React DOM, React Native, 甚至 [Ink](https://mobile.twitter.com/vadimdemedes/status/1089344289102942211) 都属于 React 的 renderers。其实你也可以[写自己的 renderer](https://github.com/facebook/react/tree/master/packages/react-reconciler)。

React renderers 可以拥有两种工作方式。

绝大多数 renderers 都是采用 “mutating” 的模式来编写的。这种模式正是 DOM 的工作方式：可以生成一个节点，设置其属性，并且给它们添加子节点或者移除这些子节点。这些 host instances 是完全可变（mutable）的。

React 也可以在 ”persistent” 下工作。该模式适用于不提供诸如 `appendChild()` 这种 API，而是通过替换 top-level child 并复制父节点树的宿主环境。

采用 immutability（不可变）的 host tree 让多线程的实现变得很简单。[React Fabric](https://facebook.github.io/react-native/blog/2018/06/14/state-of-react-native-2018) 就充分利用了这一点。

作为一个 React 用户，你从来都不需要去考虑这些模式。我只想强调 React 不只是一个将 A 转化成 B 的适配器（adapter）。如果你能了解一些底层 API 的设计范式还是会很有用的(orthogonal)。

## React Elements

在 host environment，一个 host instance（比如 DOM 节点）是最小的可构建单元(smallest building block)。在 React 中，最小的可构建单元就是 _React Element_。

React Element 其实是纯 JS 对象，它用来描述 host instance。

```jsx
// JSX is a syntax sugar for these objects.
// <button className="blue" />
{
  type: 'button',
  props: { className: 'blue' }
}
```

React element 很轻量，没有和 host instance 捆绑在一起。它仅仅是你在屏幕上所看到的效果的*描述*。

和 host instances 一样，React elements 也可以组成树。

```jsx
// 如你所见，JSX 就是这些对象的语法糖，也就是 createElement
// <dialog>
//   <button className="blue" />
//   <button className="red" />
// </dialog>
{
  type: 'dialog',
  props: {
    children: [{
      type: 'button',
      props: { className: 'blue' }
    }, {
      type: 'button',
      props: { className: 'red' }
    }]
  }
}
```

_注意：我在这里删除了一些和下面解释[没有太多联系](/why-do-react-elements-have-typeof-property/)的属性。_

然而要记住，**React elements 没有所谓的 persistent identity**。这意味着，它们在任何时候发生更新只能丢弃当前的 element，并重新创建（译者注：注意这里指的 React Elements 会重新生成，而不是对应的 DOM Elements，这在后文会继续解释）。

React elements 是不可变得（immutable）。比如你们不能仅仅只修改某个 React element 的 property 或者 children。如果你希望之后渲染不一样的东西，你需要描述一个全新的 React element tree 是怎么样的。

我喜欢把 React elements 比喻成电影中的帧。它们**刻画**了在某一个特殊时间点的 UI 是如何展现的。

## Entry Point

每一个 React renderer 都有一个 “入口（entry point）”，它是一个用来告诉 React 在指定的 container host instance 中渲染 React Element 的 API。
React DOM 的入口就是 `ReactDOM.render`

```jsx
ReactDOM.render(
  // { type: 'button', props: { className: 'blue' } }
  <button className="blue" />,
  document.getElementById('container')
);
```

当我们提到 `ReactDOM.render(reactElement, domContainer)` 它就意味着，**亲爱的 React，在这个 `domContainer`下生成我的 `reactElement`。**

React 将会查找 `reactElement.type`（在我们的例子中，是 `button`），让 React DOM 为它生成对应的的 host instance，并设置好 properties。

```jsx{3,4}
// Somewhere in the ReactDOM renderer (simplified)
function createHostInstance(reactElement) {
  let domNode = document.createElement(reactElement.type);
  domNode.className = reactElement.props.className;
  return domNode;
}
```

在我们的例子中，React 实际上会这样做：

```jsx{1,2}
let domNode = document.createElement('button');
domNode.className = 'blue';

domContainer.appendChild(domNode);
```

如果 `reactElements.props.children` 存在的话，React 在第一次渲染的时候，也会对它们递归地做同样的事情。

## Reconciliation

如果我们对同一个 container 调用两次 `ReactDOM.render` 会发生什么？

```jsx{2,11}
ReactDOM.render(
  <button className="blue" />,
  document.getElementById('container')
);

// ... later ...

// 是替换这个 button 的 host instance
// 还仅仅只是在现有 instance 的技术上，更新 property
ReactDOM.render(
  <button className="red" />,
  document.getElementById('container')
);
```

同样，React 的工作是使 host tree 和提供的 React element tree 匹配。而确定在响应新的数据时需要做什么的过程被称为 [reconciliation](https://reactjs.org/docs/reconciliation.html)。

有两种方式可以做到这个，一个简化的 React 可以通过清空现有的树并重新创建一个来达到效果。

```jsx
let domContainer = document.getElementById('container');
// Clear the tree
domContainer.innerHTML = '';
// Create the new host instance tree
let domNode = document.createElement('button');
domNode.className = 'red';
domContainer.appendChild(domNode);
```

但是在 DOM 中，这种方式不仅慢，还会丢失类似于 **focus，selection，scroll state**等等信息。相反，我们希望 React 可以做到这样。

```jsx
let domNode = domContainer.firstChild;
// Update existing host instance
domNode.className = 'red';
```

换句话说，React 需要决定什么时候去更新现有的 host instance 来匹配新的 React element，以及何时创建新的。

这就抛出了一个有关 _identity_ 的问题。React element 每次都会是完全不同的，但是什么时候它们在概念上表示的是同一个 instance 呢？

This raises a question of _identity_. The React element may be different every time, but when does it refer to the same host instance conceptually?

我们的例子很简单。我们第一次仅仅只渲染一个 `<button>`，我们想在同样的地方再渲染一次 `<button>`。我们已经有了一个 `<button>` instance，为什么需要重新创建一个呢？重用它！

这已经非常接近 React 思考的方式了。

**如果树中同样地方的 element type 在一次更新后，和上一个 element 的 type 匹配，那么 React 就会重用先有的 host instance。**

下面是一个带了注释的粗糙的例子，来解释 React 怎么做：

```jsx{9,10,16,26,27}
// let domNode = document.createElement('button');
// domNode.className = 'blue';
// domContainer.appendChild(domNode);
ReactDOM.render(
  <button className="blue" />,
  document.getElementById('container')
);

// Can reuse host instance? Yes! (button → button)
// domNode.className = 'red';
ReactDOM.render(
  <button className="red" />,
  document.getElementById('container')
);

// Can reuse host instance? No! (button → p)
// domContainer.removeChild(domNode);
// domNode = document.createElement('p');
// domNode.textContent = 'Hello';
// domContainer.appendChild(domNode);
ReactDOM.render(<p>Hello</p>, document.getElementById('container'));

// Can reuse host instance? Yes! (p → p)
// domNode.textContent = 'Goodbye';
ReactDOM.render(<p>Goodbye</p>, document.getElementById('container'));
```

子节点们使用同样的启发式方法. 当我们更新一个 拥有两个 `<button>` 的 `<dialog>` 的时候，React 首先会决定是否要复用 `<dialog>`，并对每一个子节点重复这个决策过程。

## Conditions

如果 React 仅仅每次更新的时候， element type 匹配才复用 host instance 的话，它们如何渲染条件语句里的内容？

假设我们第一次渲染的时候只有一个 input，接着在 input 之前渲染一个 message：

```jsx{12}
// First render
ReactDOM.render(
  <dialog>
    <input />
  </dialog>,
  domContainer
);

// Next render
ReactDOM.render(
  <dialog>
    <p>I was just added here!</p>
    <input />
  </dialog>,
  domContainer
);
```

在这个例子中，`<input>` 的 host instance 将会重新创建一个。React 将会遍历 element tree，将其与之前的版本比较：

- `dialog → dialog`: 我们能重用 host instance 么？**可以，type 对上了**
- `input → p`: 我们能重用 host instance 么？ **不行，type 改变了！** 需要移除现有的 `input` 并重新创建一个全新的 `p` host instance。
- `(nothing → input`: 需要新建一个 `input` host instance。

所以实际上，React 的更新代码就这样执行：

```jsx{1,2,8,9}
let oldInputNode = dialogNode.firstChild;
dialogNode.removeChild(oldInputNode);

let pNode = document.createElement('p');
pNode.textContent = 'I was just added here!';
dialogNode.appendChild(pNode);

let newInputNode = document.createElement('input');
dialogNode.appendChild(newInputNode);
```

这其实不是很酷因为从概念上来说，`<input>` 并不应该被 `<p>` 替换—它仅仅只是移动了一下位置。我们不希望因为重新创建了一个而失去它的 selection，focus state，content

然而这个问题其实很容易被修复，在实际使用 React 的场景中，它不会发生。

在实际中，你很少会直接调用 `ReactDOM.render`，相反地，你会把代码拆解成下面这样：

```jsx
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = <p>I was just added here!</p>;
  }
  return (
    <dialog>
      {message}
      <input />
    </dialog>
  );
}
```

这个例子就不会碰到上面提到的问题了。我们用 object 字面量的形式来取代 JSX 可能会更容易解释为什么。看下 `dialog` 所对应的 element tree：

```jsx{12-15}
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = {
      type: 'p',
      props: { children: 'I was just added here!' },
    };
  }
  return {
    type: 'dialog',
    props: {
      children: [message, { type: 'input', props: {} }],
    },
  };
}
```

**不管 `showMessage` 是 `true` 还是 `false`，`<input>` 都是第二个子节点，因此在每次 render 的时候，它在树中还是在同一个位置。**

如果 `showMessage` 从 `false` 变为 `true`，React 就会遍历 element 树，和它上一个版本比较：

- `dialog → dialog`: 我可以重用 host instance 吗? **可以，type 是一样的。**
  - `(null) → p`: 需要插入一个新的 `p` host instance。
  - `input → input`: 我可以重用 host instance 吗? **当然，type 没有变！**

接着 React 会执行类似的代码：

```jsx
let inputNode = dialogNode.firstChild;
let pNode = document.createElement('p');
pNode.textContent = 'I was just added here!';
dialogNode.insertBefore(pNode, inputNode);
```

再也没有 input state 会丢失了。

## Lists

通过比较 element type 在同一位置是否改变的方式，在大多数时候都可以确定是重用还是重新创建一个新的 host instance。

但是这只有在子节点是固定并且不需要重排的情况下。在我们上面的例子，即使 `message` 变量可以是一个 “hole”，我们还是可以确定 input 在 message 之后，并且没有其他子节点了。

在动态列表中，我们不能保证它们的顺序是否永远不变。

```jsx
function ShoppingList({ list }) {
  return (
    <form>
      {list.map(item => (
        <p>
          You bought {item.name}
          <br />
          Enter how many do you want: <input />
        </p>
      ))}
    </form>
  );
}
```

如果我们的 Shopping List 里的 items 发生了重排，React 则会认为所有的 `p` 和 `input` 都和之前是一样的 type，而不会去移动它们。从 React 的角度来看，是*items 自身*变了，而不是它们的顺序。

React 在重排 10 个 items 时会执行这段代码：

```jsx
for (let i = 0; i < 10; i++) {
  let pNode = formNode.childNodes[i];
  let textNode = pNode.firstChild;
  textNode.textContent = 'You bought ' + items[i].name;
}
```

所以 React 实际上会更新每个 DOM 节点而不是重排它们。这会造成性能问题和 bug 🐛。比如我们的在第一行输入的内容 `how many you want`，会在重排后依然显示在第一行。但其实对应的那个 items 已经不是第一行了！

**这就是为什么 React 每次都会在你需要渲染一个 array 的时候不停地唠叨，老铁你的 key 丢了！**

```jsx{5}
function ShoppingList({ list }) {
  return (
    <form>
      {list.map(item => (
        <p key={item.productId}>
          You bought {item.name}
          <br />
          Enter how many do you want: <input />
        </p>
      ))}
    </form>
  );
}
```

`key` 告诉 React，这些 item 即使在两次渲染之间对于它们的父元素来说位于不同的位置，在概念上也应该认为它们是同一个。

当 React 发现 `<p key="42">` 在 `<form>` 里的时候，它会检测上一次 render 是否也包含了 `<p key="42">` 在同一个 `<form>` 中。即使 `<form>` 的子节点的顺序改变了也能生效。如果存在，React 将会重用这个 key 之前的 host instance，并响应地重拍它的同胞节点。

注意 `key` 仅仅和它最近的父节点有关，对于 `<p>` 它就是 `<form>`。React 不会尝试在不同的 parents 中匹配同一个 key，React 也没有原生支持如何在不重新创建 host instance 的情况下，将它移动到另外一个父元素中。

`key` 应该取什么值才好呢？可以问自己一个简单的问题：**哪些项在重排之后依然可以保持不变？**比如，在购物车中，product Id 就唯一标示了一个商品。

## Components

我们已经学习到那些会返回 React element 的函数了：

```jsx
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = <p>I was just added here!</p>;
  }
  return (
    <dialog>
      {message}
      <input />
    </dialog>
  );
}
```

它们被称为 _components_。它们让我们可以创建自己的 buttons，avatars，comments 等等百宝箱 🧰。可以说 Component 是 React 的面包 🍞 和黄油。

Components 接受一个参数—一个对象。它包含了 “props”（”properties” 的简写）。上面的 `showMessage` 就是一个 prop，它们就像命名的参数一样。（译者注，其实就是 JS 不支持给函数的参数加上别名，而接受一个 Object 可以起到类似的效果）

## Purity

React components 的 props 会被假设为纯（pure）的。

```jsx
function Button(props) {
  // 🔴 Doesn't work
  props.isActive = true;
}
```

一般来说，mutation 是不符合 React 的最佳实践的。不过，_local mutation_ 是没有任何问题的：

```jsx{2,5}
function FriendList({ friends }) {
  let items = [];
  for (let i = 0; i < friends.length; i++) {
    let friend = friends[i];
    items.push(<Friend key={friend.id} friend={friend} />);
  }
  return <section>{items}</section>;
}
```

我们在渲染的时候创建了 `items`，在这之前没有其他组件“见过”它。所以我们可以在将它作为渲染结果之前，按自己喜欢的方式修改它，而不需要为了保存**纯粹性**而扭曲你的代码。

同样的，延迟初始化(lazy initialization) 虽然不是纯，但依旧很棒。

```jsx
function ExpenseForm() {
  // Fine if it doesn't affect other components:
  SuperCalculator.initializeIfNotReady();

  // Continue rendering...
}
```

只要多次调用一个组件是安全的，并且不会影响其他组件的渲染效果，React 并不关心你的代码是否在 FP 的世界中是百分之百纯的。

也就是说，会带来副作用从而影响显示效果的 Component 在 React 中是不被接受的。换句话说，仅仅调用 Component 的方法本身，不应该在屏幕上产生任何变化。（译者注，也就是 Component 本身，不应该有类似于去修改 `window`，或者里面有一个 `ReactDOM.render`)

## Recursion

我们该如何在一个 component 中使用其他的 components？Components 其实都是函数所以我们可以直接调用它们：

```jsx
let reactElement = Form({ showMessage: true });
ReactDOM.render(reactElement, domContainer);
```

然后，这种方式并不对 React runtime 的胃口。

相反，React 正统地使用 components 的方式与我们之前看到得一样—React elements。**这就意味着，你不是直接调用 component 这个函数，而是让 React 来帮你做。**

```jsx
// { type: Form, props: { showMessage: true } }
let reactElement = <Form showMessage={true} />;
ReactDOM.render(reactElement, domContainer);
```

在 React 的某处，你的 component 将会被调用：

```jsx
// Somewhere inside React
let type = reactElement.type; // Form
let props = reactElement.props; // { showMessage: true }
let result = type(props); // Whatever Form returns
```

Component function 命名采用的是首字母大写的方式，当 JSX 转译的时候碰到 `<Form>` 而不是 `<form>` 的时候，它会将 type 赋值为 Form 本身而不是字符串 “form”。

```jsx
console.log(<form />.type); // 'form' string
console.log(<Form />.type); // Form function
```

React 中并没有全局注册的机制—当你输入 `<Form />` 的时候它会按字面上声明的 `Form` 来引用。如果 `Form` 在本地作用域中不存在的话，你就会看到 JS 报一个和你平时使用了错误的变量名一样的错误。

\*\*Okay，所以当 element 的 type 是一个 function 的时候 React 到底做了什么？它调用你的 component，并询问该 component 想要渲染的 element。

这个过程会不停的递归下去，更多的细节可以在[这里](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)看到。简单的形式如下面这样：

- **你：** `ReactDOM.render(<App />, domContainer)`
- **React:** Hey `App`， 你想渲染什么？
  - `App`: 我渲染一个包含了 `<Content>` 的 `<Layout>`
- **React:** Hey `Layout`, 你想渲染什么？
  - `Layout`: 我在一个 `div` 中渲染我的 children。我的子节点有一个 `<Content>` 说你猜这会进入 `<div>`。
- **React:** Hey `<Content>`, 你想渲染什么？
  - `Content`: 我渲染一个拥有一些 text 的 `<article>`，它还包含了个 `<Footer>`
  - **React:** Hey `<Footer>`, 你想渲染什么？
  - `Footer`: 我渲染一个拥有很多 text 的 `<footer>`。
- **React:** Okay, 起飞吧:

```jsx
// Resulting DOM structure
<div>
  <article>
    Some text
    <footer>some more text</footer>
  </article>
</div>
```

这就是我们为什么说 reconciliation 是递归的了。当 React 遍历 element tree 的时候，它会碰到那些 `type` 为 component 的 element，接着会调用它并保持 component 返回的 element 的顺序继续执行。最终我们将会遍历所有的 components，React 也就知道了如何改变 host tree。

我们上面提到的 reconciliation 的规则在这里依然适用。如果相同位置(由 index 和可选的 `key` 共同决定）的 `type` 发生了改变，React 将会移除当前 element 中所有的 host instance 并重新创建它们。

## Inversion of Control

你可以想知道：为什么我们不知道调用 component 呢？为什么要写成 `<Form />` 而不是 `Form()`？

**如果 React 能提前 “了解” 到你的 component 定义，而不是只有在递归调用它后才看到返回的 element 的话，React 就可以更好的工作**

**React can do its job better if it “knows” about your components rather than if it only sees the React element tree after recursively calling them.**

```jsx
// 🔴 React has no idea Layout and Article exist.
// You're calling them.
ReactDOM.render(Layout({ children: Article() }), domContainer);

// ✅ React knows Layout and Article exist.
// React calls them.
ReactDOM.render(
  <Layout>
    <Article />
  </Layout>,
  domContainer
);
```

这是一个简单的[控制反转](https://en.wikipedia.org/wiki/Inversion_of_control)的例子。通过让 React 来控制如何调用组件的话，可以得到一些有趣的属性：

- **Components become more than functions.** React can augment component functions with features like _local state_ that are tied to the component identity in the tree. A good runtime provides fundamental abstractions that match the problem at hand. As we already mentioned, React is oriented specifically at programs that render UI trees and respond to interactions. If you called components directly, you’d have to build these features yourself.

- **Component types participate in the reconciliation.** By letting React call your components, you also tell it more about the conceptual structure of your tree. For example, when you move from rendering `<Feed>` to the `<Profile>` page, React won’t attempt to re-use host instances inside them — just like when you replace `<button>` with a `<p>`. All state will be gone — which is usually good when you render a conceptually different view. You wouldn't want to preserve input state between `<PasswordForm>` and `<MessengerChat>` even if the `<input>` position in the tree accidentally “lines up” between them.

- **React can delay the reconciliation.** If React takes control over calling our components, it can do many interesting things. For example, it can let the browser do some work between the component calls so that re-rendering a large component tree [doesn’t block the main thread](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html). Orchestrating this manually without reimplementing a large part of React is difficult.

- **A better debugging story.** If components are first-class citizens that the library is aware of, we can build [rich developer tools](https://github.com/facebook/react-devtools) for introspection in development.

最后一个优势是 _lazy evaluation（惰性求值）_，一起看看这意味着什么。

## Lazy Evaluation

当我们在 JS 中调用一个函数时，实参会在调用之前就被求值：

```jsx
// (2) This gets computed second
eat(
  // (1) This gets computed first
  prepareMeal()
);
```

这种行为通常是我们所期望的，因为这些函数能带来隐含的副作用。而如果我们调用一个函数，它直到我们以某种方式使用的时候才会被执行的话，这会让我们感到很诧异。

不过，React components 相对纯的，所以我们如果知道它的结果不会在屏幕上呈现的话，就完全没有必要执行它的。

考虑这个 `<Comments>` 插入到 `<Page>` 中的组件：

```jsx{11}
function Story({ currentUser }) {
  // return {
  //   type: Page,
  //   props: {
  //     user: currentUser,
  //     children: { type: Comments, props: {} }
  //   }
  // }
  return (
    <Page user={currentUser}>
      <Comments />
    </Page>
  );
}
```

`Page` 会将它的 children 在 `Layout` 中渲染。

```jsx{4}
function Page({ currentUser, children }) {
  return <Layout>{children}</Layout>;
}
```

_(在 JSX 中 `<A><B /></A>` 和 `<A children={<B />} />` 等价。)_

但是如果有提前提出的条件呢？

```jsx{2-4}
function Page({ currentUser, children }) {
  if (!currentUser.isLoggedIn) {
    return <h1>Please login</h1>;
  }
  return <Layout>{children}</Layout>;
}
```

如果我们像函数一样调用这个 `Comments()`，它都会立刻执行。无论 `Page` 是否需要它：

```jsx{4,8}
// {
//   type: Page,
//   props: {
//     children: Comments() // Always runs!
//   }
// }
<Page>{Comments()}</Page>
```

但是如果我们传递一个 React element 进去的话，就不会立刻执行 `Comments` 了。
But if we pass a React element, we don’t execute `Comments` ourselves at all:

```jsx{4,8}
// {
//   type: Page,
//   props: {
//     children: { type: Comments }
//   }
// }
<Page>
  <Comments />
</Page>
```

这就让 React 决定何时，是否调用 component 函数。如果 `Page` component 实际上忽略 `children` prop 而仅仅渲染 `<h1>Please login</h1>` 的话，React 根本就不会尝试去调用 `Comments` 函数。挺酷的吧 😎？

这让我们省去了不必要的渲染工作，并让我们的代码更加健壮。（在用户注销后，我们不需要关心`Comments` 是否会被 thrown away，它不会被调用的。)

## State

我们[之前](#reconciliation)讨论了 identity，以及 element 在树中的概念“位置”如何告诉 React 是否应该重用当前 host instance 还是创建新的。Host instances 拥有所有的本地状态：focus, selection, input 等等。我们希望在那些在概念上渲染的是相同 UI 的时候，能够保留这些状态。我们还希望在渲染概念上不同的东西时，能够预测到组件会被销毁（比如从 `SignupForm>` 移动到 `<MessengerChat>`）。

**本地状态（Local state）是如此有用以至于 React 让 _你自己_ 的组件也能拥有它。** Components 依然是函数，但 React 为它们扩充了一些对 UI 有用的特性，绑定到树中特定位置的本地状态就是一个这样的特性之一。

我们称这个特性为 _Hooks_。`useState` 就是一个 Hook 。

```jsx{2,6,7}
function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

它返回一对值：当前的状态和一个更新这个状态的函数。

[array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) 语法让你能够自己为状态取一个潇洒的名字。比如上面我们取名为 `count` 和 `setCount`，当其实我们也可以叫它 `banana` 和 `setBanana`。在后文，我将会使用 `setState` 来取代 `useState` 返回的第二个参数。
_(你可以在[这里](https://reactjs.org/docs/hooks-intro.html) 学到关于 `useState` 和 React 提供的其他 hooks)_

## Consistency

即使我们想要将 reconciliation 过程拆分为[非堵塞](https://www.youtube.com/watch?v=mDdgfyRB5kg)的工作块，我们还是需要 perform the actual host tree operations in a single synchronous swoop。这样我们能确定用户不会看到更新到一半的 UI，浏览器也不会为了用户不应该看到的中间状态而执行不必要的 style recalculation 和 layout（译者注：或者叫 reflow，回流）。

这就是为什么 React 将工作分为 `render 阶段` 和 `commit 阶段`。**Render 阶段\* 是 React 调用组件和执行 reconciliation 的时机，在这个阶段你可以安全的中断它（译者注：也就要求 component 必须是纯的，并且 will 类生命周期也是存的），并且在可以期待的[未来](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)将支持异步渲染。**Commit 阶段\*\* 则是 React 接触到 host tree 的时机。它总是同步的.

## Memoization

当父组件通过 `setState` 调度一个更新时，React 默认会 reconciles 它整个子树。这是因为 React 不知道这个来自父组件的更新是否会影响到它的 child，React 选择保持一致。这看上去会让每次更新的代价很高，不过在实际情况下，针对中小型规模的子树来说这不是问题。

不过如果 tree 实在太深或者太广（译者注：兄弟节点太多）的话，你可以告诉 React 去 [memoize](https://en.wikipedia.org/wiki/Memoization) 它的子树，并在每次 props 改变的时候，通过浅比较来决定是否重用之前的渲染结果。

```jsx{5}
function Row({ item }) {
  // ...
}

export default React.memo(Row);
```

现在在 `Table` 中 `setState` 时，将会跳过 reconciliation 那些 `items` 的引用和上次渲染的 `items` 相同的 `Row`。

你可以通过 [`useMemo()` Hook](https://reactjs.org/docs/hooks-reference.html#usememo) 得到细粒度的 memoization。The cache is local to component tree position 并且将会和本地状态一同被销毁。它只保留上一个结果。

React 内部默认不会 memoize 组件，因为许多组件每次更新都会接受到不同的 props，这样的话去 memoize 就是一种浪费。（译者注：很多组件设计成某个 props 接受一个对象，但是在传递的时候 ，如果这个对象是字面量的话，那就等于每次 props 都和上次不同了。）

## Raw Models

讽刺的是，React 并没有使用 “响应式” 系统进行细粒度更新。换句话说，顶部的任何更新都会触发 reconciliation，而不是仅更新受影响的 component。

这其实是一个内部设计的抉择。[Time to Interactive](https://calibreapp.com/blog/time-to-interactive/) 在 C 端 Web App 性能基准中，扮演了一个及其关键的角色，遍历整个模型并设置细粒度的更新将会花费宝贵的时间。另外，在许多应用中，交互往往会导致小型（button hover）或者大型（page transition）的更新，在这种情况下，细粒度订阅往往会消耗更多内存。

React 核心设计原则之一是它可以处理原始数据（raw data）。如果你从网络中接受到了大量的 JS 对象，你可以直接将它们塞进 component 中而不需要做任何预处理。你可以随意读取任何属性，也不会在结构轻微变动的时候出现意想不到的性能抖动。React 渲染时间复杂度是 O(_view size_) 而不是 O(_model size_)，你可以通过 [windowing](https://react-window.now.sh/#/examples/list/fixed-size) 来显著地降低 _view size_ 的值。

一些特定类型的 app 采用细粒度的更新会有更好的效果—比如股票跟踪软件。这是少有的 “everything constantly updating at the same time” 的例子。尽管自己写一些命令式的代码能够优化，React 在这种使用场景上并不是最适合的。当然，你可以在 React 的上层实现一套自己的细粒度订阅系统。

**需要注意的是，有一些通用的性能问题，即使是细粒度订阅和“响应式”系统也不能解决。** 举个例子，渲染一个新的 deep tree（每次 page transition 的时候发生）而不堵塞浏览器。改变 tracking 并不会让它更快—因为它需要在订阅上做更多工作从而变慢了。另一个问题是我们在渲染视图之前必须等待数据的到来。在 React 中，我们通过 [Concurrent Rendering](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) 来解决这个问题。

## Batching

可能有几个组件会希望在同一个事件中一起更新状态。下面这个例子虽然错综复杂但是它说明了一个通用的模式：

```jsx{4,14}
function Parent() {
  let [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>
      Parent clicked {count} times
      <Child />
    </div>
  );
}

function Child() {
  let [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Child clicked {count} times
    </button>
  );
}
```

当一个事件被 dispatched，子节点的 `onClick` 先调用（触发它的 `setState`），接着它的父组件也调用在它自己的 `onClick` handler 中调用 `setState`。

如果 React 在 `setState` 后立刻重新渲染 component 的话，我们会伴随着 child 被渲染两次而结束。

```jsx{4,8}
*** Entering React's browser click event handler ***
Child (onClick)
  - setState
  - re-render Child // 😞 unnecessary
Parent (onClick)
  - setState
  - re-render Parent
  - re-render Child
*** Exiting React's browser click event handler ***
```

第一次 `Child` 的渲染被浪费了，而且我们不能让 React 在第二次更新的时候跳过渲染 `Child`，因为 `Parent` 可能会传递一些基于自己最新的 state 的复杂数据给 `Child`。

**这就是为什么 React 会在 event handlers 中批量更新：**

```jsx
*** Entering React's browser click event handler ***
Child (onClick)
  - setState
Parent (onClick)
  - setState
*** Processing state updates                     ***
  - re-render Parent
  - re-render Child
*** Exiting React's browser click event handler  ***
```

在组件中调用 `setState` 不会立刻重新渲染，相反，React 会先执行所有的 event handlers。然后会重新渲染一次来将这所有的更新一次搞定。（译者注：React 16 中，无法批处理 `Promise` 和 `setTimeout` 中的 `setState`）

批处理对性能很友好，但是会让写出下面这样的代码的你很惊讶：

```jsx
const [count, setCounter] = useState(0);

function increment() {
  setCounter(count + 1);
}

function handleClick() {
  increment();
  increment();
  increment();
}
```

如果我们将 `count` 先设置为 `0`，接着调用 3 次 `setCount(1)`。为了修复这个，我们需要让 `setState` 接受一个 “updater” 函数：

```jsx
const [count, setCounter] = useState(0);

function increment() {
  setCounter(c => c + 1);
}

function handleClick() {
  increment();
  increment();
  increment();
}
```

React 将所有的 updater 函数放进队列中，之后会一次性将它们全部运行，将 `count` 设为 `3` 并重新渲染。
React would put the updater functions in a queue, and later run them in sequence, resulting in a re-render with `count` set to `3`.

当状态逻辑越来越复杂后，我建议使用 [`useReducer` Hook](https://reactjs.org/docs/hooks-reference.html#usereducer)。它就像是这个 “updater” 模式的进化，并给每一种更新途径命了名：

```jsx
const [counter, dispatch] = useReducer((state, action) => {
  if (action === 'increment') {
    return state + 1;
  } else {
    return state;
  }
}, 0);

function handleClick() {
  dispatch('increment');
  dispatch('increment');
  dispatch('increment');
}
```

实参 `action` 可以随便设，当然 object 是一个不错的选择。

## Call Tree

编程语言的 runtime 通常都有 [call stack](https://medium.freecodecamp.org/understanding-the-javascript-call-stack-861e41ae61d4)。当函数 `a()` 调用一个函数 `b()`，而 b 又调用了 `c()`，在 JS 引擎的某个地方会为它构造一个类似于 `[a, b, c]` 这样的数据结构，它“跟踪”你的位置和接下来要执行的代码。一旦 `c` 运行结束，它的 call frame 就会消失了，它不再被需要。我们跳回到 `b`，接着是 `a`，这时 call stack 就是空的了。

当然，React 它是基于 JS 的，它也要遵守 JS 的规则。我们可以想象 React 内部也有自己的 call stack 用来记住当前正在渲染的组件。比如：`[App, Page, Layout, Article /* we're here */]`。

因为 React 它旨在呈现 UI trees，所以它和通用语言的 run time 不太相同。这些树必须要一直存在以让我们能和它们交互。DOM 也不会在第一次调用 `ReactDOM.render()` 后消失。

这可能夸大了这个比喻，但我喜欢将 React components 视为 “call tree” 而不仅仅是一个 ”call stack”。当我们从 `Article` component 中退出时，它的 ”call tree” 不会被销毁。我们需要在[某个地方](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)保留本地状态和对 host instance 的引用。

这些 “call tree” frames 会在被摧毁的同时带走保存的本地状态和 host instances，但这仅仅在 [reconciliation](#reconciliation) 中才有可能发生。如果你之前看过 React 源码，你可能知道这些 frame 被称之为 [Fibers](<https://en.wikipedia.org/wiki/Fiber_(computer_science)>)。

Fiber 就是本地状态实际存在的地方。当状态更新时，React 会将这些 Fibers 标记为需要 reconciliation，并调用这些组件。

## Context

在 React 中，我们通过 props 在组件之间一层一层地传递 things。有时，大量的组件需要同样的 thing—比如，当前用户选中的主题。如果一级一级地往下传递的话，实在太笨重了。

React 使用 [Context](https://reactjs.org/docs/context.html) 解决这个问题,它本质上很像组件的 [dynamic scoping](http://wiki.c2.com/?DynamicScoping)。它就像一个虫洞一样，让你将一些东西放在顶部，而每一个在底部的子节点都能去夺取它，并在它改变的时候重新渲染。

```jsx
const ThemeContext = React.createContext(
  'light' // Default value as a fallback
);

function DarkApp() {
  return (
    <ThemeContext.Provider value="dark">
      <MyComponents />
    </ThemeContext.Provider>
  );
}

function SomeDeeplyNestedChild() {
  // Depends on where the child is rendered
  const theme = useContext(ThemeContext);
  // ...
}
```

当 `SomeDeeplyNestedChild` 渲染时，`useContext(ThemeContext)` 将会向上去寻找最近的 `<ThemeContext.Provider>`，并使用它的 `value`。（实际上，React 还维护了一个 context stack）

如果没有 `ThemeContext.Provider` 存在，`useContext(ThemeContext)` 的结果就是调用 `createContext()` 时在第一个参数里传递的值。在我们的例子中，就是 `'light'`。

## Effects

我们之前提到 React component 不应该在渲染的时候，有副作用，但是副作用在某些情况下确实很有必要。我们经常需要管理 focus，在 canvas 上画图，订阅一个数据源等等。

React 通过声明一个 effect 来实现它：

```jsx{4-6}
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

只要可能，React 会在浏览器重绘屏幕之前尽可能的延迟运行这些 effects。这很棒，因为类似于数据源订阅的这些代码不应该对 [time to interactive](https://calibreapp.com/blog/time-to-interactive/) 和 [time to first paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint) 有负面影响。（这有一个极少使用的 [hook](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) 给你提供同步调用 effect 的行为。尽量别用它）

Effect 不会自运行一次，它们既在组件创建的时候会运行，也在组件更新的时候运行。

Effects 有些时候需要一起清理操作，比如订阅的场景。为了清理它们，effect 可以返回一个函数：

```jsx
useEffect(() => {
  DataSource.addSubscription(handleChange);
  return () => DataSource.removeSubscription(handleChange);
});
```

React 将会在下次应用 effect 之前执行这个函数，当然组件摧毁之前也会执行。

有些时候，每次渲染都重新运行 effect 不让人接受。你可以告诉 React，如果当前变量没有改变的话，[跳过](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) 这次 effect 的运行。

```jsx{3}
useEffect(
  () => {
    document.title = `You clicked ${count} times`;
  },
  [count]
);
```

然后，这通常是一个过早优化，并在你不熟悉 JS 闭包的原理下会导致问题。

比如下面这个代码就有 bug：

```jsx
useEffect(() => {
  DataSource.addSubscription(handleChange);
  return () => DataSource.removeSubscription(handleChange);
}, []);
```

因为 `[]` 相当于告诉 React ”永远不要重新调用这个 effect”，这就导致了 bug。因为这个 effect 的闭包捕获了 `handleChange`，而 `handleChange` 可能会引用其他的 props 或者 state。

```jsx
function handleChange() {
  console.log(count);
}
```

如果 effect 没有重新运行的话，`handleChange` 将会保持第一次渲染的那个版本，因此 `count` 将永远都是 0.

为了解决这个问题，确保你声明的依赖数组中，包含了**所有**可能会改变的东西，包括函数：

```jsx{4}
useEffect(
  () => {
    DataSource.addSubscription(handleChange);
    return () => DataSource.removeSubscription(handleChange);
  },
  [handleChange]
);
```

根据你的代码耳钉，这里还会出现不必要的重订阅，因为 `handleChange` 在每次渲染的时候都是不同的。 [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) 可以帮助解决这个问题。或者你就让它重订阅，因为浏览器环境的 `addEventListener` 非常快，让它运行问题不大。因为一个小优化导致更多问题得不偿失。

_（你可以在[这里](https://reactjs.org/docs/hooks-effect.html)学到更多关于 `useEffect` 和其他官方 Hook）_
