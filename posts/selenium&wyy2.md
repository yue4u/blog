---
title: selenium优化
date: 2017-11-30 15:16:32
tags: 
- code
- selenium
- python
---

尝试改进与优化。

<!-- more --> 

再上一篇[文章](https://minatsuki-yui.github.io/2017/11/27/selenium&wyy/)中，主要记述了基本使用和查找元素的方法。但是非常难受的是，`Chromedriver`现在并不支持arm芯片，也没机会使用`headless Chromium`，那么就选择`PhantomJS`代替吧。

初始化:

```python
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

dcap = dict(DesiredCapabilities.PHANTOMJS)
dcap["phantomjs.page.settings.userAgent"] = (
        'user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"'
    )

service_args = ['--load-images=no', 
				'--disk-cache=yes', 
				'--ignore-ssl-errors=true']

driver = webdriver.PhantomJS(desired_capabilities=dcap, service_args=service_args)
```

其中`service_args `分别关闭图片加载，开启缓存，忽略ssl错误。也可以写成以下这样，不过编译器不是很推荐。

```
service_args.append = []
service_args.append('--load-images=no')  ##关闭图片加载
service_args.append('--disk-cache=yes') 
service_args.append('--ignore-ssl-errors=true')
```

一开始以为这样就好了的我非常天真。。

如上一期所述`cookies`为

```
c = [{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'},  
{'domain': '.music.163.com',......'}]  
```
但是却遇到了如下错误:  

`"errorMessage":"Unable to set Cookie"`

经过研究貌似`PhantomJS`不支持所有的`cookies`种类，有的提出了以下解决办法：

```python
driver.delete_all_cookies()

for cookie in cookies :
    driver.add_cookie({k: cookie[k] for k in ('domain', 'name', 'value', 'path', 'expiry') if k in cookie})
```

但这并没有解决我的问题。

再次查看`cookies`本身，惊讶的发现其中`'domain': '.music.163.com',......'}`的`domain`居然不是每个一样的。。orz

有的是`'.music.163.com'`有的是`'music.163.com'`就是因为这些最前缺乏`.`的内容引起了报错，全部加上就正常了。╮(￣▽￣"")╭


上一期的代码中使用了不少`time.sleep(5)`这样强制等待的代码，实时上这样并不好，selenium中也自带了两种等待方式：隐式等待、`implicitly_wait`和主动等待`WebDriverWait(...).until(...)`
使用这样的等待方式也应该能够提高运行速度。

必要的`import`：

```python
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
```

然后分别等待iframe、收藏按钮、歌单。分别如下:

```python
driver.get(url)
driver.implicitly_wait(3)
```

```python
WebDriverWait(driver, 5).until(
            ec.presence_of_element_located((By.XPATH, '//*[@id="content-operation"]/a[3]')))
```

```python            
WebDriverWait(driver,5).until(
			ec.presence_of_all_elements_located((By.CLASS_NAME, 'xtag ')))
```
同样也希望能够直接捕获系统通知作为反馈，经检查元素如下：

`<div class="auto-1511963709410 m-sysmsg" id="auto-id-lb1drKVAgL3cBugD" style="top: 324px; left: 134.5px;"><div class="sysmsg"><i class="u-icn u-icn-32"></i><span>歌曲已存在！</span></div></div>`

因为class为`sysmsg`就这一处，那么通过xpath`'//div[@class="sysmsg"]/span'`就可以找到了。

```python
WebDriverWait(driver, 5, 0.1).until(
			ec.presence_of_all_elements_located((By.CLASS_NAME, 'sysmsg')))

sysmsg = driver.find_element_by_xpath('//div[@class="sysmsg"]/span').text
```
因为是无页面显示的，如果需要debug可以在出错的地方使用截图的方式。

如`driver.get_screenshot_as_file('/Users/Cordial/Desktop/1.png')`

(下图未关闭图片加载，正确记录了歌单被正常显示)
<img src="https://farm5.staticflickr.com/4550/38022202204_ac68d83b3e_c.jpg" width="320" height="800" alt="1">


那么整体如下:

```python
#!/user/bin/env python
# -*-coding:utf-8-*-

import re
from selenium import webdriver
import time
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By

def save(msg):
	url_reg = re.compile(r'(http://music.163.com[^\s]*)')
    wyyurl = re.findall(url_reg, msg)
    if wyyurl:
    	url = wyyurl[0].replace('/#', '')
    	sysmsg = love(url)
    return sysmsg
    
def love(url):
    dcap = dict(DesiredCapabilities.PHANTOMJS)
    dcap["phantomjs.page.settings.userAgent"] = (
        'user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"'
    )

    service_args = ['--load-images=no', '--disk-cache=yes', '--ignore-ssl-errors=true']

    driver = webdriver.PhantomJS(desired_capabilities=dcap, service_args=service_args)

    driver.get("http://music.163.com/")
    driver.delete_all_cookies()
    
    c = [{'domain': '.music.163.com',......'},  
		 {'domain': '.music.163.com',......'},  
		 {'domain': '.music.163.com',......'},  
		 {'domain': '.music.163.com',......'},  
		 {'domain': '.music.163.com',......'}]  

    for each in c:
        driver.add_cookie(each)

    driver.get(url)
    driver.implicitly_wait(3)
    try:
        print('now')
        driver.switch_to.frame('contentFrame')
        WebDriverWait(driver, 5).until(
            ec.presence_of_element_located((By.XPATH, '//*[@id="content-operation"]/a[3]')))
        driver.find_element_by_xpath('//*[@id="content-operation"]/a[3]').click()
        print('click ok')
        WebDriverWait(driver, 5).until(ec.presence_of_all_elements_located((By.CLASS_NAME, 'xtag ')))
        pop = driver.find_elements_by_class_name('xtag ')
        pop[2].click()
        WebDriverWait(driver, 5, 0.1).until(ec.presence_of_all_elements_located((By.CLASS_NAME, 'sysmsg')))
        sysmsg = driver.find_element_by_xpath('//div[@class="sysmsg"]/span').text
        
        time.sleep(2) #不着急关闭

        title = driver.title.replace(' - 网易云音乐', '').replace(' - 单曲', '')

        driver.close()
        print('finished ' + title)
        return f'{title}:\n{sysmsg}'
    except Exception as e:
        title = driver.title
        return f'收藏{title}失败……,原因:\n{e}'
        
 if __name__ == "__main__":
    print(save_wyy('http://music.163.com/#/m/song?id=22689960'))
    
```
这样的形式拿到RaspberryPi上也能正常运行了，这样只要有分享就能自动添加到歌单中，还是比较便利的。至于运行时间……貌似不能再快了，担心阻塞多话还是放到thread中运行比较好。

如果有多个需要点击的对象，也只需要模拟多按几次就可以了。

再分享一个个人歌单[http://music.163.com/#/playlist?id=1995945404](http://music.163.com/#/playlist?id=1995945404)

♬♫♪♩感谢阅读♩♪♫♬



