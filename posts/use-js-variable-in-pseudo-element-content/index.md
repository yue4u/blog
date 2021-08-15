---
title: 在css的伪元素中使用JS变量
date: 2019-07-07 13:38:47
tags:
  - css
  - js
---

在做学校的一个项目，同组的成员做了这样的设计：

![](./custom-properties-movie.png)
显然背景的镂空文字可以使用 `pseudo-element` 和 `-webkit-text-stroke`, 但是问题是怎么使背景文字和文字一样。当然改变设计也是一个选择，但是感觉这样还不错于是想尝试一下能否实装。

在 js 中并不能简单的向 css 传递变量，于是在这时候就需要用一些特殊的技巧。

## custom properties

[Mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)的介绍

首先在 html 中设置 `custom properties` 比如

```html
<h1 style="--content: '标题文字'">标题文字</h1>
```

然后在 css 中获取设置的变量。

```css
&::after {
  content: var(--content);
}
```

最后的代码如下

## SCSS

```scss
.section-title {
  position: absolute;
  writing-mode: vertical-rl;
  font-size: 5rem;
  transform: rotateZ(180deg);
  color: orange;
  right: 1rem;
  bottom: 3rem;
  &::after {
    position: absolute;
    color: transparent;
    top: 5px;
    left: 5px;
    z-index: -1;
    content: var(--content);
    -webkit-text-stroke: 2px #fff;
  }
}
```

## vue

![](./custom-properties-vue.png)

```vue
<s-section-title text="Movie" />
```

```vue
<template>
  <h1 class="section-title" :style="{ '--content': `'${text}'` }">
    {{ text }}
  </h1>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: "",
      },
    },
  }
</script>
```

## React

![](./custom-properties-react.png)

```jsx
<Topic text="Learn React" />
```

```jsx
export default function Topic({ text }) {
  return (
    <h1
      className="section-title"
      style={{
        "--content": `"${text}"`,
      }}
    >
      {text}
    </h1>
  )
}
```
