---
title: 爬取需求JSEDDIONID的微信公众号
date: 2017-04-12 02:08:09
tags:
  - python
  - English
---

再准备重新做人好好学习英语之后，即使无论再怎么样，还是始终不喜欢使用微信进行学习和阅读。哪怕对于高质量的内容也是这样。

由于爬取的是付费内容，仅供个人使用。

> 基于 Python 3.6.0

> 使用的第三方模块：[requests](http://cn.python-requests.org/zh_CN/latest/)

<h2> 探索部分</h2>
首先打开一阅读页面，会看到“过往阅读”。

![](./0.jpg))

之后点开会发现到了目录页面，长这这样：

![](./1.jpg))

作为一个讨厌微信的人，当然希望至少能够保存到 evernote 或者 safari 书签，然而，在点击使用 Safari 打开之后，此页面就变成了：

![](./2.jpg))

这不好，非常不好，把具体的页面打开试试呢？

![](./3.jpg))

嗯……不仅能用 safari 打开，好像还能正常转发到电脑上。

![](./4.jpg))

然而之前的目录页面好像还是打不开。

![](./5.jpg))

通过查阅 csdn，发现要直接模拟微信浏览器的 header 好像也不能正常打开这样一个网址，倒是有个简单的[办法](https://segmentfault.com/q/1010000000643865)，其中给出的方法简单好用：

> https://wx.qq.com/ 上这个,扫一扫你的微信号,把那个链接复制到网页版微信中打开就能看源码啦
> 我现在进去看到的活动结束的代码了.....

> 要用 chrome 开发者工具,模拟成 iphone 之类的手机客户端,进去会有 oauth 授权,通过后再进就能模拟看网页啦

鉴于我们之前的详情页面是不需要 oauth 授权的，也并不是很需要模拟微信的手机客户端。  
于是登陆网页版微信，把之前的链接发送给自己。

这样在 chrome 中打开此页面是完全 ok 的，但是换个浏览器就会被转至打开错误页面。

![](./6.jpg))

![](./7.jpg))

不过既然都能用电脑打开了，第一件事情当然是看网页源码啊(~￣ △ ￣)~

通过检查源码可以发现想要打开的详情页都是  
`http://dict.jiangnanciqi.com/wxservice/wxshowarticle/show?id=\s+&type=4`这样一种形式。其中`\s`的数字是当前文章在 dict.jiangnanciqi.com 中的真实 id。点击时通过`dict.jiangnanciqi.com`的 Apache 服务器进行重定向，而在微信未登录的浏览器中试图直接打开这样的网址也会被传送到之前灰底的打开错误页面。正常能够正常打开的网址则是被跳转后的页面。如`https://mp.weixin.qq.com/s/cejdKw4ZRBasyuUXuf8iMQ`这也应该是微信公众号文章的真实地址。

![](./8.jpg))

那么怎么办呢？我都知道网址规律了总不能抱着错误放弃吧，都决定写爬虫了更不能手动打开存下真实网址啊，不然和咸鱼有什么区别。

<h2> JSEDDIONID部分</h2>

经过一番折腾绕了远路试图通过 python 模拟微信登录，然而对于目的并不是很成功。（<del>虽然学习了如何抓取所有微信好友简介以及头像</del>）

回到正确思路，检查浏览器发送的 header。会得到这样的内容：

![](./9.jpg))

其中比较令人瞩目的是使用了 cookies 的 JSEDDIONID，而通过 chrome 检查 cookies 发现传入的结束到会话的也就只有这个。那么就好办了，通过 request 库传入 header 和 cookies 再访问目录页所提供的原始 url。

再次滚回去查询资料：得到的以下两篇十分有帮助：

- [jsessionid 的简单说明](http://blog.csdn.net/chunqiuwei/article/details/23461995)
- [Python 爬虫获取 JSESSIONID 登录网站](http://www.68idc.cn/help/jiabenmake/qita/20150312265988.html)

通过实验可以看出在会话未结束时打开原始地址，请求 header 中的 JSEDDIONID 是不变的。  
因而也不需要多进行考虑，拿这这一张门票逛遍迪士尼吧。

![](./10.jpg))

先通过正则从目录页过滤出文章的真实 id：

要注意在使用正则过滤时，如果不小心匹配内容选多了，其中`show?id=`中间的`？`需要被转意。

接着就是编写主程序。在服务器进行重定向的时候，request 库会自动处理，而通过`.url`就能得到最终的真实地址。

> 由于不使用手机也能打开详情页，所以直接使用了 macos 的 UA。可自行调整

原码：

```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import requests
import re
import json
import time


headers = {

'Referer':'http://dict.jiangnanciqi.com/wxservice/wxshowarticle/history?type=4&code=021kAtD20YZV1F1pmEE20O3tD20kAtDL&state=123',
'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
}

cookies = dict(JSESSIONID='B2B850F8E1EAB0F5BEE1B801D1FE7E53')
ar = requests.Session()
ar.headers.update(headers)

realid ='181,186,187,188,189,193,194,196,197,198,203,204,205,207,213,214,215,216,222,225,226,227,228,229,230,232,233,236,239,240,243,246,248,249,250,255,256,258,259,262,267,268,269,270,274,276,277,278,279,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302'

titlereg = r'<title>(.+?)</title>'
tr = re.compile(titlereg)

eachid = realid.split(',')

eurl = {}
for aid in eachid:
	one = 'http://dict.jiangnanciqi.com/wxservice/wxshowarticle/show?id='+aid+'&type=4'
	pagetext = ar.get(one,cookies=cookies)
	tt = re.findall(tr,pagetext.text)[0]
	print(tt)
	eurl[tt] = pagetext.url
	time.sleep(5)

with open('realurl.json','a') as outfile:
	json.dump(eurl,outfile,ensure_ascii=False)
	outfile.write('')
```

运行： ![](./11.jpg))

导出的 json 这个样子： ![](./12.jpg))

转成 markdown：

![](./13.jpg))

终于可以安心的远离微信了

<h2>后记：</h2>  
其实一切的起因只是因为自己太懒，订阅的口语100天总不能及时去看，慢慢的也就堆了起来。希望接下来慢慢能把坑填完，需要url的同学自己去关注[Frank他们](http://mp.weixin.qq.com/profile?src=3&timestamp=1491938786&ver=1&signature=wBa9Rfrbni34HUO0cJ8APlVMa6ydDihZiqnc8xdoXj39*Aq5c7APx46OJ9aopj2Neru4gHIQZ*pmOxTseePoGg==)。之后的新文章可以通过<del>及时的学习</del>获得，或者再统一用相同方式使用新的文章真实id。以及期望能够抓取的音频似乎是个点击才会出现的mpvoice标签，暂时还不会怎么抓取，有待后续研究。
