graphql(`
  {
    allMdx {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`).then(result => {
  const titles = result.data.allMdx.edges.map(
    ({ node }) => node.frontmatter.title
  )

  const unicodes = [...new Set(titles.join("").replace(/[a-zA-Z0-9\s]/g, ""))]
    .map(
      char =>
        "U+" +
        char
          .charCodeAt(0)
          .toString(16)
          .padStart(4, "0")
    )
    .join(",")

  exec(
    `pyftsubset static/fonts/NotoSerifSC-Regular.woff2 --unicodes="${unicodes}" --flavor="woff2" `,
    () => {
      console.log("generated new font")
      exec(`ls -l --block-size=KB static/fonts `)
    }
  )
})
