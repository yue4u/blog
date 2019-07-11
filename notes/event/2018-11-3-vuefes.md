---  
title: VueFes Japan 2018
date: 2018-11-3 01:07:23  
tags:
 - vue
 - design
---

<time>2018.11.3 (Sat.)</time>
<address>秋葉原 / UDX Gallery</address>

[Homepage](https://vuefes.jp/)
[官推](https://twitter.com/vuefes)


## Vue3.0

By [尤大](http://evanyou.me)

[slider](https://docs.google.com/presentation/d/1pbNnBhkc-CwfzSw4sW9Ai7A7uAxLuNwOd4Gd5PMjrSQ/edit?usp=sharing)

### 主要更新

- 2x speed 
- 1/2x memory
- proxy移行
- time slicing

个人感觉和在演讲前看到的 `medium`的文章[Plans for the Next Iteration of Vue.js
](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf)内容差不多。主要提升还是性能和速度方向。

### 其他

- 尤大在使用[Chrome Canary](https://www.google.com/chrome/canary/)
- 模仿做了个vscode的sh命令`alias code='open -a "Visual Studio Code"'`，结果天天在用超级顺手

## Lunch Time

赞助商时间。

+ 最大的意外还是和日企保守的印象不同，有魄力从 `vue 0.x` 时代就开始使用`Laravel`+`vue` 投入产品的企业居然真实存在。
+ `Line`的web服务意外使用`vue`的部分非常多

弁当非常豪华😄

## Next-level Vue Animations 

> By [Sarah Drasner]()


<iframe width="560" height="315" src="https://www.youtube.com/embed/d83Pyi_J1b0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

感觉其实是这一天中收获最大的部分。

收获的一个重要的原则是尽量减少UI的突然消失和页面的突然变化。这不仅会使用户害怕，事实上也会降低SEO的评分。相反，在页面状态迁移时，通过小幅度的移动和动画尽可能保持页面UI的一贯性。

> 比较奇怪的是现场知道FLIP的人很少，明明官方文档中写的很清楚

## Vue.js と Web Components のこれから

> By Takanori Oki

::: danger
当日未参加
:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/WttpESl58L4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 简述

介绍了`Web Components`的状态以及UI部分使用`Web Components`的好处，在现场提到了`vue`死掉之后的情况也非常的心大。。

过段时间有空尝试一下[`Polymer`](https://www.polymer-project.org/)

## Vue Designer

> By ktsn

<iframe width="560" height="315" src="https://www.youtube.com/embed/A9NgtJpCyh4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

介绍了一个制作中的设计工具，类似于`dreamweaver`,`xd`，寻求设计和代码的统一，但个人不是很看好。

## Unit testing a Vuex store

> By Edd Yerburgh

<iframe width="560" height="315" src="https://www.youtube.com/embed/kUFZBNiK_Zc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

::: warning

等待补完

:::

## Atomic Design のデザインと実装の狭間

> By 菅原 孝則

<iframe width="560" height="315" src="https://www.youtube.com/embed/YPGZ70SsfLk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

::: warning

等待补完

:::


## Nuxt.js

> By Sébastien Chopin 

<iframe width="560" height="315" src="https://www.youtube.com/embed/3dFFy8waxcg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

介绍了`Nuxt.js 2.0`

有趣的是甚至作者自己都还没有出书，但是在日本已经有了专门介绍`nuxt`的书，在现场使用率非常的高。

## SFC

> By Rahul Kadyan

<iframe width="560" height="315" src="https://www.youtube.com/embed/nFFZBVb5vbA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

作者使用了自己写的[keynote.sh](keynote.sh)
可惜英文不是很好懂，反而好奇core team的人是怎么交流的。提问也比较困扰。好奇在场的听懂了多少。

## フロントエンドを Nuxt.js で再構築した話

> By 福井 烈

<iframe width="560" height="315" src="https://www.youtube.com/embed/yDaZFK5jbo8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

`Angular 1.0 => nuxt`

`Lighthouse` 3 => 41

## Vue CLI 3 and its Graphical User Interface

> By Guillaume Chau

<iframe width="560" height="315" src="https://www.youtube.com/embed/GMdCf-2kmQE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

::: warning

等待补完

:::

## 1年間単体テストを書き続けた現場から送る Vue Component のテスト 

> By 土屋 和良

<iframe width="560" height="315" src="https://www.youtube.com/embed/oE8z3otI-Hg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 餐具

`Storybook` `cricle CI` 

### 食用方式

因为测试主要是为了检测问题，获取的安心感，所以主要对可见部分(見た目、振る舞い)进行测试。也就是非shallow render，然后CI进行截图比较，不一致部分人工检查确认。

### CI时间

在提问时间有人问CI走一圈多长时间，回答是十分钟左右，那似乎还可以接受。

### 后记

+ 根据今年的[stateofjs.com](https://2018.stateofjs.com/testing/storybook/)貌似`storybook `在日本使用率最高。估计也是某种流行？当天`vuefes`到场的演讲者提到的似乎也不少。
+ 在工作中初步使用后发现还是需要不少的额外代码，对vue的支持也是最近的，不知是不是使用方法问题。
+ 在演讲最后提到了使用`puppeteer`代替现有的截图工具，个人实际使用后确实很好用，在生成PDF(RPA)方面也可以实用，在某种程度上可以考虑用来代替`selenium`

## kebab大盛り

::: warning

等待补完

:::

---

## After Party


::: warning

等待补完

:::

## 总结

::: warning

等待补完

:::
