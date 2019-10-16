---
title: useSpringsの型を治す
date: 2019-10-16 22:19:26
tags:
---

いろんなわけがあって、`react-spring`の[デモ](https://codesandbox.io/embed/j0y0vpz59)を typescript 化してみた、途中に謎のタイプエラーを遭遇して、それを解決するまでの推理を記録してみる。

デモコーデの中にこういう実装があった。

```ts
set(i => {
  if (index !== i) return
  const isGone = gone.has(index)
  const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0
  const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0)
  const scale = down ? 1.1 : 1
  return {
    x,
    rot,
    scale,
    delay: undefined,
    config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
  }
})
```

そもままのタイプを使うと `set(i => {`の行が以下のエラーが出る

```
(parameter) i: any
Parameter 'i' implicitly has an 'any' type.ts(7006)
No overload matches this call.
  Overload 1 of 2, '(ds: Partial<Merge<{ from: DeckProps; x: number; y: number; scale: number; rot: number; delay?: number | undefined; } & UseSpringBaseProps, { from?: Partial<Pick<{ from: DeckProps; x: number; y: number; scale: number; rot: number; delay?: number | undefined; }, "x" | ... 2 more ... | "rot">> | undefined; onRest?(ds: Partial<...>): void; }>>): void', gave the following error.
    Type '(i: any) => { x: number; rot: number; scale: number; delay: undefined; config: { friction: number; tension: number; }; } | undefined' has no properties in common with type 'Partial<Merge<{ from: DeckProps; x: number; y: number; scale: number; rot: number; delay?: number | undefined; } & UseSpringBaseProps, { from?: Partial<Pick<{ from: DeckProps; x: number; y: number; scale: number; rot: number; delay?: number | undefined; }, "x" | ... 2 more ... | "rot">> | undefined; onRest?(ds: Part...'.
  Overload 2 of 2, '(i: number): Partial<Merge<{ from: DeckProps; x: number; y: number; scale: number; rot: number; delay?: number | undefined; } & UseSpringBaseProps, { from?: Partial<Pick<{ from: DeckProps; x: number; y: number; scale: number; rot: number; delay?: number | undefined; }, "x" | ... 2 more ... | "rot">> | undefined; onRest?(ds: Partial<...>): void; }>>', gave the following error.
    Argument of type '(i: any) => { x: number; rot: number; scale: number; delay: undefined; config: { friction: number; tension: number; }; } | undefined' is not assignable to parameter of type 'number'.ts(2769)
```

つまり `set(i => {})`の引数の型が間違っていて、関数を渡すはずなのに、何故か`number`しか渡せなくってエラーが出る。

となると、`set`関数自体の型が間違た可能性が高く、追跡すると`set`は`useSprings`の返り値によって定義されていた。

```ts
const [props, set] = useSprings(cards.length, i => ({
  ...to(i),
  from: from(i),
}))
```

よって、`useSprings`の返り値の型は多分合っていない。

自然に`useSprings`の返り値の型定義を見に行って、以下のコードになっていた。

```ts
export function useSprings<DS extends object>(
  count: number,
  getProps: (i: number) => UseSpringProps<DS>
): [AnimatedValue<ForwardedProps<DS>>[], SetUpdateCallbackFn<DS>]
```

エラーが出ているのは後半の`set`関数なので、前半の`AnimatedValue<ForwardedProps<DS>>[]`を置いといて、`SetUpdateCallbackFn<DS>`の型定義を見に行く。

```ts
export interface SetUpdateCallbackFn<DS extends object> {
  (ds: Partial<UseSpringProps<DS>>): void
  (i: number): Partial<UseSpringProps<DS>>
}
```

よく見ると、`SetUpdateCallbackFn`の定義はどれにも当てはまらず、下のほうの定義が近いが、`(i: number): Partial<UseSpringProps<DS>>`のように定義すると`set`関数の第一引数は`number`になっているので、`set(i => { ... })`のように使えない。よって、正しい型は以下になる。

```ts
export interface SetUpdateCallbackFn<DS extends object> {
  (cb: (i: number) => Partial<UseSpringProps<T>> | undefined): void
}
```

`AnimatedValue`の部分とまとて、以下になる。

```ts
type useSpringsOverride<T extends Object> = [
  AnimatedValue<T>[],
  (cb: (i: number) => Partial<UseSpringProps<T>> | undefined) => void
]
```

これを使って type cast する

```ts
const [props, set] = useSprings(cards.length, i => ({
  ...to(i),
  from: from(i),
})) as useSpringsOverride<DeckProps>
```

これでエラーが消えて、`set(i => { ... }`の部分にマウスをかざして `(parameter) i: number`が正しく表示されるようになった。
