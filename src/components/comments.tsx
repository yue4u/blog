import React from "react"
import styled from "styled-components"
import { DiscussionEmbed, DisqusConfig } from "disqus-react"

const CommentBlock = styled.div`
  margin: 0 auto;
  width: 80%;
  padding-bottom: 8rem;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`
export default function Comments({ url, identifier, title }: DisqusConfig) {
  const disqusShortname = "yue-blog"
  const disqusConfig = { url, identifier, title }
  return (
    <CommentBlock>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </CommentBlock>
  )
}
