import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import NoteList from "./list/index"
import styled from "styled-components"
import { MDXRenderer } from 'gatsby-mdx'
import MarkdownContent from "../../components/common/markdownContent"

const NoteLayout = styled.div`
  display: flex;
  padding: 1rem;
`

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
`

export default function Note({ data }) {
  const post = data.mdx
  return (
    <Layout>
      <NoteLayout>
        <NoteList data={data.sideBar} />
        <Content>
          <h1>{post.frontmatter.title}</h1>

                 <MarkdownContent >
          <MDXRenderer>{post.code.body}</MDXRenderer>
        </MarkdownContent>
        </Content>
      </NoteLayout>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $regex: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code{
          body
      }
      frontmatter {
        title
      }
    }
    sideBar: allMdx(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { fileAbsolutePath: { regex: $regex } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          headings {
            depth
            value
          }
          fields {
            slug
            regex
          }
        }
      }
    }
  }
`
