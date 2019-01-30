webpackJsonp([0x8d02644b8bf0],{416:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Yangkui's Blog",author:"Yang Kui"}},markdownRemark:{id:"/Users/yk/Documents/blog/src/pages/react-component-and-element/index.md absPath of file >>> MarkdownRemark",html:'<p>本文的出现离不开 Dan 的一篇卓越的 blog。\n<a href="https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html">原文章</a></p>\n<p>一句话概括就是，<code class="language-text">Element</code> 是 <code class="language-text">Component</code> 的返回值.\nElement 其实就是一个纯对象，这个对象定义了一些对于 React 来说很重要的属性.\n比如 <code class="language-text">type，children，props，key，type</code> 这些的。举个实际的例子</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">{</span>\n\t$$<span class="token keyword">typeof</span><span class="token punctuation">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span>react<span class="token punctuation">.</span>element<span class="token punctuation">)</span><span class="token punctuation">,</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">\'button\'</span><span class="token punctuation">,</span>\n\tkey<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n\tref<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n\tprops<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\tclassName<span class="token punctuation">:</span> <span class="token string">\'button button-blue\'</span><span class="token punctuation">,</span>\n\t\tchildren<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\ttype<span class="token punctuation">:</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span>\n\t\tprops<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        children<span class="token punctuation">:</span> <span class="token string">\'OK!\'</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>上面的 type 就是这个 Element 的核心之一。React 通过判断 type 是字符串还是函数来决定如何构造并 <code class="language-text">mount</code> 这个 Element。如果是字符串就说明是普通 DOM，称为 <code class="language-text">DOM Component</code>，如果是 <code class="language-text">function</code> 就是自己定义的，称为 <code class="language-text">CompositeComponent</code>。</p>\n<p>创建组件的常用方法有两种，一种是纯函数组件，或者说 <code class="language-text">stateless Component</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token function-variable function">Button</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> color<span class="token punctuation">,</span> text <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> background<span class="token punctuation">:</span> color <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>text<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>通过这种方式创建, 它的返回值就是定义了一个 Element。直接使用 <code class="language-text">&lt;Button {...props} /&gt;</code> 就能得到我们定义的 Element。不过这仅仅是因为 JSX 给了我们一种语法糖，如果没有 JSX 的话，应该类似于</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'button\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> style<span class="token punctuation">:</span> <span class="token punctuation">{</span> background<span class="token punctuation">:</span> color <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>而这个函数的作用也仅仅只是生成一个<strong>对象而已</strong>，就像最上面那个对象一样：</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">{</span>\n\ttype<span class="token punctuation">:</span> <span class="token string">\'button\'</span><span class="token punctuation">,</span>\n\tprops<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\tstyle<span class="token punctuation">:</span> <span class="token punctuation">{</span> background<span class="token punctuation">:</span> color <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\t\tchildren<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\t\t…\n\t\t<span class="token punctuation">}</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>这就是 Element 的真面目了。所以可以看到，JSX 也好，<code class="language-text">createElement</code> 也好，不过是提供一种抽象帮我们不要写这个无聊的对象定义，要知道，如果再多几个 children 的话，整个对象定义应该就有几十行(当然，这个对象还会有其他作用，这里不展开)</p>\n<p>同样的，如果换成 <code class="language-text">Stateful Component</code> 的话，其实模式差不多。只不过，它们需要一个 <code class="language-text">render</code> 方法，并且拥有一个被称为 <code class="language-text">instance</code> 的变量。render 的目的就是定义一个 Element，而 instance 就是 在 render 中使用的 <code class="language-text">this</code> 了。</p>\n<p>所以，一个 Element 出现的步骤此时是，</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">type</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token comment">// type 就是该组件的 type</span>\n<span class="token keyword">const</span> Element <span class="token operator">=</span> instance<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// render 不就是 React.Component.prototype 的方法吗</span></code></pre>\n      </div>\n<p>综上所述，我们最常写的是 Component，Component 分为三种：</p>\n<ol>\n<li>host（常见 DOM 节点）</li>\n<li>function</li>\n<li>class</li>\n</ol>\n<p>host 类型，React 会根据对应 type，生成真正的 DOM node，并将它所带的 props 写入 node 的 <code class="language-text">attribute</code> 中，而对 <code class="language-text">children</code> 继续递归，直到碰到没有 children 的 host Element 为止。</p>\n<p>Function 的返回值是 Element, class 的 render 函数的返回值是 Element</p>\n<p>不过这里还有一个问题，function 和 class 的 <code class="language-text">typeof</code> 都是 <code class="language-text">function</code>，这两个是怎么判断的呢？因为 class 定义的组件，继承于 <code class="language-text">React.Component</code>，它拥有一个特定属性，只需要检测是否拥有这个属性就能确定是 class 还是 function。</p>\n<h2>一个常见问题</h2>\n<p>假设有下面的两个变量</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token constant">E</span> <span class="token operator">=</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Wow<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n<span class="token keyword">const</span> <span class="token function-variable function">C</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">E</span></code></pre>\n      </div>\n<p>这两个的区别是什么呢？刚开始很容易写出这样的代码</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> <span class="token punctuation">(</span>\n\t  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>E</span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n\t<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>但是如果真这样写的话，铁定是会报错的。\n\n  <a\n    class="gatsby-resp-image-link"\n    href="/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-ca311.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 11.829268292682926%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAYAAABYBvyLAAAACXBIWXMAAAsSAAALEgHS3X78AAAAQ0lEQVQI162MUQrAMAhDe/97Dut0+1+kptNdYYHw4BEywi9CJqHGMGf43XwOIU5rD9FuedSmOJW51tv8mMnK4I+p0w0En5yUqWbybQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="96FFC213 7B8B 46A4 817B 2F13D2342247"\n        title=""\n        src="/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-42603.png"\n        srcset="/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-f931c.png 200w,\n/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-e8031.png 400w,\n/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-42603.png 800w,\n/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-5b8b9.png 1200w,\n/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-c7ea5.png 1600w,\n/blogs/static/96FFC213-7B8B-46A4-817B-2F13D2342247-9515e6ae68bc85573af4f70969701083-ca311.png 1640w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \n于是我又发现可以这样写</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> <span class="token punctuation">(</span>\n\t  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">{</span><span class="token constant">E</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\t<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>那么为什么上面一种可以下面不可呢？</p>\n<p>首先，分析一下上面报错的原因，根据上面说的，我们知道，<code class="language-text">&lt;E /&gt;</code> 就是一个语法糖，也就是 <code class="language-text">React.createElement(type, props, children)</code></p>\n<p>其中 type 就是 E。那么，根据我们的定义 E 也是一个 <code class="language-text">React.createElement(&#39;p&#39;, {}, &#39;123&#39;)</code> 这样的表达式，其实就是一个对象。显然这个时候 <code class="language-text">&lt;E/&gt;</code> 得到的值，其实是一个对象！！ 而 React 内部是通过 type 属于 string 来确定这是 host Element，type 属于 function/class 来判断这是一个组件。因为此时 type 是一个对象，自然就会报错。</p>\n<p>而，<code class="language-text">{E}</code> 为什么可以呢？还记得我们最常在 <code class="language-text">{}</code> 中写什么吗？</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>names<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>name <span class="token operator">=></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>name<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>这里表达式最后就是一个 <code class="language-text">Array of Element</code>，显然这样是合法。所以，总结过来可以发现一个规律，</p>\n<blockquote>\n<p><code class="language-text">&lt;A /&gt;</code> 整个表达式是一个 Element，而 A 是一个 Component， Component 要么是 function（class 也是 function），要么是纯 DOM</p>\n</blockquote>',frontmatter:{title:"Element 和 Component 的区别",date:"2018/01/14"}}},pathContext:{slug:"/react-component-and-element/"}}}});
//# sourceMappingURL=path---react-component-and-element-223f87e392999bcb6b1c.js.map