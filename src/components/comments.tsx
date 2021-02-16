import React, { useEffect, useRef } from "react"
import styled from "styled-components"

export function Comments() {
  const commentBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!commentBox.current || commentBox.current?.children.length) {
      return
    }
    let scriptEl = document.createElement("script")
    scriptEl.setAttribute("src", "https://utteranc.es/client.js")
    scriptEl.setAttribute("crossorigin", "anonymous")
    scriptEl.setAttribute("async", "true")
    scriptEl.setAttribute("repo", "rainy-me/blog")
    scriptEl.setAttribute("issue-term", "pathname")
    scriptEl.setAttribute("theme", "github-dark")
    commentBox.current.appendChild(scriptEl)
  }, [])

  return (
    <CommentBlock id="comments">
      <div ref={commentBox} />
    </CommentBlock>
  )
}

const CommentBlock = styled.div`
  margin: 0 auto;
  width: 80%;
  padding-bottom: 2rem;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`
