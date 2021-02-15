// @ts-nocheck
import React, { useEffect } from "react"
type TweetProps = {
  url: string
}
export default function Tweet({ url }: TweetProps) {
  useEffect(() => {
    setTimeout(() => {
      if (window.twttr) return
      const [d, s, id] = [document, "script", "twitter-wjs"]

      const t = window.twttr || {}
      if (d.getElementById(id)) return t

      const js = d.createElement(s)
      js.id = id
      js.src = "https://platform.twitter.com/widgets.js"

      const fjs = d.getElementsByTagName(s)[0]!
      fjs.parentNode?.insertBefore(js, fjs)
      t._e = []
      t.ready = (f) => t._e.push(f)

      window.twttr = t
    }, 2000)
  }, [])
  return (
    <blockquote
      className="twitter-tweet"
      data-theme="dark"
      dnt="true"
      align="center"
      style={{ minHeight: "200px" }}
    >
      <a href={url}>{url}</a>
    </blockquote>
  )
}
