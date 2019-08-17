---
title: React Lazy 的实现原理
date: 2018-12-23T00:20Z
spoiler: 简单讨论一下 React.lazy 内部实现
---

**NOTE: 8 月 15 号重写了内容，之前的描述有点太迷，完全没有逻辑性**

以下分析基于 16.8

`React Lazy` 的实现其实是内部维护是一个新的对象，拥有四种状态，分别对应 Promise 的。它们是一个 enum，从 0-2 分别对应：
`0: Pending`
`1: Resolved`
`2: Rejected`

我们可以看一下 React 针对普通 Component 和 Lazy Component 上实现的区别：就是如何 resolve Component。

```js
case ClassComponent: {
  const Component = failedUnitOfWork.type;

  if (isLegacyContextProvider(Component)) {
    popLegacyContext(failedUnitOfWork);
  }
  break;
}
case ClassComponentLazy: {
  const Component = getResultFromResolvedThenable(failedUnitOfWork.type);
  if (isLegacyContextProvider(Component)) {
    popLegacyContext(failedUnitOfWork);
   }
  break;
}
```

ClassComponent 可以直接通过 type 这个字段拿到，这个字段其实就是 React Element 被创建时，`<A />` 里的这个 A。而 lazy 中的 `getResultFromResolvedThenable` 就是读取这个参数的 `_reactResult` 对象。

而 `getResultFromResolvedThenable` 其实实现十分简单。

```js
function getResultFromResolvedThenable(thenable) {
  return thenable._reactResult;
}
```

因为可以确认这里的 thenable 就是 lazy 的返回值，所以 `_reactResult` 应该是在实现的时候，被插进的一个变量。这里包含了 Component 函数。

接下来我们搜索 `_reactResult` 出现在哪个地方，找了下面代码。它实现了如何将 lazy 组件 resolve 成最终 Component。

```js
export function readLazyComponentType<T>(thenable: Thenable<T>): T {
  const status = thenable._reactStatus;
  switch (status) {
    case Resolved:
      const Component: T = thenable._reactResult;
      return Component;
    case Rejected:
      throw thenable._reactResult;
    case Pending:
      throw thenable;
    default: {
      thenable._reactStatus = Pending;
      thenable.then(
        resolvedValue => {
          if (thenable._reactStatus === Pending) {
            thenable._reactStatus = Resolved;
            if (typeof resolvedValue === 'object' && resolvedValue !== null) {
              // If the `default` property is not empty, assume it's the result
              // of an async import() and use that. Otherwise, use the
              // resolved value itself.
              const defaultExport = (resolvedValue: any).default;
              resolvedValue = defaultExport ?? resolvedValue;
            } else {
              resolvedValue = resolvedValue;
            }
            thenable._reactResult = resolvedValue;
          }
        },
        error => {
          if (thenable._reactStatus === Pending) {
            thenable._reactStatus = Rejected;
            thenable._reactResult = error;
          }
        }
      );
      throw thenable;
    }
  }
}
```

可以看到上面的代码中出现了 3 次 throw。分别出现在了 `Rejected, Pending, Default` 三个 case 里。我们先关注 default 的逻辑，里面会猜测 resolve 的值是否含有 default，如果是的话，说明可能是 async import 的返回值，那么就直接将 default 给 resolve 出来，否则返回自身。接着就会把它写入到 `_reactResult` 中。

那么为什么这些地方都要 throw 它呢？这里就是 Suspense 的逻辑了，Suspense 会 catch 组被 throw 出来的 error，如果它是一个 Promise 的话，就会将 children 都渲染成 fallback 的值，一旦 Promise 被 resolve 则会继续渲染一次，并得到最终的结果。
所以这里 default 和 Pending 都是针对 Suspense 的场景。而 Rejected 就没啥好说了，出了异常当然要抛出去。

最后看一下 React.lazy 的实现。它放回的就是一个 thenable 对象，字段和上面的处理逻辑是一致的。

```js
export function lazy<T, R>(ctor: () => Thenable<T, R>) {
  let thenable = null;
  return {
    then(resolve, reject) {
      if (thenable === null) {
        // Lazily create thenable by wrapping in an extra thenable.
        thenable = ctor();
        ctor = null;
      }
      return thenable.then(resolve, reject);
    },
    // React uses these fields to store the result.
    _reactStatus: -1,
    _reactResult: null,
  };
}
```

因为 status 默认值是 -1 也就会进入 👆 的 default 逻辑，运行 ctor，开始尝试解析 lazy 中的组件。这也就是 lazy 的实现原理。
