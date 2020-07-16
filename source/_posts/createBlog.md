---
layout: post
title: 使用hexo搭建个人博客
date: 2017-08-05 15:00:31
conmments: true
tags: hexo
cover: http://hd.wallpaperswide.com/thumbs/virtual_reality_travel-t2.jpg
---

本文介绍了使用hexo搭建个人博客的详细过程~

<!-- more -->

### 使用前准备

##### 1.github

因为hexo是使用 GitHub Pages 来搭建的，所以在搭建之前要先确保有个github账号。身为一个进阶中的程序员，github是居家旅行必备神器，相信大家都有啦，所以关于创建仓库，设置ssh key之类的问题，在这里就不赘述啦。

##### 2.node，git

node.js和git 命令行是辅助工具，但是是必不可少的。在安装hexo之前，要先确认电脑上已经安装了node.js和git，安装方法参考[hexo官方文档][2]，这里就不做介绍了。

### hexo安装

使用npm安装hexo，在终端中运行命令
```yml
$ npm install -g hexo-cli
```

### 建站

##### 1.github中创建仓库

在github中新建一个仓库，仓库名称为 你的github名称.github.io,仓库名称只有满足这个格式才能使用github的Pages主页，否则不能使用。

##### 2.本地创建仓库

在本地创建一个文件夹，然后在终端打开这个文件后，执行命令
```yml
$ hexo init
```

创建成功的文件夹目录结构如下：
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes

### 配置

配置文件： ——config.yml,关于配置文件中主要的配置项可以参考[hexo官方文档][3]，这里只对用的较多的进行介绍。

##### 1.网站信息

| 参数 | 描述 |
|:-----|:---:|
|title| 网站标题 |
|subtitle| 网站副标题|
|description| 网站描述,有利于seo优化 |
|author| 您的名字 |
|language| 网站使用的语言**`中文：zh-CN`** |
|timezone| 网站时区。默认使用您电脑的时区。**`（中国：Asia/Shanghai）`**[时区列表][4]|

注意：在设置时区的时候，不设置会默认采用电脑时区，北京时间可设置为 Asia/Shanghai，第一眼看见这个时区的时候，我以为这是上海时间，便自以为的把时区设置成了 Asia/Beijing ,然后在编译的时候，一直在报错，后来废了好大劲才找到问题所在，真是被自己蠢哭了。

##### 2.目录
| 参数 | 描述 | 默认值 |
|:-----|:---:|:----- |
|url| 网址 | |
|root| 网站根目录 | |
|permalink| 文章的 永久链接 格式 | :year/:month/:day/:title/ |
|permalink_defaults | 永久链接中各部分的默认值 | |

如果您的网站存放在子目录中，例如 `http://yoursite.com/blog`，则请将您的 `url` 设为 `http://yoursite.com/blog` 并把 root 设为 `/blog/`。

注意： url可以设置为自己的网址，但是自己需要注册域名，有自己域名的同学可以将url替换为自己的域名，没有自己的域名，此处设置了url也不会生效，发布成功后，自己的博客主页网址为：`http://youname.github.io`。如果自己没有域名，此处url可随便填，但是不可为空，否则会报错。（不要问我怎么知道的~）

##### 3.目录

| 参数 | 描述 | 默认值 |
|:-----|:---:|:----- |
|source_dir | 资源文件夹，这个文件夹用来存放内容。 | source |
|public_dir | 公共文件夹，这个文件夹用于存放生成的站点文件。 | public |
| tag_dir | 标签文件夹 | tags |
| archive_dir | 归档文件夹 | archives |
| category_dir | 分类文件夹 | categories |
| code_dir | Include code 文件夹 | downloads/code |
| i18n_dir | 国际化（i18n）文件夹 | :lang |
| skip_render | 跳过指定文件的渲染，您可使用 [glob 表达式][5]来匹配路径。 | |

此处不需要修改，除非有特殊需求。

##### 4.文章

| 参数 | 描述 | 默认值 |
|:-----|:---:|:----- |
| new_post_name | 新文章的文件名称 | :title.md |
| default_layout | 预设布局 | post |
| auto_spacing | 在中文和英文之间加入空格 | false |
| titlecase | 把标题转换为 title case | false |
| external_link | 在新标签中打开链接 | true |
| filename_case | 把文件名称转换为 (1) 小写或 (2) 大写 | 0 |
| render_drafts | 显示草稿 | false |
| post_asset_folder | 启动 Asset 文件夹 | false |
| relative_link | 把链接改为与根目录的相对位址 | false |
| future | 显示未来的文章 | true |
| highlight | 代码块的设置 | |

##### 5.主题

| 参数 | 描述 |
|:-----|:---:|
| theme | 当前主题名称。值为false时禁用主题 |

在更换主题时，先从github上把要更换的主题代码clone下来，放入项目中themes文件夹中，然后把配置文件中theme字段设置为更换的主题名称即可。

##### 6.部署

| 参数 | 描述 |
|:-----|:---:|
| deploy | 部署部分的设置 |

### 部署

hexo的部署方式有多种，默认为git部署。因为我用的是git部署，所以在这里就介绍git部署的过程。

##### 安装 hexo-deployer-git
```yml
$ npm install hexo-deployer-git --save
```

##### 配置文件中deploy:

```yml
deploy:
  type: git
  repo: <repository url> ## github上仓库地址 ##
  branch: [branch] ## 分支名称 ##
  message: [message] ## 提交信息 ##
```

##### 部署到hexo

```yml
$ hexo deploy
```

### 常用命令

### init

```yml
$ hexo init [folder]
```

新建一个网站。如果没有设置 folder ，Hexo 默认在目前的文件夹建立网站。

### new

```yml
$ hexo new [layout] <title>
```

新建一篇文章。如果没有设置 layout 的话，默认使用 _config.yml 中的 default_layout 参数代替。如果标题包含空格的话，请使用引号括起来。

### generate

```yml
$ hexo generate
```

生成静态文件。

选项	描述
-d, --deploy	文件生成后立即部署网站
-w, --watch	监视文件变动
该命令可以简写为

```yml
$ hexo g
```

### server

```yml
$ hexo server
```
启动服务器。默认情况下，访问网址为： http://localhost:4000/。

选项	描述
-p, --port	重设端口
-s, --static	只使用静态文件
-l, --log	启动日记记录，使用覆盖记录格式
### deploy

```yml
$ hexo deploy
```
部署网站。

参数	描述
-g, --generate	部署之前预先生成静态文件
该命令可以简写为：

```yml
$ hexo d
```

### clean

```yml
$ hexo clean
```

清除缓存文件 (db.json) 和已生成的静态文件 (public)。


  [1]: https://lucinexl.github.io/
  [2]: https://hexo.io/zh-cn/docs/index.html
  [3]: https://hexo.io/zh-cn/docs/index.html
  [4]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  [5]: https://github.com/isaacs/node-glob
