---
title: Arch Linux & Thinkpad x230 - OS
date: 2019-03-25 02:01:45
sidebar: false
layout: Post
tags:
 - arch linux
 - thinkpad
---

`Thinkpad`和`arch linux`真是太棒了。 * 2

<!-- more -->

> 截图为未更新vim colorscheme前

## Links

+ [硬件篇](/articles/arch-linux-with-thinkpad-x230-hardware)
+ [dotfiles](https://github.com/rainy-me/dotfiles)
+ [pacman packages list](https://gist.github.com/rainy-me/cf0075f21555d08e3fc25ceb1502510a)

## 截图

### kitty

![](https://cloud.rainy.me/blog/6f94ba.png)

### ranger

![](https://cloud.rainy.me/blog/e10fc6.png)

### vim & kitty

![](https://cloud.rainy.me/blog/a660fc.png)

### browser

![](https://cloud.rainy.me/blog/7bd04f.png)

## Overall

> 总之折腾系统比写业务代码开心多了

> pacman 简直太棒了

> 打开了新世界的大门 => [/r/unixporn/](https://www.reddit.com/r/unixporn)

## Install

安装基本上不用说，按照[archwiki](https://wiki.archlinux.org/index.php/installation_guide)做就是了，不过`x230`选择`UEFI`的话，要先在`BIOS`选择`UEFI First`

寻求视频流程的话一下两个可以参考

+ [Full Arch Linux Install (SAVAGE Edition!)](https://youtu.be/4PBqpX0_UOc)
+ [Installing Arch Linux in 2019](https://youtu.be/NchV5UphQeQ)

WM同样可以参考`Luke Smith`的以下两个视频

+ [After a Minimal Linux Install: Graphical Envionment and Users](https://youtu.be/nSHOb8YU9Gw)
+ [Tiling Window Management and i3wm config additions](https://youtu.be/GKviflL9XeI)

## Window Manger

最初在`KDE`和`GNOME`件犹豫了很久，直到发现`i3`这种神器,终于直到自己一直在找的就是`Tiling Window Manager`。熟悉之后用起来简直顺手。自定义各种key binding真的非常的自由，相对需要自己处理冲突关系。

## Terminal

Mac上一直用`powerline font`稍微有的看腻了，换到了[`oh-my-zsh`](https://github.com/robbyrussell/oh-my-zsh), `wezm` theme挺对我胃口的。同样沉迷[`Fira Code`](https://github.com/tonsky/FiraCode)字体，于是需要寻找支持`color emoji`和`font ligatures`的`terminal emulator`。

最初推荐的都是`urxvt`什么的，但貌似都不怎么支持，只好先从[terminal-support](https://github.com/tonsky/FiraCode#terminal-support)里面挑。[`kitty`](https://github.com/kovidgoyal/kitty/)各种意义上都不错就选择了它。

不过安装3天后就遇到了[bug](https://github.com/kovidgoyal/kitty/issues/1484)...虽然是`mesa 19`的bug造成，但完全空白还是非常吓人的。

## vim

借此机会顺带写了一直想写很久的[vim colorscheme](https://github.com/rainy-me/curiosity)，尝试了[vim-polyglot](https://github.com/sheerun/vim-polyglot)但是感觉文法支持还是一般,不知道用上`language-server`会不会好一点。

> mac截图

![](https://cloud.rainy.me/blog/2fc71e.png)

## etc

在查询有关`IM`的内容时注意到`fcitx5`正在开发，但是只有`AUR`所以暂时选择了4，不知道什么时候会正式发布。

[硬件篇](/articles/arch-linux-with-thinkpad-x230-hardware)