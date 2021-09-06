---
title: '现代生活下的隐私问题(WIP)'
date: '2021-03-26'
excerpt: '个人视角看看当代隐私，iOS 14 如何改进了隐私'
image: https://images.unsplash.com/photo-1533895328642-8035bacd565a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDIyNzR8MHwxfHNlYXJjaHw3fHxwcml2YWN5fGVufDB8fHx8MTYxNzQ1NDkyMw&ixlib=rb-1.2.1&q=80&w=1080
---

![](https://images.unsplash.com/photo-1533895328642-8035bacd565a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDIyNzR8MHwxfHNlYXJjaHw3fHxwcml2YWN5fGVufDB8fHx8MTYxNzQ1NDkyMw&ixlib=rb-1.2.1&q=80&w=1080)

如果要讨论隐私，不得不谈起一个广为人知的都市传说：

> 我刚和朋友聊到 XXX，为什么淘宝就给我推荐了 XXX，是不是这些软件在偷听？

这段话我们可以分别从技术侧，叙事者侧来分析

首先从叙事者侧来看，这个「聊到 XXX」并不够精确，它没有说明聊到是仅仅聊到，还是也通过某个 app 搜索过。而搜索这个行为除了被 app 方记录外，还可能被第三方输入法记录。

所以，很难判断导致导致数据泄露的到底是谁。

而从技术侧判断的话，一个 24 小时不间断监听的 app 是不可能存在的，这里有几个技术问题：

1. app 权限
2. 耗电量
3. 数据上传所需要消耗的网络带宽

从第一点来看，手机操作系统针对有后台录音权限的 app 都会有提示，Android 可以在 app 管理界面知道它是否有这个权限，iOS 虽然没有询问这个权限，但是从 iOS 14 开始会在右上角的状态栏展示一个黄色的点来通知用户。但目前从来没有任何媒体报道过 淘宝等 app 会不停的使用权限

耗电量就很好判断了，它要录音，那么一定会在加速消耗你的手机电量，并且可以在电量管理里看到它的排名一定是遥遥领先的

第三点就说明除了录音之外， app 还要将录音的音频数据发送给自家的服务，这个过程自然会发送网络请求。通过技术手段可以检测手机所有发送的请求，并查看有无异常行为。但是从目前的媒体报道来看，也从来没有认识的事情发生。

所以我们可以确定的是，它并没有在录音。那么 app 是怎么做到的呢？下文我不会去猜测具体实现，只是通过 iOS 系统在隐私侧的改进，来让读者自己判断可能的实现原理。

## iOS 14 隐私侧的改进

### 网络

这个版本我们可以看到如果 app 要求本地网络情况，也会被要求向用户授权。正常情况下，一个视频 app 请求本地网络是比较正常的，因为它们会有查找是否有电视，然后投送过去的需求（但事实上，Apple 自己的 AirPlay 也能做到，并且不会要求授权）

但是，我碰到过很多不怎么相关的 app 也要求这种权限。比如微信，炒股软件，得到等。

![IMG_0235](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/A0E6F3FE-61C0-432F-B63C-6FD9F656D547_2)

首先先要明确，获取本地网络到底有什么用？

网络（Wi-Fi 名）其实是个非常隐私的功能，从 iOS 13 开始，当 app 想要知道 Wi-Fi 名的时候，会要求授权定位权限。因为你当的 Wi-Fi 可能会和其他局域网的设备串联起来，比如灯泡，电视，打印机。每个设备也有自己的名字。这些组合往往是唯一的，就可以被 app 用来创建所谓的「位置指纹」

![Image.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/761A771F-47AB-4FB3-8E72-9E2A886FBD02_2)

既然 app 有了你的「位置指纹」，一些场景的出现就不奇怪了。你的闺蜜到你家来，连上了 Wi-Fi，然后用淘宝搜索了 XXX 商品，并且和你提到这个让你看看。虽然你不感兴趣，可是接着你打开淘宝的时候，发现它也给你推荐了。

![IMG_0227](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/06650A90-B9EC-4237-B3D7-9B4561363888_2)

这就是本地网络带来的神奇体验（淘宝 app 本身并没有要求这个权限，说明它并不是用这个方式的）

为了解决这个问题，iOS 14 推出了 「私有地址」的功能。这里的地址是 Mac 地址，简单来说就是 iPhone Wi-Fi 芯片的 ID（基本认为唯一）。因为这个是 唯一的，所以 app 就可以用 Mac 地址作为你的身份来完成上面的最终，并指导你从家里来到了机场。

![IMG_4420.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/CC01F76C-7776-4710-B371-345DDDB71D88_2)

打开这个功能后，你就会得到

1. 每个 Wi-Fi 一个专门的地址
2. 每天都会更新

的 Mac 地址，这样当我们的手机从家里到机场，两个 Wi-Fi 对应的是两个 ID，就无法被 app 对应上，以为是不同的用户了。

![765FF47D-FA4A-42B7-A64C-975488FD5D29_1_105_c.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/0798C8E3-5363-483C-90DC-780E57CD228B_2)

[Support local network privacy in your app - WWDC 2020 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2020/10110/)

### 剪贴板

读取剪贴板一开始的目的只是为了提升用户体验，比如如果 银行 app 发现你剪贴板里有卡号的话，就会问你是不是要转账。但是又因为剪贴板复制的内容往往是和用户个人的喜好，社交高度相关的，所以做一定的分析可以让广告商更加熟悉你。而这才是最大的隐患

![B661B863-7627-41E2-A63B-1E337B8F8579_1_105_c.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/7520F75C-FA5C-4516-820F-366EE81B376C_2)

直到 iOS 14 对 app 的读取做了一个 Banner 提示，并在去年 TikTok 那段不停调用剪贴板的事情出来后，得到了非常大的扩散。

![AnimatedImage.gif](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/2D724DFC-86BE-4E46-9B30-73A56DD5C660_2)

除了在编辑的时候通过调用剪贴板来反作弊外，更常见的常见是 app 每次进入前台都会读取

![AnimatedImage.gif](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/48307CCD-6DFB-4B4E-BD8C-280585778DE7_2)

这才让很多其他厂商跟进，并克制的使用 剪贴板。比如

1. 微信会提醒用户该小程序在使用剪贴版
2. 金融类 app 以剪贴板来做便捷服务的，也支持关闭功能

### 通讯录

国内用户可能普遍对通讯录不会太敏感，因为通讯录可能就没几个人，大部分关系还是在 Wechat 中。但是只要我们还是会在通讯录中记录自己最亲近的人的号码，再配合国内手机号基本可以作为唯一 ID 的国情，也间接能确定关系网。

另外，之前 Clubhouse 大火的时候，就有人匹配过为了获得 2 个邀请码，还要开启通讯录权限，再加上 Clubhouse 的服务提供商有中国公司，难免让人联想。不过 iOS 也是存在一个 API 可以不访问权限让用户选择联系人，而 app 只能拿到这选中的几个联系人。

### 定位

定位权限的目的是很敏感的，因为这不仅可能知道你是不是「五环外人群」，还可能会对现实生活带来影响。在 iOS 13 中，一个 app 如果在后台多次访问位置，系统也会多次警告，以保证用户是默许的。

这还没完，在 iOS 14 中又新增了两个：

1. 一次性授权
2. 模糊定位

第一个就是每次需要的时候才问你权限，这样的好处是防止 app 在你不知情的情况下报告后台，第二个则会将你的地理位置从 某个区某个街道的某个地方这么具体的信息，精简成「某个区」而已

![909034C4-56EE-4672-89E7-9C879AFDBDF8_1_105_c.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/DD54EBD3-BAE1-4C39-9845-C9BCA4567B20_2)

![2A95DF89-C723-4875-91FF-B047C8D27FBA_1_105_c.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/C3DB919E-944A-4237-B916-2BD861DFB2EC_2)

比如有一次微信在询问我的位置的时候，我一旦关闭「精确位置」，它基本只知道我在南山区。

### 相册

相册也是一个非常重要的事情。想想很多 app，你用它只是为了存美图，表情包，从来不需要 app 读取你的相册。可是 iOS 14 之前并不能区分，所以相当于你为了存图片，就将你整个相册暴露出去了。

针对这种问题，iOS 14 Apple 推出了两个解决方案

1. 新的开发 API，不需要权限就可以获取用户的相册，而 app 只能获取用户选中的照片而不能读取所有
2. 支持 「只写」模式和允许用户编辑 app 「可见」的照片

第一种方式仅仅是 Picker，也就是提供更加安全的 Read 模式。

![Image.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/0C531102-6342-4498-A9BD-E72F16B8CC72_2)

而第二种则是限制了 app Read 的范围。

![4AFBF624-9BD6-4BCB-9D5E-0A1D45C330E6_1_105_c.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/B3F02F6B-CB7D-4CF0-BAAA-6D26FB8F11D1_2)

不过目前，除了 Apple 自己的 app，我还没看到任何第三方 app 适配了这几个能力。

### 录音和摄像

上面提到过，iOS 14 针对后台录音的 app 会在::状态栏上给出提示::，那么这里就是具体的说明

![IMG_0224](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/EDFB6B0A-C5BC-4F98-BCD7-FCF701819056_2)

![IMG_0225](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/A45373B0-D187-4E5D-9009-665462F4506C_2)

![DA19EB5B-ABBD-4388-B4B5-4D95A4E91121_1_105_c.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/B1E5D821-FE7D-4F01-AF7D-5C830E5ECAD2_2)

所以我们可以再一次确信，会录音的 app 不存在

### 授权改进

虽然 iOS 14 带来了这么多隐私上的保护，但这会不会导致整个 app 很难用呢？面对刚使用 app 就要授予地理位置，相册，联系人等等权限难免让人反感。

![5619F83D-6F2F-42B6-B209-6E324F9BFE35_1_105_c.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/2AC1526D-79B4-4F66-9C75-AE87A9B148E8_2)

除了上面提到的 Photo Picker 和 Contact Picker 可以解决授权的问题外，iOS 14 还强化了原生文本框的补全能力，做到让输入法可以给出自动补全建议，而不需要 app 去授权

![IMG_0229.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/90E746C8-68B6-41D5-AC37-DFFCC680B9B5_2)

### 广告跟踪

![Image.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/962D9A81-C8DA-4CD5-851F-25D02A845343_2)

![Image.jpeg](https://res.craft.do/user/full/dce9cd09-2842-d735-16b8-e0f864aa4503/doc/611434DC-1543-46DE-B203-49334F0A674C/9645AC05-A779-4AFC-A8EA-32AAB60D0ECA_2)

TODO

## 我们能做什么

### 输入法

### 搜索引擎

### 自动化

如果你实在担心剪贴板被滥用，那么可以通过 iOS 自带的 Shortcut，在每个 app 被打开之前都清空剪贴板。

## 参考文献

[全局剪贴板：隐私的照妖镜 - 少数派](https://sspai.com/post/61210)
