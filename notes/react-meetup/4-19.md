---
title: ReactJS Tokyo 19-04-19
date: 2019-04-19 19:44:59
---

参加了 ReactJS Tokyo，这次有业界 dalao `ZEIT`参加。

## Talk 1 - No compute

首先是例子说明了动态页面非常的慢，而 static 的内容无法满足商业等需求。事实上只要用 CDN 将内容放在里用户最近的 edge，然后正确使用 cache 速度就会非常客观。DEMO 中使用`Notion`作为 CMS，`Next`做`BFF`(Backends For Frontends)同时达到静态内容的速度和动态内容弹性。介绍了 headers 的 `stale-while-revilidate`

### Latency

[now CDN latency](https://latency.zeit.now.sh)

## Talk 2 - AMP support / Fast Bulid

### What's AMP

AMP is a web component framework to easily create user-first
websites/stories/ads/emails/.

[site](https://amp.dev/)

### Fast Bulid

之前每次会需要重新 build 非常消耗时间，对应开发了`flying shuttle`的技术。使用了一个`global cache module`。在开发过程中遇到了`webpack`每次输不一致的问题，解决并提交了 PR。

## Talk 3 - AirShift 的性能改善

这是一个兼职员工的工作时间/薪资管理 app，`React`前端 + Node`BFF`构成，首先最初需要 13 秒非常的慢进而进行了分析。

<del>据说用户只愿意等 3s 就会放弃虽然,每次打开 Gmail 貌似都超过了...</del>

### 发现以下问题

- 计算时产生大量`moment`的实例
- `reselect`库的错误使用导致大量`rerender`

### 解决

- lazyloading
- learning server
- comlink(web workers)
