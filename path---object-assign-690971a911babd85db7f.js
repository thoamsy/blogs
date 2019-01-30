webpackJsonp([0x8926a71e5826],{412:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Yangkui's Blog",author:"Yang Kui"}},markdownRemark:{id:"/Users/yk/Documents/blog/src/pages/object-assign/index.md absPath of file >>> MarkdownRemark",html:'<p>在 <em>immutable struct</em> 或者说 <em>functional programming</em> 的影响下, <code class="language-text">Object.assign</code> 和 <a href="https://github.com/tc39/proposal-object-rest-spread">Object Spread</a> 是我们离不开的操作. 不过它的功能真的是 <em>shadow copy</em> 吗? 这里我列出一个例子来记录这个问题, 以防以后碰到坑.</p>\n<p>下面是一个对象, 包括了几种典型的属性:</p>\n<ol>\n<li>普通属性</li>\n<li>get 属性</li>\n<li>set 属性</li>\n<li>Symbol</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  a<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  <span class="token keyword">get</span> <span class="token function">hh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'__GETTER__\'</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+=</span> <span class="token number">1</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token keyword">set</span> <span class="token function">hh</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'__SETTER__\'</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+=</span> val <span class="token operator">*</span> <span class="token number">2</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">[</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">\'cool\'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token string">\'good\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>先提出问题, 哪种类型的属性会被成功 copy? <code class="language-text">get 和 set</code> 时候会被运行呢?</p>\n<p>首先可以确定的是, 连续两次打印 <code class="language-text">obj.hh</code> 的话, 一定会得到 <code class="language-text">2, 3</code>. 因为每次 <code class="language-text">hh</code> 都会被运行对吧.</p>\n<p>OK, 现在开始对它 <code class="language-text">assign</code>, 有下面代码</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> shadow <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>obj <span class="token punctuation">}</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shadow<span class="token punctuation">.</span>hh<span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>shadow<span class="token punctuation">.</span>hh<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>这个时候得到的值是多少呢(假设这串代码紧接上面的代码)\n最后的结果是 <code class="language-text">4, 4</code>\n这说明 GET 只被运行了一次后, 就再也没有运行了.\n那我们打印一下 shadow 的内部看看,</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span>shadow<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/blogs/static/06FE5C2C-8A1B-45EE-B45D-D3DB0774F9FA-b0dd709a206bcde06de0b0ffc0157ef2-c2f93.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 27.54491017964072%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAApUlEQVQY06WQ0QqEIBBF/ZDILB8kSKJMyMiI/v+b7nIHjBb2Ydl9OIxzdcY7o0II6PsedV2jaRporf9CVVUFay2MMULXdXfetq1QtJI/NcbnWzXPM9Z1RUoJwzBgWRYcx4FpmuTMuO+7aDFGyVnDu5yzwDM1Tqu2bbsFFvA3jl5ioUzwSXvWKO+9OGRDMo6j7JP8tEPavK4L53lKY7qk5px7c/MtL5GKrmesUOWZAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="06FE5C2C 8A1B 45EE B45D D3DB0774F9FA"\n        title=""\n        src="/blogs/static/06FE5C2C-8A1B-45EE-B45D-D3DB0774F9FA-b0dd709a206bcde06de0b0ffc0157ef2-42603.png"\n        srcset="/blogs/static/06FE5C2C-8A1B-45EE-B45D-D3DB0774F9FA-b0dd709a206bcde06de0b0ffc0157ef2-f931c.png 200w,\n/blogs/static/06FE5C2C-8A1B-45EE-B45D-D3DB0774F9FA-b0dd709a206bcde06de0b0ffc0157ef2-e8031.png 400w,\n/blogs/static/06FE5C2C-8A1B-45EE-B45D-D3DB0774F9FA-b0dd709a206bcde06de0b0ffc0157ef2-42603.png 800w,\n/blogs/static/06FE5C2C-8A1B-45EE-B45D-D3DB0774F9FA-b0dd709a206bcde06de0b0ffc0157ef2-5b8b9.png 1200w,\n/blogs/static/06FE5C2C-8A1B-45EE-B45D-D3DB0774F9FA-b0dd709a206bcde06de0b0ffc0157ef2-c2f93.png 1336w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>注意到, 这个时候 hh 只是一个普通的属性, 而不再属于 get set. 作为对比, 我们看下 obj 会输出什么.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/blogs/static/336C40D7-A962-48C0-B485-B81EDD28B4EA-73ccd330d70754382a3ed1d85ee766e1-39e48.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 26.794871794871796%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAAAhklEQVQY052QOw7DIBAFOQn/woICjG0kENz/WC/ZlWXFTX7FwBZoGBDee5RSsK4rjuPgmQghQEoJpdRHtNbXLowxqLVijIFt25BzZpnR5jr0jlepVk/hsixorWHfdy50zt1u/Ap1QoW0UOGck6VUaa0Flf8kPRH0hyTqvSOlxM+NMbL0H+EDuqyOShKiobkAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="336C40D7 A962 48C0 B485 B81EDD28B4EA"\n        title=""\n        src="/blogs/static/336C40D7-A962-48C0-B485-B81EDD28B4EA-73ccd330d70754382a3ed1d85ee766e1-42603.png"\n        srcset="/blogs/static/336C40D7-A962-48C0-B485-B81EDD28B4EA-73ccd330d70754382a3ed1d85ee766e1-f931c.png 200w,\n/blogs/static/336C40D7-A962-48C0-B485-B81EDD28B4EA-73ccd330d70754382a3ed1d85ee766e1-e8031.png 400w,\n/blogs/static/336C40D7-A962-48C0-B485-B81EDD28B4EA-73ccd330d70754382a3ed1d85ee766e1-42603.png 800w,\n/blogs/static/336C40D7-A962-48C0-B485-B81EDD28B4EA-73ccd330d70754382a3ed1d85ee766e1-5b8b9.png 1200w,\n/blogs/static/336C40D7-A962-48C0-B485-B81EDD28B4EA-73ccd330d70754382a3ed1d85ee766e1-39e48.png 1560w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>所以结论就是, 普通属性和 Symbol 会被 Copy. 至于 Symbol 时候还是原来那个, 自己测试一下可以发现肯定是的.</p>\n<p>那么, 另外一个问题. 这些 GET 和 SET 是在什么情况下被执行的呢? 我们可以看到, 上面只打印出了 <strong><em>GETTER</em></strong> 而没有 <strong><em>SETTER</em></strong>, 先引用 MDN 的文档</p>\n<blockquote>\n<p>The Object.assign() method only copies enumerable and own properties from a source object to a target object. It uses [[Get]] on the source and [[Set]] on the target, so it will invoke getters and setters.</p>\n</blockquote>\n<p>也就是说, 第二个参数的 GET 会被调用, 第一个参数的 SET 会被调用. 而因为 <code class="language-text">{ …obj }</code> 就相当于 <code class="language-text">Object.assign({}, obj)</code>, 所以只有 GET 会被调用。</p>\n<p>如何证明 SET 会被调用呢? 这个简单, 使用 <code class="language-text">Object.assign(obj, obj)</code> 就行.\n如果现在的代码是这样的</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> symbol <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">\'cool\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  a<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  <span class="token keyword">get</span> <span class="token function">hh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'__GETTER__\'</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+=</span> <span class="token number">1</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token keyword">set</span> <span class="token function">hh</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'__SETTER__\'</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+=</span> val <span class="token operator">*</span> <span class="token number">2</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">[</span>symbol<span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token string">\'good\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>hh<span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>hh<span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> aha <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> obj<span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>aha<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>会出现下面的结果.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/blogs/static/7F67AD27-E0D9-42B7-AB4C-D67D9A4C7241-306e2f20608f2abb12380067efc28b5f-536a7.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 538px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 115.98513011152416%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAACXBIWXMAAAsSAAALEgHS3X78AAACd0lEQVQ4y5XU61IiQQwF4HkMRQUvCKLiDWUEFUGlLN//gXrri5UpxnW39EeYbrpzcnKSdHV4eFguLy/L/f192NPTUxmNRmV3d7fs7++XXq8X359axfnl5aU8Pz+Xx8fH8v7+HsDD4fDXYAF4fn4eQACXy2X5+Pgos9msnJyctAB/Cl5Np9NST+tIs9PpRKpkYED29vZKt9ttOf0PvOJ4cXFRrq6uymAwCD2xPj09Dcfr6+tgC9g+wf4FWol+cHAQTpylvVqtytvbW4DO5/Nye3sbwfr9fjD/i2lvAzAXUr27u2sMqGLRE0hd16H1YrEIoK8yJGiVUaSECUYKBIgBprOqYwxUax0fHweJrzJUuQAoZZeBAH54eGg6AOh4PA6tnWGskKylIbDUhgMAheEkPax9AQLDdPOeNf1TggptzooBdGtrK9gyZ1qJ2e/s7MR/1tvb27EGlBYpW9BDJMXAJltI+qZGenX9+bWXEYaI5GBMJpNydHT0mTJmNi7Ti5YAU0v/K5A1Q8AZjQEi4ZxPq21ESW2InYVxmZa+MeeDYdNe7tHXuUDBUGNLPdtmvV43Ka2Wn21DeDabzYMdZ3rzo21TFD/559nZWQOUKWKUqdNWipiRxt7Ykqs1eoCyVYwcB8AJpDhS19gKkmOarGnXMNQCooho1KSbPQcEGFaYcsyx+9oyzaTYiMqJ5XSonGDYeyMFE4h23700+V+1OYc3NzfhpN8AArY2Hb7OaJtN/B1oq204SC3HLplqekw320pn5MOw+UBU+exID0Mp0zGbGaAAQJOpYpEHUxXOKrcYOhTZ5Xz7zHf2peJgqJEFfn19jT3mCggU4B92J7TKnD/0XQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="7F67AD27 E0D9 42B7 AB4C D67D9A4C7241"\n        title=""\n        src="/blogs/static/7F67AD27-E0D9-42B7-AB4C-D67D9A4C7241-306e2f20608f2abb12380067efc28b5f-536a7.png"\n        srcset="/blogs/static/7F67AD27-E0D9-42B7-AB4C-D67D9A4C7241-306e2f20608f2abb12380067efc28b5f-a3759.png 200w,\n/blogs/static/7F67AD27-E0D9-42B7-AB4C-D67D9A4C7241-306e2f20608f2abb12380067efc28b5f-4aca8.png 400w,\n/blogs/static/7F67AD27-E0D9-42B7-AB4C-D67D9A4C7241-306e2f20608f2abb12380067efc28b5f-536a7.png 538w"\n        sizes="(max-width: 538px) 100vw, 538px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>在这里, GET 和 SET 都被调用了一次, 分别是 source 和 target 调用的. 而这个时候 a 变成 12 也不难解释.\n因为 <code class="language-text">obj.a</code> 原来是 3. 当 assign 被调用的时候, 内部会有一个 <code class="language-text">obj.a = obj.a</code> 的过程. 先 GET, 就让 <code class="language-text">obj.a</code> 变成了 4, 然后是 SET, 也就是 <code class="language-text">obj.a += obj.a * 4</code> 就成了 12.</p>\n<p>不过, 值得注意的是, 这里 hh 还是 GET 和 SET, 并没有像上面的 assign 所做的一样，被替换成普通的属性.\n不知道这是不是有意为之.</p>\n<p>那么我们该如何复制含有 get 和 set 的对象呢? 如果用到 ES8 的特性的话, 会很简单</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> realShadow <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>\n  Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">,</span>\n  Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>\n<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/blogs/static/1A25BA7A-053A-42D7-91AB-2184F28CFAA5-af279db6c89a2d5d7aa85a971678507a-102ef.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 26.848249027237355%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAAAlUlEQVQY041PWwrEIBDzIlZbC9qHqIjih+D9TzVLBgpbtsvuR8gYMpkoQgh0HAed50nWWmbvPW3bxsAMDbNzjr3Q9n1nDTtKKdJaM4QxhhCaUqLWGs8xRl6apomklMzfcIVdLOZ5plIKjTGYEYYW0K+rv3BriMpohrBaK63ryoZ30yPU81tgMedMvXdmfH1Zlo/L/+IFFTyPNmrN8eMAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="1A25BA7A 053A 42D7 91AB 2184F28CFAA5"\n        title=""\n        src="/blogs/static/1A25BA7A-053A-42D7-91AB-2184F28CFAA5-af279db6c89a2d5d7aa85a971678507a-42603.png"\n        srcset="/blogs/static/1A25BA7A-053A-42D7-91AB-2184F28CFAA5-af279db6c89a2d5d7aa85a971678507a-f931c.png 200w,\n/blogs/static/1A25BA7A-053A-42D7-91AB-2184F28CFAA5-af279db6c89a2d5d7aa85a971678507a-e8031.png 400w,\n/blogs/static/1A25BA7A-053A-42D7-91AB-2184F28CFAA5-af279db6c89a2d5d7aa85a971678507a-42603.png 800w,\n/blogs/static/1A25BA7A-053A-42D7-91AB-2184F28CFAA5-af279db6c89a2d5d7aa85a971678507a-5b8b9.png 1200w,\n/blogs/static/1A25BA7A-053A-42D7-91AB-2184F28CFAA5-af279db6c89a2d5d7aa85a971678507a-102ef.png 1542w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>这里 a 的值还是 3, 说明这个 get 根本没有被执行, 完成没有副作用. 这才是真正的浅拷贝嘛!</p>\n<p>OK, 那么这里可以得出一个结论: 对于普通的纯对象, 比如 redux 里保存的那些, 使用 <code class="language-text">assign</code> 没有任何问题. 但如果是自己定义的复杂对象, 带了很多 get 的话, 最好的方式还是采用下面这种最安全的方式吧.</p>\n<p>值得一提的是, 这也是 MDN 推荐的方式:</p>\n<blockquote>\n<p>Whereas the Object.assign() method will only copy enumerable and own properties from a source object to a target object, you are able to use this method and Object.create() for a shallow copy between two unknown objects</p>\n</blockquote>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n      </div>',frontmatter:{title:"Object.assign 的一些问题",date:"2018/01/31"}}},pathContext:{slug:"/object-assign/"}}}});
//# sourceMappingURL=path---object-assign-690971a911babd85db7f.js.map