import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import NoteList from "./list/index"
import styled from "styled-components"
import MarkdownContent from "../../components/common/markdownContent"
import SideBar from "../../components/global/sidebar"
const NoteLayout = styled.div`
  display: flex;
  padding: 1rem;
`

const Content = styled.div`
  flex-grow: 1;
`

export default function Note({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <NoteLayout>
        <NoteList data={data.sideBar} />
        <Content>
          <h1>{post.frontmatter.title}</h1>

          <MarkdownContent dangerouslySetInnerHTML={{ __html: post.html }} />
        </Content>
      </NoteLayout>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $regex: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    sideBar: allMarkdownRemark(
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
