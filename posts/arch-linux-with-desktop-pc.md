---
title: Arch Linux & Desktop PC Setup
date: 2020-12-02 01:35:28
tags:
  - arch linux
  - intel
  - nvidia
---

因为很多性能问题做不到或者说做起来很痛苦的事情变多了，所以考虑配置了一台新 PC, 在曲大师的参考下最终配置大概如下．显示器和 SSD 已经有可以用的所以没有新购入．

<iframe id="bit-MA1BqkqXJWJwV7m0vFGK" src="https://bits.yue.coffee/e/MA1BqkqXJWJwV7m0vFGK?dark=1" width="80%" frameborder="0"></iframe>

| Parts    |                                                                          |
| -------- | :----------------------------------------------------------------------: |
| CPU      |                              Corei9-10900K                               |
| 显卡     |           ZOTAC GAMING GeForce RTX 3080 Trinity OC 10GB GDDR6X           |
| 主板     |                     MSI MPG B550 GAMING CARBON WIFI                      |
| 水冷     |                   Cooler Master MasterLiquid ML360R RG                   |
| 散热硅胶 |                       Thermal Grizzly Kryonaut 1g                        |
| 内存     |                 内存 TEAM DDR4 2666Mhz PC4-21300 16GBx2                  |
| 电源     |                     SUPERFLOWER LEADEXIII GOLD 750W                      |
| 机箱     | Cooler Master MasterBox TD500 Mesh White<br /> MCB-D500D-WGNN-S01 CS7817 |
| 机箱风扇 |                             Antec 120 mm \*5                             |

## 考虑过程

### CPU

首先是选定 CPU，因为考虑到用于做 modeling 和编译相关 CPU heavy 的情况很多，尽可能选择了市面上相对比较好的 `Corei9-10900K`．其他考虑过的 CPU 有`Corei9-10900KF`以及 `AMD Ryzen` 的 `3950x` 和 `5950x`.
因为 `3950x` 相对性能不及 `Corei9-10900K`, `5950x`　现在并没有货，所以选择了性价比相对高的`Corei9-10900K`．最初也有考虑`Corei9-10900KF`，但是如果不正确配置显卡会什么表示都没有，价格差距也没有那么大，就选择了相对稳妥的不带`F`的版本．

<iframe id="bit-aLoHgCCnmb547n4y99ES" src="https://bits.yue.coffee/e/aLoHgCCnmb547n4y99ES?dark=1" width="80%" frameborder="0"></iframe>

<iframe id="bit-z7YuUhyMtfZ8dWMMwjiB" src="https://bits.yue.coffee/e/z7YuUhyMtfZ8dWMMwjiB?dark=1" width="80%" frameborder="0"></iframe>

### GPU

由于`MSI`的`3080`并没有货，在价格差距接近的`MSI`的`3070`和`ZOTAC `的`3080`之间进行了选择．考虑到长期使用，选择了可能现在相对 overkill 的`RTX 3080`．至于`ZOTAC`和`MSI`的选择看了很多评价，感觉`ZOTAC`相对便宜并且没有明显的差距，选择了`ZOTAC`．

### 主板

通过这次查询许多资料才知道主板的选定取决与 CPU 插槽，所以在曲大师的推荐下选择了`MSI MPG B550 GAMING CARBON WIFI`，途中也有考虑到是否需要带`WIFI`的版本，虽然以防万一选了带`WIFI`的版本，但是因为一般也不会不移动机箱．事实上现在也基本插着网线用．

### 水冷

考虑到 CPU 的需求选择了水冷，实际上这部分装起来挺麻烦的拆装了好几次．每个风扇都有电源和 RGBA 的两个接口，都需要分别正确接到集线器和控制板上．

<iframe id="bit-McGZ6y6YfTspb7KnGKle" src="https://bits.yue.coffee/e/McGZ6y6YfTspb7KnGKle?dark=1" width="80%" frameborder="0" allowfullscreen></iframe>

### 散热硅胶

没什么特别需要说的，选择了日亚上卖的最好的一种，实际主板？的盒子里附带了一管硅胶，可能本来并不需要另外买

### 内存

选择了销量最好的 DDR4 16G x 2．虽然我知道主板上的内存插槽要注意顺序．．但还是插错了两次．．

### 电源

