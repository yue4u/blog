---
title: 如何减少字体文件尺寸
date: 2019-12-03 11:18:13
---

本 blog 最初选定英文字体的时候选择了[Great Vibes](https://fonts.google.com/specimen/Great+Vibes)这个字体，相对之下中日文的粗体字就会显得很不搭，一直在考虑解决。如果只是指定`serif`的话在 mac 端上能够显示想要的效果但是其他客户端都不行。自然应该是系统自带字体库的问题，最简单方法就是再加载一个外部字体。中日文都支持的字体里最有名的应该是`noto-serif-sc`，但是因为字符数很多，文件将近 7.7Mb。就算初次加载之后有 cache，初次加载的 cost 也太大了。

一顿搜索之后找到了[fonttools](https://github.com/fonttools/fonttools)这个开源项目，其中提供的`pyftsubset`这个工具可以对字体文件进行裁剪取出需要的字符。可惜并没有找到 node 对应的项目。

```sh
$ pyftsubset --help
```

```
...
  --unicodes=<XXXX>[,<XXXX>...]
      Specify comma/whitespace-separated list of Unicode codepoints or
      ranges as hex numbers, optionally prefixed with 'U+', 'u', etc.
      For example, --unicodes=41-5a,61-7a adds ASCII letters, so does
      the more verbose --unicodes=U+0041-005A,U+0061-007A.
      The special strings '*' will choose all Unicode characters mapped
      by the font.
...
```

接下来使用`gatsby`的 query 获取所有的标题进行处理，在`gatsby-node.js`中加入`prebuild`的 hook:

query 如下:

```graphql
{
  allMdx {
    edges {
      node {
        frontmatter {
          title
        }
      }
    }
  }
}
```

整理 unicode 字符串并外部执行 py 命令:

```js
const unicodes = [...new Set(titles.join("").replace(/[a-zA-Z0-9\s]/g, ""))]
  .map(
    char =>
      "U+" +
      char
        .charCodeAt(0)
        .toString(16)
        .padStart(4, "0")
  )
  .join(",")
```

合并两者:

```js
exports.onPreBuild = ({ graphql }) => {
  console.log('preBuild fonts!')
  return graphql(`
  {
    allMdx {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`).then(result => {
    return new Promise(ok => {
      const titles = result.data.allMdx.edges.map(
        ({ node }) => node.frontmatter.title
      )

      const unicodes = [...new Set(titles.join("").replace(/[a-zA-Z0-9\s]/g, ""))]
        .map(
          char =>
            "U+" +
            char
              .charCodeAt(0)
              .toString(16)
              .padStart(4, "0")
        )
        .join(",")

      exec(
        `pyftsubset static/fonts/NotoSerifSC-Regular.woff2 --unicodes="${unicodes}" --flavor="woff2" `,
        (err) => {
          if (err) {
            throw err
          };
          ok();
      )
    }
    )
  })
}
```

现在再确认一眼生成的`NotoSerifSC-Regular.subset.woff2`只有 72kB，差距还是非常巨大的。
