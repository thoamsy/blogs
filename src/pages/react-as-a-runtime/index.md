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
- [ ] batching
- [ ] call tree
- [ ] context
- [ ] hooks

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
