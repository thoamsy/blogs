---
title: git 常见操作
date: 2018-08-12
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

`git commit --amend`, 用于修改上一次的提交记录（类似于 `git rebase -i` 的子功能）。不过需要注意的是，因为这个会修改 commit 的 SHA，如果之前改动之前已经将 repo 推到了 remote repo，就必须要先 `git pull` 然后再 `git push`, 这样反而拜拜增加了两个没用的 commit log. 除非远程仓库没有开启*分支保护*功能，这样就可以使用 `git push -f` 来覆盖远程分支。在使用 -f 的时候，请保证这个分支没有其他人同时在修改。
