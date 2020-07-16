---
title: githug
date: 2020-03-10 17:29:30
tags:
    - git
    - githug
cover: https://images.pexels.com/photos/3756659/pexels-photo-3756659.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---


githug 是一个可以快速熟悉git基本命令的一个小游戏, 初学者可以通过这个小游戏快速上手git

[github链接戳这里][0]

### 1. init


> Name: init
Level: 1
Difficulty: *

> A new directory, `git_hug`, has been created; initialize an empty repository in it.
 新的目录git_hug已经创建； 在其中初始化一个空的存储库。


初始化一个Git仓库， 命令：
`git init `

该命令将创建一个名为 .git 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是 Git 仓库的骨干。
.git 是一个隐藏文件， 可以使用 `ls -a` 查看

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtdfbdbtmj31q209i7a3.jpg)

### 2. config

> Name: config
Level: 2
Difficulty: *

> Set up your git name and email, this is important so that your commits can be identified.
 设置您的git名称和电子邮件，这一点很重要，以便可以识别您的提交。


设置用户名和邮箱地址之后，以后每一次提交都会使用设置的用户信息， 这样可以方便以后查找代码是谁提交的

```
git config --global user.name "name" // 设置名称
git config --global user.email "email"  // 设置邮箱
git config user.name // 查看名称
git config user.email // 查看邮箱

```

使用`git config -l` 可以查看所有的用户配置


### 3. add

> Name: add
Level: 3
Difficulty: *

> There is a file in your folder called `README`, you should add it to your staging area
Note: You start each level with a new repo. Don't look for files from the previous one.
文件夹中有一个名为“ README”的文件，应将其添加到暂存区中
注意：您可以从一个新的仓库开始每个级别。 不要查找上一个文件。

<br/>
在git中， 分为三个区： 工作区， 暂存区 和 版本库

1. 工作区： 我们直接编辑的地方
2. 暂存区： 数据暂时存放的地方， 可用于工作区和版本库之间的交流
3. 版本库： 存放已经提交的数据

三个区之间的关系： (此图来自[https://blog.csdn.net/qq_32452623/article/details/78417609][1])
![](https://raw.githubusercontent.com/DRPrincess/BlogImages/master/qiniu/2429e4d2661e60027537aea0077f6e40.png)

`git add` 命令的作用就是讲本地工作区的内容添加至暂存区


```
git add -A     提交所有修改
git add .      提交新文件和被修改文件，不包括被删除文件
git add -u     提交被修改和被删除文件，不包括新文件
```

所以本题使用上述三个命令均可

### 4.commit

> Name: commit
Level: 4
Difficulty: *

> The `README` file has been added to your staging area, now commit it.
`README`文件已添加到您的暂存区，现在提交。


```
git commit -m '我是提交文案'
```

### 5. clone

> Name: clone
Level: 5
Difficulty: *

> Clone the repository at https://github.com/Gazler/cloneme.
克隆存储库，网址为https://github.com/Gazler/cloneme。

我们在进行开发时， 需要把远程仓库克隆到本地， 在本地进行开发， 就可以使用 `git clone` 命令，

```
git clone https://github.com/Gazler/cloneme
```

这样会将 https://github.com/Gazler/cloneme 这个远程仓库克隆至当前文件夹， 名称为 cloneme


### 6. clone_to_folder

> Name: clone_to_folder
Level: 6
Difficulty: *

> Clone the repository at https://github.com/Gazler/cloneme to `my_cloned_repo`.
将位于https://github.com/Gazler/cloneme的存储库克隆到`my_cloned_repo`。

```
git clone https://github.com/Gazler/cloneme my_cloned_repo
```
将远程仓库克隆到某一特定文件夹， 直接在仓库地址后面添加文件夹名称即可。

### 7. ignore

> Name: ignore
Level: 7
Difficulty: **

> The text editor 'vim' creates files ending in `.swp` (swap files) for all files that are currently open.  We don't want them creeping into the repository.  Make this repository ignore those swap files which are ending in `.swp`.
文本编辑器'vim'为当前打开的所有文件创建以`.swp`结尾的文件（交换文件）。 我们不希望它们爬行到存储库中。 使此存储库忽略那些以`.swp`结尾的交换文件。

.ignore 文件放在项目的根目录下， 用来配置可忽略文件

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtdh9h8h0j31360fc75u.jpg)

### 8. include

>Name: include
Level: 8
Difficulty: **

>Notice a few files with the '.a' extension.  We want git to ignore all but the 'lib.a' file.
注意一些扩展名为“ .a”的文件, 我们希望git忽略所有除'lib.a'外所有'.a'的文件。

如图：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtdhuly4kj31bk0gmabx.jpg)


### 9. status

>Name: status
Level: 9
Difficulty: *

>There are some files in this repository, one of the files is untracked, which file is it?
此存储库中有一些文件，其中一个文件未跟踪，它是哪个文件？

使用 `git status` 命令可以查看文件的状态， 如下图

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtdi9roycj31e60u0n4y.jpg)


