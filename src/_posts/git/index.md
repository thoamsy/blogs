---
title: The Junior Git
date: '2018-08-12'
---

因为 Git 的操作实在太多，但是有些操作在很多时候又很重要，所以写一篇文章记录一下那些容易被忽略, 又较为常用的命令。

**git 是饭桶的意思，因为 Linus 的自嘲**

## git init

`git init [directory]`：指定文件夹创建，这样就不需要先 `cd` 再 `git init`

`git init --bare`: 创建一个只能做查看记录，拉代码，不能编辑的 git 工作区，一般用于发布分支，或者一个中心化的仓库。如果观察这个文件夹的结构的话，会发现，它们直接将 `.git` 文件夹的内容，**平铺开来**，放置于根目录。

## git clone

`git clone --depth=1 repo` 可以指定 clone 下来的仓库的提交数。对于临时改一些代码，不关心历史提交的情况下，这个命令大大减少了 clone 的时间

`git clone --branch=foo repo` 只拉取某一个分支。如果想学习开源项目，只关心 master 下的记录，这个命令是个不错的选择。

## git config

这里需要关注的命令不多，有一个值得注意的概念：`git config --global` 会将配置存与 `~/.gitconfig` 路径下，而默认操作(--local) 将配置保存在 `./.git/config` 下

`git config --global alias.[xxx] yyy` 这个命令可以通过输入 `git xxx` 来取代 `git yyy`。

## git add

`git add --all` 将所有的改动全部添加到缓存区， 包括没有被 tracked 的

`git add -i` 一个交互式的添加操作，不是那么的常用。而且子命令太多了，完全搞不懂是干嘛的

## git commit

`git commit --amend`, 用于修改上一次的提交记录（类似于 `git rebase -i` 的子功能）。不过需要注意的是，因为这个会修改 commit 的 SHA.

如果之前改动之前已经将 repo 推到了 remote repo，就必须要先 `git pull` 然后再 `git push`, 这样反而拜拜增加了两个没用的 commit log. 除非远程仓库没有开启*分支保护*功能，这样就可以使用 `git push -f` 来覆盖远程分支。在使用 -f 的时候，请保证这个分支没有其他人同时在修改。

## git stash

算是切分支神器。工作中我经常遇到手头在解决某个事情的时候，突然碰到突如其来的情况需要紧急处理，但是手头上的工作又不适合做一个 commit 的话，就可以用到这个它。

`git stash apply` 相比 `git stash pop` 的区别是，它再使用后仍然会存在于 `stash list` 中，可以用于其他的分支。就有点像 Stack 中，直接取 Stack Top 和 Pop 后取返回值的区别。

`git stash` 只会 stash 被 _tracked or added_ 的文件。可以使用 `git stash -u` 将未被 track 的文件。`git stash -a` 会添加当前被修改的所有的文件，包括在 ignore 下的。

`git stash save [message]` 和直接 stash 不同，如果直接使用 `git stash` ，这次 stash 的名字会直接以当前最新的提交的 title 来命名。这样可能会有些困惑，因为并没有描述清楚这个 stash 到底做了什么。这在一段时间后，可能就懵逼咯。所以可以使用这个命令添加描述性的标题

`git stash pop [index]` 添加 index 就不需要按照 stack 的顺序来选择 stash。而 index 的值可以对应 `git stash list` 下的 _stash@{n}_

`git shash show [-p] [index]` 仅仅看到列表还不够，还需要看到某个 stash 到底改变了什么。就可以使用这个命令，其他添加 -p 选项，可以获得和 git diff 一样更为全面的信息。

`git stash -p` 这个命令和 `git stash -p` 很像，很针对每一个文件的每一个 chunk 来提问，是否需要被 stash。算是为完美主义者准备的工具吧，无聊的时候可以试一下，反正我是头晕。

![](./stash-p.png)

`git stash branch <branch-name> [stash]` 为了防止有些时候一旦 pop 了某个 stash，导致冲突的话，可以通过将这个 stash 应用在一个新的分支来缓解问题。

## git log

`git log --stat` 用于显示某次 commit，针对一个文件行数的增加和减少，文件名的修改情况。
`git log -p` 会显示某次 commit 的 diff 状态
`git log --author=<name>` 快速过滤某个 author 的提交次数
`git log -n<count>` 显示最近 count 个提交

## git tag

Git 中有两种 tag：_annotated and lightweight tags_
前者会包括一些注释信息，来进一步解释这个 tag 的作用，而后者就仅仅只是一个 tag 的名字。

`git tag <name>` 会创建一个 lightweight tag

`git tag -a <name>` 则会创建一个 annotated tag，之后会弹出 git 默认的编辑器，用于描述注释

`git tag list -l <pattern>` 通过 pattern 过滤 tag list

`git tag -d <tagname>` 删除 tag

`git tag -f [other]` replace 一个 tag 以其相关信息

同时，还可以 checkout 某个 tag，但这其实相当于跳转到创建该 tag 的 commit 上，进入 _detached HEAD state_。这个时候最好不要修改代码，或者先创建新分支
