import React from "react"
import styled from "styled-components"
import { Link, graphql, PageProps } from "gatsby"
import { useTransition, animated } from "react-spring"

import { SEO, Layout, GradientFont } from "@/src/components"
import PostSummary from "./summay"
import PostPagination from "./pagination"

const Content = styled.div`
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`

const PostsTitle = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
`
const PostCount = styled.p`
  color: #777;
`
export default function Posts({
  data,
  pageContext,
}: PageProps<Queries.PostArchiveQuery, {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}>) {
  const nodes = data.allMdx.edges.map(({ node }) => node)
  const transitions = useTransition(nodes, {
    keys: (node) => node.id,
    from: { opacity: 0, transform: "translateY(40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(40px)" },
  })

  return (
    <Layout>
      <SEO title="Posts" path="/posts" />
      <Content>
        <PostsTitle>
          <GradientFont>Posts</GradientFont>
        </PostsTitle>

        <PostCount>
          这人很懒 一共才写了
          {data.pageCount.edges.length}
          篇文章
        </PostCount>

        <ul>
          {transitions((style, node) => (
            <animated.li style={style}>
              <Link to={`/${node.fields?.slug}`}>
                <PostSummary detail={node.frontmatter} />
              </Link>
            </animated.li>
          ))}
        </ul>

        <PostPagination pageContext={pageContext} />
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query PostArchive($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            tags
          }
          fields {
            slug
          }
        }
      }
    }
    pageCount: allMdx(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`
