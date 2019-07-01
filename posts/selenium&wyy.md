---
title: selenium自动收藏网易云曲目
date: 2017-11-27 13:11:18
tags: 
- selenium
- python
- code
---

selenium初使用。

 
:::tips info
**版本信息** 

| Python     | 3.6.0| 
| :-------------:|:-------------:|
| Selenium     | 3.4.3      | 
| Chromedriver_mac64 | 2.33      | 
| Chrome | 62.0.3202.94    | 
:::

&nbsp;

<h3>废话部分</h3>

很久以来自己的<del>朋友</del>群中经常会分享网易云音乐的歌曲……然而对其整理并不是很轻松，自从有了[Faya](https://minatsuki-yui.github.io/2017/06/11/Faya_Project/)之后自动存取链接部分是简单实现了。


![](https://farm5.staticflickr.com/4578/38615327616_086216e074.jpg)

关于歌曲页面可以参考[这里](https://minatsuki-yui.github.io/2017/05/13/wyy&aqi/),存储部分代码大概这样：

```python
def save(msg):

    url_reg = re.compile(r'(http://music.163.com[^\s]*)')
    wyyurl = re.findall(url_reg, msg)[0].replace('/#','')
    
    if not wyyurl：
    	return

    headers = {
        'Host': 'music.163.com',
        'Referer': 'http://music.163.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }

    tit_re = re.compile('<title>(.+)</title>')
    songinfo = re.findall(tit_re, requests.get(wyyurl , headers = headers).text)
    songinfo = songinfo[0].replace(' - 网易云音乐', '')
    with open('songinfo.txt', 'a+', encoding='utf-8') as lt:
        lt.write(','+songinfo)
    with open('songurl.txt', 'a+', encoding='utf-8') as songurl:
        songurl.write(','+wyyurl)
```

![](https://farm5.staticflickr.com/4553/26897265569_358ccc2d15.jpg)


<del>因为是之后按照时间顺序读取，图省事就直接写进了txt，其实这样不是很好。非常ugly</del>


但是就算这样还是需要定时进行手工收藏，所以一直以一种类似于osascript的方法进行更新，代码如下：   

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

with open ('songurl.txt' ,'r') as l:
    songs = l.read().split(',')
for song in songs:
    print(song)
    os.system("open -a \"Google Chrome\" %s"%song)
    input() #用于暂停打开 
```
<del>（当然仅限mac使用）</del> 

这样的好处是可以再看一遍所有链接指向的歌曲，看看最近都分享了啥。但是不及时，经常过很久才会想起来更新一次，因为Faya现在运行在RaspberryPi上，从上面同步文件也有点小烦琐。<del>其实就是懒</del>

<h3>正题</h3>


那么就是selenium的正式使用了(~￣△￣)~
python和chrome的安装并不多说，这里额外需求的是`pip3 install selenium`，以及去
[`https://sites.google.com/a/chromium.org/chromedriver/`](https://sites.google.com/a/chromium.org/chromedriver)安装chromedriver。

之后可以使用以下简单的代码测试自己是否正确配置了环境。

```python
#!/user/bin/env python
# -*-coding:utf-8-*-


from selenium import webdriver
import time

options = webdriver.ChromeOptions()
options.add_argument('lang=zh_CN.UTF-8')
options.add_argument('user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"')

driver = webdriver.Chrome(chrome_options=options)

driver.get("https://www.google.com")

driver.find_element_by_name('q').send_keys('selenium')
driver.find_element_by_name('btnK').click()
time.sleep(20) #20秒后关闭
driver.close()
```
如果正常就可以看到如下python打开了一个浏览器，输入了`selenium`然后点击了搜索。

![](https://farm5.staticflickr.com/4534/38672040481_0bb083c91e.jpg)

我们的目标当然是`http://music.163.com`

![](https://farm5.staticflickr.com/4554/26896149659_0b81d2fe85.jpg)

要收藏第一步当然是要登录。

<del>因为不记得密码，</del>这里选择的方案是使用第三方（qq）登陆后存取cookies用来下次登录。


前半部分和之前一样，代码如下:

```python  
from selenium import webdriver

options = webdriver.ChromeOptions()
options.add_argument('lang=zh_CN.UTF-8')
options.add_argument('user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"')
driver = webdriver.Chrome(chrome_options=options)

driver.get("http://music.163.com")
input() #在这时手动登录，登陆完成后按任意键继续

cookies = driver.get_cookies() #获取当前cookies

print(cookies)

with open('xxx.xx')…… #这里可以以任意自己喜欢的方式储存当前的cookies
```


同样因为图省事，在这里选择直接复制`print(cookies)`的结果写入script中。

其中`cookies `的结果大致是:  
```
c = [{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'}]  
```


这样`list`的格式，因而要

```python  
for each in cookies:
    driver.add_cookie(each)
```

要注意在使用selenium的`add_cookie`之前需要保证当前页面和`cookies`是同一个domain，也就是说第一遍需要不带`cookies`访问，再添加完之后重新访问一遍。

登录完之后和所有爬虫一样就是分析html了，随便打开一首歌的页面，对于收藏按钮右键检查元素：

![](https://farm5.staticflickr.com/4576/37954574434_b19f5be844.jpg)

右上选中的部分就是这部分的html了。

![](https://farm5.staticflickr.com/4556/24799938688_f9f94f7234.jpg)

内容为`<a data-res-id="32364761" data-res-type="18" data-count="-1" data-fee="0" data-payed="0" data-pl="320000" data-dl="320000" data-cp="1" data-toast="false" data-st="0" data-res-action="fav" class="u-btni u-btni-fav " href="javascript:;">
<i>收藏</i>
</a>`

仔细一看这边的内容中`<a data-res-id="32364761" >`表示这部分的id是动态生成的，并不可靠，可没有其他可以简单查找到的其他特征，css也是复合的，只好选择使用xpath了。

![](https://farm5.staticflickr.com/4567/38616306396_8e8d0d06db.jpg)

如果选择得到结果: `//*[@id="content-operation"]/a[3]`看起来还行。去selenium试试看。

得到报错结果如下：
```
raise exception_class(message, screen, stacktrace)
selenium.common.exceptions.NoSuchElementException: Message: no such element: Unable to locate element: {"method":"xpath","selector":"//*[@id="content-operation"]/a[3]"}
```

看来是没用找到元素，难道是xpath错了么？

经过一段时间研究……其实是iframe的原因。

再次查看html，可以看到如下内容：

![](https://farm5.staticflickr.com/4517/24800124228_26abcfc615.jpg)

整个页面都在这层iframe之下，因而我们要做的就是切换到这个部分再进行搜索。
具体代码：  
`driver.switch_to.frame('contentFrame')`

之后我们再运行上面的搜索也就没有问题了，可以直接使用`click()`方法模拟点击。

之后正常跳出选择框，检查元素，这边貌似有个`xtag `的class可以直接用来定位，要注意的是`xtag`后有个空格……理由不是很懂。

![](https://farm5.staticflickr.com/4558/24800228118_8aa18798b6.jpg)

然而这时候很自信的写了:
`pop = driver.find_elements_by_class_name('xtag ')`

再次得到无法定位的错误
```
raise exception_class(message, screen, stacktrace)
selenium.common.exceptions.NoSuchElementException: Message: no such element: Unable to locate element: {"method":"class_name","selector":"xtag "}
```
这是为什么呢？明明有那么好用的class_name,明明也没有多出新的iframe，可是怎么会变成这样呢？

&nbsp;


&nbsp;


&nbsp;



**\*两个小时之后\***

经过反复的研究分析，最终发现一切的错误只需要等3秒种。

如下图所示，窗口的元素是在点击后生成的，在点击`X`之后移除，因而在点击后直接查询，这时它并没有生成完整，稍微等待一下加载再进行查询就没问题了。

![](https://farm5.staticflickr.com/4585/26896412009_b262c5f679.jpg)
因而代码如下：


```
time.sleep(3)
pop = driver.find_elements_by_class_name('xtag ')
pop[1].click()
```

这里还有一个要注意的点，在使用`driver.find_element_by_XXXX`等方法时，要注意单复数，比如`find_element_by_XXXX`和`find_elements_by_XXXX`是不同的，后者返回的是一个list，也就不能直接使用`click()`、`send_keys`等方法。


![](https://farm5.staticflickr.com/4579/37955357164_4645f246f2.jpg)

终于……我们看到了收藏成功的提示。感动……╮(￣▽￣)╭

当然如果这首曲子在歌单中已经有了会返回已存在的提示。

![](https://farm5.staticflickr.com/4531/26896997779_d3097301a8.jpg)

完整的工作pipeline如下:


```python
#!/user/bin/env python
# -*-coding:utf-8-*-


from selenium import webdriver
import time
import os

options = webdriver.ChromeOptions()
options.add_argument('lang=zh_CN.UTF-8')
options.add_argument('user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"')
driver = webdriver.Chrome(chrome_options=options)

#未储存cookies的情况：
driver.get("http://music.163.com")
input() #在这时手动登录，登陆完成后按任意键继续

"""
已储存cookies的情况：
driver.get("http://music.163.com")
cookies = "………" （替换此处）
for each in cookies:
    driver.add_cookie(each)
"""

with open ('songurl.txt' ,'r') as l:
    songs = l.read().split(',')
    #从本地读取歌曲URL

for song in songs:
    driver.get(song)
    time.sleep(3)
    title = driver.title
    try:
        print('now ' + title)
        driver.switch_to.frame('contentFrame')
        driver.find_element_by_xpath('//*[@id="content-operation"]/a[3]').click()
        print('click ok')
        time.sleep(3)
        pop = driver.find_elements_by_class_name('xtag ')
        pop[1].click() #此处是选择下面一个歌单
        print('finished ' + title)
    except:
        print('skip ' + title)
        #遇到错误跳过

    time.sleep(2)

```

&nbsp;

下一步就是优化和搬运到RaspberryPi上了，可以继续参考[这篇文章](https://minatsuki-yui.github.io/2017/11/27/selenium&wyy2)

最后是收集生成的歌单：[http://music.163.com/#/m/playlist?id=754282245](http://music.163.com/#/m/playlist?id=754282245)

♪♪ 有兴趣可以去听听看，都是良曲的说 ♪♪