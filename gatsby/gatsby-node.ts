import path from "path"
import { exec } from "child_process"
import courseTitle from "../src/i18n/courseTitle.json"
import { GatsbyNode } from "gatsby"

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "extra"), "node_modules"],
    },
  })
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
      .relativePath.replace("/index", "")
      .replace(/\.mdx?/, "")

    createNodeField({
      node,
      name: `slug`,
      value: parent,
    })

    createNodeField({
      node,
      name: `regex`,
      value: `/${parent.split("/")[1]}/`,
    })
  }

  if (node.relativeDirectory === "notes") {
    console.log(node.name)

    createNodeField({
      node,
      name: `courseTitle`,
      value: courseTitle[node.name] || node.name,
    })
  }
}

export const createPages: GatsbyNode["createPages"] = ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const notePages = graphql(`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/notes/" } }
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
              regex
            }
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/note/index.tsx`),
        context: {
          slug: node.fields.slug,
          regex: node.fields.regex,
        },
      })
    })
  })

  const noteArchivePages = graphql(`
    {
      allDirectory(
        filter: { relativeDirectory: { eq: "notes" } }
        sort: { fields: changeTime, order: DESC }
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
  `).then((result) => {
    const notes = result.data.allDirectory.edges
    const notesPerPage = 20
    const numPages = Math.ceil(notes.length / notesPerPage)

    Array.from({
      length: numPages,
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/notes` : `/notes/${i + 1}`,
        component: path.resolve("./src/templates/note/archive.tsx"),
        context: {
          limit: notesPerPage,
          skip: i * notesPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  const postPages = graphql(`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/posts/" } }
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
    }
  `).then((result) => {
    const posts = result.data.allMdx.edges
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)

    result.data.allMdx.edges.forEach(({ node }, i) => {
      const prev = i === 0 ? false : posts[i - 1].node
      const next = i === posts.length - 1 ? false : posts[i + 1].node
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/post/index.tsx`),
        context: {
          slug: node.fields.slug,
          prev,
          next,
          identifier: node.id,
        },
      })
    })

    Array.from({
      length: numPages,
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/posts` : `/posts/${i + 1}`,
        component: path.resolve("./src/templates/post/archive.tsx"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  return Promise.all([notePages, noteArchivePages, postPages])
}

export const onPreBuild: GatsbyNode["onPreBuild"] = ({ graphql }) => {
  console.log("preBuild fonts!")
  return graphql(`
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
  `).then((result) => {
    return new Promise((ok) => {
      const titles = result.data.allMdx.edges.map(
        ({ node }) => node.frontmatter.title
      )
      const chars = [...new Set(titles.join("").replace(/[a-zA-Z0-9\s]/g, ""))]
      const unicodes = chars
        .map((char) => {
          const uChar = "U+" + char.charCodeAt(0).toString(16).padStart(4, "0")
          //    console.log(`${char} => ${uChar}`)

          return uChar
        })
        .join(",")

      const SUBSET = `pyftsubset static/fonts/NotoSerifSC-Regular.woff2 --unicodes="${unicodes}" --flavor="woff2" `
      console.log(SUBSET)
      exec(SUBSET, (err) => {
        if (err) {
          throw err
        }
        console.log("generated new font")
        console.log(`
          
          ${chars}

          `)
        exec(`ls -l --block-size=KB static/fonts `).stdout.pipe(process.stdout)
        ok()
      })
    })
  })
}
