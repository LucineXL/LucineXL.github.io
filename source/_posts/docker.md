---
title: 初始docker
date: 2020-10-19 10:40:37
tags:
    - docker
cover: https://images.pexels.com/photos/5480759/pexels-photo-5480759.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---


###  docker 简介

####  什么是docker

Docker 使用 Google 公司推出的 Go 语言 进行开发实现，基于 Linux 内核的 cgroup，namespace，以及 AUFS 类的 Union FS 等技术，对进程进行封装隔离，属于操作系统层面的虚拟化技术。 由于隔离的进程独立于宿主和其它的隔离的进程，因此也称其为容器

Docker 在容器的基础上，进行了进一步的封装，从文件系统、网络互联到进程隔离等等，极大的简化了容器的创建和维护。使得 Docker 技术比虚拟机技术更为轻便、快捷。

下面的图片比较了 Docker 和传统虚拟化方式的不同之处。传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。

![](https://user-gold-cdn.xitu.io/2020/6/3/17277fe9f810f632?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://user-gold-cdn.xitu.io/2020/6/3/17277fece35ee96e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 为什么要使用docker

作为一种新兴的虚拟化方式，Docker 跟传统的虚拟化方式相比具有众多的优势。

1. 更高效的利用系统资源
2. 更快速的启动时间
3. 一致的运行环境
4. 持续交付和部署
5. 更轻松的迁移
6. 更轻松的维护和扩展

与传统的虚拟机比较

|  特性   |  容器      | 虚拟机   |
| :---:  |  :---:     | :---: |
| 启动    | 秒级    | 分钟级   |
| 硬盘使用    | 一般为MB    | 一般为GB   |
| 性能   | 接近原生   | 弱于   |
| 系统支持量    | 单机支持上千个容器      | 一般几十个   |


> 注： 此段内容参考自  [Docker -- 从入门到实践][0]


###  docker 的一些基本概念

Docker 包括三个基本的概念：
- 镜像 （Image）
- 容器 （Container）
- 仓库 （Repository）

可以用下面这张图简单认识三者之间的关系

![](https://user-gold-cdn.xitu.io/2019/10/7/16da661eef3572d0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

镜像存放在镜像仓库中，Docker 官方也提供了镜像仓库 hub.docker.com/ ，我们可以从这里下载我们所需要的镜像，当然也可以将我们制作好的镜像存放到仓库中。当我们下载好镜像之后，我们可以通过 run 命令来创建对应的容器，一个镜像可以创建多个容器，每个容器，相互之间不会产生影响。


#### Image 镜像

docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

镜像采用了分层存储的方式。 镜像构建时，会一层层构建，前一层是后一层的基础。每一层构建完就不会再发生改变，后一层上的任何改变只发生在自己这一层。

分层存储的特征还使得镜像的复用、定制变的更为容易。甚至可以用之前构建好的镜像作为基础层，然后进一步添加新的层，以定制自己所需的内容，构建新的镜像。


#### Container 容器

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，容器进程运行于属于自己的独立的 命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全

前面讲过镜像使用的是分层存储，容器也是如此。每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 容器存储层。

容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。

#### Repository 仓库

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。

一个 Docker Registry 中可以包含多个 仓库（Repository）；每个仓库可以包含多个 标签（Tag）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 <仓库名>:<标签> 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 latest 作为默认标签。


### docker 安装

可以使用`homebrew`进行安装
```
brew cask install docker
```

安装成功后， 可以使用 `docker --version` 检查安装后的版本

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvnre6aenj30gk03umxd.jpg)

### 基本操作


#### 镜像

1. 搜索镜像, 以node 镜像为例

```
docker search node
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvnv1c8o8j31mq0kkte4.jpg)

上面字段分别为： 镜像名称， 描述， star数量，是否为官方镜像， 是否为自动生成

2. 下载镜像

```
docker pull 镜像名[:版本]
```
不输入版本号时 默认为 latest

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvnydmm4pj30wo0e8tb0.jpg)

3. 查看本地镜像

```
docker image ls
docker images
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvnyq9snzj31hg05m3zp.jpg)

4. 删除镜像

```
docker image rm 镜像名/镜像id
docker rmi 镜像名/镜像id
```

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvnzmvrbcj30ze0cctbv.jpg)

#### 容器

1. 创建容器

```
docker run [选项] 镜像
```
如果本地不存在该镜像时， 会先到镜像仓库下载该镜像

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvontx2v9j31py0ms7af.jpg)

上面的例子中， 本地没有nginx镜像， 先拉取nginx镜像，  -p 参数将容器中的 80 端口映射到宿主机中的 8080 端口

此时访问本地的 `http://localhost:8080/`, 即可看见nginx欢迎页

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvop5ahe9j30zu0g2aby.jpg)

2. 查看运行中的容器

```
docker ps
docker container ls
```

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvoqh7g5yj31n802ut98.jpg)

图中显示的即为我们刚刚启动的nginx容器

我们使用ctrl + c 关闭容器后， 再次查询运行中的容器

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvorv9absj31fm01qwen.jpg)

此时并没有正在运行中的容器

加上 -a 参数后 可以查看处于停止状态的容器

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjvoss43yvj31qq0423zm.jpg)

3.  停止容器

```
docker container stop 容器id/容器名
```

4. 启动容器

容器停止后，可以重新启动，不需要重新创建

```
docker container start 容器id
```

5. 删除容器

```
docker container rm 容器id // 删除一个容器
docker container rm id1 id2 // 使用空格隔开，可删除多个容器
docker container prune  // 删除所有处于停止状态的容器
```


#### 仓库

docker 的 仓库包括 共有仓库 和 私有仓库，  共有仓库可以通过  `docker hub` 访问


<br /><br /><br />
参考文献：

[Docker -- 从入门到实践][0]




[0]: https://yeasy.gitbook.io/docker_practice/