还可以使用 `git status -s ` 查看简写状态。
在简写状态下一般用到的几种情况：  `M - 被修改，A - 被添加，D - 被删除，R - 重命名，?? - 未被跟踪 `

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtdiprhvij319e0dsdin.jpg)

### 10. number_of_files_committed

>Name: number_of_files_committed
Level: 10
Difficulty: *

>There are some files in this repository, how many of the files will be committed?
此存储库中有一些文件，将提交多少个文件？

这个题目还是可以使用 `git status` 进行查看， 但是注意的是， 只有已经被暂存过的文件才会被提交哦

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtdjbueovj319q0u07m1.jpg)

### 11. rm

>Name: rm
Level: 11
Difficulty: **

>A file has been removed from the working tree, however the file was not removed from the repository.  Find out what this file was and remove it.
文件已从工作树中删除，但是该文件未从存储库中删除。 找出此文件是什么并将其删除。

`git rm` 可以同时从工作区和索引中删除文件， 删除后，git将不会继续追踪到该文件, 效果有点类似 `.gitignore`文件. 但是 一个文件如果已经存在在远程仓库， 设置 `.gitignore` 后将不会生效， 此时可以通过 `git rm` 将该文件移除

![](https://tva1.sinaimg.cn/large/00831rSTly1gdmgpfl62kj30pq0esjtz.jpg)

### 12. rm_cached
>Name: rm_cached
Level: 12
Difficulty: **

>A file has accidentally been added to your staging area, find out which file and remove it from the staging area.  *NOTE* Do not remove the file from the file system, only from git.
意外将文件添加到了暂存区域，找出了哪个文件并将其从暂存区域中删除。 *注意*不要仅从git中将文件从文件系统中删除。

`git rm --cached` 可以从索引删除此文件， 但是本地文件还在， 只是这个文件不会再被git追踪

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtaqqw2bpj30v20k0417.jpg)

### 13. stash

>Name: stash
Level: 13
Difficulty: **

>You've made some changes and want to work on them later. You should save them, but don't commit them.
您进行了一些更改，并希望稍后进行处理。 您应该保存它们，但不要提交它们。

`git stash` 命令可以将本地的改动储存到暂存区， 常用命令：

1. `git stash list`: 查看stash了哪些存储
2. `git stash show`: 显示一个存储做了哪些改动，默认展示第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}
3. `git stash apply`: 应用某一个存储， 应用后不会删除， 默认应用第一个存储， 如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash apply stash@{1}
4. `git stash drop`: 删除某一个存储
5. `git stash clear`: 删除所有缓存的stash

解题过程：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtau0mk33j30uw0c80va.jpg)


### 14. rename

>Name: rename
Level: 14
Difficulty: ***

>We have a file called `oldfile.txt`. We want to rename it to `newfile.txt` and stage this change.
我们有一个名为“ oldfile.txt”的文件。 我们想将其重命名为`newfile.txt`并进行此更改。

`git mv oldfile.txt newfile.txt`


### 15. restructure

>Name: restructure
Level: 15
Difficulty: ***

