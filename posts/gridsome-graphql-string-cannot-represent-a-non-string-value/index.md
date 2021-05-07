---
title: Gridsome "String cannot represent a non string value" Error
date: 2019-07-14 14:55:57
---

## error

```json
{
  "errors": [
    {
      "message": "Variable \"$id\" got invalid value 194; Expected type String. String cannot represent a non string value: 194",
      "stringified": "Variable \"$id\" got invalid value 194; Expected type String. String cannot represent a non string value: 194\n\nGraphQL request:1:15\n1 | query Teacher($id: String!) {\n  |               ^\n2 |   teacher: teacher(id: $id) {"
    }
  ],
  "extensions": { "context": {} }
}
```

## issues on github

[https://github.com/gridsome/gridsome/issues/243](https://github.com/gridsome/gridsome/issues/243)

## cause

```js
Object.entries(collection).map(([key, val], id) => {
  contentType.addNode({
    id,
    ...val,
  })
})
```

`id` here is number.

## fix

```js
Object.entries(collection).map(([key, val], id) => {
  contentType.addNode({
    id: id.toString(),
    ...val,
  })
})
```
