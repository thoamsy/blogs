---
title: Shuffle 算法
date: 2019-07-29
spoiler: 随机算法的基本实现
---

> 这篇文章其实在大学的时候就写好了, 不过今天突然忘记怎么写, 就重新看了一遍, 然后调整了一下.

虽然以前一直知道如何写一个随机数算法，但是从来不知道从理论上为什么能证明这个.
直到看了 [WiKi 的介绍](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)，终于明白了原因。

## 算法起源

这个算法的刚开始的起源是在 1938 年，也就是说早于**第一台计算机**问世的时间。而它的思路是这样的：

1. 刚开始整个数组都是未标记状态，记未标记的个数为 k
2. 随机选一个在 1…k 的范围的数 n，从左往右找到第 n 为未标记的数。
3. 将这个数标记，放入随机序列中。k -= 1
4. 重复第二步，直到全部被标记为止

通过这段代码的描述我们可以确定，肯定不会生成重复的随机数。因为一个数只被使用一次。但是为了减少对 k 的计算，于是我们平时常见的算法都是，**通过交换将标记的数放在尾部**

## 现代方法

一个常见的算法是下面这个样子.

```
for i in n - 1 down to 1:
	j = rand(i)
	swap(arr[i], arr[j])
}
```

可以这样看这个算法。j 的值就是相当于上面算法的第二步，而显然 arr[j] 就是将要找到的那个数。因为 i 也是从尾部开始递减的，所以说，可以通过交换将这个被选取出来的数字和尾部交换，这样相当于将被标记的数字放到了尾部。之后 i 的递减直接帮我们完成了第三步的过程。所以这个算法不会产生重复的。
值得注意的是, 我们不是从 n - 1 到 0 而是 1, 因为最后最后一个数不需要再调整了.

这里还有另外一种形式的，只不过 i 是递增的.

```
let arr
for i in 0 to n - 2:
	j = rand(i, n)
	swap(arr[i], arr[j])
```

但是这个算法是 mutate 的，也就说会直接修改数组。虽然**immutable**的算法也能直接通过上面的方法实现，但是可以通过一点小小的优化来将 swap 的三次赋值改成两次, 这种优化和插入排序的优化非常类似(其实我个人觉得没啥必要啦, 用解构赋值就行 🌚)

```
let suffled = arr
for i from n - 1 down to 1:
	j = rand(i)
	if i != j
		suffled[i] = suffled[j]
  	suffled[j] = arr[i]
```

## JS 实现

我们可以调一个简单的例子来实现最终的 JS 版本代码

```javascript
function shuffle(array) {
  let copy = array.slice();
  let lower = 0;
  for (let i = copy.length - 1; i >= 1; i -= 1) {
    let upper = i;
    // 加 1 是因为, 要能取到 upper - lower
    let j = ~~(Math.random() * (upper - lower + 1)) + lower;
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
```

值得一提的是, 大学的时候好像看过上面的随机数方法不能在让 `[lower,upper]` 在概率上的分布是一样的, 但是具体的做法我忘记了. [计算机程序设计艺术 卷 2：半数值算法](http://www.ituring.com.cn/book/987) 可能描述了更为正确的方式
