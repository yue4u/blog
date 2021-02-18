import React from "react"
import puppeteer from "puppeteer"
import fs from "fs/promises"
import path from "path"
import OGP, { PageData } from "./ogp-component"

import { renderToStaticMarkup } from "react-dom/server"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"

export async function screenshot(data: PageData[], headless = true) {
  const [greatVibesMerge, notoSerifSc] = (
    await Promise.all(
      [
        "GreatVibes-Regular.woff2",
        "NotoSerifSC-Regular.subset.woff2",
      ].map((file) =>
        fs.readFile(path.join(__dirname, "../static/fonts", file))
      )
    )
  ).map((font) => font.toString("base64"))
  const browser = await puppeteer.launch({ headless })
  const { NO_CACHE, REBUILD } = process.env
  for (const pageData of data) {
    const filePath = path.join(__dirname, `../static/ogp/${pageData.slug}.png`)
    const rebuildFlag = REBUILD && pageData.slug.includes(REBUILD)
    const exist = await fs.stat(filePath).catch(() => false)

    if (!NO_CACHE && !rebuildFlag && exist) {
      console.log(`skip ${filePath}`)
      continue
    }

    const page = await browser.newPage()
    page.setViewport({ width: 1200, height: 628 })
    console.log("taking screenshots...")
    const sheet = new ServerStyleSheet()
    const body = renderToStaticMarkup(
      <StyleSheetManager sheet={sheet.instance}>
        <OGP {...pageData} />
      </StyleSheetManager>
    )
    const tags = sheet.getStyleTags()
    const html = tags + body
    await page.setContent(html)
    await page.addStyleTag({
      content: `
      @font-face {
        font-family: 'great-vibes-merge';
        unicode-range: U+0021-007A;
        src: url("data:font/ttf;base64,${greatVibesMerge}") format('woff2');
      }
      
      @font-face {
        font-family: 'noto-serif-sc';
        src: url("data:font/ttf;base64,${notoSerifSc}") format('woff2');
      }
      
      html, body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        font-family: sans-serif;
      };
      `,
    })
    await page.$eval("#title", (e) => {
      let base = 8
      while (e.scrollHeight > e.clientHeight) {
        base -= 0.2
        // @ts-ignore
        e.style.fontSize = `${base}rem`
      }
    })
    await page.waitForTimeout(500)
    await page.screenshot({ path: filePath })
    console.log(`done: ${filePath}`)
    if (headless) {
      await page.close()
    }
  }
  if (headless) {
    await browser.close()
  }
}

// screenshot(
//   [
//     {
//       slug: "test",
//       title: "Graphql Rust + Vue3\ngcpにDeployするまで",
//       tags: ["Blog of yue"],
//       content: `正しさ よりも 明るい場所を 見つけながら 走ればいいんだね。正しさ よりも 明るい場所を 見つけながら 走ればいいんだね。正しさ よりも 明るい場所を 見つけながら 走ればいいんだね。`,
//     },
//   ],
//   false
// )
