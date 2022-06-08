import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import {
  Layout,
  SEO,
  GradientFont,
  MarkdownContent,
  Comments,
} from "@/src/components"
import { formatDate } from "@/src/helpers"
import { PaginationLink, PaginationNav } from "./pagination"
import type { PostPageContext, PostPageQueryQuery } from "@/types"

function PostLink({
  data,
  linkType,
}: {
  data: PostPageContext["next"]
  linkType: "prev" | "next"
}) {
  if (!data) {
    return <Link to="#" />
  }
  const title = data.frontmatter?.title
  return (
    <Link to={`/${data.fields?.slug}`}>
      <PostLinkWrap direction={linkType}>
        <PaginationLink active>{title}</PaginationLink>
      </PostLinkWrap>
    </Link>
  )
}

export default function Post({
  data,
  pageContext,
}: {
  data: PostPageQueryQuery
  pageContext: PostPageContext
}) {
  const post = data.mdx!
  const { prev, next, slug } = pageContext
  return (
    <Layout>
      <SEO
        ogp={`https://blog.yue.coffee/ogp/${slug}.png`}
        title={post.frontmatter?.title}
        description={post?.rawBody}
        path={`/${slug}`}
      />
      <div>
        <PostTitle>
          <GradientFont
            dangerouslySetInnerHTML={{ __html: post.frontmatter?.title || "" }}
          />
        </PostTitle>
        <Tags>
          {post?.frontmatter?.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
        <PostDate>{formatDate(post.frontmatter?.date)}</PostDate>
        <MarkdownContent>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MarkdownContent>
      </div>
      <PaginationNav>
        <PostLink data={prev} linkType="prev" />
        <PostLink data={next} linkType="next" />
      </PaginationNav>
      <Comments />
    </Layout>
  )
}

const PostTitle = styled.h1`
  font-size: 4rem;
  word-break: break-word;
  margin-bottom: 1rem;
  @media screen and (max-width: 700px) {
    font-size: 4rem;
  }
`
const PostDate = styled.time`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  display: inline-block;
  text-shadow: 0 0 1rem #000;
`

const PostLinkWrap = styled.div<{ direction: "prev" | "next" }>`
  position: relative;
  &::before {
    position: absolute;
    left: -1rem;
    width: 1rem;
    height: 100%;
    display: grid;
    place-items: center;
    ${(props) => props.direction === "prev" && `content: "<"`}
  }
  &::after {
    position: absolute;
    display: grid;
    place-items: center;
    width: 1rem;
    height: 100%;
    display: grid;
    place-items: center;
    color: #fff;
    top: 0;
    right: -1rem;
    ${(props) => props.direction !== "prev" && `content: ">"`}
  }
`

const Tags = styled.span`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`

const Tag = styled.span`
  font-size: 1.2rem;
  text-shadow: 0 0 5px #000;
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
    opacity: 0.3;
    z-index: -1;
    width: 100%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 0;
    background-image: linear-gradient(100deg, #ec407a, #aaa 50%, #00bcd4);
  }
  &:hover {
    &::after {
      opacity: 1;
    }
  }
`

export const query = graphql`
  query PostPageQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      rawBody
      frontmatter {
        title
        date
        tags
      }
      headings {
        value
      }
    }
  }
`
