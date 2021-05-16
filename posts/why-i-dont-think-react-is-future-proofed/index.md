---
title: 为什么我不看好现在的React
date: 2021-05-14 04:25:02
tags:
  - frontend
  - react
---

> Disclaimer: 个人观点, 基于个人使用感想不一定反映实际情况。

我最初接触到`vue`是在 2017 年,　然后在2018年开始工作中开始同时使用 `vue`和`react`. 也算是经历了 `Class Component` -> `hooks`, `vue2` -> `vue3`的变化。本文结合这些经历谈一谈为什么我现在觉得`react hooks`其实不是一个好API, `react`和`vue`的现状, 以及其他react ecosystem的问题

import Tweet from "@/extra/tweet"

## hooks

现在新写`react`项目的时候, `hooks`是唯一选择, 相比以往的`Class Component`时代有很大的改进, 然而在经过几年使用之后, 可以切身体会到hooks其实并不是那么便于使用, 很容易出现各种问题, 也相对verbose需要boilerplate.

我们仔细看看一个使用hooks例子.

```tsx
import React, { useState, useEffect } from 'react';
 
function App() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://example.com');
      const data = await res.json(); 
      setData(data);
    };
    fetchData();
  }, []);
 
  return (
  // ...
  );
}
```

在这里看起来干净简单的Component, 其实在实际使用上存在有很多潜在的问题.

### (在重重限制下)重新发明轮子

