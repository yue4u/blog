import React from "react"
import styled from "styled-components"
import { graphql, type PageProps } from "gatsby"
import { useTransition, animated } from "react-spring"
import { SEO, Layout, GradientFont } from "@/src/components"
import Course from "./course"

const H1 = styled.h1`
  font-size: 5rem;
`
const CourseList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 5rem;
  li {
    width: 48%;
  }
  @media screen and (max-width: 700px) {
    li {
      width: 100%;
    }
  }
`

function CourseBlock({ data }: Pick<PageProps<Queries.NoteArchiveQuery>, 'data'>) {
  const nodes = data.allDirectory.edges.map(({ node }) => node)
  const transitions = useTransition(nodes, {
    keys: (node) => node.id,
    from: { opacity: 0, transform: "translateY(40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(40px)" },
  })
  return (
    <CourseList>
      {transitions((style, node) => (
        <animated.li style={style}>
          <Course node={node} />
        </animated.li>
      ))}
    </CourseList>
  )
}

export default function Notes({ data }: PageProps<Queries.NoteArchiveQuery>) {
  return (
    <Layout>
      <SEO title="Notes" path="/notes" />
      <H1>
        <GradientFont>Notes</GradientFont>
      </H1>
      <CourseBlock data={data} />
    </Layout>
  )
}
export const query = graphql`
  query NoteArchive($skip: Int!, $limit: Int!) {
    allDirectory(
      filter: { relativeDirectory: { eq: "notes" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          name
          modifiedTime
        }
      }
    }
  }
`
