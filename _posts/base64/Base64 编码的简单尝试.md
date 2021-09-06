---
title: Base64 编码的简单尝试
date: "2018-01-03"
---

这几天不务正业, 在看 HTTP 以及 express 的服务端应用. 关于认证就有很多技巧. 什么基本认证, 记号认证, Passport 认证. 虽然其它认证都是通过 md5 或者 UUID 来实现一种不可逆且唯一的识别码. 换句话说, 我也不会实现这些东西.
不过, Base64 虽然作为最基本的操作, 安全性基本没有(因为是对称的),所以可以作为一个很好的练练手的代码.

## Base64

Base64 的基本思路就是, _3/4_. 每三个字节为一组, 将 24 bits 分为 4 份, 每份 6bits. 然后在一个大小为 64 的索引表中找到对应的字符.
针对不能整除 3 的情况, 就将补 0. 之后这些 0 使用 = 来填充. 但是在实现中, 索引表中的第 0 个是 A, 所以如果我们要提前填充的话, 就要去掉多余的字符. 但是在 JS 中, 如果数组不存在某个下标, 会返回 `undefined`, 而对 `undefined` 进行操作会得到 0. 所以, 我们就不需要提前填充.

## 实现

作为一个合格的程序员, 当然不能傻逼到自己去一个个写索引表, _其实复制粘贴很快!_ 所以我就用 map 函数来生成这些. 代码很简单

```js
let temp = Array(64).fill(0)
let index = String.fromCharCode(
  ...temp.map((_, idx) => {
    if (0 <= idx && idx < 26) {
      return 0x41 + idx
    } else if (idx >= 26 && idx < 52) {
      return 0x61 + idx - 26
    } else if (idx >= 52 && idx < 62) {
      return 0x30 + idx - 52
    } else {
      return idx === 62 ? 43 : 47
    }
  })
)
```

接下来就是关于 3 / 4 的具体操作咯. 其实很好理解, 每 6 个一份, 通过位操作就能将每个部分分离出来.
当然, 因为 JS 中的数字都是 4 个字节起步的, 所以有点浪费内存, 应该使用 `Uint8Array` 来减少内存的消耗.

```js
let first = data[0] >> 2
let two = ((data[0] & 0x3) << 4) | (data[1] >> 4)
let three = ((data[1] & 0xf) << 2) | (data[2] >> 6)
let four = data[2] & 0x3f

return `${index[first]}${index[two]}${index[three]}${index[four]}`
```

代码很简单, 就像上面一样. 不过需要注意的就是优先级问题. 位移动操作在大多数语言中, 优先级都是高于其它的位操作, 低于 + - 运算. 除了 Swift. 所以这里的 () 主要还是避免歧义.

好了, 轮子都找好了, 剩下的就是修车咯!

```js
function encode(data) {
  // 将 data 转化成 Uint8Array 转成能接受的值
  let transfer = new Uint8Array([...data].map(c => c.charCodeAt(0)))

  let base64 = []
  let startPoint

  for (startPoint = 0; startPoint < data.length; startPoint += 3) {
    base64.push(...threeToFour(transfer.slice(startPoint, startPoint + 3)))
  }

  // 因为 threeFour 会假设传入的就是 3 个字节, 但是如果不是 3 个的话, 就会出现问题.
  // 比如 data[2] 就会是 undefined. 对 undefined 进行位操作会被当成 0, 所以多出来的字母肯定会有一个 0.
  // 再根据 Base64 的规则, 加上相应的等号
  if (startPoint - data.length === 1) {
    // 说明 % 3 余 2, 简单的算一下就知道咯.
    base64.pop()
    base64.push('=')
  } else if (startPoint - data.length === 2) {
    base64.pop()
    base64.pop()
    base64.push('==')
  }
  return base64.join('')
}
```

需要注意的是那个循环. 所以我们知道要分辨能不能整除 3. 但是, 仔细想一下, 我用 3, 4, 5 作为 🌰 的话, 就能看出来.
3 的时候, 从 0 开始, 最后跳出循环的 startPoint 就等于 3. 所以没有任何需要另外处理的情况.
4 的时候, 就会在 6 结束, 这个时候 6 - 4 等于 2, 所以需要补两个字节. 但是因为我的 `threeToFour` 函数没有专门处理这种情况, 最后总会返回 4 个字符, 所以我们需要将多出来的字节替换成 =. 当然, 你也可以使用 splice 做到一次完成这种操作.
5 的时候和上面相似.

最后这就是整个代码的实现咯. 不得不说, 对于那种需要频繁增加减少的操作, 我还是喜欢用数组, 然后 `join` 起来. 不过, 浏览器对于 += 运算符应该是做了大量的优化的, 所以到底哪个性能高, 我还真的不确定……

**Update: ** 现代浏览器针对 `+=` 有客观的优化，虽然还有一些细节上的区分，不过基本上不超过几百万字节的话，+= 是更快的。但是因为这里还需要修改最后的字符串，需要再复制一下，这个可能会带来不必要的性能损耗。

### 总结

这种题目整个做出来, 对于自己的思维还是很有锻炼的. 虽然, 不可能一次就能编对, 特别是那个位操作的一段很容易出现问题, 这个时候一定要保持冷静才行.
