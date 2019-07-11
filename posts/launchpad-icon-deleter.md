---
title: Launchpad图标删除
date: 2018-01-17 03:27:39
tags:
  - shell
  - macos
---

一个删除 Launchpad 中图标的 shell script

项目地址: [Github](https://github.com/minatsuki-yui/Launchpad-icon-deleter)

::: danger

非官方支持

:::

以下是中文文档：

## 这啥

一个用于删除 macOs Launchpad 图标的 shell 程序

受 https://www.jamf.com/jamf-nation/discussions/21946/removing-icons-from-launchpad-in-sierra 启发

## 测试信息

只在 masOS High Sierra 10.13.1 (17B1003) 上测试过

## 咋用

### 1. 下载 lp.sh

下载 zip 然后解压

![](https://farm5.staticflickr.com/4664/39020988724_ae18604950.jpg)

### 2. 打开 bash

### 3. cd 到 directory

![](https://farm5.staticflickr.com/4629/39020988614_9216d956c4.jpg)

### 4. 输入 sh lp.sh -s | --show

> 需要输入密码

会显示在 Launchpad 中有图标的程序和 id

大致会这样子：

![](https://farm5.staticflickr.com/4759/39730140741_31cbdee5c2.jpg)
...

![](https://farm5.staticflickr.com/4716/25858378768_2b94bf40a1.jpg)

### 4. 输入 sh lp.sh -d | --delete 99,100,111

这就会删除图标

同时删除多个用 `,` 分隔

![](https://farm5.staticflickr.com/4648/39020988524_776acabe32.jpg)

### 5. 按 y 确认

然后就完成了

## 感谢使用(´▽ ｀)