`useState`等的hooks, 需要和正常写代码很不一样的心智模型, 也有很多的限制 [hooks-rules](https://reactjs.org/docs/hooks-rules.html).

- Only Call Hooks at the Top Level
  - Don’t call Hooks inside loops, conditions, or nested functions.
- Only Call Hooks from React Functions

其中明确说明在循环, 条件和嵌套函数中不能使用hooks. 这些问题习惯之后相对不会遇到这些问题, 但是这些是由于hooks实现而非js自身的限制, 对于初学者并不友好. 而且这些条件是隐形的(并且是灾难性的!), 如果不配合使用eslint有时很难注意到. 

长期使用hooks下来, 很多时候会感到 `const [xxx, setXxx] = useXxx(init);`其实很罗嗦. 因为本质上的行为和 `let x = init; x = 1`没有很大区别, 但是敲大量需要额外的代码. (我不觉得snippet是一个好的解决手段)

<Tweet url="https://twitter.com/buildsghost/status/1334578160948498434" />

除此之外, `setXxx`会造成整个组件的再渲染, react官方的宣称除非有实际性能影响否则不会造成问题, 然而实际上出现性能问题时, 

1. 需要进行实际benchmark(并不是那么容易做) 
2. 需要做手动优化(`useCallback`, `useMemo`, ...)
3. 手动优化可能造成state和UI的不一致 
4. 如果使用 `useRef`, 那么需要回到起点由编写者自己管理state变化, 和使用react的目的背道而驰.

在组件中使用react本身提供的hooks的时候, 大部分比不上`mutation`直接. 
比如svelte, 或者使用 [script setup RFC](https://github.com/vuejs/rfcs/pull/227) 的vue3, 需要考虑的东西相当少的多, 语法也接近js本身.(it just works™)

<Tweet url="https://twitter.com/youyuxi/status/1380318093113753601" />

svelte

```html
<script>
let count = 0;
</script>

<p>{count}</p>
<button type="number" on:click={() => count +=1}> + </button>
<button type="number" on:click={() => count -=1}> - </button>
```

vue

```html
<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p>{{ count }}</p>
  <button @click="count -= 1"> + </button>
  <button @click="count += 1"> - </button>
</template>
```

`useEffect`类似手动的 `watch(...)`, 但是有着更多使用上的痛点, 首当其冲就是异步处理, 需要多一层warp, (还不包括错误处理, 请求的状态管理(cancel)等). 其次需要手动写所有的dependents, (并不是reactive by themselves)

此外, hooks造成了运行环境的分割, hooks的逻辑无法在react外使用, 外部的第三方库也为了支持react也需要追加处理. 最简单的例子就是`rxjs`, 

<Tweet url="https://twitter.com/BenLesh/status/1334950823965634567" />

## useGlobalState?

如果说了那么的多react本身的问题, 那么为什么不使用库避免呢? 然而选择react的库又是另一个问题, 最典型的例子是react至今仍然没有一个官方的全局状态管理方案. `useContext` 显然可以解决一部分问题, 然而并不能解决全部, 不然也不会有那么多不同状态管理库(`redux`, `recoil`, `zustand`, ...)和状态管理库的库(`reselect`, `redux-toolkit`, `redux-thunk`, ...)存在了. 

在其中取舍并不是一件简单的事情. 在其中最有名, 生态最完善的`redux`在去年的 [state-of-js调查中](https://2020.stateofjs.com/en-US/technologies/)呈现了明显的下降趋势.

![](./state-of-redux-2020.png)

同样, 尚未正式发布的`Concurrent Mode`也(可能)引起许多问题. [useMutableSource](https://github.com/reactjs/rfcs/pull/147)的rfc解决了一部分breakage, 但是实际上使对应的情况并没得到`Concurrent Mode`的恩惠.

## JSX与AOT优化

在`vue3`/`vite`发布之前,选择`react`的很大一部分原因是由于优秀的typescript支持和贴近js的语法. 然而由于react和jsx的限制, 运行时比起`vue`, `svelte`等拥有自己`AOT`(ahead of time)编译优化能力的框架会多出很多runtime计算(svelte甚至不需要VDOM). 其次由于react的渲染时会进行`props的full diff`, 同样会造成速度的下降, 出现在`vue`, `svelte`中不存在的性能问题. 

这在某种程度上可以被[server components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)所解决, 但是`server-components`目前看来会需要特定的服务器(BFF / middleware), 也就是nodejs限定, 这或许造成另外的瓶颈.

在[上一篇文章](/posts/graphql-rust-with-vue3-and-gcp)中也有提到在使用`Volar`([johnsoncodehk/volar](https://github.com/johnsoncodehk/volar))之后, 实际的typescript支持并不比react有任何差距.

现在react的主流环境还是以webpack为主, 相比`esbuild`基础的`vite`编译速度和开发体验不是一个数量级别. 最近个人的开发的项目也几乎只使用了`vite`+`vue3`. 当然`vite`也支持`react`, 虽然并不能看到`react`社区有明显的动作.

说到`优秀的typescript支持`, react自身还有一个巨大的问题 -> `written in flow`, react自身也有遇到[flow起因的问题](https://github.com/facebook/react/search?q=%24FlowFixMe). 显然flow相对typescript并不是那么成功, 那么react会使用flow到什么时候呢...?

![](./flow-fix-me.png)

## Framework as a business

最后有关react的问题是两大框架`next.js`和`gatsby`的商业化以及对开源的态度转变. 

最先显现出这一点的是`gatsby`的`Incremental Builds`, 这一功能最初在[2020年4月的官方blog](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds)作为Gatsby Cloud的专享功能被介绍. 长期以来`gatsby`的编译速度一直是很大问题, 一些相对大型网站甚至需要小时单位的编译时间. 然而部分解决这个问题的`Incremental Builds`, 直到一年后的[2021年4月](https://www.gatsbyjs.com/docs/reference/release-notes/v3.0/#incremental-builds-in-oss)才被发布.

同样`next.js`对自定义webpack设定的艰难程度非常有名. 许多功能 `serverless functions` 和 `Automatic Static Optimization`等不被`Custom Server`所支持, 在`vercel`之外想要自己部署SSG也并不是那么简单. 

在各方面可以感受到`next.js`和`gatsby`的核心团队的开发方向并不是那么纯粹(甚至可能比不上facebook的react), 顾及自己的公司利益也是无可厚非. 但是作为一般开发者真的有向一家公司无偿提交issue/debug/发pr的愿望吗? 然而相对`vue`等OSS来说, 有着更好的资金来源是无法否定的优势条件.

## 其他

### react优势

`react`由于`react reconciler`的存在和相对纯粹的组件模型, 渲染对象不单纯是DOM, 可以是任意的对象, 这也早就就基于JSX的意想不到的功能实现. 其中包括

- [`React Native`](https://reactnative.dev)
  - android / ios app
- [`react-three-fiber`](https://github.com/pmndrs/react-three-fiber)
  - 基于react的three.js渲染
- [`Remotion`](https://www.remotion.dev)
  - 基于react的视频制作
- [`ink`](https://github.com/vadimdemedes/ink)
  - 基于react的cli框架

要想和这些库达到同一水平不是很简单.

### Remix

[`Remix`](https://remix.run/)是另一个口碑很好?的react框架, 许多用过多人宣称解决了现在react的很多问题, 然而最低需要[$250/yr](https://remix.run/buy)的付费许可, 因此本文不与讨论.

### Preact

我其实一直对`preact`非常的看好, 可惜因为这个那个没有长期使用的经验. 然而react以及next.js的作者对`preact`持有不同的意见.有关的议论可见下面的推和原来的thread.

<Tweet url="https://twitter.com/rauchg/status/1343379468077842433" />

<Tweet url="https://twitter.com/dan_abramov/status/1345364771554668544" />

<Tweet url="https://twitter.com/_developit/status/1386702129314816003" />

## Wrap it up

现在`react`的问题来源非常的复杂. Hooks/JSX等的设计问题, 既有的负面财产(flow/webpack), 开发体制(OSS or business)等等. 相比之下我认为现状`vue`和`svelte`处于优势([svelte kit](https://kit.svelte.dev/)基于vite!), 作为前端开发着也相当写起来`fun`&`productive`. 

React的这些问题在我看来在短期内难以被得到解决, 可能将来一段时间`vite`+`vue3`仍然会是我的前端go-to framework.