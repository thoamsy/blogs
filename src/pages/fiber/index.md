---
title: 走进 Fiber
date: 2018-08-08
---

# Fiber

Fiber 的结构

```js
// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
export type Fiber = {|
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.

  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.

  // Tag identifying the type of fiber.
  tag: TypeOfWork,

  // Unique identifier of this child.
  key: null | string,

  // The function/class/module associated with this fiber.
  type: any,

  // The local state associated with this fiber.
  stateNode: any,

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null,

  // Singly Linked List Tree Structure.
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref: null | (((handle: mixed) => void) & { _stringRef: ?string }) | RefObject,

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  memoizedProps: any, // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: UpdateQueue<any> | null,

  // The state used to create the output
  memoizedState: any,

  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the AsyncMode flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the mode of its
  // parent. Additional flags can be set at creation time, but after that the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  mode: TypeOfMode,

  // Effect
  effectTag: TypeOfSideEffect,

  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null,

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // Represents a time in the future by which this work should be completed.
  // This is also used to quickly determine if a subtree has no pending changes.
  expirationTime: ExpirationTime,

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate: Fiber | null,

  // Time spent rendering this Fiber and its descendants for the current update.
  // This tells us how well the tree makes use of sCU for memoization.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualDuration?: number,

  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number,

  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number,

  // Sum of base times for all descedents of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number,

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | null,
  _debugIsCurrentlyTiming?: boolean,
|};
```

## TypeOfWork

```js
export const IndeterminateComponent = 0; // Before we know whether it is functional or class
export const FunctionalComponent = 1;
export const ClassComponent = 2;
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const CallComponent_UNUSED = 7;
export const CallHandlerPhase_UNUSED = 8;
export const ReturnComponent_UNUSED = 9;
export const Fragment = 10;
export const Mode = 11; // 严格模式 ，异步模式 or Profile 模式
export const ContextConsumer = 12;
export const ContextProvider = 13;
export const ForwardRef = 14;
export const Profiler = 15;
export const PlaceholderComponent = 16;
```

它在 Fiber 结构中，用来定义 `tag` ，根据它们的名字，比如我们常见的 `FunctionalComponent` 和 `ClassComponent`，还有即将支持的 `Profiler, PlaceholderComponent` 可见，它可以翻译为作用类型。如何根据一个给定的 Element，创建出具有正确 `TypeOfWork` 的 Fiber Instance 呢？这里就要和 `ReactType` 扯上关系了。

## React Types

这里的 types 和文档中揭露的不一样，这里披露了 React 内部用到的各种 types。

先介绍几个熟悉的

1.  ReactText
2.  ReactEmpty
3.  ReactProvider
4.  ReactConsumer

`ReactText` 是 React 中可以作为普通文本输出的类型，它们是 `string 和 number`。而 `ReactEmpty`表示在 React 中不会被 render 的类型，对应了 `boolean, undefined, null`.
而 `ReactProvider ReactConsumer` 作为 React 的新 API，在类型上和普通的 `ReactElement` 很相似。

先看看 `ReactElement` 的基本结构

```js
export type ReactElement = {
  $$typeof: any,
  type: any,
  key: any,
  ref: any,
  props: any,
  _owner: any, // ReactInstance or ReactFiber

  // __DEV__
  _store: {
    validated: boolean,
  },
  _self: React$Element<any>,
  _shadowChildren: any,
  _source: Source,
};
```

对应着 ReactProvider

```js
export type ReactProvider<T> = {
  $$typeof: Symbol | number,
  type: ReactProviderType<T>,
  key: null | string,
  ref: null,
  props: {
    value: T,
    children?: ReactNodeList,
  },
};
```

先忽略 Element 中那些带了 \_ 的属性，因为这些是 Element 的逻辑独有。可以看到 Provider 拥有更为具体的 props 定义（确实是这样的），另外 type 是一个另外定义的类型。相比 Element 支持的：`function, string`, 这里看上去就有点特别：**一个对象**。再看看 `ReactProviderType` 的定义

```js
export type ReactProviderType<T> = {
  $$typeof: Symbol | number,
  _context: ReactContext<T>,
};
```

其实根据这些我们就能判断出 React 是如何根据一个 Element 构造出一个 Fiber Instance. 首先每一个 Element 都拥有一个 `$$type` 字段，它们的值永远为 `Symbol.for(react.element)`。除此之外，还有一个 `type` 字段这个字段对应的就是 ReactType。它有几种可能的类型 `string, function, symbol` 分别会对应了这种基本类型。包括了:
`FunctionalComponent, ClassComponent, HostComponent, HostText, Portal, Fragment, StrictMode, Profiler, Provider, Consumer, AsyncMode, ForwardRef, Placeholder`
前 4 个并不能直接被使用，它们其实就是我们在 React 中用到的**组件**的四大类，可以被 `React.createElement` 或者 JSX 语法糖解析的时候，会作为 Fiber 的 tag 字段。接着可以发现，除了 `Portal` 是属于 ReactDom 之外，其他都是在 React 下的元素。它们可以直接通过 JSX 的语法使用，类似于 `<Fragment />` 这些。我们参照 Component 的例子，它们能被创建是因为 React 可以根据 type 的类型和一些判断，来决定被 create 的 Element 到底对应着 fiber 的哪种 type。那么 Fragment，StrictMode 还有其他的呢？

仔细看一下 `React.js` （不是 ReactDOM.js) 的源码，可以发现，它们仅仅只是一个 Symbol 而已。接着这在使用 `<Fragment />` 这种类似的语法的时候，它们也会和上面一样，作为一个 Element 被创建出来。唯一的区别是，上面介绍的组件的 type 要么是 string，要么是 function。而 Fragment 的 type 是作为唯一的 Symbol 的存在。这样就可以

## Mode

```js
export const NoContext = 0b000;
export const AsyncMode = 0b001;
export const StrictMode = 0b010;
export const ProfileMode = 0b100;
```

## SideEffect

```js
// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*              */ 0b00000000000;
export const PerformedWork = /*         */ 0b00000000001;

// You can change the rest (and add more).
export const Placement = /*             */ 0b00000000010;
export const Update = /*                */ 0b00000000100;
export const PlacementAndUpdate = /*    */ 0b00000000110;
export const Deletion = /*              */ 0b00000001000;
export const ContentReset = /*          */ 0b00000010000;
export const Callback = /*              */ 0b00000100000;
export const DidCapture = /*            */ 0b00001000000;
export const Ref = /*                   */ 0b00010000000;
export const Snapshot = /*              */ 0b00100000000;

// Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*   */ 0b00110100100;

// Union of all host effects
export const HostEffectMask = /*        */ 0b00111111111;

export const Incomplete = /*            */ 0b01000000000;
export const ShouldCapture = /*         */ 0b10000000000;
```