>You added some files to your repository, but now realize that your project needs to be restructured.  Make a new folder named `src` and using Git move all of the .html files into this folder.
您将一些文件添加到了存储库中，但是现在意识到您的项目需要进行重组。 新建一个名为src的文件夹，然后使用Git将所有.html文件移动到该文件夹中。

git mv 不仅可以用来给文件重命名， 也可以用来移动文件

`mkdir src && git mv *.html src`


### 16. log

>Name: log
Level: 16
Difficulty: **

>You will be asked for the hash of most recent commit.  You will need to investigate the logs of the repository for this.
系统将要求您提供最新提交的哈希值。 您将需要为此调查存储库的日志。

使用 `git log` 可以查看提交记录

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvqbrfvmrj31iq0dsqbd.jpg)

### 17. tag

>Name: tag
Level: 17
Difficulty: **

>We have a git repo and we want to tag the current commit with `new_tag`.
我们有一个git repo，我们想用`new_tag`标记当前提交。

可以使用`git tag` 命令给某一次提交打上标签

```
git tag new_tag
```

### 18.push_tags

>Name: push_tags
Level: 18
Difficulty: **

>There are tags in the repository that aren't pushed into remote repository. Push them now.
存储库中有一些标签未推送到远程存储库中。 现在推送他们。

默认情况下，`git push` 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。

推送某一个tag: `git push [orign]  [tag name]`

推送所有tag: `git push [orign] --tags`

使用 `git tag -l`可以查看所有的tag列表


### 19. commit_amend

>Name: commit_amend
Level: 19
Difficulty: **

>The `README` file has been committed, but it looks like the file `forgotten_file.rb` was missing from the commit.  Add the file and amend your previous commit to include it.
“ README”文件已提交，但是提交似乎缺少“ forgotten_file.rb”文件。 添加文件并修改您先前的提交以包括它。

`git commit --amend` 可以对上次的提交进行修改

解题过程：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtejpglj4j30ts0d676r.jpg)

### 20. commit_in_future

>Name: commit_in_future
Level: 20
Difficulty: **

>Commit your changes with the future date (e.g. tomorrow).
在将来的日期（例如明天）提交更改。

`git commit`命令可以设置提交时间。
使用方法为：`git commit --date="Apr 15 10:05:20 2020 +0800" -m "提交"`


各个月份的简称， 就不需要再去百度了

|  月份   |  全称      | 简称   |
| :---:  |  :---:     | :---: |
| 一月    | January    | Jan   |
| 一月    | January    | Jan   |
| 二月    | February   | Feb   |
| 三月    | March      | Mar   |
| 四月    | April      | Apr   |
| 五月    | May        | May   |
| 六月    | June       | Jun   |
| 七月    | July       | Jul   |
| 八月    | August     | Aug   |
| 九月    | September  | Sep   |
| 十月    | October    | Oct   |
| 十一月  | November   | Nov   |
| 十二月  | December   | Dec   |

解题过程：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtetks1fej31020e6n48.jpg)

### 21.reset

>Name: reset
Level: 21
Difficulty: **

>There are two files to be committed.  The goal was to add each file as a separate commit, however both were added by accident.  Unstage the file `to_commit_second.rb` using the reset command (don't commit anything).
有两个要提交的文件。 目标是将每个文件添加为单独的提交，但是这两个文件都是偶然添加的。 使用reset命令取消暂存文件“ to_commit_second.rb”（不要提交任何内容）。

`git reset [filename]`取消暂存的某一个文件
解题过程：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtfejoozyj30ww0gun02.jpg)


### 22. reset_soft

>Name: reset_soft
Level: 22
Difficulty: **

>You committed too soon. Now you want to undo the last commit, while keeping the index.
您提交得太快了。 现在，您要撤消上一次提交，同时保留索引。

使用 `git reset` 命令可以提交回滚，代码不变，会退到某个未提交的状态
`git reset --soft head~1`，1表示回退1个版本 ， 2 表示回退2个版本
`git reset —soft [commitid]`  回退到某一次提交

解题过程：`git reset --soft HEAD~`


### 23. checkout_file

>Name: checkout_file
Level: 23
Difficulty: ***

