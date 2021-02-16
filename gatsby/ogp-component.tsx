import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { GradientFont } from "../src/components/gradientFont"
// import { MarkdownContentBlock } from "@/src/components/markdownContent"

export type PageData = {
  title: string
  content: string
  date?: string | number
  slug: string
  tags?: string[]
  main?: boolean
}

export const dateTime = new Intl.DateTimeFormat("ja", {
  year: "numeric", //| '2-digit',
  month: "numeric", //| '2-digit' | 'narrow' | 'short' | 'long',
  day: "numeric", //| '2-digit',
})

const MainFooter = styled.footer`
  color: slategray;
  text-align: center;
  width: 100%;
  justify-content: center;
  font-size: 2rem;
  font-family: system-ui;
  margin-top: 1rem;
  border-top: 2px solid #333;
  padding-top: 2rem;
  position: relative;
  &::after {
    content: "";
    width: 1rem;
    height: 1rem;
    background: #333;
    transform: rotate(45deg);
    position: absolute;
    top: -0.70710678118rem;
    left: 50%;
  }
`

const MainMessage = styled.p`
  text-align: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  font-size: 1.6rem;
  text-align: left;
  color: #ccc;
  text-shadow: 0 0 5px #000;
  height: 5rem;
  line-height: 1.3;
  overflow: hidden;
  margin: 1rem 0 0;
`
const MainTitle = styled(GradientFont)`
  font-size: 10.5rem;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 16rem;
  text-align: center;
  word-break: break-word;
  margin: 2rem auto 2rem;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default function OGP({ title, date, tags, content, main }: PageData) {
  const summary = content.includes("---")
    ? (content.split("---")[2] ?? "some blog content")
        .replaceAll(/#/g, "")
        .replaceAll(/<[\s\S]+?\/.+>/gm, " ... ")
        .replaceAll(/```[\s\S]+?```/gm, " ... ")
    : content

  if (main) {
    return (
      <Container>
        <MainTitle id="title">{title}</MainTitle>
        <MainMessage>{summary}</MainMessage>
        <MainFooter>blog.yue.coffee</MainFooter>
      </Container>
    )
  }

  return (
    <Container>
      <PostTitle id="title">{title}</PostTitle>
      <Tags>
        {tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        <div key="dummy" />
      </Tags>
      <Summary>
        {/* <MarkdownContentBlock>{content}</MarkdownContentBlock> */}
        {summary}
      </Summary>

      <Footer>
        {date && (
          <Time>{dateTime.format(new Date(date)).replaceAll("/", " / ")}</Time>
        )}
        <Author>Blog of yue</Author>
      </Footer>
    </Container>
  )
}

const PostTitle = styled(GradientFont)`
  font-size: 8rem;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 13rem;
  text-align: center;
  word-break: break-word;
  margin: 3rem auto 1rem;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  @media screen and (max-width: 700px) {
    font-size: 4rem;
  }
`

const Author = styled(GradientFont)`
  padding: 0 0.5rem;
  font-size: 3rem;
  font-style: italic;
  font-family: "great-vibes-merge";
  color: hotpink;
`

const Container = styled.div`
  padding: 0 2rem;
  overflow: auto;
  box-sizing: border-box;
  width: 1200px;
  height: 628px;
  margin: 0 auto;
  background-color: rgb(29, 29, 29);
  display: flex;
  flex-direction: column;
`

const Summary = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  font-size: 2rem;
  text-align: left;
  color: #ccc;
  text-shadow: 0 0 5px #000;
  height: 5rem;
  line-height: 1.3;
  overflow: hidden;
  margin: 1rem;
`

const Time = styled.time`
  font-size: 2rem;
  color: cadetblue;
`
const Tags = styled.span`
  display: flex;
  justify-content: left;
  gap: 10px;
`

const Tag = styled.span`
  font-size: 2rem;
  text-shadow: 1px 1px 4px #000;
  color: #fff;
  word-break: break-word;
  margin: 4px 4px;
  display: inline-block;
  padding: 0 5px;
  font-family: "Fira Code";
  position: relative;
  z-index: 0;
  &::after {
    transition: 0.2s all ease-in-out;
    content: "";
    border-radius: 5px;
    opacity: 0.8;
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(100deg, #ec407a 47%, #00bcd4);
  }
  &:hover {
    &::after {
      opacity: 1;
    }
  }
`
const Footer = styled.div`
  margin-top: 1rem;
  border-top: 2px solid #333;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
