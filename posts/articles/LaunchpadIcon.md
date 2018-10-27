---
title: Launchpad图标删除
date: 2018-01-17 03:27:39
sidebar: false
layout: Post
tags: 
- shell
- macos
---

一个删除Launchpad中图标的shell script
<!-- more --> 

项目地址: [Github](https://github.com/minatsuki-yui/Launchpad-icon-deleter)

以下是中文文档：


@@@@@@@@@@@@@@  
@ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;注意:  &nbsp;  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;@  
@ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;非官方支持&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@  
@@@@@@@@@@@@@@

<h2>这啥 </h2>  

---

一个用于删除macOs  Launchpad 图标的 shell 程序

受 https://www.jamf.com/jamf-nation/discussions/21946/removing-icons-from-launchpad-in-sierra 启发

<h2>测试信息 </h2>  

---

只在 masOS High Sierra 10.13.1 (17B1003) 上测试过

<h2>咋用 </h2>  

---

<h3>1. 下载 lp.sh  </h3> 

下载zip然后解压

<img src="https://farm5.staticflickr.com/4664/39020988724_ae18604950.jpg" width="495" height="322" alt="屏幕快照 2018-01-17 上午3.55.18">

<h3>2. 打开 bash  </h3>
<h3>3. cd 到 directory  </h3>

<img src="https://farm5.staticflickr.com/4629/39020988614_9216d956c4.jpg" width="500" height="157" alt="屏幕快照 2018-01-17 上午3.57.00">

<h3>4. 输入sh lp.sh -s | --show  </h3>

> 需要输入密码

会显示在Launchpad中有图标的程序和id
  
大致会这样子：

<img src="https://farm5.staticflickr.com/4759/39730140741_31cbdee5c2.jpg" width="325" height="500" alt="E43A4AAF-9219-4EC1-B798-BFCFA29ECB05"></a>
...

<img src="https://farm5.staticflickr.com/4716/25858378768_2b94bf40a1.jpg" width="367" height="500" alt="1">
<h3>4. 输入sh lp.sh -d | --delete 99,100,111  </h3>

这就会删除图标

同时删除多个用 `,` 分隔

<img src="https://farm5.staticflickr.com/4648/39020988524_776acabe32.jpg" width="500" height="233" alt="屏幕快照 2018-01-17 上午4.11.28">

<h3>5. 按 y 确认 </h3>

然后就完成了

---

<h1>感谢使用(´▽｀) </h1>
