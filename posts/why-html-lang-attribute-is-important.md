---
title: about html lang attribute
date: 2019-04-14 19:37:23
tags:
  - html
---

有关`lang`属性。

先是简单的例子。

<iframe src="https://codesandbox.io/embed/4xoxqnrv2x?fontsize=14" title="4xoxqnrv2x" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

代码如下。

```html
<h1>浅色颜料</h1>
<h2>abcdefghijklmnopqrstuvwxyz</h2>
<button>change language</button>
```

```js
let lang = "en"
let tag = document.querySelector("html")

document.querySelector("button").onclick = () => {
  lang = lang === "en" ? "ja" : "en"
  tag.setAttribute("lang", lang)
}
```

可见每次点击按钮时由于`lang`属性变化，汉字字体发生了变化。
从此可知`lang`属性不仅和 SEO 相关，甚至会影响浏览器渲染结果。
