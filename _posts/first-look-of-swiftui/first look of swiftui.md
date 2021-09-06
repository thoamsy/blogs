---
title: 对于 SwiftUI 的一些认识
date: 2019-07-07
spoiler: 在写了一些 SwiftUI 代码后的初级看法
---

一个月前，WWDC19 上推出的 SwiftUI，震惊了我和一众 iOS 开发者。这种类似 jQuery 向 React 推进的革命，也终于在 iOS 开发中挂起浪潮。据说这个项目开发了三年，和它配套的 Data Flow 框架 Combine 可能开发了更多时间。

个人认为 SwiftUI 带来的改变有以下几点

1. 声明式编程。对比 React 就知道，SwiftUI 也是类型的方式。有 `@State`，有类似 `redux` 的全局变量，也能实现 `HOC`。声明式编程给我们带来的思考方式的转变，让我在 UI 上更加关注全局而不是细节。如果是 `setState` 带来的 props 修改是 React re-render 的推进器，那么 SwiftUI 中 @State 或者其他遵循了 [Dynamic View Property](https://developer.apple.com/documentation/swiftui/dynamicviewproperty) 属性，都具有一旦更新，就运行协议中的 `update` 函数来更新 body 的能力
2. 数据流的管理。社区中都提到 Combine 是一个和 RxSwift 非常类似的数据流管理工具。但是相比 RxSwift，官方制造肯定会更符合语言的使用习惯，并且在性能上有会有更多底层的优化（事实确实如此）。最重要的是，之前那些没学 RxSwift 的人，现在也不需要要学了，因为 Combine 让它成为了 iOS 开发者的标配
3. 全平台统一。相比之前不同的 os，一个不同的命名前缀。UI，NS，WK 啥的，会让代码很分裂。而现在，SwiftUI 已经将 4 个平台的差异都在尽量抹平了。比如 Image 而不是 UIImage or NSImage。虽然说难免会有继续和一些 os 专属 SDK 交互的情况，但是它也让我们的消耗降到了最小。

不过关于 body 的渲染的机制到底是和 React 那样，自顶向下开始渲染，还是和 Vue 那样，动态地检查呢？如果是 React 这样，又没有类似 `shouldComponentUpdate` 这种机制的话，这样就会导致 x 组件更新后，影响到 sibling 组件更新。目前根据 iOS 13 的 beta 来看确实会有这种问题：比如我在 App Store 的时候，有一个编辑推荐的轮播图。我在切换轮播图的时候，底下的热门 App 图片会出现闪烁的效果。如果网络不好的话，之前加载好的 app icon 又会出现短暂的白屏。
**PS：这里应该是 iOS 有了新的 diff 算法，具体 WWDC 的实例我还没看。**

目前根据我了解到的资讯和一些国外开发者的声音来看，对 SwiftUI 的赞誉是非常高的。 我最近写的一个小 [Demo](https://github.com/thoamsy/wechat-robot) 也跟着 Xcode Beta 1 一路走来。具体 iOS 的开发现状我不是很了解，但是相比 JSX 来说其实体验并没有那么好。因为写错了类型带来各种奇怪的报错，以及 API 废弃后也没有任何文档该介绍应该怎么用新的 API。体验其实不太好。

虽然我对 SwiftUI 未来很是期待，但是目前来看，一个团队想在今年马上跟进 SwiftUI 的话，还是够呛的。很多地方官方也没想好 API 实现，一些基本的组件还是没有提供，需要去和 UIKit 合作。
