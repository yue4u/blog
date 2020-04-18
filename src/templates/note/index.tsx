import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { SEO, Layout, MarkdownContent } from "../../components"
import NoteList from "./list/index"

const NoteLayout = styled.div`
  display: flex;
  padding: 1rem;
`

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
`

export default function Note({ data, pageContext }) {
  const post = data.mdx
  const isIndex = [...post.fields.slug.matchAll(/\//g)].length == 1
  const links = data.sideBar.edges.map(({ node }) => ({
    id: node.id,
    ...node.frontmatter,
    ...node.fields,
  }))

  const { slug } = pageContext

  const Item = (link: any) => (
    <li>
      <Link to={link.slug}>{link.title}</Link>
    </li>
  )
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.rawBody}
        path={`/${slug}`}
      />
      <NoteLayout>
        <NoteList data={data.sideBar} />
        <Content>
          <h1>{post.frontmatter.title}</h1>
          <MarkdownContent>
            <MDXRenderer>{post.body}</MDXRenderer>
            {isIndex && (
              <ul>
                {links.map((link) => (
                  <Item {...link} key={link.id} />
                ))}
              </ul>
            )}
          </MarkdownContent>
        </Content>
      </NoteLayout>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $regex: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      body
      rawBody
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
