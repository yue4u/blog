---
title: About webpack externals
date: 2020-04-01 23:21:23
tags:
  - new
---

由于一些原因需要使用`webpack`交叉编译一个`ts` + `yarn workspace`的 app。web 端没有什么遇到什么问题，但是交叉编译服务器端一直报错，查阅了很多资料终于解决。

- [简单的可以运行的例子](https://github.com/rainy-me/webpack-express-ts-monorepo)

项目构成

```
.
├── package.json
├── packages
│   ├── script
│   │   ├── package.json
│   │   ├── server.ts
│   │   ├── tsconfig.webpack.json
│   │   └── webpack.server.ts
│   └── server
│       ├── index.ts
│       └── package.json
├── tsconfig.json
└── yarn.lock

3 directories, 9 files
```

简单的 server.ts

```ts
import express from "express"

const startServer = () => {
  const app = express()

  app.get("/", (_, res) => {
    res.send("ok")
  })

  app.listen(3000, () => {
    console.log("listening on 3000")
  })
}

export default startServer
```

最开始的 `webpack.server.ts`长这个样子。没什么特别的

```ts
import path from "path"
import webpack, { Configuration } from "webpack"
const serverSrc = path.resolve(__dirname, "./server.ts")
const distRoot = path.resolve(__dirname, "./dist")

const serverConfig: Configuration = {
  mode: "production",
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    server: serverSrc,
  },
  output: {
    path: distRoot,
    filename: "server.js",
  },
  resolve: { extensions: [".js", ".ts"] },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new webpack.ProgressPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
}

export default serverConfig
```

运行得到以下错误

```log
WARNING in /home/yue/projects/webpack-express-ts-monorepo/node_modules/express/lib/view.js 81:13-25
Critical dependency: the request of a dependency is an expression
 @ /home/yue/projects/webpack-express-ts-monorepo/node_modules/express/lib/application.js
 @ /home/yue/projects/webpack-express-ts-monorepo/node_modules/express/lib/express.js
 @ /home/yue/projects/webpack-express-ts-monorepo/node_modules/express/index.js
 @ /home/yue/projects/webpack-express-ts-monorepo/node_modules/@package/server/index.ts
 @ ./server.ts

ERROR in server.js from Terser
Unexpected token: punc (:) [server.js:8974,12]
error Command failed with exit code 2.
```

经过查询，最常见的方法是使用 `webpack-node-externals`这个库将部分不适合 bundle 的库除外。于是进行修改

```diff
+  externals: [nodeExternals()],
```

再度编译还是得到相同错误。

```
ERROR in server.js from Terser
Unexpected token: punc (:) [server.js:8974,12]
```

再度查阅资料在这个问题里有提到`yarn workspace`需要做不同的处理，遇上按照[这个回答](https://stackoverflow.com/a/53453054)再度修改，将根目录的`node_modules`也加入 exclude 对象。

```diff
-  externals: [nodeExternals()],
+  externals: [
+    nodeExternals(),
+    nodeExternals({
+      modulesDir: path.resolve(__dirname, '../../node_modules'),
+    }),
+  ],
```

`yarn build` 得到以下结果

```log
yarn run v1.22.4
$ yarn workspace @package/script build
warning package.json: No license field
$ TS_NODE_PROJECT=./tsconfig.webpack.json webpack --config webpack.server.ts
Hash: 571930a4d43752f5eb7a
Version: webpack 4.42.1
Time: 163ms
Built at: 04/01/2020 11:47:55 PM
    Asset      Size  Chunks             Chunk Names
server.js  1.12 KiB       0  [emitted]  server
Entrypoint server = server.js
[0] ./server.ts 296 bytes {0} [built]
[1] external "@package/server" 42 bytes {0} [built]
Done in 3.23s.
```

交叉编译成功了诶！可以洗洗睡了！睡前`yarn start`运行一下交叉编译成果吧。

```log
yarn run v1.22.4
$ yarn workspace @package/script start
warning package.json: No license field
$ node ./dist/server.js
/home/yue/projects/webpack-express-ts-monorepo/packages/server/index.ts:1
import express from "express";
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at wrapSafe (internal/modules/cjs/loader.js:1063:16)
    at Module._compile (internal/modules/cjs/loader.js:1111:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1167:10)
    at Module.load (internal/modules/cjs/loader.js:996:32)
    at Function.Module._load (internal/modules/cjs/loader.js:896:14)
    at Module.require (internal/modules/cjs/loader.js:1036:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (/home/yue/projects/webpack-express-ts-monorepo/packages/script/dist/server.js:1:1118)
    at r (/home/yue/projects/webpack-express-ts-monorepo/packages/script/dist/server.js:1:110)
    at Object.<anonymous> (/home/yue/projects/webpack-express-ts-monorepo/packages/script/dist/server.js:1:1077)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
error Command failed.
Exit code: 1
Command: /usr/bin/node
Arguments: /usr/lib/node_modules/yarn/lib/cli.js start
Directory: /home/yue/projects/webpack-express-ts-monorepo/packages/script
Output:

info Visit https://yarnpkg.com/en/docs/cli/workspace for documentation about this command.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

什么，`packages/server`根本没有被交叉编译！！？？

看一眼交叉编译出来的文件：

<!-- prettier-ignore -->
```js
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(r(1)).default()},function(e,t){e.exports=require("@package/server")}]);
```

`require("@package/server")`是个什么鬼嘛 (╯°□°）╯︵ ┻━┻

再度回到刚才那个 stackoverflow 的问题。仔细查看之后得出以下结论

- 我们需要交叉编译所有自己写的 ts 文件
- 我们没理由交叉编译所有第三方库

于是查阅 webpack 的[官方文档](https://webpack.js.org/configuration/externals/#function)再再次出做修改

```ts
  externals: [
    (_, req, cb) => {
      if (!/^@package/.test(req) && req[0] !== "." && req[0] !== "/") {
        return cb(null, `commonjs ${req}`);
      }
      cb(null, undefined);
    }
  ],
```

当一个 import path 是本地的 package(`@package`开头)，相对路径(`"."`开头), 绝对路径(`"/"`开头)时进行交叉编译，不是的时候直接使用原来的`commonjs`模块。

再度编译结果正常。

```log
yarn run v1.22.4
$ yarn workspace @package/script build
warning package.json: No license field
$ TS_NODE_PROJECT=./tsconfig.webpack.json webpack --config webpack.server.ts
Hash: f0adf7b87e9622543054
Version: webpack 4.42.1
Time: 176ms
Built at: 04/02/2020 12:02:19 AM
    Asset      Size  Chunks             Chunk Names
server.js  1.42 KiB       0  [emitted]  server
Entrypoint server = server.js
[0] ./server.ts 296 bytes {0} [built]
[2] external "express" 42 bytes {0} [built]
    + 1 hidden module
Done in 3.22s.
```

尝试运行`yarn start`

```log
yarn run v1.22.4
$ yarn workspace @package/script start
warning package.json: No license field
$ node ./dist/server.js
listening on 3000
```

到此为止解决了问题 💞
