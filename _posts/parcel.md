---
title: 'Parcel 📦 和 React ⚛️ 的使用'
date: '2018-01-07'
excerpt: '你也用 parcel?'
---

Parcel 这种工具虽然号称零配置, 但是在 React 相关开关的时候还需要一些必要的配置才能让整个代码真的跑起来. 特别是如果需要 **Hot Reloader** 的时候. 如果使用 [create-react-app](https://github.com/facebookincubator/create-react-app) 确实很方便, 这也是入门和新项目首选. 但是呢, 想上面提到的 `hot reloader` 默认是不支持的, 除非自己先 `yarn eject` **弹射** 出去, 再手动配置 webpack 文件才行! 这个虽然文档上也有详细的记载, 但是感觉就没有那份纯粹性了.
所以使用 parcel 自己手动来配置的话, 更有一种成就感.

Parcel 基本教程在之前的文章 [[Parcel 的使用]] 中有简单的介绍, 下面直接进入使用环节.

---

## Babel 的基本配置

### 一些背景介绍

我们知道, React 和 Babel 是互相离不开的, 首先 `JSX` 需要 Babel 来转译, 比如

```js
<App /> => React.creataElement(App)
```

除了这个, React 对新语法的依赖也蛮大的, 比如 `Object Spread` 语法, 这个在最新的浏览器和 Node 环境已经支持了, 但是还没有完全成为标准, 应该会在今年的 ES9 成为标准, 所以我们还是要依赖 Babel.
还有 React 组件中大量的 `this.setState`, 在 JS 中 `this` 很容易丢失, 所以我们需要依赖箭头函数, 但是在 `render` 大量使用箭头函数又不是一个好习惯, 一是每次 render 都会生成新的函数, 这又导致依赖这个函数作为 `props` 的组件又一次被渲染.
一个妥协的方法是在 `constructor` 中**不厌其烦**的写 `this.foo = this.foo.bind(this)`
先解释一下这样可行的原因, 在 `class` 中, 我们定义一个函数比如

```js
class A {
  foo() {}
}
```

这个 foo 其实是属于 `A.prototype` 的, 如果转译成 ES5 语法, 大概类似于

```js
Object.defineProperty(A, 'foo', {
	value: …,
	writeable: true,
	configurable: true,
	enumerable: false
});
```

所以说, 等号右边的 `this.foo` 其实引用的是原型的 foo, 这个时候再赋值给 `this.foo` 其实是没毛病的, 因为这个时候才是赋给 `this` 自己.

但是, 如果要我们写这个无聊的代码几百次的话, 就再也不想写了. 于是乎有一种新的语法, 英文似乎叫做 `Class Properties`, 支持直接使用 class 语法定义属性, 而不在属于 prototype. 这样就可以写出

```js
class A {
  state = {};
  foo = () => {};
}
```

的语法. 于是我们不仅干掉了, 无聊的 `bind`, 还干掉了整个 `constructor`, 多酷!!!
还有一种语法, `::`, 这里不介绍.

### babelrc

配置 babel 依赖于一个叫做 `.babelrc`文件, 在 VS Code 中, 如果安装了**文件图标主题**的话, 一旦创建, 会有一个特定的 logo 图标来告诉我们, 没有拼错.

![](./pics/F82820D6-9363-4A17-B637-C84FE7E037CE.png)
配置 react 的方式, 其实十分简单. 首先需要转译 JSX, 但是 JSX 的转移又依赖于 es2015, 所以我们两个都需要转译. 我并没有多长 babel 使用经验, 反正现在有了 `presets`, 而且淘汰了 ES2015, ES2016 这些 presets, 统一使用 `env` preset, 所以 babel 的配置变成了下面这样

```json
{
  "presets": ["env", "react"]
}
```

如果有影响的话, 其实还有一个 `babel-preset-react-app`, 它和上面的 react 的区别就是: react-app 是使用在 `create-react-app`中的配置, 相比 react 会有一些加成, 下面会讲到.

OK, 其实有了这两个就能写 react 了. 自己写好必要的组件, 和之前一样使用 parcel 就能启动. 但是, 我们还不能使用刚刚提到的那些新语法. 甚至连 React 大量依赖的 `{...obj}` 也不行. 这个时候就还需要安装新的 preset: `stage-2 stage-3`
于是乎, 为了安装这些, 我们需要运行

```bash
yarn add -D babel-preset-env babel-preset-react babel-preset-stage-2 babel-preset-stage-3
```

那这样就能开心的写 React 代码了吗 🧐 还不行, 我目前也搞不清楚为什么, 写 `async await`话, 还是会报错, 尽管这个主流浏览器已经都支持了. 所以, 我在 Google 了一番后, 发现还需要安装一个 babel plugin.

```bash
yarn add -D babel-plugin-transform-runtime
```

而且这个 runtime 的配置蛮复杂的, 这里不详细介绍了, 大概是这样.

```json
"plugins": [["transform-runtime", {
    "polyfill": false,
    "helpers": false
  }]]
```

注意, 这段代码紧跟 babelrc 中的 presets 之后另起一行.

当完全了这些之后我们就可以没有任何问题的写 React ⚛️ 了 😎😎

---

## 热加载

当我确定我要使用热加载的时候, 是因为我看了 Dan 的视频, 以及他说的一段话

> I want to encourage you to actually spend time working on developer tools because before you can optimize your app, you should optimize your workflow so you have more time to spend working on your app. Because once enough frustration is gone, your programming actually feels fun again just like it used to do when the tools were simple.

最重要的意思就是, 花点时间研究 🔧 能为我们省下更多的时间提高自己. 于是乎, 我就花了一点时间, 嗯, 也不是一点, 三个小时吧. 终于搞明白, 怎么在 parcel 中使用了. 因为和官方文档有点区别, parcel 的文档介绍的又十分简陋, 再加上 parcel 缓存的问题, 所以被坑了很久. 不过终于还是搞定了. 下面总结一下热加载的配置.

[react-hot-loader](https://github.com/gaearon/react-hot-loader) 由 _Dan gaearon_ 开发并开源, 对, 就是 redux 的作者, 是一个特别帅的英国佬. 当然这不是我们讨论的重点, 目前使用的是 V3 版本, V4 在配置上有非常大的提升, 但是因为 parcel 不兼容这个. 所以我们还是使用主流的配置.

文档该说的都说了, 下面只针对在 parcel 上该怎么用来解释.
还是安装它

```bash
yarn add -D react-hot-loader
```

之后在 `babelrc` 中的 plugins 中配置. 最终的版本为:

```json
{
  "presets": ["env", "react", "stage-2", "stage-3"],
  "plugins": [
    [
      "transform-runtime",
      {
        "polyfill": false,
        "helpers": false
      }
    ],
    ["react-hot-loader/babel"]
  ]
}
```

还没完, 接下来只要在 `index.js` 做一些小操作, 就可以开始了.
`index.js` 一般作为入口点, 换句话话, 这里应该是你整个项目配置的地方, 也是 `ReactDOM.render`调用的地方, 同时也是你的 html 文件, 应该引用的 JS 文件.

```js
import App from './App';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('#root')
  );
};

render(App);
module.hot.accept(function() {
  render(App);
});
```

这是代码的必备成分, `App` 就是你所有代码的合成的组件, render 函数无非就是一个小小的包装. 而 `AppContainer` 就是整个热加载的**能量源泉**. 而 `module.hot.accept` 里的回调, 就是整个源泉的能量使用者.
和文档中不一样的是, 文档中 `accept` 接受两个参数, 第二个才是回调. 也是我一直被坑的地方, 可能是因为 parcel 针对这个做了某些小小的优化吧.

这些都写好了, 就可以开始**热加载**之旅了!
那怎么知道自己的热加载是否成功了呢? 之前提到过, 热加载的前提是不用刷新界面, 因为刷新的话就会丢失所有的状态咯. 所以成功的关键就是**状态没有丢失**.

不过这句话不是那么的明显 🙂, 其实比较的明显的检测方法就是:
有一个 input 和任意的 label. 如果我们 input 中填写了某些信息, 再去 label 中修改, input 中的数据没有丢失的话, 就说明热加载成功了. 这真的很重要, 在写表单类似的程序的时候, 我们需要不断的输入然后刷新, 光光这个时间就不知道被浪费了多少.

补充：这个热加载似乎会引入一个 bug

> 无法在 `async` 函数中找到 `this`
> 我不太清楚这是什么原因，在不需要重度依赖 async 的情况下，还是可以接受的。另外，估计 v4 版本已经解决了这个问题吧。感谢开源让生活更美好, 也让我们知道牛逼的程序员到处都是.
