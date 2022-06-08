import path from "path"
import { exec } from "child_process"
import { screenshot } from "./src/ogp"
import { type GatsbyNode } from "gatsby"
import { type DirectoryEdge, type MdxEdge, type Mdx } from "@/types"

export type PostPageContext = {
  slug: string
  prev: Mdx
  next: Mdx
  identifier: string
}

export type PostArchivePageContext = {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ["extra", "node_modules"],
      alias: {
        "@": __dirname,
      },
    },
  })
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions: { createNodeField },
}) => {
  if (node.internal.type === `Mdx`) {
    // @ts-ignore
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
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const { data: notePages } = await graphql<{ allMdx: { edges: MdxEdge[] } }>(`
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
  `)

  notePages?.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields?.slug as string,
      component: path.resolve(`src/templates/note/index.tsx`),
      context: {
        slug: node.fields?.slug as string,
        // @ts-ignore
        regex: node.fields.regex,
      },
    })
  })

  const { data: noteArchivePages } = await graphql<{
    allDirectory: { edges: DirectoryEdge[] }
  }>(`
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
          }
        }
      }
    }
  `)

  const notes = noteArchivePages?.allDirectory.edges || []
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

  const { data: postPages } = await graphql<{ allMdx: { edges: MdxEdge[] } }>(`
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
  `)

  const posts = postPages?.allMdx.edges || []
  const postsPerPage = 6
  const PostNumPages = Math.ceil(posts.length / postsPerPage)
  posts.forEach(({ node }, i) => {
    const prev = i === 0 ? null : posts[i - 1].node
    const next = i === posts.length - 1 ? null : posts[i + 1].node
    createPage({
      path: node.fields?.slug as string,
      component: path.resolve(`src/templates/post/index.tsx`),
      context: {
        slug: node.fields?.slug as string,
        prev,
        next,
        identifier: node.id,
      },
    })
  })

  Array.from({
    length: PostNumPages,
  }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: path.resolve("./src/templates/post/archive.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: PostNumPages,
        currentPage: i + 1,
      },
    })
  })
}

export const onPreBuild: GatsbyNode["onPreBuild"] = async ({ graphql }) => {
  const { data: nodes } = await graphql<{ allMdx: { edges: MdxEdge[] } }>(`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
        edges {
          node {
            frontmatter {
              title
              tags
              date
            }
            fields {
              slug
            }
            rawBody
          }
        }
      }
    }
  `)

  const edges = nodes?.allMdx.edges || []

  await new Promise((ok) => {
    const titles = edges.map(({ node }) => node?.frontmatter?.title || "") || []
    const chars = [...new Set(titles.join("").replace(/[a-zA-Z0-9\s]/g, ""))]
    const unicodes = chars
      .map((char) => {
        return "U+" + char.charCodeAt(0).toString(16).padStart(4, "0")
      })
      .join(",")

    const SUBSET = `pyftsubset static/fonts/NotoSerifSC-Regular.woff2 --unicodes="${unicodes}" --flavor="woff2" `
    console.log(SUBSET)
    exec(SUBSET, (err) => {
      if (err) {
        throw err
      }
      console.log(`generated new font with chars: ${chars}`)
      exec(`ls -l --block-size=KB static/fonts `).stdout?.pipe(process.stdout)
      ok({})
    })
  })

  await screenshot(
    edges.map(({ node }) => {
      return {
        title: node!.frontmatter!.title,
        // @ts-ignore
        tags: node!.frontmatter!.tags as string[],
        date: node!.frontmatter!.date,
        slug: node!.fields!.slug!,
        content: node!.rawBody,
      }
    })
  )
}
