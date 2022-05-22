import React from "react"

import { Layout, CodeBlock } from "../components"

export default function About() {
  const base = `
let me = {
    name: "yue",
    location: "Tokyo",
    meta: [
        "hobby-driven",
        "nocturnality",
    ],
    hobbies: [
        "web",
        "programming",
        "reading",
        "painting",
        "ballgame",
        "NLP",
    ],
    languages: {
        natural: [
            "Chinese",
            "Japanese",
            "English",
        ],
        programming: [
            "Typescript",
            "Rust",
            "Python",
          ]
    },
    learning: [
        "Korean",
        "Design",
    ],
    contact: {
        github: "@github",
        twitter: "@twitter",
        pixiv: "@pixiv",
        instagram: "@instagram",
        mail: "@mail",
        blog: "@blog",
        lab: "@lab",
    }
}
`
  const a = (link: string, v: string) => {
    return `<a href="${link}" target="_blank rel="noopener noreferrer">${v}</a>`
  }

  const me = base
    .replace("let", '<span class="keyword">let</span>')
    .replace(/ "[\s\S]+?"/g, '<span class="string">$&</span>')
    .replace(/ "[\s\S]+?"/g, '<span class="string">$&</span>')
    .replace(/(\S+?):/g, '<span id="$1">$&</span>')
    .replace("@twitter", a("https://twitter.com/nerd_yue", "@nerd_yue"))
    .replace("@github", a("https://github.com/yue4u", "yue4u"))
    .replace(
      "@pixiv",
      a("https://www.pixiv.net/member.php?id=10930752", "__yue__")
    )
    .replace("@mail", a("mailto:i@yue.coffee", "i@yue.coffee"))
    .replace("@instagram", a("https://instagram.com/nerd_yue/", "@nerd_yue"))
    .replace("@blog", a("https://blog.yue.coffee", "blog.yue.coffee"))
    .replace("@lab", a("https://lab.yue.coffee", "lab.yue.coffee"))

  return (
    <Layout>
      <CodeBlock>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: me }} />
        </pre>
      </CodeBlock>
    </Layout>
  )
}
