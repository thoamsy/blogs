---
title: 解决 loading 闪烁的问题
date: '2019-02-23T19:30Z'
spoiler: 无条件 loading 是有代价的
---

## 背景

从开始接触异步请求和 Promise 后，就会发现这些操作很**「套路化」**。绝大多数的异步操作似乎都可以类似下面 👇 的代码：

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

这种套路话的方式，和 `await` 的引入，确实让我们在处理异步问题的时候简单了很多。但是这也带来了一些体验上的缺陷。在请求返回足够快（9102 年了，网速不是问题）的情况下，会给 loading 带来一种转瞬即逝的效果 🌚。

如果 loading UI 侵入性比较小的话，可能不是那么让人讨厌，但想象一个全屏幕的 loading：它唰地出现了一下子又消失了。你这个时候就不会觉得这是很好的用户体验了，反而觉得很蠢。

所以总结两点，不分青红皂白就 loading，在高速网络下带来的问题

1. 频繁出现 loading，会让用户觉得变卡了
2. 闪烁的体验让人很分裂

## Promise 的解决方案

你可以不用读完，直接看[完成代码](https://codesandbox.io/s/kxzxnnj8vr)就行了

主要的实现思路就是通过在**请求和超时**中竞争出优先被 `settled` 的那个 `Promise`，作出相应的逻辑。
为了实现的简单，超时的函数可以写成

```js
const timeout = ms => new Promise((_, reject) => setTimeout(reject, ms));
```

`timeout` 的实现使用 `reject` 而不是 `resolve` 可以让代码更加简洁。因为进入 _fulfilled_ 的情况只有一种，就是在 ms 之内请服务器响应并返回了。而在 `rejected` 状态下，就是超时的逻辑（**注意 ⚠️，这里不考虑请求异常的情况**）

根据上面的说法，很容易写出一个 _naive_ 的实现

```js
try {
  const rep = await Promise.race([timeout(400), fetch(url)]);
  this.setState(rep);
} catch (e) {
  this.setState({ loading: true });
}
```

但是这不符合我们的要求。如果没有进入 `catch` 里，世界和平，但是如果进入 `catch` 里，谁帮我们继续处理返回的数据呢？换句话说，它只把一个 loading 丢给你，其他就不管了！

接着，我们改进一下：

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

这种方式和上面的差别是在 `catch` 中做了显示 loading 之后的所需操作的。遗憾的是，它通过继续调用一次 `fetch` 来想当然的认为能处理问题。但其实，我们只需要将 `fetch(url)` 的结果保存下来，就可以做到了。

```js
let fetchPromise = null;
try {
  fetchPromise = fetch(url);
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

我们先写一个最符合直觉的函数，它需要哪些参数：

1. 异步函数
2. 超时时间
3. 接口返回后的回调
4. 超时的回调

下面使用 Promise 而不是 `async` 来实现，因为这样会让代码更简单。实现如下：

```jsx
const timeout = ms => new Promise((_, r) => setTimeout(r, ms));

const rq = (api, ms, resolve, reject) => async (...args) => {
  const request = api(...args);
  Promise.race([request, timeout(ms)]).then(resolve, err => {
    reject(err);
    return request.then(resolve);
  });
};
```

这样已经能拿到我们需要的效果了，但是一个函数介绍四个参数的话，未免有点多，让人觉得不太自然。
通过观察第 5 行和第 7 行，我们发现 `request` 后下一个 fulfilled 回调是 `resolve`，`timeout` 在解决完 `reject` 后下一个 `fulfilled` 回调也是 `resolve`。也就是说，其实我们可以将代码改成这样 `ajax(api, ms, reject).then(resolve)`。

看下改进后的代码：

```jsx
const timeout = ms => new Promise((_, r) => setTimeout(r, ms));

const rq = (api, ms, reject) => (...args) => {
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

翻译过来其实就是，如果 then 里的两个参数有一个函数没有声明的话，就会直接返回一个新的 Promise，并抛出去。虽然看上去很难理解，其实，我们常用的 `catch` 不就是 `then(undefined, reject)` 的语法糖？最后可以改成

```
const rq = (api, ms, reject) => (...args) => {
  const request = api(...args);
  return Promise.race([request, timeout(ms)]).catch(err => {
    reject(err);
    return request;
  });
};
```

## 未解决问题

在整个实现中，我们忽略了一个问题，那就是 request 也有 **throw 异常** 的情况，一个关键的问题就需要在 catch 中区分到底是超时还是服务器异常导致的问题。而为了区分这个，最好的方式就是 Symbol。

因为它是**唯一**的。下面为了代码的清晰，我改成了 `Symbol.for`。
可以将 `timeout` 改为：

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

### 使用实例

```jsx
const Table = ({fetch}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
	const powerfulFetch = useCallback(() => rq(fetch, 500, () => setLoading(true), [fetch]);

  useEffect(() => {
    powerfulFetch()
      .then(res => setList(res)) }
      .finally(() => setLoading(false)
    );
  );

 return loading ? <Loading /> : list.map(item => ………);
}
```

## 美好的未来 ✨

React 用户应该都知道 `Suspense`，可惜的是它目前的用处仅仅是**Code Splitting**。似乎因为一些稳定性问题，React 还没有将它最强大的一面公布出来。当然这是后话，但是如果你看过
[Concurrent Rendering in React - Andrew Clark and Brian Vaughn - React Conf 2018](https://www.youtube.com/watch?v=ByBPyMBTzM0&t=1368s) 或者这个 [Demo](https://github.com/facebook/react/tree/master/fixtures/unstable-async/suspense) ，就知道 `ConcurrentMode` 配合 `Suspense` 的 `maxDuration` 就能解决上面的问题。比如这样一个场景

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

这个例子其实和我们要讨论的不一样，上面的例子是关于 Code Splitting，我们主要讨论的是 Ajax 请求的。

不过强大的 React 也有方式做到后者，通过 `react-cache` 配合 `Suspense`

```jsx
import { createResource } from 'react-cache';
const fakeResource = createResource(fakeAPI);
const List = () => {
  const list = fakeResource.read();
  return list.map(item => <p key={item.id}>{item.name}</p>);
};

const App = () => {
  return (
    <ConcurrentMode>
      <Suspense maxDuration={500} fallback={<BeautifulLoading />}>
        <List />
      </Suspense>
    </ConcurrentMode>
  );
};
```

它可以在 500ms 之内没有接受到服务器响应的话，显示 loading，否则直接渲染 list。

根据[官方的说法](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#tldr)，等到 `ConcurrentMode` 的稳定，至少也要到 2019 年的 Q2，而客户端级别的 `Suspense` 要到 Q3。

## 总结

本文主要介绍了使用 `Promise.race` 来解决 loading 闪烁的问题。同时也揭露了未来 React 可以带来的声明式的写法，以及如何在 `Code Splitting` 中解决同样的问题。
