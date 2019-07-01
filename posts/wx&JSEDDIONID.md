---
title: 爬取需求JSEDDIONID的微信公众号
date: 2017-04-12 02:08:09
tags:
- python
- English
---

再准备重新做人好好学习英语之后，即使无论再怎么样，还是始终不喜欢使用微信进行学习和阅读。哪怕对于高质量的内容也是这样。

  

由于爬取的是付费内容，仅供个人使用。

>基于Python 3.6.0  

>使用的第三方模块：[requests](http://cn.python-requests.org/zh_CN/latest/)

<h2> 探索部分</h2>
首先打开一阅读页面，会看到“过往阅读”。

<img src="https://c1.staticflickr.com/3/2905/33135585214_bdc6f4bbee_c.jpg" width="220" height="400" alt="IMG_7318">


之后点开会发现到了目录页面，长这这样：  

<img src="https://c1.staticflickr.com/3/2818/33165966703_16e43cb228_c.jpg" width="225" height="400" alt="IMG_7315">  

  
作为一个讨厌微信的人，当然希望至少能够保存到evernote或者safari书签，然而，在点击使用Safari打开之后，此页面就变成了：  
  
  
<img src="https://c1.staticflickr.com/3/2856/33594103390_083228866d_c.jpg" width="225" height="400" alt="IMG_7316">  


这不好，非常不好，把具体的页面打开试试呢？ 

<img src="https://c1.staticflickr.com/3/2933/33821387632_ef17503fb8_c.jpg" width="225" height="400" alt="IMG_7314">
  
  
嗯……不仅能用safari打开，好像还能正常转发到电脑上。 
  
   
<img src="https://c1.staticflickr.com/3/2923/33821388152_77468fb744_z.jpg" width="640" height="282" alt="屏幕快照 2017-04-12 上午2.03.17"> 
  
 然而之前的目录页面好像还是打不开。
    
<img src="https://c1.staticflickr.com/4/3933/33937860326_3a91d4a28b_z.jpg" width="640" height="277" alt="屏幕快照 2017-04-12 上午2.03.33">

通过查阅csdn，发现要直接模拟微信浏览器的header好像也不能正常打开这样一个网址，倒是有个简单的[办法](https://segmentfault.com/q/1010000000643865)，其中给出的方法简单好用：  

>https://wx.qq.com/ 上这个,扫一扫你的微信号,把那个链接复制到网页版微信中打开就能看源码啦
>我现在进去看到的活动结束的代码了.....

>要用chrome开发者工具,模拟成iphone之类的手机客户端,进去会有oauth授权,通过后再进就能模拟看网页啦

鉴于我们之前的详情页面是不需要oauth授权的，也并不是很需要模拟微信的手机客户端。  
于是登陆网页版微信，把之前的链接发送给自己。

![](http://i2.muimg.com/567571/a000ac64b7ca659d.png)

这样在chrome中打开此页面是完全ok的，但是换个浏览器就会被转至打开错误页面。  

<img src="https://c1.staticflickr.com/3/2941/33165967143_2d320ca420_z.jpg" width="640" height="549" alt="屏幕快照 2017-04-12 上午1.55.02">  

<img src="https://c1.staticflickr.com/3/2871/33937860066_9730bd0fef_z.jpg" width="640" height="250" alt="屏幕快照 2017-04-12 上午2.04.02">  

不过既然都能用电脑打开了，第一件事情当然是看网页源码啊(~￣△￣)~  

通过检查源码可以发现想要打开的详情页都是  
`http://dict.jiangnanciqi.com/wxservice/wxshowarticle/show?id=\s+&type=4`这样一种形式。其中`\s`的数字是当前文章在dict.jiangnanciqi.com中的真实id。点击时通过`dict.jiangnanciqi.com`的Apache服务器进行重定向，而在微信未登录的浏览器中试图直接打开这样的网址也会被传送到之前灰底的打开错误页面。正常能够正常打开的网址则是被跳转后的页面。如`https://mp.weixin.qq.com/s/cejdKw4ZRBasyuUXuf8iMQ`这也应该是微信公众号文章的真实地址。

<img src="https://c1.staticflickr.com/4/3949/33167291273_e63104498c_b.jpg" width="580" height="698" alt="屏幕快照 2017-04-12 上午1.56.10">

那么怎么办呢？我都知道网址规律了总不能抱着错误放弃吧，都决定写爬虫了更不能手动打开存下真实网址啊，不然和咸鱼有什么区别。   
    
![](http://i1.piimg.com/567571/809d6ee50fb68e13.gif)

<h2> JSEDDIONID部分</h2>

经过一番折腾绕了远路试图通过python模拟微信登录，然而对于目的并不是很成功。（<del>虽然学习了如何抓取所有微信好友简介以及头像</del>）

回到正确思路，检查浏览器发送的header。会得到这样的内容：  

<img src="https://c1.staticflickr.com/3/2860/33980345265_d0f6b144be_b.jpg" width="937" height="669" alt="屏幕快照 2017-04-12 上午1.59.48">

其中比较令人瞩目的是使用了cookies的JSEDDIONID，而通过chrome检查cookies发现传入的结束到会话的也就只有这个。那么就好办了，通过request库传入header和cookies再访问目录页所提供的原始url。 

再次滚回去查询资料：得到的以下两篇十分有帮助：

+ [jsessionid的简单说明](http://blog.csdn.net/chunqiuwei/article/details/23461995)
+ [Python爬虫获取JSESSIONID登录网站](http://www.68idc.cn/help/jiabenmake/qita/20150312265988.html)

通过实验可以看出在会话未结束时打开原始地址，请求header中的JSEDDIONID是不变的。  
因而也不需要多进行考虑，拿这这一张门票逛遍迪士尼吧。  

<img src="https://c1.staticflickr.com/3/2807/33822996312_97e70521e9.jpg" width="325" height="257" alt="UBDXJVTXT64RIGPUDLWD7BP">  

先通过正则从目录页过滤出文章的真实id：  

要注意在使用正则过滤时，如果不小心匹配内容选多了，其中`show?id=`中间的`？`需要被转意。  

![](http://i2.muimg.com/567571/ab0082073edc129f.png)


接着就是编写主程序。在服务器进行重定向的时候，request库会自动处理，而通过`.url`就能得到最终的真实地址。
  
>由于不使用手机也能打开详情页，所以直接使用了macos的UA。可自行调整  
  
  
![](http://i4.buimg.com/567571/7886b9291b846ada.png)

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


运行：  <img src="https://c1.staticflickr.com/4/3928/33165966953_e825becab0.jpg" width="500" height="420" alt="屏幕快照 2017-04-12 上午2.02.31">

导出的json这个样子：  <img src="https://c1.staticflickr.com/3/2878/33167008773_2804a50bb4.jpg" width="500" height="390" alt="url">

转成markdown：  

<img src="https://c1.staticflickr.com/3/2926/33822514222_b576ca6c9d_b.jpg" width="1024" height="481" alt="22C89F71-64B8-406D-8FB4-0855C69B060A">


终于可以安心的远离微信了![](http://i2.muimg.com/567571/1a4c59516eb35388.gif)  


<h2>后记：</h2>  
其实一切的起因只是因为自己太懒，订阅的口语100天总不能及时去看，慢慢的也就堆了起来。希望接下来慢慢能把坑填完，需要url的同学自己去关注[Frank他们](http://mp.weixin.qq.com/profile?src=3&timestamp=1491938786&ver=1&signature=wBa9Rfrbni34HUO0cJ8APlVMa6ydDihZiqnc8xdoXj39*Aq5c7APx46OJ9aopj2Neru4gHIQZ*pmOxTseePoGg==)。之后的新文章可以通过<del>及时的学习</del>获得，或者再统一用相同方式使用新的文章真实id。以及期望能够抓取的音频似乎是个点击才会出现的mpvoice标签，暂时还不会怎么抓取，有待后续研究。 

⬇️下面为江南词器厂公众号  <img src="https://c1.staticflickr.com/3/2840/33823439452_7f90547abe_q.jpg" width="150" height="150" alt="C1D0AA43-EB86-4928-94BB-E10DA3EAD5E0">