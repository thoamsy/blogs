---
title: React 的变革者—Suspense
date: 2019-04-05T20:50Z
spoiler: 为什么说 Suspense 会改变整个 React？
---

在 16.6 发布的时候，React 为我们带来了 `Suspense 和 lazy`。虽然目前的作用仅仅是用于 [Code Splitting](https://reactjs.org/docs/code-splitting.html)，和 Dan 所[演示](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)的还有些差别，但这依然是个让人兴奋的开始。这意味着，在不远的将来，那些我们曾经习以为常的代码，将会随然 React 的大步迈进，而被人遗忘。

在现实场景中，开发一个具有异步调用功能的组件可以说是家常便方。我们已经习惯了先定义好 `state`，并在 `componentDidMount` 和 `componentDidUpdate` 中写好调用异步的逻辑。比如下面的例子就是一个非常常见的例子：

## Class 的方式

这个组件的功能很明显，就是在组件第一次挂载的时候，调用异步的逻辑：显示 loading，发送请求，请求成功返回就对数据进行处理并渲染，请求失败就告知用户失败的原因。并将 loading 展示。并且在 `fetchData` 更新的时候继续调用。

```jsx
class AwesomeComponent extends Component {
  state = {
    loading: false,
    error: null,
    data: null,
  };

  async derivedData() {
    this.setState({ loading: true });
    try {
      const data = await this.props.fetchData();
      this.setState({ loading: false, data });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  componentDidMount() {
    this.derivedData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetchData !== prevProps.fetchData) {
      this.derivedData();
    }
  }

  render() {
    const { loading, error, data } = this.state;
    return loading ? (
      <p>Loading…</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <p>Data: {JSON.stringify(data)}</p>
    );
  }
}

class Parent extends Component {
  state = {
    query: 'react',
  };
  fetchData = () => {
    const url = `${prefixUrl}?query=${this.state.query}`;
    // do something
  };
  render() {
    return <AwesomeComponent fetchData={this.fetchData} />;
  }
}
```

但是，如何仔细思考的话，我们会发现那个 `componentDidUpdate` 的分支其实永远不会被调用，因为 `fetchData` 并不会被改变。接着我们会尝试将 `fetchData` 由之前的 instance method 改为直接在 render 中声明。

```jsx
class Parent extends Component {
  state = {
    query: 'react',
  };

  render() {
    fetchData = () => {
      const url = `${prefixUrl}?query=${this.state.query}`;
      // do something
    };
    return <AwesomeComponent fetchData={fetchData} />;
  }
}
```

这种就能保证每次 render 的时候，我们都能拿到最新的 `fetchData`，然后 `componentDidUpdate` 就能更新了对吧？
这没错，但是如果这个组件还存在其他 props，存在其他 state，并因为这些变量的变化导致 Parent re-render 的话，fetchData 也还是更新了。并带来无用的调用。

所以为了解决这个问题，我们还需要改找我们的写法，将 `this.state.query` 也作为一个 props 传递给子组件：

```jsx
class AwesomeComponent extends Component {
  async derivedData() {
    this.setState({ loading: true });
    try {
      const data = await this.props.fetchData();
      this.setState({ loading: false, data });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }
  componentDidMount() {
    this.derivedData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.derivedData();
    }
  }
}

class Parent extends Component {
  state = {
    query: 'react',
  };
  fetchData = () => {
    const url = `${prefixUrl}?query=${this.state.query}`;
    // do something
  };
  render() {
    return (
      <AwesomeComponent fetchData={this.fetchData} query={this.state.query} />
    );
  }
}
```

而我们将这个 query 传递给子组件，仅仅是为了让 `componentDidUpdate` 能够没有 bug 的运行。

通过艰难的 class 使用之旅，我们发现了下面几个问题：

1. 👎 重复的模板代码—影响开发体验
   我们写大量的模版代码来处理各种状态：请求之前开 loading，接着触发请求。在请求成功后做什么，在失败后做什么。同时还要关闭 loading。如果每一个组件都要这么写的话，会让人崩溃的。
2. 👎 对生命周期的强依赖—影响开发体验
   为了保证 props 更新后，我们能及时的重新发送请求，获取最新的数据，我们需要在 `componentDidUpdate` 中写 `componentDidMount` 类似的逻辑。如果还存在其他场景的话，会让 `componentDidUpdate` 中包括越来越多的 if 分支，变得非常复杂
3. 👎 传递“无用” props—破坏封装
   相信你已经发现了，我们将 query 作为 props，仅仅是为了 “diff”，而不是我们期望它作为数据流的初心。随着组件功能越来越强，我们就需要传递更多的 props 仅仅用来 “diff”
4. 👎 闪烁的 loading—影响交互体验
   如果用户的网络足够快，让 loading 展示几十毫秒就消失比不展示的体验还要糟糕，还会让人觉得你的 app 很慢很卡顿。（思考一个场景，每次你和 Siri 互动，它都要先说“请稍后”）

很显然，传统的 class 带来的问题已经非常明显，如果一个新手想要接触 React 的话，他很可能会因为这些而远离 React。
接下来我们将尝试解决这些问题。

## Context

第一个问题，我们很容易想到用 Context 或者说 redux 来解决这个问题。我们可以将这些逻辑用 Context 包装好，或者是通过 redux 的中间件，可以将发送请求，请求成功和请求失败的逻辑做一定程度上的复用。这里有一篇[文章](https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc)就提到了类似的方法。确实，Context 和 redux 可能能帮助我们解决代码复用的问题，但是它也可能带来更多问题：

1. 更高的学习门槛
2. redux 还是存在很多模板代码的
3. 滥用 context 可能会让代码维护起来更加困难

## Hooks

我们再看看 hooks，它是 React 的一个巨大迭代，那么它能否改进我们的开发体验呢？我们看看效果：

```js
const Parent = () => {
  const [query, setQuery] = useState('react');
  const fetchData = useCallback(() => {
    const url = `${prefixUrl}?query=${query}`;
    // do something
  }, [query]);

  return <AwesomeComponent fetchData={fetchData} />;
};
const AwesomeComponent = ({ fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startFetch() {
      setError(false);
      setLoading(true);
      try {
        const data = await fetchData();
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }

    startFetch();
  }, [fetchData]);

  return loading ? (
    <p>Loading…</p>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    <p>Data: {JSON.stringify(data)}</p>
  );
};
```

Hooks 的出现成功解决了两个问题：

1. useEffect 让干掉了 `componentDidMount` 和 `componentDidUpdate` 冗余的逻辑。
2. 我们不再需要往 AwesomeComponent 中传递 query，维持了组件的封装行性，减少无用的 props

而只要我们愿意的话，还能将第一个问题：复用问题也一并解决。 Custom Hooks 可以轻易做到。

```js
// 在我们的场景中，因为 api 是会改变的参数，所以我们只需要将它加入依赖数组中。
// 如果是其他的形式，比如要求 id 改变而改变的话，可以自行调整。

const useFetch = api => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startFetch() {
      setError(false);
      setLoading(true);
      try {
        const data = await api();
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    startFetch();
  }, [api]);

  return [data, loading, error];
};
```

这么一来，我们已经把 class 模式中，前三个问题全部解决了。可以看到 hooks 的优势很明显。
但其实，class 还有一个问题我在上面没有提到。回顾一下代码：我们会在 `componentDidUpdate` 中检测 `fetchData` 是否改变了，并重新调用。但这里就引入了一个**竞态问题**。

如果 `fetchData` 在第一次更新的时候，`query = redux`，然后请求发了出去。接着 `query = vue`，请求继续发出去。但是在上一个请求回来之前，vue 的请求抢先了一步返回，接着 redux 的请求才回来。这样就会导致数据变成了上一次的结果。

而通过在传给`useEffect` 的函数中的返回值，做一个**状态调整**，我们就能做到这个。上面的代码可以改成：

```js
const useFetch = api => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMount = true;
    async function startFetch() {
      setError(false);
      setLoading(true);
      try {
        const data = await api();
        isMount && setData(data);
      } catch (err) {
        isMount && setError(err);
      }
      isMount && setLoading(false);
    }
    startFetch();
    return () => (isMount = false);
  }, [api]);

  return [data, loading, error];
};
```

通过这种方式，如果 `fetchData` 改变了话，就不会继续运行前一个 `fetchData` 带来的副作用，而仅仅关注最后的结果，也就解决了这个竞态问题 😄。

另外，在 SPA 中，我们也会碰到发出一个请求后，用户又从这个 route 退出了，而对一个已经 unmount 的组件进行 `setState`，也存在一定的[隐患](https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)。这在 class 的模式下，比较难解决，会让代码变得过于复杂，这里有一个 [gist](https://gist.github.com/bvaughn/982ab689a41097237f6e9860db7ca8d6) 描述了不可被取消的 promise 场景该怎么处理。而通过 Hooks，也很好地规避了这个问题的出现。

使用 hooks 处理异步更具体的教程，可以[看这里](https://www.robinwieruch.de/react-hooks-fetch-data/)。值得一提的是，最近 dan 有了一个新的 [pr](https://github.com/facebook/react/pull/15104/files 'PR')，将 `useEffect` 的 warnning 信息调整了一下，并在文档上专门有一块来介绍这个。

虽然 hooks 看上去已经完美解决了，我们上面提到的三个问题，但它其实并不是 React 用来解决异步问题的终极方案，仅仅是一个过渡的选择。所以上面的代码还是有点小别扭：我们不能直接在 `useEffect` 中写一个 `async` 函数，而是需要提前写好 `async` 函数的内容，并在 `useEffect` 中间接调用它。

这里的原因是 React 会去查看 `useEffect` 里函数的返回值，以做一些 _cleanup_ 的操作。如果我们直接传递 `async` 函数的话，无论我们是否明确地写了 return，都会隐式的返回一个 `Promise`。这样会干扰 `useEffect` 的 _cleanup_。我们可以看看类似的截图

![](DraggedImage.png)

那么通过 Hooks 我们解决了哪些问题呢？

1. 逻辑复用轻松，提升开发体验 😉 — Hooks 本身就是函数，函数和函数之间传递是十分方便的。这和传统的 `HOC，render props` or `context` 比起来，直观了很多
2. 不再强依赖 React 生命周期，提升开发体验 👍 — `useEffect` 十分完美的解决了这个问题
3. 不再传递仅仅用来 “diff” 的 props，组件更加小巧好用
4. 闪烁 loading 的体验问题 😣—还是存在

## Suspense

最后，我们需要看一下 Suspense 是如何救世的。在这之前先一起熟悉下，它目前最常见的用途就是：

```jsx
const Home = lazy(() => import('./home'));

const App = () => {
  return (
    <Router>
      <Suspense fallback="loading…">
        {/*低版本 Route 这里可能会有一个 warning*/}
        <Route path="/" component={Home} />
      </Suspense>
    </Router>
  );
};
```

`Suspense` 的本质就是将异步资源对应的 `Promise` 给 `throw` 出去。然后 React 会通过 _ErrorBoundary_ 一直往上找，找到最近的 `Suspnse` 为止。这个时候会用 `Suspense` 的 `fallback` 来作为它的 `children` 渲染。在这个 Promise 被 `settled` 后，React 就会用 `settled` 的数据，来作为 Promise 表达式的返回值，并重新渲染。在上面的例子上，就是 `import(‘./home’).default`。具体的例子可以看看[这个](https://codesandbox.io/s/pk79xvxq20)

从目前看来比较鸡肋的 `Suspense`，应该会在 [2019 年中](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-mid-2019-the-one-with-suspense-for-data-fetching)呈现完全版。
官方的 roadmap 中有一段非常诱人的代码：

```jsx
// React Cache for simple data fetching (not final API)
import { unstable_createResource } from 'react-cache';

// Tell React Cache how to fetch your data
const TodoResource = unstable_createResource(fetchTodo);

function Todo(props) {
  // Suspends until the data is in the cache
  const todo = TodoResource.read(props.id);
  return <li>{todo.title}</li>;
}

function App() {
  return (
    // Same Suspense component you already use for code splitting
    // would be able to handle data fetching too.
    <React.Suspense fallback={<Spinner />}>
      <ul>
        {/* Siblings fetch in parallel */}
        <Todo id="1" />
        <Todo id="2" />
      </ul>
    </React.Suspense>
  );
}
```

所以如果要使用 Suspense 来改下之前的代码的话：

```js
import { unstable_createResource } from 'react-cache';

const fetchResource = unstable_createResource(fakeApi);
const Parent = () => {
  const [query, setQuery] = useState('react');
  const fetchData = useCallback(() => {
    const url = `${prefixUrl}?query=${query}`
    // do something

    const data = fetchResource.read(url);
    return data;
  }, [query]);

  return (
   <Suspense fallback="loading…" maxDuration={300}>
     <AwesomeComponent fetchData={fetchData} />
   </Suspense>
  );

const AwesomeComponent = ({ fetchData }) => {
  const data = fetchData();
  return <p>Data: {JSON.stringify(data)}</p>
}

```

注意这里为了突出 `createResource` 这一步，我必须把 `fetchResource.read` 这里写出来。

它相比 Hooks 的版本，进一步解决了几个问题：

1. 不再需要关注竞态和 state 的问题 👍—连 state 都没有了，每次函数组件都会重新运行，自然没问题
2. 没有 loading 闪烁的问题 👍—基于 `ConcurrentMode`，可以非常优雅的解决这个难题

但它也不是完美的，目前 `react-cache` 存在个问题，它没有一个优雅方式来处理 resource 中错误的情况（至少我们发现 - -）。如果直接将 Error 从 `fakeApi` 中抛出来的话，`AwesomeComponent` 是会直接挂掉的。如果试图用 `try catch` 来包装 `read` 这的逻辑，也不行。目前我想到的一个可行的方案是修改 `fakeApi`，但是这种方式很不优雅。

```jsx
const fakeApi = fetch().catch(err => Symbol(err.message));
const fetchDataResource = unstable_createResource(fakeApi);

const AwesomeComponent = ({ fetchData }) => {
  const data = fetchDataResource();
  // Symbol.prototype.description 要求浏览器版本非常高，可以自己基于 toString 写 polyfill
  return typeof data === Symbol ? <p>{data.description} : <p>Data: {JSON.stringify(data)}</p>
}
```

但是我相信，随着`react-cache` 正式版的发布，这个问题官方一定能给出一个合理的解决方案。

PS：如果你想去体验的话，可能会失望。现在 react-cache 和 16.8.x 放在一起，根本跑不起来 🌚

## 总结

通过上面三种逐渐改进的开发模式 Class -> Hooks -> Suspense，我们认识到了 Hooks 的潜力。它让之前 Class 的逻辑更加清晰，能让组件设计更为合理，并且在代码复用性上也直接终结了 _HOC_ 和 *render props*这两种经典模式。但是它在处理异步任务的时候，并不是最具有表现力的方案，并且也没有解决 Class 遗留下来的问题。而 Suspense 最终通过简洁又富有声明式的代码，漂亮地解决了这些问题。很显然，未来是 Hooks 的，但是 Suspense 会让异步逻辑更加容易。

## 值得一提

另外，如果你想知道如何在没有 `ConcurrentMode` 的情况下，如何解决 loading 闪烁的问题，可以看[这篇文章](../solve-fresh-of-loading/index.md)。
