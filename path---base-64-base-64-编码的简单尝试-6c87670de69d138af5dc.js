webpackJsonp([0x66703fce9b31],{487:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Yangkui's Blog",author:"Yang Kui"}},markdownRemark:{id:"/Users/yk/Documents/blog/src/pages/base64/Base64 编码的简单尝试.md absPath of file >>> MarkdownRemark",html:'<p>这几天不务正业, 在看 HTTP 以及 express 的服务端应用. 关于认证就有很多技巧. 什么基本认证, 记号认证, Passport 认证. 虽然其它认证都是通过 md5 或者 UUID 来实现一种不可逆且唯一的识别码. 换句话说, 我也不会实现这些东西.\n不过, Base64 虽然作为最基本的操作, 安全性基本没有(因为是对称的),所以可以作为一个很好的练练手的代码.</p>\n<h2>Base64</h2>\n<p>Base64 的基本思路就是, <em>3/4</em>. 每三个字节为一组, 将 24 bits 分为 4 份, 每份 6bits. 然后在一个大小为 64 的索引表中找到对应的字符.\n针对不能整除 3 的情况, 就将补 0. 之后这些 0 使用 = 来填充. 但是在实现中, 索引表中的第 0 个是 A, 所以如果我们要提前填充的话, 就要去掉多余的字符. 但是在 JS 中, 如果数组不存在某个下标, 会返回 <code>undefined</code>, 而对 <code>undefined</code> 进行操作会得到 0. 所以, 我们就不需要提前填充.</p>\n<h2>实现</h2>\n<p>作为一个合格的程序员, 当然不能傻逼到自己去一个个写索引表, <em>其实复制粘贴很快!</em> 所以我就用 map 函数来生成这些. 代码很简单</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> index <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">fromCharCode</span><span class="token punctuation">(</span><span class="token operator">...</span>temp<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> idx<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">&lt;=</span> idx <span class="token operator">&amp;&amp;</span> idx <span class="token operator">&lt;</span> <span class="token number">26</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">0x41</span> <span class="token operator">+</span> idx<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">>=</span> <span class="token number">26</span> <span class="token operator">&amp;&amp;</span> idx <span class="token operator">&lt;</span> <span class="token number">52</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">0x61</span> <span class="token operator">+</span> idx <span class="token operator">-</span> <span class="token number">26</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">>=</span> <span class="token number">52</span> <span class="token operator">&amp;&amp;</span> idx <span class="token operator">&lt;</span> <span class="token number">62</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">0x30</span> <span class="token operator">+</span> idx <span class="token operator">-</span> <span class="token number">52</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> idx <span class="token operator">===</span> <span class="token number">62</span> <span class="token operator">?</span> <span class="token number">43</span> <span class="token punctuation">:</span> <span class="token number">47</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>接下来就是关于 3 / 4 的具体操作咯. 其实很好理解, 每 6 个一份, 通过位操作就能将每个部分分离出来.\n当然, 因为 JS 中的数字都是 4 个字节起步的, 所以有点浪费内存, 应该使用 <code>Uint8Array</code> 来减少内存的消耗.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code>  <span class="token keyword">let</span> first <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">>></span> <span class="token number">2</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> two <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0x3</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">>></span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> three <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0xf</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">>></span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> four <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">0x3f</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>index<span class="token punctuation">[</span>first<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>index<span class="token punctuation">[</span>two<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>index<span class="token punctuation">[</span>three<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>index<span class="token punctuation">[</span>four<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>代码很简单, 就像上面一样. 不过需要注意的就是优先级问题. 位移动操作在大多数语言中, 优先级都是高于其它的位操作, 低于 + - 运算. 除了 Swift.  所以这里的 () 主要还是避免歧义.</p>\n<p>好了, 轮子都找好了, 剩下的就是修车咯! </p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">function</span> <span class="token function">encode</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 将 data 转化成 Uint8Array 转成能接受的值</span>\n  <span class="token keyword">let</span> transfer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>data<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>c <span class="token operator">=></span> c<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">let</span> base64 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> startPoint<span class="token punctuation">;</span>\n  \n  <span class="token keyword">for</span> <span class="token punctuation">(</span>startPoint <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> startPoint <span class="token operator">&lt;</span> data<span class="token punctuation">.</span>length<span class="token punctuation">;</span> startPoint <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    base64<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token function">threeToFour</span><span class="token punctuation">(</span>transfer<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>startPoint<span class="token punctuation">,</span> startPoint <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  \n  <span class="token comment">// 因为 threeFour 会假设传入的就是 3 个字节, 但是如果不是 3 个的话, 就会出现问题.</span>\n  <span class="token comment">// 比如 data[2] 就会是 undefined. 对 undefined 进行位操作会被当成 0, 所以多出来的字母肯定会有一个 0.</span>\n  <span class="token comment">// 再根据 Base64 的规则, 加上相应的等号</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>startPoint <span class="token operator">-</span> data<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 说明 % 3 余 2, 简单的算一下就知道咯.</span>\n    base64<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    base64<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">\'=\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>startPoint <span class="token operator">-</span> data<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    base64<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    base64<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    base64<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">\'==\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> base64<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">\'\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>需要注意的是那个循环. 所以我们知道要分辨能不能整除 3. 但是, 仔细想一下, 我用 3, 4, 5 作为🌰的话, 就能看出来.\n3 的时候, 从 0 开始, 最后跳出循环的 startPoint 就等于 3. 所以没有任何需要另外处理的情况.\n4 的时候, 就会在 6 结束, 这个时候 6 - 4 等于 2, 所以需要补两个字节. 但是因为我的 <code>threeToFour</code> 函数没有专门处理这种情况, 最后总会返回 4 个字符, 所以我们需要将多出来的字节替换成 =. 当然, 你也可以使用 splice 做到一次完成这种操作.\n5 的时候和上面相似.</p>\n<p>最后这就是整个代码的实现咯. 不得不说, 对于那种需要频繁增加减少的操作, 我还是喜欢用数组, 然后 <code>join</code> 起来. 不过, 浏览器对于 += 运算符应该是做了大量的优化的, 所以到底哪个性能高, 我还真的不确定…… </p>\n<h3>总结</h3>\n<p>这种题目整个做出来, 对于自己的思维还是很有锻炼的. 虽然, 不可能一次就能编对, 特别是那个位操作的一段很容易出现问题, 这个时候一定要保持冷静才行. 哦, 对了, 你们会位运算?</p>',frontmatter:{title:"Base64 编码的简单尝试",date:"2018/01/03"}}},pathContext:{slug:"/base64/Base64 编码的简单尝试/"}}}});
//# sourceMappingURL=path---base-64-base-64-编码的简单尝试-6c87670de69d138af5dc.js.map