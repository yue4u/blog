---
title: Typescript-meetup 19-07-09
date: 2019-07-10 19:44:59
---

## スポンサー: FiNC

### 会社概要

老齢化 => 生活習慣の改善

新規開発全部 TS

### TS + QraphQL 案件

- Type gen
- Ahead of time query parsing

`apollo-tooling`

#### customer transfromer

gql => AST => parse at build time

`ts-transfrom-graphql-tag`

two type systems |> `static analyze`

## Meta Libray & Meta Type def

### Vuex 型の課題解決

メタ型定義　=> Compilar API

ツリー構造　 VS 　型推論

[Compilar API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)

[https://talks.leko.jp/](https://talks.leko.jp/)

## 非破壊 Typescript

Modern JS ~= Typescript

人間のためのインターフェイス宣言

Typescript is Linter
moEmit && transplie:noe

型とロジック同時修正しない

コスパ順番

- ORM
- API
- Model/Store
- View
- View State

DB && API 周り が一番重要

....

## Talk Battle

```js
let settings = isLibrary ? "硬い" : "ゆるふわ"
```

`FIXME_any`

`release note`を読む
