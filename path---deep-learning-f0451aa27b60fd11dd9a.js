webpackJsonp([0x85145e80f333],{488:function(A,n){A.exports={data:{site:{siteMetadata:{title:"Yangkui's Blog",author:"Yang Kui"}},markdownRemark:{id:"/Users/yk/Documents/blog/src/pages/deep-learning/index.md absPath of file >>> MarkdownRemark",html:'<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-0b287.jpeg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 66.64999999999999%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQBAwX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAHXqZXGSQ//xAAYEAADAQEAAAAAAAAAAAAAAAAAAQIREv/aAAgBAQABBQKrafbJejjSZ0Sw/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAFhAAAwAAAAAAAAAAAAAAAAAAECCB/9oACAEBAAY/Akg//8QAGRABAAMBAQAAAAAAAAAAAAAAAQARYVFx/9oACAEBAAE/IfIMO7yKF2Er2CjbQbVP/9oADAMBAAIAAwAAABCQz//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QP//EABwQAQACAwEBAQAAAAAAAAAAAAEAESExYUFRkf/aAAgBAQABPxBkH4bKhFNXt7uMjyhjhLsd2cch5aOR24SFhb8+T//Z\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="1 1mpE6fsq5LNxH31xeTWi5w"\n        title=""\n        src="/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-f8fb9.jpeg"\n        srcset="/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-e8976.jpeg 148w,\n/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-63df2.jpeg 295w,\n/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-f8fb9.jpeg 590w,\n/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-85e3d.jpeg 885w,\n/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-d1924.jpeg 1180w,\n/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-9452e.jpeg 1770w,\n/static/1*1mpE6fsq5LNxH31xeTWi5w-8281600941e9adcae8c522d9bd13a3a6-0b287.jpeg 2000w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p><a href="https://medium.freecodecamp.org/want-to-know-how-deep-learning-works-heres-a-quick-guide-for-everyone-1aedeca88076">原文</a></p>\n<p><strong>AI(Artificial Intelligence)</strong> 和 ML(Machine Learning) 是当下最热的话题.</p>\n<p>我们每天都能看到 AI 的字眼, 那些有抱负的程序员都说自己想学点 AI. 你也听到高层说他们想在服务中集成 AI. 但是, 大多数人其实不理解什么是 AI.</p>\n<p>一旦你读过了这篇文章, 你就会理解基础的 AI 和 ML 知识. 最重要的是, 你将会理解什么是 <em>[深度学习](<a href="https://en.wikipedia.org/wiki/Deep">https://en.wikipedia.org/wiki/Deep</a></em>learning)_—最流行的 ML 方法, 是怎么工作的.</p>\n<p>这篇介绍面向所有人, 所以不需要任何数学基础.</p>\n<h2>背景</h2>\n<p>理解深度学习的第一步是分清两个重要术语的区别.</p>\n<h3>人工智能 VS 机器学习</h3>\n<blockquote>\n<p><strong>人工智能</strong> 是人类智能在计算机中的模拟</p>\n</blockquote>\n<p>当 AI 研究首次开始的时候, 研究者会尝试去复制人类在特定行为下的思考方式—比如玩游戏</p>\n<p>他们会描述出计算机需要遵守的大量规则. 计算机有一个特定的动作集, 并且根据这些动作集作出决策.</p>\n<blockquote>\n<p>机器学习指的是机器具有一种在大规模数据集下学习的能力, 而不再需要提前规定各种规则</p>\n</blockquote>\n<p>ML 允许计算机自主学习. 这种学习方式充分利用了现代计算机的处理力, 能够轻松的处理<strong>大规模</strong>数据集.</p>\n<h3>监督性学习 VS 非监督性学习</h3>\n<blockquote>\n<p>监督性学习需要使用标记过的数据</p>\n</blockquote>\n<p>当你使用监督性学习训练 AI 的时候, 你需要给它一个输入和希望得到的结果(输出)</p>\n<p>如果 AI 得到的结果是错的.它会自动调整它的计算方式. 这个过程通过不断地遍历数据集, 指导 AI 得到的结果和期望输出值没有任何出入后, 才停止.</p>\n<p>一个监督性学习的例子是天气预测 AI. 它会使用历史数据来学习预测. 训练数据包括了输入(气压, 潮湿度, 风速)和输出(气温)</p>\n<blockquote>\n<p>非监督性学习是使用没有特定结构的数据的一种训练方式</p>\n</blockquote>\n<p>当你打算使用非监督性学习来训练 AI 的时候, 你需要让 AI 自己决定如何对数据分类.</p>\n<p>一个监督性学习的例子是电商网站的行为预测 AI. 它不能用标记过的数据来训练.</p>\n<p>取而代之的是, 它会对输入数据创建自己的分类, 它会告诉你哪种用于最可能买的东西.</p>\n<h2>那么, 深度学习呢</h2>\n<p>你要开始准备理解深度学习, 和它工作的方式咯.</p>\n<p>深度学习是一种<strong>机器学习的方法</strong>, 它让你训练 AI 来针对输入给出对应的输出. 无论监督性学习还是非监督性学习都可以用来训练.</p>\n<p>我们通过假象一个<strong>飞机票预测服务</strong>来学习深度学习的公粥方式. 我们使用监督性学习来训练它.</p>\n<p>我们希望我们的机票预测器能够使用下面的输入(去掉了剩余票来保证简单)来预测价格:</p>\n<ul>\n<li>出发地</li>\n<li>目的地</li>\n<li>出发时间</li>\n<li>航空公司</li>\n</ul>\n<h3>神经网络</h3>\n<p>让我们来深入我们 AI 的大脑.</p>\n<p>就像动物一样,我们的预测 AI 的大脑拥有神经元. 用圆来表示它们. 这些神经元是互相连接的.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/1*LaEgAU-vdsR_pClMcgbikQ-35eee33de47a56b9757fd77ba4b2c6f1-b1e96.jpeg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 49.05183312262958%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAKABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIDBf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/aAAwDAQACEAMQAAAB7C4rRbL/xAAYEAADAQEAAAAAAAAAAAAAAAAAAREQIf/aAAgBAQABBQKs7aPf/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFREBAQAAAAAAAAAAAAAAAAAAARD/2gAIAQIBAT8BJ//EABYQAQEBAAAAAAAAAAAAAAAAAAEQAP/aAAgBAQAGPwLFJ//EABsQAAICAwEAAAAAAAAAAAAAAAABESEQQVFh/9oACAEBAAE/IXA+SJ2CXhVV0be2sf/aAAwDAQACAAMAAAAQ2+//xAAWEQADAAAAAAAAAAAAAAAAAAABEDH/2gAIAQMBAT8QNX//xAAWEQEBAQAAAAAAAAAAAAAAAAABEBH/2gAIAQIBAT8QGk//xAAbEAABBQEBAAAAAAAAAAAAAAABABEhMUEQYf/aAAgBAQABPxAwBJgR0igyG6RaPJlqKb7z/9k=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="1 LaEgAU vdsR pClMcgbikQ"\n        title=""\n        src="/static/1*LaEgAU-vdsR_pClMcgbikQ-35eee33de47a56b9757fd77ba4b2c6f1-f8fb9.jpeg"\n        srcset="/static/1*LaEgAU-vdsR_pClMcgbikQ-35eee33de47a56b9757fd77ba4b2c6f1-e8976.jpeg 148w,\n/static/1*LaEgAU-vdsR_pClMcgbikQ-35eee33de47a56b9757fd77ba4b2c6f1-63df2.jpeg 295w,\n/static/1*LaEgAU-vdsR_pClMcgbikQ-35eee33de47a56b9757fd77ba4b2c6f1-f8fb9.jpeg 590w,\n/static/1*LaEgAU-vdsR_pClMcgbikQ-35eee33de47a56b9757fd77ba4b2c6f1-b1e96.jpeg 791w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>这些神经元被分成三种不同的层:</p>\n<ol>\n<li>输入层</li>\n<li>隐藏层</li>\n<li>输出层</li>\n</ol>\n<blockquote>\n<p>译者注: 就是因为隐藏层的行为是黑盒的, 连创造这个 AI 的人都不知道为什么会这样. 这也就是为什么有些大佬针对 AI 会有一些担心. 虽然目前的 AI 还处于比较弱智的阶段, 但是就像互联网的发展一样, 没人能预测到 20 年后的 AI 会到怎样的程度.</p>\n</blockquote>\n<p><strong>输入层</strong>接受输入数据. 在我们的场景下, 我们的输入层有四个神经元: 出发地, 目的地, 出发时间, 航空公司. 输入层将这些输入传给第一个隐藏层.</p>\n<p><strong>隐藏层</strong>会对输入的数据执行数学运算. 一大挑战是: 决定使用多少层隐藏层以及每一层有多少个神经元(越多越慢, 但是效果也越好)</p>\n<p>深度学习中的 <strong>Deep</strong> 指的就是多于一层的隐藏层.</p>\n<p>输出层就会返回输出的数据. 在我们的案例下, 它会告诉我们价格预测.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/1*6PjhO0kPciY_f5XbghnZsQ-5cc5d0c872bf7934abe030f7acfa5fec-efba4.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 47.61904761904761%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAABvklEQVQoz2NgwAP8qyayWltbs/h2LCv0bpzjyUAkYAYRV7dECYPo0ClbOfx7VvOYmJiIBk7ZNtvIyEjJLiJV0dLdT8bY2JgDaLgoIQPlzc3Nmd6fiG9xczKX96yZFuRVPzsJqFk6YNJmDaCBJp61MwrcCtpCzB3dDIGWtADFBIKmbJf361zOic1ACSDmfXYw1tzUxFjeJadBE4hNgZr0AiZvrQDSHm5FnWZOScWaxqZmxkHTdpoCLZPyaV+a6lk7XRObgUIgF745FpdoY2Vq7Fbc5epe3h8INMgQaGAAkPb1qp0R7JLd4GRiZesOFEsCiqn6ti918W1ZKDExxkf6TX28AxMTEwfQLEaQgeJcQPD2WHy0taWJsVtRh5N7WZ8vsoGe1VMDXLLr7U2sbOAGAl3o4tM4R7Ij3EP2RW2cIwsLCwcsPkAMhldH4mzMzUzkXfOadVzzWyxQvFzSbeWUUqYD8fIOuJe962drYPWymZkZ07sT8XUYkTIREileyJEydXsHUE7Af8JGBWCMc+KM6mtbIqUgyWYLRwAw2QANEgO6cAZysgEmJQ7ftiUCDOQC79ppnDY2NtCEPZeohA0Ab7OlvPwkSF4AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="1 6PjhO0kPciY f5XbghnZsQ"\n        title=""\n        src="/static/1*6PjhO0kPciY_f5XbghnZsQ-5cc5d0c872bf7934abe030f7acfa5fec-fb8a0.png"\n        srcset="/static/1*6PjhO0kPciY_f5XbghnZsQ-5cc5d0c872bf7934abe030f7acfa5fec-1a291.png 148w,\n/static/1*6PjhO0kPciY_f5XbghnZsQ-5cc5d0c872bf7934abe030f7acfa5fec-2bc4a.png 295w,\n/static/1*6PjhO0kPciY_f5XbghnZsQ-5cc5d0c872bf7934abe030f7acfa5fec-fb8a0.png 590w,\n/static/1*6PjhO0kPciY_f5XbghnZsQ-5cc5d0c872bf7934abe030f7acfa5fec-efba4.png 630w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>所以, 这个价格预测是怎么算出来的呢?\n这就是深度学习的<strong>黑魔法</strong></p>\n<p>每一个神经元都是以<strong>权重</strong>来连接的. 权重指的就是某一个输入值的重要性. 初始权重是随机的.</p>\n<p>当我们预测飞机票的价格的时候, 出发时间是一个重要的影响因素, 所以和出发时间相连接的神经元, 都会获得一个很高的权重.\n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/1*_kudSKDXEScysTpYYowqFg-b2fe0db64884470d524228d265952875-aca4d.jpeg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 532px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 62.96992481203007%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB3pRQf//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEAAQUCX//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEABj8CX//EABcQAQEBAQAAAAAAAAAAAAAAAAARARD/2gAIAQEAAT8hrFRnP//aAAwDAQACAAMAAAAQQM//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/ED//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/ED//xAAcEAADAAEFAAAAAAAAAAAAAAAAARExECFhcYH/2gAIAQEAAT8QbWNPwaK7nUcc14EeLp//2Q==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="1  kudSKDXEScysTpYYowqFg"\n        title=""\n        src="/static/1*_kudSKDXEScysTpYYowqFg-b2fe0db64884470d524228d265952875-aca4d.jpeg"\n        srcset="/static/1*_kudSKDXEScysTpYYowqFg-b2fe0db64884470d524228d265952875-bbc2d.jpeg 148w,\n/static/1*_kudSKDXEScysTpYYowqFg-b2fe0db64884470d524228d265952875-b5c5f.jpeg 295w,\n/static/1*_kudSKDXEScysTpYYowqFg-b2fe0db64884470d524228d265952875-aca4d.jpeg 532w"\n        sizes="(max-width: 532px) 100vw, 532px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>每一个神经元都有一个<a href="https://en.wikipedia.org/wiki/Activation_function">激励函数</a>, 这些函数没有数学基础的话很难解释.\n简单地说, 它的一个用处就是标准化这些神经元的输出值.</p>\n<p>一旦这些输入数据通过了所有的神经网络后, 它们就会通过输出层被返回出来.\n一点都不难, 对吧?</p>\n<h3>训练神经网络</h3>\n<p>训练 AI 是深度学习最难的部分. 为什么?</p>\n<ol>\n<li>你需要有大量的数据</li>\n<li>你需要有庞大的算力</li>\n</ol>\n<p>对于我们的机票价格预测系统, 我们需要寻找历史机票价格的数据. 因为机场和出发时间又有大量的组合, 我们就需要非常庞大的数据集.</p>\n<p>为了训练 AI, 我们需要给他输入值, 然后将它的输出值和数据集中的输出值进行比较. 因为 AI 还没有训练完成, 这个输出肯定是错的.</p>\n<p>一旦我们遍历过一次所有的数据集后, 我们创造一个用来暂时 AI 的输出和预期输出之间的差别. 这个函数被称为<strong>开销函数</strong>.</p>\n<p>理想情况下, 我希望我们的开销函数是 0. 也就是 AI 的输出和数据集的输出完全一致.</p>\n<h3>怎么降低开销</h3>\n<p>我们需要修改神经元之间的权重. 我们可以随机的改变他们直到开销很低. 但是这个方法显然不怎么高效.\n相反, 我们会使用一个叫做 <a href="https://en.wikipedia.org/wiki/Gradient_descent">梯度下降</a> 的方法.</p>\n<p>深度下降是一种让我们能找到函数最小值的方法. 在我们的场景下, 我们需要寻找开销函数的最小值.</p>\n<p>它的工作方式是<strong>在每次遍历数据后</strong>, 一点一点的<strong>修改权重</strong>. 通过计算在某一特定数据集下, 开销和对应权重的函数的斜率, 我们可以知道哪个方向可以得到最小值.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-417af.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 54.1875%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsSAAALEgHS3X78AAABDElEQVQoz5WRXWuDMBSG+zu7f7jLwQbbLnYxRmEMtNNlFqMxWoOo8zNaIn7sdLKMWof0hYTknPOcN+SshmEoiqKu6+FyrZqmiaJoAnueB8FlmFJKCKmqyg6qMdT3vaqqiqLAi7qug8irRg4/gqthGLqu+75/hGElSQLOJuOypRCCcw5d4jiGfbMl885/sF/OVqzXV5+YLsC7fXGebtv2+uYRzBfgg2itgE/SjkMfXrR/P0zCx9KgTMpG5rBl3W+MLMvgzBhDCMHXmqbpui7sGOMTeOSRm7FU3D693T2/h9EXwHmeQ41t22EYTp3TNIU2+1/BkNEOa/oHTFEGHceZfzaoOxX4jFOVguGdw9/bMnaZrztA5gAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="1 HrFZV7pKPcc5dzLaWvngtQ"\n        title=""\n        src="/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-fb8a0.png"\n        srcset="/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-1a291.png 148w,\n/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-2bc4a.png 295w,\n/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-fb8a0.png 590w,\n/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-526de.png 885w,\n/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-fa2eb.png 1180w,\n/static/1*HrFZV7pKPcc5dzLaWvngtQ-3fc5856380fb326d45c3303623ce7207-417af.png 1600w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>为了最小我们的开销, 需要遍历数据集很多次. 这也是为什么你需要非常庞大的计算力.\n使用梯度下降的方法来更新权重是<strong>全自动</strong>的, 这也是深度学习的黑魔法.</p>\n<p>一旦我们训练好我们的 AI, 就能用来预测未来的机票价格了.</p>\n<h2>在哪可以学到更多</h2>\n<p>还有很多其他类型的神经网络: 计算机视觉使用<a href="https://en.wikipedia.org/wiki/Convolutional_neural_network">卷积神经网络</a>, 自然语言处理使用<a href="https://en.wikipedia.org/wiki/Recurrent_neural_network">递归神经网络</a>.</p>\n<p>如果你想学习深度学习, 我建议还是去找在线课程.\n当前最好的课程之一就是吴恩达的<a href="https://www.coursera.org/specializations/deep-learning">深度学习标准</a>. 如果你对证书没兴趣的话, 可以不需要为这门课程付费. 你可以免费旁听.</p>\n<h2>总结</h2>\n<ul>\n<li>深度学习使用神经网络来模仿动物的智能</li>\n<li>神经网络有三种层: 输入层(Input Layer), 隐藏层(Hidden Layer) 和 输出层(Output Layer)</li>\n<li>神经元之间通过权重连接, 展现了输入数据的重要程度.</li>\n<li>神经元使用对数据使用激励函数来标准化输出</li>\n<li>为了训练神经网络, 你需要大量的数据</li>\n<li>遍历数据并且比较, 会有一个开销函数. 它表明了当前 AI 离可以用还差多远</li>\n<li>每次遍历数据后, 通过梯度下降来降低开销, 以调整神经元之间的权重</li>\n</ul>',frontmatter:{title:"Deep Learning Quick Guide",date:"2018/01/28"}}},pathContext:{slug:"/deep-learning/"}}}});
//# sourceMappingURL=path---deep-learning-f0451aa27b60fd11dd9a.js.map