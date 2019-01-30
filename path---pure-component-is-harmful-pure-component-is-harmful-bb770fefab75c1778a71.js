webpackJsonp([0xc875b74b46c1],{415:function(a,n){a.exports={data:{site:{siteMetadata:{title:"Yangkui's Blog",author:"Yang Kui"}},markdownRemark:{id:"/Users/yk/Documents/blog/src/pages/PureComponent is harmful/PureComponent is harmful.md absPath of file >>> MarkdownRemark",html:'<p>这篇文章有点标题党, 其实主要要强调的是 <strong>到处使用 PureComponent 是不对的</strong>.</p>\n<h2>和 Component 的区别</h2>\n<p>其实, <code class="language-text">PureComponent &amp; Component</code> 的区别不大, <code class="language-text">PureComponent</code> 自己实现了 <code class="language-text">shouldComponentUpdate</code> 方法, 大概的实现类似于</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">shouldComponentUpdate</span><span class="token punctuation">(</span>nextProps<span class="token punctuation">,</span> nextState<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> <span class="token operator">!</span><span class="token function">shadowEquals</span><span class="token punctuation">(</span>nextProps<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">shadowEquals</span><span class="token punctuation">(</span>nextState<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>现在有一个能组件, 能在不需要更新的时候, 自动帮我们做出这个判断, 不是很好嘛?\n先想象一个很常见的场景. 比如下面的界面</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-761c9.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 48.74696847210995%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAABwklEQVQoz32STWsTURSG5wcJUopSsGvdKQjiwh+gQqxmIwguBEEoUjcKLhUUaiuIgkhiqmnSRa39CGRRpI4m00zVmDaZpjPJfD/eO5NJpoX6wjPn3Llz3nvPvaPU63VUVcU0TdrtDp7r4PR72H2L3VYTy+zSNTr0LZNY4RHEMwwxDCNCIfWZlOWBZrg0DIffVsgfCxGJ8l+mHMfIcbMXRmaESTUo8kWCtG3ZsKLts1bf43snoHYgFjBHqPsjvnUgGHglHkcM4wlPpBI3AKPnU/3ZYmVTR2tZOD6CEFvgDzaR9hi2nEwkeeAHUTa/pDN54x3npl5w6cEyrhccOqRUt3HLQ7twFKNdDgxfLu5w5vosFzOPOX//C7brp1pM16TOUMoXh+H6kiCiPyh89rHGycwCk7dLnL1bxrK94YKeP4qJj5Ksdpx2uy7Fyg7FdY0Ntc3/NLwUqfzWHtMljUdLDWbK20wL3lf/kv+qM/d5i+cfqrxd1ilUmuRWdWaLNebKDV6VtnktatoHzuGW7+R+MP5kDSW7EHOzwIWnFXEZ84xl8pzOLnLiWp4rD1e5fC/H2NU3nLpVZHyqwET2E5viV5P6B2gB3foVNxhCAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="88C8D2C2 A934 41FF BAAE 830CB990718A"\n        title=""\n        src="/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-42603.png"\n        srcset="/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-f931c.png 200w,\n/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-e8031.png 400w,\n/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-42603.png 800w,\n/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-5b8b9.png 1200w,\n/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-c7ea5.png 1600w,\n/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-bc63a.png 2400w,\n/blogs/static/88C8D2C2-A934-41FF-BAAE-830CB990718A-ea81edfa33b834ffe435293adf8025ba-761c9.png 2474w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>假设上面的搜索框和下面的内容是<strong>同胞组件</strong>, 理想情况下, 每一次修改输入框的值都会调用 <code class="language-text">setState</code>, 也就会导致整个页面重新渲染. 对于下面庞大的组件来说, 显然是很浪费的.\n如果让下面的组件继承 PureComponent 的话, 很大程度的解决了这个问题.</p>\n<h2>shadowEquals 不是免费的</h2>\n<p>这仅仅只是 PureComponent 美好的一面，我们在享受这种美好的时候，很容易被忽略的它的副作用：<strong>每一次 setState 所有的组件都会进行一次 shadowEquals。</strong>\n换句话说，在期望它更新的时候，这些计算都是不可避免的。我做了一个 <a href="https://codesandbox.io/s/v6y1m1yjk7">demo</a>，仅仅一个组件，它的 props 是一个有 3000 个字段的对象, 并且保证真正需要更新的 prop 会在最后才被比较到，将 shadowEquals 的优化完全抵销。</p>\n<p>可以看到，通过 <code class="language-text">componentDidUpdate</code> 每次更新花在 shadowEquals 的时间, 在我的 16 年 13 寸 MacBook Pro 上平均每次需要花费 1.5ms. 当我尝试降低速度四倍的时候, 你猜怎么着? 平均花费的时间达到了 7ms. 可能你会觉得 7ms 似乎也不是多恐怖, 而且我这里是故意捏造了一个 3000 字段的对象.\n不过, 在现实情况中, 大量的组件在一次 <em>reconciliation</em> 后, 发生 re-render, 它们的 props 和 state 的字段长度之和应该有 3000 的数量级.</p>\n<p>再考虑下动画, 要达到 60FPS. 至少要求每一帧能在 17ms 之内运行完毕, 那么仅仅一个 <code class="language-text">showComponentUpdate</code> 方法就会占据 7ms 的时间, 剩下的解析代码, 生成 V-DOM, DOM 的一系列更新操作要在 10ms 之内完成的话, 实在太难. 所以很容易出现动画掉帧的情况.</p>\n<p>这里还有几个佐证: Reactjs 团队的成员建议不要大量使用 PureComponent 的警告 ⚠️.\n这个 <a href="https://news.ycombinator.com/item?id=14418576">hacknew</a> 的帖子的作者, 发表了大致的观点:</p>\n<blockquote>\n<p>不要到处使用 PureComponent, 如果我们建议这种行为的话, 为什么不让这是默认选项呢?\n那么 15.3 推出 PureComponent 的原因到底是什么呢?</p>\n</blockquote>\n<p><a href="https://twitter.com/dan_abramov">Dan Abramov</a> 在 Github 中解释了这个原因</p>\n<blockquote>\n<p>We added a base class because we wanted an official way of marking component as compatible with shadow equality checks, with using mixins.</p>\n</blockquote>\n<p>下面是这段话的完整截图. 这段话具体出自哪个 issue 我并不清楚, 这个截图其实是由 Dan 在 Twitter 中发出来的. 这个<a href="https://twitter.com/dan_abramov/status/759383530120110080">推</a>发布于 2016 年 6 月底</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/blogs/static/ConfSkDXEAAleG5.jpg-large-faad0289183eae0293db5dd94a588c91-23a2a.jpeg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 750px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 177.86666666666667%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAkABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECAwX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAB9reRpRzUbBAlC//EABoQAAIDAQEAAAAAAAAAAAAAAAERABAxICH/2gAIAQEAAQUCG+RCHXRtRc//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/AV//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/AV//xAAZEAABBQAAAAAAAAAAAAAAAAARARAwMWH/2gAIAQEABj8CUjGqX//EAB0QAAIBBAMAAAAAAAAAAAAAAAABERAhYXExQVH/2gAIAQEAAT8hlaIp7UYw3g0QnKISWyLgbNm4rIjZFP/aAAwDAQACAAMAAAAQgAsA/A//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/EF//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/EF//xAAdEAEAAgIDAQEAAAAAAAAAAAABABEhMUFRcZGB/9oACAEBAAE/EEQG0Rklc9ZhsKU7zuLNqLzUAWD6ymN3kQFr8mTd3BPCOriEIUVFLgHmW6QUEbt39Svb9gVP/9k=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="ConfSkDXEAAleG5 jpg large"\n        title=""\n        src="/blogs/static/ConfSkDXEAAleG5.jpg-large-faad0289183eae0293db5dd94a588c91-23a2a.jpeg"\n        srcset="/blogs/static/ConfSkDXEAAleG5.jpg-large-faad0289183eae0293db5dd94a588c91-8b5d6.jpeg 200w,\n/blogs/static/ConfSkDXEAAleG5.jpg-large-faad0289183eae0293db5dd94a588c91-d6357.jpeg 400w,\n/blogs/static/ConfSkDXEAAleG5.jpg-large-faad0289183eae0293db5dd94a588c91-23a2a.jpeg 750w"\n        sizes="(max-width: 750px) 100vw, 750px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>接着在 2017 年 1 月, Dan 又发了<a href="https://twitter.com/dan_abramov/status/820668074223353858">一条</a> 来强调这个观点. 所以, 可以确定的是, <strong>任何地方都是用 PureComponent 被认为是有害的.</strong></p>\n<h2>降低可读性</h2>\n<p>接下来, 还有一个问题. 比如平时有一个组件 <code class="language-text">Button</code>, 我们想给它加一个 <code class="language-text">style</code> prop, 如果仅仅只是加一个 <code class="language-text">margin</code> 的话, 我们可能会这样写</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> marginTop<span class="token punctuation">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>This is a Component<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>这没有问题, 对于一个小小的需求, 这里用这种写法其实在性能上问题不大, 虽然 style 在每次 render 的时候都是一个新的对象, 但是其实没我们想象的那么糟糕. 因为在普通的 Component, 如果没有特殊处理 <code class="language-text">shouldComponentUpdate</code> 的话, 这个组件肯定是会重新被 render, 生成一个 VDOM 的, 在 VDOM 转化为 DOM 的过程中, 因为 style 的内容没有变化, 所以最后不会更新 DOM, 这个操作的损耗并不大.\n但是如果 Button 是 PureComponent 的话, 那么这样写的话每次都会带来一次无用的 <code class="language-text">shadowEquals</code>. 所以要写成</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> style <span class="token operator">=</span> <span class="token punctuation">{</span> marginTop<span class="token punctuation">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>style<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>This is a PureComponent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>这样的话, 确实会有一些好处. 因为 style 作为 props 没有变化, <code class="language-text">shouldComponentUpdate</code> 会返回 false, 连 render 都不会发生, 在性能上<strong>可能</strong>会有点提升. 可是每一次这种小小的变化, 都需要想一个名字, 作为一个常量真的不痛苦吗?</p>\n<p>这个例子可能还不够突出, 思考一下现在正火的 <code class="language-text">render props</code>, 本来一个普通的 Component, 可以写成</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token operator">&lt;</span>Link\n\trender<span class="token operator">=</span><span class="token punctuation">{</span>props <span class="token operator">=></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AnotherComponent</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n<span class="token operator">/</span><span class="token operator">></span></code></pre>\n      </div>\n<p>但是如果 Link 是 PureComponent 的话, 要改成</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> props <span class="token operator">=></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AnotherComponent</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n<span class="token operator">...</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Link</span> <span class="token attr-name">render</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>render<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p>如果是这样真的更好吗? 我们为什么要把一个 render 放在离 Link 那么远的地方? 这对于理解代码显然是不够的, 这让一个本来应该直观的 render 变得不那么直观.\n在 React 文档的 <a href="https://reactjs.org/docs/render-props.html#caveats">render props</a> 一章有对应的介绍.</p>\n<h2>结论</h2>\n<p>所以该在什么时候使用 PureComponent 呢? 一个通用的建议是: 在一个 List 有关或者 Form 相关的组件外部包一个 PureComponent, 这样可以起到不错的效果. 如果使用了 <code class="language-text">recompose</code> 的话, 可以很容易完成这个任务 <code class="language-text">pure(&lt;MyListComponent /&gt;)</code></p>',frontmatter:{title:"PureComponent Considered Harmful",date:"2018/05/21"}}},pathContext:{slug:"/PureComponent is harmful/PureComponent is harmful/"}}}});
//# sourceMappingURL=path---pure-component-is-harmful-pure-component-is-harmful-bb770fefab75c1778a71.js.map