>A file has been modified, but you don't want to keep the modification.  Checkout the `config.rb` file from the last commit.
文件已被修改，但是您不想保留修改。 从最后一次提交中检出`config.rb`文件。

`git checkout -- [filename]` 可以从远程终端检出该文件

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtfn56iv4j30pi0bajtk.jpg)

### 24. remote

>Name: remote
Level: 24
Difficulty: **

>This project has a remote repository.  Identify it.
该项目具有远程存储库。 识别它。

`git remote` 命令可以识别远程仓库


### 25. remote_url

>Name: remote_url
Level: 25
Difficulty: **

>The remote repositories have a url associated to them.  Please enter the url of remote_location.
远程存储库具有与之关联的URL。 请输入remote_location的网址。

`git remote -v` 可以列出远程仓库的详细信息

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdtgggfkd4j30s6058adc.jpg)

### 26. pull

>Name: pull
Level: 26
Difficulty: **

>You need to pull changes from your origin repository.
您需要从原始存储库中提取更改。

`git pull` 命令从远程仓库拉取代码
```
git pull origin master
```

### 27. remote_add

>Name: remote_add
Level: 27
Difficulty: **

>Add a remote repository called `origin` with the url https://github.com/githug/githug
添加一个名为`origin`的远程存储库 URL为 https://github.com/githug/githug

`git remote add ` 添加远程存储库url

解题过程：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdug2lg4vej30ym048aav.jpg)

### 28. push

>Name: push
Level: 28
Difficulty: ***

>Your local master branch has diverged from the remote origin/master branch. Rebase your commit onto origin/master and push it to remote.
您的本地master分支与远程Origin / master分支不同。 将您的提交重新分配到原始服务器/主服务器，并将其推送到远程。

`git push`命令把本地改动推送到远程分支

解题过程：
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdulxgpqzbj30zc0dqacr.jpg)

### 29 diff

>Name: diff
Level: 29
Difficulty: **

>There have been modifications to the `app.rb` file since your last commit.  Find out which line has changed.
自上次提交以来，已经对`app.rb`文件进行了修改。 找出哪一行已更改。

`git diff` 可以查看改动历史， 如图：

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdum8k07uqj30og0eswft.jpg)

@@ -23，7  +23，7  显示出的是 从 23行开始往下的7行，  列出的是修改哪行的数据以及他的前三行和后三行， 所以真正修改的是第26行， 红色字体为修改前的内容，  绿色字体是修改后的内容， 所以本题目中更改的是第 26 行


### 30. blame

>Name: blame
Level: 30
Difficulty: **

>Someone has put a password inside the file `config.rb` find out who it was.
有人在文件config.rb中放入了密码，以查明是谁。

`git blame [filename]`  显示文件的每一行最后修改的版本和作者

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdumctkxtrj311q0hqwis.jpg)

### 31. branch

>Name: branch
Level: 31
Difficulty: *

>You want to work on a piece of code that has the potential to break things, create the branch test_code.
您想处理一段可能破坏事情的代码，创建分支test_code。

`git branch [branchName]` 创建新分支


解题过程
```
git branch test_code
```

### 32. checkout

>Name: checkout
Level: 32
Difficulty: **

>Create and switch to a new branch called my_branch.  You will need to create a branch like you did in the previous level.
创建并切换到名为my_branch的新分支。 您将需要像在上一个级别中一样创建一个分支。

`git checkout [branch]`  检出远程分支

解题过程：
```
git branch my_branch && git checkout my_branch
```

### 33. checkout_tag

>Name: checkout_tag
Level: 33
Difficulty: **

>You need to fix a bug in the version 1.2 of your app. Checkout the tag `v1.2`.
您需要修复应用程序1.2版中的错误。 检出标签“ v1.2”。

```
git checkout v1.2
```

### 34. checkout_tag_over_branch

>Name: checkout_tag_over_branch
Level: 34
Difficulty: **

>You need to fix a bug in the version 1.2 of your app. Checkout the tag `v1.2` (Note: There is also a branch named `v1.2`).
您需要修复应用程序1.2版中的错误。 签出标签“ v1.2”（注意：还有一个名为“ v1.2”的分支）。

