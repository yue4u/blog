---
title: Raspberry Pi重装笔记
date: 2017-11-28 22:51:51
tags:
  - code
  - Linux
---

记录一下重装过程。

6 月末买的 RaspberryPi 3B，到现在运行的还不错，一直非 root 账号操作……没想到还是被我折腾坏了。虽然已安装的内容还能正常运行，但所有`apt-get`相关命令都用不了……这就很麻烦了。

一开始是

`E: Sub-process /usr/bin/dpkg returned an error code (1)`

经过一顿操作变成了

`Couldn't configure python:armhf, probably a dependency cycle.`

再经过一顿操作变成了

`debconf 需要重新安装,但是我无法找到相应的安装文件`

emmmm (´Д` )

![](./0.jpg)

主要原因估计还是损坏了系统的 python3 和 dpkg 库。正好对淘宝商家附带的中文系统不是很满意，干脆重新安装一下算了。

---

<h3> 下载官方OS</h3>

地址: `https://www.raspberrypi.org/downloads/`

虽说这样，还是想少折腾。依然选择了`Raspbian`

---

<h3> 使用etcher烧录系统</h3>

同样使用官方推荐的 etcher

地址: `https://etcher.io/`

有 Flashing 和 Validating 两步

![](./1.jpg)

![](./2.jpg)

---

<h3> 配置WiFi</h3>

之前刚到手的时候是先连网线再配置 Wi-Fi 的，其实可以从 sd 卡直接配置自动连接 Wi-Fi。

读入烧录好的 sd 卡，新建 wpa_supplicant.conf 文件置于/boot 目录下。

```
country=CN
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
ssid="WiFi名称"
psk="密码"
key_mgmt=WPA-PSK #无密码时key_mgmt=NONE，这处是WAP/WAP2
priority=1 #优先级
#scan_ssid=1 需要连接隐藏WiFi时
}
```

---

<h3> 配置SSH </h3>

同新建名为`ssh`的空文件（无后缀）文件置于/boot 目录下。

---

<h3> 通过路由器查询设备地址 </h3>

访问 `192.168.0.1`查询设备地址

![](./3.jpg)

因为之前设置过内网地址绑定 MAC，所以不需要更改

---

<h3> SSH登录 </h3>

如果此时直接和之前一样敲入`$ ssh pi@192.168.0.107`可以看到如下警告：

```
YmbzzdeMacBook-Air:Desktop Cordial$ ssh pi@192.168.0.107
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:FcKrrQO3c/ZPU5U6WH+rYderuSpvntdYpOY3rMG3hbY.
Please contact your system administrator.
Add correct host key in /Users/Cordial/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/Cordial/.ssh/known_hosts:10
ECDSA host key for 192.168.0.107 has changed and you have requested strict checking.
Host key verification failed.
```

这时可以先删除保存在本地的 ssh 秘钥。
MAC 下输入：

`$ open /Users/Cordial/.ssh/`

从打开文件夹的`known_hosts`文件中删除对应 ip 的内容，具体大致如下:

```
192.168.0.107 ecdsa-sha2-nistp256
…………
```

保存后再重新使用`$ ssh pi@192.168.0.107`命令，和之前一样可以正常登录了。初始化信息如下：

```
用户名:pi
密码: raspberry
```

---

<h3> 初步更改 </h3>

当然要先改密码。使用`$ passwd`命令就好

配置免密码登录
`$ ssh-copy-id -i ~/.ssh/id_rsa.pub pi@192.168.0.107（对应ssh地址）`

（没有公钥时 `$ ssh-keygen -t rsa`）

配置 alias

`alias pi="ssh pi@192.168.0.107"`

然后是系统时间。使用`$ sudo raspi-config`选择对应地区城市。

然后是正常更新:

`$ sudo apt-get update`

`$ sudo apt-get upgrade`

---

<h3> 配置Python3.6 </h3>

参考了`https://gist.github.com/dschep/24aa61672a2092246eaca2824400d37f`

具体步骤如下:

1.安装依赖
`$ sudo apt-get install build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev`

(如果有找不到的包，尝试新版本，比如`libdb5.4-dev` 代替 `libdb5.3-dev`)

2.下载安装 python

```
$ wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tar.xz
$ tar xf Python-3.6.0.tar.xz
$ cd Python-3.6.0
$ ./configure
$ make
$ sudo make altinstall
```

其中`sudo make altinstall`使得我们可以不影响系统内部依赖，不对系统造成影响。
在使用命令的时候，同样要使用`python3.6`，`pip3.6`，因为之前就是 mess up 了系统的 python 库导致了很多问题，暂时还不替换`symbolic link`。

3.(自选)清理安装包

```
$ sudo rm -r Python-3.6.0
$ rm Python-3.6.0.tgz
$ sudo apt-get --purge remove build-essential tk-dev
$ sudo apt-get --purge remove libncurses5-dev libncursesw5-dev libreadline6-dev
$ sudo apt-get --purge remove libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev
$ sudo apt-get --purge remove libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev
$ sudo apt-get autoremove
$ sudo apt-get clean
```

---

<h3> 然后当然最重要的是先配置ssr</h3>

为了解决`DNS`污染，依赖`proxychains`。参考了`https://blog.fazero.me/2015/08/31/%E5%88%A9%E7%94%A8proxychains%E5%9C%A8%E7%BB%88%E7%AB%AF%E4%BD%BF%E7%94%A8socks5%E4%BB%A3%E7%90%86/`

先

```
$ git clone https://github.com/rofl0r/proxychains-ng.git
cd proxychains-ng
```

但之后按照这上面链接的安装过程会报错。

查阅官方`github`页面，安装说明如下:

```
$ ./configure --prefix=/usr --sysconfdir=/etc
$ make
$ [optional] sudo make install
$ [optional] sudo make install-config (installs proxychains.conf)
```

按照这个步骤可以正常安装。

修改`proxychains.conf`

`$ nano /etc/proxychains.conf`，修改`socks4 127.0.0.1 9095`为`socks5 127.0.0.1 1080（本地ssr端口）`

安装`screen`

`$ sudo apt-get install screen`

通过`sftp`连接上传保存的 ssr 文件（带已经配置好的配置文件）。

创建`screen`，切换到 ssr 目录

`$ python3 local.py`

配置完之后测试

`$ sudo proxychains4 curl https://www.twitter.com/`

---

<h3>配置VNC</h3>

`$ sudo apt-get install tightvncserver`

开启:

`$ vncserver`

---

<h3>配置python常用库</h3>

`sudo pip3.6 install qqbot`  
`sudo pip3.6 install itchat `  
`sudo pip3.6 install tweepy `  
`……`

---

<h3>安装PhantomJS</h3>

```
$ sudo apt-get install libfontconfig1 libfreetype6 libpng12-0
$ curl -o /tmp/phantomjs -sSL https://github.com/fg2it/phantomjs-on-raspberry/releases/download/v2.1.1-wheezy-jessie/phantomjs
$ sudo mv /tmp/phantomjs /usr/local/bin/phantomjs
$ sudo chmod a+x /usr/local/bin/phantomjs
```

使用`$ phantomjs --version`确认

---

到此为止个人的需求也就差不多了，除去下载必要的镜像和工具软件等，算上查阅资料的时间差不多两个小时，比想象中快得多。

如果某一天再出现什么需要重装的问题，感觉不会很方了，也从这件事认识到果然系统的备份还是很重要的。
