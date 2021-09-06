---
title: '使用 lodash/fp'
date: '2018-04-02'
excerpt: '感受 fp 的强大'
---

NOTE: 2019-08-25 调整一些描述和格式更新，并添加 pipeline 相关。

这篇文章主要是介绍 lodash 的 [fp](https://github.com/lodash/lodash/wiki/FP-Guide) 模块, 通过它的特点来让 React 的 `setState` 少写很多代码. 同样的原理也能放在 redux 的 `reducer` 上, 但是因为 lodash/fp 的缺陷, 这篇文章不会深入.

## 删除数组的某个值

开门先来一个例子.
假设我们的 state 的结构是这样

```js
state = {
  posts: [{ id: '1234567', content: 'abc' }, { id: '4343434', content: 'def' }],
};
```

我们想删除特定的 id 的 post 话, 最原生的写法会是

```js
this.setState(({ posts }) => ({
	posts: posts.filter(post => post.id !== postId)
});
```

使用普通的 lodash 会是

```js
this.setState(({ posts }) => ({
  posts: reject(posts, ['id', postId]),
}));
```

这样看起来, 普通的 lodash 并没有做多少事情, 只不过在 `filter` 的时候, 通过内置的 `reject` 少写了一些代码.
那么, 我们再看下 lodash/fp 的写法

```js
this.setState(update('posts', reject(['id', postId]));
// or
const rejectWithPostId = compose(update('posts'), reject, propEq('id'));
this.setState(rejectWithPostId(postId))
```

可以很直观的看到, 我们已经少写了很多重复的代码. 比如之前两个代码中都会出现三次的 `posts`, 在这里只出现了一次, 而且也没有嵌套和大括号的出现, 这明显让代码看上去更~~简洁~~优雅不繁琐。

而下面 compose 的使用, 虽然看上去总代码多了, 但是却进一步提高了代码的维护性，让开发者明确知道这个函数代表了什么意思。

## 具体的解释在下文说明

## lodash/fp 的变化

那么这个模块和普通的 lodash 区别在哪呢？分为以下几点

1.  都是纯函数
2.  参数的顺序调整
3.  iteratee 参数受限
4.  完全柯里化
5.  没有可选参数下面一一解释这几点

### Pure

*都是纯函数*这句话, 如果你稍微了解过函数式编程, 就知道它的意义何在.
我们看这个例子.
如果我们使用 lodash 的 `set`, 执行

```js
this.setState((prevState) => set(prevState, 'posts[0]', 10)
```

这样的操作会修改 prevState 的, 肯定会导致的 bug 的出现. 当然这种用 set 的方式确实有点怪, 有点像强行捏造的出来的代码 🌝
但是如果用 lodash/fp 下的 `set`

```js
this.setState(prevState => set('posts[0]', 10, prevState));
```

它相比 lodash 的区别是，参数顺序调整和 _immutable_
另外, 你可以用 Jest 运行下面代码, 可以确定它是纯的, 这样也就保证了 setState 的正确性

```js
test('The set function should be pure', () => {
  const res = set('posts[0]', 10, state);
  expect(res.posts).not.toBe(state.posts);
  expect(res).not.toBe(state);
  expect(res.posts[0]).toBe(10);
});
```

### Rearranged Arguments

最显著的一点就是, 由 _data-first/_ 变成了 _data-last_.
除了上面的 set, 还有 `map, reduce, filter` 都是这样.

`map([1, 2, 3], a => a * 2)` 调整成了 `map(a => a * 2, [1 ,2 ,3])`
这个调整目前看上去似乎很鸡肋，甚至有点反人类之嫌, 等描述完柯里化后我们会继续对比

### Capped Iteratee Arguments

将迭代器函数做限制, 主要是为了规避一些常见 bug

```js
// The `lodash/map` iteratee receives three arguments:
// (value, index|key, collection)
_.map(['6', '8', '10'], parseInt);
// ➜ [6, NaN, 2]

// The `lodash/fp/map` iteratee is capped at one argument:
// (value)
fp.map(parseInt)(['6', '8', '10']);
// ➜ [6, 8, 10]
```

Capped 的方式虽然让我们不会再遭遇意外的传参导致的 bug，但是这也导致 map 的能力被大大削弱。这种一刀切的方式似乎不是那么的优雅。好在 fp 中还提供了一个 `convert` 方法来用去除这个限制

```js
const mapWithIndex = map.convert({ cap: false })
this.setState(({ posts }) => ({
	posts: mapWithIndex((post, i) => i === index ? { ...post, content: 'good' } : post, posts)
});
```

可是我们真的还需要依赖 map 的 index 来做这种事情么? 仔细想一下, cap 的存在不仅是为了减少意外的 bug 出现，还有一个可能就是它在鼓励开发者使用更加 _functional_ 的方式来完成这个任务。我们可以到 fp 中的 `update` 方法

```js
this.setState(update(`posts[${index}]`, set('content', 'good')));
```

那么除了 set 之外，fp 中还存在一个 assign 方法，它的作用和 `Object.assign` 类似，那么我们能把代码替换成下面这样么：

```js
this.setState(update(`posts[${index}]`, assign({ content: 'good' })));
```

事实上是不可行的，具体原因后面再展示。

另外, lodash/fp 其实还提供了很多同名函数, `set` 的同名函数有 `assoc` 和 `assocPath`. 用法都一样, 不过在其他库中, 后面两个叫法更为普遍.

`assoc` 用于给非嵌套的对象赋值。比如 `assoc('path', 1), assoc('hh', 2)`。对于 `posts[2]` 这种方式就应该交给
assocPath, `assocPath(['posts', 2], 2)`

但是呢，Lodash 是偷了懒, 没有在实现上区别它们. 只不过它提供了一个 `eslint-plugin-lodash-fp` 来提供 lint 的支持, 帮助使用者加以限制.

### Currying

终于到了重点咯. 先来解释下柯里化吧.
英文 _Currying_, 之所以这么叫是因为有一个数学家叫, [Haskell Curry](https://en.wikipedia.org/wiki/Haskell_Curry) , 他提出了一种化简高阶函数的方法, 所有后人就给这种方法命名为 Currying 咯. 我初学的时候, 一直没搞懂这是什么意思, 因为它的直译就是*咖喱*(那个时候, 篮球巨星库里还没那么火)

假设我们有一个函数, `add`. 通常的写法应该是 `add(a, 10)`, 说明我们给变量 a 加 10.
下一次我们要给变量 b 加 10, 就 `add(b, 10)`, 如果还有变量 C……
如果一个被柯里化过得 add, 就可以这样写 `add(a, 10) add(a)(10), add(__, 10)(a), add(__)(a)(10)`

你可能会问这样有什么用 0.0, 而且那个 `__` 是什么意思? 这大的好处其实就是能够函数复用，并作为输入传给下一个函数

```js
const addTen = add(10);
```

这样的话, 要计算 a, b, c 只需要调用 `addTen(a)` 这样就行咯.
那么 `__` 呢? 官方的解释是:

> The placeholder argument, which defaults to `__`, may be used to fill in method arguments in a different order. Placeholders are filled by the first available arguments of the curried returned function.

什么意思, 我们举过一个例子. 上面的加法改成减法, 但是目的还是一样, 将一个数减 10.
这里我们还能用 `sub(10)` 吗? 显然不行, 因为减法不是加法, 是不**满足交换律**的. 所以 sub(10) 会变成 10 - a 而不是 a - 10
这个时候就可以用到 `__`, `const subTen = sub(__, 10)`, 它就相当于一个占位符的效果，让我们忽略这个值，去看后面的。也类似于 `flip(sub)(10)` 的效果

同时, 使用占位符, 上面的代码

```js
this.setState(update(`posts[${index}]`, set('content', 'good')));
```

其实可以改成

```js
this.setState(update(`posts[${index}]`, assign(__, { content: 'good' }))
```

所以之前的 `assign` 不行的原因是因为, lodash/fp 并没有调整它的顺序. 本来是后面的参数覆盖前面的参数, 这种很符合人类思考方式的习惯, 但是如果硬要交换的话, 反而就会看上去很奇怪.

现在我们大概了解了柯里化的作用, 但是看上去效果还不是那么明显. 但是如果结合参数顺序的对调呢?
再看一个例子. 这个代码可能有点抽象, 有点长 :）[例子来自一个 ramda 的教程](http://fr.umio.us/favoring-curry/)

```js
const getIncompleteTaskSummaries = function(memberName) {
    return fetchData()
        .then(data => get(data, 'tasks'))
        .then(tasks => filter(tasks, 'username'))
        .then(tasks => reject(tasks, 'complete');
        .then(tasks => map(tasks, task => pick(
				task, ['id', 'dueDate', 'title', 'priority'])))
        .then(abbreviatedTasks => sortBy(abbreviatedTask, 'dueDate'));
};
```

我们先不管它的应用场景, 光看代码的话, 可以意识到, 这里写了太多重复的 tasks 了, 而这也是我们日常编程中的常见写法. tasks 作为中间变量, 需要不断地的传递.
我们剥离这里的 Promise, 改成这个样子

```js
sortBy(
  map(reject(filter(get(data, 'tasks'), 'username'), 'complete'), task =>
    pick(task, ['id', 'dueDate', 'title', 'priority'])
  ),
  'dueDate'
);
```

我稍微做了一点格式的调整, 但是这些整个思路就很明显了, 这不就是函数嵌套吗? 只不过可读性不是那么好 :-(, 我们根本不可能一眼看出来它是对哪个变量进行操作, 最先运行的函数又是哪个

大学数学的离散数学里应该提高一个概念, _函数组合_. _f(g(x)) = f • g_ 所以上面的写法如果可以改为 _sortBy • map • reject • filter • get_ 这种形式的话, 看上去应该会简单很多啦, 那么我们可以做到吗? 尝试下 `compose` 函数.

```js
compose(
  sortBy(__, 'dueDate'),
  map(__, pick(__, ['id', 'dueDate', 'title', 'priority'])),
  reject(__, 'complete'),
  filter(__, 'username'),
  get(__, 'tasks')
)(data);
// 不要运行这段函数
```

其实这样看上去已经好多了不是吗? 至少我们一眼就能看出来, 我们的逻辑顺序了.
至于为什么这么多 `__`, 那是因为它们都是 data 被处理后的结果, 也就是上面提到的中间变量. 所以我们仅仅只需要调整函数参数的顺序, 就可以省去这些占位符.
变成

```js
compose(
  sortBy('dueDate'),
  map(pick(['id', 'dueDate', 'title', 'priority'])),
  reject('complete'),
  filter('username'),
  get('tasks')
)(data);
```

这就是参数需要调整顺序的原因啦.

再解释一下柯里化在这里的重要性. 如果函数没有柯里化的话, 从第一步 `get('tasks')` 开始, 这个函数只会被解释成 `get('tasks', undefined)`, 那么很显然, 后面的过程就没有进行下去的意义咯. 而通过柯里化, 这里返回的是一个函数, 一个需要收集它另外一个参数的函数.

同样的 `filter` 也需要一个数组来填充进来, `reject` 和后面的函数都一样. 因为它们现在都是函数, 所以 compose 不会抱怨, 它将这些函数*组合在了一起*, 变成了一个新的函数.
当我们将 data 传入这个新函数的时候, 先运行 `get('tasks')(data)`, 得到一个新的数组, 这个数组传给 `filter('usename')` 又得到一个新的数组. 就这样反复的执行最后得到我们的结果

顺便一提, 这种 `a(b(c(d(e, f)))))` 的形式其实很像 `reduce` 的操作, 所以再看看 compose 的实现吧

```js
const compose = (...fns) => fns.reduce((...args) => (a, b) => a(b(...args)));
```

在新的 Babel 提案中，有一个 [pipeline](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator) 运算符 `|>`, 利用它可以让代码改成下面的样子而不需要另外的函数。而且相比 compose 的从右往左的顺序，可能从左往右会更加直观

```js
get('tasks')
  |> filter('username')
  |> reject('complete')
  |> map(pick(['id', 'dueDate', 'title', 'priority']))
  |> sortBy('dueDate');
```

### No Optional Arguments

最后再解释一下为什么需要固定参数? lodash 的那些可选参数的函数全部都挂了, 为什么呢?
其实这是因为 `curry` 不支持可选参数的. JS 原生不支持柯里化, 那么我们无非就是使用一个函数来模拟这个过程.
一个简单的 curry 方法可以写成

```js
const curry = (fn, length = fn.length, ...args) =>
  args.length >= length ? fn(...args) : curry.bind(null, fn, length, ...args);
```

注意看实现就可以发现, 我们必须了解到函数的长度, 才能决定是返回函数的运行结果还是一个新的函数.
看完这些再回过头看之前的例子的话, 应该就很容易理解了.

## 更多例子

上面已经举了使用 lodash/fp 配合 setState 更新和删除的例子, 再看看在末尾添加的例子吧.

```js
// 末尾添加
function addPost(post) {
  this.setState(update('posts', concat(post)));
}

// 更新数组特定下标的值, 这个类似于井字棋的游戏中很有用.
function setValue(value, index) {
  this.setState(set(`posts[${index}]`, value));
}
```

## 不足

lodash/fp 其实还有很多不足, 它不过是将 lodash 里的函数改成了 fp 的形式, 所以它相比 lodash 没有任何新函数.
比如, 它不能同时修改一个对象的多个值. 同样的也不能使用多个函数来修改一个对象的多个值.
简单的说就是, `set` 和 `update` 都仅仅只支持修改一个参数.
同时, 针对数组的方法也不是很多, 比如没有类似于 `insert` 的方法. 这让某些时候，fp 变得非常鸡肋

## Ramda

最后, 如果真的尝试使用这种风格的话, lodash/fp 仅仅是入门, 建议还是使用 [Ramda](http://ramdajs.com) 来获得更加纯粹的体验和享受.
关于 Ramda 的使用可以参考这些[博客](http://fr.umio.us)
