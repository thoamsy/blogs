---
title: React Lazy 的实现原理
date: 2018-12-23T00:20Z
---

实现 `React Lazy` 其实是内部维护是一个新的对象，拥有四种状态，分别对应 Promise：

1. Pending
2. Resolved
3. Rejected
4. Default

可以简单的通过源码来分析

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

需要注意这里的在 Pending 和 default 状态下为什么都是 throw。因为 React 为了实现 Suspense，是通过 throw 一个 Promise 后，在 React 的 commit Work 中有一个 `try catch` 操作来处理它，并进入 Suspense 的流程。

同样的，在一个 React 中使用到了 Lazy Component 的代码

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

可以看到，Component 和 Class Component 的区别就是 type 的读取方式不一样。而 `getResultFromResolvedThenable` 就是读取这个参数的 `_reactResult` 对象。

而 `getResultFromResolvedThenable` 其实实现十分简单。

```js
function getResultFromResolvedThenable(thenable) {
  return thenable._reactResult;
}
```

最后，`React.lazy` 也很符合我们的预期。它会维护 `_reactResult` 以维护最终的 **type(Component)**

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

通过设置 `status` 为 _-1_，使 React 在开始 _read_ 这个 Lazy Component 的时候，才开始运行 `ctor`，在正常场景下 `ctor` 是一个类似于 `() => import('./src')` 的返回 Promise 的函数。所以 React 原生实现 lazy load 的原因是：Suspense 配合一个内部定义的 `Thenable` 对象，同时让 Work 支持 catch Promise。
