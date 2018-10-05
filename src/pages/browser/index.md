---
title: Inside look at modern web browser
date: 2018-10-05
---

## Inner workings of a Renderer Process

之前，我们提到了 Chrome 的多进程构架和 URL 导航的实现。在这片文章中，我们要一起去看看渲染进程到底做了什么

渲染过程（Render Progress）和 Web 的性能息息相关。也因为在渲染过程中会发生很多事情，本文仅仅介绍它的冰山一角。如果你想深入的了解，[Why Performance Matters](https://developers.google.cn/web/fundamentals/performance/why-performance-matters/) 有更多的资源。

## 渲染过程处理 Web 内容

渲染过程负责在 Tab 中发生的一切事情。在一次渲染过程中，主线程会处理绝大部分你为用户准备的代码。如果还包含了 Web Worker 或者 Service Worker（PWA） 的代码，这部分会由 Worker 线程来处理。**Compositor（合成）** 和 **Raster（栅格）**也属于渲染进程的一部分，使页面渲染的更为高效和平滑。

渲染进程的核心任务是将 HTML，CSS，JavaScript 转化成用户可以与之交互的 Web 网页。

![](../resource/part3/renderer.png)
Figure 1: 渲染进程包括了一个主线程，Worker 线程，一个 Compositor 线程 和一个 Raster 线程。

## Parsing

### DOM 的创建过程

当渲染进程接收到来自 Navigation（详情看 Part2）的提交信息并开始接受 HTML 数据的时候，主线程开始将 HTML 中的字符串转化成 **D**ocument **O**bject **M**odel（**DOM**）

DOM 即是浏览器内部呈现网页的方式，同时也是一种开发者可以通过 JavaScript 与之交互的数据结构和 API。
[HTML Standard](https://html.spec.whatwg.org/) 定义了将 HTML 转化成 DOM 的过程。你应该注意到过，浏览器从来不会在解析 HTML 的时候抛出一个错误。比如，少了 `</p>` 的标签是一个合法的 HTML。像 `Hi! <b>I'm <i>Chrome</b>!</i>` （b 标签在 i 之前就闭合了）这种错误的标记，会被浏览器看成 `Hi!<b>I'm <i>Chrome</i></b><i>!</i>` 来理解。这是因为 HTML 的标准就是特意设计成能够将错误优雅的处理掉。如果你好奇这内部的细节，可以阅读 HTML 标准中的 [An introduction to error handling and strange cases in the parser](https://html.spec.whatwg.org/multipage/parsing.html#an-introduction-to-error-handling-and-strange-cases-in-the-parser) 这一节。

### 子资源加载

一个网页通常还会有图片，CSS 和 JS 等这些外部资源。这些文件需要从网络或者缓存中被加载。主线会在解析 HTML 文件并构建 DOM 的过程中，一个一个的处理它们。但是为了提速，“（预加载扫描器）preload scanner” 会并行运行。如果存在 `<img> 和 <link>` 在 HTML 中，预加载扫描器会默默地查看这些标记，并在浏览进程中向 network 线程发送请求。

![](../resource/part3/dom.png)
Figure 2: 主线程解析 HTML 文档并构建 DOM 树

### JavaScript 会堵塞解析

当 HTML 解析器找到一个 `script` 标签的时候，它会暂停解析 HTML 文档，并开始下载，解析并执行 JS 代码。为什么？因为 JS 可以使用像 `document.write()` 这种改变了整个 DOM 结构的方法来改变文档的形状（shape of the document)。这就是为什么 HTML 解析器在它可以继续解析 HTML 文档之前，必须等待 Javascript 运行结束。如果你对 JS 的执行细节好奇的话，[V8 团队有一篇关于它的博客介绍](https://mathiasbynens.be/notes/shapes-ics)

## 暗示浏览器哪些资源是可以加载的

Web 开发者有很多种方式可以按时浏览器如何恰当地加载资源。如果你的 JS 不使用 `document.write()`，你可以给 `script` 标签添加 `async` 或者 `defer` attribute。这样浏览器就异步的加载和运行 JS 代码，而不会堵塞解析过程。你同时也可以在恰当的时候使用 [JavaScript module](https://developers.google.cn/web/fundamentals/primers/modules)。`<link ref="preload">` 也是一种通知浏览器，当前资源可以尽快下载的方式。可以通过阅读 [Resource Prioritization – Getting the Browser to Help You](https://developers.google.cn/web/fundamentals/performance/resource-prioritization) 了解更多。

## Style calculation

因为 CSS 的存在，仅仅有一个 DOM 是不足以让浏览器了解整个网页会是怎么样的。主线程会解析 CS，并为每一个 DOM 节点计算出最终样式。这些信息会基于 CSS 选择器来呈现每一个元素被应用了哪些样式。你可以在通过开发者工具的 `computed` 来看到这些信息。

![](../resource/part3/computedstyle.png)
Figure 3: 主线程解析 CSS 得到计算过的样式

即使你不提供任何 CSS，每一个 DOM 节点还是会有一个被计算过的样式。`<h1>` 标签看上去会比 `<h2>` 更大，并且每一个元素的 margin 也是不一样的。这是因为浏览器维护了一个默认样式表。如果你想了解 Chrome 的默认样式，可以阅读[源码](https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/css/html.css)
