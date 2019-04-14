---
title: useReducer & Typescript
date: 2019-02-19 05:07:13
tags:
 - react
 - typescript
---

`useReducer`与Typescript的类型计算。

<!-- more -->

## 例子

从一段简单的代码开始。

```tsx
import React, { useReducer } from "react";

type State = {
  count: number;
};

type Action = {
  type: "increase" | "decrease";
};

export default function Demo() {

  const initialState: State = {
    count: 0
  };

  const reducer = (prev: State, action: Action) => {
    switch (action.type) {
      case "increase":
        return { count: prev.count + 1 };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <button onClick={() => dispatch({ type: "increase" })}>+</button>
      <button onClick={() => dispatch({ type: "decrease" })}>-</button>
      <span>{state.count}</span>
    </>
  );
}
```

如果简单复制粘贴代码进`vscode`，可以看到在`useReducer `的`initialState `位置显示如下错误。

```
Argument of type 'State' is not assignable to parameter of type 'never'.ts(2345)
const initialState: State
```

但是为什么`useReducer`的第二个参数类型会是`never`呢？

检查`react`的`index.d.ts`可以看到如下定义

```ts
function useReducer<R extends Reducer<any, any>, I(
       reducer: R,
       initializerArg: I & ReducerState<R>,
       initializer: (arg: I & ReducerState<R>) =>ReducerState<R>
   ): [ReducerState<R>, Dispatch<ReducerAction<R>>;

type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;

type Reducer<S, A> = (prevState: S, action: A) => S;
```

显而易见此时的`reducer `缺少了对`{type:"decrease"}`的处理。如果hover到`reducer`上，可以看到这个函数实际的类型:

```ts
const reducer: (prev: State, action: Action) => {
    count: number;
} | undefined
```

从中可以得出，例子中`useReducer`传入的`reducer`传回的类型从根本上不满足`Reducer`类型的定义(传回的类型不满足`State`类型定义)，因而导致`ReducerState<R>`的值为`never`。

进而，`initializerArg: I & ReducerState<R>`的类型为`never`，所以出现了此时的报错。


## 改进

其实说不定聪明的你已经注意到了，应该在`reducer`定义的位置显示表示传回参数类型，这样在不满足时能够显示正确的错误。

代码如下

```ts
const reducer = (prev: State, action: Action): State => {
//...not always returning State type
};
```

可以看到正确的报错

```
Function lacks ending return statement and return type does not include 'undefined'.
```

完善`reducer`：

```ts
const reducer = (prev: State, action: Action): State => {
  switch (action.type) {
    case "increase":
      return { count: prev.count + 1 };
    case "decrease":
      return { count: prev.count - 1 };
  }
};
```

就能正常编译运行了。


之前阅览的某些教程为了取消报错，修改`prev: State`为`prev: any`，同样不显示标记返回类型，个人认为不是好的做法。


## 参考

+ [& operator](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
+ [Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html)