CPU + GPU 整体来说还是功耗偏大的选择了 `750w`的电源．但是这是根据最初考虑到`3070`的配置选的，所以可能需要更换到`850w`

### 机箱

其实这部分选起来最麻烦...因为国内的品牌这边几乎没货，而且需要考虑到显卡和电源箱的尺寸，并且看上去不蠢的都偏贵不少，最终选了 `Cooler Master MasterBox TD500 Mesh White`．理由是相对比较大而已没那么难看并且价格不至于不能接受<del>我真的很努力选了</del> <del>最初花了好久才发现机箱后挡板怎么拆</del>

## 组装

<iframe id="bit-aPJRpkweOBH8ufYh8nxv" src="https://bits.yue.coffee/e/aPJRpkweOBH8ufYh8nxv?dark=1" width="80%" frameborder="0"></iframe>

其实感觉下来正确的安装顺序应该是应该按照 机箱风扇 => 主板到机箱 => 水冷到主板 => 前置板以及主板相关的配线　=> GPU =>　 SSD/电源相关　的顺序装．主要是因为如果把水冷固定到了上挡板．剩下什么都不方便装....

<iframe id="bit-6JnayPDdhkrZpFF2WWl1" src="https://bits.yue.coffee/e/6JnayPDdhkrZpFF2WWl1?dark=1" width="80%" frameborder="0"></iframe>

第一次没有显卡的状态点亮．

<iframe id="bit-f04TQKjZp2Bs8i7xCc6i" src="https://bits.yue.coffee/e/f04TQKjZp2Bs8i7xCc6i?dark=1" width="80%" frameborder="0" allowfullscreen></iframe>

尽可能的把排线集中到了背面，并且固定．排线真的好难以及许多线的长度不是很合适．如果还有机会装机器可以考虑准备不同颜色已经长度的配线．

<iframe id="bit-ZsiDSHmRKExVYVenyoNz" src="https://bits.yue.coffee/e/ZsiDSHmRKExVYVenyoNz?dark=1" width="80%" frameborder="0"></iframe>

## 其他

我把之前笔记本上装了 windows 的 ssd 的 `mSATA`误解成了`m1`接口，所以可能还需要补 ssd...

在组装显卡的部分也遇到了不少困难．直到这次装机我都不知道 GPU 是要插电源的．．．在第一次插上 GPU 之后黑屏没有输出．查阅很多资料说是 GPU 的问题就很方．．加上自己装的是 linux 系统，本身就可能遇到别人没有的问题．再尝试很多次之后发现需要将 hdmi 插在 GPU 的输出而非主板的输出，再装上驱动(`pacman -S nvidia`)之后就没有问题了．

在实际状系统的时候也遇到不少无法启动的问题，主要的原因还是因为我一开始想直接照搬到了笔记本的系统设置，但是硬件 id 相关一直报错，于是重置了 ssd 从零装了系统，然后就很顺利．基于长期使用经验还是选择了 `Arch Linux`．如果感兴趣可以参考以下两篇文章

- [Arch Linux & Thinkpad x230 - OS](/arch-linux-with-thinkpad-x230-os)
- [Arch Linux Thinkpad x230 - Hardware](/arch-linux-with-thinkpad-x230-hardware)

本来准备借这个机会尝试`dwm`和`fish`的，一开始对`dwm`不是很适应，因为毕竟需要自己修改源码．但是很快就发现真的修改源码最方便了...即使对 c 不熟悉也能做不少 customize，准备维护[自己的 fork](https://github.com/rainy-me/dwm/)
至于`fish`，貌似需要重写现在很多的 bash 设定，暂时选择放弃还是用回了`zsh`

## 性能

相关的 benchmark

- [CPU Score](https://browser.geekbench.com/v5/cpu/5049295)
- [OpenCL Score](https://browser.geekbench.com/v5/compute/1955666)

<iframe id="bit-akAt8n76CKJKC2TKNmxE" src="https://bits.yue.coffee/e/akAt8n76CKJKC2TKNmxE?dark=1" width="80%" frameborder="0"></iframe>
<iframe id="bit-gulNhqZj9gG9V9m89iHo" src="https://bits.yue.coffee/e/gulNhqZj9gG9V9m89iHo?dark=1" width="80%" frameborder="0"></iframe>
