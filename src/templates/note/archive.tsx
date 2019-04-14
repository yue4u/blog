import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { animated } from "react-spring"
import { Transition } from "react-spring/renderprops"
import Layout from "../../components/layout"
import SEO from "../../components/global/seo"
import Course from "./course"
import GradientFont from "../../components/common/gradientFont"

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
  @media screen and (max-width: 700px) {
    li {
      width: 100%;
    }
  }
`

export default function Notes({ data }: any) {
  const nodes = data.allDirectory.edges.map(({ node }: any) => node)
  const CourseBlock = () => (
    <CourseList>
      <Transition
        items={nodes}
        keys={node => node.id}
        from={{ opacity: 0, transform: "translateY(40px)" }}
        enter={{ opacity: 1, transform: "translateY(0px)" }}
        leave={{ opacity: 0, transform: "translateY(40px)" }}
      >
        {node => style => (
          <animated.li style={style}>
            <Course style={style} node={node} />
          </animated.li>
        )}
      </Transition>
    </CourseList>
  )
  return (
    <Layout>
      <SEO title="Home" keywords={[`note`]} />
      <H1>
        <GradientFont>Notes</GradientFont>
      </H1>
      <CourseBlock />
    </Layout>
  )
}
export const query = graphql`
  query noteArchiveQuery($skip: Int!, $limit: Int!) {
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
          fields {
            courseTitle
          }
        }
      }
    }
  }
`