webpackJsonp([0x8d02644b8bf0],{495:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Yangkui's Blog",author:"Yang Kui"}},markdownRemark:{id:"/Users/yk/Documents/blog/src/pages/react-component-and-element/index.md absPath of file >>> MarkdownRemark",html:'<p>本文的出现离不开 Dan 的一篇卓越的 blog。\n<a href="https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html">原文章</a></p>\n<p>一句话概括就是，<code>Element</code> 是 <code>Component</code> 的子集，<code>Element</code> 是 <code>Component</code> 的返回值\nElement 其实就是一个纯对象，找个对象定义了一些对于 React 来说很重要的属性，比如 <code>type，children，props，key，type</code> 这些的。比如</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token punctuation">{</span>\n\t$$<span class="token keyword">typeof</span><span class="token punctuation">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span>react<span class="token punctuation">.</span>element<span class="token punctuation">)</span><span class="token punctuation">,</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">\'button\'</span><span class="token punctuation">,</span>\n\tkey<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n\tref<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n\tprops<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\tclassName<span class="token punctuation">:</span> <span class="token string">\'button button-blue\'</span><span class="token punctuation">,</span>\n\t\tchildren<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\ttype<span class="token punctuation">:</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span>\n\t\tprops<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        children<span class="token punctuation">:</span> <span class="token string">\'OK!\'</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>上面的 type 就是这个 Element 的核心之一。React 通过判断 type 是字符串还是函数来决定如何 <code>mount</code> 这个 Element。如果是字符串就说明是普通 DOM，称为 <code>DOM Element</code>，如果是 <code>function</code> 就是自己定义的，称为为 <code>Component Element</code>。所以换句话说，用户自己写出来的组件的才算的上是一个 <code>Component</code>。</p>\n<p>创建组件的常用方法有两种，一种是纯函数组件，或者说 <code>stateless Component</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> <span class="token function-variable function">Button</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> color<span class="token punctuation">,</span> text <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>button style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> background<span class="token punctuation">:</span> color <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span>text<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>通过这种方式创建, 它的返回值就是定义 Element 的过程了，使用 <code>Button(props)</code> 就能得到我们定义的 Element。不过这仅仅是因为 JSX 给了我们一种语法糖，如果没有 JSX 的话，应该类似于</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'button\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> style<span class="token punctuation">:</span> <span class="token punctuation">{</span> background<span class="token punctuation">:</span> color <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>而这个函数的作用也仅仅只是生成一个<strong>对象而已</strong>，就像最上面那个对象一样：</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token punctuation">{</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">\'button\'</span><span class="token punctuation">,</span>\n\tprops<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\tstyle<span class="token punctuation">:</span> <span class="token punctuation">{</span>background<span class="token punctuation">:</span> color<span class="token punctuation">}</span><span class="token punctuation">,</span>\n\t\tchildren<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\t\t…\n\t\t<span class="token punctuation">}</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>这就是 Element 的真面目了。所以可以看到，JSX 也好，<code>createElement</code> 也好，不过是提供一种抽象帮我们不要写这个无聊的对象定义，要知道，如果再多几个 children 的话，整个对象定义应该就有几十行！</p>\n<p>同样的，如果换成 <code>Stateful Component</code> 的话，其实模式差不多，只不过，它们需要一个 <code>render</code> 方法，并且拥有一个被称为 <code>instance</code> 的变量。render 的目的其实也就是定义一个 Element，而 instance 就是 <code>this</code> 了。</p>\n<p>所以，一个 Element 出现的步骤此时是，</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">type</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token comment">// type 就是该组件的 type</span>\n<span class="token keyword">const</span> Element <span class="token operator">=</span> instance<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// render 不就是 React.Component.prototype 的方法吗</span>\n</code></pre>\n      </div>\n<p>综上所述，我们最常写的是 Component，Component 分为三种：</p>\n<ol>\n<li>host（常见 DOM 节点）</li>\n<li>function</li>\n<li>class</li>\n</ol>\n<p>host 类型，React 会根据对应 type，生成真正的 DOM node，并将它所带的 props 写入 node 的 <code>attribute</code> 中，而对 <code>children</code> 继续递归，直到碰到没有 children 的 host Element 为止。</p>\n<p>Function 的返回值是 Element, class 的 render 函数的返回值是 Element</p>\n<h2>一个常见问题</h2>\n<p>假设有下面的两个变量</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> E <span class="token operator">=</span> <span class="token operator">&lt;</span>p<span class="token operator">></span>Wow<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>\n<span class="token keyword">const</span> <span class="token function-variable function">C</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> E\n</code></pre>\n      </div>\n<p>这两个的区别是什么呢？刚开始很容易写出这样的代码</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> <span class="token punctuation">(</span>\n\t  <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token operator">&lt;</span>E<span class="token operator">/</span><span class="token operator">></span><span class="token operator">&lt;</span>div<span class="token operator">></span>\n\t<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>但是如果真这样写的话，铁定是会报错的。\n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-6a7ea.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 11.829268292682926%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAYAAABYBvyLAAAACXBIWXMAAAsSAAALEgHS3X78AAAAWklEQVQI122OSw6AMAhEe/97KqVft0LiOLRxJwnhN29CslxgZ4Ypq1Z4HzDhnJV7gbe++9iVxqRmzD0HJwqfFx53RCSrbR9puOCAaHwfsuoHhXmYxQNLR+YvXjnGmSzduH1XAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="96FFC213 7B8B 46A4 817B 2F13D2342247"\n        title=""\n        src="/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-fb8a0.png"\n        srcset="/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-1a291.png 148w,\n/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-2bc4a.png 295w,\n/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-fb8a0.png 590w,\n/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-526de.png 885w,\n/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-fa2eb.png 1180w,\n/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-6a7ea.png 1640w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \n于是我又发现可以这样写</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> <span class="token punctuation">(</span>\n\t  <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token punctuation">{</span>E<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n\t<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>那么为什么上面一种可以下面不可呢？</p>\n<p>首先，分析一下上面报错的原因，根据上面说的，我们知道，<code>&#x3C;E/></code> 就是一个语法糖，也就是 <code>React.createElement(type, props, children)</code></p>\n<p>其中 type 就是 E。那么，根据我们的定义 E 也是一个 <code>React.createElement(\'p\', {}, \'123\')</code> 这样的表达式，其实就是一个对象。那么，显然这个时候 <code>&#x3C;E/></code> 得到的值，其实是一个对象！！ 而 React 内部是通过 type 属于 string 来确定这是 host Element，type 属于 function/class 来判断这是一个组件。所以，这样就报错了。</p>\n<p>而，<code>{E}</code> 为什么可以呢？还记得我们最常在 <code>{}</code> 中写什么吗？</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>names<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>name <span class="token operator">=></span> <span class="token operator">&lt;</span>li key<span class="token operator">=</span><span class="token punctuation">{</span>name<span class="token punctuation">.</span>id<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>而上面这个是一个 <code>Array of Element</code>，再加上 render 的目的不就是定义一个 Element 吗？</p>\n<p>显然这样是可以的。所以，总结过来可以发现一个规律，</p>\n<blockquote>\n<p><code>&#x3C;A /></code> 整个表达式是一个 Element，而 A 是一个 Component， Component 要么是 function（class 也是 function），要么是纯 DOM</p>\n</blockquote>',frontmatter:{title:"Element 和 Component 的区别",date:"2018/01/14"}}},pathContext:{slug:"/react-component-and-element/"}}}});
//# sourceMappingURL=path---react-component-and-element-dbb877bdc0a71670c433.js.map