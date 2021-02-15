import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export function Image() {
  const data = useStaticQuery(graphql`
    query ImageSharpQuery {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}
