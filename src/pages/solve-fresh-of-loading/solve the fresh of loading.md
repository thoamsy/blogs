---
title: 解决 loading 闪烁的问题
date: 2019-01-12T19:30Z
spoiler: 无条件 loading 是有代价的
---

## 背景

从开始接触异步请求，接触 AJAX 和 Promise 后，就会发现这些操作很**「套路化」**。绝大多数的异步操作似乎都可以类似下面 👇 的代码：

```jsx
async componentDidMount() {
  this.setState({ loading: true });
  try {
    const rep = await fetch(params)
    this.setState({ ...rep.data });
  } finally {
	  this.setState({ loading: false })
  }
}
```

生活很美好吧，umh？不过呢，这让整个交互体验变得不那么「人性化」了。因为不论任何时候，网速怎么样，都会先生硬地加载一个 loading，然后在接口返回的时候，**匆匆完事**。如果 loading 的 UI 侵入性比较小的话，可能不是那么让人讨厌，但想象一个全屏幕的 loading：它唰地出现了一下子又消失了。你这个时候就不会觉得这是很好的用户体验了，反而觉得很蠢。

::NOTE：这里可能应该引用人机交互指南中，不同的响应延迟需要采取的措施::

所以总结两点，不分青红皂白就 loading，在高速网络下带来的问题

1. 出现 loading，反而让用户觉得变卡了
2. 闪烁的体验让人很分裂

## 一个已经存在的解决方案

