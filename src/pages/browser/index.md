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

## Layout

现在渲染进程知道了 DOM 的结构和每一个节点的样式，但是这些信息还不足以去渲染一个页面。相信你在电话的另一头努力地给你的朋友描述一幅画。“有一个巨大的红色的圆和一个小一点的蓝色的正方形”是不足以让你的朋友想象出这幅画的样子的。

![](../resource/part3/tellgame.png)
Figure 4: A person standing in front of a painting, phone line connected to the other person

Layout 是一个找到元素的几何信息的过程。主线程通过遍历 DOM，计算样式，并创建一个包换了 x y 坐标信息和边框大小的 layout 树。Layout 树可能和 DOM 树很相似，但是它仅仅包含了在能在页面中被看到的信息。比如 `display: none` 一旦被应用到每个元素上，这个元素就不是 layout 树的一部分。相似的，如果一个伪元素 `p::before { content: "Hi!" }`被应用饿了，它虽然不会出现在 DOM 树上，但是属于 layout 树。

![](../resource/part3/layout.png)
Figure 5: 主线程遍历 DOM 树，通过已经计算的样式，得到 layout 树

确定页面的布局是一项由挑战性的任务。即使是最简单的页面布局，如从上到下的 block flow，也必须考虑字体的大小以及在哪里划分它们，因为它们会影响段落的大小和形状，还会影响下一段所需的位置。

<a href='../resource/part3/layout.mp4'>layout.mp4</a>
Figure 6: 因为一个断行的改变，layout 也跟着改变

CSS 还能让元素浮动到一边，隐藏超出边界的部分，并修改写入方向。你可以想象到，layout 阶段其实是非常复杂的任务。在 Chrome 中，有专门一个团队的工程师致力于 layout 的工作。如果你想了解更多有关他们的工作细节，[few talks form BlinkOn Conference](https://www.youtube.com/watch?v=Y5Xa4H2wtVA) 记录了大量的有趣的内容。

## Paint

![](../resource/part3/drawgame.png)
Figure 7: 一个人拿着画笔站在画布前，想着应该先画圆还是先画正方形

有了 DOM，style，layout 还不足于渲染一个页面。假设你正在努力画一幅画，你知道画的大小，形状，每一个元素所在的位置，但是你还是需要判断绘制它们的顺序。
比如，`z-index` 可能会被设置到当前元素上，在这种情况下，如果按 HTML 定义的顺序来绘制就会得到错误的结果。

![](../resource/part3/zindex.png)
Figure 8: 页面的元素按 HTML 元素中定义的元素，导致了错误的结果。因为 z-index 没有被考虑在内

在绘制（Paint）阶段，主线程遍历 layout 树来创建绘制记录（Paint record)。绘制记录是一个绘画过程的注解，如“先背景，接着文本，然后矩形”。如果你使用过 `canvas`，那么这个过程对你来说应该很熟悉。

![](../resource/part3/paint.png)
Figure 9: 主线程遍历 layout 树并生成绘制记录

### Updating rendering pipeline is costly

<a href='../resource/part3/trees.mp4'>trees.mp4</a>
Figure 10: 有序的生成 DOM ，Style，Layout，Paint Trees

想要理解渲染一条龙，最重要的一点是**每一步中，都会使用上一个操作的结果作为新的数据。** 比如修改了 layout 树，那么 paint 树也需要重新生成。
如果你打算为某些元素加动画，浏览器必须在每一帧都重复这些过程。大多数显示器 1 秒刷新 60 次屏幕（60 fps）。当物体在屏幕中移动的时候，出现在每一帧中，人眼就会认为这段动画十分平滑。然后，如果动画在某段时间内丢帧了，页面就会看上去“卡顿”

![](../resource/part3/pagejank1.png)
Figure 11：Animation frames on a timeline

即使你的渲染操作能跟上屏幕的刷新，但是因为这些计算是发生在主线程上，这意味着当有其他的 JS 代码运行的时候，动画就会“掉帧”

![](../resource/part3/pagejank2.png)
Figure 12: 在动画帧的时间线上，有一帧被 JS 堵塞了

你可以使用 `requestAnimationFrame` 将 JS 操作拆分成一小片，它们会分散在每一帧中运行。关于这个话题更深入的部分，请看 [Optimize JavaScript Execution](https://developers.google.cn/web/fundamentals/performance/rendering/optimize-javascript-execution)

![](../resource/part3/raf.png)
Figure 13：在动画帧的时间线上，更小的 JS 块
