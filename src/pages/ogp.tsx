import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { GradientFont } from "../components"

const Global = createGlobalStyle`
@font-face {
  font-family: 'great-vibes-merge';
  unicode-range: U+0021-007A;
  src: url('/fonts/GreatVibes-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'noto-serif-sc';
  src: url('/fonts/NotoSerifSC-Regular.subset.woff2') format('woff2');
}

html, body {
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
};
`

const PostTitle = styled.h1`
  font-size: 6rem;
  text-align: center;
  word-break: break-word;
  margin: 3rem auto 2rem;
  @media screen and (max-width: 700px) {
    font-size: 4rem;
  }
`

const Gradient = styled(GradientFont)`
  text-align: left;
`

const Author = styled.span`
  font-size: 2rem;
  color: #fff;
`

const Container = styled.div`
  width: 1200px;
  height: 628px;
  margin: 0 auto;
  background-color: rgb(29, 29, 29);
`

export default function OGP() {
  return (
    <Container>
      <Global />
      <PostTitle>
        <Gradient>useSpringsの型を直す</Gradient>
        <Author>blog of yue</Author>
        <p>
          わけあって、`react-spring`の[Card Stack
          デモ](https://codesandbox.io/embed/j0y0vpz59)を `typescript`
          化してみた、途中に謎のタイプエラーを遭遇して、それを解決するまでの推理を記事にした。
        </p>
      </PostTitle>
    </Container>
  )
}
