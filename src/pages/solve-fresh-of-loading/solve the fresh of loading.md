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

生活很美好吧，umh？不过呢，这让整个交互体验变得不那么「人性化」了。因为我们不论任何时候，网速怎么样，都会加载一个 loading，然后在接口返回的时候，匆匆完事。如果 loading 的 UI 比较小的话，可能不是那么让人讨厌，但想象一个全屏幕的 loading：它出现了一下子又消失了。你这个时候就不会觉得这是很好的用户体验了，反而觉得很蠢。
::NOTE：这里应该引用人机交互指南中，不同的响应延迟需要采取的措施::
所以总结两点，不分青红皂白就 loading，在高速网络下带来的问题

1. 出现 loading，反而让用户觉得变卡了
2. 闪烁的体验让人很分裂

## 一个已经存在的解决方案

React 用户应该都知道 `Suspense`，可惜的是它目前最大的用处仅仅是**Code Splitting**。似乎因为还存在一些不稳定的，React 还没有将它最强大的一面公布出来。当然这是后话，但是如果你看过
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

可是你给我一个现在用不了的解决方案不等于放屁么？根据[官方的说法](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#tldr)，等到 ConcurrentMode 的完成，至少也到 2019 年的 Q2。虽然一些强大的库，比如 rxjs，似乎也能轻松做到我们的需求，但是它不在讨论范围内。
所以接下来我们才进入本文的正题，**如何用 Promise.race 做到同样的效果**

你可以不用读完，直接看[完成代码](https://codesandbox.io/s/kxzxnnj8vr)就行了

## Promise 的解决方案

```jsx
import React, { useState, useCallback } from 'react';

const delay = ms => new Promise(r => setTimeout(r, ms));
const timeout = ms => new Promise((_, r) => setTimeout(r, ms));

const ajax = (api, ms, resolve, reject) => (...args) => {
  const request = api(...args);
  Promise.race([request, timeout(ms)]).then(resolve, err => {
    reject(err);
    return request.then(resolve);
  });
};

const afterOneSecondsWillReturn = foo => delay(400).then(() => foo);

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchApi = useCallback(
    ajax(
      afterOneSecondsWillReturn,
      500,
      rep => {
        setData(rep);
        setLoading(false);
      },
      () => {
        setLoading(true);
      }
    ),
    [loading, data]
  );

  const eject = useCallback(() => fetchApi('foo'), []);
  return (
    <div>
      <button onClick={eject}>let us eject!</button>
      {loading ? 'loading…' : <div>{data}</div>}
    </div>
  );
};

export default App;
```

改进

```jsx
import React, { useState, useCallback } from 'react';

const delay = ms => new Promise(r => setTimeout(r, ms));
const timeout = ms => new Promise((_, r) => setTimeout(r, ms));

const ajax = (api, ms, reject) => (...args) => {
  const request = api(...args);
  return Promise.race([request, timeout(ms)]).then(undefined, err => {
    reject(err);
    return request;
  });
};

const afterOneSecondsWillReturn = foo => delay(1000).then(() => foo);

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchApi = useCallback(
    ajax(afterOneSecondsWillReturn, 500, () => {
      setLoading(true);
    }),
    [loading, data]
  );

  const eject = useCallback(
    () =>
      fetchApi('foo').then(rep => {
        setData(rep);
        setLoading(false);
      }),
    []
  );
  return (
    <div>
      <button onClick={eject}>let us eject!</button>
      {loading ? 'loading…' : <div>{data}</div>}
    </div>
  );
};

export default App;
```