当branch和tag名字相同的时候， 使用`git checkout`会默认拉取branch

```
git checkout tags/v1.2
```

### 35. branch_at

>Name: branch_at
Level: 35
Difficulty: ***

>You forgot to branch at the previous commit and made a commit on top of it. Create branch test_branch at the commit before the last.
您忘记了在上一次提交时分支，并在其上进行了一次提交。 在最后一次提交之前在创建分支test_branch。


解题过程：
```
git log
git checkout 1a69e30584157371bced55ad836c5adf727db2f8
git branch test_branch && git checkout test_branch
```

或者
```
git log
git branch test_branch 1a69e30584157371bced55ad836c5adf727db2f8
```

### 36. delete_branch

>Name: delete_branch
Level: 36
Difficulty: **

>You have created too many branches for your project. There is an old branch in your repo called 'delete_me', you should delete it.
您为项目创建了太多分支。 您的存储库中有一个名为“ delete_me”的旧分支，应将其删除。

删除本地分支  `git branch -d [branchname]`
删除远程分支  `git push origin --delete [branchname]`

```
git branch -d delete_me
```

### 37 .push_branch

>Name: push_branch
Level: 37
Difficulty: **

>You've made some changes to a local branch and want to share it, but aren't yet ready to merge it with the 'master' branch.  Push only 'test_branch' to the remote repository
您已经对本地分支进行了一些更改并希望共享它，但尚未准备好将其与“ master”分支合并。 仅将“ test_branch”推送到远程存储库

```
 git push origin test_branch
```

### 38. merge

>Name: merge
Level: 38
Difficulty: **

>We have a file in the branch 'feature'; Let's merge it to the master branch.
我们在“feature”分支中有一个文件； 让我们将其合并到master分支。

```
 git merge feature
```

### 39. fetch

>Name: fetch
Level: 39
Difficulty: **

>Looks like a new branch was pushed into our remote repository. Get the changes without merging them with the local repository
好像有一个新的分支被推送到我们的远程存储库中。 无需将更改与本地存储库合并即可获取更改


`git fetch`是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。
而`git pull` 则是将远程主机的最新内容拉下来后直接合并，即：git pull = git fetch + git merge，这样可能会产生冲突，需要手动解决。


### 40 rebase

>Name: rebase
Level: 40
Difficulty: **

>We are using a git rebase workflow and the feature branch is ready to go into master. Let's rebase the feature branch onto our master branch.
我们正在使用git rebase工作流，并且功能分支已准备好进入master。 让我们将Feature分支重新建立到master分支上。

`git log --graph --all` 可以查看所有分支的提交记录

`git rebase [branch]`的原理是：找到两个分支最近的共同祖先，根据当前分支的提交历史生成一系列补丁文件，然后以基地分支最后一个提交为新的提交起始点，应用之前生成的补丁文件，最后形成一个新的合并提交。从而使得变基分支成为基地分支的直接下游。rebase一般被翻译为变基。

`git rebase branchA branchB` 首先会取出branchB，将branchB中的提交放在branchA的顶端，一般branchB为当前分支，可以不指定。

1. git log --graph --all
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvgzg7tgnj30sa0h4ach.jpg)

2. git checkout feature

3. git rebase master

4. git log --graph --all
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvh2cjmz5j30vu0i4mzp.jpg)


### 41.rebase_onto

>Name: rebase_onto
Level: 41
Difficulty: **

>You have created your branch from `wrong_branch` and already made some commits, and you realise that you needed to create your branch from `master`. Rebase your commits onto `master` branch so that you don't have `wrong_branch` commits.
您已经从`wrong_branch`创建了分支，并且已经进行了一些提交，并且您意识到需要从`master`创建分支。 将您的提交重新部署到“ master”分支上，这样就不会出现“ wrong_branch”提交。

`git rebase --onto branchA branchB branchC` 如果要在合并两分支时需要跳过某一分支的提交，可以使用--onto参数。 上面命令的意思为 找出branchB branchC公共祖先之前的提交， 然后放在branchA 分支

