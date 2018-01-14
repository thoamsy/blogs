---
title: Element 和 Component 的区别
date: "2018-01-14T12:12Z"
---

[原文章](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

一句话概括就是，`Element` 是 `Component` 的子集，`Element` 是 `Component` 的返回值.
Element 其实就是一个纯对象，找个对象定义了一些对于 React 来说很重要的属性，比如 `type，children，props，key，type` 这些的。比如
```js
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```
上面的 type 就是这个 element 的核心之一。React 通过判断 type 是字符串还是函数来决定如何 `mount` 这个 element。如果是字符串就说明是普通 DOM，称为 `DOM Element`，如果是 `function` 就是自己定义的，称为为 `Component Element`。
所以换句话说，用户自己写出来的组件的才算的上是一个 `Component`。

创建组件的常用方法有两种，一种是纯函数组件，或者说 `Stateless Component`
```js
const Button = ({ color, text }) => (
	<button style={{background: color}}>{text}</button>
);
```
通过这种方式创建的话，使用 `Button(props)` 就能得到我们定义的 element。不过这仅仅是因为 JSX 给了我们一种语法糖，如果没有 JSX 的话，应该类似于
```js
React.createElement('button', {style: {background: color}}, text);
```
而这个函数的作用也仅仅只是生成一个**对象而已**，就像最上面那个对象一样：

```js
{
	type: 'button',
	props: {
		style: {background: color},
		children: {
			…
		}
	}
}
```

这就是 Element 的真面目了。所以可以看到，JSX 也好，`createElement` 也好，不过是提供一种抽象帮我们不要写这个无聊的对象定义，要知道，如果再多几个 children 的话，整个对象定义应该就有几十行！

同样的，如果换成 `Stateful Component` 的话，其实模式差不多，只不过，它们需要一个 `render` 方法，并且拥有一个被称为 `instance` 的变量。render 的目的其实也就是定义一个 element，而 instance 就是 `this` 了。

所以，一个 Element 出现的步骤此时是，

```js
const instance = new type(props); // type 就是该组件的 type
const element = instance.render(); // render 不就是 Component.prototype 的方法吗
```

综上所述，我们自己写的是 Component，Element 是 Component 的返回值，可以分为三类
1. host（浏览器自带的）
2. function
3. class
host 类型，React 会根据对应 type，生成真正的 **DOM node**，并将它所带的 `props` 写入 node 的 `attribute` 中，接着对 `children` 递归这些操作。
比如 
```jsx
<div>
	  <Button />
	  <Banner />
</div>
```
就需要对它的 children 继续处理。
Function 的返回值就是 element
class 的 render 函数的返回值就是 element。
当然 element 中又可以包括 Component，这个过程也是递归的，不停的重复，直到碰到没有子节点的 host 为止。