React 用户应该都知道 `Suspense`，可惜的是它目前的用处仅仅是**Code Splitting**。似乎还有稳定问题，React 还没有将它最强大的一面公布出来。当然这是后话，但是如果你看过
[Concurrent Rendering in React - Andrew Clark and Brian Vaughn - React Conf 2018](https://www.youtube.com/watch?v=ByBPyMBTzM0&t=1368s) 或者这个 [Demo](https://github.com/facebook/react/tree/master/fixtures/unstable-async/suspense) ，就知道 `ConcurrentMode` 配合 `Suspense 的 maxDuration` 就能解决上面的问题。比如这样一个场景

> 懒加载路由 A 的组件，500ms 内没有加载成功则显示 loading

这个通过未来的 React 可以轻松做到

```jsx
const LazyHome = lazy(() => import('./home'));

const App = () => {
  return (
    <ConcurrentMode>
      // 省去一些 Route 相关代码
      <Route
        path="/"
        render={props => {
          <Suspense maxDuration={500} fallback={<BeautifulLoading />}>
            <LazyHome {...props} />
          </Suspense>;
        }}
      />
    </ConcurrentMode>
  );
};
```

可是给我一个现在用不了的解决方案不等于放屁么？根据[官方的说法](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#tldr)，等到 ConcurrentMode 的完成，至少也到 2019 年的 Q2。另外一些强大的库，比如 rxjs，似乎也能轻松做到我们的需求，但是因为门槛高，用户基数不大，不在讨论范围内。
所以接下来我们才进入本文的正题，**如何用 Promise.race 做到同样的效果**

你可以不用读完，直接看[完成代码](https://codesandbox.io/s/kxzxnnj8vr)就行了

## Promise 的解决方案

主要的实现思路就是通过在**请求和超时**中竞争出优先被 settled 的那个 Promise，作出相应的逻辑。
为了实现的简单，超时的函数应该使用

```js
const timeout = ms => new Promise((_, reject) => setTimeout(reject, ms));
```

使用 reject 而不是 resolve 的好处，可以让代码更加简洁。因为进入 _fulfilled_ 的情况只有一种，就是在 ms 之内请服务器响应并返回了。而在 rejected 状态下，就是超时的逻辑（**注意 ⚠️，这里不考虑请求异常的情况**）

根据上面的说法，很容易写出一个 naive 的实现

```js
try {
  const rep = await Promise.race([timeout(400), fetch(url)]);
  this.setState(rep);
} catch (e) {
  this.setState({ loading: true });
}
```

很显然，这不符合我们的要求。如果没有进入 `catch` 里，世界和平，但是如果进入 `catch` 里，谁帮我们继续处理返回的数据呢？换句话说，它只把一个 loading 丢给你，其他就不管了！

接着，我们改进一下

```js
try {
  const rep = await Promise.race([timeout(400), fetch(url)]);
  this.setState(rep);
} catch (e) {
  this.setState({ loading: true });
  const rep = await fetch(url);
  this.setState(rep);
}
```

嗯，看上去解决了上面的问题。不过仔细一看就能发现，**不是白白多发了一次请求**么，没有从本质上解决问题。
其实我们已经接近那隧道尽头的光了。如果 `const rep = await fetch(url)` 这句话不会重新发送请求，而仅仅只是接着第一次调用 `fetch(url)` 的场景，承载着那个 promise，是不是就解决我们的问题了？

是的，我们只需要将 `fetch(url)` 保存下来，就可以做到了。这是最终实现

```js
try {
  const fetchPromise = fetch(url);
  const rep = await Promise.race([timeout(400), fetchPromise]);
  this.setState(rep);
} catch (e) {
  this.setState({ loading: true });
  const rep = await fetchPromise;
  this.setState(rep);
}
```

It’s Done 😎.

## 让它更加通用

接下来的任务就是让这个场景更加通用，可以通过一个**高阶函数**，把普通的异步函数作为参数传入，并返回一个支持该特性的函数。

我们先写一个最符合直觉的函数，它需要

1. 异步函数
2. 超时时间
3. 接口返回后的回调
4. 超时的回调

下面使用 Promise 而不是 async 来实现，因为这样会让代码更简单。实现如下：

```jsx
const timeout = ms => new Promise((_, r) => setTimeout(r, ms));

const ajax = (api, ms, resolve, reject) => async (...args) => {
  const request = api(...args);
  Promise.race([request, timeout(ms)]).then(resolve, err => {
    reject(err);
    return request.then(resolve);
  });
};
```

这样已经能拿到我们需要的效果了，但是一个函数介绍四个参数的话，未免有点多，让人觉得不太自然。
通过观察第 5 行和第 7 行，如果我们把 第 5 行改成 `request.then(resolve, err => {)` 的话，发现它和第七行的功能类似，都是在等待 `request` 被 _resolve_ 后，继续调用 resolve。接着，如果有一种方法，可以将第一个 `then(resolve` 中的 resolve **委托到**下一个 then 语句运行，我们就可以省略 resolve 这个参数。
因为 `return Promise.resolve().then(resolve)` 和 `return Promise.resolve()` 是等价的。

先看下改进后的代码。

```jsx
const timeout = ms => new Promise((_, r) => setTimeout(r, ms));

const ajax = (api, ms, reject) => (...args) => {
  const request = api(...args);
  return Promise.race([request, timeout(ms)]).then(undefined, err => {
    reject(err);
    return request;
  });
};
```

这里代码和 👆 的区别主要是第五行中的 then，不再是 resolve，而是 undefined。为什么呢？
看下 MDN 中，关于 `Promise.then` 的一个特别的定义。

> If one or both arguments are omitted or are provided non-functions, then then will be missing the handler(s), but will not generate any errors. If the Promise that then is called on adopts a state (fulfillment or rejection) for which then has no handler, a new Promise is created with no additional handlers, simply adopting the final state of the original Promise on which then was called.

翻译过来其实就是，如果 then 里的两个参数有一个函数没有声明的话，就会直接返回一个新的 Promise，并抛出去。虽然看上去很难理解，其实，我们常用的 `catch` 不就是一个简单的 `then(undefined, reject)` 么？最后可以改成

```
const ajax = (api, ms, reject) => (...args) => {
  const request = api(...args);
  return Promise.race([request, timeout(ms)]).catch(err => {
    reject(err);
    return request;
  });
};
```

好了，最后的代码，仅仅 7 行就搞定了，是不是很出乎意料？

## 未解决问题

在整个实现中，我们忽略了一个问题，那就是 request 也有 **throw 异常** 的情况，那么一个关键的问题就需要在 catch 中区分到底是 超时还是服务器异常导致的问题。而为了区分这个，最好的方式就是 Symbol。
一个最简单的方式可以将 timeout 改成

```js
const timeout = ms =>
  new Promise((_, reject) =>
    setTimeout(() => reject(Symbol.for('timeout')), ms)
  );
```

接着我们在 catch 的时候做一个判断，将服务端异常的造成的问题抛出去

```js
catch(err => {
  if (Symbol.for('timeout') === err) {
    reject(err);
    return request;
  }
  throw err;
});
```
