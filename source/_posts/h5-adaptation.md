---
title: 移动端适配问题 采坑记
date: 2019-04-28 17:59:50
tags:
 - h5
 - 移动端适配
cover: https://images.pexels.com/photos/2789165/pexels-photo-2789165.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
---

#### 此文用来整理记录 在移动端开发过程中遇到的一些适配问题， 会一直更新~

1. ios 上input输入框disabled状态时背景颜色变灰

  原因：ios默认disabled属性时透明度为0.3

  解决方案： input:disabled  { opacity: 1}


2. 在使用 img标签渲染图片， ios图片不能正常显示， 安卓端可以正常显示

  效果如下:
  <div align=center>
<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gdt3wfflh2j30og0ekgm5.jpg" width = "300" height = "300" div align=center />

  解决办法： 在使用img标签时， img标签外套一个div标签， 使用方式和css如下
  <div align=center>
<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gdt3x660f2j30xc0j843g.jpg" width = "300" height = "300" div align=center />
    css:
  <div align=center>
<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gdt3xs2xrbj30tc0pg79g.jpg" width = "300" height = "300" div align=center />


3. img 元素下方有间隙

  效果如图： 图片与下方文字之间有间隙
  <div align=center>
<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gdt3vh9lxoj30ka0e4763.jpg" width = "300" height = "300" div align=center />

  解决方式：

  1.将图片元素设置为块级元素， 即  {display: block}

  2.设置父元素 font-size 为0

4. input 输入框收回后底部有留白

效果如图：
<div align=center>
<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gdt3t5epy1j30iq104ack.jpg" width = "300" height = "300" div align=center />
</div>

解决办法：

在输入框onblur之后手动触发页面的滚动
```
const onBlur = useCallback(() => window.scrollTo(0, 0), []);
```