通过`git log --graph --all`查看当前的提交记录
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvqdkzd6yj312c0pggxs.jpg)

解决方法：
```
git rebase --onto master wrong_branch
```

### 42. repack

>Name: repack
Level: 42
Difficulty: **

>Optimise how your repository is packaged ensuring that redundant packs are removed.
优化存储库的打包方式，以确保删除冗余包。


`git repack -d`  打包后，如果新创建的包使某些现有包变得多余，删除多余的包。
`git prune-packed` 删除多余的松散对象文件。

解决方法：
```
1. git repack -d
2. git repack && git prune-packed
```

### 43. cherry-pick

>Name: cherry-pick
Level: 43
Difficulty: ***

>Your new feature isn't worth the time and you're going to delete it. But it has one commit that fills in `README` file, and you want this commit to be on the master as well.
您的新功能不值得花时间，您将要删除它。 但是它只有一个提交填充了“ README”文件，因此您也希望该提交也位于主服务器上。

`git cherry-pick`  能够把另一个分支的一个或多个提交复制到当前分支，具体使用如下：

首先git checkout 到另一个分支,然后使用git log找到想要复制的commit 的id,记录下来

切换到自己分支，使用git cherry-pick  [上面记录的commit id]  回车即可!


解题过程：
```
git branch
git checkout new-feature
git log
git checkout master
git cherry-pick ca32a6dac7b6f97975edbe19a4296c2ee7682f68
```
### 44. grep

>Name: grep
Level: 44
Difficulty: **

>Your project's deadline approaches, you should evaluate how many TODOs are left in your code
您的项目的截止日期临近，您应该评估代码中还剩下多少TODO


Git 提供了一个 grep 命令，你可以很方便地从提交历史、工作目录、甚至索引中查找一个字符串或者正则表达式

```
git grep 'TODO'
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvm1eg5lsj30v206mgmd.jpg)

### 45. rename_commit

>Name: rename_commit
Level: 45
Difficulty: ***

>Correct the typo in the message of your first (non-root) commit.
更正第一次（非超级用户）提交消息中的错字。

git log

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvm5w42b0j30sk0isq55.jpg)

git rebase -i 7dce7b3bee2349d7550ebfd1cc9a27885f52f5eb

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvm7jfv5gj30t80jo786.jpg)

将第一行的 pick 改成 reword， 不要改动后面的内容，保存退出后， 弹出新的弹框， 修改上面的提交信息

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvm7yzdsoj30tg0g4go4.jpg)

### 46.squash

>Name: squash
Level: 46
Difficulty: ****

>You have committed several times but would like all those changes to be one commit.
您已经提交了几次，但是希望所有这些更改都是一次提交。


1. git rebase -i HEAD~4
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvomcwau2j30xm06aq3z.jpg)
将上面第2，3，4次提交命令前的 pick 命令改成 squash 后提交

2. git log
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvovapbmbj30v80hugns.jpg)


### 47. merge_squash

>Name: merge_squash
Level: 47
Difficulty: ***

>Merge all commits from the long-feature-branch as a single commit.
合并long-feature-branch分支中的所有提交作为单个提交。

```
git branch
git merge long-feature-branch --squash
git commit -m 'commit'
```

### 48. reorder

>Name: reorder
Level: 48
Difficulty: ****

>You have committed several times but in the wrong order. Please reorder your commits.
您已经提交了好几次，但是顺序错误。 请重新排列您的提交。

1. git log
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvp7bptcij30xe0o0779.jpg)

2. 找到需要调整顺序的前一次提交  git rebase -i c7af127f8af20167a49d3a6d9f79400bff56c177

3. 将提交命令按照顺序重新排列
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvpae1vv7j30dc03m74i.jpg)

### 49. bisect

>Name: bisect
Level: 49
Difficulty: ***

>A bug was introduced somewhere along the way.  You know that running `ruby prog.rb 5` should output 15.  You can also run `make test`.  What are the first 7 chars of the hash of the commit that introduced the bug.
在此过程中的某个地方引入了一个错误。 您知道运行`ruby prog.rb 5`应该会输出15。您也可以运行`make test`。 引入该错误的提交的哈希值的前7个字符是什么。

```
git log
git bisect HEAD f60882
make test 运行结果 为正常
git bisect good
git bisect run make test
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvpd9o5o4j31a50u0b2a.jpg)

