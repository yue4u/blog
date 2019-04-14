---
title: Docker compose与gcc内存不足的错误
date: 2019-01-05 08:40:43
tags: 
- docker
- gcc
- centOS
- linux
- python
- lxml

---

解决docker-compose时pip intall lxml发生gcc内存不足的错误。

<!-- more -->

记忆中python的`lxml`库安装好像一直不是很顺利，每次环境变更都要折腾不少时间。这次又再次遇到了相似的问题。

经过本地`docker-compose up`测试后没有问题但是服务器pull代码运行时却出现了问题。

## 环境

### server

**server OS** : Docker centOS7 Application

#### spec

| -  | - |
| --- | --- |
| CPU: | 1 vCore |
| RAM: | 1024 MB |
| Storage: | 25 GB SSD |

最初只是做`proxy`用的所以选了尽可能小的，但是RAM如果1G以下docker都吃力所以姑且选了1G，没想到还是稍微遇到了问题

### requirements.txt

```
# requirements.txt

sanic
sanic-cors
requests
lxml
```

### Dockerfile

```Dockerfile
# Dockerfile

FROM python:3.7-alpine
ADD . /app
WORKDIR /app
RUN apk add --no-cache --virtual .build-deps \
    ca-certificates make gcc postgresql-dev linux-headers musl-dev libxslt-dev\
    libffi-dev jpeg-dev zlib-dev \
    && pip install -r requirements.txt
CMD ["python", "main.py"]
EXPOSE 8000

```
## 错误信息

本身`Running setup.py bdist_wheel for lxml: started`这里就会停很久，之前在树莓派上也有类似情况。

内容和这个[stackoverflow的问题](https://stackoverflow.com/questions/34825789/install-lxml-on-centos-7-error-command-gcc-failed-with-exit-status-4)一样

`'gcc' failed with exit status 4`

具体如下

```
  ···

  running build_ext
    building 'lxml.etree' extension
    creating build/temp.linux-x86_64-3.7
    creating build/temp.linux-x86_64-3.7/src
    creating build/temp.linux-x86_64-3.7/src/lxml
    gcc -Wno-unused-result -Wsign-compare -DNDEBUG -g -fwrapv -O3 -Wall -DTHREAD_STACK_SIZE=0x100000 -fPIC -DCYTHON_CLINE_IN_TRACEBACK=0 -I/usr/include/libxml2 -Isrc -Isrc/lxml/includes -I/usr/local/include/python3.7m -c src/lxml/etree.c -o build/temp.linux-x86_64-3.7/src/lxml/etree.o -w
    gcc: internal compiler error: Killed (program cc1)
    Please submit a full bug report,
    with preprocessed source if appropriate.
    See <http://gcc.gnu.org/bugs.html> for instructions.
    Compile failed: command 'gcc' failed with exit status 4
    cc -I/usr/include/libxml2 -I/usr/include/libxml2 -c /tmp/xmlXPathInitvuz17qeg.c -o tmp/xmlXPathInitvuz17qeg.o
    /tmp/xmlXPathInitvuz17qeg.c:2:1: warning: return type defaults to 'int' [-Wimplicit-int]
     main (int argc, char **argv) {
     ^~~~
    cc tmp/xmlXPathInitvuz17qeg.o -L/usr/lib -lxml2 -o a.out
    error: command 'gcc' failed with exit status 4
    
    ----------------------------------------
Command "/usr/local/bin/python -u -c "import setuptools, tokenize;__file__='/tmp/pip-install-9plrs64w/lxml/setup.py';f=getattr(tokenize, 'open', open)(__file__);code=f.read().replace('\r\n', '\n');f.close();exec(compile(code, __file__, 'exec'))" install --record /tmp/pip-record-ee3ss7qu/install-record.txt --single-version-externally-managed --compile" failed with error code 1 in /tmp/pip-install-9plrs64w/lxml/
ERROR: Service 'sanic' failed to build: The command '/bin/sh -c apk add --no-cache --virtual .build-deps     ca-certificates make gcc postgresql-dev linux-headers musl-dev libxslt-dev    libffi-dev jpeg-dev zlib-dev     && pip install -r requirements.txt' returned a non-zero code: 1

···

```

贴近问题的是[这个回答](https://stackoverflow.com/a/24547445/10005510)

看下内存:

```
$ free -m
              total        used        free      shared  buff/cache   available
Mem:            991         177         574          50         238         612
Swap:             0           0           0
```

确实很少。。

既然物理内存不方便增加，增加swap是貌似最简单的方法了。具体方法参考[digitalocean的文章](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-centos-7)

```shell
sudo fallocate -l 4G /swapfile  # 新建swap文件
sudo chmod 600 /swapfile # 限制权限
sudo mkswap /swapfile # 设置swap
sudo swapon /swapfile # 启用swap
```

之后

```
$ free -m
              total        used        free      shared  buff/cache   available
Mem:            991         182         547          50         260         607
Swap:          4095           0        4095
```

然后再`docker-compose up`就顺利跑通了。
