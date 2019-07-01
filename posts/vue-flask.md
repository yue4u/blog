---
title: vue+flask 网站搭建
date: 2018-01-04 13:45:09
tags: 
- vue
- javascript
- python
- flask
---


<style>
.vue{
	color: #42b983;
	font-size: 30px;
}

.pitfall{
	color: #FF6E64; 
	font-size:35px;
}
h3{
font-size:25px;
}
</style>



上周用vue做前端、flask做后端独立做了一个个人网站，大致做了登录验证、词汇查询储存、和在线聊天室几个部分。因为是第一次接触vue查阅资料还是折腾蛮久。


 

<p style="font-size:25px; font-family:Lucida Console, Monaco, monospace">(Vue, Flask, ...rest) => website</p>

<h2><span class="vue">#&nbsp;</span>前言 </h2>

---

想想17年4月的时候做了个[组队工具](https://minatsuki-yui.github.io/teambuilder/redo.html),虽然没完全做完，那时候一开始是想用`Bootstrap`的，但还是用不习惯，最后大部分都是`jQuery`以及硬写的`css`和`html`。

现在去查前端资料大部分都是`Vue`、`React`、`Angular`这些，相关联的技术也变化了很多，比如`Node.js`和`npm`管理工具、`Webpack`、`Babel`这些，为了部署方便甚至差点去学`docker`。<del>虽然博客在用的hexo就是基于Node.js</del>

当时写了无数的`var`，这次在使用`web storm`的IDE的时候，每一个都提示改成`ES6`标准的`const`或者`let`，箭头函数的出境率也比原来高了很多。前端的世界变化速度真是惊人。

前端在`Vue`和`React`之间考虑了一会儿，还是选择了`Vue`，因为学习成本相对低一些，而我也并不是很习惯`CSS in JS`，但是不知道为什么写js总是没有写python开心，很多地方都得绕弯实现 <del> 比如要返回一个列表里的随机项 </del>( ；´Д｀)，但是`Vue`用起来还算舒服。


后端在`Flask`和`Django`之间也考虑了一会儿，还是选择了`Flask`，因为在有了`Vue`前端渲染和路由之后基本上自己需要的只是一个`RESTFUL API`，而`Django`稍微有点太重了。


<h2><span class="vue">#&nbsp;</span>演示 </h2>

<span class="pitfall">✡&nbsp;</span>图片仅供参考，无意侵犯版权。以及做GIF时咖啡店网不是很好，实际上反馈会好得多。

图1 [https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50945552](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=50945552)

图2 [https://www.pixiv.net/member_illust.php?mode=medium&illust_id=64495434](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=64495434)

<img src="https://storage1.cuntuku.com/2018/01/04/Kw736.gif" alt="Kw736.gif" border="0" />

添加时会自动判断语言，中文查wiki，英文有道，日文的话大辞林。

<a href="https://cuntuku.com/image/KwIZr"><img src="https://storage4.cuntuku.com/2018/01/04/KwIZr.gif" alt="KwIZr.gif" border="0" /></a>


<img src="https://storage7.cuntuku.com/2018/01/04/Kwwcd.gif" alt="Kwwcd.gif" border="0" />



<h2><span class="vue">#&nbsp;</span>传送门 </h2>

---

在中文环境里查`Vue`和`Flask`相关的教程时，大部分都有缺失或者不完整，几乎很难找到一个完整能跟着做完的项目，最后还是读了一个英文的。因为自己理解的也不是很透彻，并不时很想把自己经验完整写出来误导他人，在这里把这篇推荐给需要的人：

[Full-stack single page application with Vue.js and Flask](https://codeburst.io/full-stack-single-page-application-with-vue-js-and-flask-b1e036315532)

以及`Vue2`的[官方文档](https://cn.vuejs.org/v2/guide/)……虽然有中文是好事，但是要用起来还是需要许多googling。

相关联的附带技术大致有：  
`Vuex`、`axios`、`socket.io`、`certbot`、`vue-awesome`……

1. [Vuex官方文档](https://vuex.vuejs.org/zh-cn/intro.html)（数据管理）
2. [Vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)
3. [axios全攻略](https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/)(实现ajax数据请求）
4. [Socket.io](https://segmentfault.com/a/1190000009369312)（聊天室相关、参考vue前端部分）
5. [Flask-SocketIO](https://github.com/miguelgrinberg/Flask-SocketIO)(socket.io的flask后端)
6. [如何免费的让网站启用HTTPS](https://coolshell.cn/articles/18094.html)(启用Let's Encrypt的https)
7. [vue-awesome](https://github.com/Justineo/vue-awesome)(icon)

<h2><span class="vue">#&nbsp;</span>爬坑与一些微代码实现</h2>

<span class="pitfall">✡&nbsp;</span>因为是复盘所以可能顺序比较乱

<h3><span class="pitfall">⇝&nbsp;</span>1.跨域 </h3>在开发时flask和vue分别在两个端口运行，需要做一下跨域访问。  

可以使用`flask_cors`

<h3><span class="pitfall">⇝&nbsp;</span> 2.axios发送的json数据</h3>

flask收不到时有两种解决办法：

1.在`main.js`设置全局发送类型

```javascript

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

2.在`.vue`文件中具体使用qs的stringfy  

(需要先在`main.js`设置`Vue.prototype.$http = axios;`)

```javascript
import qs from 'qs'
this.$http.post('/api/...',qs.stringify(yourdata))
            .then(response => {
            ...
            }
```

<h3><span class="pitfall">⇝&nbsp;</span>3.设置全局body部分背景 </h3>

在`app.vue`中设置`beforeCreate`

```javascript
beforeCreate: function() {
    document.body.className = 'xxx';
       }
```
     
```css
<style>
body.xxx{
  background: url("./assets/xxxx.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  background-attachment: fixed;
}
</style>
```

<h3><span class="pitfall">⇝&nbsp;</span>4.table中transition-group动画设置 </h3>

使用`tbody`标签。大致如下:

<iframe src="http://jsfiddle.net/174t0xa1/embedded/?username=minatsuki"></iframe>


<h3><span class="pitfall">⇝&nbsp;</span>5. v-for 标签的绑定</h3>

多使用一个`index`作为active标记

[https://stackoverflow.com/questions/45198393/v-for-causing-actions-to-be-applied-to-all-divs](https://stackoverflow.com/questions/45198393/v-for-causing-actions-to-be-applied-to-all-divs)

<iframe src="http://jsfiddle.net/nqhgpv5y/embedded/?username=minatsuki"></iframe>

<h3><span class="pitfall">⇝&nbsp;</span>6.登录前路由守卫 </h3>
参考[https://www.jianshu.com/p/8e789516af5e](https://www.jianshu.com/p/8e789516af5e)

```javascript
router.beforeEach((to, from, next) => {

  if (localStorage.isLogin === 'ok') {
    next()
  }else {
    if (to.path.indexOf('login')>= 0){
    next()
  }else {
      next('/login');}
    }
});
```

<h3><span class="pitfall">⇝&nbsp;</span>7.生命周期由于名称问题无效 </h3>

`methods `,`created`之类的，注意时态和复数。。写成`method`,`create`之类谁也救不了。

<h3><span class="pitfall">⇝&nbsp;</span>8.为flask配置ssl证书 </h3>

[Running Your Flask Application Over HTTPS](https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https)

```python
 #app.run(host='0.0.0.0',
 port=443, 
 ssl_context=('/etc/letsencrypt/live/..(your domain)../fullchain.pem',
 '/etc/letsencrypt/live/..(your domain)../privkey.pem'))
    
```

<h3><span class="pitfall">⇝&nbsp;</span>9.可编辑table </h3>

<iframe src="http://jsfiddle.net/xr630a8t/embedded/?username=minatsuki"></iframe>


<h3><span class="pitfall">⇝&nbsp;</span>10.有关`socket.io` </h3>

vue中：

<iframe src="http://jsfiddle.net/4h68rkwc/embedded/?username=minatsuki"></iframe>

Flask中：

不知道是不是前端socketio版本问题，虽然是npm安装的，需要后台处理编码。不然中文会乱码。

如下面的`.encode('Latin1').decode('utf-8')`

```

app = Flask(__name__,
            static_folder = "../dist/static",
            template_folder = "../dist/")

socketio = SocketIO(app)


@socketio.on('newMsg', namespace='/')
def test_message(message):
    emit('msg', {'who': message['who'],'data': message['data'].encode('Latin1').decode('utf-8')}, broadcast=True)
    
socketio.run(app,host='0.0.0.0',
             port=443, 
             sssl_context=('...pem','...pem'))
    
```

<h3><span class="pitfall">⇝&nbsp;</span>11.有关webstorm不停的indexing。。</h3>
上两个评论作为吐槽。。[链接](https://intellij-support.jetbrains.com/hc/en-us/community/posts/207671405-stop-Indexing-please-)

<img src="https://farm5.staticflickr.com/4680/38784054184_d27a122aa1.jpg" width="500" height="373" alt="屏幕快照 2018-01-04 下午5.39.24">

<img src="https://farm5.staticflickr.com/4689/24625849217_66a963e9c2_z.jpg" width="640" height="196" alt="屏幕快照 2018-01-04 下午5.39.33">
个人解决办法是尽可能多的文件和文件夹设置exclude。比如node.js自带的文件。
假如pycharm和webstorm一起使用的话会互相影响。。暂时没好的办法。

<h2><span class="vue">#&nbsp;</span>总结 </h2>

1. 虽然还没完全做完，但估计还会继续维护下去。
2. 一个人完成全部虽然挺累的，但是也有很大收获。非常期待以后能和大神合作。
3. css还是才用了普通的硬写，下次可以尝试一下`SASS`什么的
4. 事实上因为对python比较熟悉，90%的时间都在写前端。后端怎么简单怎么来，也直接接进了个人机器人的项目[faya](https://github.com/minatsuki-yui/faya)。因而文中python部分比较简略。
5. 每个部分其实都可以拆出来写一篇文章，然而这里只做简要记录。如果有不懂或者疑问，欢迎自由留言。