### 50.stage_lines

>Name: stage_lines
Level: 50
Difficulty: ****

>You've made changes within a single file that belong to two different features, but neither of the changes are yet staged. Stage only the changes belonging to the first feature.
您已经在一个文件中进行了更改，这些更改属于两个不同的功能，但是尚未进行任何暂存。 仅暂存属于第一个功能的更改。

1.git add feature.rb -e
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvpruz3zkj30q80aiwfe.jpg)

将属于第二个功能的更改从命令中删掉即可

### 51. find_old_branch

>Name: find_old_branch
Level: 51
Difficulty: ****

>You have been working on a branch but got distracted by a major issue and forgot the name of it. Switch back to that branch.
您一直在分支机构工作，但因主要问题而分心，却忘记了它的名称。 切换回该分支。

`git reflog` 可以查看分支切换记录
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvpvre121j31dm09g77r.jpg)

### 52. revert

>Name: revert
Level: 52
Difficulty: ****

>You have committed several times but want to undo the middle commit.All commits have been pushed, so you can't change existing history.
您已经提交了几次，但是想撤消中间提交。所有提交均已推送，因此您无法更改现有历史记录。

`git revert` 可以撤销某一次提交

```
git log
git revert f6499cfe949eeeb1b14d5e45d4a308d1dd9e363b
```

### 53.restore

>Name: restore
Level: 53
Difficulty: ****

>You decided to delete your latest commit by running `git reset --hard HEAD^`.  (Not a smart thing to do.)  You then change your mind, and want that commit back.  Restore the deleted commit.
您决定通过运行`git reset --hard HEAD ^`删除最新的提交。 （这不是一件明智的事情。）然后您改变了主意，并希望重新提交。 恢复已删除的提交。


1. 查看提交记录  git reflog
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvq5hnmg0j30r40660tv.jpg)

2. 恢复删掉的提交  git reset --hard e7d0a47

### 54. conflict

>Name: conflict
Level: 54
Difficulty: ****

>You need to merge mybranch into the current branch (master). But there may be some incorrect changes in mybranch which may cause conflicts. Solve any merge-conflicts you come across and finish the merge.
您需要将mybranch合并到当前分支（主节点）中。 但是mybranch中可能存在一些不正确的更改，可能导致冲突。 解决遇到的任何合并冲突并完成合并。

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gdvq29y4foj31eo0g4tom.jpg)


### 55.submodule
>Name: submodule
Level: 55
Difficulty: **

>You want to include the files from the following repo: `https://github.com/jackmaney/githug-include-me` into a the folder `./githug-include-me`. Do this without manually cloning the repo or copying the files from the repo into this repo.
您希望将以下回购中的文件包括在内：https://github.com/jackmaney/githug-include-me到文件夹./githug-include-me中。 无需手动克隆存储库或将文件从存储库复制到此存储库即可。

如果你想把别人的仓库代码作为自己项目一个库来使用，可以采用模块化的思路，把这个库作为模块进行管理。Git 专门提供了相应的工具，用如下命令把第三方仓库作为模块引入：
```
git submodule add https://github.com/jackmaney/githug-include-me
```

### 56.contribute

>Name: contribute
Level: 56
Difficulty: ***

>This is the final level, the goal is to contribute to this repository by making a pull request on GitHub.  Please note that this level is designed to encourage you to add a valid contribution to Githug, not testing your ability to create a pull request.  Contributions that are likely to be accepted are levels, bug fixes and improved documentation.
这是最终级别，目标是通过在GitHub上发出拉取请求为该存储库做出贡献。 请注意，此级别旨在鼓励您向Githug添加有效的贡献，而不是测试您创建拉取请求的能力。 可能会接受的贡献是级别，错误修复和改进的文档。


 [0]: https://github.com/Gazler/githug
 [1]: https://blog.csdn.net/qq_32452623/article/details/78417609