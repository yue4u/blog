---
title: Arch Linux Thinkpad x230 - Hardware
date: 2019-03-24 01:24:50
tags:
 - arch linux
 - thinkpad
---

`Thinkpad`和`arch linux`真是太棒了。



## 先上图

![](https://cloud.rainy.me/blog/314239.jpg)

## Links

+ [OS篇](/articles/arch-linux-with-thinkpad-x230-os)
+ [/r/thinkpad/](https://www.reddit.com/r/thinkpad/)

<del>其实这篇文章是还在mac上写的</del>

由于不可抗力<del>mac只有128g的ssd根本放不下一堆`node_modules`</del>配置了新的笔记本。

## 选择OS

现在在mac上也基本主要只使用命令行，所以就想着干脆换成Linux了。最初犹豫了一下要不要装`ubuntu`，但是感觉`ubuntu`的开发方向更面向一般用户而非开发者，相对之下`arch linux`是个不错的选择。也考虑了`redox-os`，但是貌似各种方面还不是最成熟，暂时不作为主要os使用。

## 选择Host机器

google了一大圈`Best Laptops For Linux`，推荐最多的是`DELL XPS 13`和`Thinkpad X1 Carbon`，但是两者都不便宜。`X1 Carbon`的linux版貌似[系统休眠问题](https://www.linuxquestions.org/questions/linux-laptop-and-netbook-25/lenovo-x1-carbon-2018-no-deep-sleep-s3-available-4175624628/)还没解决，而`XPS 13`在个人眼里不是很好看,直到在某YouTube链接下有人说旧款的Thinkpad是最舒服的，就顺着这个方向进行了继续研究。

### 选择Thinkpad

说起旧Thinkpad最常被提到的是`x220`,`x230`,`T420`,`T430`。`T`系列貌似性能各方面更强一点，但是比较笨重，不太愿意日常背着。所以在`x220`,`x230`中选择。

`x220`的键盘是唯一的优势，但可以更换到`X230`上。所以就锁定`x230`上了。

在秋叶原二手市场大约 4k～8k日币能买到无硬盘无ssd的 `x`系列，去看看似乎似乎是个不错的选择。或者在乐天二手店购入带window的版本，大约20~30k

## 目标Spec


|memory | 8G |
|-|-|
|ssd | 1T |
|display| ips|

### memory

`x230`有两个内存槽，最初是单4G所以再多买一根4G的就够用。8G*2什么的也考虑过，但实际用下来感觉也暂时没必要,也有[一些传闻](https://forums.lenovo.com/t5/ThinkPad-X-Series-Tablet-and/X230T-eGPU-Problems/td-p/1186519)说8G以上会有些问题。

|model | `silicon power DDR3 1600 PC3-12800 4GB 204Pin SP004GBSTU160N02` |
|-|-|
|price | ￥ 2,980 |
|seller| amazon |

### ssd

最初是抱着`window`和`linux` dualboot的想法设计的。原本是准备把`linux`放在`ssd`，`windows`放在mSATA，然而发现换`ssd`比换`mSATA`方便多了，就把`mSATA`当成纯粹的储存用了。

要注意的是`x230`的`mSATA`只支持`mSATA2`达不到满速，据[reddit](https://www.reddit.com/r/thinkpad/comments/6nft89/x230_should_the_os_be_on_the_msata_or_the_sata/)称体感没很大区别。这里是抱者以后说不定用在其他机器上的想法买了860evo。

![](https://cloud.rainy.me/blog/57178d.jpg)

|model | `Samsung SSD 500GB 860EVO 2.5inch MZ-76E500B/EC` |
|-|-|
|price | ￥ 8,980 |
|seller| amazon |

|model | `Samsung SSD 500GB 860EVO mSATA MZ-M6E500B/EC` |
|-|-|
|price | ￥ 11,800 |
|seller| amazon |

### display

`x220`与`x230`的屏幕分成`TN屏`和`ips屏`。`ips屏`真的很漂亮，绝对建议升级。在日本这边感觉自带`ips屏`的居多，虽然是否遇得上还是得看运气。

要注意更换屏幕时要拔掉电池。<del>不要问我发生了什么</del>

|model | `LCDOLED® 12.5inch Thinkpad x230 LP125WH2 (IPS)  display pannel` |
|-|-|
|price | ￥ 9,000 |
|seller| amazon |

### keyboard

之前也说过`x220`的键盘好些，个人也完全用不惯日式键盘。加上`palmrest`一起换的话更加轻松一点。

|model | `x220 Keyboard US` |
|-|-|
|price | ￥ 3,403 |
|seller| ebay |

|model | `X220 Palmrest Cover Case` |
|-|-|
|price | ￥ 1131 |
|seller| ebay |

## sum up

|name | price |
|-|-|
|`x230`| ￥ 10,000 *理想价格|
|`4GB memory`| ￥ 2,980 |
|`500GB ssd 2.5 inch`| ￥ 8,980 |
|`500GB ssd 2.5 mSATA`| ￥ 11,800 |
|`IPS display pannel`| ￥ 9,000 |
|`x220 Keyboard US`| ￥ 3,403 |
|`X220 Palmrest Cover Case`| ￥ 1,131 |
|-| - |
|合计| ￥47,294  |

## Links

更换硬件:

+ [内存/键盘](https://youtu.be/btRFu3Wc5H8)
+ [ips屏](https://youtu.be/sXcs43vXOu0)
+ [OS篇](/articles/arch-linux-with-thinkpad-x230-os)
